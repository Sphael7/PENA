// Membungkus seluruh kode dalam DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("common.js: DOMContentLoaded triggered. (Global script loaded)");

    // Fungsi untuk menerapkan font yang dipilih dari localStorage
    const applySavedFont = () => {
        const savedFont = localStorage.getItem('selectedFont') || 'sans-serif';
        const body = document.body;

        // Hapus kelas font yang ada
        body.classList.remove('font-sans', 'font-serif', 'font-handwritten');

        // Terapkan kelas font yang disimpan
        switch (savedFont) {
            case 'sans-serif':
                body.classList.add('font-sans');
                break;
            case 'serif':
                body.classList.add('font-serif');
                break;
            case 'handwritten':
                body.classList.add('font-handwritten');
                break;
            default:
                body.classList.add('font-sans');
        }
        console.log(`common.js: Font disetel ke: ${savedFont}`);
    };

    // Terapkan font saat file dimuat pertama kali
    applySavedFont();

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

    // NEW: Fungsi untuk navigasi kembali yang andal
    function goBack() {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // Fallback jika tidak ada riwayat
            window.location.href = 'index.html'; 
        }
    }
    window.goBack = goBack;

    // Event listener untuk semua tautan <a> di aplikasi (delegasi event)
    console.log("common.js: Attaching click listener for global A tags.");
    document.addEventListener('click', (e) => {
        const targetLink = e.target.closest('a'); 

        if (targetLink && targetLink.href && targetLink.target !== '_blank') {
            const currentHostname = window.location.hostname;
            const targetHostname = new URL(targetLink.href).hostname;
            const isBackLink = targetLink.getAttribute('href').endsWith('javascript:history.back()'); // Check for back link

            if (targetHostname === currentHostname && 
                targetLink.getAttribute('href').indexOf('#') === -1 &&
                !targetLink.classList.contains('icon-button') && 
                !targetLink.classList.contains('create-btn') && 
                !targetLink.classList.contains('empty-state-btn') &&
                !targetLink.classList.contains('learning-editor-btn') && 
                !targetLink.classList.contains('modal-btn') && 
                !targetLink.classList.contains('close-button') &&
                !isBackLink // Exclude back links from custom transition
            ) {
                console.log("common.js: Internal link clicked, preventing default.", targetLink.href);
                e.preventDefault(); 
                animatePageTransition(targetLink.href); 
            } else {
                console.log("common.js: Clicked link is external or special, not handled by custom transition.");
            }
        }
    });

    // Perbaikan: Hapus seluruh logika untuk modal kustom alert/confirm
    // Ganti dengan fungsi placeholder yang hanya melakukan console.log
    window.showAlert = (message, title = 'Notifikasi') => {
        console.log(`[ALERT - ${title}]: ${message}`);
        // Jika Anda ingin pesan ini muncul di UI secara non-intrusif, 
        // Anda perlu mengimplementasikan sistem pesan global di sini
        // atau memastikan halaman-halaman yang memanggil ini memiliki penanganan UI sendiri.
    };

    window.showConfirm = (message, title = 'Konfirmasi') => {
        console.log(`[CONFIRM - ${title}]: ${message}`);
        // Karena ini confirm, asumsikan default 'true' jika tidak ada UI
        // atau pertimbangkan untuk hanya digunakan di tempat di mana tidak ada efek samping serius.
        return Promise.resolve(true); // Selalu mengembalikan true (konfirmasi berhasil)
    };

    // Hapus <style> tag yang dibuat oleh JS untuk modal kustom (jika ada di common.js)
    // const customModalStyle = document.createElement('style');
    // customModalStyle.innerHTML = `...`;
    // document.head.appendChild(customModalStyle);
});
