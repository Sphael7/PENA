// dictionary.js - Centralized Thesaurus Data

/**
 * Raw thesaurus data. Each line represents a main word with its synonyms and antonyms.
 * Format: MainWord: Synonym1, Synonym2, ... - Antonym1, Antonym2, ...
 * If no antonyms, leave the part after '-' empty or omit the '-'
 */
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
Kala: waktu, saat, ketika, masa, periode, detik, momen - kekekalan, keabadian, selamanya, tak terbatas
Mentari: matahari, surya, sang surya, cahaya pagi, pelita langit, sinar mentari, siang - malam, kegelapan, rembulan, senja, bayang-bayang
Menyapa: memberi salam, menyambut, menyentuh, menyongsong, menjumpai, menegur, menyambangi - mengabaikan, menjauh, menolak, membelakangi, memalingkan
Pagi: fajar, dini hari, subuh, awal hari, permulaan, pagi buta, mentari terbit - malam, petang, sore, senja, akhir hari, dini malam
Embun: titik air, butiran air, tetesan pagi, kabut pagi, kelembaban udara, embun pagi, uap air - kekeringan, panas, gersang, kemarau, tandus
Menari: bergerak lincah, melayang, mengalun, berlenggok, meliuk, meliuk-liuk, bergoyang - diam, membeku, kaku, berhenti, terpaku
Ujung: akhir, puncak, tepi, sisi, batas, pinggir, penghujung - awal, tengah, dasar, pusat, inti, permulaan
Jari: ruas tangan, jemari, telunjuk, tangan kecil, ujung tangan, jari jemari - (tidak relevan untuk antonim langsung karena bagian tubuh)
Langit: cakrawala, angkasa, samudra udara, ufuk, mega, udara luas, semesta atas - bumi, tanah, daratan, dunia bawah, permukaan
Biru: nila, laut, langit cerah, biru langit, indigo, safir, toska - merah, kuning, jingga, hitam, abu-abu
Saksi: pengamat, penonton, penyaksi, pelihat, bukti, penguji, pelacak - pelaku, tersangka, yang disembunyikan, anonim, rahasia
Bisu: diam, membisu, tanpa suara, sunyi, senyap, tak bersuara, sepi - ramai, nyaring, bersuara, lantang, bising, ribut
Janji: ikrar, sumpah, tekad, komitmen, nazar, akad, pernyataan - pengingkaran, pembatalan, pelanggaran, kebohongan, pengkhianatan
Layu: layu, lemas, lemah, redup, pudar, luntur, lusuh - segar, mekar, hidup, tumbuh, cerah, bersinar
Langkah: jejak, tapak, gerakan, tindakan, pergerakan, ayunan kaki, langkah kaki - berhenti, mundur, diam, diam diri, henti
Kecil: mungil, mini, sempit, ringkas, pendek, ringan, sederhana - besar, luas, tinggi, panjang, lebar, megah
Menapaki: melangkahi, melewati, menginjak, menyusuri, mengarungi, menelusuri - meninggalkan, menghindari, menjauhi, menyimpang
Jejak: bekas, tapak, langkah, bayangan, warisan, lintasan, cetakan - kehampaan, jejak hilang, kekosongan, penghapusan
Mengukir: membentuk, mencetak, menoreh, menggurat, melukis, menyusun - menghapus, menghilangkan, menghancurkan, merusak, melunturkan
Mimpi: harapan, angan, cita-cita, bayangan, khayalan, impian, niat - kenyataan, realita, fakta, dunia nyata, kepastian
Terelak: terhindar, tercegah, terelakkan, terhindari, terselamatkan, tidak terjadi - pasti terjadi, tak terhindarkan, tak bisa dicegah, niscaya
Dunia: alam, jagat, bumi, eksistensi, realita, semesta - akhirat, surga, nirwana, imajinasi, khayalan
Fana: sementara, tidak kekal, rapuh, sesaat, cepat lenyap, bisa mati - abadi, kekal, lestari, selamanya, tak hancur
Abadi: kekal, lestari, selamanya, terus-menerus, tidak berubah, langgeng - fana, hancur, musnah, berakhir, punah
Kisah: cerita, dongeng, narasi, riwayat, legenda, hikayat, peristiwa - kenyataan, fakta, realita, dunia nyata
Terukir: tercatat, terukirkan, tergambar, tertoreh, terekam, terpahat - terhapus, terabaikan, terhapuskan, lenyap, dilupakan
Selamanya: abadi, selama-lamanya, kekal, tak berakhir, terus-menerus, tak berujung - sementara, sesaat, fana, sebentar, singkat
Heningnya: sepinya, senyap, tenang, sunyi, diam, membisu, lengang - ramai, bising, gaduh, ribut, hiruk-pikuk
Bisiknya: lirih, pelan, suara kecil, gumaman, desir, desauan - teriakan, jeritan, lantang, nyaring, keras
Angin: hembusan, udara, bayu, semilir, arus udara, angin semilir - kehampaan udara, vakum, ruang hampa
Melodi: irama, nada, lagu, musik, nyanyian, denting, harmonisasi - kebisingan, gangguan suara, hiruk pikuk, suara kacau
Terganti: tergantikan, tersubstitusi, tertukar, terlupakan, tergantikan tempatnya - tetap, lestari, abadi, tak tergantikan, tak tergeser
Menyimpan: menyelamatkan, mengabadikan, menaruh, menanamkan, mengekalkan, menyimpan dalam - membuang, menghapus, melupakan, melepaskan, mengabaikan
Kenangan: ingatan, memori, nostalgia, peristiwa, pengalaman, masa lalu - kelupaan, kekosongan, ketidakpedulian, penghapusan
Terpatri: terpahat, terukir, melekat, tertanam, tergurat, tersemat - terhapus, luntur, menghilang, tercabut
Hati: nurani, kalbu, jiwa, sanubari, batin, relung - kebekuan, ketegaan, kekosongan batin, pikiran (kontras dalam konteks)
Mati: wafat, gugur, berhenti, sirna, padam, lenyap, berakhir - hidup, abadi, tumbuh, berkembang, bernyawa
`;

/**
 * Parses raw thesaurus data into a structured map.
 * @param {string} rawData - The raw string data containing words, synonyms, and antonyms.
 * @returns {Object.<string, {sinonim: string[], antonim: string[]}>} A map where keys are lowercase words
 * and values are objects containing synonym and antonym arrays.
 */
export function parseThesaurusData(rawData) {
    const parsedMap = {}; // Will return an object/map
    const lines = rawData.split('\n').filter(line => line.trim() !== '');

    lines.forEach(line => {
        const parts = line.split(':');
        if (parts.length < 2) {
            console.warn("Skipping malformed thesaurus entry:", line);
            return;
        }

        const wordPart = parts[0].trim();
        let relatedPart = parts[1].trim();

        const subParts = relatedPart.split(' - ');
        let synonymsPart = subParts[0] ? subParts[0].trim() : '';
        let antonymsPart = subParts[1] ? subParts[1].trim() : '';

        // Handle "tidak relevan" or similar explicit exclusions by making them empty arrays
        if (synonymsPart.includes('(tidak relevan')) {
            synonymsPart = '';
        }
        if (antonymsPart.includes('(tidak relevan')) {
            antonymsPart = '';
        }

        parsedMap[wordPart.toLowerCase()] = { // Store in lowercase for lookup
            sinonim: synonymsPart ? synonymsPart.split(',').map(s => s.trim()) : [],
            antonim: antonymsPart ? antonymsPart.split(',').map(s => s.trim()) : []
        };
    });
    return parsedMap;
}

// Export the parsed thesaurus data map
export const thesaurusDataMap = parseThesaurusData(rawThesaurusData);
