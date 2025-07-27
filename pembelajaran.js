document.addEventListener('DOMContentLoaded', () => {
    console.log("pembelajaran.js: DOMContentLoaded triggered. (Pembelajaran script loaded)");

    const learningMenuContainer = document.getElementById('learning-menu');
    const learningDisplayContainer = document.getElementById('learning-display');
    const prevTopicBtn = document.getElementById('prev-topic-btn');
    const nextTopicBtn = document.getElementById('next-topic-btn');

    const LEARNING_TOPIC_KEY = 'lastViewedLearningTopic'; // Key untuk localStorage

    let currentTopicIndex = 0;

    // Data Topik Pembelajaran
    const learningTopics = [
        {
            id: 'apa-itu-puisi',
            title: 'Apa itu Puisi?',
            icon: 'fas fa-question-circle',
            subtitle: 'Bahas bareng yuk, tanpa ribet!',
            content: `
                <div class="learning-card">
                    <h3>Puisi Itu Apa, Sih? 🤔</h3>
                    <p>Puisi adalah cara menyampaikan perasaan, pikiran, atau pengalaman lewat kata-kata indah yang punya ritme dan makna mendalam. Gak harus selalu ribet, tapi harus ngena.</p>
                    <div class="highlight-box">
                        <i class="fas fa-lightbulb"></i>
                        <p><strong>Tips:</strong> Kalau kamu bingung mulai dari mana, coba tulis dulu perasaan kamu hari ini. Jangan takut salah, yang penting ekspresikan!</p>
                    </div>
                </div>
                <div class="learning-card">
                    <h3>Kenapa Puisi Itu Penting? 💡</h3>
                    <p>Puisi bantu kita lihat dunia dari sudut pandang yang berbeda, melatih kepekaan rasa, dan memperkaya kosa kata. Plus, seru banget lho bisa bikin kata-kata menari di atas kertas!</p>
                    <div class="poem-example-box">
                        <h4>Contoh Puisi Sederhana:</h4>
                        <p class="poem-text">
                            Bunga di taman,<br>
                            Mekar berseri,<br>
                            Indah dipandang,<br>
                            Hati berseri.
                        </p>
                    </div>
                </div>
            `,
            quiz: null // Belum ada kuis untuk topik ini
        },
        {
            id: 'struktur-puisi',
            title: 'Struktur Puisi',
            icon: 'fas fa-building',
            subtitle: 'Bangunan Kata, Bait, dan Rasa',
            content: `
                <div class="learning-card">
                    <h3>Bangunan Kata, Bait, dan Rasa 🧱</h3>
                    <p>Puisi itu kayak bangunan, punya bagian-bagiannya. Ada yang namanya bait, baris, dan rima. Ini yang bikin puisi jadi punya irama dan enak didengar (atau dibaca).</p>
                    <h4>Elemen Penting:</h4>
                    <ul>
                        <li><strong>Baris:</strong> Satu deret kata dalam puisi. Kayak satu kalimat pendek.</li>
                        <li><strong>Bait:</strong> Kumpulan dari beberapa baris. Mirip paragraf kalau di tulisan biasa.</li>
                        <li><strong>Rima:</strong> Persamaan bunyi di akhir baris. Ini yang bikin puisi punya musikalitas.</li>
                    </ul>
                </div>
                <div class="learning-card">
                    <h3>Contoh Visual Struktur Puisi:</h3>
                    <p>Coba perhatikan puisi ini. Aku warnain biar kamu gampang lihat bagian-bagiannya!</p>
                    <div class="poem-structure-example">
                        <p class="poem-line line-1">Langit biru memanggil (A)</p>
                        <p class="poem-line line-2">Awan putih berarak (B)</p>
                        <p class="poem-line line-3">Hati riang memekik (C)</p>
                        <p class="poem-line line-4">Indah dunia semarak (B)</p>
                    </div>
                    <p class="explanation">Di sini, baris ke-2 dan ke-4 punya rima yang sama (kata akhir 'arak' dan 'semarak'). Ini membentuk pola rima ABAB atau ABCB.</p>
                </div>
                <div class="highlight-box green">
                    <i class="fas fa-info-circle"></i>
                    <p><strong>Trivia:</strong> Puisi lama biasanya sangat terikat dengan rima dan jumlah baris yang baku (misal: pantun, syair). Puisi modern lebih bebas, tapi tetap indah!</p>
                </div>
            `,
            quiz: null // Bisa tambahkan kuis di sini nanti
        },
        {
            id: 'jenis-jenis-puisi',
            title: 'Jenis-jenis Puisi',
            icon: 'fas fa-feather-alt',
            subtitle: 'Dari Pantun sampai Haiku',
            content: `
                <div class="learning-card">
                    <h3>Macam-macam Puisi 🖋️</h3>
                    <p>Puisi punya banyak jenis, lho! Ada yang terikat aturan, ada juga yang bebas banget. Kenali beberapa di antaranya:</p>
                    <ul>
                        <li><strong>Pantun:</strong> Puisi lama 4 baris, rima a-b-a-b, dua baris sampiran, dua baris isi.</li>
                        <li><strong>Syair:</strong> Puisi lama 4 baris, rima a-a-a-a, semua baris adalah isi.</li>
                        <li><strong>Puisi Bebas:</strong> Puisi modern yang tidak terikat rima, bait, atau jumlah baris. Bebas berekspresi!</li>
                        <li><strong>Haiku:</strong> Puisi Jepang pendek banget, 3 baris dengan pola suku kata 5-7-5.</li>
                    </ul>
                </div>
                <div class="learning-card">
                    <h3>Kuis Mini: Tebak Jenis Puisi! 🎓</h3>
                    <div class="mini-quiz" data-quiz-id="jenis-puisi-1">
                        <p class="question">"Dua tiga kucing berlari, <br> Mana sama si kucing belang? <br> Dua tiga boleh dicari, <br> Mana sama abang tak pulang?"</p>
                        <div class="options">
                            <button data-answer="pantun">Pantun</button>
                            <button data-answer="syair">Syair</button>
                            <button data-answer="haiku">Haiku</button>
                        </div>
                        <p class="feedback"></p>
                    </div>
                </div>
            `,
            quiz: {
                id: 'jenis-puisi-1',
                correctAnswer: 'pantun',
                questionSelector: '.mini-quiz[data-quiz-id="jenis-puisi-1"] .options button',
                feedbackSelector: '.mini-quiz[data-quiz-id="jenis-puisi-1"] .feedback',
                handleQuiz: function() {
                    const quizContainer = document.querySelector(`.mini-quiz[data-quiz-id="${this.id}"]`);
                    if (!quizContainer) return;
                    const buttons = quizContainer.querySelectorAll(this.questionSelector);
                    const feedback = quizContainer.querySelector(this.feedbackSelector);
                    const correctAnswer = this.correctAnswer; // Ambil jawaban yang benar dari konteks `this`

                    buttons.forEach(button => {
                        button.removeEventListener('click', quizClickHandler); // Hapus listener lama
                        // Tambahkan listener baru, pastikan `correctAnswer` dan `feedback` diakses dengan benar
                        button.addEventListener('click', function(e) { // Gunakan function biasa untuk akses `this` tombol
                            buttons.forEach(btn => btn.disabled = true); 
                            if (e.target.dataset.answer === correctAnswer) { // Gunakan `correctAnswer` dari closure
                                feedback.textContent = 'Benar! 🎉';
                                feedback.style.color = 'green';
                            } else {
                                feedback.textContent = `Salah. Jawaban yang benar adalah "${correctAnswer}".`;
                                feedback.style.color = 'red';
                            }
                        });
                    });
                }
            }
        }
        // Tambahkan topik lain di sini
    ];

    // --- Fungsi untuk Mengelola Riwayat Topik (localStorage) ---
    function saveLastViewedTopic(topicId) {
        localStorage.setItem(LEARNING_TOPIC_KEY, topicId);
    }

    function loadLastViewedTopic() {
        return localStorage.getItem(LEARNING_TOPIC_KEY);
    }

    // --- Fungsi untuk Merender Menu Topik ---
    function renderLearningMenu() {
        if (!learningMenuContainer) {
            console.error("pembelajaran.js: learningMenuContainer not found.");
            return;
        }
        learningMenuContainer.innerHTML = ''; // Bersihkan menu
        const fragment = document.createDocumentFragment();

        learningTopics.forEach((topic, index) => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('learning-menu-item');
            menuItem.setAttribute('data-topic-id', topic.id);
            if (index === currentTopicIndex) {
                menuItem.classList.add('active');
            }
            menuItem.innerHTML = `<i class="${topic.icon}"></i> <span>${topic.title}</span>`;
            fragment.appendChild(menuItem);
        });
        learningMenuContainer.appendChild(fragment);

        // Tambahkan event listener untuk klik menu
        learningMenuContainer.querySelectorAll('.learning-menu-item').forEach(item => {
            item.removeEventListener('click', handleMenuItemClick); // Hapus listener lama
            item.addEventListener('click', handleMenuItemClick);
        });
    }

    // --- Fungsi untuk Merender Konten Topik ---
    function renderTopicContent(topicIndex) {
        if (topicIndex < 0 || topicIndex >= learningTopics.length) return;
        if (!learningDisplayContainer) {
            console.error("pembelajaran.js: learningDisplayContainer not found.");
            return;
        }

        const topic = learningTopics[topicIndex];
        currentTopicIndex = topicIndex;
        saveLastViewedTopic(topic.id); // Simpan topik yang sedang dilihat

        // Update menu aktif
        if (learningMenuContainer) {
            learningMenuContainer.querySelectorAll('.learning-menu-item').forEach((item, index) => {
                if (index === topicIndex) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }

        // Render konten
        learningDisplayContainer.innerHTML = `
            <h2>${topic.title}</h2>
            <p class="learning-subtitle">${topic.subtitle}</p>
            <div class="topic-content-body">
                ${topic.content}
            </div>
        `;
        
        // Update tombol navigasi
        if (prevTopicBtn) prevTopicBtn.disabled = (topicIndex === 0);
        if (nextTopicBtn) nextTopicBtn.disabled = (topicIndex === learningTopics.length - 1);

        // Inisialisasi kuis jika ada
        if (topic.quiz && typeof topic.quiz.handleQuiz === 'function') {
            console.log(`pembelajaran.js: Initializing quiz for topic: ${topic.id}`);
            // Panggil handleQuiz dan pastikan konteks `this` benar jika diperlukan
            topic.quiz.handleQuiz.call(topic.quiz); // Panggil dengan `call` untuk set `this` ke `topic.quiz`
        } else {
            console.log(`pembelajaran.js: No quiz to initialize for topic: ${topic.id}`);
        }
    }

    // --- Event Handlers (didefinisikan di luar render/init utama) ---
    function handleMenuItemClick(e) {
        const topicId = e.currentTarget.getAttribute('data-topic-id');
        const index = learningTopics.findIndex(t => t.id === topicId);
        if (index !== -1 && index !== currentTopicIndex) {
            renderTopicContent(index);
        }
    }

    function handlePrevTopicClick() {
        if (currentTopicIndex > 0) {
            renderTopicContent(currentTopicIndex - 1);
        }
    }

    function handleNextTopicClick() {
        if (currentTopicIndex < learningTopics.length - 1) {
            renderTopicContent(currentTopicIndex + 1);
        }
    }

    // --- Inisialisasi Halaman Pembelajaran ---
    renderLearningMenu();

    const lastTopicId = loadLastViewedTopic();
    const initialIndex = lastTopicId ? learningTopics.findIndex(t => t.id === lastTopicId) : 0;
    renderTopicContent(initialIndex !== -1 ? initialIndex : 0);

    // Event listener untuk tombol navigasi
    if (prevTopicBtn) {
        prevTopicBtn.removeEventListener('click', handlePrevTopicClick); // Hapus listener lama
        prevTopicBtn.addEventListener('click', handlePrevTopicClick);
    } else {
        console.warn("pembelajaran.js: prevTopicBtn not found.");
    }
    if (nextTopicBtn) {
        nextTopicBtn.removeEventListener('click', handleNextTopicClick); // Hapus listener lama
        nextTopicBtn.addEventListener('click', handleNextTopicClick);
    } else {
        console.warn("pembelajaran.js: nextTopicBtn not found.");
    }
});