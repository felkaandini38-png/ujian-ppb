# 🎓 RPL Online Exam - SMK Negeri 1 Lintau Buo

Website ujian online untuk siswa **Kelas XII Rekayasa Perangkat Lunak (RPL)**  
Mata Pelajaran: **Pemrograman Perangkat Bergerak**  
Materi: Flutter • Dart • SQLite • Firebase

---

## ✨ Fitur Utama

- ✅ 25 soal pilihan ganda (HOTS)
- ✅ **Timer 3 menit per soal** (otomatis pindah soal)
- ✅ **Auto-stop saat keluar halaman** (pindah tab = ujian berhenti)
- ✅ **Total poin 100** (4 poin per soal)
- ✅ **Tombol kirim hasil ke WhatsApp guru**
- ✅ Jawaban tersimpan otomatis
- ✅ Ujian hanya 1x per perangkat
- ✅ Responsive untuk HP Android

---

## ⚙️ KONFIGURASI PENTING

### 1. Atur Nomor WhatsApp Guru

Buka file **`script.js`**, cari bagian:

```javascript
const examConfig = {
    ...
    teacherWA: "628xxxxxxxxx",   // ← GANTI DENGAN NOMOR ANDA
    teacherName: "Guru RPL"
};
```

**Format nomor:** `62` + nomor HP (tanpa `+`, tanpa `0` depan)

Contoh:
- `081234567890` → `6281234567890`
- `085612345678` → `6285612345678`

### 2. Ubah Waktu per Soal

```javascript
timePerQuestion: 3,   // ← menit per soal (default: 3)
```

### 3. Ubah Poin per Soal

```javascript
pointsPerQuestion: 4, // ← poin per soal (default: 4)
```

Total nilai = jumlah benar × poin per soal

---

## 📝 Cara Mengganti Soal

Buka file **`questions.js`**:

```javascript
{
    id: 1,
    question: "Teks soal...",
    options: [
        "A. Pilihan A",
        "B. Pilihan B",
        "C. Pilihan C",
        "D. Pilihan D",
        "E. Pilihan E"
    ],
    answer: 1   // A=0, B=1, C=2, D=3, E=4
}
```

---

## 🚀 Cara Upload ke GitHub Pages

1. Buat repository baru di GitHub
2. Upload 5 file: `index.html`, `style.css`, `script.js`, `questions.js`, `README.md`
3. Masuk **Settings** → **Pages**
4. Pilih branch **main** → Save
5. Tunggu 1-3 menit
6. Salin URL: `https://username.github.io/nama-repo/`
7. Bagikan ke siswa

---

## 📱 Alur Ujian

```
HALAMAN PEMBUKA → IDENTITAS → PETUNJUK
         ↓
MULAI UJIAN (timer 3 menit/soal)
         ↓
SOAL 1 → SOAL 2 → ... → SOAL 25
         ↓
SUBMIT / AUTO-STOP (jika keluar halaman)
         ↓
HASIL (nilai 0-100)
         ↓
TOMBOL KIRIM KE WHATSAPP GURU
```

---

## 🔄 Reset Ujian untuk Siswa

Buka Developer Tools → Application → Local Storage → Clear

Atau jalankan di console:
```javascript
localStorage.clear();
```

---

## 📞 Kontak

**SMK Negeri 1 Lintau Buo**  
Konsentrasi Keahlian: Rekayasa Perangkat Lunak (RPL)