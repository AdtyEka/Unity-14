// ─── Types ───────────────────────────────────────────────────────────────────

export type ArticleSection = {
    subtitle: string;
    items: {
        label: string;
        points: string[];
    }[];
};

export type ArticleContentBlock =
    | { type: 'heading'; text: string }
    | { type: 'subheading'; text: string }
    | { type: 'paragraph'; text: string }
    | { type: 'list'; items: string[] };

export type Article = {
    id: number;
    slug: string;
    judul: string;
    deskripsi: string;
    kategori: string;
    tags: string[];
    penulis: string;
    gambar: string;
    publishedAt: string;
    readTime: string;
    content?: ArticleContentBlock[];
    sections: ArticleSection[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────

export const articles: Article[] = [
    {
        id: 1,
        slug: 'tahapan-pertumbuhan-0-6-bulan',
        judul: 'Tahapan Pertumbuhan dan Perkembangan Bayi Usia 0–6 Bulan',
        deskripsi:
            'Ulasan detail mengenai tahapan pertumbuhan bayi usia 0–6 bulan, mulai dari perkembangan fisik, motorik, bahasa, sosial, hingga tanda kesiapan MPASI.',
        kategori: 'Tumbuh Kembang',
        tags: ['Parenting', 'Tumbuh Kembang', 'Bayi'],
        penulis: 'Admin',
        gambar: '/assets/images/article/article-2.webp',
        publishedAt: '15 Maret 2026',
        readTime: '5 menit baca',
        sections: [
            {
                subtitle: '1. Usia 0–1 Bulan (Neonatus)',
                items: [
                    {
                        label: 'Pertumbuhan Fisik',
                        points: [
                            'Berat badan bisa turun di minggu pertama, namun kembali naik pada minggu kedua.',
                            'Panjang bayi rata-rata sekitar 48–52 cm.',
                        ],
                    },
                    {
                        label: 'Motorik',
                        points: [
                            'Gerakan refleks mendominasi (menggenggam, menghisap, mengedip).',
                            'Belum bisa mengangkat kepala, tapi mulai memutar kepala saat tengkurap.',
                        ],
                    },
                    {
                        label: 'Sensorik',
                        points: [
                            'Mengenali suara ibu dan lebih responsif pada suara manusia.',
                            'Dapat melihat jarak 20–30 cm dan menyukai wajah.',
                        ],
                    },
                    {
                        label: 'Emosional',
                        points: [
                            'Menangis sebagai bentuk komunikasi utama.',
                            'Tidur 14–17 jam per hari tanpa pola teratur.',
                        ],
                    },
                ],
            },
            {
                subtitle: '2. Usia 1–2 Bulan',
                items: [
                    {
                        label: 'Pertumbuhan Fisik',
                        points: [
                            'Berat naik 150–200 gram per minggu.',
                            'Leher mulai lebih kuat, meski belum stabil.',
                        ],
                    },
                    {
                        label: 'Motorik',
                        points: [
                            'Mengangkat kepala sebentar saat tengkurap.',
                            'Tangan mulai terbuka lebih sering, refleks menggenggam masih aktif.',
                        ],
                    },
                    {
                        label: 'Bahasa',
                        points: [
                            'Mengeluarkan suara seperti "ooh" atau "aah" (cooing).',
                            'Merespon suara atau sentuhan dengan lebih jelas.',
                        ],
                    },
                    {
                        label: 'Sosial & Emosional',
                        points: [
                            'Mulai tersenyum sosial saat diajak bicara atau tatap muka.',
                            'Meningkatnya ketertarikan pada lingkungan sekitar.',
                        ],
                    },
                ],
            },
            {
                subtitle: '3. Usia 2–3 Bulan',
                items: [
                    {
                        label: 'Pertumbuhan Fisik',
                        points: ['Otot leher semakin kuat, mampu mengangkat kepala saat digendong.'],
                    },
                    {
                        label: 'Motorik',
                        points: [
                            'Gerakan tangan dan kaki lebih aktif dan terkontrol.',
                            'Mulai meraih benda yang digantung.',
                        ],
                    },
                    {
                        label: 'Bahasa & Sosial',
                        points: [
                            '"Berbicara" dengan suara lembut.',
                            'Respon terhadap senyum dan suara semakin aktif.',
                        ],
                    },
                    {
                        label: 'Kognitif',
                        points: [
                            'Tertarik pada warna cerah & mainan berbunyi.',
                            'Fokus memperhatikan wajah dan mengenali ekspresi.',
                        ],
                    },
                ],
            },
            {
                subtitle: '4. Usia 3–4 Bulan',
                items: [
                    {
                        label: 'Pertumbuhan Fisik',
                        points: [
                            'Berat naik 600–800 gram per bulan.',
                            'Leher semakin kuat menopang kepala saat tengkurap.',
                        ],
                    },
                    {
                        label: 'Motorik',
                        points: [
                            'Menggenggam mainan dengan tangan.',
                            'Kaki aktif menendang saat berbaring.',
                        ],
                    },
                    {
                        label: 'Bahasa',
                        points: [
                            'Suara lebih bervariasi, mulai "ngoceh".',
                            'Respon terhadap nama atau suara orang tua.',
                        ],
                    },
                    {
                        label: 'Sosial',
                        points: ['Tertawa pertama kali.', 'Mengenali ibu dan pengasuh secara visual.'],
                    },
                ],
            },
            {
                subtitle: '5. Usia 4–5 Bulan',
                items: [
                    {
                        label: 'Pertumbuhan Fisik',
                        points: [
                            'Kepala stabil saat digendong.',
                            'Tumbuh gigi mungkin mulai terlihat.',
                        ],
                    },
                    {
                        label: 'Motorik',
                        points: [
                            'Menggulingkan badan dari telentang ke tengkurap (milestone penting).',
                            'Meraih benda secara sengaja & memindahkan tangan ke tangan.',
                        ],
                    },
                    {
                        label: 'Kognitif & Sosial',
                        points: [
                            'Memperhatikan orang berbicara & menirukan ekspresi.',
                            'Mulai memahami konsep sebab-akibat (mainan berbunyi saat ditekan).',
                        ],
                    },
                ],
            },
            {
                subtitle: '6. Usia 5–6 Bulan',
                items: [
                    {
                        label: 'Pertumbuhan Fisik',
                        points: [
                            'Berat rata-rata dua kali berat lahir.',
                            'Mulai menunjukkan kesiapan untuk MPASI: bisa duduk dengan bantuan, tidak menjulurkan lidah saat diberi makanan, menunjukkan ketertarikan pada makanan.',
                        ],
                    },
                    {
                        label: 'Motorik',
                        points: [
                            'Duduk dengan dukungan.',
                            'Menggulingkan badan dua arah (tengkurap–telentang dan sebaliknya).',
                            'Memegang mainan & memasukkannya ke mulut.',
                        ],
                    },
                    {
                        label: 'Bahasa & Sosial',
                        points: [
                            'Mengucapkan suku kata ganda seperti "ba-ba", "ma-ma".',
                            'Menunjukkan emosi melalui ekspresi wajah.',
                            'Mulai membedakan orang asing & dikenal (stranger anxiety).',
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        slug: 'makanan-gizi-anak-6-bulan-5-tahun',
        judul: 'Makanan dan Gizi yang Tepat untuk Anak Usia 6 Bulan hingga 5 Tahun',
        deskripsi:
            'Panduan lengkap tentang kebutuhan gizi anak usia 6 bulan hingga 5 tahun, jenis makanan yang tepat, dan tips pemberian makan sehat untuk mendukung tumbuh kembang optimal.',
        kategori: 'Nutrisi',
        tags: ['Nutrisi', 'MPASI', 'Parenting'],
        penulis: 'Admin',
        gambar: '/assets/images/article/article-1.webp',
        publishedAt: '20 Maret 2026',
        readTime: '4 menit baca',
        content: [
            {
                type: 'paragraph',
                text: 'Makanan dan nutrisi yang tepat sangat penting untuk tumbuh kembang anak, terutama pada usia 6 bulan hingga 5 tahun. Pada usia ini, anak mengalami periode pertumbuhan yang pesat, baik dari segi fisik maupun kognitif. Pemberian makanan bergizi seimbang akan mendukung perkembangan tubuh, otak, dan daya tahan tubuh anak.',
            },
            {
                type: 'heading',
                text: 'Kebutuhan Nutrisi untuk Anak Usia 6 Bulan – 5 Tahun',
            },
            {
                type: 'paragraph',
                text: 'Pada usia ini, anak membutuhkan berbagai jenis nutrisi untuk mendukung pertumbuhannya yang cepat. Berikut adalah nutrisi penting yang harus dipenuhi:',
            },
            {
                type: 'subheading',
                text: 'Karbohidrat',
            },
            {
                type: 'paragraph',
                text: 'Sumber energi utama bagi anak. Berikan dari sumber alami seperti nasi, roti, kentang, dan jagung.',
            },
            {
                type: 'subheading',
                text: 'Protein',
            },
            {
                type: 'paragraph',
                text: 'Diperlukan untuk pertumbuhan otot dan jaringan tubuh. Makanan kaya protein meliputi daging, ikan, telur, kacang-kacangan, dan produk olahan susu.',
            },
            {
                type: 'subheading',
                text: 'Lemak Sehat',
            },
            {
                type: 'paragraph',
                text: 'Penting untuk perkembangan otak anak. Sumber lemak sehat antara lain minyak zaitun, alpukat, ikan berlemak (salmon, tuna), dan kacang-kacangan.',
            },
            {
                type: 'subheading',
                text: 'Vitamin, Mineral & Cairan',
            },
            {
                type: 'paragraph',
                text: 'Vitamin dan mineral mendukung sistem kekebalan tubuh; dapat diperoleh dari sayuran hijau, buah, dan susu yang diperkaya vitamin D & kalsium. Biasakan anak minum air putih secara teratur untuk menjaga keseimbangan cairan dan mendukung pencernaan.',
            },
            {
                type: 'heading',
                text: 'Jenis Makanan Sesuai Tahap Usia',
            },
            {
                type: 'subheading',
                text: '6 Bulan – 1 Tahun',
            },
            {
                type: 'paragraph',
                text: 'ASI atau susu formula tetap menjadi sumber utama gizi. Mulai usia 6 bulan, perkenalkan MPASI secara bertahap: puree buah, puree sayur, bubur beras, serta makanan lunak dan halus.',
            },
            {
                type: 'subheading',
                text: '1 Tahun – 2 Tahun',
            },
            {
                type: 'paragraph',
                text: 'Anak sudah bisa mengonsumsi makanan keluarga yang lebih bervariasi seperti nasi, roti, telur, ayam, daging, ikan, sayur, dan buah potong kecil.',
            },
            {
                type: 'subheading',
                text: '2 Tahun – 5 Tahun',
            },
            {
                type: 'paragraph',
                text: 'Anak dapat menikmati makanan lebih keras dan bervariasi: nasi dengan lauk pauk, buah segar, roti, sereal, dan camilan sehat (kacang-kacangan, yoghurt). Pastikan makanan kaya serat untuk mendukung pencernaan yang optimal.',
            },
            {
                type: 'heading',
                text: 'Tips Pemberian Makanan yang Tepat',
            },
            {
                type: 'subheading',
                text: 'Pengenalan Makanan Secara Bertahap',
            },
            {
                type: 'paragraph',
                text: 'Mulailah dengan makanan sederhana dan mudah dicerna, lalu tambah variasi secara perlahan. Perkenalkan satu makanan baru setiap beberapa hari untuk memudahkan pemantauan alergi.',
            },
            {
                type: 'subheading',
                text: 'Variasi, Keseimbangan & Jadwal Teratur',
            },
            {
                type: 'paragraph',
                text: 'Pastikan anak mendapat kombinasi karbohidrat, protein, lemak sehat, sayur, dan buah setiap harinya. Tetapkan jadwal makan yang konsisten (sarapan, makan siang, makan malam, dan camilan) agar anak terbiasa dengan pola makan yang sehat.',
            },
            {
                type: 'subheading',
                text: 'Batasi Gula & Makan Bersama Keluarga',
            },
            {
                type: 'paragraph',
                text: 'Batasi permen, kue, dan minuman manis karena berisiko menyebabkan masalah gigi dan obesitas. Jadikan waktu makan sebagai momen kebersamaan keluarga — selain mempererat ikatan, juga memberikan contoh pola makan sehat bagi anak.',
            },
        ],
        sections: [],
    },
    {
        id: 3,
        slug: 'makanan-bergizi-ibu-hamil-anak-usia-dini',
        judul: 'Makanan Bergizi untuk Ibu Hamil dan Anak Usia Dini: Apa yang Perlu Diketahui?',
        deskripsi:
            'Artikel ini membahas pentingnya gizi seimbang untuk ibu hamil dan anak usia dini, termasuk nutrisi penting, panduan MPASI, pola makan sehat, serta peran edukasi gizi bagi keluarga.',
        kategori: 'Nutrisi',
        tags: ['Nutrisi', 'Ibu Hamil', 'MPASI'],
        penulis: 'Admin',
        gambar: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&q=80',
        publishedAt: '25 Maret 2026',
        readTime: '5 menit baca',
        content: [
            {
                type: 'paragraph',
                text: 'Gizi seimbang merupakan kunci utama dalam mendukung tumbuh kembang optimal anak serta menjaga kesehatan ibu selama kehamilan. Pada fase kehamilan dan masa balita (usia 6 bulan–5 tahun), tubuh sangat membutuhkan asupan nutrisi yang mencukupi baik secara kualitas maupun kuantitas. Tanpa gizi yang seimbang, risiko stunting, berat badan lahir rendah, anemia, serta berbagai gangguan perkembangan dapat meningkat secara signifikan.',
            },
            {
                type: 'heading',
                text: 'Pentingnya Gizi Seimbang untuk Ibu Hamil',
            },
            {
                type: 'paragraph',
                text: 'Selama masa kehamilan, kebutuhan nutrisi meningkat untuk mendukung perkembangan janin, menjaga kesehatan ibu, serta mencegah komplikasi. Ada tiga kelompok nutrisi utama yang perlu diperhatikan:',
            },
            {
                type: 'subheading',
                text: '1. Asupan Makronutrien yang Tepat',
            },
            {
                type: 'list',
                items: [
                    'Karbohidrat: Sumber energi utama. Pilih karbohidrat kompleks seperti nasi merah, ubi, dan roti gandum.',
                    'Protein: Penting untuk pembentukan jaringan tubuh janin. Sumber: telur, daging tanpa lemak, ikan, kacang-kacangan.',
                    'Lemak Sehat: Mendukung perkembangan otak janin. Utamakan omega-3 dari ikan laut dalam seperti salmon dan sarden.',
                ],
            },
            {
                type: 'subheading',
                text: '2. Asupan Mikronutrien Esensial',
            },
            {
                type: 'list',
                items: [
                    'Asam Folat: Mencegah cacat tabung saraf. Sumber: sayuran hijau, kacang, suplemen prenatal.',
                    'Zat Besi: Mencegah anemia. Sumber: hati ayam, daging sapi, bayam.',
                    'Kalsium & Vitamin D: Penting untuk tulang janin. Sumber: susu, keju, sinar matahari pagi.',
                ],
            },
            {
                type: 'subheading',
                text: '3. Hidrasi dan Keamanan Makanan',
            },
            {
                type: 'list',
                items: [
                    'Minum minimal 2 liter air per hari.',
                    'Hindari makanan mentah atau tidak higienis.',
                ],
            },
            {
                type: 'heading',
                text: 'Gizi Seimbang untuk Balita (6 Bulan – 5 Tahun)',
            },
            {
                type: 'paragraph',
                text: 'Periode balita adalah masa emas (golden age) pertumbuhan anak. Kekurangan gizi pada masa ini dapat berdampak permanen terhadap kecerdasan dan fisik anak.',
            },
            {
                type: 'subheading',
                text: '1. Pengenalan MPASI (Usia 6–12 Bulan)',
            },
            {
                type: 'list',
                items: [
                    'MPASI diberikan mulai usia 6 bulan karena ASI saja tidak lagi mencukupi kebutuhan gizi.',
                    'Harus mengandung 4 komponen: karbohidrat, protein hewani, sayur, dan lemak tambahan.',
                    'Berikan bertahap dari tekstur halus ke kasar sesuai perkembangan usia.',
                ],
            },
            {
                type: 'subheading',
                text: '2. Pola Makan Seimbang (1–5 Tahun)',
            },
            {
                type: 'list',
                items: [
                    'Anak dapat mengonsumsi makanan keluarga dengan variasi yang cukup.',
                    'Gunakan prinsip isi piringku: ½ sayur & buah, ¼ karbohidrat, ¼ lauk.',
                    'Berikan camilan sehat 2× sehari: buah potong, roti isi, atau puding buatan sendiri.',
                ],
            },
            {
                type: 'subheading',
                text: '3. Zat Gizi Penting untuk Balita',
            },
            {
                type: 'list',
                items: [
                    'Protein hewani: mencegah stunting.',
                    'Zat besi: mencegah anemia yang memengaruhi perkembangan otak.',
                    'Vitamin A & C: memperkuat imun & kesehatan mata.',
                    'Zinc: mendukung nafsu makan & penyembuhan luka.',
                ],
            },
            {
                type: 'subheading',
                text: '4. Pantangan yang Harus Dihindari',
            },
            {
                type: 'list',
                items: [
                    'Camilan tinggi gula, garam, dan penyedap (keripik kemasan, permen).',
                    'Minuman manis berkarbonasi.',
                    'Makanan cepat saji tinggi lemak jenuh.',
                ],
            },
            {
                type: 'heading',
                text: 'Peran Edukasi dan Lingkungan',
            },
            {
                type: 'subheading',
                text: '1. Pendidikan Gizi untuk Orang Tua',
            },
            {
                type: 'list',
                items: [
                    'Edukasi dapat dilakukan melalui posyandu, puskesmas, atau media digital.',
                    'Gunakan buku saku gizi, poster, dan video animasi untuk edukasi praktis di rumah.',
                ],
            },
            {
                type: 'subheading',
                text: '2. Peran Keluarga dan Lingkungan',
            },
            {
                type: 'list',
                items: [
                    'Ayah juga berperan aktif dalam mendukung pola makan sehat keluarga.',
                    'Lingkungan rumah yang positif terhadap makanan bergizi memperkuat kebiasaan baik anak.',
                ],
            },
        ],
        sections: [],
    },
    {
        id: 4,
        slug: 'tahapan-perkembangan-balita-1-5-tahun',
        judul: 'Tahapan Perkembangan Balita Usia 1–5 Tahun: Panduan Lengkap untuk Orang Tua',
        deskripsi:
            'Panduan tahapan perkembangan balita usia 1–5 tahun meliputi aspek motorik, bahasa, kognitif, sosial, dan emosional untuk membantu orang tua memberikan stimulasi yang tepat.',
        kategori: 'Tumbuh Kembang',
        tags: ['Tumbuh Kembang', 'Parenting', 'Balita'],
        penulis: 'Admin',
        gambar: '/assets/images/article/article-3.webp',
        publishedAt: '1 April 2026',
        readTime: '6 menit baca',
        content: [
            {
                type: 'paragraph',
                text: 'Usia 1 sampai 5 tahun merupakan periode emas (golden age) dalam kehidupan anak. Pada tahap ini, perkembangan berlangsung sangat pesat dan menentukan fondasi kecerdasan, emosi, serta fisik anak di masa depan. Memahami setiap tahapan perkembangan sangat penting agar orang tua dapat memberikan stimulasi yang tepat sesuai kebutuhan.',
            },
            {
                type: 'heading',
                text: '1. Usia 1 Tahun (12–23 Bulan)',
            },
            {
                type: 'subheading',
                text: 'Ciri Perkembangan Umum',
            },
            {
                type: 'list',
                items: [
                    'Mulai belajar berjalan sendiri, meski masih sering jatuh.',
                    'Suka menjelajah lingkungan sekitar dengan merangkak, berjalan, dan memanjat.',
                    'Memahami perintah sederhana seperti "ambil bola" atau "ayo sini".',
                ],
            },
            {
                type: 'subheading',
                text: 'Motorik',
            },
            {
                type: 'list',
                items: ['Berdiri tanpa bantuan.', 'Menyusun 2–3 balok.', 'Menggunakan jari untuk mengambil makanan kecil.'],
            },
            {
                type: 'subheading',
                text: 'Bahasa',
            },
            {
                type: 'list',
                items: [
                    'Mengucapkan 2–3 kata bermakna seperti "mama", "mau", "dada".',
                    'Meniru suara dan nada bicara orang dewasa.',
                ],
            },
            {
                type: 'subheading',
                text: 'Sosial & Emosional',
            },
            {
                type: 'list',
                items: [
                    'Mulai menunjukkan rasa takut atau malu pada orang asing.',
                    'Memahami konsep milik: tidak mau mainannya diambil.',
                ],
            },
            {
                type: 'heading',
                text: '2. Usia 2 Tahun',
            },
            {
                type: 'subheading',
                text: 'Ciri Perkembangan Umum',
            },
            {
                type: 'list',
                items: [
                    'Fase "terrible two" dimulai: lebih mandiri tetapi mudah frustrasi.',
                    'Koordinasi gerakan semakin baik.',
                ],
            },
            {
                type: 'subheading',
                text: 'Motorik',
            },
            {
                type: 'list',
                items: ['Berlari dengan stabil.', 'Menendang bola.', 'Mencoret-coret dengan krayon.'],
            },
            {
                type: 'subheading',
                text: 'Bahasa',
            },
            {
                type: 'list',
                items: [
                    'Menggabungkan 2–3 kata menjadi kalimat sederhana ("mau susu", "mama pergi").',
                    'Kosakata berkembang hingga 50 kata atau lebih.',
                ],
            },
            {
                type: 'subheading',
                text: 'Kognitif',
            },
            {
                type: 'list',
                items: [
                    'Mengenali benda dan gambar di buku.',
                    'Mulai mengelompokkan benda berdasarkan warna atau bentuk.',
                ],
            },
            {
                type: 'subheading',
                text: 'Sosial & Emosional',
            },
            {
                type: 'list',
                items: [
                    'Meniru aktivitas orang dewasa (berpura-pura menyapu, menyuapi boneka).',
                    'Mulai belajar berbagi meski masih sulit bergiliran.',
                ],
            },
            {
                type: 'heading',
                text: '3. Usia 3 Tahun',
            },
            {
                type: 'subheading',
                text: 'Ciri Perkembangan Umum',
            },
            {
                type: 'list',
                items: [
                    'Lebih aktif dan memiliki rasa ingin tahu yang tinggi.',
                    'Koordinasi gerakan semakin matang.',
                ],
            },
            {
                type: 'subheading',
                text: 'Motorik',
            },
            {
                type: 'list',
                items: [
                    'Naik turun tangga tanpa bantuan.',
                    'Mengendarai sepeda roda tiga.',
                    'Menggambar lingkaran atau garis.',
                ],
            },
            {
                type: 'subheading',
                text: 'Bahasa',
            },
            {
                type: 'list',
                items: [
                    'Menggunakan kalimat lengkap 3–5 kata.',
                    'Bertanya dengan "apa", "kenapa", "di mana".',
                    'Bisa menyebut nama diri, usia, dan nama orang tua.',
                ],
            },
            {
                type: 'subheading',
                text: 'Kognitif',
            },
            {
                type: 'list',
                items: ['Mengikuti petunjuk 2–3 langkah.', 'Mengenali warna-warna dasar.'],
            },
            {
                type: 'subheading',
                text: 'Sosial & Emosional',
            },
            {
                type: 'list',
                items: [
                    'Bermain bersama teman sebaya (cooperative play).',
                    'Mengembangkan imajinasi & permainan pura-pura (pretend play).',
                ],
            },
            {
                type: 'heading',
                text: '4. Usia 4 Tahun',
            },
            {
                type: 'subheading',
                text: 'Ciri Perkembangan Umum',
            },
            {
                type: 'list',
                items: [
                    'Peningkatan besar dalam kemampuan verbal & sosial.',
                    'Lebih ekspresif secara emosional.',
                ],
            },
            {
                type: 'subheading',
                text: 'Motorik',
            },
            {
                type: 'list',
                items: [
                    'Melompat dengan satu kaki.',
                    'Meniru bentuk silang (+), kotak, atau segitiga.',
                    'Menyusun menara balok dengan rapi.',
                ],
            },
            {
                type: 'subheading',
                text: 'Bahasa',
            },
            {
                type: 'list',
                items: [
                    'Mampu bercerita singkat.',
                    'Menggunakan kalimat kompleks.',
                    'Sering bertanya dan suka berbicara.',
                ],
            },
            {
                type: 'subheading',
                text: 'Kognitif',
            },
            {
                type: 'list',
                items: [
                    'Mengenal angka 1–10.',
                    'Memahami konsep lebih besar, lebih kecil, sebelum–sesudah.',
                ],
            },
            {
                type: 'subheading',
                text: 'Sosial & Emosional',
            },
            {
                type: 'list',
                items: [
                    'Mulai memiliki teman favorit.',
                    'Mengembangkan empati: merasa sedih jika temannya menangis.',
                    'Ingin menyenangkan orang tua atau guru.',
                ],
            },
            {
                type: 'heading',
                text: '5. Usia 5 Tahun',
            },
            {
                type: 'subheading',
                text: 'Ciri Perkembangan Umum',
            },
            {
                type: 'list',
                items: [
                    'Mulai siap memasuki dunia sekolah.',
                    'Kemampuan bahasa, motorik, dan sosial semakin matang.',
                ],
            },
            {
                type: 'subheading',
                text: 'Motorik',
            },
            {
                type: 'list',
                items: [
                    'Menangkap bola dengan dua tangan.',
                    'Menggambar manusia lengkap (kepala, badan, anggota tubuh).',
                    'Menulis beberapa huruf atau nama sendiri.',
                ],
            },
            {
                type: 'subheading',
                text: 'Bahasa',
            },
            {
                type: 'list',
                items: [
                    'Menggunakan lebih dari 1.000 kata.',
                    'Menyusun kalimat 5–6 kata dengan jelas.',
                    'Memahami konsep waktu (kemarin, besok).',
                ],
            },
            {
                type: 'subheading',
                text: 'Kognitif',
            },
            {
                type: 'list',
                items: [
                    'Bisa berhitung 1–20.',
                    'Memahami perbedaan antara khayalan dan kenyataan.',
                    'Mengikuti aturan sederhana dalam permainan.',
                ],
            },
            {
                type: 'subheading',
                text: 'Sosial & Emosional',
            },
            {
                type: 'list',
                items: [
                    'Mulai mengatur emosi dengan lebih baik.',
                    'Bisa bekerja sama dalam kelompok kecil.',
                    'Menunjukkan rasa tanggung jawab kecil (menyimpan mainan, membantu di rumah).',
                ],
            },
        ],
        sections: [],
    },
];

export function getArticleBySlug(slug: string): Article | undefined {
    return articles.find((a) => a.slug === slug);
}
