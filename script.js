// Membungkus seluruh kode dalam DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("script.js: DOMContentLoaded triggered. (Homepage script loaded)");
    const createBtn = document.getElementById('create-btn');
    const searchInput = document.getElementById('search-input');
    const poemGrid = document.getElementById('poem-grid');
    const customSelect = document.querySelector('.custom-select');
    const emptyState = document.getElementById('empty-state');

    let selectSelected;
    let selectItems;
    let selectOptions;
    let currentFilter = 'title';

    if (customSelect) {
        selectSelected = customSelect.querySelector('.select-selected');
        selectItems = customSelect.querySelector('.select-items');
        selectOptions = selectItems.querySelectorAll('div');
    }

    // Initial poems data
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
    let poemsData = [];

    // Function to combine initial and stored poems, assigning unique IDs
    function getAndCombinedPoems() {
        // PERUBAHAN: Sekarang mengambil puisi pengguna dan puisi bawaan
        const storedPoems = JSON.parse(localStorage.getItem('poems')) || [];
        const combinedPoemsMap = new Map();

        // Tambahkan puisi bawaan terlebih dahulu
        initialPoems.forEach((poem, index) => {
            const id = `initial-${index}`;
            combinedPoemsMap.set(id, { ...poem, theme: poem.theme || 'white', id: id, isInitial: true });
        });

        // Tambahkan puisi yang dibuat pengguna, ini akan menimpa puisi bawaan jika ada judul yang sama
        storedPoems.forEach((poem, index) => {
            const id = poem.id || `stored-${index}`;
            combinedPoemsMap.set(id, { ...poem, theme: poem.theme || 'white', id: id, isInitial: false });
        });

        poemsData = Array.from(combinedPoemsMap.values());
    }

    function renderPoems(filterText = '', filterType = currentFilter) {
        if (!poemGrid) return;
        
        // Ensure poemsData is populated
        if (poemsData.length === 0) {
            getAndCombinedPoems(); // Call again if not populated, just in case
            if (poemsData.length === 0) { // Check again after calling
                emptyState.style.display = 'flex';
                poemGrid.style.display = 'none';
                if(createBtn) createBtn.style.display = 'none'; 
                return;
            }
        }
        
        emptyState.style.display = 'none';
        poemGrid.style.display = 'grid';
        if(createBtn) createBtn.style.display = 'flex';
        

        const filteredPoems = poemsData.filter(poem => {
            const textToFilter = filterType === 'title' ? poem.title : poem.author;
            return textToFilter.toLowerCase().includes(filterText.toLowerCase());
        });
        
        const fragment = document.createDocumentFragment();

        filteredPoems.forEach((poem) => { 
            const card = document.createElement('div');
            card.classList.add('poem-card', poem.theme || 'white'); 
            card.setAttribute('data-id', poem.id); // Use the unique 'id' now
            
            const previewContent = poem.content.split('\n\n')[0];
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            // Check favorite based on the unique 'id'
            const isFavorite = favorites.includes(poem.id); 

            card.innerHTML = `
                <h2>${poem.title}</h2>
                <p class="author">- ${poem.author}</p>
                <div class="poem-content">
                    <p>${previewContent}</p>
                </div>
                <i class="fas fa-heart favorite-icon ${isFavorite ? 'active' : ''}" data-id="${poem.id}"></i>
            `;
            fragment.appendChild(card); 
        });
        
        poemGrid.innerHTML = '';
        poemGrid.appendChild(fragment);

        document.querySelectorAll('.favorite-icon').forEach(icon => {
            icon.removeEventListener('click', handleFavoriteClick); 
            icon.addEventListener('click', handleFavoriteClick);
        });
        
        document.querySelectorAll('.poem-card').forEach(card => {
            card.removeEventListener('click', handlePoemCardClick); 
            card.addEventListener('click', handlePoemCardClick);
        });

        const newPoems = poemGrid.querySelectorAll('.poem-card');
        newPoems.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
            }, 10 * index);
        });
    }

    const createDebouncedFunction = (func, delay) => {
        let timer;
        return function(...args) {
            const context = this;
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(context, args), delay);
        };
    };

    const debouncedRenderPoems = createDebouncedFunction((e) => {
        renderPoems(e.target.value);
    }, 300);

    if(searchInput) {
        searchInput.removeEventListener('input', debouncedRenderPoems); 
        searchInput.addEventListener('input', debouncedRenderPoems);
    }

    if (customSelect) {
        selectSelected.removeEventListener('click', handleSelectClick);
        selectOptions.forEach(option => option.removeEventListener('click', handleOptionClick));

        function handleSelectClick(e) {
            e.stopPropagation();
            selectItems.classList.toggle('select-open');
            selectSelected.querySelector('.select-arrow').classList.toggle('select-arrow-active');
        }

        function handleOptionClick() {
            currentFilter = this.getAttribute('data-value');
            selectSelected.innerHTML = `${this.textContent} <i class="fas fa-chevron-down select-arrow select-arrow-active"></i>`;
            selectItems.classList.remove('select-open');
            
            renderPoems(searchInput.value);
        }

        selectSelected.addEventListener('click', handleSelectClick);
        selectOptions.forEach(option => {
            option.addEventListener('click', handleOptionClick);
        });
    }

    function handleFavoriteClick(e) {
        e.stopPropagation();
        const poemId = this.getAttribute('data-id'); // Get the unique 'id'
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const index = favorites.indexOf(poemId);
        if (index > -1) {
            favorites.splice(index, 1);
            this.classList.remove('active');
        } else {
            favorites.push(poemId);
            this.classList.add('active');
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        
        // Also ensure 'my-poem.js' is notified if it's loaded
        // This is a simple dispatch; my-poem.js would need to listen.
        // For now, renderPoems() in my-poem.js will simply re-read localStorage
        // when the page loads, which is sufficient.
    }

    function handlePoemCardClick(e) {
        if (e.target.classList.contains('favorite-icon')) {
            e.stopPropagation();
            return;
        }
        const poemId = this.getAttribute('data-id'); // Get the unique 'id' from the clicked card
        localStorage.setItem('selectedPoemId', poemId);
        // Using manual page transition from common.js
        if (typeof animatePageTransition === 'function') {
            animatePageTransition('full-preview.html');
        } else {
            window.location.href = 'full-preview.html'; 
        }
    }


    getAndCombinedPoems(); // Call on DOMContentLoaded
    renderPoems();
});
