document.addEventListener('DOMContentLoaded', () => {
    console.log("settings.js: DOMContentLoaded triggered. (Settings script loaded)");

    // Elemen Modal Font
    const fontSelectorTrigger = document.getElementById('font-selector-trigger');
    const fontModal = document.getElementById('font-modal');
    const closeFontModalBtn = document.getElementById('close-font-modal-btn');
    const fontOptionsGrid = document.getElementById('font-options-grid');
    const overlay = document.getElementById('overlay'); // Dapatkan overlay yang sama dari common.js

    // LOG: Memeriksa apakah elemen-elemen Font Selector ditemukan
    console.log("settings.js: Font Selector Elements - trigger:", fontSelectorTrigger, "modal:", fontModal, "closeBtn:", closeFontModalBtn, "grid:", fontOptionsGrid);


    // Definisi font yang tersedia
    const availableFonts = [
        { name: 'Quicksand (Default)', className: 'font-quicksand', style: 'font-family: "Quicksand", sans-serif;' },
        { name: 'Lora', className: 'font-lora', style: 'font-family: "Lora", serif;' },
        { name: 'Merriweather', className: 'font-merriweather', style: 'font-family: "Merriweather", serif;' },
        { name: 'Playfair Display', className: 'font-playfair', style: 'font-family: "Playfair Display", serif;' }
    ];
    const FONT_STORAGE_KEY = 'selectedPoemFont';

    // Fungsi untuk merender pilihan font
    function renderFontOptions() {
        if (!fontOptionsGrid) {
            console.error("settings.js: fontOptionsGrid not found, cannot render font options.");
            return;
        }
        fontOptionsGrid.innerHTML = '';
        const currentFontClass = localStorage.getItem(FONT_STORAGE_KEY) || 'font-quicksand'; // Default Quicksand

        availableFonts.forEach(font => {
            const fontCard = document.createElement('div');
            fontCard.classList.add('font-card');
            if (font.className === currentFontClass) {
                fontCard.classList.add('active');
            }
            fontCard.setAttribute('data-font-class', font.className);
            fontCard.style = font.style; // Terapkan gaya font langsung untuk preview

            fontCard.innerHTML = `
                <p class="font-preview-text">Puisi adalah kehidupan</p>
                <p class="font-name">${font.name}</p>
            `;
            fontOptionsGrid.appendChild(fontCard);
        });
        console.log("settings.js: Font options rendered.");
    }

    // Fungsi untuk menerapkan font ke body (untuk elemen puisi yang inherit)
    function applyFontToBody(fontClass) {
        // Hapus semua kelas font sebelumnya
        document.body.classList.remove(...availableFonts.map(f => f.className));
        // Tambahkan kelas font yang baru
        document.body.classList.add(fontClass);
        // Simpan pilihan di localStorage
        localStorage.setItem(FONT_STORAGE_KEY, fontClass);
        console.log("settings.js: Applied font:", fontClass);
    }

    // Fungsi untuk memuat font yang tersimpan saat halaman dimuat
    function loadSavedFont() {
        const savedFont = localStorage.getItem(FONT_STORAGE_KEY);
        if (savedFont) {
            applyFontToBody(savedFont);
        } else {
            // Terapkan default jika belum ada pilihan
            applyFontToBody('font-quicksand');
        }
        console.log("settings.js: Loaded saved font.");
    }

    // Event listener untuk membuka modal font
    if (fontSelectorTrigger) {
        fontSelectorTrigger.addEventListener('click', () => {
            console.log("settings.js: Font selector trigger clicked. Opening modal.");
            renderFontOptions(); // Render opsi setiap kali modal dibuka
            if (fontModal) fontModal.style.display = 'block';
            if (overlay) overlay.classList.add('active'); // Aktifkan overlay
        });
    } else {
        console.warn("settings.js: fontSelectorTrigger not found.");
    }

    // Event listener untuk menutup modal font
    if (closeFontModalBtn) {
        closeFontModalBtn.addEventListener('click', () => {
            console.log("settings.js: Close font modal button clicked. Closing modal.");
            if (fontModal) fontModal.style.display = 'none';
            if (overlay) overlay.classList.remove('active'); // Nonaktifkan overlay
        });
    } else {
        console.warn("settings.js: closeFontModalBtn not found.");
    }

    // Event listener untuk memilih font dari grid
    if (fontOptionsGrid) {
        fontOptionsGrid.addEventListener('click', (e) => {
            const fontCard = e.target.closest('.font-card');
            if (fontCard) {
                const selectedFontClass = fontCard.getAttribute('data-font-class');
                if (selectedFontClass) {
                    console.log("settings.js: Font card clicked. Applying font:", selectedFontClass);
                    applyFontToBody(selectedFontClass);
                    // Perbarui status aktif pada kartu font
                    document.querySelectorAll('.font-card').forEach(card => {
                        card.classList.remove('active');
                    });
                    fontCard.classList.add('active');
                } else {
                    console.warn("settings.js: Clicked font card without data-font-class attribute.");
                }
            } else {
                console.log("settings.js: Clicked element is not a font card.");
            }
        });
    } else {
        console.warn("settings.js: fontOptionsGrid not found.");
    }

    // Event listener untuk menutup modal jika klik di luar modal atau di overlay
    if (overlay && fontModal) {
        if (!overlay.hasAttribute('data-overlay-listener-added')) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) { 
                    console.log("settings.js: Overlay clicked. Closing font modal.");
                    if (fontModal) fontModal.style.display = 'none';
                    overlay.classList.remove('active');
                }
            });
            overlay.setAttribute('data-overlay-listener-added', 'true');
        }
    }
    
    // Muat font yang tersimpan saat pertama kali halaman Pengaturan dimuat
    loadSavedFont();
});