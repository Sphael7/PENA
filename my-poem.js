// my-poem.js
// Logika untuk fitur "My Poem" akan ditambahkan di sini.

document.addEventListener('DOMContentLoaded', () => {
    console.log("my-poem.js: DOMContentLoaded triggered. (My Poem script loaded)");

    // Dapatkan elemen-elemen UI
    const poemListContainer = document.getElementById('my-poem-list');
    const noPoemsMessage = document.getElementById('no-poems-message');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-by-select');
    const analyticsDisplay = document.getElementById('analytics-display');

    // Data puisi pengguna akan diambil dari localStorage
    let userPoems = JSON.parse(localStorage.getItem('poems')) || [];
    let favoriteIdeas = JSON.parse(localStorage.getItem('favoriteIdeas')) || []; // Untuk menampilkan ide favorit
    let poemFavorites = JSON.parse(localStorage.getItem('favorites')) || []; // Favorit puisi dari homepage

    console.log("my-poem.js: Initial userPoems from localStorage:", userPoems);

    // Initial poems data (replicated for ID consistency, but ideally fetched from a single source)
    const initialPoems = [
        {
            title: 'Senja di Pelupuk Mata',
            author: 'Budi Santoso',
            content: `Di antara senja yang merah,
                    Larik-larik kata terukir indah.
                    Mengalun lembut, meresap jiwa,
                    Cinta dan rindu, sebuah cerita.

                    Bintang berbisik pada rembulan,
                    Tentang harapan yang tak terbilang.
                    Menggenggam erat sehelai daun,
                    Menanti pagi di ufuk timur.

                    Warna jingga yang memudar,
                    Adalah salam dari sang fajar.
                    Menyambut malam yang kan tiba,
                    Dalam sunyi, dalam cinta.`,
            theme: 'yellow' 
        },
        {
            title: 'Pagi yang Sunyi',
            author: 'Citra Dewi',
            content: `Kala mentari menyapa pagi,
                    Embun menari di ujung jari.
                    Langit biru jadi saksi bisu,
                    Sebuah janji yang takkan layu.

                    Langkah kecil menapaki jejak,
                    Mengukir mimpi, tanpa terelak.
                    Dunia fana, takkan abadi,
                    Namun kisah ini kan terukir selamanya.

                    Heningnya pagi, bisiknya angin,
                    Adalah melodi yang takkan terganti.
                    Menyimpan kenangan yang terpatri,
                    Dalam hati yang takkan mati.`,
            theme: 'blue' 
        },
        {
            title: 'Lukisan Wajahmu',
            author: 'Agus Salim',
            content: `Wajahmu adalah lukisan pelangi,
                    Yang mewarnai hariku setiap hari.
                    Senyummu bagai cahaya purnama,
                    Menerangi gelapnya jiwa.

                    Di setiap kata yang terucap,
                    Kudengar melodi yang indah.
                    Kasihmu adalah samudra luas,
                    Tempatku berlayar tanpa batas.

                    Kau adalah bait puisi terindah,
                    Yang takkan pernah kuakhiri.
                    Terukir di setiap lembar hati,
                    Untuk selamanya, untuk abadi.`,
            theme: 'red' 
        },
        {
            title: 'Rindu yang Tak Terucap',
            author: 'Rina Purnama',
            content: `Angin berhembus membawa berita,
                    Tentang rindu yang tak terkira.
                    Dedaunan berguguran di tanah,
                    Menandakan waktu yang takkan kembali.

                    Namun kenangan adalah abadi,
                    Tersimpan rapi di dalam hati.
                    Kisah kita kan tetap bersinar,
                    Meski dunia terus berputar.

                    Dalam sunyi, kuucapkan namamu,
                    Berharap kau mendengarnya.
                    Walau tak ada kata yang terucap,
                    Rindu ini tetap memanggilmu.`,
            theme: 'yellow' 
        },
        {
            title: 'Hujan di Kota',
            author: 'Budi Santoso',
            content: `Hujan turun membasahi jalan,
                    MemBawa kenangan yang tertinggal.
                    Di balik jendela, kutuliskan kata,
                    Tentang cerita yang takkan sirna.

                    Gemericik air mengalun merdu,
                    Menghapus jejak langkah yang pilu.
                    Langit mendung menjadi saksi,
                    Dari hati yang hampa tak berisi.

                    Semua yang hilang, semua yang pergi,
                    Akan kembali dalam mimpi.
                    Hujan ini adalah teman setia,
                    Menemani rindu yang tak bertepi.`,
            theme: 'blue' 
        },
        {
            title: 'Mimpi di Langit',
            author: 'Rina Purnama',
            content: `Di langit biru, kulihat awan,
                    Melukis mimpi, tanpa batasan.
                    Bintang-bintang menjadi saksi,
                    Bahwa harapan takkan pernah mati.

                    Angkasa luas tak bertepi,
                    Adalah tempat jiwa kan berlari.
                    Mengejar cahaya yang kan tiba,
                    Menyambut takdir yang kan tiba.

                    Meski tak semua mimpi terwujud,
                    Setidaknya kita pernah berjuang.
                    Cahaya itu kan tetap menyala,
                    Di ujung malam, di sanubariku.`,
            theme: 'red' 
        },
    ];

    // Function to combine initial and stored poems, assigning unique IDs
    function getCombinedPoemsForMyPoem() {
        // PERUBAHAN: Hanya ambil puisi yang dibuat oleh pengguna
        const stored = JSON.parse(localStorage.getItem('poems')) || [];
        // PERUBAHAN: Beri ID unik untuk puisi yang dibuat pengguna
        return stored.map((poem, index) => {
            const id = poem.id || `stored-${index}`;
            return { ...poem, id: id, isInitial: false };
        });
    }

    // Perbarui userPoems agar hanya berisi puisi buatan pengguna
    let allDisplayablePoems = getCombinedPoemsForMyPoem();


    // --- Fungsi Utilitas ---
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        // Check if dateCreated exists and is valid, otherwise use a fallback date
        try {
            const date = new Date(dateString);
            if (!isNaN(date.getTime())) { // Check for valid date
                return date.toLocaleDateString('id-ID', options);
            }
        } catch (e) {
            console.error("Invalid date string:", dateString, e);
        }
        return 'Tanggal tidak tersedia';
    }

    // Fungsi untuk merender daftar puisi
    function renderPoems(filter = 'all', sortBy = 'date-desc') {
        // Always refresh all data from localStorage before rendering
        userPoems = JSON.parse(localStorage.getItem('poems')) || [];
        favoriteIdeas = JSON.parse(localStorage.getItem('favoriteIdeas')) || []; 
        poemFavorites = JSON.parse(localStorage.getItem('favorites')) || []; // Reload poem favorites
        // PERUBAHAN: Gunakan allDisplayablePoems yang hanya berisi puisi pengguna
        allDisplayablePoems = getCombinedPoemsForMyPoem();

        let filteredPoems = [...allDisplayablePoems]; // Buat salinan agar tidak mengubah array asli

        // Filter
        if (filter !== 'all') {
            if (filter === 'favorites') {
                // BUG FIX: Filter poems based on the actual 'favorites' array from script.js
                filteredPoems = filteredPoems.filter(poem => poemFavorites.includes(poem.id));
            } else {
                // Tambahkan filter berdasarkan tema (jika ada properti tema di puisi)
                filteredPoems = filteredPoems.filter(poem => poem.theme === filter);
            }
        }

        // Sort
        filteredPoems.sort((a, b) => {
            // Tanggal dibuat hanya ada di puisi yang disimpan (`userPoems`), tidak di `initialPoems`
            // Untuk puisi awal, kita bisa menggunakan tanggal fallback atau logika lain jika diperlukan.
            // Untuk saat ini, asumsikan dateCreated ada atau default ke 0.
            const dateA = new Date(a.dateCreated || 0);
            const dateB = new Date(b.dateCreated || 0);

            if (sortBy === 'date-desc') {
                return dateB - dateA;
            } else if (sortBy === 'date-asc') {
                return dateA - dateB;
            } else if (sortBy === 'title-asc') {
                return a.title.localeCompare(b.title);
            } else if (sortBy === 'title-desc') {
                return b.title.localeCompare(a.title);
            }
            return 0;
        });

        console.log("my-poem.js: Filtered poems length:", filteredPoems.length);

        if (filteredPoems.length === 0) {
            if (poemListContainer) poemListContainer.style.display = 'none';
            if (noPoemsMessage) noPoemsMessage.style.display = 'flex'; 
            console.log("my-poem.js: Displaying no poems message.");
            return;
        } else {
            if (poemListContainer) poemListContainer.style.display = 'grid';
            if (noPoemsMessage) noPoemsMessage.style.display = 'none';
            console.log("my-poem.js: Displaying poem grid.");
        }

        if (poemListContainer) poemListContainer.innerHTML = ''; // Bersihkan daftar

        filteredPoems.forEach((poem) => { // No need for 'index' here, use poem.id
            const poemCard = document.createElement('div');
            poemCard.classList.add('my-poem-card', poem.theme || 'white'); // Gunakan tema puisi

            // Check if this poem is favorited using its unique ID
            const isFavorited = poemFavorites.includes(poem.id);
            
            // Preview 2 baris puisi
            // Use regex to split by lines, filter out empty lines, then take first 2.
            const previewContent = poem.content.split(/\r?\n/).filter(line => line.trim() !== '').slice(0, 2).join('<br>');
            const createdAt = poem.dateCreated ? formatDate(poem.dateCreated) : 'Tanggal tidak tersedia';
            
            // Generate tags HTML if available, otherwise an empty string
            const tagsHtml = (poem.tags && Array.isArray(poem.tags) && poem.tags.length > 0) 
                             ? poem.tags.map(tag => `<span class="poem-tag">${tag}</span>`).join('') 
                             : '';
            
            poemCard.innerHTML = `
                <h3>${poem.title}</h3>
                <p class="poem-author">- ${poem.author}</p>
                <div class="poem-preview">${previewContent}</div>
                <div class="poem-meta">
                    <span>Dibuat: ${createdAt}</span>
                    ${tagsHtml ? `<span class="poem-meta-tags">Tags: ${tagsHtml}</span>` : ''} 
                </div>
                <div class="poem-actions">
                    <button class="action-btn favorite-toggle-btn ${isFavorited ? 'active' : ''}" data-id="${poem.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="action-btn view-detail-btn" data-id="${poem.id}"><i class="fas fa-eye"></i> Detail</button>
                    <button class="action-btn edit-btn" data-id="${poem.id}"><i class="fas fa-edit"></i> Edit</button>
                    <button class="action-btn delete-btn" data-id="${poem.id}"><i class="fas fa-trash-alt"></i> Hapus</button>
                </div>
            `;
            if (poemListContainer) poemListContainer.appendChild(poemCard);
        });

        attachPoemCardListeners();
    }

    // Fungsi untuk melampirkan event listener ke kartu puisi
    function attachPoemCardListeners() {
        document.querySelectorAll('.view-detail-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const poemId = e.currentTarget.dataset.id;
                localStorage.setItem('selectedPoemId', poemId);
                // Pastikan animatePageTransition ada di common.js
                if (typeof animatePageTransition === 'function') {
                    animatePageTransition('full-preview.html');
                } else {
                    window.location.href = 'full-preview.html'; 
                }
            });
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const poemId = e.currentTarget.dataset.id;
                // Redirect ke halaman tulis dengan puisi yang sudah ada
                localStorage.setItem('editPoemId', poemId); // Simpan ID puisi yang akan diedit
                 // Pastikan animatePageTransition ada di common.js
                 if (typeof animatePageTransition === 'function') {
                    animatePageTransition('write.html?edit=true');
                } else {
                    window.location.href = 'write.html?edit=true'; 
                }
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async (e) => { // Make async to use await
                const poemId = e.currentTarget.dataset.id;
                // BUG FIX: Use custom showConfirm modal
                const userConfirmed = await window.showConfirm('Anda yakin ingin menghapus puisi ini?', 'Hapus Puisi');
                if (userConfirmed) {
                    deletePoem(poemId);
                }
            });
        });

        document.querySelectorAll('.favorite-toggle-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const poemId = e.currentTarget.dataset.id;
                
                let currentPoemFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
                const favIndex = currentPoemFavorites.indexOf(poemId);

                if (favIndex > -1) {
                    currentPoemFavorites.splice(favIndex, 1);
                } else {
                    currentPoemFavorites.push(poemId);
                }
                localStorage.setItem('favorites', JSON.stringify(currentPoemFavorites));
                poemFavorites = currentPoemFavorites; // Update local array

                // Perbarui tampilan tombol
                if (e.currentTarget.classList.contains('active')) {
                    e.currentTarget.classList.remove('active');
                } else {
                    e.currentTarget.classList.add('active');
                }
                updateAnalytics(); // Perbarui analitik karena daftar favorit berubah
                renderPoems(document.querySelector('.filter-btn.active')?.dataset.filter || 'all', sortSelect.value); // Re-render for filter update
            });
        });
    }

    // Fungsi untuk menghapus puisi
    function deletePoem(poemId) {
        // Separate handling for initial vs. stored poems if necessary for deletion,
        // but typically 'poems' in localStorage only tracks user-created ones.
        // Assuming userPoems now contains ONLY user-created poems for deletion.
        userPoems = userPoems.filter(poem => poem.id !== poemId); // Filter by ID

        localStorage.setItem('poems', JSON.stringify(userPoems));

        // Remove from poem favorites if it was favorited
        poemFavorites = poemFavorites.filter(favId => favId !== poemId);
        localStorage.setItem('favorites', JSON.stringify(poemFavorites));

        // Also remove from allDisplayablePoems to keep local state consistent
        allDisplayablePoems = allDisplayablePoems.filter(poem => poem.id !== poemId);

        renderPoems(document.querySelector('.filter-btn.active')?.dataset.filter || 'all', sortSelect.value);
        updateAnalytics(); // Perbarui analitik setelah penghapusan
    }

    // Fungsi untuk memperbarui analitik mini
    function updateAnalytics() {
        const totalPoems = allDisplayablePoems.length; // Count all displayable poems
        const totalFavoriteIdeas = favoriteIdeas.length; // Still counts ideas from generator
        const totalFavoritedPoems = poemFavorites.length; // New: counts favorited poems

        // Hitung tema paling sering digunakan (contoh sederhana)
        const themeCounts = {};
        allDisplayablePoems.forEach(poem => {
            const theme = poem.theme || 'white';
            themeCounts[theme] = (themeCounts[theme] || 0) + 1;
        });
        
        let mostUsedTheme = 'Tidak Ada';
        let maxCount = 0;

        for (const theme in themeCounts) {
            if (themeCounts[theme] > maxCount) {
                maxCount = themeCounts[theme];
                mostUsedTheme = theme.charAt(0).toUpperCase() + theme.slice(1);
            }
        }
        
        if (analyticsDisplay) {
            analyticsDisplay.innerHTML = `
                <div class="analytics-item">
                    <i class="fas fa-clipboard-list"></i>
                    <span>Total Puisi: <strong>${totalPoems}</strong></span>
                </div>
                <div class="analytics-item">
                    <i class="fas fa-heart"></i>
                    <span>Puisi Favorit: <strong>${totalFavoritedPoems}</strong></span>
                </div>
                <div class="analytics-item">
                    <i class="fas fa-lightbulb"></i>
                    <span>Ide Favorit Tersimpan: <strong>${totalFavoriteIdeas}</strong></span>
                </div>
                <div class="analytics-item">
                    <i class="fas fa-palette"></i>
                    <span>Tema Terfavorit: <strong>${mostUsedTheme}</strong></span>
                </div>
                <!-- Tambahkan analitik lain di sini -->
            `;
        }
    }

    // --- Event Listeners ---
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                renderPoems(button.dataset.filter, sortSelect ? sortSelect.value : 'date-desc');
            });
        });
    } else {
        console.warn("my-poem.js: Filter buttons not found.");
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            renderPoems(document.querySelector('.filter-btn.active')?.dataset.filter || 'all', sortSelect.value);
        });
    } else {
        console.warn("my-poem.js: Sort select element not found.");
    }

    // --- Inisialisasi Halaman ---
    // Pastikan semua data di-load ulang sebelum render
    allDisplayablePoems = getCombinedPoemsForMyPoem();
    userPoems = JSON.parse(localStorage.getItem('poems')) || [];
    favoriteIdeas = JSON.parse(localStorage.getItem('favoriteIdeas')) || [];
    poemFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    renderPoems(); // Render puisi saat halaman dimuat
    updateAnalytics(); // Perbarui analitik saat halaman dimuat
});
