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
    const submissionMessage = document.getElementById('submission-message'); // NEW: Referensi elemen pesan

    // Elements for idea suggestion
    const ideaSuggestionContainer = document.getElementById('idea-suggestion-box'); // Corrected ID
    const ideaSuggestionText = document.getElementById('idea-suggestion-text');
    const clearSuggestionBtn = document.getElementById('clear-idea-suggestion'); // Corrected ID


    let selectedColor = 'white'; 
    let autosaveTimeout;
    let isFormDirty = false; 

    // Kunci localStorage untuk font puisi (sekarang di common.js)
    const FONT_STORAGE_KEY = window.FONT_STORAGE_KEY || 'selectedPoemFont';
    // Available fonts (sekarang di common.js)
    const availableFonts = window.availableFonts || [];


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
        // Asumsi warna putih adalah default dan selalu valid, atau pastikan pengguna memilihnya
        const colorSelected = selectedColor !== null && selectedColor !== ''; 

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

    // NEW: Fungsi untuk menampilkan pesan submission
    function showSubmissionMessage(message, duration = 3000) {
        if (submissionMessage) {
            submissionMessage.textContent = message;
            submissionMessage.classList.add('show');
            setTimeout(() => {
                submissionMessage.classList.remove('show');
            }, duration);
        }
    }


    function saveDraft() {
        if (!isFormDirty) { // Hanya simpan jika ada perubahan
            return;
        }

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
                    poemContentTextarea.classList.remove('yellow', 'blue', 'red', 'white'); // Hapus semua tema sebelumnya
                    poemContentTextarea.classList.add(selectedColor); 
                }
            }

            // Pesan draf akan muncul dan akan hilang setelah beberapa detik
            draftMessage.textContent = 'Draf berhasil dimuat.';
            draftMessage.classList.add('show');
            setTimeout(() => { // NEW: Tambahkan setTimeout untuk menyembunyikan draftMessage
                draftMessage.classList.remove('show');
            }, 3000); 
            
            updateWordCount();
            checkFormValidity();
            markFormClean(); 
        } else {
            // Set default color to white if no draft or theme
            selectedColor = 'white';
            const defaultWhiteCircle = document.querySelector(`.color-circle[data-color="white"]`);
            if (defaultWhiteCircle) {
                defaultWhiteCircle.classList.add('active');
            }
            poemContentTextarea.classList.remove('yellow', 'blue', 'red'); // Pastikan hanya 'white' yang aktif
            poemContentTextarea.classList.add('white'); 
            markFormClean(); 
        }
    }

    // New: Handle editing an existing poem
    function loadPoemForEdit() {
        const urlParams = new URLSearchParams(window.location.search);
        const editId = urlParams.get('editId'); // Use 'editId' parameter

        if (editId !== null) {
            const poems = JSON.parse(localStorage.getItem('poems')) || [];
            // Find the poem by its actual index or a unique ID if you implement one
            // Currently, 'editPoemId' from my-poem.js stores the array index.
            const poemToEdit = poems[parseInt(editId)]; 

            if (poemToEdit) {
                poemTitleInput.value = poemToEdit.title;
                poemAuthorInput.value = poemToEdit.author;
                poemContentTextarea.value = poemToEdit.content;
                selectedColor = poemToEdit.theme || 'white';

                const currentThemeCircle = document.querySelector(`.color-circle[data-color="${selectedColor}"]`);
                if (currentThemeCircle) {
                    colorCircles.forEach(c => c.classList.remove('active'));
                    currentThemeCircle.classList.add('active');
                }
                poemContentTextarea.classList.remove('yellow', 'blue', 'red', 'white');
                poemContentTextarea.classList.add(selectedColor);

                // Store the editId globally for the form submit to know it's an update
                form.dataset.editId = editId;

                updateWordCount();
                checkFormValidity();
                console.log(`Editing poem with ID: ${editId}`);
                // Pesan mode edit akan muncul dan akan hilang setelah beberapa detik
                draftMessage.textContent = 'Mode Edit: Puisi dimuat.';
                draftMessage.classList.add('show');
                setTimeout(() => { // NEW: Tambahkan setTimeout untuk menyembunyikan draftMessage
                    draftMessage.classList.remove('show');
                }, 3000); 
                localStorage.removeItem('poemDraft'); // Clear draft when editing
            } else {
                console.warn(`Poem to edit with ID ${editId} not found.`);
                loadDraft(); // Fallback to draft if poem not found
            }
        } else {
            loadDraft(); // Load draft if not in edit mode
        }
    }


    // Fungsi untuk menerapkan font yang disimpan ke textarea
    function applySavedFontToTextarea() {
        const savedFontClass = localStorage.getItem(FONT_STORAGE_KEY) || 'font-quicksand';
        // Hapus semua kelas font yang mungkin sudah ada sebelum menambahkan yang baru
        if (availableFonts && availableFonts.length > 0) {
            poemContentTextarea.classList.remove(...availableFonts.map(f => f.className));
        }
        poemContentTextarea.classList.add(savedFontClass); 
        console.log("write.js: Applied saved font to textarea:", savedFontClass);
    }

    // New: Function to load idea suggestion from URL
    function loadIdeaSuggestionFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const idea = urlParams.get('idea');

        if (idea) {
            ideaSuggestionContainer.style.display = 'flex'; // Make sure the container is visible
            ideaSuggestionText.textContent = idea;
            
            // Optionally, you could pre-fill the textarea with the idea
            // poemContentTextarea.value = idea; 
            // updateWordCount();
            // checkFormValidity();
        } else {
            ideaSuggestionContainer.style.display = 'none'; // Hide if no idea
        }
    }

    // Event listener for clear suggestion button
    if (clearSuggestionBtn) {
        clearSuggestionBtn.addEventListener('click', () => {
            ideaSuggestionContainer.style.display = 'none';
            ideaSuggestionText.textContent = '';
            // Also clear the URL parameter from the browser history
            window.history.replaceState({}, document.title, window.location.pathname);
            
            // NEW: Tampilkan notifikasi "Ide telah dihilangkan"
            showSubmissionMessage('Ide telah dihilangkan. Selamat berkreativitas!');
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
        form.addEventListener('submit', async (event) => { 
            event.preventDefault();

            if (publishBtn.hasAttribute('disabled')) {
                // OLD: await window.showAlert('Mohon lengkapi semua kolom dan pilih tema puisi!', 'Form Tidak Lengkap'); 
                showSubmissionMessage('Mohon lengkapi semua kolom dan pilih tema puisi!'); // NEW: Ganti dengan pesan non-modal
                return;
            }

            const poemToSave = {
                title: poemTitleInput.value,
                author: poemAuthorInput.value,
                content: poemContentTextarea.value,
                theme: selectedColor,
                dateCreated: new Date().toISOString() // Tambahkan tanggal pembuatan
            };

            let poems = JSON.parse(localStorage.getItem('poems')) || [];
            const editId = form.dataset.editId; // Get the editId if in edit mode

            if (editId !== undefined && poems[parseInt(editId)]) {
                // Update existing poem
                poems[parseInt(editId)] = poemToSave;
                // OLD: await window.showAlert('Puisi berhasil diperbarui!', 'Berhasil!');
                showSubmissionMessage('Puisi berhasil diperbarui!'); // NEW: Ganti dengan pesan non-modal
            } else {
                // Add new poem
                poems.push(poemToSave);
                // OLD: await window.showAlert('Puisi berhasil dipublikasikan!', 'Berhasil!');
                showSubmissionMessage('Puisi berhasil dipublikasikan!'); // NEW: Ganti dengan pesan non-modal
            }
            
            localStorage.setItem('poems', JSON.stringify(poems));
            localStorage.removeItem('poemDraft');
            markFormClean(); 

            // Menggunakan transisi halaman manual dari common.js
            const nextUrl = 'my-poem.html'; // Arahkan ke my-poem setelah publikasi
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

    loadPoemForEdit(); // Call this first to check for edit mode
    // If not in edit mode, it will call loadDraft internally.
    updateWordCount();
    checkFormValidity();
    applySavedFontToTextarea(); 
    loadIdeaSuggestionFromURL(); // Call the new function here

    setInterval(saveDraft, 3000);
});
