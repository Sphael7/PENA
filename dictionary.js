// dictionary.js - Centralized Thesaurus Data
// Fix: Mengimplementasikan caching dengan localStorage untuk meningkatkan performa.

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
Terukir: tercatat, terukirkan, tergambar, tertoreh, terekam, terpahat - terhapus, luntur, menghilang, tercabut
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
Awan: Mega, Mendung, Kabut, Gumpalan, Awan tebal, Langit kelabu - Langit cerah, Langit biru, Cerah, Bening
Batu: Karang, Kerikil, Padas, Benda keras, Mineral padat, Gugusan batu - Tanah, Pasir, Air, Udara, Lumpur
Air: Tirta, Banyu, Carian, Hidrogen dioksida, Hujan, Embun - Tanah, Kering, Udara, Api, Debu
Angin: Bayu, Hembusan, Pusaran, Semilir, Badai, Topan, Udara bergerak - Diam, Tenang, Hampa, Panas, Vakum
Api: Bara, Jilatan, Kobaran, Pembakaran, Panas, Sulutan - Dingin, Air, Beku, Padam, Mati
Pohon: Kayu, Ranting, Daun, Tumbuhan besar, Vegetasi, Belukar - Tanah, Rumput, Semak, Udara, Batu
Bunga: Kuntum, Kelopak, Sari, Kembang, Mekar, Aroma - Layu, Kering, Rontok, Gugur, Busuk
Rumah: Kediaman, Hunian, Papan, Tempat tinggal, Sarang, Bangunan - Jalan, Luar, Tanah, Hutan, Lapangan
Pintu: Gerbang, Pintu, Akses masuk, Jalan keluar, Pintu kayu, Pembatas - Tembok, Dinding, Jendela, Ruangan, Kunci
Kaca: Cermin, Jendela, Kaca, Transparan, Kaca bening, Penyekat - Kayu, Besi, Dinding, Tembok, Batu
Bulan: Purnama, Rembulan, Satelit alami, Cakrawala malam, Bulan sabit - Matahari, Bintang, Siang, Cerah, Terang
Bintang: Asteroid, Komet, Meteor, Benda langit, Galaksi, Gugus - Bulan, Matahari, Awan, Langit, Bumi
Baju: Pakaian, Busana, Kain, Seragam, Kostum, Mantel - Telanjang, Bugil, Kulit, Tubuh, Raga
Kaki: Telapak, Tumit, Jari kaki, Gerakan, Berdiri, Tumpuan - Tangan, Lengan, Punggung, Bahu, Dada
Mata: Indera penglihatan, Pandangan, Penglihatan, Retina, Lensa mata - Buta, Gelap, Tuli, Bisnis, Pendengaran
Hidung: Indera penciuman, Penciuman, Nafas, Lubang hidung, Aliran udara - Mulut, Telinga, Mata, Kulit, Lidah
Tangan: Jemari, Lengan, Genggaman, Aksi, Bantuan, Sisi tangan - Kaki, Lutut, Bahu, Punggung, Dada
Otak: Pikiran, Akal, Cerdas, Memori, Ingatan, Kecerdasan - Bodoh, Dungu, Tolol, Bego, Pikun
Buku: Bacaan, Tulisan, Halaman, Cerita, Ilmu, Naskah - Tulisan, Dinding, Suara, Nyanyian, Gambar
Pena: Pulpen, Tinta, Alat tulis, Pena tulis, Pena gambar, Kaligrafi - Penghapus, Kertas, Spidol, Pensil, Tinta
Meja: Meja kerja, Meja makan, Furnitur, Barang, Bangku, Kursi - Lantai, Karpet, Dinding, Jendela, Pintu
Kursi: Bangku, Duduk, Tempat duduk, Dudukan, Kursi roda, Sisi - Meja, Lantai, Karpet, Dinding, Jendela
Kucing: Binatang, Hewan peliharaan, Binatang buas, Kucing rumahan, kucing liar - Anjing, Burung, Ikan, Tikus, Ular
Anjing: Peliharaan, Satwa, Hewan, Binatang, Anjing rumahan, anjing liar - Kucing, Burung, Ikan, Tikus, Ular
Ikan: Binatang air, Ikan, Laut, Air, Air tawar, Hidup air - Binatang darat, Burung, Kucing, Anjing, Ular
Burung: Unggas, Ayam, Burung terbang, Binatang udara, Hewan peliharaan - Ikan, Kucing, Anjing, Sapi, Kambing
Sapi: Hewan ternak, Lembu, Binatang peliharaan, Ternak, Mamalia, Daging - Kucing, Anjing, Ayam, Ikan, Burung
Ayam: Unggas, Ayam potong, Ayam broiler, Ternak, Binatang, Burung - Kucing, Anjing, Sapi, Ikan, Tikus
Tikus: Hewan pengerat, Hama, Tikus, Binatang pengerat, Binatang kecil - Kucing, Anjing, Burung, Sapi, Ayam
Ular: Reptil, Binatang melata, Ular, Binatang berbisa, Ular sawah, Ular air - Burung, Ayam, Sapi, Ikan, Anjing
Dampak: Pengaruh, akibat, hasil, konsekuensi - Sebab, asal, pemicu, sumber
Solusi: Jalan keluar, pemecahan, jawaban, penyelesaian - Masalah, kendala, hambatan, rintangan
Kreatif: Inovatif, orisinal, inventif, imajinatif - Biasa, konvensional, monoton, kaku
Fleksibel: Lentur, elastis, luwes, adaptif - Kaku, tegang, tetap, permanen
Dinamis: Aktif, energik, bergerak, progresif - Statis, pasif, diam, tetap
Optimal: Terbaik, maksimal, ideal, sempurna - Minimal, terburuk, kurang, tidak layak
Sinergi: Kerjasama, kolaborasi, gabungan, paduan - Perselisihan, konflik, perpecahan, pertentangan
Inspirasi: Ilham, ide, gagasan, bisikan - Kehampaan, kejemuan, kebosanan, kemandekan
Visi: Tujuan, impian, pandangan, cita-cita - Kebutaan, ketidakmampuan, kepasrahan, tanpa arah
Dedikasi: Pengabdian, loyalitas, kesetiaan, curahan hati - Pengkhianatan, ketidaksetiaan, kepura-puraan, acuh tak acuh
Kompeten: Mampu, cakap, terampil, berkualitas - Tidak mampu, tidak cakap, tidak terampil, kurang
Inovasi: Pembaharuan, terobosan, gagasan baru, kreativitas - Stagnasi, kemandekan, tradisional, kebiasaan lama
Resiliensi: Ketahanan, daya lenting, kemampuan pulih, ketabahan - Kelemahan, kerentanan, kerapuhan, keputusasaan
Harmonis: Selaras, serasi, rukun, damai - Disharmoni, konflik, bertentangan, tidak rukun
Konsisten: Stabil, teguh, tetap, berkesinambungan - Tidak konsisten, berubah-ubah, plin-plan, tidak tetap
Fokus: Pusat, sentral, konsentrasi, perhatian - Tersebar, buyar, tidak terpusat, cerai-berai
Ambisi: Cita-cita, aspirasi, hasrat, tujuan - Kerelaan, kepasrahan, ketidakpedulian, apatis
Efisien: Berdaya guna, hemat, efektif, terarah - Boros, mubazir, tidak efisien, sia-sia
Signifikan: Penting, bermakna, berarti, esensial - Tidak penting, sepele, remeh, tidak berarti
Proaktif: Bertindak lebih dulu, inisiatif, mengambil langkah - Reaktif, menunggu, pasif, diam
Optimis: Berharap, yakin, positif, penuh harap - Pesimis, putus asa, negatif, tanpa harapan
Intuitif: Naluri, insting, perasaan, firasat - Logis, rasional, terencana, terukur
Kolosal: Sangat besar, raksasa, megah, masif - Kecil, mungil, mini, kerdil
Akuntabel: Bertanggung jawab, dapat dipercaya, transparan, jujur - Tidak bertanggung jawab, tidak jujur, curang, tertutup
Deduktif: Umum ke khusus, logis, rasional, terperinci - Induktif, khusus ke umum, spekulatif, abstrak
Induktif: Khusus ke umum, spekulatif, abstrak, terbuka - Deduktif, umum ke khusus, logis, terperinci
Konvensional: Tradisional, biasa, umum, lumrah - Modern, baru, inovatif, tidak biasa
Esensi: Inti, hakikat, substansi, pokok - Tambahan, pelengkap, sisipan, aksesoris
Progresif: Maju, berkembang, meningkat, modern - Mundur, regresif, stagnan, terbelakang
Sinergis: Saling mendukung, kooperatif, gabungan, terpadu - Bertentangan, berlawanan, terpisah, mandiri
Eksplisit: Jelas, gamblang, tersurat, lugas - Implisit, tersirat, samar, tidak jelas
Implisit: Tersirat, samar, tersembunyi, tidak langsung - Eksplisit, jelas, gamblang, lugas
Valid: Sah, benar, akurat, sahih - Invalid, tidak sah, salah, tidak akurat
Autentik: Asli, tulen, orisinal, sejati - Palsu, tiruan, imitasi, bajakan
Koheren: Padu, terpadu, logis, konsisten - Tidak koheren, berantakan, tidak logis, kacau
Interaktif: Timbal balik, responsif, partisipatif, dialogis - Pasif, satu arah, non-interaktif, monologis
Ekspansif: Meluas, berkembang, menyebar, luas - Kontraktif, menyusut, terbatas, sempit
Apatis: Acuh tak acuh, tidak peduli, cuek, masa bodoh - Peduli, perhatian, antusias, semangat
Paradoks: Kontradiktif, berlawanan, aneh, ganjil - Normal, biasa, logis, konsisten
Toleran: Tenggang rasa, menghormati, menerima, sabar - Intoleran, fanatik, kaku, tidak menerima
Simultan: Serentak, bersamaan, serempak, berbarengan - Bertahap, berurutan, tidak bersamaan, terpisah
Klarifikasi: Penjelasan, pencerahan, perincian, penguraian - Kerancuan, ketidakjelasan, kebingungan, penutupan
Persuasif: Meyakinkan, membujuk, merayu, menggugah - Menolak, menentang, menampik, tidak menarik
Substansi: Isi, esensi, materi, inti - Bentuk, rupa, tampilan, kulit luar
Intens: Kuat, hebat, mendalam, gencar - Lemah, dangkal, biasa, tidak gencar
Konstruktif: Membangun, positif, memperbaiki, membina - Destruktif, merusak, negatif, menghancurkan
Destruktif: Merusak, menghancurkan, negatif, membinasakan - Konstruktif, membangun, positif, memperbaiki
Inherent: Melekat, hakiki, asasi, bawaan - Eksternal, tambahan, sementara, tidak melekat
Komprehensif: Menyeluruh, lengkap, terperinci, luas - Terbatas, parsial, tidak lengkap, sempit
Eksentrik: Aneh, ganjil, unik, nyentrik - Normal, biasa, umum, lumrah
Empati: Simpati, belas kasihan, kepedulian, kepekaan - Apatis, tidak peduli, masa bodoh, acuh tak acuh
Kolaboratif: Kerja sama, terpadu, gotong royong, terintegrasi - Mandiri, individual, terpisah, tidak bekerja sama
Kontemplasi: Perenungan, meditasi, pemikiran, refleksi - Tindakan, gerakan, pelaksanaan, aksi
Resiprokal: Timbal balik, saling, bergantian, berbalas - Searah, satu sisi, sepihak, unilateral
Integrasi: Penyatuan, penggabungan, penyelarasan, perpaduan - Disintegrasi, perpecahan, pemisahan, konflik
Paradigma: Pola pikir, kerangka berpikir, model, contoh - Kekacauan, anomali, tidak teratur, tanpa pola
Kompleks: Rumit, sulit, berbelit-belit, majemuk - Sederhana, mudah, simpel, polos
Konsekuen: Konsisten, taat asas, bertanggung jawab, teguh - Inkonsisten, plin-plan, tidak bertanggung jawab, berubah-ubah
Transparan: Terbuka, jelas, nyata, tembus pandang - Tertutup, rahasia, tersembunyi, buram
Narasi: Cerita, kisah, riwayat, tuturan - Fakta, kenyataan, data, informasi
Dukungan: Sokongan, bantuan, dorongan, topangan - Hambatan, rintangan, perlawanan, penolakan
Kecewa: Murung, sedih, pilu, hampa - Senang, gembira, puas, bahagia
Sukarela: Ikhlas, rela, tulus, tanpa paksaan - Terpaksa, dipaksa, tertekan, wajib
Canggih: Mutakhir, modern, rumit, kompleks - Kuno, sederhana, konvensional, usang
Inisiatif: Prakarsa, langkah awal, gagasan, terobosan - Kelambanan, apatis, pasif, menunggu
Eksklusif: Terbatas, istimewa, khusus, unik - Umum, biasa, terbuka, universal
Sistematis: Teratur, terstruktur, metodis, rapi - Acak, sembarangan, tidak teratur, berantakan
Kooperatif: Kerjasama, kolaborasi, gotong royong, bersatu - Individualis, egois, terpisah, mandiri
Fundamental: Dasar, mendasar, pokok, esensial - Tambahan, pelengkap, sekunder, tidak penting
Global: Universal, mendunia, internasional, luas - Lokal, domestik, regional, terbatas
Intervensi: Campur tangan, interupsi, ikut campur, percampuran - Non-intervensi, pengabaian, pembiaran, tidak terlibat
Konflik: Pertentangan, perselisihan, perkelahian, gesekan - Harmoni, perdamaian, kerukunan, keselarasan
Negosiasi: Perundingan, musyawarah, perembukan, diskusi - Penolakan, pemaksaan, ketidaksepakatan, konflik
Otentik: Asli, tulen, sahih, sejati - Palsu, tiruan, imitasi, rekayasa
Prevalensi: Kelaziman, frekuensi, dominasi, keberadaan - Kelangkaan, jarang, minim, ketidakberadaan
Taktis: Strategis, cerdik, terencana, hati-hati - Sembrono, spontan, ceroboh, tanpa rencana
Transformasi: Perubahan, peralihan, metamorfosis, konversi - Stagnasi, kemandekan, tidak berubah, tetap
Utilitarian: Fungsional, pragmatis, praktis, berguna - Estetis, idealis, teoritis, tidak berguna
Progresif: Maju, berkembang, modern, inovatif - Mundur, regresif, statis, kuno
Inklusif: Merangkul, menyeluruh, terbuka, mencakup semua - Eksklusif, terbatas, memisahkan, tidak terbuka
Konsensus: Kesepakatan, mufakat, persetujuan, kompromi - Pertentangan, perselisihan, ketidaksepakatan, oposisi
Mitigasi: Pengurangan, peredaan, pelemahan, penanggulangan - Peningkatan, perburukan, penguatan, pembiaran
Spekulatif: Subjektif, hipotesis, dugaan, perkiraan - Fakta, objektif, nyata, terukur
Kolonial: Penjajahan, imperialis, dominasi, pendudukan - Merdeka, independen, mandiri, berdaulat
Kultural: Budaya, adat istiadat, tradisi, kebiasaan - Alamiah, genetik, biologis, bawaan
Moral: Etika, akhlak, budi pekerti, susila - Amoral, tidak bermoral, bejat, asusila
Sekuler: Duniawi, non-religius, netral, tidak beragama - Religius, agamis, spiritual, ilahi
Revolusi: Perubahan besar, kudeta, pemberontakan, transformasi - Evolusi, perkembangan, kemajuan bertahap, konservasi
Evolusi: Perkembangan bertahap, kemajuan, pertumbuhan, proses - Revolusi, perubahan drastis, stagnasi, kemandekan
Konstitusi: Undang-undang dasar, peraturan, hukum, tata negara - Anarki, kekacauan, ketidakaturan, tanpa aturan
Birokrasi: Tata laksana, administrasi, biro, sistem - Fleksibilitas, efisiensi, keluwesan, ketidakformalan
Demokrasi: Kedaulatan rakyat, pemerintahan rakyat, perwakilan, kebebasan - Totalitarianisme, otokrasi, kediktatoran, tirani
Totaliter: Otoriter, absolut, diktator, tirani - Demokratis, liberal, bebas, berdaulat
Kapitalisme: Ekonomi pasar, liberalisme, persaingan bebas, individualisme - Sosialisme, komunisme, kolektivisme, ketergantungan negara
Sosialisme: Kolektivisme, komunisme, kesejahteraan sosial, kebersamaan - Kapitalisme, individualisme, liberalisme, pasar bebas
Monopoli: Dominasi tunggal, penguasaan, hegemoni, hak eksklusif - Persaingan, kompetisi, pasar terbuka, pluralisme
Oposisi: Perlawanan, pertentangan, oposan, kontra - Dukungan, koalisi, persetujuan, pro
Netral: Tidak memihak, seimbang, objektif, tidak terlibat - Berpihak, subjektif, memihak, partisan
Partisan: Berpihak, memihak, sepihak, berat sebelah - Netral, objektif, adil, tidak memihak
Ekspatriat: Orang asing, imigran, pendatang, migran - Warga negara, penduduk asli, pribumi, lokal
Diakronis: Berdasarkan waktu, kronologis, historis, berurutan - Sinkronis, sezaman, kontemporer, bersamaan
Sinkronis: Sezaman, kontemporer, bersamaan, simultan - Diakronis, historis, berurutan, kronologis
Intrinsik: Hakiki, bawaan, melekat, esensial - Ekstrinsik, tambahan, eksternal, dari luar
Ekstrinsik: Tambahan, dari luar, eksternal, bukan bawaan - Intrinsik, bawaan, melekat, hakiki
Konkret: Nyata, berwujud, spesifik, terperinci - Abstrak, imajiner, tidak berwujud, umum
Abstrak: Tidak berwujud, imajiner, konseptual, umum - Konkret, nyata, berwujud, spesifik
Konsepsi: Konsep, gagasan, ide, pemahaman - Realita, kenyataan, fakta, implementasi
Refleksi: Perenungan, introspeksi, cerminan, pemikiran - Kelalaian, tindakan, pengabaian, tanpa pikir
Skeptis: Ragu, curiga, tidak yakin, sinis - Percaya, yakin, optimis, naif
Dogma: Ajaran, doktrin, keyakinan, prinsip - Skeptisisme, keraguan, rasionalisme, pemikiran bebas
Rasional: Logis, masuk akal, beralasan, akal sehat - Irasional, tidak logis, tidak masuk akal, emosional
Empiris: Berdasarkan pengalaman, eksperimental, faktual, observasional - Teoritis, spekulatif, abstrak, konseptual
Teoritis: Konseptual, abstrak, spekulatif, hipotesis - Empiris, praktis, eksperimental, faktual
Pragmatis: Praktis, realistis, fungsional, terapan - Idealis, teoritis, utopis, imajinatif
Idealistis: Utopis, imajinatif, ideal, perfeksionis - Pragmatis, realistis, praktis, fungsional
Kompleksitas: Kerumitan, kesulitan, keruwetan, kompleks - Kesederhanaan, kemudahan, kepolosan, simpel
Sederhana: Gampang, mudah, polos, lugas - Kompleks, rumit, sulit, berbelit-belit
Obyektif: Adil, netral, berimbang, tidak memihak - Subjektif, bias, memihak, emosional
Subyektif: Bias, memihak, emosional, personal - Objektif, netral, adil, berimbang
Kuantitatif: Berjumlah, terukur, statistik, numerik - Kualitatif, deskriptif, naratif, non-numerik
Kualitatif: Deskriptif, naratif, non-numerik, informatif - Kuantitatif, terukur, statistik, numerik
Fundamental: Mendasar, pokok, esensial, inti - Tambahan, pelengkap, sekunder, periferal
Periferal: Tambahan, luar, pinggiran, sekunder - Fundamental, inti, pokok, esensial
Struktural: Terstruktur, terorganisir, hierarkis, sistematis - Non-struktural, informal, tidak terstruktur, acak
Hierarki: Peringkat, tingkatan, jenjang, urutan - Demokrasi, kesetaraan, tanpa jenjang, non-hierarki
Otonomi: Mandiri, swasembada, independen, kebebasan - Ketergantungan, subordinasi, penjajahan, dominasi
Subordinasi: Ketergantungan, bawahan, tunduk, di bawah perintah - Otonomi, independensi, kebebasan, dominasi
Legitimasi: Sah, valid, legalitas, pengesahan - Ilegal, tidak sah, tidak diakui, palsu
Ilegal: Tidak sah, melanggar hukum, haram, tidak legal - Legal, sah, resmi, halal
Prosedural: Tata cara, proses, urutan, mekanisme - Substansial, materi, isi, esensi
Substansial: Penting, mendasar, signifikan, inti - Prosedural, formalitas, tata cara, kulit luar
Kohesif: Terpadu, menyatu, erat, solid - Rapuh, terpisah, cerai-berai, tidak solid
Fragmentasi: Perpecahan, pemisahan, terbagi-bagi, cerai-berai - Integrasi, penyatuan, kohesi, kesatuan
Heterogen: Berbeda-beda, beragam, majemuk, multikultural - Homogen, seragam, sama, tunggal
Homogen: Seragam, sama, tunggal, sejenis - Heterogen, beragam, majemuk, multikultural
Sintesis: Gabungan, perpaduan, kombinasi, campuran - Analisis, pemisahan, penguraian, diferensiasi
Analisis: Penguraian, pemisahan, telaah, studi - Sintesis, perpaduan, gabungan, kombinasi
Sinergi: Kerjasama, kolaborasi, paduan, harmoni - Konflik, perpecahan, antagonisme, perselisihan
Antagonis: Berlawanan, bermusuhan, oposisi, kontra - Protagonis, pendukung, teman, pro
Siklus: Daur, putaran, periodik, berulang - Linear, lurus, satu arah, tidak berulang
Linear: Lurus, satu arah, searah, tidak berulang - Siklus, daur, putaran, periodik
Eksplisit: Jelas, gamblang, tersurat, lugas - Implisit, tersirat, tersembunyi, samar
Implisit: Tersirat, samar, tersembunyi, tidak langsung - Eksplisit, jelas, lugas, gamblang
Ekstensif: Luas, menyeluruh, lebar, terperinci - Intensif, terbatas, sempit, terpusat
Intensif: Terpusat, mendalam, fokus, sungguh-sungguh - Ekstensif, luas, menyeluruh, tersebar
Praktek: Implementasi, pelaksanaan, aplikasi, tindakan - Teori, konsep, gagasan, ide
Teori: Konsep, gagasan, ide, hipotesis - Praktek, implementasi, pelaksanaan, aplikasi
Konsekuen: Konsisten, logis, bertanggung jawab, teguh - Inkonsisten, plin-plan, tidak bertanggung jawab, berubah-ubah
Koheren: Terpadu, logis, konsisten, berkesinambungan - Tidak koheren, kacau, tidak logis, berantakan
Akumulasi: Penumpukan, pengumpulan, penimbunan, koleksi - Pengurangan, pengurangan, penyebaran, penghilangan
Divergen: Berbeda, menyebar, memisah, tidak sama - Konvergen, menyatu, berkumpul, sama
Konvergen: Menyatu, berkumpul, sama, mendekati - Divergen, menyebar, memisah, berbeda
Komplementer: Saling melengkapi, saling mengisi, menunjang, penunjang - Saling bertentangan, saling meniadakan, kontradiktif, berlawanan
Kontradiktif: Berlawanan, bertentangan, paradoks, tidak konsisten - Konsisten, koheren, sesuai, harmonis
Inovatif: Terobosan, pembaharuan, kreatif, inventif - Konvensional, tradisional, biasa, monoton
Sinergis: Saling mendukung, kolaboratif, terpadu, kooperatif - Mandiri, individual, terpisah, tidak berhubungan
Akselerasi: Percepatan, peningkatan kecepatan, laju, dorongan - Deselerasi, perlambatan, penurunan kecepatan, rem
Deselerasi: Perlambatan, penurunan kecepatan, pengereman, pengurangan - Akselerasi, percepatan, peningkatan kecepatan, dorongan
Spesifik: Khusus, terperinci, detail, tertentu - Umum, universal, global, tidak terperinci
Esensi: Inti, hakikat, substansi, pokok - Aksesoris, tambahan, pelengkap, tidak penting
Akomodatif: Fleksibel, luwes, adaptif, toleran - Kaku, tidak fleksibel, tidak toleran, keras kepala
Subordinat: Bawahan, di bawah, tergantung, diatur - Atasan, pemimpin, independen, otonom
Karakteristik: Ciri, sifat, atribut, tanda - Tidak ada, tanpa ciri, tidak khas, anonim
Normatif: Standar, baku, aturan, kaidah - Deskriptif, faktual, bebas, non-standar
Sistemik: Menyeluruh, sistematis, terintegrasi, struktural - Parsial, sebagian, terpisah, tidak menyeluruh
Integrasi: Penyatuan, perpaduan, penggabungan, penyelarasan - Disintegrasi, perpecahan, pemisahan, penceraian
Konsisten: Stabil, tetap, teguh, ajek - Inkonsisten, berubah-ubah, plin-plan, tidak stabil
Afirmatif: Menyetujui, mengiyakan, positif, mengukuhkan - Negatif, menolak, membantah, menyangkal
Negatif: Menolak, membantah, pesimis, pasif - Positif, afirmatif, optimis, aktif
Potensial: Mungkin, berpeluang, berpotensi, prospektif - Tidak berpotensi, mustahil, tidak mungkin, stagnan
Prospektif: Berpeluang, berpotensi, menjanjikan, potensial - Retrospektif, masa lalu, suram, tidak menjanjikan
Retrospektif: Masa lalu, menengok ke belakang, historis, kilas balik - Prospektif, masa depan, menjanjikan, potensial
Definisi: Pengertian, batasan, penjelasan, makna - Ketidakjelasan, ambiguitas, ketidakpastian, misteri
Interpretasi: Penafsiran, penjelasan, pemahaman, terjemahan - Kesalahpahaman, ketidakpahaman, penolakan, penafsiran literal
Toleransi: Tenggang rasa, menghormati, menerima, kesabaran - Intoleransi, fanatisme, diskriminasi, ketidaksetujuan
Independen: Mandiri, bebas, berdaulat, otonom - Bergantung, terikat, terjajah, terdominasi
Efisien: Berdaya guna, efektif, hemat, terarah - Boros, mubazir, tidak efektif, sia-sia
Esoterik: Rahasia, tersembunyi, mistik, khusus - Eksoterik, umum, terbuka, mudah dipahami
Eksoterik: Umum, terbuka, mudah dipahami, universal - Esoterik, rahasia, tersembunyi, mistik
`;

/**
 * Parses raw thesaurus data into a structured map.
 * @param {string} rawData - The raw string data containing words, synonyms, and antonyms.
 * @returns {Object.<string, {sinonim: string[], antonim: string[]}>} A map where keys are lowercase words
 * and values are objects containing synonym and antonym arrays.
 */
export function parseThesaurusData(rawData) {
    const parsedMap = {};
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

        if (synonymsPart.includes('(tidak relevan')) {
            synonymsPart = '';
        }
        if (antonymsPart.includes('(tidak relevan')) {
            antonymsPart = '';
        }

        parsedMap[wordPart.toLowerCase()] = {
            sinonim: synonymsPart ? synonymsPart.split(',').map(s => s.trim()) : [],
            antonim: antonymsPart ? antonymsPart.split(',').map(s => s.trim()) : []
        };
    });
    return parsedMap;
}

// --- LOGIKA BARU UNTUK CACHING DENGAN LOCALSTORAGE ---
// Versi data, pastikan diperbarui setiap kali Anda menambahkan kata baru.
const THESAURUS_DATA_VERSION = 7; // Versi saat ini diperbarui

/**
 * Mendapatkan data thesaurus dari cache atau mengurainya dari data mentah.
 * Proses penguraian data mentah hanya dilakukan sekali.
 * @returns {Object.<string, any>} Objek yang berisi map data thesaurus dan lookup map.
 */
function getThesaurusDataAndLookupMap() {
    const cacheKey = 'thesaurusData_v' + THESAURUS_DATA_VERSION;
    const cachedData = localStorage.getItem(cacheKey);
    const cachedVersion = localStorage.getItem('thesaurusDataVersion');

    // Cek jika ada data tersimpan dan versinya sama
    if (cachedData && cachedVersion == THESAURUS_DATA_VERSION) {
        console.log("dictionary.js: Loading thesaurus data and lookup map from cache.");
        return JSON.parse(cachedData);
    } else {
        console.log("dictionary.js: Parsing raw data, building lookup map, and saving to cache.");
        // Data belum ada atau versi tidak cocok, lakukan parsing
        const thesaurusMap = parseThesaurusData(rawThesaurusData);
        const lookupMap = buildThesaurusLookupMap(thesaurusMap);
        
        const dataToCache = {
            thesaurusMap: thesaurusMap,
            lookupMap: lookupMap
        };

        // Simpan data dan versi ke localStorage
        try {
            localStorage.setItem(cacheKey, JSON.stringify(dataToCache));
            localStorage.setItem('thesaurusDataVersion', THESAURUS_DATA_VERSION);
        } catch (e) {
            console.error("Failed to save thesaurus data to localStorage:", e);
        }
        return dataToCache;
    }
}

/**
 * Membangun peta pencarian terbalik (reverse lookup map) dari data thesaurus.
 * Logika ini sekarang memprioritaskan kata-kata yang merupakan sinonim.
 * @param {Object.<string, {sinonim: string[], antonim: string[]}>} thesaurusMap - Peta data thesaurus utama.
 * @returns {Object.<string, string>} Peta di mana kunci adalah sinonim/antonim/kata utama dan nilai adalah kata utama.
 */
function buildThesaurusLookupMap(thesaurusMap) {
    const lookupMap = {};

    Object.keys(thesaurusMap).forEach(mainWord => {
        const entry = thesaurusMap[mainWord];
        
        // Prioritas 1: Kata utama
        lookupMap[mainWord.toLowerCase()] = mainWord;

        // Prioritas 2: Sinonim
        entry.sinonim.forEach(synonym => {
            const lowerCaseSynonym = synonym.toLowerCase();
            lookupMap[lowerCaseSynonym] = mainWord;
        });

        // Prioritas 3: Antonim
        entry.antonim.forEach(antonym => {
            const lowerCaseAntonym = antonym.toLowerCase();
            if (!lookupMap[lowerCaseAntonym]) {
                lookupMap[lowerCaseAntonym] = mainWord;
            }
        });
    });

    return lookupMap;
}

const { thesaurusMap, lookupMap } = getThesaurusDataAndLookupMap();
export const thesaurusDataMap = thesaurusMap;
export const thesaurusLookupMap = lookupMap;
