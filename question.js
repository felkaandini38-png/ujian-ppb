/* ================================
   BANK SOAL UJIAN RPL
   Pemrograman Perangkat Bergerak
   Flutter • Dart • SQLite • Firebase
   ================================ */

const questions = [
    {
        id: 1,
        question: "Analisis Program SQLite\n\nSebuah aplikasi manajemen data siswa menggunakan SQLite. Ketika tombol Simpan ditekan, data tidak muncul ketika aplikasi dibuka kembali.\n\nPotongan kode:\n```\nFuture<void> simpanSiswa() async {\n  final db = await database;\n  await db.insert('siswa', {\n    'nama': namaController.text,\n    'kelas': kelasController.text,\n  });\n}\n```\n\nNamun, saat mengambil data digunakan:\n```\nFuture<List<Map<String, dynamic>>> getSiswa() async {\n  final db = await database;\n  return await db.query('student');\n}\n```\n\nApa penyebab utama masalah tersebut?",
        options: [
            "A. namaController tidak boleh digunakan pada SQLite",
            "B. Nama tabel saat menyimpan dan mengambil data berbeda",
            "C. SQLite tidak dapat menyimpan data String",
            "D. Fungsi getSiswa() harus menggunakan Firebase",
            "E. Flutter tidak mendukung database lokal"
        ],
        answer: 1
    },
    {
        id: 2,
        question: "Analisis Firebase\n\nSebuah aplikasi Flutter menggunakan Firebase Authentication. Siswa berhasil login, tetapi setelah aplikasi ditutup dan dibuka kembali, siswa harus login ulang.\n\nAnalisis yang paling tepat adalah...",
        options: [
            "A. Firebase tidak dapat menyimpan informasi login",
            "B. Aplikasi harus menggunakan SQLite untuk password",
            "C. Implementasi autentikasi/session perlu diperiksa agar status autentikasi Firebase dipertahankan",
            "D. Password harus disimpan dalam SharedPreferences",
            "E. Firebase hanya dapat digunakan untuk registrasi"
        ],
        answer: 2
    },
    {
        id: 3,
        question: "Studi Kasus Aplikasi Penjualan\n\nSebuah toko ingin membuat aplikasi Flutter yang tetap dapat digunakan ketika tidak ada koneksi internet. Data barang, harga, stok, dan transaksi harus tetap tersedia pada perangkat.\n\nDatabase yang paling tepat digunakan sebagai penyimpanan utama pada perangkat adalah...",
        options: [
            "A. Firebase Realtime Database",
            "B. Firebase Authentication",
            "C. SQLite",
            "D. HTML",
            "E. JSON online"
        ],
        answer: 2
    },
    {
        id: 4,
        question: "Analisis Kebutuhan Database\n\nGuru meminta siswa membuat aplikasi nilai siswa. Data nilai harus dapat diakses dari beberapa perangkat guru secara bersamaan dan perubahan data harus terlihat pada perangkat lain.\n\nDatabase yang lebih sesuai adalah...",
        options: [
            "A. SQLite saja",
            "B. Firebase",
            "C. SharedPreferences",
            "D. File TXT",
            "E. List Dart"
        ],
        answer: 1
    },
    {
        id: 5,
        question: "Analisis Kesalahan Dart\n\nPerhatikan kode berikut:\n```\nList<String> nama = [];\n\nvoid tambahData() {\n  nama.add(10);\n}\n```\n\nProgram menghasilkan error. Apa penyebabnya?",
        options: [
            "A. List tidak dapat ditambahkan data",
            "B. Dart tidak mendukung List",
            "C. List hanya dapat berisi tipe data sesuai deklarasi String",
            "D. Fungsi add() hanya untuk Firebase",
            "E. Variabel harus menggunakan var"
        ],
        answer: 2
    },
    {
        id: 6,
        question: "Studi Kasus SQLite CRUD\n\nSeorang siswa membuat aplikasi data siswa dengan fitur Tambah, Tampilkan, Edit, dan Hapus. Fitur Edit ternyata membuat data baru sehingga terjadi data ganda.\n\nOperasi database yang seharusnya digunakan untuk fitur Edit adalah...",
        options: [
            "A. insert()",
            "B. query()",
            "C. delete()",
            "D. update()",
            "E. create()"
        ],
        answer: 3
    },
    {
        id: 7,
        question: "Analisis Kode Firebase\n\nPerhatikan kode:\n```\nFirebaseFirestore.instance\n    .collection('siswa')\n    .add({\n      'nama': 'Andi',\n      'kelas': 'XII RPL'\n    });\n```\n\nSiswa ingin mengubah data Andi berdasarkan ID dokumen yang sudah diketahui. Operasi yang paling tepat adalah...",
        options: [
            "A. add()",
            "B. get()",
            "C. update()",
            "D. create()",
            "E. insert()"
        ],
        answer: 2
    },
    {
        id: 8,
        question: "Pemilihan SQLite atau Firebase\n\nAplikasi kasir sekolah harus tetap dapat mencatat transaksi ketika internet mati. Ketika internet kembali tersedia, data transaksi perlu dikirim ke server agar dapat dipantau admin.\n\nPendekatan yang paling sesuai adalah...",
        options: [
            "A. SQLite saja",
            "B. Firebase saja",
            "C. SQLite sebagai penyimpanan lokal dan Firebase sebagai penyimpanan/sinkronisasi online",
            "D. SharedPreferences saja",
            "E. File Word dan Firebase"
        ],
        answer: 2
    },
    {
        id: 9,
        question: "Analisis Arsitektur Aplikasi\n\nSebuah aplikasi Flutter memiliki kode database langsung di dalam onPressed. Program berjalan, tetapi ketika aplikasi semakin besar kode sulit dipelihara.\n\nPerbaikan yang paling tepat adalah...",
        options: [
            "A. Menghapus setState()",
            "B. Menempatkan seluruh kode dalam satu file",
            "C. Memisahkan logika database ke dalam class/service/repository",
            "D. Mengganti SQLite dengan List",
            "E. Menghapus database"
        ],
        answer: 2
    },
    {
        id: 10,
        question: "Analisis Firebase Security\n\nSebuah aplikasi nilai siswa menggunakan Firebase. Semua pengguna dapat membaca dan mengubah seluruh data nilai karena aturan database dibuat terlalu terbuka.\n\nMasalah utama pada kondisi tersebut adalah...",
        options: [
            "A. Tampilan Flutter",
            "B. Kecepatan Dart",
            "C. Keamanan dan aturan akses database",
            "D. Ukuran APK",
            "E. Widget Flutter"
        ],
        answer: 2
    },
    {
        id: 11,
        question: "Analisis Error SQLite\n\nTabel SQLite memiliki struktur:\n```\nCREATE TABLE siswa (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  nama TEXT NOT NULL,\n  kelas TEXT NOT NULL,\n  jurusan TEXT NOT NULL\n);\n```\n\nNamun kode insert hanya mengirim nama dan kelas. Ketika dijalankan, proses penyimpanan gagal. Penyebab paling tepat adalah...",
        options: [
            "A. SQLite tidak mendukung kolom String",
            "B. Kolom jurusan NOT NULL tidak diberikan nilai",
            "C. Primary key tidak boleh AUTOINCREMENT",
            "D. Flutter tidak dapat menggunakan lebih dari dua kolom",
            "E. insert() hanya boleh menerima satu data"
        ],
        answer: 1
    },
    {
        id: 12,
        question: "Analisis Validasi\n\nPerhatikan logika:\n```\nif (nama.text.isEmpty) {\n  print(\"Nama kosong\");\n}\nawait db.insert(\"siswa\", {\"nama\": nama.text, \"kelas\": kelas.text});\n```\n\nSiswa menginginkan data tidak disimpan jika nama kosong. Perbaikan yang paling tepat adalah...",
        options: [
            "A. Menghapus kondisi if",
            "B. Menambahkan return setelah pesan validasi",
            "C. Mengganti SQLite dengan Firebase",
            "D. Menghapus insert()",
            "E. Memanggil Navigator.pop() sebelum validasi"
        ],
        answer: 1
    },
    {
        id: 13,
        question: "Analisis Performa\n\nSebuah aplikasi Flutter memiliki 10.000 data siswa. Program mengambil seluruh data dengan db.query('siswa') lalu menampilkan semuanya sekaligus. Aplikasi mulai lambat.\n\nSolusi yang dapat dipertimbangkan adalah...",
        options: [
            "A. Menghapus database",
            "B. Mengambil seluruh data lebih sering",
            "C. Menggunakan pencarian, filter, limit/pagination, atau pengambilan bertahap",
            "D. Menggunakan lebih banyak Text()",
            "E. Menghapus ListView"
        ],
        answer: 2
    },
    {
        id: 14,
        question: "Keamanan Password\n\nSebuah aplikasi menyimpan password pengguna langsung ke SQLite dalam bentuk teks biasa. Dari sisi keamanan, kondisi tersebut berisiko karena...",
        options: [
            "A. SQLite tidak dapat menyimpan password",
            "B. Password dapat menjadi data sensitif yang tersimpan dalam bentuk mudah dibaca",
            "C. Dart tidak mendukung String",
            "D. Flutter tidak dapat melakukan login",
            "E. Firebase otomatis menghapus data"
        ],
        answer: 1
    },
    {
        id: 15,
        question: "Arsitektur Offline-Online\n\nGuru mengisi nilai siswa di daerah dengan koneksi internet tidak stabil. Data harus tetap tersimpan dan kemudian dikirim ke server ketika internet tersedia. Jika pengiriman gagal, aplikasi harus mencoba kembali tanpa membuat data ganda.\n\nSolusi arsitektur yang paling sesuai adalah...",
        options: [
            "A. Firebase saja tanpa penyimpanan lokal",
            "B. SQLite sebagai penyimpanan lokal + Firebase sebagai server + mekanisme status sinkronisasi",
            "C. List Dart saja",
            "D. SharedPreferences untuk semua data",
            "E. File TXT"
        ],
        answer: 1
    },
    {
        id: 16,
        question: "Perbandingan Database\n\nAplikasi A adalah catatan pribadi yang digunakan satu orang dan harus dapat digunakan tanpa internet. Aplikasi B adalah administrasi sekolah yang digunakan oleh banyak pengguna dari perangkat berbeda.\n\nPernyataan yang paling tepat adalah...",
        options: [
            "A. Keduanya selalu cukup menggunakan List Dart",
            "B. A cenderung cocok menggunakan SQLite, sedangkan B membutuhkan penyimpanan terpusat seperti Firebase",
            "C. A harus selalu menggunakan Firebase",
            "D. B hanya dapat menggunakan SQLite",
            "E. Keduanya tidak membutuhkan database"
        ],
        answer: 1
    },
    {
        id: 17,
        question: "Firebase dan Kondisi Offline\n\nAplikasi Flutter menggunakan Firebase. Ketika internet terputus, pengguna masih dapat melihat beberapa data sebelumnya, tetapi data baru belum terlihat pada perangkat admin.\n\nKesimpulan paling tepat adalah...",
        options: [
            "A. Flutter tidak mendukung database online",
            "B. Firebase hanya dapat digunakan melalui browser",
            "C. Perlu dirancang mekanisme offline dan sinkronisasi sesuai kebutuhan aplikasi",
            "D. Dart tidak dapat digunakan dengan Firebase",
            "E. SQLite harus dihapus"
        ],
        answer: 2
    },
    {
        id: 18,
        question: "Analisis CRUD\n\nSebuah aplikasi memiliki tombol Hapus. Ketika tombol ditekan, data langsung hilang tanpa konfirmasi. Untuk mengurangi risiko kesalahan pengguna, perbaikan yang tepat adalah...",
        options: [
            "A. Menghapus tombol Hapus",
            "B. Menambahkan dialog konfirmasi sebelum operasi delete",
            "C. Mengganti delete dengan insert",
            "D. Menyimpan semua data dalam List",
            "E. Menonaktifkan SQLite"
        ],
        answer: 1
    },
    {
        id: 19,
        question: "Analisis Firebase Firestore\n\nData siswa tersimpan pada collection 'siswa'. ID dokumen sudah diketahui. Guru ingin membaca satu dokumen untuk menampilkan detail siswa.\n\nOperasi yang paling tepat adalah...",
        options: [
            "A. get() pada referensi dokumen",
            "B. insert()",
            "C. delete()",
            "D. update() tanpa membaca",
            "E. create()"
        ],
        answer: 0
    },
    {
        id: 20,
        question: "Evaluasi Pemilihan Teknologi\n\nSebuah aplikasi harus memenuhi dua kondisi: tetap dapat digunakan tanpa internet dan data dapat dipantau dari perangkat lain ketika internet tersedia.\n\nPendekatan yang paling sesuai adalah...",
        options: [
            "A. SQLite saja",
            "B. Firebase saja tanpa mempertimbangkan penyimpanan lokal",
            "C. Kombinasi penyimpanan lokal dan server/cloud dengan mekanisme sinkronisasi",
            "D. SharedPreferences saja",
            "E. File teks saja"
        ],
        answer: 2
    },
        // ===== SOAL 21 - State Management Flutter =====
    {
        id: 21,
        question: "Analisis State Management Flutter\n\nSeorang siswa membuat aplikasi catatan menggunakan StatefulWidget. Catatan dapat ditambah dan ditampilkan dengan baik. Namun, ketika pengguna membuka halaman detail catatan lalu kembali ke halaman daftar, catatan yang baru ditambahkan tidak muncul. Pengguna harus merestart aplikasi agar data terlihat.\n\nAnalisis penyebab paling tepat dari masalah tersebut!",
        options: [
            "A. StatefulWidget tidak dapat menyimpan data sama sekali",
            "B. Flutter tidak mendukung navigasi antar halaman",
            "C. State pada halaman daftar tidak di-refresh saat kembali, sehingga diperlukan mekanisme seperti setState() di callback Navigator, State Management global (Provider/BLoC), atau pengambilan ulang data pada lifecycle yang tepat",
            "D. Data harus selalu disimpan di Firebase agar muncul",
            "E. ListView tidak dapat menampilkan data dinamis"
        ],
        answer: 2
    },

    // ===== SOAL 22 - Async Dart Error Handling =====
    {
        id: 22,
        question: "Analisis Error Handling Dart\n\nPerhatikan kode Dart berikut:\n```\nFuture<void> ambilData() async {\n  final response = await http.get(Uri.parse('https://api.sekolah.id/siswa'));\n  final data = jsonDecode(response.body);\n  print(data);\n}\n```\n\nKetika server mati atau tidak ada internet, aplikasi langsung crash tanpa pesan yang jelas. Perbaikan yang paling tepat untuk menangani kondisi tersebut adalah...",
        options: [
            "A. Menghapus kata kunci async",
            "B. Mengganti http.get dengan SQLite",
            "C. Menghapus jsonDecode",
            "D. Menggunakan try-catch untuk menangkap exception dan memberikan penanganan yang sesuai (pesan error, retry, atau fallback)",
            "E. Menambahkan lebih banyak print()"
        ],
        answer: 3
    },

    // ===== SOAL 23 - Firebase Realtime Listener =====
    {
        id: 23,
        question: "Analisis Firebase Realtime Update\n\nSebuah aplikasi chat sekolah menggunakan Firebase Firestore. Pengembang menulis kode:\n```\nFirebaseFirestore.instance\n    .collection('chat')\n    .get()\n    .then((querySnapshot) {\n      // tampilkan data\n    });\n```\n\nAplikasi hanya menampilkan pesan yang ada saat pertama kali dibuka. Ketika ada pesan baru dari pengguna lain, pesan tidak muncul secara otomatis dan pengguna harus menekan tombol refresh.\n\nAnalisis perbaikan yang paling tepat!",
        options: [
            "A. Mengganti Firestore dengan SQLite",
            "B. Menggunakan .snapshots() sebagai Stream agar data otomatis ter-update ketika ada perubahan di database",
            "C. Menambah tombol refresh di setiap halaman",
            "D. Menggunakan Firebase Storage",
            "E. Menghapus collection chat"
        ],
        answer: 1
    },

    // ===== SOAL 24 - SQLite Transaction =====
    {
        id: 24,
        question: "Analisis SQLite Transaction\n\nSebuah aplikasi e-wallet sekolah memiliki fitur transfer saldo. Proses transfer melibatkan dua operasi:\n1. Mengurangi saldo pengirim\n2. Menambah saldo penerima\n\nSaat pengujian, ditemukan kasus: ketika operasi pertama berhasil tetapi operasi kedua gagal (misalnya karena error), saldo pengirim berkurang tetapi penerima tidak menerima. Data menjadi tidak konsisten.\n\nSolusi yang paling tepat untuk menjamin kedua operasi berhasil bersama atau gagal bersama adalah...",
        options: [
            "A. Menggunakan dua database terpisah",
            "B. Mengganti SQLite dengan SharedPreferences",
            "C. Menggunakan transaction/batch pada SQLite agar operasi bersifat atomic (all or nothing)",
            "D. Menambahkan tombol konfirmasi tambahan",
            "E. Menyimpan data dalam List Dart"
        ],
        answer: 2
    },

    // ===== SOAL 25 - Navigation Flutter =====
    {
        id: 25,
        question: "Analisis Navigation Flutter\n\nSebuah aplikasi memiliki halaman daftar siswa dan halaman detail siswa. Setelah mengedit data di halaman detail, pengguna menekan tombol kembali. Halaman daftar tetap menampilkan data lama, bukan data yang baru diedit.\n\nPendekatan yang paling tepat agar halaman daftar otomatis menampilkan data terbaru setelah kembali dari halaman edit adalah...",
        options: [
            "A. Menghapus halaman detail",
            "B. Menggunakan Navigator.pop() dengan mengembalikan nilai/result, lalu memanggil setState() atau refresh data di halaman daftar",
            "C. Menonaktifkan tombol kembali",
            "D. Menyimpan semua data di variabel global tanpa mekanisme refresh",
            "E. Mengganti Flutter dengan HTML"
        ],
        answer: 1
    }
];