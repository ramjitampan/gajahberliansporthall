# BadminLap.id — Dokumentasi Project

Frontend booking lapangan badminton untuk BadminLap.id, dibuat dengan React, Vite, JavaScript, dan Tailwind CSS.

## Ringkasan

BadminLap.id membantu pengguna melihat informasi harga dan memilih jadwal lapangan badminton. Repository ini berisi **frontend saja**; belum tersedia server Express, database, ataupun integrasi payment gateway. Booking dan pembayaran saat ini berjalan dalam mode mock.

## Stack dan struktur

- React + Vite, JavaScript (JSX); bukan TypeScript.
- Tailwind CSS untuk styling.
- React Router untuk navigasi halaman.
- Framer Motion untuk transisi dan reveal ringan.
- Lucide React untuk ikon.

```text
src/
├── components/       # Navbar, footer, UI reusable, section Beranda
├── data/             # Data mock lapangan, fasilitas, harga, dan jadwal
├── hooks/             # State booking React Context
├── layouts/           # Layout bersama halaman
├── pages/             # Beranda, booking, pricelist, fasilitas, checkout
├── services/          # Mock ketersediaan dan pembayaran
└── utils/             # Format mata uang dan kalkulasi booking
```

### Halaman

| Route | Kegunaan |
| --- | --- |
| `/` | Beranda: pengenalan, solusi, keunggulan, fasilitas, alur booking |
| `/booking` | Pilih tanggal, lapangan, jam mulai, dan durasi |
| `/booking/data-pemesan` | Data pemesan dan ringkasan jadwal |
| `/booking/pembayaran` | Pembayaran QRIS demo dan simulasi status |
| `/booking/konfirmasi` | Bukti booking demo yang bisa dicetak |
| `/daftar-harga` | Rincian sewa, biaya layanan, dan estimasi total |
| `/tentang` | Cerita dan prinsip BadminLap.id |
| `/fasilitas` | Galeri fasilitas dengan konten visual placeholder |

## Arah visual

Identitasnya mengambil suasana lapangan indoor yang tenang, dewasa, dan premium—bukan dashboard atau template SaaS. Beranda menggunakan deep forest green dan emerald gelap sebagai bidang utama; section sage, charcoal, dan cream memberi jeda agar halaman tidak terasa datar. Foto lapangan diberi crop serta overlay gelap supaya menyatu dengan bidang warna dan teks tetap terbaca.

| Peran | Warna |
| --- | --- |
| Deep forest / hero | `#102A22` |
| Emerald gelap | `#142E26`, `#182F27`, `#253C32` |
| Sage | `#A9BDA5` |
| Cream hangat | `#F7F3EA` |
| Ivory | `#FFFDF8` |
| Champagne | `#C8AE78` |
| Taupe / garis | `#D8D0C0` |

Tipografi memakai DM Sans untuk body dan DM Serif Display untuk aksen editorial. Efek kaca dipakai terbatas pada panel sorotan: permukaan transparan, blur, garis tipis, dan bayangan lembut di atas latar gelap. Fokus keyboard terlihat jelas; animasi menghormati preferensi reduced motion.

## Pengalaman pengguna dan alur booking

1. Pengguna mengenali layanan dari Beranda dan dapat membuka Pricelist sebelum booking.
2. Di `/booking`, pengguna memilih tanggal yang tidak lampau, salah satu dari tiga lapangan mock, jam mulai, dan durasi 1–4 jam.
3. Slot mock yang sudah dipesan dinonaktifkan. Ketersediaan diperiksa pada setiap jam dalam seluruh durasi dan tidak boleh melewati jam tutup (22.00).
4. Ringkasan menampilkan lapangan, tanggal, waktu, durasi, biaya sewa, biaya layanan, dan total.
5. Data pemesan divalidasi di browser. State booking disimpan pada `localStorage` agar tetap tersedia ketika berpindah halaman atau kembali.
6. Kode booking dibuat di frontend; halaman QRIS dan tombol cek/gagal/berhasil/kedaluwarsa hanya simulasi. Konfirmasi berhasil bukan verifikasi pembayaran nyata.

Harga mock:

```text
Sewa lapangan = Rp40.000 × durasi (jam)
Biaya layanan = Rp2.000 per booking, satu kali
Total          = sewa lapangan + biaya layanan

1 jam = Rp42.000
2 jam = Rp82.000
3 jam = Rp122.000
```

Mock jadwal ada di `src/data/schedules.js`; harga di `src/data/prices.js`; aturan ketersediaan di `src/services/mockBookingService.js`. Perbarui sumber-sumber tersebut saat mengganti data demo, atau ganti mock service dengan API setelah backend tersedia.

## Menjalankan frontend

```bash
npm install
npm run dev
npm run build
```

Vite default berjalan di `http://localhost:5173`. Untuk mengakses dari perangkat lain atau membagikan preview frontend:

```bash
npm run dev -- --host 0.0.0.0 --port 5173
npx localtunnel --port 5173
```

Gunakan URL HTTPS yang dicetak LocalTunnel. URL frontend tunnel adalah **origin browser**; URL itu yang perlu diizinkan backend melalui CORS. Jika browser pengguna harus mengakses backend lokal, backend juga perlu URL yang bisa dijangkau publik; `localhost` di browser pengguna menunjuk ke perangkat pengguna, bukan komputer developer.

## Panduan integrasi backend

Langkah berikut adalah **rekomendasi integrasi**, bukan API yang sudah tersedia di repository ini.

### 1. Tetapkan tanggung jawab backend

Backend harus menjadi sumber kebenaran untuk jadwal, harga, pembuatan booking, penguncian slot, dan status pembayaran. Jangan mempercayai total harga, ketersediaan slot, `paid: true`, atau hasil pembayaran yang hanya dikirim dari frontend.

### 2. Siapkan endpoint yang dibutuhkan frontend

Kontrak awal yang bisa disepakati tim frontend/backend:

| Method dan path (usulan) | Fungsi |
| --- | --- |
| `GET /api/courts` | Daftar lapangan aktif |
| `GET /api/availability?courtId=...&date=YYYY-MM-DD&duration=...` | Slot tersedia untuk seluruh durasi |
| `POST /api/bookings` | Validasi jadwal dan buat booking sementara secara atomik |
| `GET /api/bookings/:bookingCode` | Ambil ringkasan dan status booking |
| `POST /api/bookings/:bookingCode/payment` | Buat instruksi/QRIS melalui payment gateway |
| `GET /api/payments/:paymentId/status` | Ambil status pembayaran dari backend |
| `POST /api/payments/webhook` | Terima notifikasi gateway-ke-backend dan konfirmasi booking |

Backend menghitung ulang `Rp40.000 × durasi + Rp2.000`, memvalidasi batas jam serta konflik jadwal di transaksi database, dan menetapkan kedaluwarsa booking sementara. Simpan idempotency key untuk mencegah booking/pembayaran ganda.

### 3. Konfigurasikan CORS

Di backend Express, parse daftar origin dari environment variable, pisahkan dengan koma, dan trim whitespace. Jangan gunakan `origin: "*"` bersama credentials. Jika autentikasi memakai cookie, pertahankan `credentials: true` di server dan gunakan `credentials: "include"` pada request frontend; atur cookie `SameSite`/`Secure` sesuai HTTPS.

Contoh value pada environment backend (ganti dengan origin frontend yang benar-benar aktif):

```env
CORS_ORIGIN=http://localhost:5173,https://<subdomain-frontend-aktif>.loca.lt
```

Untuk Railway, set `CORS_ORIGIN` pada **Variables service backend**, bukan di repository frontend. Tambahkan origin deployment frontend permanen bila sudah ada. LocalTunnel bisa memberi URL berbeda setiap sesi; perbarui daftar saat URL berubah.

### 4. Atur base URL API di frontend

Setelah endpoint backend siap, tambahkan file `.env.local` (file `.env*` di-ignore oleh Git) sesuai lingkungan:

```env
# Backend berjalan di komputer yang sama
VITE_API_URL=http://localhost:<port-backend>

# Atau backend Railway / tunnel backend yang bisa dijangkau browser
VITE_API_URL=https://<domain-backend-aktif>
```

Panggil `import.meta.env.VITE_API_URL` dari service API frontend, bukan dari komponen UI. Jika halaman frontend dibuka melalui tunnel, **jangan** gunakan `localhost` sebagai URL backend kecuali backend berjalan di perangkat pengunjung sendiri. Gunakan domain Railway atau URL tunnel backend.

### 5. Ganti mock secara bertahap

1. Sepakati schema request/response, format tanggal/waktu, zona waktu, dan enum status dengan tim backend.
2. Buat satu API client yang membaca `VITE_API_URL`, menangani error/loading, dan mengirim credentials hanya bila autentikasi cookie memang dipakai.
3. Ganti `mockBookingService` dengan pemeriksaan availability API; server tetap melakukan validasi final saat membuat booking.
4. Ganti pembuatan kode booking lokal dengan response `POST /api/bookings`; simpan hanya identifier dan data tampilan yang diperlukan di browser.
5. Ganti simulasi QRIS dengan instruksi dari backend. Frontend hanya menampilkan status hasil polling; webhook payment gateway memverifikasi pembayaran di backend.
6. Uji konflik dua pemesan di slot sama, pembayaran gagal/kedaluwarsa, percobaan ulang, refresh halaman, dan validasi nominal.

Jangan pernah menaruh secret payment gateway atau kredensial database di variabel `VITE_*`; nilai tersebut masuk ke bundle browser. Simpan secret hanya pada environment backend.

## Batasan mode demo

- Lapangan, jadwal, dan harga adalah data frontend mock, bukan ketersediaan venue live.
- State di `localStorage` hanya berlaku pada browser/perangkat yang sama; belum ada akun atau sinkronisasi antarpengguna.
- QRIS bukan QR pembayaran nyata dan tidak memanggil payment gateway.
- Tombol simulasi berhasil hanya menguji tampilan alur frontend. Booking dan pembayaran produksi memerlukan backend, database, serta verifikasi gateway.
