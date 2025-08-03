document.addEventListener('DOMContentLoaded', () => {
    const settingsNav = document.getElementById('settings-nav');
    const tabContentSections = document.querySelectorAll('.tab-content-section');
    let activeTabId = 'account'; // Default active tab is now 'account'

    // Function to initialize a custom dropdown
    function initializeCustomDropdown(wrapperId, initialValue, onChangeCallback = null) {
        const selectWrapper = document.getElementById(wrapperId);
        if (!selectWrapper) return; // Exit if wrapper not found

        const selectTrigger = selectWrapper.querySelector('.custom-select-trigger');
        const selectedValueSpan = selectTrigger.querySelector('.selected-value');
        const optionsList = selectWrapper.querySelector('.custom-options');
        const options = optionsList.querySelectorAll('.custom-option');

        // Set initial selected value and mark it
        let currentSelectedOption = optionsList.querySelector(`.custom-option[data-value="${initialValue}"]`);
        if (currentSelectedOption) {
            selectedValueSpan.textContent = currentSelectedOption.textContent;
            currentSelectedOption.classList.add('selected');
        } else if (options.length > 0) {
            // Fallback to first option if initialValue not found
            selectedValueSpan.textContent = options[0].textContent;
            options[0].classList.add('selected');
            initialValue = options[0].dataset.value; // Update initialValue
        }

        // Execute callback for initial value
        if (onChangeCallback && initialValue) {
            onChangeCallback(initialValue);
        }

        // Toggle dropdown visibility
        selectTrigger.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent document click from immediately closing
            // Close other open dropdowns
            document.querySelectorAll('.custom-options.open').forEach(openOptions => {
                if (openOptions !== optionsList) { // Don't close self
                    openOptions.classList.remove('open');
                    openOptions.previousElementSibling.classList.remove('active'); // Trigger
                }
            });

            optionsList.classList.toggle('open');
            selectTrigger.classList.toggle('active');
        });

        // Handle option selection
        options.forEach(option => {
            option.addEventListener('click', () => {
                // Remove 'selected' class from previously selected option
                const prevSelected = optionsList.querySelector('.custom-option.selected');
                if (prevSelected) {
                    prevSelected.classList.remove('selected');
                }

                // Add 'selected' class to the clicked option
                option.classList.add('selected');
                selectedValueSpan.textContent = option.textContent;
                const selectedValue = option.dataset.value;

                // Execute callback with selected value
                if (onChangeCallback) {
                    onChangeCallback(selectedValue);
                }

                // Close dropdown
                optionsList.classList.remove('open');
                selectTrigger.classList.remove('active');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
            if (!selectWrapper.contains(event.target)) {
                optionsList.classList.remove('open');
                selectTrigger.classList.remove('active');
            }
        });

        // Close dropdown with Escape key
        selectTrigger.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                optionsList.classList.remove('open');
                selectTrigger.classList.remove('active');
            }
        });
    }

    // --- Appearance Settings Logic ---

    // Apply Theme Mode
    const applyTheme = (theme) => {
        const body = document.body;
        const html = document.documentElement; // Get html element for font-size transition

        body.classList.remove('theme-light', 'theme-dark'); // Remove existing themes
        body.style.backgroundColor = ''; // Reset background color
        body.style.color = ''; // Reset text color

        if (theme === 'light') {
            body.classList.add('theme-light');
            body.style.backgroundColor = 'var(--pena-background)'; // PENA Light Cream
            body.style.color = 'var(--pena-text-dark)'; // PENA Dark Gray
        } else if (theme === 'dark') {
            body.classList.add('theme-dark');
            body.style.backgroundColor = '#2d3748'; // A dark gray for dark theme
            body.style.color = 'var(--pena-background)'; // PENA Light Cream for text
        } else if (theme === 'system') {
            // Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                body.classList.add('theme-dark');
                body.style.backgroundColor = '#2d3748';
                body.style.color = 'var(--pena-background)';
            } else {
                body.classList.add('theme-light');
                body.style.backgroundColor = 'var(--pena-background)';
                body.style.color = 'var(--pena-text-dark)';
            }
        }
    };

    // Apply Primary Font
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
                fontFamily = "'Quicksand', sans-serif"; // Placeholder for custom font logic
                break;
            default:
                fontFamily = "'Quicksand', sans-serif";
        }
        body.style.fontFamily = fontFamily;
    };

    // Apply Font Size
    const applyFontSize = (size) => {
        const root = document.documentElement; // Apply to root for responsive scaling
        switch (size) {
            case 'small':
                root.style.fontSize = '14px'; // Base font size
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
    };

    // Apply Background Style
    const applyBackgroundStyle = (style) => {
        const body = document.body;
        body.style.backgroundImage = ''; // Reset background image
        body.style.backgroundColor = ''; // Reset background color (will be set by theme if not custom)

        if (style === 'flat') {
            // Theme will handle flat background color
        } else if (style === 'textured') {
            body.style.backgroundImage = 'repeating-linear-gradient(45deg, rgba(var(--pena-background-rgb-values), 0.5) 0px, rgba(var(--pena-background-rgb-values), 0.5) 1px, transparent 1px, transparent 10px)';
            body.style.backgroundColor = 'var(--pena-background)'; // A slightly different background for texture
        } else if (style === 'custom-upload') {
            // For a real app, you'd trigger a file input here
            console.log('Fungsi unggah latar belakang kustom akan diimplementasikan di sini.');
            // Example: body.style.backgroundImage = 'url("path/to/your/image.jpg")';
            // body.style.backgroundSize = 'cover';
        }
    };

    // Apply Poem Display Layout (Placeholder for actual layout change)
    const applyPoemLayout = (layout) => {
        console.log(`Tata Letak Tampilan Puisi diatur ke: ${layout}`);
        // In a real application, you would change a class on a poem display container
        // or update a state management system that affects how poems are rendered.
        // For example:
        // const poemContainer = document.getElementById('poem-display-area');
        // poemContainer.className = `poem-display-${layout}`;
    };


    // Initialize all custom dropdowns with their respective callbacks
    initializeCustomDropdown('theme-mode-wrapper', 'light', applyTheme);
    initializeCustomDropdown('primary-font-wrapper', 'sans-serif', applyFont);
    initializeCustomDropdown('font-size-wrapper', 'medium', applyFontSize);
    initializeCustomDropdown('background-style-wrapper', 'flat', applyBackgroundStyle);
    initializeCustomDropdown('poem-display-layout-wrapper', 'card', applyPoemLayout);


    // --- Tab Switching Logic (existing) ---
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

    // --- Modal Logic for About & Support ---
    const privacyPolicyLink = document.getElementById('privacy-policy-link');
    const termsOfServiceLink = document.getElementById('terms-of-service-link');
    const privacyPolicyModal = document.getElementById('privacy-policy-modal');
    const termsOfServiceModal = document.getElementById('terms-of-service-modal');

    // Function to open modal
    const openModal = (modalElement) => {
        modalElement.classList.remove('hidden');
    };

    // Function to close modal
    const closeModal = (modalElement) => {
        modalElement.classList.add('hidden');
    };

    // Event listeners for opening modals
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

    // Event listeners for closing modals (buttons and overlay click)
    document.querySelectorAll('.modal-close-button').forEach(button => {
        button.addEventListener('click', (e) => {
            closeModal(e.target.closest('.modal-overlay'));
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) { // Only close if clicking the overlay itself, not content inside
                closeModal(overlay);
            }
        });
    });

    // Close modals with Escape key
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
