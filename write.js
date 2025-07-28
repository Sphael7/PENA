// Membungkus seluruh kode dalam DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("initWritePage called!"); 
    const form = document.getElementById('write-poem-form');
    const poemTitleInput = document.getElementById('poem-title');
    const poemAuthorInput = document.getElementById('poem-author');
    const poemContentTextarea = document.getElementById('poem-content');
    const publishBtn = document.getElementById('publish-btn');
    const colorOptions = document.querySelector('.color-options');
    const colorCircles = document.querySelectorAll('.color-circle');
    const wordCountDisplay = document.getElementById('word-count');
    const draftMessage = document.getElementById('draft-message');
    const autosaveMessage = document.getElementById('autosave-message');

    // Elements for idea suggestion
    const ideaSuggestionContainer = document.getElementById('idea-suggestion-container');
    const ideaSuggestionText = document.getElementById('idea-suggestion-text');
    const clearSuggestionBtn = document.getElementById('clear-suggestion-btn');


    let selectedColor = 'white'; 
    let autosaveTimeout;
    let isFormDirty = false; 

    // Kunci localStorage untuk font puisi
    const FONT_STORAGE_KEY = 'selectedPoemFont';

    function markFormDirty() {
        if (!isFormDirty) {
            isFormDirty = true;
            console.log("Form is dirty."); 
        }
    }

    function markFormClean() {
        if (isFormDirty) {
            isFormDirty = false;
            console.log("Form is clean."); 
        }
    }

    // Hanya tambahkan event listener beforeunload sekali
    if (!window.hasBeforeUnloadListener) { 
        window.addEventListener('beforeunload', (event) => {
            if (isFormDirty) {
                event.preventDefault();
                event.returnValue = ''; 
            }
        });
        window.hasBeforeUnloadListener = true; 
    }

    function checkFormValidity() {
        const titleFilled = poemTitleInput.value.trim() !== '';
        const authorFilled = poemAuthorInput.value.trim() !== '';
        const contentFilled = poemContentTextarea.value.trim() !== '';
        const colorSelected = selectedColor !== null;

        if (titleFilled && authorFilled && contentFilled && colorSelected) {
            publishBtn.removeAttribute('disabled');
            publishBtn.classList.add('active');
        } else {
            publishBtn.setAttribute('disabled', 'disabled');
            publishBtn.classList.remove('active');
        }
    }

    function updateWordCount() {
        const text = poemContentTextarea.value.trim();
        const words = text.split(/\s+/).filter(word => word.length > 0);
        const characters = poemContentTextarea.value.length;
        wordCountDisplay.textContent = `Jumlah kata: ${words.length} / Jumlah karakter: ${characters}`;
    }

    function showAutosaveMessage() {
        autosaveMessage.classList.add('show');
        clearTimeout(autosaveTimeout);
        autosaveTimeout = setTimeout(() => {
            autosaveMessage.classList.remove('show');
        }, 2000);
    }

    function saveDraft() {
        const draft = {
            title: poemTitleInput.value,
            author: poemAuthorInput.value,
            content: poemContentTextarea.value,
            theme: selectedColor 
        };
        localStorage.setItem('poemDraft', JSON.stringify(draft));
        showAutosaveMessage();
        markFormClean(); 
    }

    function loadDraft() {
        const draft = JSON.parse(localStorage.getItem('poemDraft'));
        if (draft && (draft.title || draft.author || draft.content)) {
            poemTitleInput.value = draft.title || '';
            poemAuthorInput.value = draft.author || '';
            poemContentTextarea.value = draft.content || '';
            
            if (draft.theme) {
                const draftColorCircle = document.querySelector(`.color-circle[data-color="${draft.theme}"]`);
                if (draftColorCircle) {
                    selectedColor = draft.theme;
                    colorCircles.forEach(c => c.classList.remove('active'));
                    draftColorCircle.classList.add('active');
                    poemContentTextarea.classList.add(selectedColor); 
                }
            }

            draftMessage.textContent = 'Draf berhasil dimuat.';
            draftMessage.classList.add('show');
            
            updateWordCount();
            checkFormValidity();
            markFormClean(); 
        } else {
            selectedColor = 'white';
            const defaultWhiteCircle = document.querySelector(`.color-circle[data-color="white"]`);
            if (defaultWhiteCircle) {
                defaultWhiteCircle.classList.add('active');
            }
            poemContentTextarea.classList.add('white'); 
            markFormClean(); 
        }
    }

    function applySavedFontToTextarea() {
        const savedFontClass = localStorage.getItem(FONT_STORAGE_KEY) || 'font-quicksand';
        poemContentTextarea.classList.add(savedFontClass); 
    }

    // New function to load idea suggestion from URL
    function loadIdeaSuggestionFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const idea = urlParams.get('idea');

        if (idea) {
            ideaSuggestionText.textContent = idea;
            ideaSuggestionContainer.style.display = 'block';
            
            // Optionally, you could pre-fill the textarea with the idea
            // poemContentTextarea.value = idea; 
            // updateWordCount();
            // checkFormValidity();
        }
    }

    // Event listener for clear suggestion button
    if (clearSuggestionBtn) {
        clearSuggestionBtn.addEventListener('click', () => {
            ideaSuggestionContainer.style.display = 'none';
            ideaSuggestionText.textContent = '';
            // Also clear the URL parameter from the browser history
            window.history.replaceState({}, document.title, window.location.pathname);
        });
    }


    poemTitleInput.addEventListener('input', markFormDirty);
    poemAuthorInput.addEventListener('input', markFormDirty);
    poemContentTextarea.addEventListener('input', markFormDirty);

    poemTitleInput.addEventListener('input', () => {
        checkFormValidity();
        updateWordCount();
    });
    poemAuthorInput.addEventListener('input', checkFormValidity);
    poemContentTextarea.addEventListener('input', () => {
        checkFormValidity();
        updateWordCount();
    });

    if (colorCircles) { 
        colorCircles.forEach(circle => {
            circle.addEventListener('click', () => {
                colorCircles.forEach(c => c.classList.remove('active'));
                circle.classList.add('active');
                selectedColor = circle.getAttribute('data-color');
                poemContentTextarea.classList.remove('yellow', 'blue', 'red', 'white'); 
                poemContentTextarea.classList.add(selectedColor); 
                checkFormValidity();
                markFormDirty(); 
            });
        });
    }

    if (form) { 
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            if (publishBtn.hasAttribute('disabled')) {
                alert('Mohon lengkapi semua kolom dan pilih tema puisi!'); 
                return;
            }

            const newPoem = {
                title: poemTitleInput.value,
                author: poemAuthorInput.value,
                content: poemContentTextarea.value,
                theme: selectedColor 
            };

            let poems = JSON.parse(localStorage.getItem('poems')) || [];
            poems.push(newPoem);
            localStorage.setItem('poems', JSON.stringify(poems));

            localStorage.removeItem('poemDraft');
            markFormClean(); 

            // Menggunakan transisi halaman manual dari common.js
            const nextUrl = 'index.html';
            if (typeof animatePageTransition === 'function') { 
                animatePageTransition(nextUrl);
            } else {
                document.body.classList.add('fade-out'); 
                setTimeout(() => {
                    window.location.href = nextUrl; 
                }, 500); 
            }
        });
    }

    loadDraft();
    updateWordCount();
    checkFormValidity();
    applySavedFontToTextarea(); 
    loadIdeaSuggestionFromURL(); // Call the new function here

    setInterval(saveDraft, 3000);
});
