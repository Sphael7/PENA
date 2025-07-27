// Membungkus seluruh kode dalam DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("thesaurus.js: DOMContentLoaded triggered. (Thesaurus script loaded)");
    
    // Elemen utama
    const thesaurusSearchInput = document.getElementById('thesaurus-search-input');
    const clearThesaurusSearchBtn = document.getElementById('clear-thesaurus-search-btn');
    const thesaurusListContainer = document.getElementById('thesaurus-list');
    const noResultsMessage = document.getElementById('no-results');

    // Elemen Modal Tambah/Edit Kata Utama
    const addNewWordBtn = document.getElementById('add-new-word-btn');
    const wordFormModal = document.getElementById('word-form-modal');
    const closeModalBtn = document.getElementById('close-modal-btn'); 
    const modalTitle = document.getElementById('modal-title');
    const wordEntryForm = document.getElementById('word-entry-form');
    const mainWordInput = document.getElementById('main-word-input');
    const synonymsInput = document.getElementById('synonyms-input');
    const antonymsInput = document.getElementById('antonyms-input');
    const originalMainWordForEdit = document.getElementById('original-main-word-for-edit'); 

    // Kunci localStorage untuk font puisi (digunakan di halaman lain)
    const FONT_STORAGE_KEY = 'selectedPoemFont';


    const rawThesaurusData = `Sayang: Cinta, Kasih, Asih, Rindu, Gemar, Suka, Kekasih - Benci, Bencian, Muak, Dendam, Jijik, Antipati
Indah: Cantik, Elok, Molek, Permai, Asri, Menawan, Rupawan, Mempesona, Anggun - Jelek, Buruk, Huduh, Tampan, Busuk, Kotor, Kumal
Besar: Agung, Raya, Akbar, Gede, Luas, Lebar, Agung, Megah, Hebat, Utama, Penting - Kecil, Mungil, Mini, Kerdil, Remeh, Sepele
Cepat: Laju, Lekas, Segera, Gesit, Kilat, Deras, Ekspres, Tangkas - Lambat, Pelan, Beringsut, Tertunda, Perlahan
Pandai: Pintar, Cerdas, Cendekia, Mahir, Cakap, Mampu, Berbakat, Ulung - Bodoh, Tolol, Dungu, Bloon, Bego, Lamban, Pikun
Senang: Gembira, Bahagia, Riang, Ceria, Sukacita, Lega, Suka, Nikmat, Puas - Sedih, Duka, Lara, Murung, Kecewa, Susah, Nestapa
Sakit: Nyeri, Perih, Sakit, Demam, Meriang, Lara, Pening, Rusak, Cacat - Sehat, Bugar, Pulih, Sembuh, Prima, Fit
Bersih: Suci, Apik, Rapi, Higienis, Murni, Jernih, Terawat, Bebas Noda - Kotor, Jorok, Kumal, Busuk, Kusam, Ternoda, Lusuh
Jauh: Lena, Lenggang, Terpencil, Terpisah, Terasing, Lebar, Luas, Panjang - Dekat, Rapat, Karib, Akrab, Erat, Berdampingan
Tua: Uzur, Lanjut, Senja, Jompo, Kuno, Lawas, Lama, Veteran, Berumur - Muda, Belia, Remaja, Baru, Segar, Kanak-kanak
Baru: Anyar, Gress, Anyar, Modern, Kontemporer, Segar, Mutakhir, Unik - Lama, Bekas, Usang, Kuno, Klasik, Kadaluarsa
Terang: Bening, Jelas, Cerah, Benderang, Bercahaya, Transparan, Gamblang, Tegas - Gelap, Redup, Kelam, Suram, Mendung, Kabur, Buram
Kuat: Kokoh, Perkasa, Teguh, Tangguh, Gagah, Perkasa, Berkuasa, Mampu - Lemah, Rapuh, Ringkih, Loyo, Lemah, Lunak, Luluh
Mahal: Tinggi, Mewah, Berharga, Berkelas, Elit, Langka, Eksklusif, Spektakuler - Murah, Rendah, Terjangkau, Gratis, Receh, Biasa
Sulit: Sukar, Payah, Rumit, Berat, Kompleks, Berliku, Menantang, Mustahil - Mudah, Gampang, Simpel, Ringan, Praktis, Sederhana, Lanca
Benar: Tepat, Betul, Akurat, Valid, Sahih, Realistis, Sejati, Lurus - Salah, Keliru, Sesat, Palsu, Bohong, Dusta, Fiktif
Hidup: Nyawa, Eksis, Bernyawa, Berlangsung, Aktif, Bergairah, Bersemangat - Mati, Wafat, Meninggal, Punah, Gugur, Tidak Ada
Maju: Berkembang, Progres, Melaju, Bergerak, Meningkat, Modern, Canggih, Sukses - Mundur, Surut, Stagnan, Terhambat, Terbelakang, Kuno
Kaya: Makmur, Sejahtera, Berlimpah, Mampu, Berkecukupan, Berpunya, Konglomerat - Miskin, Melarat, Papa, Kekurangan, Fakir, Miskin
Ramai: Riuh, Sibuk, Padat, Penuh, Meriah, Seru, Bergairah, Heboh - Sepi, Senyap, Sunyi, Hening, Lengang, Sepi
Dingin: Sejuk, Beku, Dingin, Tirta, Adem, Kaku, Cuek, Hambar - Panas, Hangat, Terik, Membara, Gerah, Membara
Tinggi: Jangkung, Menjulang, Agung, Besar, Mulia, Luhur, Tinggi - Rendah, Pendek, Cebol, Kecil, Hina, Rendahan
Dekat: Akrab, Karib, Erat, Rapat, Berdampingan, Sedikit, Akrab - Jauh, Asing, Terpencil, Jauh, Terpisah, Berjauhan
Lama: Klasik, Lawas, Kuno, Uzur, Abadi, Berusia, Usang - Baru, Modern, Anyar, Segar, Kontemporer, Mutakhir
Gila: Edan, Sinting, Sarap, Mabuk, Tidak Waras, Aneh, Absurd - Waras, Sadar, Sehat, Normal, Rasional, Logis
Malas: Enggan, Segan, Lesu, Loyo, Pemalas, Malas, Pasif - Rajin, Giat, Tekun, Semangat, Aktif, Produktif
Bagus: Baik, Optimal, Prima, Indah, Elok, Sempurna, Menarik, Istimewa - Jelek, Buruk, Jelek, Biasa, Cacat, Rusak, Rendah
Pintar: Cendekia, Terpelajar, Cerdas, Mahir, Berpengetahuan, Bijak, Ulung - Bodoh, Dangkal, Dungu, Tolol, Buta Huruf, Awam
Murni: Asli, Ori, Tulen, Sejati, Bersih, Suci, Polos, Sempurna - Campuran, Palsu, Tiruan, Kotor, Ternoda, Imitasi
Lengkap: Utuh, Penuh, Sempurna, Komplet, Seluruh, Lengkap, Akurat - Kurang, Cacat, Tidak Lengkap, Parsial, Setengah, Kurang
Jujur: Tulus, Polos, Terus terang, Lurus hati, Transparan, Adil, Benar - Bohong, Dusta, Palsu, Curang, Licik, Munafik, Fiktif
Rajin: Giat, Tekun, Cekatan, Aktif, Produktif, Disiplin, Ulet - Malas, Enggan, Lesu, Loyo, Pemalas, Pasif, Lambat
Berani: Gagah, Perkasa, Pemberani, Nekat, Neofobia, Ksatria, Pahlawan - Takut, Gentar, Pengecut, Ciut, Penakut, Pesimis
Malang: Sial, Apes, Celaka, Bernasib Buruk, Malang, Tragis, Derita - Beruntung, Mujur, Bahagia, Sukses, Berjaya, Nikmat
Buka: Membuka, Menguak, Memulai, Membuka, Melepas, Membuka - Tutup, Menutup, Mengunci, Mengakhiri, Menutup
Tutup: Membungkus, Membalut, Menutup, Mengakhiri, Menutup, Kunci, Stop - Buka, Membuka, Memulai, Menguak, Melepas
Akhir: Pungkas, Tamat, Selesai, Usai, Penutup, Konklusi, Final - Awal, Mulai, Pangkal, Pembuka, Pertama, Asal
Awal: Mula, Pangkal, Pembuka, Pertama, Asal, Inisiasi, Permulaan - Akhir, Selesai, Pungkas, Tamat, Penutup, Final
Asli: Tulen, Orisinil, Murni, Sejati, Otentik, Non-imitasi, Bawaan - Palsu, Tiruan, Imitasi, Rekayasa, Bajakan, Tidak Asli
Sehat: Bugar, Prima, Fit, Kuat, Segar, Normal, Baik - Sakit, Meriang, Lemah, Lesu, Tidak Sehat, Cacat
Kotor: Jorok, Lusuh, Kumal, Ternoda, Busuk, Kusam, Keruh, Buruk - Bersih, Apik, Suci, Rapi, Higienis, Jernih
Terbit: Muncul, Timbul, Keluar, Terbit, Menerbitkan, Mempublikasikan, Terbit - Tenggelam, Terbenam, Menghilang, Redup, Memudar
Terang: Cerah, Benderang, Bercahaya, Bening, Jelas, Gamblang, Tegas - Gelap, Mendung, Kelam, Remang, Suram, Kabur, Buram
Gelap: Kelam, Remang, Suram, Hitam, Buram, Tidak Jelas, Tidak Terlihat - Terang, Cerah, Benderang, Bercahaya, Jelas, Terlihat
Cerdas: Cendekia, Brilian, Pintar, Mahir, Berpengetahuan, Bijak, Genial - Bodoh, Lamban, Dungu, Tolol, Tidak Berakal, Dangkal
Lapar: Haus, Dahaga, Lapar, Ingin Makan, Kurang Makan, Tercekik - Kenyang, Penuh, Puas, Cukup, Tidak Lapar
Haus: Dahaga, Kering, Haus, Ingin Minum, Dehidrasi - Kenyang, Lembab, Basah, Tidak Haus, Terhidrasi
Kenyang: Penuh, Puas, Tercukupi, Tidak Lapar, Mulus - Lapar, Haus, Kosong, Kurang, Tidak Kenyang
Rendah: Pendek, Cebol, Hina, Lemah, Kecil, Rendahan, Rendah hati - Tinggi, Jangkung, Mulia, Besar, Agung, Tinggi hati
Pendek: Ringkas, Singkat, Cekak, Kecil, Rendah, Tidak Panjang - Panjang, Lebar, Luas, Tinggi, Jauh, Berlarut
Panjang: Lebar, Luas, Terbentang, Jauh, Lama, Berlarut, Lanjut - Pendek, Singkat, Cekak, Kecil, Dekat
Lebar: Luas, Bentang, Lapang, Terbentang, Lebar, Besar, Jembar - Sempit, Kecil, Sesak, Ciut, Angka, Mikro
Sempit: Kecil, Sesak, Ciut, Terbatas, Tidak Luas, Mikro, Angka - Lebar, Luas, Lapang, Luas, Terbentang, Jembar
Ringan: Enteng, Remeh, Mudah, Gampang, Ringan, Tidak Berat, Fleksibel - Berat, Sulit, Susah, Rumit, Beban, Padat
Berat: Bobot, Beban, Sulit, Susah, Rumit, Padat, Kuat, Tegas - Ringan, Enteng, Mudah, Gampang, Remeh, Lunak
Mudah: Gampang, Simpel, Ringan, Praktis, Sederhana, Tidak Sulit, Lanca - Sulit, Sukar, Payah, Rumit, Berat, Kompleks
Susah: Sulit, Payah, Rumit, Berat, Kompleks, Berliku, Menantang - Mudah, Gampang, Simpel, Ringan, Praktis, Sederhana
Senyum: Tawa, Gembira, Ceria, Tertawa, Mengembangkan Senyum, Berbahagia - Cemberut, Masam, Murung, Sedih, Menangis, Merengut
Tangis: Sedih, Duka, Lara, Menangis, Air Mata, Ratap, Meratap - Tawa, Ceria, Gembira, Senyum, Bahagia, Tertawa
Suka: Gemar, Kagum, Senang, Cinta, Kasih, Menyukai, Mengagumi - Benci, Muak, Tidak Suka, Jijik, Antipati, Dendam
Benci: Dendam, Jengkel, Muak, Jijik, Antipati, Menolak, Marah - Suka, Cinta, Kasih, Sayang, Gemar, Mengagumi
Tidur: Rebahan, Berbaring, Mengistirahatkan, Pulas, Terlelap, Beristirahat - Bangun, Terbangun, Sadar, Terjaga, Aktif, Bergerak
Bangun: Berdiri, Tegak, Terbangun, Pulih, Membangun, Membuat, Berdiri - Roboh, Runtuh, Jatuh, Tidur, Terbaring, Hancur
Duduk: Bertengger, Bersemayam, Beristrihat, Bersila, Mangkring, Nongkrong - Berdiri, Bergerak, Berlari, Melompat, Berjalan
Berdiri: Tegak, Kokoh, Mampu, Berdiri, Tegar, Menjulang - Jatuh, Rebahan, Roboh, Runtuh, Terbaring, Duduk
Jatuh: Gugur, Melorot, Ambruk, Roboh, Terjatuh, Anjlok, Runtuh - Bangkit, Naik, Melesat, Melonjak, Berdiri, Meningkat
Naik: Menaiki, Menanjak, Meningkat, Melaju, Terbang, Melonjak, Memuncak - Turun, Menurun, Merosot, Anjlok, Jatuh, Merosot
Turun: Menurunkan, Melorotkan, Merosot, Jatuh, Anjlok, Terjun, Menurun - Naik, Meningkat, Melaju, Terbang, Melonjak, Memuncak
Masuk: Memasuki, Menyelinap, Mendaftar, Berpartisipasi, Mendalam, Menggabung - Keluar, Meninggalkan, Menyingkir, Absen, Menolak, Menjauh
Keluar: Meninggalkan, Menyingkir, Pergi, Berangkat, Terbit, Muncul - Masuk, Memasuki, Menyelinap, Tinggal, Menetap
Depan: Muka, Hadapan, Muka, Mula, Awal, Utama, Pertama - Belakang, Punggung, Buritan, Akhir, Kemudian
Belakang: Punggung, Buritan, Kemudian, Akhir, Terakhir, Tertinggal - Depan, Muka, Hadapan, Awal, Pertama
Atas: Puncak, Pucuk, Luhur, Agung, Mulia, Tinggi, Unggul - Bawah, Dasar, Kaki, Rendah, Bawahan, Sepele
Bawah: Dasar, Kaki, Rendah, Bawahan, Sepele, Terendah, Fondasi - Atas, Puncak, Pucuk, Luhur, Agung, Tinggi
Kanan: Sisi, Lambung, Ke Kanan, Samping, Benar, Tepat - Kiri, Lawan, Salah, Kebalikan
Kiri: Sisi, Lambung, Ke Kiri, Samping, Salah, Lawan - Kanan, Benar, Tepat, Kebalikan
Mulai: Berangkat, Awalan, Memulai, Mengawali, Start, Pertama, Inisiasi - Selesai, Akhir, Tamat, Usai, Penutup, Berhenti
Selesai: Rampung, Usai, Tamat, Akhir, Penutup, Final, Berakhir - Mulai, Berangkat, Awalan, Memulai, Start
Setuju: Sepakat, Mufakat, Sepaham, Mengiyakan, Mengamini, Sesuai, Kompak - Tidak Setuju, Menolak, Membantah, Menentang, Tidak Sepakat, Berbeda Pendapat
Menolak: Menentang, Membantah, Menampik, Menolak, Menolak, Menentang - Menerima, Menyetujui, Sepakat, Mufakat, Mengiyakan
Menerima: Mengakui, Memperoleh, Mengambil, Menerima, Menyetujui, Menampung - Menolak, Menolak, Menolak, Memberi, Memberikan
Memberi: Menyumbang, Menyediakan - Menerima, Mengambil
Mengambil: Memungut, Memetik - Memberi, Memberikan
Banyak: Berlimpah, Melimpah - Sedikit, Langka
Sedikit: Segelintir, Sebagian - Banyak, Melimpah
Kosong: Hampa, Hening - Penuh, Berisi
Penuh: Padat, Berisi - Kosong, Hampa
Lurus: Lempeng, Tegak - Bengkok, Belok
Bengkok: Meliuk, Melengkung - Lurus, Tegak
Tumpul: Tumpu, Bundar - Tajam, Lancip
Tajam: Lancip, Runcing - Tumpul, Bundar
Lemah: Rapuh, Ringkih - Kuat, Kokoh
Rapuh: Ringkih, Goyah - Kokoh, Kuat
Tepat: Benar, Akurat - Salah, Keliru
Akurat: Presisi, Cermat - Tidak Akurat, Melenceng
Cermat: Teliti, Akurat - Ceroboh, Lalai
Lalai: Ceroboh, Abai - Teliti, Cermat
Cerdas: Pandai, Pintar - Bodoh, Dungu
Dungu: Bodoh, Tolol - Cerdas, Pintar
Keras: Tegar, Padat - Lunak, Lembut
Lunak: Lembut, Empuk - Keras, Tegar
Lembut: Halus, Mulus - Kasar, Keras
Kasar: Kesat, Garang - Halus, Lembut
Manis: Legi, Sedap - Pahit, Kecut
Pahit: Getir, Pedih - Manis, Legi
Asin: Masin, Gurih - Hambar, Tawar
Tawar: Hambar, Hambar - Asin, Masin
Enak: Lezat, Sedap - Tidak Enak, Hambar
Lezat: Nikmat, Sedap - Hambar, Tak Sedap
Harum: Wangi, Semerbak - Bau, Busuk
Bau: Pesing, Apek - Harum, Wangi
Terbenam: Tenggelam, Menghilang - Terbit, Muncul
Datang: Tiba, Hadir - Pergi, Berangkat
Pergi: Berangkat, Meninggalkan - Datang, Tiba
Beli: Membeli, Memborong - Jual, Menjual
Jual: Menjual, Menawarkan - Beli, Membeli
Pinjam: Meminjam, Mengambil - Mengembalikan, Memberi
Kembali: Pulang, Datang - Berangkat, Pergi
Pegang: Menggenggam, Menjepit - Melepas, Meletakkan
Lepas: Bebas, Merdeka - Terikat, Terkunci
Ikat: Mengikat, Membelenggu - Lepas, Membebaskan
Isi: Berisi, Terisi - Kosong, Hampa
Dalam: Kedalaman, Jeroan - Dangkal, Cetek
Luas: Lebar, Terbentang - Sempit, Kecil
Teratur: Rapi, Tertib - Berantakan, Acak
Berantakan: Kacau, Acak - Teratur, Rapi
Bersatu: Berpadu, Bersekutu - Bercerai, Terpisah
Bercerai: Berpisah, Berlainan - Bersatu, Bergabung
Sama: Setara, Serupa - Beda, Berbeda
Beda: Berlainan, Lain - Sama, Serupa
Tahu: Mengerti, Paham - Tidak Tahu, Bingung
Mengerti: Paham, Menyadari - Tidak Mengerti, Bingung
Percaya: Yakin, Memercayai - Ragukan, Meragukan
Ragukan: Meragukan, Menaruh Curiga - Percaya, Yakin
Ingat: Mengenang, Mengingat - Lupa, Melupakan
Lupa: Melupakan, Mengabaikan - Ingat, Mengingat
Bahagia: Senang, Gembira - Sedih, Duka
Takut: Gentar, Cemas - Berani, Gagah
Marah: Murka, Geram - Tenang, Sabar
Gelisah: Cemas, Resah - Tenang, Damai
Sabar: Tabah, Ikhlas - Emosi, Marah
Emosi: Marah, Kesal - Tenang, Sabar
Pasti: Tentu, Yakin - Ragukan, Mungkin
Mungkin: Bisa Jadi, Barangkali - Pasti, Tentu
Jujur: Tulus, Polos - Bohong, Dusta
Sombong: Angkuh, Congkak - Rendah Hati, Tawaduk
Hemat: Irit, Cermat - Boros, Foya-foya
Cinta: Kasih, Sayang - Benci, Dendam
Rindu: Kangen, Sayu - Bosan, Jemu
Cari: Mencari, Menelusuri - Menemukan, Menemui
Lihat: Memandang, Menyaksikan - Mengabaikan, Melupakan
Bicara: Berbicara, Berujar - Diam, Membungkam
Makan: Menyantap, Menghabiskan - Berpuasa, Tidak Makan
Tulis: Menulis, Mengukir - Hapus, Menghapus
Tanya: Bertanya, Mengajukan - Jawab, Menjawab
Bantu: Menolong, Mendukung - Merugikan, Menghambat
Puji: Memuji, Mengagumi - Caci, Mencela
Berangkat: Pergi, Melaju - Pulang, Kembali
Tinggal: Menetap, Mendiami - Pergi, Meninggalkan
Aman: Damai, Tentram - Bahaya, Ancaman
Siang: Terang, Cerah - Malam, Gelap
Pagi: Subuh, Fajar - Sore, Petang
Sekarang: Kini, Saat Ini - Dulu, Dahulu
Nanti: Kelak, Besok - Sekarang: Kini
Baik: Bagus, Prima - Buruk, Jelek
Lama: Klasik, Lawas - Baru, Modern
Hilang: Lenyap, Musnah - Ditemukan, Ada
Setuju: Sepakat, Mufakat - Tolak, Menolak
`;

    let thesaurusData = []; 

    // --- Fungsi untuk Mengelola Data Kustom Pengguna di Local Storage ---
    const USER_THESAURUS_KEY = 'userThesaurusData';

    function loadUserThesaurusData() {
        try {
            const data = localStorage.getItem(USER_THESAURUS_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Error loading user thesaurus data from localStorage:", e);
            return [];
        }
    }

    function saveUserThesaurusData(data) {
        try {
            localStorage.setItem(USER_THESAURUS_KEY, JSON.stringify(data));
        } catch (e) {
            console.error("Error saving user thesaurus data to localStorage:", e);
        }
    }

    // Menambah entri kata utama baru
    function addUserThesaurusEntry(entry) {
        const userEntries = loadUserThesaurusData();
        userEntries.push(entry);
        saveUserThesaurusData(userEntries);
    }

    // Memperbarui entri kata utama yang ada
    function updateUserThesaurusEntry(originalWord, updatedEntry) {
        let userEntries = loadUserThesaurusData();
        const index = userEntries.findIndex(entry => entry.word.toLowerCase() === originalWord.toLowerCase()); // Case-insensitive find
        if (index !== -1) {
            userEntries[index] = updatedEntry;
            saveUserThesaurusData(userEntries);
        } else {
            console.warn(`Attempted to update non-existent word: ${originalWord}`);
            addUserThesaurusEntry(updatedEntry);
        }
    }

    // Menghapus entri kata utama
    function deleteUserThesaurusEntry(wordToDelete) {
        let userEntries = loadUserThesaurusData();
        userEntries = userEntries.filter(entry => entry.word.toLowerCase() !== wordToDelete.toLowerCase()); // Case-insensitive filter
        saveUserThesaurusData(userEntries);
    }

    // Menambah sinonim/antonim ke kata yang sudah ada (termasuk kata bawaan yang diubah)
    function addTermToEntry(mainWord, type, newTerms) {
        let userEntries = loadUserThesaurusData();
        let entryToModify = userEntries.find(e => e.word.toLowerCase() === mainWord.toLowerCase());

        if (!entryToModify) { // Jika kata utama bukan kustom, salin dari bawaan
            const builtInEntry = thesaurusData.find(e => e.word.toLowerCase() === mainWord.toLowerCase() && !e.isCustom);
            if (builtInEntry) {
                entryToModify = { ...builtInEntry, isCustom: true };
                userEntries.push(entryToModify);
            } else {
                console.warn(`Could not find main word ${mainWord} to add terms to.`);
                return;
            }
        }
        
        newTerms.forEach(term => {
            if (!entryToModify[type].map(s => s.toLowerCase()).includes(term.toLowerCase())) { // Hindari duplikasi case-insensitive
                entryToModify[type].push(term);
            }
        });
        saveUserThesaurusData(userEntries);
    }

    // Mengedit sinonim/antonim dari kata yang sudah ada
    function updateTermInEntry(mainWord, type, oldTerm, newTerm) {
        let userEntries = loadUserThesaurusData();
        const entryToModify = userEntries.find(e => e.word.toLowerCase() === mainWord.toLowerCase());
        
        if (entryToModify) {
            const termList = entryToModify[type];
            const termIndex = termList.findIndex(term => term.toLowerCase() === oldTerm.toLowerCase()); // Case-insensitive find
            if (termIndex !== -1) {
                termList[termIndex] = newTerm;
                saveUserThesaurusData(userEntries);
            }
        }
    }

    // Menghapus sinonim/antonim dari kata yang sudah ada
    function deleteTermFromEntry(mainWord, type, termToDelete) {
        let userEntries = loadUserThesaurusData();
        const entryToModify = userEntries.find(e => e.word.toLowerCase() === mainWord.toLowerCase());
        
        if (entryToModify) {
            entryToModify[type] = entryToModify[type].filter(term => term.toLowerCase() !== termToDelete.toLowerCase()); // Case-insensitive filter
            saveUserThesaurusData(userEntries);
        }
    }

    // -------------------------------------------------------------------

    function parseThesaurusData(rawData) {
        const parsedBuiltIn = rawData.split('\n').map(line => {
            line = line.trim();
            if (!line) return null;

            const parts = line.split(':');
            if (parts.length < 2) {
                console.warn("Skipping malformed built-in thesaurus entry (missing colon or incomplete):", line);
                return null;
            }

            const wordPart = parts[0].trim();
            const relatedPart = parts[1].trim();

            const subParts = relatedPart.split(' - ');
            const synonymsPart = subParts[0] ? subParts[0].trim() : '';
            const antonymsPart = subParts[1] ? subParts[1].trim() : '';

            return {
                word: wordPart,
                synonyms: synonymsPart ? synonymsPart.split(',').map(s => s.trim()) : [],
                antonyms: antonymsPart ? antonymsPart.split(',').map(s => s.trim()) : [],
                isCustom: false
            };
        }).filter(entry => entry !== null);

        const userEntries = loadUserThesaurusData().map(entry => ({ ...entry, isCustom: true })); 
        
        // Gabungkan, pastikan userEntries menimpa bawaan jika nama kata utama sama
        // Menggunakan Map untuk memastikan kata utama unik (prioritas kustom)
        const combinedDataMap = new Map();
        parsedBuiltIn.forEach(entry => combinedDataMap.set(entry.word.toLowerCase(), entry)); 
        userEntries.forEach(entry => combinedDataMap.set(entry.word.toLowerCase(), entry)); 

        return Array.from(combinedDataMap.values());
    }

    let copyFeedbackTimeout;
    function showCopyFeedback(message, targetElement) {
        const existingFeedback = targetElement.querySelector('.contextual-copy-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }

        const feedbackSpan = document.createElement('span');
        feedbackSpan.classList.add('contextual-copy-feedback');
        feedbackSpan.textContent = message;
        
        targetElement.appendChild(feedbackSpan);

        setTimeout(() => {
            feedbackSpan.classList.add('show');
        }, 10); 

        clearTimeout(copyFeedbackTimeout);
        copyFeedbackTimeout = setTimeout(() => {
            feedbackSpan.classList.remove('show');
            feedbackSpan.addEventListener('transitionend', () => feedbackSpan.remove(), { once: true });
        }, 1500); 
    }

    let debounceTimer;
    // Fungsi debounce untuk membatasi frekuensi pemanggilan fungsi
    function debounce(func, delay) {
        return function(...args) {
            const context = this;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    }

    // Event listener utama untuk re-rendering
    function handleThesaurusSearchInput() {
        thesaurusData = parseThesaurusData(rawThesaurusData); 
        renderThesaurusList(thesaurusSearchInput.value);
    }

    // Event listener untuk tombol hapus pencarian
    function handleClearSearchClick() {
        thesaurusSearchInput.value = '';
        thesaurusData = parseThesaurusData(rawThesaurusData); 
        renderThesaurusList('');
        thesaurusSearchInput.focus(); 
    }

    function renderThesaurusList(filterText = '') {
        thesaurusListContainer.innerHTML = ''; 
        noResultsMessage.style.display = 'none';

        const lowerCaseFilter = filterText.toLowerCase();

        const currentThesaurusData = Array.from(thesaurusData); 
        currentThesaurusData.sort((a, b) => a.word.localeCompare(b.word));

        const filteredData = currentThesaurusData.filter(entry => {
            return (
                entry.word.toLowerCase().includes(lowerCaseFilter) ||
                entry.synonyms.some(s => s.toLowerCase().includes(lowerCaseFilter)) ||
                entry.antonyms.some(a => a.toLowerCase().includes(lowerCaseFilter))
            );
        });

        if (filteredData.length === 0 && filterText.trim() !== '') {
            noResultsMessage.style.display = 'block';
            return;
        } else if (filteredData.length === 0 && filterText.trim() === '') {
            thesaurusListContainer.innerHTML = '<p class="empty-state">Tidak ada data thesaurus yang tersedia.</p>';
            return;
        }

        const fragment = document.createDocumentFragment();

        filteredData.forEach((entry) => { 
            const highlightText = (text, filter) => {
                if (!filter) return text;
                const regex = new RegExp(`(${filter})`, 'gi');
                return text.replace(regex, '<span class="highlight">$&</span>');
            };

            const highlightedWord = highlightText(entry.word, lowerCaseFilter);

            const createInteractiveTags = (words, filter, mainWord, type, isParentCustom) => {
                if (!words || words.length === 0) return ''; 
                return words.map(word => {
                    const uniqueTagId = `${mainWord}-${type}-${word}`.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');

                    return `<span class="word-tag ${isParentCustom ? 'custom-tag' : ''}" 
                                data-word="${word}" 
                                data-main-word="${mainWord}" 
                                data-type="${type}" 
                                data-original-term="${word}" 
                                id="tag-${uniqueTagId}" 
                                >
                                ${highlightText(word, filter)}
                                ${isParentCustom ? `
                                    <span class="tag-actions">
                                        <i class="fas fa-edit edit-inline-tag" title="Edit Tag" aria-label="Edit Tag"></i>
                                        <i class="fas fa-trash-alt delete-inline-tag" title="Hapus Tag" aria-label="Hapus Tag"></i>
                                    </span>
                                ` : ''}
                            </span>`;
                }).join(''); 
            };

            const sanitizedWordForId = entry.word.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');

            const synonymTags = createInteractiveTags(entry.synonyms, lowerCaseFilter, entry.word, 'synonyms', entry.isCustom);
            const antonymTags = createInteractiveTags(entry.antonyms, lowerCaseFilter, entry.word, 'antonyms', entry.isCustom);

            const listItem = document.createElement('div');
            listItem.classList.add('thesaurus-item');
            if (entry.isCustom) {
                listItem.classList.add('custom-entry'); 
            }

            listItem.innerHTML = `
                <div class="main-word-row">
                    <span class="word-number"></span>
                    <span class="main-word">${highlightedWord}</span>
                    ${entry.isCustom ? `
                        <div class="custom-actions">
                            <button class="edit-main-word-btn" data-word="${entry.word}" title="Edit Kata Utama Kustom" aria-label="Edit Kata Utama Kustom"><i class="fas fa-edit"></i></button>
                            <button class="delete-main-word-btn" data-word="${entry.word}" title="Hapus Kata Utama Kustom" aria-label="Hapus Kata Utama Kustom"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    ` : ''}
                </div>
                <div class="word-details">
                    <div class="detail-group">
                        <div class="detail-label clickable-dropdown" data-target="synonym-content-${sanitizedWordForId}" aria-label="Lihat Sinonim untuk ${entry.word}">
                            Sinonim <i class="fas fa-chevron-down dropdown-arrow"></i>
                        </div>
                        <div id="synonym-content-${sanitizedWordForId}" class="detail-content" data-main-word="${entry.word}" data-type="synonyms">
                            <div class="tag-container">${synonymTags}</div>
                            <button class="add-inline-term-btn" data-type="synonyms" data-main-word="${entry.word}" title="Tambah Sinonim" aria-label="Tambah Sinonim"><i class="fas fa-plus"></i> Tambah</button>
                            <button class="copy-button" data-copy-text="${entry.synonyms.join(', ')}" aria-label="Salin Sinonim"><i class="fas fa-copy"></i></button>
                        </div>
                    </div>
                    <div class="detail-group">
                        <div class="detail-label clickable-dropdown" data-target="antonym-content-${sanitizedWordForId}" aria-label="Lihat Antonim untuk ${entry.word}">
                            Antonim <i class="fas fa-chevron-down dropdown-arrow"></i>
                        </div>
                        <div id="antonym-content-${sanitizedWordForId}" class="detail-content" data-main-word="${entry.word}" data-type="antonyms">
                            <div class="tag-container">${antonymTags}</div>
                            <button class="add-inline-term-btn" data-type="antonyms" data-main-word="${entry.word}" title="Tambah Antonim" aria-label="Tambah Antonim"><i class="fas fa-plus"></i> Tambah</button>
                            <button class="copy-button" data-copy-text="${entry.antonyms.join(', ')}" aria-label="Salin Antonim"><i class="fas fa-copy"></i></button>
                        </div>
                    </div>
                </div>
            `;
            fragment.appendChild(listItem); 
        });

        thesaurusListContainer.appendChild(fragment); 

        document.querySelectorAll('.clickable-dropdown').forEach(dropdown => {
            dropdown.removeEventListener('click', handleDropdownClick);
            dropdown.addEventListener('click', handleDropdownClick);
        });

        document.querySelectorAll('.copy-button').forEach(button => {
            button.removeEventListener('click', handleCopyClick);
            button.addEventListener('click', handleCopyClick);
        });

        document.querySelectorAll('.add-inline-term-btn').forEach(button => {
            button.removeEventListener('click', handleAddInlineTerm);
            button.addEventListener('click', handleAddInlineTerm);
        });

        document.querySelectorAll('.edit-inline-tag').forEach(button => {
            button.removeEventListener('click', handleEditInlineTag);
            button.addEventListener('click', handleEditInlineTag);
        });

        document.querySelectorAll('.delete-inline-tag').forEach(button => {
            button.removeEventListener('click', handleDeleteInlineTag);
            button.addEventListener('click', handleDeleteInlineTag);
        });

        document.querySelectorAll('.edit-main-word-btn').forEach(button => {
            button.removeEventListener('click', handleEditMainWord);
            button.addEventListener('click', handleEditMainWord);
        });

        document.querySelectorAll('.delete-main-word-btn').forEach(button => {
            button.removeEventListener('click', handleDeleteMainWord);
            button.addEventListener('click', handleDeleteMainWord);
        });

        if (!thesaurusListContainer.hasAttribute('data-word-tag-listener')) {
            thesaurusListContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('word-tag') && !e.target.closest('.tag-actions')) { 
                    const word = e.target.getAttribute('data-word');
                    if (word) {
                        thesaurusSearchInput.value = word;
                        thesaurusSearchInput.focus(); 
                        renderThesaurusList(word);
                    }
                }
            });
            thesaurusListContainer.setAttribute('data-word-tag-listener', 'true');
        }

        if (thesaurusSearchInput && clearThesaurusSearchBtn) {
            thesaurusSearchInput.removeEventListener('input', debouncedSearchInputHandler);
            clearThesaurusSearchBtn.removeEventListener('click', handleClearSearchClick);
            
            thesaurusSearchInput.addEventListener('input', debouncedSearchInputHandler);
            clearThesaurusSearchBtn.addEventListener('click', handleClearSearchClick);
            
            if (thesaurusSearchInput.value.trim() !== '') {
                clearThesaurusSearchBtn.style.display = 'block';
            } else {
                clearThesaurusSearchBtn.style.display = 'none';
            }
        }
        
        if (addNewWordBtn) {
            addNewWordBtn.removeEventListener('click', handleAddNewWordClick);
            addNewWordBtn.addEventListener('click', handleAddNewWordClick);
        }
        if (closeModalBtn) {
            closeModalBtn.removeEventListener('click', handleCloseModalClick);
            closeModalBtn.addEventListener('click', handleCloseModalClick);
        }
        if (wordEntryForm) {
            wordEntryForm.removeEventListener('submit', handleWordEntryFormSubmit);
            wordEntryForm.addEventListener('submit', handleWordEntryFormSubmit);
        }
        if (!window.hasModalClickListener) { 
            window.addEventListener('click', (event) => {
                const modalElement = document.getElementById('word-form-modal');
                const overlayElement = document.getElementById('overlay');
                if (modalElement && overlayElement && (event.target == modalElement || event.target == overlayElement)) {
                    modalElement.style.display = 'none';
                    overlayElement.style.display = 'none';
                }
            });
            window.hasModalClickListener = true;
        }
    }

    const debouncedSearchInputHandler = debounce(handleThesaurusSearchInput, 300);

    function handleDropdownClick() { 
        const targetId = this.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        const arrowIcon = this.querySelector('.dropdown-arrow');
        const parentItem = this.closest('.thesaurus-item');

        if (targetContent) {
            const isExpanded = targetContent.classList.toggle('expanded');
            arrowIcon.classList.toggle('active');
            if (parentItem) {
                parentItem.classList.toggle('active-item', isExpanded);
            }
        }
    }
    function handleCopyClick(e) { 
        e.stopPropagation(); 
        const textToCopy = this.getAttribute('data-copy-text');
        try {
            navigator.clipboard.writeText(textToCopy);
            showCopyFeedback('Disalin!', this); 
        } catch (err) {
            console.error('Gagal menyalin: ', err);
            showCopyFeedback('Gagal menyalin!', this);
        }
    }
    function handleAddInlineTerm(e) { 
        console.log("Add Inline Term button clicked!"); 
        const addBtn = e.target;
        const detailContent = addBtn.closest('.detail-content');
        if (!detailContent) {
            console.error("detailContent not found for addInlineTermBtn"); 
            return;
        }

        const mainWord = detailContent.dataset.mainWord;
        const type = detailContent.dataset.type; 

        addBtn.style.display = 'none'; 
        const copyBtn = detailContent.querySelector('.copy-button');
        if(copyBtn) copyBtn.style.display = 'none'; 

        const inputContainer = document.createElement('span');
        inputContainer.classList.add('inline-add-container');
        inputContainer.innerHTML = `
            <input type="text" class="inline-add-input" placeholder="Kata baru (koma untuk banyak)">
            <button class="save-inline-add-btn" data-main-word="${mainWord}" data-type="${type}" aria-label="Simpan Kata Baru"><i class="fas fa-check"></i></button>
            <button class="cancel-inline-add-btn" aria-label="Batal Tambah"><i class="fas fa-times"></i></button>
        `;
        const tagContainer = detailContent.querySelector('.tag-container');
        if(tagContainer) {
            tagContainer.parentNode.insertBefore(inputContainer, tagContainer.nextSibling);
        } else {
            detailContent.insertBefore(inputContainer, copyBtn);
        }
        
        const inputField = inputContainer.querySelector('.inline-add-input');
        inputField.focus();

        inputContainer.querySelector('.save-inline-add-btn').addEventListener('click', () => {
            const newTermsString = inputField.value.trim();
            if (newTermsString) {
                const newTerms = newTermsString.split(',').map(s => s.trim()).filter(s => s !== '');
                
                const currentEntry = thesaurusData.find(e => e.word.toLowerCase() === mainWord.toLowerCase());
                const existingTerms = currentEntry ? currentEntry[type].map(s => s.toLowerCase()) : [];
                const termsToAdd = newTerms.filter(term => !existingTerms.includes(term.toLowerCase()));
                
                if (termsToAdd.length > 0) {
                    addTermToEntry(mainWord, type, termsToAdd);
                } else if (newTerms.length > 0) {
                         alert("Kata-kata yang Anda coba tambahkan sudah ada.");
                         inputField.focus();
                         return;
                    }
                }
            thesaurusData = parseThesaurusData(rawThesaurusData);
            renderThesaurusList(thesaurusSearchInput.value);
        });

        inputContainer.querySelector('.cancel-inline-add-btn').addEventListener('click', () => {
            thesaurusData = parseThesaurusData(rawThesaurusData); 
            renderThesaurusList(thesaurusSearchInput.value);
        });

        inputField.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                inputContainer.querySelector('.save-inline-add-btn').click();
            }
        });
    }
    function handleEditInlineTag(e) { 
        console.log("Edit Inline Tag button clicked!"); 
        const tagSpan = e.target.closest('.word-tag');
        if (!tagSpan) {
            console.error("tagSpan not found for editInlineTag"); 
            return;
        }

        const mainWord = tagSpan.dataset.mainWord; // Corrected to camelCase
        const type = tagSpan.dataset.type; 
        const originalTerm = tagSpan.dataset.originalTerm; // Corrected to camelCase
        const tagContainer = tagSpan.parentNode;
        
        tagSpan.style.display = 'none';

        const inputContainer = document.createElement('span');
        inputContainer.classList.add('inline-edit-container');
        inputContainer.innerHTML = `
            <input type="text" class="inline-edit-input" value="${originalTerm}">
            <button class="save-inline-edit-term-btn" data-main-word="${mainWord}" data-type="${type}" data-original-term="${originalTerm}" aria-label="Simpan Editan"><i class="fas fa-check"></i></button>
            <button class="cancel-inline-edit-term-btn" aria-label="Batal Edit"><i class="fas fa-times"></i></button>
        `;
        tagContainer.parentNode.insertBefore(inputContainer, tagContainer.nextSibling);

        const inputField = inputContainer.querySelector('.inline-edit-input');
        inputField.focus();

        inputContainer.querySelector('.save-inline-edit-term-btn').addEventListener('click', () => {
            const newTerm = inputField.value.trim();
            if (newTerm && newTerm.toLowerCase() !== originalTerm.toLowerCase()) {
                 const currentEntry = thesaurusData.find(e => e.word.toLowerCase() === mainWord.toLowerCase());
                 if (currentEntry && currentEntry[type].map(s => s.toLowerCase()).includes(newTerm.toLowerCase())) {
                    alert(`"${newTerm}" sudah ada dalam daftar ini.`);
                    inputField.focus();
                    return;
                 }
                updateTermInEntry(mainWord, type, originalTerm, newTerm);
            }
            thesaurusData = parseThesaurusData(rawThesaurusData);
            renderThesaurusList(thesaurusSearchInput.value);
        });

        inputContainer.querySelector('.cancel-inline-edit-term-btn').addEventListener('click', () => {
            thesaurusData = parseThesaurusData(rawThesaurusData); 
            renderThesaurusList(thesaurusSearchInput.value);
        });

        inputField.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                inputContainer.querySelector('.save-inline-edit-term-btn').click();
            }
        });
    }
    function handleDeleteInlineTag(e) { 
        console.log("Delete Inline Tag button clicked!"); 
        const tagSpan = e.target.closest('.word-tag');
        if (!tagSpan) {
            console.error("tagSpan not found for deleteInlineTag"); 
            return;
        }

        const mainWord = tagSpan.dataset.mainWord; // Corrected to camelCase
        const type = tagSpan.dataset.type;
        const termToDelete = tagSpan.dataset.originalTerm; // Corrected to camelCase

        if (confirm(`Anda yakin ingin menghapus tag "${termToDelete}"?`)) {
            deleteTermFromEntry(mainWord, type, termToDelete);
            thesaurusData = parseThesaurusData(rawThesaurusData);
            renderThesaurusList(thesaurusSearchInput.value);
        }
    }
    function handleEditMainWord() { 
        console.log("Edit Main Word button clicked!"); 
        const wordToEdit = this.dataset.word;
        const userEntries = loadUserThesaurusData();
        const entry = userEntries.find(e => e.word.toLowerCase() === wordToEdit.toLowerCase());

        if (entry) {
            modalTitle.textContent = 'Edit Kata Tesaurus'; // Pergantian nama
            mainWordInput.value = entry.word;
            mainWordInput.readOnly = true; 
            synonymsInput.value = entry.synonyms.join(', ');
            antonymsInput.value = entry.antonyms.join(', ');
            originalMainWordForEdit.value = entry.word; 

            wordFormModal.style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
        }
    }
    function handleDeleteMainWord() { 
        console.log("Delete Main Word button clicked!"); 
        const wordToDelete = this.dataset.word;

        if (confirm(`Anda yakin ingin menghapus kata kustom "${wordToDelete}" dan semua sinonim/antonimnya?`)) {
            deleteUserThesaurusEntry(wordToDelete);
            thesaurusData = parseThesaurusData(rawThesaurusData);
            renderThesaurusList(thesaurusSearchInput.value);
        }
    }
    function handleAddNewWordClick() { 
        console.log("Add New Word button clicked!"); 
        modalTitle.textContent = 'Tambah Kata Tesaurus Baru'; // Pergantian nama
        wordEntryForm.reset(); 
        mainWordInput.readOnly = false; 
        originalMainWordForEdit.value = ''; 
        wordFormModal.style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    }
    function handleCloseModalClick() { 
        console.log("Close Modal button clicked!"); 
        wordFormModal.style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }
    function handleWordEntryFormSubmit(e) { 
        console.log("Word Entry Form submitted!"); 
        e.preventDefault();

        const newWord = mainWordInput.value.trim();
        const newSynonyms = synonymsInput.value.split(',').map(s => s.trim()).filter(s => s !== '');
        const newAntonyms = antonymsInput.value.split(',').map(a => a.trim()).filter(a => a !== '');

        if (!newWord) {
            alert('Kata Utama tidak boleh kosong!');
            return;
        }

        const entry = {
            word: newWord,
            synonyms: newSynonyms,
            antonyms: newAntonyms
        };

        const originalWordForEditVal = originalMainWordForEdit.value;
        if (originalWordForEditVal !== '') {
            updateUserThesaurusEntry(originalWordForEditVal, entry);
        } else {
            const existingWords = thesaurusData.map(e => e.word.toLowerCase()); 
            if (existingWords.includes(newWord.toLowerCase())) {
                alert(`Kata "${newWord}" sudah ada dalam Tesaurus.`); // Pergantian nama
                return;
            }
            addUserThesaurusEntry(entry);
        }
        
        thesaurusData = parseThesaurusData(rawThesaurusData); 
        renderThesaurusList(thesaurusSearchInput ? thesaurusSearchInput.value : ''); 
        wordFormModal.style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }

    // Inisialisasi utama
    thesaurusData = parseThesaurusData(rawThesaurusData); 
    renderThesaurusList(thesaurusSearchInput ? thesaurusSearchInput.value : '');
});