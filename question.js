/* =========================================
   BANK SOAL UJIAN RPL - LEVEL HOTS
   Pemrograman Perangkat Bergerak
   Flutter • Dart • SQLite • Firebase
   ========================================= */

const questions = [

    // ===== SOAL 1 =====
    {
        id: 1,
        question: "Studi Kasus Sinkronisasi Data\n\nSebuah aplikasi inventaris sekolah menggunakan SQLite untuk menyimpan data ketika offline dan Firebase Firestore untuk menyimpan data online. Ketika internet kembali tersedia, aplikasi mengirim semua data lokal ke Firebase.\n\nNamun setelah proses sinkronisasi dilakukan dua kali, beberapa barang muncul dua kali di Firebase.\n\nApa penyebab yang paling mungkin dan solusi yang paling tepat?",
        options: [
            "A. SQLite tidak dapat digunakan bersama Firebase",
            "B. Flutter tidak mendukung koneksi database ganda",
            "C. Aplikasi tidak memiliki mekanisme identitas unik dan status sinkronisasi sehingga data yang sama dikirim kembali",
            "D. Firebase hanya boleh menyimpan satu dokumen",
            "E. Data harus dipindahkan seluruhnya ke SharedPreferences"
        ],
        answer: 2
    },

    // ===== SOAL 2 =====
    {
        id: 2,
        question: "Analisis Firebase Security Rules\n\nSebuah aplikasi sekolah memiliki collection 'nilai'. Developer membuat aturan Firebase Firestore:\n\nallow read, write: if true;\n\nAkibatnya setiap pengguna aplikasi dapat membaca dan mengubah nilai siswa.\n\nJika hanya guru yang login yang boleh mengubah nilai, pendekatan keamanan yang paling tepat adalah...",
        options: [
            "A. Menyembunyikan collection dari tampilan Flutter",
            "B. Menyimpan password guru di SQLite",
            "C. Menggunakan Firebase Authentication dan Firebase Security Rules untuk memvalidasi identitas serta hak akses pengguna",
            "D. Menghapus Firebase Authentication",
            "E. Membuat tombol edit hanya terlihat oleh guru"
        ],
        answer: 2
    },

    // ===== SOAL 3 =====
    {
        id: 3,
        question: "Analisis Performa SQLite\n\nSebuah aplikasi memiliki 50.000 data siswa. Ketika pengguna mencari siswa berdasarkan NIS, aplikasi terasa sangat lambat.\n\nKode yang digunakan:\n\nSELECT * FROM siswa;\n\nKemudian seluruh data dicari menggunakan perulangan Dart.\n\nPerbaikan yang paling tepat adalah...",
        options: [
            "A. Mengambil seluruh data lebih sering agar cache lebih cepat",
            "B. Melakukan pencarian langsung menggunakan query SQL dan mempertimbangkan index pada kolom NIS",
            "C. Menghapus sebagian data siswa",
            "D. Mengubah semua data menjadi String",
            "E. Menggunakan lebih banyak widget Text"
        ],
        answer: 1
    },

    // ===== SOAL 4 =====
    {
        id: 4,
        question: "Analisis Async Dart\n\nPerhatikan kode berikut:\n\nFuture<void> simpanData() async {\n  await db.insert('siswa', data);\n  Navigator.pop(context);\n  ScaffoldMessenger.of(context).showSnackBar(\n    const SnackBar(content: Text('Data berhasil disimpan'))\n  );\n}\n\nSetelah Navigator.pop() dipanggil, muncul error ketika aplikasi mencoba menggunakan context.\n\nPerbaikan yang paling tepat adalah...",
        options: [
            "A. Menghapus await",
            "B. Menghapus Navigator.pop()",
            "C. Memastikan penggunaan context dilakukan sebelum widget tidak lagi aktif atau memeriksa mounted sebelum menggunakan context setelah operasi async",
            "D. Mengganti SQLite dengan Firebase",
            "E. Menggunakan var pada semua variabel"
        ],
        answer: 2
    },

    // ===== SOAL 5 =====
    {
        id: 5,
        question: "Studi Kasus Firebase Firestore\n\nAplikasi sekolah memiliki collection 'siswa'. Setiap dokumen mempunyai field:\n\nnama\nkelas\njurusan\n\nGuru ingin menampilkan hanya siswa kelas XII RPL dan mengurutkannya berdasarkan nama.\n\nPendekatan query yang paling sesuai adalah...",
        options: [
            "A. Mengambil semua data lalu menghapus data yang tidak sesuai secara manual",
            "B. Menggunakan where() untuk filter kelas dan orderBy() untuk mengurutkan nama",
            "C. Menggunakan delete() kemudian add()",
            "D. Menggunakan Firebase Storage",
            "E. Menggunakan SharedPreferences"
        ],
        answer: 1
    },

    // ===== SOAL 6 =====
    {
        id: 6,
        question: "Analisis State Management\n\nSebuah aplikasi Flutter memiliki halaman Home, Keranjang, dan Checkout. Jumlah barang di keranjang harus selalu sama pada ketiga halaman.\n\nDeveloper menyimpan data keranjang hanya pada variabel lokal masing-masing StatefulWidget. Akibatnya jumlah barang berbeda antara halaman Home dan Checkout.\n\nSolusi arsitektur yang paling tepat adalah...",
        options: [
            "A. Membuat variabel baru pada setiap halaman",
            "B. Menggunakan state management terpusat seperti Provider, Riverpod, BLoC, atau mekanisme state bersama lainnya",
            "C. Menghapus StatefulWidget",
            "D. Menyimpan semua data di TextField",
            "E. Menggunakan SQLite untuk menggantikan seluruh state"
        ],
        answer: 1
    },

    // ===== SOAL 7 =====
    {
        id: 7,
        question: "Analisis Database Transaction\n\nAplikasi pembayaran siswa melakukan proses:\n\n1. Mengurangi saldo siswa\n2. Menambahkan saldo ke akun sekolah\n3. Menyimpan riwayat transaksi\n\nJika langkah kedua gagal, langkah pertama dan ketiga juga harus dibatalkan.\n\nTeknik yang paling tepat pada database lokal adalah...",
        options: [
            "A. Menjalankan semua query tanpa pengecekan",
            "B. Menggunakan SQLite transaction sehingga seluruh operasi bersifat atomic",
            "C. Menggunakan List Dart",
            "D. Menggunakan TextField",
            "E. Memanggil setState() setelah setiap query"
        ],
        answer: 1
    },

    // ===== SOAL 8 =====
    {
        id: 8,
        question: "Analisis Duplicate Data\n\nAplikasi mencatat transaksi offline menggunakan SQLite. Setiap transaksi mempunyai ID unik.\n\nSaat internet kembali tersedia, aplikasi mengirim transaksi ke Firebase. Karena proses sinkronisasi dijalankan ulang, transaksi yang sama terkirim dua kali.\n\nSolusi paling tepat adalah...",
        options: [
            "A. Menghapus ID transaksi",
            "B. Menggunakan ID unik sebagai identitas dokumen dan memastikan proses upload bersifat idempotent",
            "C. Mengirim data sebanyak mungkin",
            "D. Menggunakan List sebagai database utama",
            "E. Menghapus SQLite"
        ],
        answer: 1
    },

    // ===== SOAL 9 =====
    {
        id: 9,
        question: "Analisis Relasi Database\n\nAplikasi perpustakaan mempunyai tabel:\n\nsiswa(id, nama)\nbuku(id, judul)\npeminjaman(id, siswa_id, buku_id, tanggal)\n\nSeorang siswa dapat meminjam banyak buku dan satu buku dapat dipinjam oleh banyak siswa pada waktu berbeda.\n\nMengapa tabel peminjaman diperlukan?",
        options: [
            "A. Karena SQLite tidak dapat menyimpan buku",
            "B. Karena tabel peminjaman berfungsi sebagai penghubung dan menyimpan informasi transaksi peminjaman",
            "C. Karena semua data harus berada dalam satu tabel",
            "D. Karena Firebase tidak mendukung relasi",
            "E. Karena Dart tidak mendukung primary key"
        ],
        answer: 1
    },

    // ===== SOAL 10 =====
    {
        id: 10,
        question: "Analisis Validasi Data\n\nSebuah form pendaftaran siswa memiliki field:\n\nNama\nEmail\nNomor HP\n\nDeveloper hanya melakukan validasi bahwa field tidak kosong. Namun pengguna dapat memasukkan email 'abc' dan nomor HP 'hello'.\n\nPerbaikan yang paling tepat adalah...",
        options: [
            "A. Menghapus semua validasi",
            "B. Menggunakan validasi berdasarkan tipe dan format data yang diharapkan",
            "C. Menyimpan semua data sebagai integer",
            "D. Memindahkan validasi ke SQLite saja",
            "E. Menggunakan Firebase untuk menggantikan validasi"
        ],
        answer: 1
    },

    // ===== SOAL 11 =====
    {
        id: 11,
        question: "Analisis Query SQLite\n\nDeveloper ingin mengambil siswa kelas XII RPL yang namanya mengandung kata 'Andi'.\n\nQuery yang paling tepat adalah...",
        options: [
            "A. SELECT * FROM siswa WHERE kelas = 'XII RPL' AND nama LIKE '%Andi%';",
            "B. SELECT nama FROM siswa DELETE 'Andi';",
            "C. SELECT * FROM siswa INSERT 'Andi';",
            "D. UPDATE siswa WHERE nama LIKE 'Andi';",
            "E. SELECT siswa WHERE nama = '%Andi%';"
        ],
        answer: 0
    },

    // ===== SOAL 12 =====
    {
        id: 12,
        question: "Analisis Firebase Authentication\n\nSebuah aplikasi memiliki tiga jenis pengguna:\n\n- Admin\n- Guru\n- Siswa\n\nSemua pengguna berhasil login menggunakan Firebase Authentication. Namun aplikasi harus membatasi fitur berdasarkan peran pengguna.\n\nApa yang perlu ditambahkan agar sistem dapat membedakan hak akses?",
        options: [
            "A. Hanya mengganti warna tombol",
            "B. Menyimpan informasi role dan menerapkan pengecekan hak akses pada aplikasi serta aturan keamanan backend",
            "C. Menghapus Firebase Authentication",
            "D. Menyimpan role hanya dalam nama pengguna tanpa validasi",
            "E. Menggunakan SQLite sebagai pengganti Authentication"
        ],
        answer: 1
    },

    // ===== SOAL 13 =====
    {
        id: 13,
        question: "Analisis Stream Firestore\n\nAplikasi monitoring absensi harus menampilkan perubahan data secara real-time tanpa tombol refresh.\n\nDeveloper menggunakan:\n\ncollection('absensi').get()\n\nData hanya berubah ketika halaman dibuka ulang.\n\nSolusi yang paling tepat adalah...",
        options: [
            "A. Menggunakan snapshots() dan StreamBuilder sesuai kebutuhan tampilan",
            "B. Menggunakan delete() setiap detik",
            "C. Menggunakan SQLite saja",
            "D. Menggunakan FutureBuilder tanpa mengambil data kembali",
            "E. Menambahkan lebih banyak Text()"
        ],
        answer: 0
    },

    // ===== SOAL 14 =====
    {
        id: 14,
        question: "Analisis Error Async\n\nPerhatikan kode:\n\nvoid simpan() {\n  database.insert('siswa', data);\n  print('Data selesai disimpan');\n}\n\nDeveloper menganggap pesan tersebut berarti proses database sudah selesai.\n\nMasalah utama dari kode tersebut adalah...",
        options: [
            "A. insert() tidak dapat digunakan",
            "B. Operasi asynchronous tidak ditunggu sehingga pesan dapat muncul sebelum operasi database selesai",
            "C. print() tidak boleh digunakan",
            "D. Database harus Firebase",
            "E. Dart tidak mendukung Future"
        ],
        answer: 1
    },

    // ===== SOAL 15 =====
    {
        id: 15,
        question: "Studi Kasus Offline-First\n\nAplikasi penilaian guru digunakan di daerah dengan internet tidak stabil. Guru harus dapat memasukkan nilai kapan saja. Data kemudian harus tersinkronisasi ke server ketika koneksi tersedia.\n\nManakah rancangan yang paling lengkap?",
        options: [
            "A. Semua data langsung dikirim Firebase dan gagal jika offline",
            "B. SQLite menyimpan data lokal, setiap record memiliki status sinkronisasi, kemudian worker/proses sinkronisasi mengirim data yang belum tersinkron ke Firebase",
            "C. Semua data disimpan dalam variabel global",
            "D. Data disimpan hanya pada TextField",
            "E. Guru harus menunggu internet sebelum mengisi nilai"
        ],
        answer: 1
    },

    // ===== SOAL 16 =====
    {
        id: 16,
        question: "Analisis Konflik Data\n\nDua perangkat mengedit data siswa yang sama ketika keduanya sedang offline.\n\nPerangkat A mengubah alamat menjadi 'Padang'.\nPerangkat B mengubah alamat menjadi 'Bukittinggi'.\n\nKetika keduanya kembali online, terjadi konflik sinkronisasi.\n\nApa yang harus dipertimbangkan dalam desain sistem?",
        options: [
            "A. Tidak perlu melakukan apa pun karena database otomatis mengetahui perubahan yang benar",
            "B. Menentukan strategi conflict resolution, misalnya timestamp, versioning, atau aturan prioritas perubahan",
            "C. Menghapus semua data lokal",
            "D. Menggunakan List Dart",
            "E. Menonaktifkan Firebase"
        ],
        answer: 1
    },

    // ===== SOAL 17 =====
    {
        id: 17,
        question: "Analisis Struktur Flutter\n\nSebuah aplikasi Flutter memiliki satu file main.dart sepanjang 3.000 baris yang berisi UI, validasi, query SQLite, Firebase, dan navigasi.\n\nAplikasi sulit dikembangkan dan diperbaiki.\n\nPerbaikan desain yang paling tepat adalah...",
        options: [
            "A. Menambah kode ke file yang sama",
            "B. Memisahkan model, UI/widget, service database, repository, dan logic aplikasi sesuai kebutuhan",
            "C. Menghapus sebagian fitur",
            "D. Menggunakan lebih banyak global variable",
            "E. Mengubah Dart menjadi HTML"
        ],
        answer: 1
    },

    // ===== SOAL 18 =====
    {
        id: 18,
        question: "Analisis Null Safety Dart\n\nPerhatikan kode:\n\nString? nama;\nprint(nama.length);\n\nProgram menghasilkan error karena nama dapat bernilai null.\n\nPerbaikan yang paling tepat adalah...",
        options: [
            "A. Menggunakan nama.length tanpa pemeriksaan",
            "B. Menghapus tanda ?",
            "C. Melakukan null check atau menggunakan operator yang sesuai sebelum mengakses length",
            "D. Mengubah nama menjadi int",
            "E. Menyimpan nama di Firebase"
        ],
        answer: 2
    },

    // ===== SOAL 19 =====
    {
        id: 19,
        question: "Analisis Firestore Update\n\nDokumen siswa mempunyai data:\n\nnama: 'Andi'\nkelas: 'XII RPL'\nnis: '12345'\n\nGuru hanya ingin mengubah kelas menjadi 'XII RPL 2' tanpa menghapus field lainnya.\n\nOperasi yang paling sesuai adalah...",
        options: [
            "A. Menghapus dokumen lalu membuat ulang",
            "B. Menggunakan update() pada dokumen yang dituju",
            "C. Menggunakan add() tanpa ID",
            "D. Menggunakan Firebase Storage",
            "E. Menghapus collection"
        ],
        answer: 1
    },

    // ===== SOAL 20 =====
    {
        id: 20,
        question: "Analisis Keamanan Data\n\nSebuah aplikasi menyimpan password pengguna dalam SQLite seperti berikut:\n\npassword = '123456'\n\nJika database berhasil diakses oleh pihak yang tidak berwenang, password dapat dibaca langsung.\n\nPrinsip keamanan yang paling tepat adalah...",
        options: [
            "A. Menyimpan password plaintext tetapi menyembunyikan nama tabel",
            "B. Menggunakan mekanisme autentikasi yang tepat dan tidak menyimpan password plaintext secara sembarangan",
            "C. Menambahkan warna pada form login",
            "D. Menyimpan password di Text widget",
            "E. Mengganti tipe String menjadi int"
        ],
        answer: 1
    },

    // ===== SOAL 21 =====
    {
        id: 21,
        question: "Studi Kasus Cache Data\n\nAplikasi berita sekolah mengambil data dari Firebase. Setiap kali halaman dibuka, aplikasi selalu mengambil seluruh berita dari server meskipun berita tersebut belum berubah.\n\nAkibatnya penggunaan jaringan meningkat dan aplikasi terasa lambat.\n\nStrategi yang dapat dipertimbangkan adalah...",
        options: [
            "A. Menghapus Firebase",
            "B. Menggunakan caching/local storage serta mengambil data yang diperlukan saja sesuai kebutuhan",
            "C. Mengambil data lebih banyak setiap kali halaman dibuka",
            "D. Mengubah semua data menjadi gambar",
            "E. Menghapus ListView"
        ],
        answer: 1
    },

    // ===== SOAL 22 =====
    {
        id: 22,
        question: "Analisis Pagination\n\nCollection Firebase berisi 100.000 data transaksi. Developer mengambil seluruh transaksi sekaligus untuk ditampilkan pada aplikasi Flutter.\n\nAplikasi menjadi lambat dan penggunaan data internet meningkat.\n\nSolusi yang paling tepat adalah...",
        options: [
            "A. Mengambil 100.000 data setiap kali aplikasi dibuka",
            "B. Menggunakan pagination atau query bertahap dengan limit dan cursor sesuai desain aplikasi",
            "C. Menghapus Firebase",
            "D. Menyimpan semua data dalam satu TextField",
            "E. Menggunakan setState() berkali-kali"
        ],
        answer: 1
    },

    // ===== SOAL 23 =====
    {
        id: 23,
        question: "Analisis Race Condition\n\nPada aplikasi stok barang, dua pengguna hampir bersamaan membeli barang terakhir. Keduanya membaca stok = 1 dan kemudian masing-masing mengurangi stok menjadi 0.\n\nAkibatnya dua transaksi berhasil padahal stok hanya tersedia satu.\n\nMasalah tersebut menunjukkan perlunya...",
        options: [
            "A. Menambah jumlah TextField",
            "B. Mekanisme transaksi/atomic update atau validasi server-side untuk menjaga konsistensi stok",
            "C. Menyimpan stok hanya dalam variabel lokal",
            "D. Menghapus Firebase Authentication",
            "E. Menggunakan warna berbeda pada tombol beli"
        ],
        answer: 1
    },

    // ===== SOAL 24 =====
    {
        id: 24,
        question: "Studi Kasus Integrasi SQLite dan Firebase\n\nSebuah aplikasi kantin sekolah harus memenuhi kondisi berikut:\n\n1. Siswa tetap dapat membuat pesanan ketika offline.\n2. Pesanan tidak boleh hilang.\n3. Pesanan yang sama tidak boleh terkirim dua kali.\n4. Admin dapat melihat pesanan setelah perangkat online.\n5. Jika pengiriman gagal, sistem harus mencoba kembali.\n\nDesain yang paling tepat adalah...",
        options: [
            "A. Firebase saja tanpa penyimpanan lokal",
            "B. SQLite sebagai local queue, setiap transaksi memiliki ID unik dan status sync, kemudian proses sinkronisasi mengirim data ke Firebase dan melakukan retry jika gagal",
            "C. SharedPreferences sebagai database transaksi utama",
            "D. List Dart tanpa penyimpanan permanen",
            "E. Menunggu internet sebelum siswa boleh memesan"
        ],
        answer: 1
    },

    // ===== SOAL 25 =====
    {
        id: 25,
        question: "STUDI KASUS TERINTEGRASI - HOTS\n\nSebuah sekolah meminta dibuatkan aplikasi Flutter 'E-Nilai' dengan ketentuan:\n\n• Guru login menggunakan Firebase Authentication.\n• Guru dapat memasukkan dan mengubah nilai siswa.\n• Nilai harus tetap dapat dimasukkan ketika internet tidak tersedia.\n• Data lokal disimpan menggunakan SQLite.\n• Ketika internet tersedia, data dikirim ke Firebase Firestore.\n• Data yang sudah berhasil dikirim tidak boleh dikirim ulang.\n• Dua guru dapat menggunakan aplikasi dari perangkat berbeda.\n• Hanya guru yang memiliki hak akses yang boleh mengubah nilai.\n• Jika proses sinkronisasi gagal, data harus tetap tersimpan dan dapat dikirim kembali.\n\nManakah rancangan sistem yang paling tepat?",
        options: [
            "A. Flutter + Dart + SQLite saja karena seluruh data cukup disimpan pada perangkat",
            "B. Flutter + Dart + Firebase Authentication + Firestore tanpa SQLite karena Firebase selalu membutuhkan internet",
            "C. Flutter + Dart + SQLite untuk penyimpanan lokal/offline, Firebase Authentication untuk login, Firestore untuk data terpusat, ID transaksi unik + status sinkronisasi untuk mencegah duplikasi, serta Security Rules untuk membatasi akses",
            "D. Flutter + Dart + SharedPreferences untuk menyimpan semua nilai dan password",
            "E. Flutter + Dart + List untuk data nilai kemudian seluruh data dikirim menggunakan Firebase Storage"
        ],
        answer: 2
    }
];
