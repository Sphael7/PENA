// hall-of-fame.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("hall-of-fame.js: DOMContentLoaded triggered.");

    const poemGallery = document.getElementById('poem-gallery');
    const poemDetailView = document.getElementById('poem-detail-view');
    const backToGalleryBtn = document.getElementById('back-to-gallery-btn');
    const detailPoemTitle = document.getElementById('detail-poem-title');
    const detailPoemAuthor = document.getElementById('detail-poem-author');
    const detailPoemContent = document.getElementById('detail-poem-content');
    const saveToCollectionBtn = document.getElementById('save-to-collection-btn');
    const hallOfFameContent = document.querySelector('.hall-of-fame-content');

    // Data Puisi Legendaris - Diperbarui dengan properti 'theme'
    const legendaryPoemsData = [
        {
            id: 'aku-chairil-anwar',
            title: 'Aku',
            author: 'Chairil Anwar',
            content: `Kalau sampai waktuku
Ku mau tak seorang 'kan merayu
Tidak juga kau

Tak perlu sedu sedan itu

Aku ini binatang jalang
Dari kumpulannya terbuang

Biar peluru menembus kulitku
Aku tetap meradang menerjang

Luka dan bisa kubawa berlari
Berlari hingga hilang pedih peri

Dan aku akan lebih tidak peduli

Aku mau hidup seribu tahun lagi`,
            bio: 'Chairil Anwar (1922-1949) adalah penyair terkemuka dari Angkatan \'45. Karyanya dikenal karena gaya yang lugas, individualistik, dan revolusioner, mencerminkan semangat zaman kemerdekaan Indonesia. "Aku" adalah salah satu puisinya yang paling ikonik.',
            context: 'Ditulis pada tahun 1943, puisi ini merepresentasikan semangat perlawanan dan keinginan untuk kebebasan abadi, sangat relevan dengan suasana perjuangan kemerdekaan Indonesia.',
            tags: ['perjuangan', 'individualisme', 'kebebasan'],
            theme: 'yellow' // Tema ditambahkan
        },
        {
            id: 'hujan-bulan-juni-sapardi',
            title: 'Hujan Bulan Juni',
            author: 'Sapardi Djoko Damono',
            content: `tak ada yang lebih tabah
dari hujan bulan juni
dirahasiakannya rintik rindunya
kepada pohon berbunga itu

tak ada yang lebih bijak
dari hujan bulan juni
dihapusnya jejak-jejak kakinya
yang ragu-ragu di jalan itu

tak ada yang lebih arif
dari hujan bulan juni
dibiarkannya yang tak terucapkan
diserap akar pohon bunga itu`,
            bio: 'Sapardi Djoko Damono (1940-2020) adalah seorang pujangga besar Indonesia yang dikenal dengan puisi-puisinya yang sederhana namun sarat makna, seringkali mengangkat tema alam, cinta, dan kehidupan sehari-hari. "Hujan Bulan Juni" adalah salah satu karyanya yang paling populer.',
            context: 'Puisi ini pertama kali dipublikasikan dalam buku puisi "Hujan Bulan Juni" pada tahun 1994. Puisi ini sering diinterpretasikan sebagai metafora tentang kesabaran, kebijaksanaan, dan cinta yang tulus.',
            tags: ['cinta', 'alam', 'metafora', 'kesabaran'],
            theme: 'blue' // Tema ditambahkan
        },
        {
            id: 'doa-chairil-anwar',
            title: 'Doa',
            author: 'Chairil Anwar',
            content: `Kepada pemeluk teguh

Tuhanku
Dalam termangu
Aku masih menyebut namaMu

Biar susah sungguh
mengingat Kau penuh seluruh
cayaMu panas suci

tinggal kerdip lilin di kelam sunyi

Tuhanku
aku hilang bentuk
remuk

Tuhanku
aku mengembara di negeri asing

Tuhanku
di PintuMu aku mengetuk
aku tidak bisa berpaling`,
            bio: 'Chairil Anwar (1922-1949) adalah penyair terkemuka dari Angkatan \'45. Karyanya dikenal karena gaya yang lugas, individualistik, dan revolusioner, mencerminkan semangat zaman kemerdekaan Indonesia. "Doa" adalah salah satu puisinya yang mendalam.',
            context: 'Puisi ini ditulis pada tahun 1943 dan mencerminkan sisi spiritual Chairil Anwar, meskipun ia dikenal sebagai sosok yang cenderung "bebas". Puisi ini menunjukkan kerinduan dan pencarian akan Tuhan.',
            tags: ['spiritual', 'kerinduan', 'pencarian'],
            theme: 'red' // Tema ditambahkan
        }
        // Tambahkan lebih banyak puisi legendaris di sini
    ];

    function renderPoemGallery() {
        poemGallery.innerHTML = '';
        poemDetailView.style.display = 'none';
        poemGallery.style.display = 'grid';
        if (hallOfFameContent) hallOfFameContent.classList.remove('themed-content');

        const fragment = document.createDocumentFragment();

        legendaryPoemsData.forEach(poem => {
            const card = document.createElement('div');
            // Tambahkan kelas tema di sini
            card.classList.add('fame-poem-card', poem.theme || 'white');
            card.setAttribute('data-id', poem.id);

            // Ambil 3 baris pertama untuk preview
            const previewContent = poem.content.split('\n').slice(0, 3).join('<br>');

            card.innerHTML = `
                <h3>${poem.title}</h3>
                <p class="author">- ${poem.author}</p>
                <div class="preview-content">${previewContent}</div>
                <span class="read-more">Baca Selengkapnya <i class="fas fa-arrow-right"></i></span>
            `;
            fragment.appendChild(card);
        });

        poemGallery.appendChild(fragment);

        // Add event listeners to cards
        poemGallery.querySelectorAll('.fame-poem-card').forEach(card => {
            card.addEventListener('click', (event) => {
                const poemId = event.currentTarget.getAttribute('data-id');
                showPoemDetail(poemId);
            });
        });
    }

    function showPoemDetail(id) {
        const poem = legendaryPoemsData.find(p => p.id === id);
        if (poem) {
            detailPoemTitle.textContent = poem.title;
            detailPoemAuthor.textContent = `- ${poem.author}`;
            detailPoemContent.innerHTML = `<p>${poem.content.replace(/\n/g, '<br>')}</p>
                                            <div class="bio-context">
                                                <h4>Tentang Penulis:</h4>
                                                <p>${poem.bio}</p>
                                                ${poem.context ? `<h4>Konteks Puisi:</h4><p>${poem.context}</p>` : ''}
                                            </div>`;
            
            poemGallery.style.display = 'none';
            poemDetailView.style.display = 'block';

            // Tambahkan kelas tema ke kontainer utama untuk detail view
            if (hallOfFameContent) {
                hallOfFameContent.classList.add('themed-content');
                hallOfFameContent.classList.remove('yellow', 'blue', 'red', 'white');
                hallOfFameContent.classList.add(poem.theme || 'white');
            }

            window.scrollTo({ top: 0, behavior: 'smooth' }); // Gulir ke atas halaman
        } else {
            console.error('Poem not found:', id);
            // Kembali ke galeri jika puisi tidak ditemukan
            renderPoemGallery();
        }
    }

    // Event listener untuk tombol kembali
    backToGalleryBtn.addEventListener('click', () => {
        renderPoemGallery();
    });

    // Event listener untuk tombol "Simpan ke Koleksi" (placeholder, bisa diintegrasikan dengan My Poem)
    saveToCollectionBtn.addEventListener('click', async () => {
        const currentPoemTitle = detailPoemTitle.textContent;
        const userConfirmed = await window.showConfirm(`Anda yakin ingin menyimpan puisi "${currentPoemTitle}" ke koleksi Anda?`, 'Simpan Puisi');
        if (userConfirmed) {
            // Placeholder: Implementasi penyimpanan yang sesungguhnya di sini
            window.showAlert(`Puisi "${currentPoemTitle}" berhasil disimpan ke koleksi Anda!`, 'Berhasil');
        }
    });

    // Inisialisasi: tampilkan galeri puisi
    renderPoemGallery();
});
