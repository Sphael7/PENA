// Membungkus seluruh kode dalam DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("common.js: DOMContentLoaded triggered. (Global script loaded)");

    // Fungsi umum untuk mengelola sidebar
    const sidebar = document.getElementById('sidebar');
    const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const overlay = document.getElementById('overlay'); // Overlay untuk sidebar dan modal

    // LOG: Memeriksa apakah elemen sidebar ditemukan
    console.log("common.js: Sidebar elements check - sidebar:", sidebar, "toggleBtn:", toggleSidebarBtn, "closeBtn:", closeSidebarBtn, "overlay:", overlay);

    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener('click', () => {
            console.log("common.js: toggleSidebarBtn clicked!");
            if(sidebar) sidebar.classList.toggle('active');
            if(overlay) overlay.classList.toggle('active'); // Aktifkan/nonaktifkan overlay
        });
    } else {
        console.warn("common.js: toggleSidebarBtn not found. Sidebar might not work.");
    }

    if (closeSidebarBtn) {
        console.log("common.js: Attaching click listener to closeSidebarBtn.");
        closeSidebarBtn.addEventListener('click', () => {
            console.log("common.js: closeSidebarBtn clicked!");
            if(sidebar) sidebar.classList.remove('active');
            if(overlay) overlay.classList.remove('active'); // Nonaktifkan overlay
        });
    } else {
        console.warn("common.js: closeSidebarBtn not found. Sidebar might not work.");
    }

    // Listener untuk overlay (untuk menutup sidebar atau modal kustom)
    function handleOverlayClick(e) {
        // Jika klik pada overlay itu sendiri (bukan konten di dalamnya)
        if (e.target === overlay) {
            console.log("common.js: overlay clicked!");
            if(sidebar) sidebar.classList.remove('active'); // Tutup sidebar
            
            // Tutup semua modal kustom jika terbuka
            document.querySelectorAll('.modal.show').forEach(modal => {
                modal.classList.remove('show');
                modal.addEventListener('transitionend', function handler() {
                    modal.style.display = 'none';
                    modal.style.pointerEvents = 'none';
                    modal.removeEventListener('transitionend', handler);
                }, { once: true });
            });

            if (overlay) overlay.classList.remove('active'); // Nonaktifkan overlay
        }
    }

    if (overlay) {
        // Pastikan listener hanya ditambahkan sekali
        if (!overlay.hasAttribute('data-overlay-listener-added')) {
            overlay.addEventListener('click', handleOverlayClick);
            overlay.setAttribute('data-overlay-listener-added', 'true');
            console.log("common.js: Attaching click listener to overlay for closing sidebar/modals.");
        }
    } else {
        console.warn("common.js: overlay not found. Sidebar might not work.");
    }


    // --- Logika Transisi Halaman Manual (Non-Library) ---
    const pageTransitionOverlay = document.getElementById('page-transition-overlay');
    const transitionDuration = 750; // Durasi transisi 0.75 detik (untuk satu arah, masuk atau keluar)

    // LOG: Memeriksa apakah overlay transisi ditemukan
    console.log("common.js: pageTransitionOverlay element:", pageTransitionOverlay);

    // Saat halaman dimuat, overlay akan fade-out / slide-out
    setTimeout(() => {
        if (pageTransitionOverlay) { 
            pageTransitionOverlay.classList.add('overlay-exit');
            console.log("common.js: Overlay starting exit transition (adding overlay-exit).");
        } else {
            console.error("common.js: pageTransitionOverlay element not found! Transition might fail.");
        }
    }, 0);
    
    // Hapus overlay dari DOM setelah transisi keluar selesai
    if (pageTransitionOverlay) {
        pageTransitionOverlay.addEventListener('transitionend', function handler() {
            if (pageTransitionOverlay.classList.contains('overlay-exit')) {
                pageTransitionOverlay.style.display = 'none';
                pageTransitionOverlay.removeEventListener('transitionend', handler);
                console.log("common.js: Overlay hidden after exit transition.");
            }
        });
    }

    // Fungsi untuk memulai animasi masuk (ke solid) dan navigasi
    function animatePageTransition(url) {
        console.log("common.js: Starting page transition to", url);
        if (pageTransitionOverlay) { 
            pageTransitionOverlay.style.display = 'block'; // Pastikan overlay terlihat
            pageTransitionOverlay.classList.remove('overlay-exit'); // Hapus kelas exit
            // Paksa reflow untuk memastikan browser mendaftarkan penghapusan kelas 'overlay-exit'
            void pageTransitionOverlay.offsetWidth; 
            pageTransitionOverlay.classList.add('overlay-active'); // Tambahkan kelas aktif
            console.log("common.js: Overlay activated for transition.");

            const transitionPromise = new Promise(resolve => {
                const handleTransitionEnd = () => {
                    console.log("common.js: Overlay active transition ended (CSS). Navigating to", url);
                    pageTransitionOverlay.removeEventListener('transitionend', handleTransitionEnd);
                    resolve();
                };
                pageTransitionOverlay.addEventListener('transitionend', handleTransitionEnd, { once: true });

                setTimeout(() => {
                    console.warn("common.js: Overlay transition timeout fallback triggered. Forcing navigation.");
                    pageTransitionOverlay.removeEventListener('transitionend', handleTransitionEnd);
                    resolve(); 
                }, transitionDuration + 100); 
            });

            transitionPromise.then(() => {
                window.location.href = url; 
            });
        } else {
            console.error("common.js: Cannot animate transition, pageTransitionOverlay not found. Navigating directly.");
            window.location.href = url; 
        }
    }
    window.animatePageTransition = animatePageTransition; // Jadikan global


    // Event listener untuk semua tautan <a> di aplikasi (delegasi event)
    console.log("common.js: Attaching click listener for global A tags.");
    document.addEventListener('click', (e) => {
        const targetLink = e.target.closest('a'); 

        if (targetLink && targetLink.href && targetLink.target !== '_blank') {
            const currentHostname = window.location.hostname;
            const targetHostname = new URL(targetLink.href).hostname;

            if (targetHostname === currentHostname && 
                targetLink.getAttribute('href').indexOf('#') === -1 &&
                !targetLink.classList.contains('icon-button') && 
                !targetLink.classList.contains('create-btn') && 
                !targetLink.classList.contains('empty-state-btn') &&
                !targetLink.classList.contains('learning-editor-btn') && // Tambahkan kembali ini
                !targetLink.classList.contains('modal-btn') && // Tombol modal tidak perlu transisi
                !targetLink.classList.contains('close-button') // Tombol tutup modal tidak perlu transisi
            ) {
                console.log("common.js: Internal link clicked, preventing default.", targetLink.href);
                e.preventDefault(); 
                animatePageTransition(targetLink.href); 
            } else {
                console.log("common.js: Clicked link is external or special, not handled by custom transition.");
            }
        }
    });

    // --- CUSTOM MODAL (Pengganti alert/confirm) ---
    // Struktur modal kustom ini akan dibuat di common.js agar global
    const customAlertModal = document.createElement('div');
    customAlertModal.id = 'custom-alert-modal';
    // Gunakan kelas .modal untuk gaya dasar yang konsisten dengan modal lain
    customAlertModal.classList.add('modal'); 
    customAlertModal.innerHTML = `
        <div class="modal-content small-modal">
            <span class="close-button" id="custom-alert-close-btn">&times;</span>
            <h2 id="custom-alert-title"></h2>
            <p id="custom-alert-message"></p>
            <div class="modal-actions">
                <button id="custom-alert-ok-btn" class="modal-btn ok-btn">OK</button>
                <button id="custom-alert-cancel-btn" class="modal-btn cancel-btn" style="display:none;">Batal</button>
            </div>
        </div>
    `;
    document.body.appendChild(customAlertModal);

    const customAlertTitle = document.getElementById('custom-alert-title');
    const customAlertMessage = document.getElementById('custom-alert-message');
    const customAlertOkBtn = document.getElementById('custom-alert-ok-btn');
    const customAlertCancelBtn = document.getElementById('custom-alert-cancel-btn');
    const customAlertCloseBtn = document.getElementById('custom-alert-close-btn');

    // Fungsi utilitas untuk menutup modal kustom
    function closeCustomModal(modalElement, callback, result = false) {
        modalElement.classList.remove('show');
        modalElement.addEventListener('transitionend', function handler() {
            modalElement.style.display = 'none';
            modalElement.style.pointerEvents = 'none';
            modalElement.removeEventListener('transitionend', handler);
            if (callback) callback(result); 
        }, { once: true });
        // Hapus semua listener sementara
        customAlertOkBtn.removeEventListener('click', okListener);
        customAlertCancelBtn.removeEventListener('click', cancelListener);
        customAlertCloseBtn.removeEventListener('click', cancelListener);
        customAlertModal.removeEventListener('click', handleOutsideClickForCustomModal);
    }

    // Listener untuk OK/Cancel (perlu scope global agar bisa di-remove)
    let okListener, cancelListener;

    // Listener untuk klik di luar modal (langsung di background modal)
    function handleOutsideClickForCustomModal(e) {
        if (e.target === customAlertModal) {
            closeCustomModal(customAlertModal, cancelListener ? cancelListener : okListener, false); 
        }
    }

    window.showAlert = (message, title = 'Notifikasi') => {
        return new Promise(resolve => {
            customAlertTitle.textContent = title;
            customAlertMessage.textContent = message;
            customAlertCancelBtn.style.display = 'none'; 

            customAlertModal.style.display = 'flex'; 
            setTimeout(() => {
                customAlertModal.classList.add('show');
                customAlertModal.style.pointerEvents = 'auto'; 
            }, 10);
            
            okListener = () => {
                closeCustomModal(customAlertModal, resolve, true);
            };
            customAlertOkBtn.addEventListener('click', okListener, { once: true });
            customAlertCloseBtn.addEventListener('click', okListener, { once: true }); 
            customAlertModal.addEventListener('click', handleOutsideClickForCustomModal); 
        });
    };

    window.showConfirm = (message, title = 'Konfirmasi') => {
        return new Promise(resolve => {
            customAlertTitle.textContent = title;
            customAlertMessage.textContent = message;
            customAlertCancelBtn.style.display = 'inline-block'; 

            customAlertModal.style.display = 'flex'; 
            setTimeout(() => {
                customAlertModal.classList.add('show');
                customAlertModal.style.pointerEvents = 'auto'; 
            }, 10);

            okListener = () => {
                closeCustomModal(customAlertModal, resolve, true);
            };
            cancelListener = () => {
                closeCustomModal(customAlertModal, resolve, false);
            };

            customAlertOkBtn.addEventListener('click', okListener, { once: true });
            customAlertCancelBtn.addEventListener('click', cancelListener, { once: true });
            customAlertCloseBtn.addEventListener('click', cancelListener, { once: true }); 
            customAlertModal.addEventListener('click', handleOutsideClickForCustomModal); 
        });
    };

    // Style untuk modal kustom (modal-actions, modal-btn, ok-btn, cancel-btn, small-modal)
    // Dibuat sebagai <style> tag karena CSS ini spesifik untuk modal yang dibuat oleh JS
    const customModalStyle = document.createElement('style');
    customModalStyle.innerHTML = `
        /* Gaya dasar modal sudah di settings.css atau common.css, ini penambahan untuk fungsionalitas */
        .modal-actions {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
        }
        .modal-btn {
            padding: 10px 20px;
            border-radius: 20px;
            border: none;
            cursor: pointer;
            font-size: 1em;
            transition: background-color 0.2s ease, transform 0.2s ease;
            font-family: 'Quicksand', sans-serif; /* Kembali ke font awal */
        }
        .ok-btn {
            background-color: var(--primary-color);
            color: white;
        }
        .ok-btn:hover {
            background-color: var(--secondary-color);
            transform: translateY(-2px);
        }
        .cancel-btn {
            background-color: #f0f0f0;
            color: var(--text-color);
        }
        .cancel-btn:hover {
            background-color: #e0e0e0;
            transform: translateY(-2px);
        }
        .small-modal {
            max-width: 400px; /* Lebar lebih kecil untuk alert/confirm */
        }
    `;
    document.head.appendChild(customModalStyle);

});
