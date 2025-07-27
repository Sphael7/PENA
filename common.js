document.addEventListener('DOMContentLoaded', () => {
    console.log("common.js: DOMContentLoaded triggered. (Global script loaded)");

    // Fungsi umum untuk mengelola sidebar
    const sidebar = document.getElementById('sidebar');
    const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const overlay = document.getElementById('overlay');

    // LOG: Memeriksa apakah elemen sidebar ditemukan
    console.log("common.js: Sidebar elements check - sidebar:", sidebar, "toggleBtn:", toggleSidebarBtn, "closeBtn:", closeSidebarBtn, "overlay:", overlay);


    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener('click', () => {
            console.log("common.js: toggleSidebarBtn clicked!");
            if(sidebar) sidebar.classList.toggle('active');
            if(overlay) overlay.classList.toggle('active');
        });
    } else {
        console.warn("common.js: toggleSidebarBtn not found. Sidebar might not work.");
    }

    if (closeSidebarBtn) {
        console.log("common.js: Attaching click listener to closeSidebarBtn.");
        closeSidebarBtn.addEventListener('click', () => {
            console.log("common.js: closeSidebarBtn clicked!");
            if(sidebar) sidebar.classList.remove('active');
            if(overlay) overlay.classList.remove('active');
        });
    } else {
        console.warn("common.js: closeSidebarBtn not found. Sidebar might not work.");
    }

    if (overlay) {
        console.log("common.js: Attaching click listener to overlay.");
        overlay.addEventListener('click', () => {
            console.log("common.js: overlay clicked!");
            if(sidebar) sidebar.classList.remove('active');
            if(overlay) overlay.classList.remove('active');
        });
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
            pageTransitionOverlay.style.display = 'block'; 
            pageTransitionOverlay.classList.remove('overlay-exit');
            pageTransitionOverlay.classList.add('overlay-active');
            console.log("common.js: Overlay activated for transition.");

            const transitionPromise = new Promise(resolve => {
                const handleTransitionEnd = () => {
                    console.log("common.js: Overlay active transition ended (CSS). Navigating to", url);
                    pageTransitionOverlay.removeEventListener('transitionend', handleTransitionEnd);
                    resolve();
                };
                pageTransitionOverlay.addEventListener('transitionend', handleTransitionEnd);

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
                !targetLink.classList.contains('empty-state-btn') 
            ) {
                console.log("common.js: Internal link clicked, preventing default.", targetLink.href);
                e.preventDefault(); 
                animatePageTransition(targetLink.href); 
            } else {
                console.log("common.js: Clicked link is external or special, not handled by custom transition.");
            }
        }
    });
});