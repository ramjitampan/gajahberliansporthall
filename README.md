<div align="center">

# 🏸 gajahberliansporthall

### Court Booking, Made Simple.

**Frontend pemesanan lapangan badminton dengan pengalaman booking yang sederhana, responsif, dan terstruktur.**

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Status](https://img.shields.io/badge/Status-Frontend_Demo-orange?style=flat-square)

**[Overview](#-overview) · [Tech Stack](#-tech-stack) · [Booking Flow](#-booking-flow) · [Backend Integration](#-backend-integration-guide) · [Getting Started](#-getting-started)**

</div>

---

> [!IMPORTANT]
> **Status proyek: Frontend demo / mock.** Repository ini belum menyediakan Express API, database, sinkronisasi jadwal real-time, atau payment gateway. Seluruh booking dan pembayaran masih disimulasikan di browser. Dokumentasi endpoint di bawah adalah **usulan kontrak**, bukan API yang telah tersedia.

## ✦ Overview

**BadminLap.id** membantu pengguna menjelajahi fasilitas, memeriksa rincian harga, memilih jadwal lapangan, hingga melihat bukti pemesanan dalam satu alur yang konsisten.

Saat ini frontend sudah mencakup:

- Informasi venue, fasilitas, dan daftar harga.
- Pemilihan tanggal, lapangan, jam mulai, dan durasi sewa.
- Validasi ketersediaan berdasarkan **data mock**.
- Form data pemesan dan kalkulasi total biaya.
- Simulasi QRIS, status pembayaran, dan bukti booking yang dapat dicetak.
- Penyimpanan sementara state booking melalui `localStorage` pada perangkat yang sama.

## 🧩 Tech Stack

| Kategori | Teknologi | Kegunaan |
| :-- | :-- | :-- |
| UI | React + JSX | Komponen dan antarmuka pengguna |
| Build Tool | Vite | Development server dan production build |
| Bahasa | JavaScript | Logika frontend, **bukan TypeScript** |
| Styling | Tailwind CSS | Styling dan layout responsif |
| Routing | React Router | Navigasi antarhalaman |
| Animasi | Framer Motion | Transisi dan reveal ringan |
| Ikon | Lucide React | Ikon antarmuka |
| State | React Context + `localStorage` | State booking dan persistensi lokal |

### Project Structure

```text
src/
├── components/       # Navbar, footer, elemen UI reusable, section Beranda
├── data/             # Mock data lapangan, fasilitas, harga, dan jadwal
├── hooks/            # State booking berbasis React Context
├── layouts/          # Layout bersama antarhalaman
├── pages/            # Beranda, booking, harga, fasilitas, checkout
├── services/         # Mock ketersediaan dan pembayaran
└── utils/            # Formatter mata uang dan kalkulasi booking
```

### Routes

| Route | Deskripsi |
| :-- | :-- |
| `/` | Beranda, keunggulan, fasilitas, dan alur booking |
| `/booking` | Pilih tanggal, lapangan, jam mulai, dan durasi |
| `/booking/data-pemesan` | Isi identitas pemesan dan cek ringkasan |
| `/booking/pembayaran` | QRIS demo dan simulasi status pembayaran |
| `/booking/konfirmasi` | Bukti booking demo yang dapat dicetak |
| `/daftar-harga` | Rincian tarif, biaya layanan, dan estimasi total |
| `/tentang` | Cerita dan prinsip BadminLap.id |
| `/fasilitas` | Galeri fasilitas dengan placeholder visual |

## 🎨 Design Direction

Pendekatan visual BadminLap.id terinspirasi dari suasana lapangan badminton indoor: **tenang, dewasa, dan premium**. Desainnya lebih dekat ke identitas venue olahraga dibanding template dashboard SaaS.

| Token | Hex | Penggunaan |
| :-- | :-- | :-- |
| Deep Forest | `#102A22` | Hero dan latar utama |
| Dark Emerald | `#142E26` · `#182F27` · `#253C32` | Bidang dan kedalaman visual |
| Sage | `#A9BDA5` | Aksen lembut |
| Warm Cream | `#F7F3EA` | Section terang |
| Ivory | `#FFFDF8` | Permukaan dan kontras |
| Champagne | `#C8AE78` | Aksen premium |
| Taupe | `#D8D0C0` | Garis dan pemisah |

**Typography:** DM Sans untuk body, DM Serif Display untuk sentuhan editorial.

Gambar lapangan menggunakan crop dan overlay gelap untuk menjaga keterbacaan. Efek glassmorphism hanya digunakan pada panel tertentu. Fokus keyboard dibuat terlihat dan animasi mengikuti preferensi **reduced motion**.

## 🔄 Booking Flow

```text
Beranda / Daftar Harga
         │
         ▼
Pilih Tanggal + Lapangan
         │
         ▼
Pilih Jam Mulai + Durasi
         │
         ▼
Validasi Slot (Mock)
         │
         ▼
Data Pemesan + Ringkasan
         │
         ▼
QRIS Demo + Simulasi Status
         │
         ▼
Konfirmasi / Bukti Booking Demo
```

### Current Business Rules

1. Tanggal booking tidak boleh berada di masa lalu.
2. Terdapat **3 lapangan mock** yang dapat dipilih.
3. Durasi pemesanan adalah **1–4 jam**.
4. Ketersediaan dicek pada **setiap jam** dalam rentang durasi; slot mock yang terisi tidak dapat dipilih.
5. Pemesanan tidak boleh melewati jam tutup **22.00**.
6. Data pemesan divalidasi di browser, sementara state disimpan di `localStorage`.
7. Kode booking dibuat di frontend. **Status pembayaran sukses bukan bukti pembayaran nyata.**

### Pricing (Mock)

| Komponen | Nominal |
| :-- | --: |
| Tarif sewa | Rp40.000 / jam |
| Biaya layanan | Rp2.000 / booking |
| Total 1 jam | **Rp42.000** |
| Total 2 jam | **Rp82.000** |
| Total 3 jam | **Rp122.000** |
| Total 4 jam | **Rp162.000** |

**Formula:** `total = (40_000 × durasiJam) + 2_000`

> [!NOTE]
> Sumber data demo: `src/data/schedules.js` (jadwal), `src/data/prices.js` (harga), dan `src/services/mockBookingService.js` (aturan ketersediaan). Saat backend siap, ganti akses mock melalui service API, bukan langsung dari komponen UI.

## 🚀 Getting Started

### Prerequisites

- Node.js dan npm yang kompatibel dengan versi Vite pada proyek.
- Git (opsional, untuk cloning repository).

### Local Development

```bash
npm install
npm run dev
```

Frontend secara default dapat diakses melalui **http://localhost:5173** (jika port tersedia).

### Production Build

```bash
npm run build
```

### Network / Temporary Preview (Opsional)

```bash
npm run dev -- --host 0.0.0.0 --port 5173
npx localtunnel --port 5173
```

Gunakan URL HTTPS yang diberikan LocalTunnel. Preview publik ini bersifat sementara dan tidak disarankan sebagai deployment produksi.

> **CORS reminder:** URL tunnel frontend merupakan **browser origin**. Backend perlu mengizinkan origin tersebut. Apabila frontend diakses dari perangkat lain, `localhost` sebagai API URL akan menunjuk ke perangkat pengunjung, **bukan** mesin developer. Backend harus dapat diakses melalui alamat jaringan atau domain yang sesuai.

---

## 🔌 Backend Integration Guide

Bagian ini merupakan **panduan handoff bagi backend developer**. Seluruh endpoint di sini adalah rekomendasi awal dan perlu disepakati sebelum implementasi.

### 1. Backend Responsibilities

Backend harus menjadi **single source of truth** untuk:

- Data lapangan aktif dan aturan operasional.
- Jadwal, ketersediaan, dan konflik pemesanan.
- Harga, biaya tambahan, serta nominal final.
- Pembuatan booking sementara dan masa kedaluwarsanya.
- Pembuatan instruksi pembayaran serta verifikasi status melalui payment gateway.

**Jangan percaya** nominal yang dikirim frontend, klaim slot tersedia, `paid: true`, atau status pembayaran dari tombol simulasi. Server wajib menghitung dan memvalidasi ulang.

### 2. Proposed API Contract

Base path usulan: `/api`

| Method | Endpoint | Tujuan |
| :-- | :-- | :-- |
| `GET` | `/api/courts` | Mengambil daftar lapangan aktif |
| `GET` | `/api/availability?courtId=...&date=YYYY-MM-DD&duration=...` | Mengambil slot tersedia sesuai durasi |
| `POST` | `/api/bookings` | Validasi akhir dan membuat booking sementara secara atomik |
| `GET` | `/api/bookings/:bookingCode` | Ringkasan dan status booking |
| `POST` | `/api/bookings/:bookingCode/payment` | Membuat instruksi pembayaran / QRIS dari gateway |
| `GET` | `/api/payments/:paymentId/status` | Membaca status pembayaran dari backend |
| `POST` | `/api/payments/webhook` | Memproses notifikasi gateway secara aman |

**Kontrak yang perlu disepakati:** struktur request/response JSON, field wajib, error code, format tanggal dan zona waktu (misalnya `Asia/Jakarta` jika sesuai lokasi venue), status booking/pembayaran, serta aturan expiry. Endpoint webhook adalah **server-to-server**, bukan dipanggil oleh frontend.

### 3. Booking & Payment Integrity

Backend perlu menerapkan ketentuan berikut:

1. Validasi ulang lapangan, tanggal, waktu, durasi, dan jam tutup.
2. Hitung kembali nominal di server: `Rp40.000 × durasiJam + Rp2.000` (saat tarif demo masih digunakan).
3. Cegah **double booking** menggunakan transaksi database dan mekanisme penguncian/constraint yang sesuai.
4. Terapkan expiry untuk booking sementara agar slot tidak tertahan selamanya.
5. Gunakan **idempotency key** atau proteksi serupa untuk mencegah request booking/pembayaran ganda.
6. Verifikasi keaslian webhook gateway, nominal, identitas transaksi, dan status sebelum mengonfirmasi pembayaran.
7. Pastikan pemrosesan webhook idempotent, termasuk ketika event dikirim berulang.

### 4. Environment & CORS

Contoh **environment backend Express**:

```dotenv
# Daftar origin frontend yang diizinkan (dipisahkan koma)
CORS_ORIGIN=http://localhost:5173,https://subdomain-frontend-aktif.loca.lt
```

Saat menerapkan CORS:

- Parse `CORS_ORIGIN` menjadi array, `trim()` tiap entri, dan abaikan entri kosong.
- Hindari `Access-Control-Allow-Origin: *` ketika menggunakan credentials.
- Jika memakai cookie auth, sesuaikan `credentials: true` di server, `credentials: 'include'` pada client, dan konfigurasi `SameSite`/`Secure` sesuai skema HTTPS.
- Di Railway, set `CORS_ORIGIN` pada **Variables service backend**, bukan pada frontend.
- URL LocalTunnel dapat berubah tiap sesi. Perbarui daftar origin bila alamat berubah.

### 5. Frontend API Base URL

Setelah API tersedia, buat `.env.local` untuk konfigurasi frontend:

```dotenv
# Pilih SATU sesuai environment aktif:
VITE_API_URL=http://localhost:3000
# VITE_API_URL=https://domain-backend-aktif.example.com
```

Port `3000` hanya **contoh**, bukan port backend yang telah dipastikan tersedia.

Baca variabel melalui service terpusat:

```js
const apiBaseUrl = import.meta.env.VITE_API_URL;
```

Jangan menyebarkan request API langsung ke banyak komponen. Pastikan file environment lokal tidak ikut di-commit, dan konfigurasi host selalu sesuai lingkungan pengguna.

> [!CAUTION]
> **Jangan simpan secret** payment gateway, database URL, private key, atau token rahasia di variabel `VITE_*`. Semua variabel `VITE_*` yang digunakan oleh Vite berpotensi masuk ke bundle browser. Secret harus tinggal di environment backend.

### 6. Migration Plan: Mock → Real API

- [ ] Sepakati schema API, format waktu, timezone, dan enum status.
- [ ] Buat API client terpusat dengan penanganan loading, error, dan timeout.
- [ ] Ganti availability mock dengan `GET /api/availability`.
- [ ] Hubungkan checkout ke `POST /api/bookings`; gunakan kode booking dari server.
- [ ] Ganti QRIS demo dengan instruksi gateway dari backend.
- [ ] Terapkan polling status pembayaran melalui backend; gunakan webhook untuk konfirmasi sebenarnya.
- [ ] Sinkronkan data setelah refresh tanpa mengandalkan `localStorage` sebagai sumber kebenaran.
- [ ] Uji skenario konflik, pembayaran gagal, expiry, retry, dan nominal yang dimodifikasi dari browser.

### 7. Suggested QA Scenarios

| Skenario | Hasil yang diharapkan |
| :-- | :-- |
| Dua user memilih slot sama | Hanya satu booking yang berhasil mengunci slot |
| Durasi melewati jam 22.00 | Ditolak oleh backend |
| Total harga diedit lewat DevTools | Server tetap menghitung nominal yang benar |
| Pengguna refresh saat pembayaran | Status dapat dipulihkan dari server |
| Webhook dikirim lebih dari sekali | Pembayaran tidak diproses ganda |
| Booking belum dibayar hingga expiry | Slot dilepas sesuai kebijakan |
| Pembayaran gagal / dibatalkan | Status booking dan pembayaran tetap konsisten |

## ⚠️ Demo Limitations

| Area | Kondisi saat ini |
| :-- | :-- |
| Lapangan & jadwal | Data mock, bukan inventaris live |
| Harga | Konstanta frontend untuk keperluan demo |
| Penyimpanan booking | `localStorage`, hanya pada browser/perangkat yang sama |
| Autentikasi & database | Belum terintegrasi |
| QRIS | Visual simulasi, tidak dapat digunakan untuk pembayaran nyata |
| Konfirmasi pembayaran | Perubahan status simulasi, bukan hasil verifikasi gateway |
| Multi-user concurrency | Belum aman tanpa backend dan transaksi database |

---

<div align="center">

### for nobel
![Actually Genius](https://media1.tenor.com/m/XftGx4TfEIgAAAAC/actually-genius-youtube-thumbnail.gif)

</div>
