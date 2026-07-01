# Website Portfolio & CV — Yedi Supriadi

Satu set website statis (HTML, CSS, JavaScript) yang siap pakai, dengan desain modern
dan animasi halus. Tidak memerlukan framework atau proses build — cukup buka di browser.

## 📁 Struktur Folder

```
Web Yedi/
├── index.html              → Halaman utama (semua konten)
├── css/
│   └── style.css           → Seluruh styling & animasi
├── js/
│   └── main.js             → Interaksi (menu, filter, lightbox, dll.)
├── assets/
│   ├── favicon.svg         → Ikon tab browser
│   ├── cv-yedi-supriadi.pdf→ (TARUH FILE CV DI SINI agar tombol "Unduh CV" berfungsi)
│   └── images/
│       ├── profile.svg     → Foto profil (placeholder)
│       └── portfolio-1..6.svg → Foto portfolio (placeholder)
└── README.md
```

## 🚀 Cara Membuka

- **Cepat:** klik dua kali `index.html`.
- **Disarankan (agar semua aset ter-load sempurna):** jalankan server lokal, misalnya:
  - Python: `python -m http.server 8000` lalu buka `http://localhost:8000`
  - Node: `npx serve`

## ✏️ Cara Mengisi dengan Data & Foto Asli

### 1. Foto Profil
Ganti file `assets/images/profile.svg` dengan foto asli Yedi Supriadi
(format `.jpg`/`.png`). Jika nama file berbeda, sesuaikan `src` pada bagian
`<!-- Ganti src ... -->` di dalam `index.html` (bagian Hero).

### 2. Foto Portfolio
Ganti `assets/images/portfolio-1.svg` … `portfolio-6.svg` dengan foto karya asli.
Di `index.html` bagian **Portfolio**, tiap item punya:
- `src` → alamat foto
- `data-cat` → kategori (`desain`, `foto`, `proyek`) untuk fitur filter
- `<h4>` dan `<span>` → judul & kategori yang tampil saat hover

Ingin menambah item? Salin satu blok `<figure class="card">…</figure>`.

### 3. Teks & Identitas
Semua teks berbahasa Indonesia dan mudah diedit langsung di `index.html`:
- **Hero** — nama, peran (animasi ketik ada di `js/main.js` variabel `roles`).
- **Tentang** — biografi & keahlian (persentase skill di atribut `data-w`).
- **Pengalaman** — timeline riwayat karier & pendidikan.
- **Statistik** — angka pada atribut `data-count`.
- **Testimoni** — ganti nama & kutipan klien.
- **Kontak** — email, telepon, dan tautan media sosial (cari `href="#"`).

### 4. CV PDF
Letakkan file CV bernama `cv-yedi-supriadi.pdf` di dalam folder `assets/`
agar tombol **Unduh CV** langsung berfungsi.

### 5. Warna / Tema
Palet warna diatur di bagian paling atas `css/style.css` (blok `:root`).
Ubah `--accent`, `--accent-2`, `--accent-3` untuk mengganti warna aksen.

## ✨ Fitur

- Preloader, custom cursor, dan progress bar gulir
- Animasi teks mengetik & reveal saat scroll
- Efek tilt 3D pada foto profil
- Filter portfolio + lightbox (galeri pop-up)
- Penghitung angka animasi & bar keahlian
- Timeline karier, testimoni, form kontak (dengan validasi)
- Responsif penuh (desktop, tablet, ponsel) + dukungan *reduced motion*

## 🔗 Mengaktifkan Form Kontak (opsional)
Form saat ini hanya demo (tidak mengirim email). Untuk pengiriman nyata,
hubungkan ke layanan gratis seperti **Formspree** atau **EmailJS** —
lihat komentar pada fungsi form di `js/main.js`.

---
Dibuat sebagai mockup awal. Silakan sesuaikan seluruh konten sesuai kebutuhan.
