// Membungkus seluruh kode dalam DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("initFullPreviewPage called!"); 
    const titleElement = document.getElementById('poem-title-full');
    const authorElement = document.getElementById('poem-author-full');
    const contentElement = document.getElementById('poem-full-text');
    const errorMessage = document.getElementById('error-message');
    const mainContent = document.querySelector('main.full-preview-content'); 

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

    function getAndCombinePoems() {
        const storedPoems = JSON.parse(localStorage.getItem('poems')) || [];
        poemsData = [...storedPoems.map(p => ({ ...p, theme: p.theme || 'white' })), ...initialPoems];
    }

    function loadPoem() {
        const selectedPoemId = localStorage.getItem('selectedPoemId');
        
        getAndCombinePoems();

        if (selectedPoemId !== null && poemsData[selectedPoemId]) {
            const poem = poemsData[selectedPoemId];
            titleElement.textContent = poem.title;
            authorElement.textContent = `- ${poem.author}`;
            
            const formattedContent = poem.content.replace(/\n/g, '<br>');
            
            contentElement.innerHTML = `<p>${formattedContent}</p>`;
        } else {
            errorMessage.style.display = 'block';
            contentElement.style.display = 'none';
        }
    }
    
    loadPoem();
});