// Membungkus seluruh kode dalam DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("thesaurus.js: DOMContentLoaded triggered. (Thesaurus script loaded)");
    
    // IMPORT: Mengimpor thesaurusDataMap dari dictionary.js
    // Ini akan mengambil data kamus dari modul dictionary.js
    let thesaurusDataMap; // Deklarasikan variabel untuk menampung data yang diimpor

    // Elemen utama
    const thesaurusSearchInput = document.getElementById('thesaurus-search-input');
    const clearThesaurusSearchBtn = document.getElementById('clear-thesaurus-search-btn');
    const thesaurusListContainer = document.getElementById('thesaurus-list');
    const noResultsMessage = document.getElementById('no-results');

    // Elemen Modal Tambah/Edit Kata Utama
    const addNewWordBtn = document.getElementById('add-new-word-btn');
    const wordFormModal = document.getElementById('word-form-modal');
    const closeModalBtn = document.getElementById('close-modal-btn'); 
    const modalTitle = document.getElementById('modal-title');
    const wordEntryForm = document.getElementById('word-entry-form');
    const mainWordInput = document.getElementById('main-word-input');
    const synonymsInput = document.getElementById('synonyms-input');
    const antonymsInput = document.getElementById('antonyms-input');
    const originalMainWordForEdit = document.getElementById('original-main-word-for-edit'); 

    // Kunci localStorage untuk font puisi (digunakan di halaman lain)
    const FONT_STORAGE_KEY = 'selectedPoemFont';

    // --- Fungsi untuk Mengelola Data Kustom Pengguna di Local Storage ---
    const USER_THESAURUS_KEY = 'userThesaurusData';

    function loadUserThesaurusData() {
        try {
            const data = localStorage.getItem(USER_THESAURUS_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Error loading user thesaurus data from localStorage:", e);
            return [];
        }
    }

    function saveUserThesaurusData(data) {
        try {
            localStorage.setItem(USER_THESAURUS_KEY, JSON.stringify(data));
        } catch (e) {
            console.error("Error saving user thesaurus data to localStorage:", e);
        }
    }

    // Menambah entri kata utama baru
    function addUserThesaurusEntry(entry) {
        const userEntries = loadUserThesaurusData();
        userEntries.push(entry);
        saveUserThesaurusData(userEntries);
    }

    // Memperbarui entri kata utama yang ada
    function updateUserThesaurusEntry(originalWord, updatedEntry) {
        let userEntries = loadUserThesaurusData();
        const index = userEntries.findIndex(entry => entry.word.toLowerCase() === originalWord.toLowerCase()); // Case-insensitive find
        if (index !== -1) {
            userEntries[index] = updatedEntry;
            saveUserThesaurusData(userEntries);
        } else {
            console.warn(`Attempted to update non-existent word: ${originalWord}`);
            addUserThesaurusEntry(updatedEntry); // If it's new, add it.
        }
    }

    // Menambah sinonim/antonim ke kata yang sudah ada (termasuk kata bawaan yang diubah)
    function addTermToEntry(mainWord, type, newTerms) {
        let userEntries = loadUserThesaurusData();
        let entryToModify = userEntries.find(e => e.word.toLowerCase() === mainWord.toLowerCase());

        if (!entryToModify) { // Jika kata utama bukan kustom, salin dari bawaan
            if (thesaurusDataMap) { // Menggunakan variabel lokal thesaurusDataMap yang diimpor
                const builtInEntryData = thesaurusDataMap[mainWord.toLowerCase()];
                if (builtInEntryData) {
                    // Clone the built-in entry and mark as custom
                    entryToModify = {
                        word: mainWord,
                        sinonim: [...builtInEntryData.sinonim],
                        antonim: [...builtInEntryData.antonim],
                        isCustom: true
                    };
                    userEntries.push(entryToModify);
                } else {
                    console.warn(`Could not find main word ${mainWord} to add terms to.`);
                    return;
                }
            } else {
                console.error("thesaurusDataMap is not available (not imported or loaded yet).");
                return;
            }
        }
        
        newTerms.forEach(term => {
            if (!entryToModify[type].map(s => s.toLowerCase()).includes(term.toLowerCase())) { // Hindari duplikasi case-insensitive
                entryToModify[type].push(term);
            }
        });
        saveUserThesaurusData(userEntries);
    }

    // Mengedit sinonim/antonim dari kata yang sudah ada
    function updateTermInEntry(mainWord, type, oldTerm, newTerm) {
        let userEntries = loadUserThesaurusData();
        const entryToModify = userEntries.find(e => e.word.toLowerCase() === mainWord.toLowerCase());
        
        if (entryToModify) {
            const termList = entryToModify[type];
            const termIndex = termList.findIndex(term => term.toLowerCase() === oldTerm.toLowerCase()); // Case-insensitive find
            if (termIndex !== -1) {
                termList[termIndex] = newTerm;
                saveUserThesaurusData(userEntries);
            }
        }
    }

    // Menghapus sinonim/antonim dari kata yang sudah ada
    function deleteTermFromEntry(mainWord, type, termToDelete) {
        let userEntries = loadUserThesaurusData();
        const entryToModify = userEntries.find(e => e.word.toLowerCase() === mainWord.toLowerCase());
        
        if (entryToModify) {
            entryToModify[type] = entryToModify[type].filter(term => term.toLowerCase() !== termToDelete.toLowerCase()); // Case-insensitive filter
            saveUserThesaurusData(userEntries);
        }
    }

    // -------------------------------------------------------------------

    let copyFeedbackTimeout;
    function showCopyFeedback(message, targetElement) {
        const existingFeedback = targetElement.querySelector('.contextual-copy-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }

        const feedbackSpan = document.createElement('span');
        feedbackSpan.classList.add('contextual-copy-feedback');
        feedbackSpan.textContent = message;
        
        targetElement.appendChild(feedbackSpan);

        setTimeout(() => {
            feedbackSpan.classList.add('show');
        }, 10); 

        clearTimeout(copyFeedbackTimeout);
        copyFeedbackTimeout = setTimeout(() => {
            feedbackSpan.classList.remove('show');
            feedbackSpan.addEventListener('transitionend', () => feedbackSpan.remove(), { once: true });
        }, 1500); 
    }

    let debounceTimer;
    // Fungsi debounce untuk membatasi frekuensi pemanggilan fungsi
    function debounce(func, delay) {
        return function(...args) {
            const context = this;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    }

    // Event listener utama untuk re-rendering
    function handleThesaurusSearchInput() {
        // Karena `thesaurusDataMap` adalah sumber kebenaran utama sekarang,
        // kita perlu membangun list untuk rendering dari sana.
        if (!thesaurusDataMap) { // Menggunakan variabel lokal thesaurusDataMap
            console.error("thesaurusDataMap is not available. Cannot render thesaurus list.");
            return;
        }

        renderThesaurusList(thesaurusSearchInput.value);
    }

    // Event listener untuk tombol hapus pencarian
    function handleClearSearchClick() {
        thesaurusSearchInput.value = '';
        if (!thesaurusDataMap) { // Menggunakan variabel lokal thesaurusDataMap
            console.error("thesaurusDataMap is not available. Cannot clear search.");
            return;
        }
        renderThesaurusList('');
        thesaurusSearchInput.focus(); 
    }

    function renderThesaurusList(filterText = '') {
        // Ensure thesaurusListContainer and noResultsMessage are present
        if (!thesaurusListContainer || !noResultsMessage) {
            console.warn("Thesaurus list containers not found. Skipping renderThesaurusList.");
            return;
        }

        thesaurusListContainer.innerHTML = ''; 
        noResultsMessage.style.display = 'none';

        const lowerCaseFilter = filterText.toLowerCase();

        if (!thesaurusDataMap) { // Menggunakan variabel lokal thesaurusDataMap
            console.error("thesaurusDataMap is undefined. Cannot render thesaurus list.");
            return;
        }

        const currentThesaurusData = Array.from(Object.keys(thesaurusDataMap)).map(word => {
            const entry = thesaurusDataMap[word];
            // Tambahkan properti `isCustom` jika ada dalam data user, atau default ke false
            const isCustom = loadUserThesaurusData().some(userEntry => userEntry.word.toLowerCase() === word);
            return {
                word: word, // Gunakan key map sebagai kata utama
                synonyms: entry.sinonim,
                antonyms: entry.antonim,
                isCustom: isCustom
            };
        });
        
        currentThesaurusData.sort((a, b) => a.word.localeCompare(b.word));

        const filteredData = currentThesaurusData.filter(entry => {
            return (
                entry.word.toLowerCase().includes(lowerCaseFilter) ||
                entry.synonyms.some(s => s.toLowerCase().includes(lowerCaseFilter)) ||
                entry.antonyms.some(a => a.toLowerCase().includes(lowerCaseFilter))
            );
        });

        if (filteredData.length === 0 && filterText.trim() !== '') {
            noResultsMessage.style.display = 'block';
            return;
        } else if (filteredData.length === 0 && filterText.trim() === '') {
            thesaurusListContainer.innerHTML = '<p class="empty-state">Tidak ada data thesaurus yang tersedia.</p>';
            return;
        }

        const fragment = document.createDocumentFragment();

        filteredData.forEach((entry) => { 
            const highlightText = (text, filter) => {
                if (!filter) return text;
                const regex = new RegExp(`(${filter})`, 'gi');
                return text.replace(regex, '<span class="highlight">$&</span>');
            };

            const highlightedWord = highlightText(entry.word, lowerCaseFilter);

            const createInteractiveTags = (words, filter, mainWord, type, isParentCustom) => {
                if (!words || words.length === 0) return ''; 
                return words.map(word => {
                    const uniqueTagId = `${mainWord}-${type}-${word}`.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');

                    return `<span class="word-tag ${isParentCustom ? 'custom-tag' : ''}" 
                                data-word="${word}" 
                                data-main-word="${mainWord}" 
                                data-type="${type}" 
                                data-original-term="${word}" 
                                id="tag-${uniqueTagId}" 
                                >
                                ${highlightText(word, filter)}
                                ${isParentCustom ? `
                                    <span class="tag-actions">
                                        <i class="fas fa-edit edit-inline-tag" title="Edit Tag" aria-label="Edit Tag"></i>
                                        <i class="fas fa-trash-alt delete-inline-tag" title="Hapus Tag" aria-label="Hapus Tag"></i>
                                    </span>
                                ` : ''}
                            </span>`;
                }).join(''); 
            };

            const sanitizedWordForId = entry.word.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');

            const synonymTags = createInteractiveTags(entry.synonyms, lowerCaseFilter, entry.word, 'sinonim', entry.isCustom);
            const antonymTags = createInteractiveTags(entry.antonyms, lowerCaseFilter, entry.word, 'antonim', entry.isCustom);

            const listItem = document.createElement('div');
            listItem.classList.add('thesaurus-item');
            if (entry.isCustom) {
                listItem.classList.add('custom-entry'); 
            }

            listItem.innerHTML = `
                <div class="main-word-row">
                    <span class="word-number"></span>
                    <span class="main-word">${highlightedWord}</span>
                    ${entry.isCustom ? `
                        <div class="custom-actions">
                            <button class="edit-main-word-btn" data-word="${entry.word}" title="Edit Kata Utama Kustom" aria-label="Edit Kata Utama Kustom"><i class="fas fa-edit"></i></button>
                            <button class="delete-main-word-btn" data-word="${entry.word}" title="Hapus Kata Utama Kustom" aria-label="Hapus Kata Utama Kustom"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    ` : ''}
                </div>
                <div class="word-details">
                    <div class="detail-group">
                        <div class="detail-label clickable-dropdown" data-target="synonym-content-${sanitizedWordForId}" aria-label="Lihat Sinonim untuk ${entry.word}">
                            Sinonim <i class="fas fa-chevron-down dropdown-arrow"></i>
                        </div>
                        <div id="synonym-content-${sanitizedWordForId}" class="detail-content" data-main-word="${entry.word}" data-type="sinonim">
                            <div class="tag-container">${synonymTags}</div>
                            <button class="add-inline-term-btn" data-type="sinonim" data-main-word="${entry.word}" title="Tambah Sinonim" aria-label="Tambah Sinonim"><i class="fas fa-plus"></i> Tambah</button>
                            <button class="copy-button" data-copy-text="${entry.synonyms.join(', ')}" aria-label="Salin Sinonim"><i class="fas fa-copy"></i></button>
                        </div>
                    </div>
                    <div class="detail-group">
                        <div class="detail-label clickable-dropdown" data-target="antonym-content-${sanitizedWordForId}" aria-label="Lihat Antonim untuk ${entry.word}">
                            Antonim <i class="fas fa-chevron-down dropdown-arrow"></i>
                        </div>
                        <div id="antonym-content-${sanitizedWordForId}" class="detail-content" data-main-word="${entry.word}" data-type="antonim">
                            <div class="tag-container">${antonymTags}</div>
                            <button class="add-inline-term-btn" data-type="antonim" data-main-word="${entry.word}" title="Tambah Antonim" aria-label="Tambah Antonim"><i class="fas fa-plus"></i> Tambah</button>
                            <button class="copy-button" data-copy-text="${entry.antonyms.join(', ')}" aria-label="Salin Antonim"><i class="fas fa-copy"></i></button>
                        </div>
                    </div>
                </div>
            `;
            fragment.appendChild(listItem); 
        });

        thesaurusListContainer.appendChild(fragment); 

        document.querySelectorAll('.clickable-dropdown').forEach(dropdown => {
            dropdown.removeEventListener('click', handleDropdownClick);
            dropdown.addEventListener('click', handleDropdownClick);
        });

        document.querySelectorAll('.copy-button').forEach(button => {
            button.removeEventListener('click', handleCopyClick);
            button.addEventListener('click', handleCopyClick);
        });

        document.querySelectorAll('.add-inline-term-btn').forEach(button => {
            button.removeEventListener('click', handleAddInlineTerm);
            button.addEventListener('click', handleAddInlineTerm);
        });

        document.querySelectorAll('.edit-inline-tag').forEach(button => {
            button.removeEventListener('click', handleEditInlineTag);
            button.addEventListener('click', handleEditInlineTag);
        });

        document.querySelectorAll('.delete-inline-tag').forEach(button => {
            button.removeEventListener('click', handleDeleteInlineTag);
            button.addEventListener('click', handleDeleteInlineTag);
        });

        document.querySelectorAll('.edit-main-word-btn').forEach(button => {
            button.removeEventListener('click', handleEditMainWord);
            button.addEventListener('click', handleEditMainWord);
        });

        document.querySelectorAll('.delete-main-word-btn').forEach(button => {
            button.removeEventListener('click', handleDeleteMainWord);
            button.addEventListener('click', handleDeleteMainWord);
        });

        if (!thesaurusListContainer.hasAttribute('data-word-tag-listener')) {
            thesaurusListContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('word-tag') && !e.target.closest('.tag-actions')) { 
                    const word = e.target.getAttribute('data-word');
                    if (word) {
                        thesaurusSearchInput.value = word;
                        thesaurusSearchInput.focus(); 
                        renderThesaurusList(word);
                    }
                }
            });
            thesaurusListContainer.setAttribute('data-word-tag-listener', 'true');
        }

        if (thesaurusSearchInput && clearThesaurusSearchBtn) {
            thesaurusSearchInput.removeEventListener('input', debouncedSearchInputHandler);
            clearThesaurusSearchBtn.removeEventListener('click', handleClearSearchClick);
            
            thesaurusSearchInput.addEventListener('input', debouncedSearchInputHandler);
            clearThesaurusSearchBtn.addEventListener('click', handleClearSearchClick);
            
            if (thesaurusSearchInput.value.trim() !== '') {
                clearThesaurusSearchBtn.style.display = 'block';
            } else {
                clearThesaurusSearchBtn.style.display = 'none';
            }
        }
        
        if (addNewWordBtn) {
            addNewWordBtn.removeEventListener('click', handleAddNewWordClick);
            addNewWordBtn.addEventListener('click', handleAddNewWordClick);
        }
        if (closeModalBtn) {
            closeModalBtn.removeEventListener('click', handleCloseModalClick);
            closeModalBtn.addEventListener('click', handleCloseModalClick);
        }
        if (wordEntryForm) {
            wordEntryForm.removeEventListener('submit', handleWordEntryFormSubmit);
            wordEntryForm.addEventListener('submit', handleWordEntryFormSubmit);
        }
    }

    const debouncedSearchInputHandler = debounce(handleThesaurusSearchInput, 300);

    function handleDropdownClick() { 
        const targetId = this.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        const arrowIcon = this.querySelector('.dropdown-arrow');
        const parentItem = this.closest('.thesaurus-item');

        if (targetContent) {
            const isExpanded = targetContent.classList.toggle('expanded');
            arrowIcon.classList.toggle('active');
            if (parentItem) {
                parentItem.classList.toggle('active-item', isExpanded);
            }
        }
    }
    function handleCopyClick(e) { 
        e.stopPropagation(); 
        const textToCopy = this.getAttribute('data-copy-text');
        try {
            navigator.clipboard.writeText(textToCopy);
            showCopyFeedback('Disalin!', this); 
        } catch (err) {
            console.error('Gagal menyalin: ', err);
            showCopyFeedback('Gagal menyalin!', this);
        }
    }
    async function handleAddInlineTerm(e) { // Make async for await showAlert
        console.log("Add Inline Term button clicked!"); 
        const addBtn = e.target;
        const detailContent = addBtn.closest('.detail-content');
        if (!detailContent) {
            console.error("detailContent not found for addInlineTermBtn"); 
            return;
        }

        const mainWord = detailContent.dataset.mainWord;
        const type = detailContent.dataset.type; 

        addBtn.style.display = 'none'; 
        const copyBtn = detailContent.querySelector('.copy-button');
        if(copyBtn) copyBtn.style.display = 'none'; 

        const inputContainer = document.createElement('span');
        inputContainer.classList.add('inline-add-container');
        inputContainer.innerHTML = `
            <input type="text" class="inline-add-input" placeholder="Kata baru (koma untuk banyak)">
            <button class="save-inline-add-btn" data-main-word="${mainWord}" data-type="${type}" aria-label="Simpan Kata Baru"><i class="fas fa-check"></i></button>
            <button class="cancel-inline-add-btn" aria-label="Batal Tambah"><i class="fas fa-times"></i></button>
        `;
        const tagContainer = detailContent.querySelector('.tag-container');
        if(tagContainer) {
            tagContainer.parentNode.insertBefore(inputContainer, tagContainer.nextSibling);
        } else {
            detailContent.insertBefore(inputContainer, copyBtn);
        }
        
        const inputField = inputContainer.querySelector('.inline-add-input');
        inputField.focus();

        inputContainer.querySelector('.save-inline-add-btn').addEventListener('click', async () => { // Make async
            const newTermsString = inputField.value.trim();
            if (newTermsString) {
                const newTerms = newTermsString.split(',').map(s => s.trim()).filter(s => s !== '');
                
                const currentEntry = thesaurusDataMap[mainWord.toLowerCase()]; // Menggunakan thesaurusDataMap lokal
                const existingTerms = currentEntry ? currentEntry[type].map(s => s.toLowerCase()) : [];
                const termsToAdd = newTerms.filter(term => !existingTerms.includes(term.toLowerCase()));
                
                if (termsToAdd.length > 0) {
                    addTermToEntry(mainWord, type, termsToAdd);
                } else if (newTerms.length > 0) {
                    window.showAlert("Kata-kata yang Anda coba tambahkan sudah ada.", "Duplikasi Kata");
                    inputField.focus();
                    return;
                }
            }
            // Perbaikan: Setelah update, kita perlu memuat ulang data thesaurusMap dengan user data
            await initializeThesaurusData(); // Panggil fungsi inisialisasi ulang data
            renderThesaurusList(thesaurusSearchInput.value);
        });

        inputContainer.querySelector('.cancel-inline-add-btn').addEventListener('click', () => {
            // Perbaikan: Setelah batal, kita perlu memuat ulang data thesaurusMap dengan user data
            initializeThesaurusData(); // Panggil fungsi inisialisasi ulang data
            renderThesaurusList(thesaurusSearchInput.value);
        });

        inputField.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                inputContainer.querySelector('.save-inline-add-btn').click();
            }
        });
    }
    async function handleEditInlineTag(e) { // Make async
        console.log("Edit Inline Tag button clicked!"); 
        const tagSpan = e.target.closest('.word-tag');
        if (!tagSpan) {
            console.error("tagSpan not found for editInlineTag"); 
            return;
        }

        const mainWord = tagSpan.dataset.mainWord; 
        const type = tagSpan.dataset.type; 
        const originalTerm = tagSpan.dataset.originalTerm; 
        const tagContainer = tagSpan.parentNode;
        
        tagSpan.style.display = 'none';

        const inputContainer = document.createElement('span');
        inputContainer.classList.add('inline-edit-container');
        inputContainer.innerHTML = `
            <input type="text" class="inline-edit-input" value="${originalTerm}">
            <button class="save-inline-edit-term-btn" data-main-word="${mainWord}" data-type="${type}" data-original-term="${originalTerm}" aria-label="Simpan Editan"><i class="fas fa-check"></i></button>
            <button class="cancel-inline-edit-term-btn" aria-label="Batal Edit"><i class="fas fa-times"></i></button>
        `;
        tagContainer.parentNode.insertBefore(inputContainer, tagContainer.nextSibling);

        const inputField = inputContainer.querySelector('.inline-edit-input');
        inputField.focus();

        inputContainer.querySelector('.save-inline-edit-term-btn').addEventListener('click', async () => { // Make async
            const newTerm = inputField.value.trim();
            if (newTerm && newTerm.toLowerCase() !== originalTerm.toLowerCase()) {
                 const currentEntry = thesaurusDataMap[mainWord.toLowerCase()]; // Menggunakan thesaurusDataMap lokal
                 if (currentEntry && currentEntry[type].map(s => s.toLowerCase()).includes(newTerm.toLowerCase())) {
                    window.showAlert(`"${newTerm}" sudah ada dalam daftar ini.`, "Duplikasi Kata");
                    inputField.focus();
                    return;
                 }
                updateTermInEntry(mainWord, type, originalTerm, newTerm);
            }
            // Perbaikan: Setelah update, kita perlu memuat ulang data thesaurusMap dengan user data
            await initializeThesaurusData(); // Panggil fungsi inisialisasi ulang data
            renderThesaurusList(thesaurusSearchInput.value);
        });

        inputContainer.querySelector('.cancel-inline-edit-term-btn').addEventListener('click', () => {
            // Perbaikan: Setelah batal, kita perlu memuat ulang data thesaurusMap dengan user data
            initializeThesaurusData(); // Panggil fungsi inisialisasi ulang data
            renderThesaurusList(thesaurusSearchInput.value);
        });

        inputField.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                inputContainer.querySelector('.save-inline-edit-term-btn').click();
            }
        });
    }
    async function handleDeleteInlineTag(e) { // Make async
        console.log("Delete Inline Tag button clicked!"); 
        const tagSpan = e.target.closest('.word-tag');
        if (!tagSpan) {
            console.error("tagSpan not found for deleteInlineTag"); 
            return;
        }

        const mainWord = tagSpan.dataset.mainWord; 
        const type = tagSpan.dataset.type;
        const termToDelete = tagSpan.dataset.originalTerm; 

        const userConfirmed = await window.showConfirm(`Anda yakin ingin menghapus tag "${termToDelete}"?`, "Hapus Tag");
        if (userConfirmed) {
            deleteTermFromEntry(mainWord, type, termToDelete);
            // Perbaikan: Setelah hapus, kita perlu memuat ulang data thesaurusMap dengan user data
            await initializeThesaurusData(); // Panggil fungsi inisialisasi ulang data
            renderThesaurusList(thesaurusSearchInput.value);
        }
    }
    function handleEditMainWord() { 
        console.log("Edit Main Word button clicked!"); 
        const wordToEdit = this.dataset.word;
        const userEntries = loadUserThesaurusData();
        const entry = userEntries.find(e => e.word.toLowerCase() === wordToEdit.toLowerCase());

        if (entry) {
            modalTitle.textContent = 'Edit Kata Tesaurus'; 
            mainWordInput.value = entry.word;
            mainWordInput.readOnly = true; 
            synonymsInput.value = entry.sinonim.join(', '); 
            antonymsInput.value = entry.antonim.join(', '); 
            originalMainWordForEdit.value = entry.word; 

            wordFormModal.style.display = 'block';
            document.getElementById('overlay').classList.add('active'); // Activate overlay
        }
    }
    async function handleDeleteMainWord() { // Make async
        console.log("Delete Main Word button clicked!"); 
        const wordToDelete = this.dataset.word;

        const userConfirmed = await window.showConfirm(`Anda yakin ingin menghapus kata kustom "${wordToDelete}" dan semua sinonim/antonimnya?`, "Hapus Kata Utama");
        if (userConfirmed) {
            deleteUserThesaurusEntry(wordToDelete);
            // Perbaikan: Setelah hapus, kita perlu memuat ulang data thesaurusMap dengan user data
            await initializeThesaurusData(); // Panggil fungsi inisialisasi ulang data
            renderThesaurusList(thesaurusSearchInput.value);
        }
    }
    function handleAddNewWordClick() { 
        console.log("Add New Word button clicked!"); 
        modalTitle.textContent = 'Tambah Kata Tesaurus Baru'; 
        wordEntryForm.reset(); 
        mainWordInput.readOnly = false; 
        originalMainWordForEdit.value = ''; 
        wordFormModal.style.display = 'block';
        document.getElementById('overlay').classList.add('active'); // Activate overlay
    }
    function handleCloseModalClick() { 
        console.log("Close Modal button clicked!"); 
        wordFormModal.style.display = 'none';
        document.getElementById('overlay').classList.remove('active'); // Deactivate overlay
    }
    async function handleWordEntryFormSubmit(e) { // Make async
        console.log("Word Entry Form submitted!"); 
        e.preventDefault();

        const newWord = mainWordInput.value.trim();
        const newSynonyms = synonymsInput.value.split(',').map(s => s.trim()).filter(s => s !== '');
        const newAntonyms = antonymsInput.value.split(',').map(a => a.trim()).filter(a => a !== '');

        if (!newWord) {
            window.showAlert('Kata Utama tidak boleh kosong!', "Input Dibutuhkan");
            return;
        }

        const entry = {
            word: newWord,
            sinonim: newSynonyms, 
            antonim: newAntonyms 
        };

        const originalWordForEditVal = originalMainWordForEdit.value;
        if (originalWordForEditVal !== '') {
            updateUserThesaurusEntry(originalWordForEditVal, { ...entry, isCustom: true }); 
        } else {
            // Perbaikan: Cek duplikasi di thesaurusDataMap lokal
            if (thesaurusDataMap && thesaurusDataMap[newWord.toLowerCase()]) { // Menggunakan thesaurusDataMap lokal
                window.showAlert(`Kata "${newWord}" sudah ada dalam Tesaurus.`, "Duplikasi Kata"); 
                return;
            }
            addUserThesaurusEntry({ ...entry, isCustom: true }); 
        }
        
        // After submission, update thesaurusDataMap
        await initializeThesaurusData(); // Panggil fungsi inisialisasi ulang data
        renderThesaurusList(thesaurusSearchInput ? thesaurusSearchInput.value : ''); 
        wordFormModal.style.display = 'none';
        document.getElementById('overlay').classList.remove('active'); // Deactivate overlay
    }

    // NEW: Fungsi untuk menginisialisasi atau memuat ulang thesaurusDataMap
    // Fungsi ini sekarang mengimpor thesaurusDataMap dari dictionary.js
    async function initializeThesaurusData() {
        try {
            // Import the thesaurusDataMap from dictionary.js dynamically
            // This is crucial for environments where 'import' isn't top-level
            // or to ensure the latest data is fetched.
            // Using a dynamic import might be necessary if the static import fails
            // to provide the data immediately due to module loading order.
            const module = await import('./dictionary.js');
            thesaurusDataMap = module.thesaurusDataMap; // Assign the imported map

            // Gabungkan data kustom pengguna
            const userThesaurusEntries = loadUserThesaurusData();
            userThesaurusEntries.forEach(entry => {
                thesaurusDataMap[entry.word.toLowerCase()] = {
                    sinonim: entry.sinonim,
                    antonim: entry.antonim,
                    isCustom: true // Tandai sebagai kustom
                };
            });
            
            console.log("thesaurus.js: Thesaurus data initialized/reloaded with custom entries.");
        } catch (error) {
            console.error("Failed to import dictionary.js or initialize thesaurus data:", error);
            // Fallback: Jika import gagal, pastikan thesaurusDataMap setidaknya objek kosong
            thesaurusDataMap = {}; 
        }
    }

    // Main Initialization
    // Panggil inisialisasi data thesaurus sebelum rendering
    initializeThesaurusData().then(() => {
        renderThesaurusList(thesaurusSearchInput ? thesaurusSearchInput.value : '');
    });
});
