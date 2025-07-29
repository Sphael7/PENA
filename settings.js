document.addEventListener('DOMContentLoaded', () => {
    console.log("settings.js: DOMContentLoaded triggered. (Settings script loaded)");

    // Elemen Modal Font (sekarang dikomentari karena dihapus dari HTML)
    // const fontSelectorTrigger = document.getElementById('font-selector-trigger');
    // const fontModal = document.getElementById('font-modal');
    // const closeFontModalBtn = document.getElementById('close-font-modal-btn');
    // const fontOptionsGrid = document.getElementById('font-options-grid');

    // Hapus referensi ke variabel global font yang tidak lagi dibutuhkan di settings.js
    // const availableFonts = window.availableFonts;
    // const FONT_STORAGE_KEY = window.FONT_STORAGE_KEY;
    // const applyFontToBody = window.applyFontToBody;

    // Fungsi untuk merender pilihan font (sekarang tidak lagi dipanggil)
    /*
    function renderFontOptions() {
        if (!fontOptionsGrid) {
            console.error("settings.js: fontOptionsGrid not found, cannot render font options.");
            return;
        }
        fontOptionsGrid.innerHTML = '';
        const currentFontClass = localStorage.getItem(FONT_STORAGE_KEY) || 'font-quicksand';

        availableFonts.forEach(font => {
            const fontCard = document.createElement('div');
            fontCard.classList.add('font-card');
            if (font.className === currentFontClass) {
                fontCard.classList.add('active');
            }
            fontCard.setAttribute('data-font-class', font.className);
            fontCard.style = font.style;

            fontCard.innerHTML = `
                <p class="font-preview-text">Puisi adalah kehidupan</p>
                <p class="font-name">${font.name}</p>
            `;
            fontOptionsGrid.appendChild(fontCard);
        });
        console.log("settings.js: Font options rendered into grid.");
    }
    */

    // Event listener untuk membuka modal font (sekarang dikomentari)
    /*
    if (fontSelectorTrigger) {
        fontSelectorTrigger.addEventListener('click', () => {
            console.log("settings.js: Font selector trigger clicked. Opening modal.");
            renderFontOptions(); 

            if (fontModal) {
                fontModal.style.display = 'flex';
                setTimeout(() => {
                    fontModal.classList.add('show');
                    fontModal.style.pointerEvents = 'auto';
                }, 10);
            }
            const globalOverlay = document.getElementById('overlay');
            if(globalOverlay) {
                globalOverlay.classList.add('active');
                globalOverlay.style.display = 'block';
                globalOverlay.style.pointerEvents = 'auto';
            }
        });
    } else {
        console.warn("settings.js: fontSelectorTrigger not found.");
    }
    */

    // Event listener untuk menutup modal font (sekarang dikomentari)
    /*
    if (closeFontModalBtn) {
        closeFontModalBtn.addEventListener('click', () => {
            console.log("settings.js: Close font modal button clicked. Closing modal.");
            if (fontModal) {
                fontModal.classList.remove('show');
                fontModal.addEventListener('transitionend', function handler() {
                    fontModal.style.display = 'none';
                    fontModal.style.pointerEvents = 'none';
                    fontModal.removeEventListener('transitionend', handler);
                }, { once: true });
            }
            const globalOverlay = document.getElementById('overlay');
            if(globalOverlay) {
                globalOverlay.classList.remove('active');
                globalOverlay.style.display = 'none';
                globalOverlay.style.pointerEvents = 'none';
            }
        });
    } else {
        console.warn("settings.js: closeFontModalBtn not found.");
    }
    */

    // Event listener untuk memilih font dari grid (sekarang dikomentari)
    /*
    if (fontOptionsGrid) {
        fontOptionsGrid.addEventListener('click', (e) => {
            const fontCard = e.target.closest('.font-card');
            if (fontCard) {
                const selectedFontClass = fontCard.getAttribute('data-font-class');
                if (selectedFontClass) {
                    console.log("settings.js: Font card clicked. Applying font:", selectedFontClass);
                    applyFontToBody(selectedFontClass); 
                    document.querySelectorAll('.font-card').forEach(card => {
                        card.classList.remove('active');
                    });
                    fontCard.classList.add('active');
                    if (closeFontModalBtn) closeFontModalBtn.click();
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
    */
});
