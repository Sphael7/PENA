document.addEventListener('DOMContentLoaded', () => {
    const settingsNav = document.getElementById('settings-nav');
    const tabContentSections = document.querySelectorAll('.tab-content-section');
    let activeTabId = 'account'; // Tab aktif default adalah 'account'

    // Fungsi untuk menginisialisasi dropdown kustom
    function initializeCustomDropdown(wrapperId, initialValue, onChangeCallback = null) {
        const selectWrapper = document.getElementById(wrapperId);
        if (!selectWrapper) return;

        const selectTrigger = selectWrapper.querySelector('.custom-select-trigger');
        const selectedValueSpan = selectTrigger.querySelector('.selected-value');
        const optionsList = selectWrapper.querySelector('.custom-options');
        const options = optionsList.querySelectorAll('.custom-option');

        // Atur nilai yang dipilih di awal
        let currentSelectedOption = optionsList.querySelector(`.custom-option[data-value="${initialValue}"]`);
        if (currentSelectedOption) {
            selectedValueSpan.textContent = currentSelectedOption.textContent;
            currentSelectedOption.classList.add('selected');
        } else if (options.length > 0) {
            selectedValueSpan.textContent = options[0].textContent;
            options[0].classList.add('selected');
            initialValue = options[0].dataset.value;
        }

        if (onChangeCallback && initialValue) {
            onChangeCallback(initialValue);
        }

        selectTrigger.addEventListener('click', (event) => {
            event.stopPropagation();
            document.querySelectorAll('.custom-options.open').forEach(openOptions => {
                if (openOptions !== optionsList) {
                    openOptions.classList.remove('open');
                    openOptions.previousElementSibling.classList.remove('active');
                }
            });

            optionsList.classList.toggle('open');
            selectTrigger.classList.toggle('active');
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                const prevSelected = optionsList.querySelector('.custom-option.selected');
                if (prevSelected) {
                    prevSelected.classList.remove('selected');
                }

                option.classList.add('selected');
                selectedValueSpan.textContent = option.textContent;
                const selectedValue = option.dataset.value;

                if (onChangeCallback) {
                    onChangeCallback(selectedValue);
                }

                optionsList.classList.remove('open');
                selectTrigger.classList.remove('active');
            });
        });

        document.addEventListener('click', (event) => {
            if (!selectWrapper.contains(event.target)) {
                optionsList.classList.remove('open');
                selectTrigger.classList.remove('active');
            }
        });

        selectTrigger.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                optionsList.classList.remove('open');
                selectTrigger.classList.remove('active');
            }
        });
    }

    // --- Logika Pengaturan Tampilan ---
    // Fungsi untuk menerapkan tema yang dipilih dan menyimpannya di localStorage
    const applyTheme = (theme) => {
        const body = document.body;
        body.classList.remove('theme-light', 'theme-dark');

        if (theme === 'light') {
            body.classList.add('theme-light');
            body.setAttribute('data-theme', 'light');
        } else if (theme === 'dark') {
            body.classList.add('theme-dark');
            body.setAttribute('data-theme', 'dark');
        } else if (theme === 'system') {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                body.classList.add('theme-dark');
                body.setAttribute('data-theme', 'dark');
            } else {
                body.classList.add('theme-light');
                body.setAttribute('data-theme', 'light');
            }
        }
        localStorage.setItem('selectedTheme', theme);
    };

    // Fungsi untuk menerapkan font yang dipilih dan menyimpannya di localStorage
    const applyFont = (font) => {
        const body = document.body;
        let fontFamily = '';
        switch (font) {
            case 'sans-serif':
                fontFamily = "'Quicksand', sans-serif";
                break;
            case 'serif':
                fontFamily = "'Lora', serif";
                break;
            case 'handwritten':
                fontFamily = "'Pacifico', cursive";
                break;
            case 'custom':
                fontFamily = "'Quicksand', sans-serif";
                break;
            default:
                fontFamily = "'Quicksand', sans-serif";
        }
        body.style.fontFamily = fontFamily;
        localStorage.setItem('selectedFont', font);
    };

    // Fungsi untuk menerapkan ukuran font yang dipilih dan menyimpannya di localStorage
    const applyFontSize = (size) => {
        const root = document.documentElement;
        switch (size) {
            case 'small':
                root.style.fontSize = '14px';
                break;
            case 'medium':
                root.style.fontSize = '16px';
                break;
            case 'large':
                root.style.fontSize = '18px';
                break;
            default:
                root.style.fontSize = '16px';
        }
        localStorage.setItem('selectedFontSize', size);
    };

    // Fungsi untuk menerapkan gaya latar belakang yang dipilih dan menyimpannya di localStorage
    const applyBackgroundStyle = (style) => {
        const body = document.body;
        body.style.backgroundImage = '';
        body.classList.remove('textured');

        if (style === 'textured') {
            body.classList.add('textured');
        } else if (style === 'custom-upload') {
            console.log('Fungsi unggah latar belakang kustom akan diimplementasikan di sini.');
        }
        localStorage.setItem('selectedBackgroundStyle', style);
    };

    const applyPoemLayout = (layout) => {
        console.log(`Tata Letak Tampilan Puisi diatur ke: ${layout}`);
    };
    
    // Muat dan terapkan pengaturan dari localStorage saat halaman dimuat
    const savedTheme = localStorage.getItem('selectedTheme') || 'light';
    const savedFont = localStorage.getItem('selectedFont') || 'sans-serif';
    const savedFontSize = localStorage.getItem('selectedFontSize') || 'medium';
    const savedBackgroundStyle = localStorage.getItem('selectedBackgroundStyle') || 'flat';
    
    // Terapkan semua pengaturan yang tersimpan saat inisialisasi
    applyTheme(savedTheme);
    applyFont(savedFont);
    applyFontSize(savedFontSize);
    applyBackgroundStyle(savedBackgroundStyle);

    // Inisialisasi semua dropdown kustom dengan nilai yang tersimpan
    initializeCustomDropdown('theme-mode-wrapper', savedTheme, applyTheme);
    initializeCustomDropdown('primary-font-wrapper', savedFont, applyFont);
    initializeCustomDropdown('font-size-wrapper', savedFontSize, applyFontSize);
    initializeCustomDropdown('background-style-wrapper', savedBackgroundStyle, applyBackgroundStyle);
    initializeCustomDropdown('poem-display-layout-wrapper', 'card', applyPoemLayout);

    // --- Logika Pergantian Tab ---
    const showTab = (tabId) => {
        const currentActiveSection = document.querySelector('.tab-content-section.active');
        const targetSection = document.getElementById(tabId);

        if (targetSection === currentActiveSection) {
            return;
        }

        settingsNav.querySelectorAll('button').forEach(button => {
            button.classList.remove('bg-pena-primary', 'text-white', 'shadow-md');
            button.classList.add('text-pena-text-dark', 'hover:bg-pena-background-hover', 'hover:text-pena-text-dark');
        });

        const activeButton = settingsNav.querySelector(`button[data-tab="${tabId}"]`);
        if (activeButton) {
            activeButton.classList.remove('text-pena-text-dark', 'hover:bg-pena-background-hover', 'hover:text-pena-text-dark');
            activeButton.classList.add('bg-pena-primary', 'text-white', 'shadow-md');
        }

        if (currentActiveSection) {
            currentActiveSection.classList.remove('active');
        }

        if (targetSection) {
            targetSection.classList.add('active');
        }

        activeTabId = tabId;
    };

    settingsNav.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-tab]');
        if (button) {
            const tabId = button.dataset.tab;
            showTab(tabId);
        }
    });

    showTab(activeTabId);

    // --- Logika Modal untuk Tentang & Dukungan ---
    const privacyPolicyLink = document.getElementById('privacy-policy-link');
    const termsOfServiceLink = document.getElementById('terms-of-service-link');
    const privacyPolicyModal = document.getElementById('privacy-policy-modal');
    const termsOfServiceModal = document.getElementById('terms-of-service-modal');

    const openModal = (modalElement) => {
        modalElement.classList.remove('hidden');
    };

    const closeModal = (modalElement) => {
        modalElement.classList.add('hidden');
    };

    if (privacyPolicyLink) {
        privacyPolicyLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(privacyPolicyModal);
        });
    }

    if (termsOfServiceLink) {
        termsOfServiceLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(termsOfServiceModal);
        });
    }

    document.querySelectorAll('.modal-close-button').forEach(button => {
        button.addEventListener('click', (e) => {
            closeModal(e.target.closest('.modal-overlay'));
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                if (!modal.classList.contains('hidden')) {
                    closeModal(modal);
                }
            });
        }
    });
});
