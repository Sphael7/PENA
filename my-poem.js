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

    console.log("my-poem.js: Initial userPoems from localStorage:", userPoems);


    // --- Fungsi Utilitas ---
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    }

    // Fungsi untuk merender daftar puisi
    function renderPoems(filter = 'all', sortBy = 'date-desc') {
        let filteredPoems = [...userPoems]; // Buat salinan agar tidak mengubah array asli

        // Filter
        if (filter !== 'all') {
            if (filter === 'favorites') {
                // Asumsi puisi di localStorage disimpan dengan ID atau cara untuk mengidentifikasi favorit
                // Untuk demo ini, kita akan menandai puisi sebagai favorit di sini jika id-nya ada di favoriteIdeas
                filteredPoems = filteredPoems.filter((poem, index) => {
                    // Ini adalah contoh sederhana. Jika puisi punya ID unik, gunakan itu.
                    // Saat ini, favoriteIdeas menyimpan value dari generator ide, bukan indeks puisi.
                    // Anda perlu menambahkan cara untuk menandai puisi yang disimpan sebagai favorit saat dibuat.
                    // Untuk sementara, saya akan mengabaikan filter favorit jika struktur belum mendukung.
                    // return false; // Nonaktifkan sementara atau butuh logika lebih kompleks
                    const isPoemFavorite = favoriteIdeas.some(fav => 
                        fav.type === "Puisi Tersimpan" && fav.value === poem.title
                    );
                    return isPoemFavorite;
                });
            } else {
                // Filter berdasarkan tema, misalnya
                // filteredPoems = filteredPoems.filter(poem => poem.theme === filter);
            }
        }

        // Sort
        filteredPoems.sort((a, b) => {
            if (sortBy === 'date-desc') {
                return new Date(b.dateCreated || 0) - new Date(a.dateCreated || 0);
            } else if (sortBy === 'date-asc') {
                return new Date(a.dateCreated || 0) - new Date(b.dateCreated || 0);
            } else if (sortBy === 'title-asc') {
                return a.title.localeCompare(b.title);
            } else if (sortBy === 'title-desc') {
                return b.title.localeCompare(a.title);
            }
            // Tambahkan sortir berdasarkan panjang puisi, dll.
            return 0;
        });

        console.log("my-poem.js: Filtered poems length:", filteredPoems.length);

        if (filteredPoems.length === 0) {
            if (poemListContainer) poemListContainer.style.display = 'none';
            if (noPoemsMessage) noPoemsMessage.style.display = 'flex'; // Changed to 'flex'
            console.log("my-poem.js: Displaying no poems message.");
            return;
        } else {
            if (poemListContainer) poemListContainer.style.display = 'grid';
            if (noPoemsMessage) noPoemsMessage.style.display = 'none';
            console.log("my-poem.js: Displaying poem grid.");
        }

        if (poemListContainer) poemListContainer.innerHTML = ''; // Bersihkan daftar

        filteredPoems.forEach((poem, index) => {
            const poemCard = document.createElement('div');
            poemCard.classList.add('my-poem-card', poem.theme || 'white'); // Gunakan tema puisi

            // Gunakan indeks dari array `userPoems` yang asli untuk referensi yang akurat
            // Penting: userPoems.indexOf(poem) mungkin tidak akurat jika ada duplikasi data
            // Sebaiknya setiap puisi memiliki ID unik yang disimpan. Untuk demo ini, kita pakai indexOf.
            const originalIndex = userPoems.indexOf(poem);
            
            // Preview 2 baris puisi
            const previewContent = poem.content.split('\n').filter(line => line.trim() !== '').slice(0, 2).join('<br>');
            const createdAt = poem.dateCreated ? formatDate(poem.dateCreated) : 'Tanggal tidak tersedia';
            
            // Generate tags HTML if available, otherwise an empty string
            // Pastikan poem.tags adalah array sebelum memanggil map()
            const tagsHtml = (poem.tags && Array.isArray(poem.tags) && poem.tags.length > 0) 
                             ? poem.tags.map(tag => `<span class="poem-tag">${tag}</span>`).join('') 
                             : '';
            
            // Check if this poem is favorited - DEFINITION ADDED HERE
            const isFavorited = favoriteIdeas.some(fav => 
                fav.type === "Puisi Tersimpan" && fav.value === poem.title
            );

            poemCard.innerHTML = `
                <h3>${poem.title}</h3>
                <p class="poem-author">- ${poem.author}</p>
                <div class="poem-preview">${previewContent}</div>
                <div class="poem-meta">
                    <span>Dibuat: ${createdAt}</span>
                    ${tagsHtml ? `<span>Tags: ${tagsHtml}</span>` : ''} 
                </div>
                <div class="poem-actions">
                    <button class="action-btn favorite-toggle-btn ${isFavorited ? 'active' : ''}" data-index="${originalIndex}" data-title="${poem.title}">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="action-btn view-detail-btn" data-index="${originalIndex}"><i class="fas fa-eye"></i> Detail</button>
                    <button class="action-btn edit-btn" data-index="${originalIndex}"><i class="fas fa-edit"></i> Edit</button>
                    <button class="action-btn delete-btn" data-index="${originalIndex}"><i class="fas fa-trash-alt"></i> Hapus</button>
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
                const index = parseInt(e.currentTarget.dataset.index);
                localStorage.setItem('selectedPoemId', index);
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
                const index = parseInt(e.currentTarget.dataset.index);
                // Redirect ke halaman tulis dengan puisi yang sudah ada
                // Anda perlu memuat puisi ini di halaman tulis berdasarkan indeks
                localStorage.setItem('editPoemId', index); // Simpan ID puisi yang akan diedit
                 // Pastikan animatePageTransition ada di common.js
                 if (typeof animatePageTransition === 'function') {
                    animatePageTransition('write.html?edit=true');
                } else {
                    window.location.href = 'write.html?edit=true'; 
                }
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                // Menggunakan konfirmasi modal kustom jika alert/confirm tidak diinginkan
                const userConfirmed = confirm('Anda yakin ingin menghapus puisi ini?'); // Perubahan sementara
                if (userConfirmed) {
                    deletePoem(index);
                }
            });
        });

        document.querySelectorAll('.favorite-toggle-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                const poemTitle = e.currentTarget.dataset.title; // Menggunakan judul sebagai identifikasi sementara
                
                const ideaToToggle = { type: "Puisi Tersimpan", value: poemTitle };
                // Perlu ada fungsi `toggleFavorite` di scope global atau common.js,
                // atau definisikan ulang di sini jika hanya digunakan di my-poem.js
                // Untuk saat ini, kita akan asumsikan ada di common.js atau ide-generator.js yang dimuat.
                // Jika tidak, Anda perlu menambahkan implementasinya di sini.
                // Contoh implementasi sederhana:
                let currentFavorites = JSON.parse(localStorage.getItem('favoriteIdeas')) || [];
                const favIndex = currentFavorites.findIndex(fav => fav.type === ideaToToggle.type && fav.value === ideaToToggle.value);
                if (favIndex > -1) {
                    currentFavorites.splice(favIndex, 1);
                } else {
                    currentFavorites.push(ideaToToggle);
                }
                localStorage.setItem('favoriteIdeas', JSON.stringify(currentFavorites));
                favoriteIdeas = currentFavorites; // Update local array

                // Perbarui tampilan tombol
                if (e.currentTarget.classList.contains('active')) {
                    e.currentTarget.classList.remove('active');
                } else {
                    e.currentTarget.classList.add('active');
                }
                updateAnalytics(); // Perbarui analitik karena daftar favorit berubah
            });
        });
    }

    // Fungsi untuk menghapus puisi
    function deletePoem(index) {
        // Hapus dari userPoems
        const deletedPoem = userPoems.splice(index, 1)[0]; 
        localStorage.setItem('poems', JSON.stringify(userPoems));

        // Hapus juga dari favorit jika puisi yang dihapus adalah favorit
        if (deletedPoem && favoriteIdeas.some(fav => fav.type === "Puisi Tersimpan" && fav.value === deletedPoem.title)) {
            favoriteIdeas = favoriteIdeas.filter(fav => !(fav.type === "Puisi Tersimpan" && fav.value === deletedPoem.title));
            localStorage.setItem('favoriteIdeas', JSON.stringify(favoriteIdeas));
        }

        renderPoems(document.querySelector('.filter-btn.active')?.dataset.filter || 'all', sortSelect.value);
        updateAnalytics(); // Perbarui analitik setelah penghapusan
    }

    // Fungsi untuk memperbarui analitik mini
    function updateAnalytics() {
        const totalPoems = userPoems.length;
        const totalFavoriteIdeas = favoriteIdeas.length; 
        
        // Hitung tema paling sering digunakan (contoh sederhana)
        const themeCounts = {};
        userPoems.forEach(poem => {
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
                    <span>Ide Favorit Disimpan: <strong>${totalFavoriteIdeas}</strong></span>
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
    // Pastikan userPoems di-load ulang sebelum render
    userPoems = JSON.parse(localStorage.getItem('poems')) || [];
    favoriteIdeas = JSON.parse(localStorage.getItem('favoriteIdeas')) || [];
    
    renderPoems(); // Render puisi saat halaman dimuat
    updateAnalytics(); // Perbarui analitik saat halaman dimuat
});
