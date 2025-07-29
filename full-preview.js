// Membungkus seluruh kode dalam DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("initFullPreviewPage called!"); 
    const titleElement = document.getElementById('poem-title-full');
    const authorElement = document.getElementById('poem-author-full');
    const contentElement = document.getElementById('poem-full-text');
    const errorMessage = document.getElementById('error-message');
    const mainContent = document.querySelector('main.full-preview-content'); 

    // Elemen Tooltip
    const wordTooltip = document.getElementById('word-tooltip');
    const tooltipWord = document.getElementById('tooltip-word');
    const tooltipSynonym = document.getElementById('tooltip-synonym');
    const tooltipAntonym = document.getElementById('tooltip-antonym');

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
Membawa kenangan yang tertinggal.
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

    // BUG FIX: Ensure unique IDs for all poems, similar to script.js logic
    function getAndCombinePoems() {
        const storedPoems = JSON.parse(localStorage.getItem('poems')) || [];
        const combinedPoemsMap = new Map(); // Using Map to avoid duplication based on ID

        // Add initialPoems first with unique IDs
        initialPoems.forEach((poem, index) => {
            const id = `initial-${index}`;
            combinedPoemsMap.set(id, { ...poem, theme: poem.theme || 'white', id: id });
        });

        // Add storedPoems, they will have 'stored-X' IDs or original IDs if edited
        storedPoems.forEach((poem, index) => {
            // Assume stored poems already have an 'id' or assign one if missing
            const id = poem.id || `stored-${index}`; // If poem has an ID, use it. Otherwise, generate.
            combinedPoemsMap.set(id, { ...poem, theme: poem.theme || 'white', id: id });
        });

        poemsData = Array.from(combinedPoemsMap.values());
    }

    // Fungsi untuk membungkus setiap kata dalam tag span
    function tokenizePoemContent(content) {
        // Pisahkan konten menjadi paragraf terlebih dahulu
        const paragraphs = content.split('\n\n'); // Memisahkan paragraf berdasarkan baris kosong

        let tokenizedHtml = '';
        paragraphs.forEach(paragraph => {
            if (paragraph.trim() === '') {
                // Tambahkan <p><br></p> untuk menjaga jarak antar paragraf kosong
                tokenizedHtml += '<p><br></p>'; 
                return; 
            }

            // Regex untuk memecah teks berdasarkan spasi atau tanda baca, tapi mempertahankan tanda baca
            // Menangkap kata (\b\w+\b), tanda baca tunggal ([.,!?;:()"]), atau spasi (\s+)
            // Updated regex to handle more punctuation and contractions correctly
            const wordsAndPunctuation = paragraph.match(/(\b[\w'-]+\b|[.,!?;:()"'\-—–—\u2013-\u2015]|\s+)/g);
            
            if (!wordsAndPunctuation) {
                tokenizedHtml += `<p>${paragraph}</p>`; // Jika tidak ada kata, biarkan apa adanya dalam p
                return;
            }

            let paragraphHtml = '';
            wordsAndPunctuation.forEach(part => {
                // Check if part is a word (contains at least one letter/number and not just punctuation)
                if (/\w/.test(part) && !/^[.,!?;:()"'\-—–—\u2013-\u2015]+$/.test(part)) { 
                    paragraphHtml += `<span class="word">${part}</span>`;
                } else if (part === '\n') { // If there's a newline in the middle of a paragraph
                    paragraphHtml += '<br>'; // Replace with <br>
                }
                else { // If it's spaces or other punctuation
                    paragraphHtml += part;
                }
            });
            tokenizedHtml += `<p>${paragraphHtml}</p>`; // Wrap each paragraph with <p> tag
        });
        return tokenizedHtml;
    }

    // Fungsi untuk menampilkan tooltip
    let tooltipHideTimeout; // Untuk menunda penyembunyian tooltip
    function showTooltip(wordElement, data) {
        clearTimeout(tooltipHideTimeout); // Batalkan jika ada timeout sebelumnya

        tooltipWord.textContent = wordElement.textContent; // Kata yang diklik
        
        // Memastikan sinonim/antonim ditampilkan sebagai "Tidak ada" jika kosong
        tooltipSynonym.innerHTML = `Sinonim: ${data.sinonim && data.sinonim.length > 0 ? data.sinonim.join(', ') : '<span class="not-found">Tidak ada</span>'}`;
        tooltipAntonym.innerHTML = `Antonim: ${data.antonim && data.antonim.length > 0 ? data.antonim.join(', ') : '<span class="not-found">Tidak ada</span>'}`;
        
        // Posisikan tooltip
        const rect = wordElement.getBoundingClientRect();
        
        // Temporarily display the tooltip to get its offsetWidth/offsetHeight
        // Lakukan ini sebelum perhitungan posisi untuk mendapatkan dimensi yang benar
        wordTooltip.style.display = 'block'; 
        wordTooltip.classList.add('show'); // Tambahkan kelas 'show' untuk memicu transisi dan mendapatkan dimensi akhir
        
        // Hitung posisi relatif terhadap dokumen (termasuk scroll)
        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;

        let top = rect.top + scrollY - wordTooltip.offsetHeight - 15; // Di atas kata, dengan sedikit offset
        // offset 50% di CSS transform: translate(-50%, Xpx) berarti kita hanya perlu mengaturnya ke tengah kata yang diklik
        let left = rect.left + scrollX + (rect.width / 2); 

        // Sesuaikan jika keluar dari batas viewport/document
        if (top < scrollY) { // Jika tooltip akan keluar dari atas viewport
            top = rect.bottom + scrollY + 15; // Posisikan di bawah kata
        }
        if (left - (wordTooltip.offsetWidth / 2) < scrollX) { // Jika keluar dari kiri viewport (perhitungan setelah transform -50%)
            left = scrollX + (wordTooltip.offsetWidth / 2) + 5; // Sesuaikan agar tidak keluar kiri, tambah sedikit margin
        }
        if (left + (wordTooltip.offsetWidth / 2) > window.innerWidth + scrollX) { // Jika keluar dari kanan viewport
            left = window.innerWidth + scrollX - (wordTooltip.offsetWidth / 2) - 5; // Sesuaikan agar tidak keluar kanan, kurangi sedikit margin
        }
        
        wordTooltip.style.top = `${top}px`;
        wordTooltip.style.left = `${left}px`;
        wordTooltip.style.pointerEvents = 'auto'; // Pastikan bisa diklik saat aktif
    }

    // Fungsi untuk menyembunyikan tooltip
    function hideTooltip() {
        // Gunakan timeout agar ada sedikit jeda sebelum disembunyikan
        tooltipHideTimeout = setTimeout(() => {
            wordTooltip.classList.remove('show');
            // Tunggu transisi selesai sebelum menyembunyikan display dan pointer-events
            const onTransitionEnd = () => {
                wordTooltip.style.display = 'none';
                wordTooltip.style.pointerEvents = 'none'; // Kembalikan pointer-events
                wordTooltip.removeEventListener('transitionend', onTransitionEnd);
            };
            wordTooltip.addEventListener('transitionend', onTransitionEnd, { once: true }); // Tambahkan { once: true }
        }, 150); // Jeda singkat
    }

    function loadPoem() {
        const selectedPoemId = localStorage.getItem('selectedPoemId');
        
        getAndCombinePoems(); // Load all poems with their assigned unique IDs

        if (selectedPoemId !== null) {
            // Find poem by its unique 'id'
            const poem = poemsData.find(p => p.id === selectedPoemId);

            if (poem) {
                titleElement.textContent = poem.title;
                authorElement.textContent = `- ${poem.author}`;
                
                // Tokenisasi konten puisi untuk fitur Click for Know
                contentElement.innerHTML = tokenizePoemContent(poem.content);

                // Tambahkan event listener ke setiap kata yang di-tokenize
                document.querySelectorAll('#poem-full-text .word').forEach(wordElement => {
                    wordElement.addEventListener('click', (event) => {
                        event.stopPropagation(); // Mencegah event klik menyebar ke body
                        const rawWord = wordElement.textContent;
                        // Hapus tanda baca dari awal/akhir kata, jika ada, untuk pencarian yang lebih akurat
                        const cleanedWord = rawWord.replace(/^[.,!?;:()"']+|[.,!?;:()"']+$|[^\w\s-]/g, '').toLowerCase(); 

                        // Periksa apakah window.thesaurusDataMap sudah ada dan berisi data
                        if (window.thesaurusDataMap) {
                            const entry = window.thesaurusDataMap[cleanedWord];
                            if (entry) {
                                console.log(`Found thesaurus entry for "${cleanedWord}":`, entry);
                                showTooltip(wordElement, entry);
                            } else {
                                console.log(`No thesaurus entry found for "${cleanedWord}". Showing empty tooltip.`);
                                showTooltip(wordElement, { sinonim: [], antonim: [] }); // Tampilkan tooltip dengan pesan "Tidak ada"
                            }
                        } else {
                            console.error("Thesaurus data map (window.thesaurusDataMap) is not available.");
                            showTooltip(wordElement, { sinonim: [], antonim: [] }); // Fallback
                        }
                    });

                    // Gunakan mouseleave untuk mengelola tooltip jika mouse keluar dari kata
                    wordElement.addEventListener('mouseleave', hideTooltip); 
                });

                // Sembunyikan tooltip jika klik di luar atau scroll
                document.body.addEventListener('click', (event) => {
                    // Sembunyikan jika klik di luar tooltip DAN bukan pada kata
                    if (wordTooltip.classList.contains('show') && !wordTooltip.contains(event.target) && !event.target.closest('.word')) {
                        hideTooltip();
                    }
                });

                // Sembunyikan tooltip saat scroll pada elemen manapun di dokumen
                window.addEventListener('scroll', hideTooltip);


            } else {
                errorMessage.style.display = 'block';
                contentElement.style.display = 'none';
            }
        } else {
            errorMessage.style.display = 'block';
            contentElement.style.display = 'none';
        }
    }
    
    // Pastikan thesaurusDataMap sudah dimuat sebelum loadPoem
    // thesaurus.js harus dimuat sebelum full-preview.js di HTML
    const checkThesaurusReady = setInterval(() => {
        if (window.thesaurusDataMap) {
            clearInterval(checkThesaurusReady);
            loadPoem();
        }
    }, 100); // Cek setiap 100ms
});
