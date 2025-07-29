// ide-generator.js
// Logika untuk Generator Ide akan ditambahkan di sini, berfokus pada konsep "Slot Kata".

document.addEventListener('DOMContentLoaded', () => {
    console.log("ide-generator.js: DOMContentLoaded triggered. Initializing Slot Kata UI.");

    const tabClassic = document.getElementById('tab-classic');
    const tabSlot = document.getElementById('tab-slot');
    const zoneClassic = document.getElementById('classic-inspiration-zone');
    const zoneSlot = document.getElementById('slot-machine-zone');

    // Menggunakan variabel global untuk tombol-tombol utama
    const regenerateClassicBtn = document.getElementById('regenerate-classic-btn');
    const regenerateSlotBtn = document.getElementById('regenerate-slot-btn'); 

    const classicGrid = document.getElementById('classic-idea-grid');


    // Data untuk Zona Kartu Inspirasi Klasik
    const classicWordIdeas = ["Kabut", "Pilu", "Merah Tua", "Bayangan", "Bisikan", "Senja", "Hujan", "Sunyi", "Harapan", "Kepingan", "Cahaya", "Rindu", "Angkasa", "Bunga"];
    const classicThemeIdeas = ["Persahabatan", "Kota Senja", "Cinta Rahasia", "Kesepian Digital", "Perjalanan", "Alam", "Mimpi", "Waktu", "Kehilangan", "Kelahiran Kembali"];
    const classicQuoteIdeas = [
        { text: "Ada luka yang tak bisa ditulis, hanya bisa dirasa.", source: "Anonim" },
        { text: "Puisi adalah napas hidup yang mengalir di setiap kata.", source: "Pena" },
        { text: "Dunia adalah kanvas, kata-kata adalah kuasmu.", source: "Anonim" },
        { text: "Hujan tak pernah meminta rindu.", source: "Fiersa Besari" },
        { text: "Bahkan bayanganmu pun mulai lelah menunggu.", source: "Sapardi Djoko Damono" }
    ];
    const classicImageIdeas = [
        { url: "https://placehold.co/400x300/83A38F/FFFFFF?text=Pemandangan", quote: "Keindahan alam tak pernah ingkar janji." },
        { url: "https://placehold.co/400x300/2D4B6A/FFFFFF?text=Buku", quote: "Dalam setiap buku, ada dunia yang menanti." },
        { url: "https://placehold.co/400x300/D99886/FFFFFF?text=Kopi", quote: "Hangatnya kopi, sehangat cerita kita." },
        { url: "https://placehold.co/400x300/6A5ACD/FFFFFF?text=Langit%20Malam", quote: "Di bawah langit yang sama, kita bermimpi." },
        { url: "https://placehold.co/400x300/DDA0DD/FFFFFF?text=Awan", quote: "Awan berarak, membawa pesan dari masa lalu." }
    ];

    // Data untuk Zona Slot Kata
    const kataBenda = ["Kabut", "Senja", "Hujan", "Buku", "Kopi", "Bayangan", "Cermin", "Lampu", "Jam", "Daun", "Gunung", "Laut", "Bintang", "Angin", "Api", "Air", "Kayu", "Bunga", "Jalan", "Kota"];
    const kataSifat = ["Pilu", "Merah Tua", "Sunyi", "Gelap", "Terang", "Dingin", "Hangat", "Lama", "Baru", "Jauh", "Dekat", "Tinggi", "Rendah", "Cepat", "Lambat", "Indah", "Buruk", "Besar", "Kecil", "Lembut"];
    const suasana = ["Harapan", "Perpisahan", "Kesendirian", "Kegembiraan", "Kedamaian", "Kerinduan", "Kecemasan", "Petualangan", "Misteri", "Ketulusan", "Kebahagiaan", "Kesedihan", "Kemarahan", "Ketenangan", "Kehangatan", "Keterkejutan", "Kekaguman", "Keceriaan", "Kekuatan", "Kelemahan"];

    let favoriteIdeas = JSON.parse(localStorage.getItem('favoriteIdeas')) || [];
    let currentSlotIdea = null; // Untuk menyimpan ide yang sedang ditampilkan di slot

    // --- Fungsi Utilitas ---
    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function updateFavoriteState(button, idea) {
        console.log("updateFavoriteState dipanggil untuk:", idea);
        const isFavorited = favoriteIdeas.some(fav =>
            fav.type === idea.type && fav.value === idea.value
        );
        if (isFavorited) {
            button.classList.add('active');
            button.innerHTML = '<i class="fas fa-heart"></i> Hapus Favorit';
            console.log("Ide ditandai sebagai favorit (active).");
        } else {
            button.classList.remove('active');
            button.innerHTML = '<i class="fas fa-heart"></i> Simpan Favorit';
            console.log("Ide ditandai sebagai bukan favorit (inactive).");
        }
    }

    function toggleFavorite(idea) {
        console.log("toggleFavorite dipanggil untuk:", idea);
        const index = favoriteIdeas.findIndex(fav =>
            fav.type === idea.type && fav.value === idea.value
        );
        if (index > -1) {
            favoriteIdeas.splice(index, 1);
            console.log("Ide dihapus dari favorit. Total favorit:", favoriteIdeas.length);
        } else {
            favoriteIdeas.push(idea);
            console.log("Ide ditambahkan ke favorit. Total favorit:", favoriteIdeas.length);
        }
        localStorage.setItem('favoriteIdeas', JSON.stringify(favoriteIdeas));
        console.log("favoriteIdeas disimpan ke localStorage.");
    }

    // --- Fungsi untuk Mengelola Status Tombol Slot ---
    function setSlotButtonStates(disabled) {
        const saveBtn = document.getElementById('save-slot-idea-btn');
        const useBtn = document.getElementById('use-slot-idea-btn');

        if (regenerateSlotBtn) regenerateSlotBtn.disabled = disabled;
        if (saveBtn) saveBtn.disabled = disabled;
        if (useBtn) useBtn.disabled = disabled;
        console.log(`Status tombol Slot Kata disetel: regenerate=${!disabled}, save=${!disabled}, use=${!disabled}`);
    }

    // --- Logika Tab Navigasi ---
    function showZone(zoneId) {
        console.log("Mengubah zona ke:", zoneId);
        if (zoneId === 'classic') {
            zoneClassic.classList.add('active');
            zoneSlot.classList.remove('active');
            tabClassic.classList.add('active');
            tabSlot.classList.remove('active');
            renderClassicIdeas(); // Render ulang kartu setiap kali zona aktif
        } else if (zoneId === 'slot') {
            zoneClassic.classList.remove('active');
            zoneSlot.classList.add('active');
            tabClassic.classList.remove('active');
            tabSlot.classList.add('active');
            // Untuk memastikan tombol slot tidak disabled saat pertama kali pindah tab
            setSlotButtonStates(false); 
            // spinSlots(); // Bisa diputar otomatis saat masuk zona slot, tapi user minta saat klik tombol saja
        }
    }

    // --- Logika Zona Kartu Inspirasi Klasik ---
    function generateClassicIdeaCard(type) {
        const card = document.createElement('div');
        card.classList.add('idea-card');
        let contentHtml = '';
        let ideaData = { type: type, value: '' };

        if (type === 'word') {
            ideaData.value = getRandomElement(classicWordIdeas);
            contentHtml = `<p class="idea-text-classic">"${ideaData.value}"</p>`;
        } else if (type === 'theme') {
            ideaData.value = getRandomElement(classicThemeIdeas);
            contentHtml = `<p class="idea-text-classic">"${ideaData.value}"</p>`;
        } else if (type === 'quote') {
            const quoteObj = getRandomElement(classicQuoteIdeas);
            ideaData.value = quoteObj.text;
            contentHtml = `
                <p class="idea-quote-classic">"${quoteObj.text}"</p>
                <span class="quote-source">- ${quoteObj.source}</span>
            `;
        } else if (type === 'image') {
            const imageObj = getRandomElement(classicImageIdeas);
            ideaData.value = imageObj.url; // Simpan URL gambar sebagai value
            contentHtml = `
                <div class="idea-image-wrapper-classic">
                    <img src="${imageObj.url}" alt="Ide Gambar" class="idea-image-classic">
                    <div class="image-quote-overlay-classic">${imageObj.quote}</div>
                </div>
            `;
        }

        card.innerHTML = `
            <span class="card-type-classic">Jenis: ${type.charAt(0).toUpperCase() + type.slice(1)}</span>
            <div class="card-content-area">
                ${contentHtml}
            </div>
            <div class="classic-card-actions">
                <button class="classic-action-btn favorite-btn-classic" data-type="${ideaData.type}" data-value="${ideaData.value}">
                    <i class="fas fa-heart"></i> Simpan
                </button>
                <button class="classic-action-btn use-for-challenge-btn" data-idea-value="${ideaData.value}" data-idea-type="${ideaData.type}">
                    <i class="fas fa-pen-nib"></i> Gunakan
                </button>
            </div>
        `;

        const favBtn = card.querySelector('.favorite-btn-classic');
        updateFavoriteState(favBtn, ideaData);

        favBtn.addEventListener('click', () => {
            console.log("Tombol Simpan/Hapus Favorit (Kartu Klasik) diklik:", ideaData);
            toggleFavorite(ideaData);
            updateFavoriteState(favBtn, ideaData);
        });

        card.querySelector('.use-for-challenge-btn').addEventListener('click', (e) => {
            const ideaValue = e.currentTarget.dataset.ideaValue;
            console.log("Tombol Gunakan (Kartu Klasik) diklik. Mengirim ide:", ideaValue);
            // Redirect to write page, passing the idea as a URL parameter
            // Pastikan animatePageTransition ada di common.js dan berfungsi
            if (typeof animatePageTransition === 'function') {
                animatePageTransition(`write.html?idea=${encodeURIComponent(ideaValue)}`);
            } else {
                console.warn("animatePageTransition tidak ditemukan, navigasi langsung.");
                window.location.href = `write.html?idea=${encodeURIComponent(ideaValue)}`;
            }
        });

        return card;
    }

    function renderClassicIdeas() {
        console.log("Rendering ulang kartu ide klasik...");
        classicGrid.innerHTML = '';
        const types = ['word', 'theme', 'quote', 'image']; // Jenis kartu yang akan ditampilkan
        types.forEach(type => {
            classicGrid.appendChild(generateClassicIdeaCard(type));
        });
        if (regenerateClassicBtn) {
            regenerateClassicBtn.disabled = false; // Pastikan tombol aktif
        }
        console.log("Kartu ide klasik selesai dirender.");
    }

    // --- Logika Zona Slot Kata ---
    function initializeSlotKataUI() {
        console.log("Menginisialisasi UI Slot Kata...");
        zoneSlot.innerHTML = `
            <div class="slot-machine-container">
                <div class="slot-column" id="slot-column-1"></div>
                <div class="slot-column" id="slot-column-2"></div>
                <div class="slot-column" id="slot-column-3"></div>
            </div>
            <div class="slot-actions">
                <button class="idea-action-btn favorite-btn" id="save-slot-idea-btn">
                    <i class="fas fa-heart"></i> Simpan Inspirasi
                </button>
                <button class="idea-action-btn use-for-challenge-btn-slot" id="use-slot-idea-btn">
                    <i class="fas fa-pen-nib"></i> Gunakan Kombinasi Ini
                </button>
            </div>
        `;
        // Pastikan event listeners terpasang setelah elemen dibuat
        attachSlotEventListeners();
        // Setel status tombol ke disabled selama putaran awal
        setSlotButtonStates(true); 
        spinSlots(); // Mulai putaran awal
        console.log("UI Slot Kata selesai diinisialisasi dan memulai putaran awal.");
    }

    function spinSlots() {
        console.log("Memulai putaran slot...");
        const column1 = document.getElementById('slot-column-1');
        const column2 = document.getElementById('slot-column-2');
        const column3 = document.getElementById('slot-column-3');

        // Nonaktifkan tombol di awal putaran
        setSlotButtonStates(true);

        // Clear previous content and add spinning class
        [column1, column2, column3].forEach(col => {
            col.innerHTML = '';
            col.classList.add('spinning');
            // Add multiple dummy items for visual spinning effect
            for (let i = 0; i < 20; i++) {
                const item = document.createElement('div');
                item.classList.add('slot-item');
                let dummyText;
                if (col.id === 'slot-column-1') dummyText = getRandomElement(kataBenda); 
                else if (col.id === 'slot-column-2') dummyText = getRandomElement(kataSifat); 
                else dummyText = getRandomElement(suasana); 
                item.textContent = dummyText;
                col.appendChild(item);
            }
        });

        const result1 = getRandomElement(kataBenda);
        const result2 = getRandomElement(kataSifat);
        const result3 = getRandomElement(suasana);

        // Stop columns sequentially with delays
        setTimeout(() => stopSlot(column1, result1), 500);
        setTimeout(() => stopSlot(column2, result2), 1000);
        setTimeout(() => stopSlot(column3, result3), 1500, () => {
            // Setelah semua slot berhenti, aktifkan tombol dan set ide saat ini
            setSlotButtonStates(false); // Aktifkan tombol
            
            currentSlotIdea = {
                type: "Slot Kata",
                value: `${result1} - ${result2} - ${result3}`,
                words: [result1, result2, result3] // Simpan kata-kata individual juga
            };
            updateSaveButtonStateSlot(); // Perbarui status favorit untuk slot
            // Set data-attribute untuk tombol 'Gunakan Kombinasi Ini' setelah currentSlotIdea disetel
            const useBtn = document.getElementById('use-slot-idea-btn');
            if (useBtn) useBtn.dataset.ideaValue = currentSlotIdea.value; 
            console.log("Putaran slot selesai. Hasil:", currentSlotIdea.value);
        });
    }

    function stopSlot(column, finalResult) {
        column.classList.remove('spinning');
        column.innerHTML = ''; // Clear dummy items
        const finalItem = document.createElement('div');
        finalItem.classList.add('slot-item', 'final-result');
        finalItem.textContent = finalResult;
        column.appendChild(finalItem);
        console.log(`Slot ${column.id} berhenti di: ${finalResult}`);
    }

    function attachSlotEventListeners() {
        // Event listener untuk tombol simpan inspirasi slot
        const saveBtn = document.getElementById('save-slot-idea-btn');
        const useBtn = document.getElementById('use-slot-idea-btn');

        if (saveBtn) {
            saveBtn.removeEventListener('click', handleSaveSlotIdeaClick); // Hapus listener lama jika ada
            saveBtn.addEventListener('click', handleSaveSlotIdeaClick);
        }
        if (useBtn) {
            useBtn.removeEventListener('click', handleUseSlotIdeaClick); // Hapus listener lama jika ada
            useBtn.addEventListener('click', handleUseSlotIdeaClick);
        }
        console.log("Event listeners untuk tombol Slot Kata terpasang.");
    }

    function handleSaveSlotIdeaClick() {
        console.log("Tombol Simpan Inspirasi (Slot Kata) diklik.");
        if (!currentSlotIdea) {
            console.warn("Tidak ada ide slot saat ini untuk disimpan.");
            return;
        }
        toggleFavorite(currentSlotIdea);
        updateSaveButtonStateSlot();
    }

    function handleUseSlotIdeaClick(e) {
        const ideaValue = e.currentTarget.dataset.ideaValue;
        console.log("Tombol Gunakan Kombinasi Ini (Slot Kata) diklik. Mengirim ide:", ideaValue);
        // Pastikan animatePageTransition ada di common.js dan berfungsi
        if (typeof animatePageTransition === 'function') {
            animatePageTransition(`write.html?idea=${encodeURIComponent(ideaValue)}`);
        } else {
            console.warn("animatePageTransition tidak ditemukan, navigasi langsung.");
            window.location.href = `write.html?idea=${encodeURIComponent(ideaValue)}`;
        }
    }


    function updateSaveButtonStateSlot() {
        const saveBtn = document.getElementById('save-slot-idea-btn');
        if (!saveBtn || !currentSlotIdea) {
            console.warn("Tombol simpan slot atau ide saat ini tidak ditemukan untuk update status.");
            return;
        }

        const isFavorited = favoriteIdeas.some(fav =>
            fav.type === currentSlotIdea.type && fav.value === currentSlotIdea.value
        );

        if (isFavorited) {
            saveBtn.classList.add('active');
            saveBtn.innerHTML = '<i class="fas fa-heart"></i> Hapus Inspirasi';
            console.log("Status tombol simpan slot: aktif (favorit).");
        } else {
            saveBtn.classList.remove('active');
            saveBtn.innerHTML = '<i class="fas fa-heart"></i> Simpan Inspirasi';
            console.log("Status tombol simpan slot: tidak aktif (bukan favorit).");
        }
    }


    // --- Inisialisasi Umum ---
    tabClassic.addEventListener('click', () => showZone('classic'));
    tabSlot.addEventListener('click', () => showZone('slot'));

    // Event listener untuk tombol Regenerasi di Zona Klasik
    if (regenerateClassicBtn) {
        regenerateClassicBtn.addEventListener('click', renderClassicIdeas);
        console.log("Event listener untuk regenerateClassicBtn terpasang.");
    }

    // Event listener untuk tombol Regenerasi di Zona Slot
    if (regenerateSlotBtn) {
        regenerateSlotBtn.addEventListener('click', spinSlots);
        console.log("Event listener untuk regenerateSlotBtn terpasang.");
    }


    // Tampilkan zona klasik secara default saat pertama kali dimuat
    showZone('classic');
    initializeSlotKataUI(); // Inisialisasi UI Slot Kata juga agar siap saat tab diaktifkan
});
