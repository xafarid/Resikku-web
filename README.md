# Resikku

Resikku adalah website storefront untuk produk sabun kertas (*paper soap*) yang berfokus pada pengalaman belanja sederhana, interaktif, dan responsif. Aplikasi menampilkan katalog produk, paket bundle, detail produk, perbandingan produk, wishlist, keranjang belanja, FAQ, testimonial, serta alur checkout yang diteruskan ke WhatsApp.

Proyek ini dibangun sebagai aplikasi web berbasis **Next.js + React + TypeScript**, menggunakan Tailwind CSS dan komponen UI berbasis Radix/shadcn-style. Data produk dan testimonial saat ini didefinisikan di sisi frontend, sementara keranjang belanja dipersistenkan ke `localStorage`. Konfigurasi Next.js menggunakan **static export**, sehingga hasil build dapat disajikan sebagai aset statis.

## Fitur Utama

- **Landing page storefront lengkap** — terdiri dari hero, cara kerja produk, katalog, bundle, about, perbandingan, FAQ, testimonial, dan footer.
- **Katalog produk** — menampilkan varian `Matcha Mint`, `Sweet Cherry`, dan bundle `Duo Varian`, lengkap dengan harga, rating, aroma, jumlah lembar, deskripsi, status stok, dan badge produk.
- **Quick View / detail produk** — pengguna dapat membuka detail produk melalui modal tanpa meninggalkan halaman utama.
- **Keranjang belanja** — tambah produk, tambah bundle, ubah jumlah, hapus item, kosongkan keranjang, dan melihat subtotal.
- **Persistensi keranjang** — isi keranjang disimpan di browser menggunakan Zustand `persist` + `localStorage`, sehingga tetap tersedia setelah halaman dimuat ulang pada browser yang sama.
- **Wishlist** — pengguna dapat menyimpan produk favorit untuk akses kembali.
- **Perbandingan produk** — produk dapat dipilih untuk dibandingkan berdasarkan jumlah lembar, aroma, kategori, dan harga, dengan batas maksimal 3 produk.
- **Bundle hemat** — tersedia bundle `Duo Varian` yang menggabungkan Matcha Mint dan Sweet Cherry dengan harga paket khusus.
- **Checkout via WhatsApp** — detail item, jumlah, dan total keranjang dirangkai menjadi pesan WhatsApp lalu dibuka di tab baru. Tidak ada pembuatan order di server pada implementasi saat ini.
- **Indikator gratis ongkir** — keranjang menampilkan progres menuju ambang gratis ongkir Rp150.000.
- **Interaksi dan animasi** — menggunakan Framer Motion, toast notification, scroll progress, back-to-top, loading state, dan animasi micro-interaction pada elemen belanja.
- **Responsive UI** — antarmuka menggunakan Tailwind CSS dan komponen UI modular untuk mendukung desktop maupun mobile.
- **Static export** — aplikasi dikonfigurasi dengan `output: "export"`, cocok untuk hosting statis.

## Tech Stack

### Frontend

- **Next.js 16** — framework React dan routing aplikasi.
- **React 19** — library UI utama.
- **TypeScript 5** — static typing pada source code.
- **Tailwind CSS 4** — utility-first styling.
- **Radix UI** — primitive komponen UI yang aksesibel.
- **Framer Motion** — animasi dan transition.
- **Lucide React** — ikon antarmuka.

### State & Data

- **Zustand** — state management untuk cart dan fitur interaktif lainnya.
- **localStorage** — persistensi item keranjang di browser.
- **Data produk statis** — produk dan testimonial saat ini berasal dari `src/lib/products.ts`.

### Utility & UI Support

- **React Hook Form + Zod** — form handling dan validasi.
- **TanStack React Query / React Table** — tersedia sebagai dependency untuk kebutuhan data/query dan tabel.
- **Recharts** — tersedia untuk visualisasi data.
- **Sonner** — toast notification.
- **React Markdown / MDX Editor** — dukungan konten markdown/MDX.
- **Sharp** — image processing untuk kebutuhan Next.js.
- **ESLint** — linting kode.

### Build & Deployment

- **Node.js / npm** atau **Bun** untuk instalasi dependency.
- **Next.js Static Export** — hasil produksi berupa aset statis.
- Repository menggunakan **MIT License**.

## Cara Instalasi / Penggunaan

### Prasyarat

Pastikan lingkungan pengembangan memiliki:

- Node.js versi yang kompatibel dengan Next.js 16.
- npm atau Bun.
- Git.

### 1. Clone repository

```bash
git clone https://github.com/xafarid/Resikku-web.git
cd Resikku-web
```

### 2. Install dependency

Menggunakan npm:

```bash
npm install
```

Atau menggunakan Bun:

```bash
bun install
```

> Repository menyertakan `package-lock.json` dan `bun.lock`, sehingga keduanya dapat digunakan sebagai lockfile sesuai package manager yang dipilih.

### 3. Menjalankan aplikasi saat development

`package.json` saat ini belum menyediakan script `dev`. Karena project menggunakan Next.js, jalankan development server secara langsung:

```bash
npx next dev
```

Atau dengan Bun:

```bash
bunx next dev
```

Setelah server berjalan, buka alamat yang ditampilkan oleh Next.js:

```text
http://localhost:8080
```

### 4. Menjalankan lint

```bash
npm run lint
```

### 5. Build production

```bash
npm run build
```

Konfigurasi `next.config.ts` menggunakan:

```ts
output: "export"
```

Artinya build diarahkan ke static export. Setelah build berhasil, hasil ekspor dapat digunakan pada hosting statis.

### 6. Preview hasil build

Repository belum menyediakan script `start` khusus untuk menjalankan hasil static export sebagai production server. Untuk preview lokal, gunakan web server statis setelah proses build selesai, misalnya:

```bash
npx serve out
```

> Direktori output static export mengikuti konfigurasi Next.js dan proyek saat ini menyimpan folder hasil build di `out/`.

## Struktur Project

```text
Resikku-web/
├── db/                    # Database/file lokal yang disertakan repository
├── mini-services/         # Placeholder untuk mini service tambahan
├── out/dev/               # Output/build artifact yang disimpan di repository
├── public/                # Asset publik: gambar, video, logo, favicon
├── src/
│   ├── app/               # Entry point App Router, layout, halaman utama, global CSS
│   ├── components/
│   │   ├── interactive/  # Cart, modal, contact form, back-to-top, dll.
│   │   ├── sections/     # Section utama landing page
│   │   └── ui/           # Komponen UI reusable
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Data produk, Zustand store, helper, utility
├── components.json        # Konfigurasi komponen UI
├── next.config.ts         # Konfigurasi Next.js + static export
├── package.json           # Dependency dan npm scripts
├── tailwind.config.ts     # Konfigurasi Tailwind
├── tsconfig.json          # Konfigurasi TypeScript
└── eslint.config.mjs      # Konfigurasi ESLint
```

## Catatan Implementasi

- Produk dan testimonial bukan berasal dari database/API eksternal pada implementasi yang diperiksa; data utama didefinisikan di `src/lib/products.ts`.
- Keranjang menggunakan Zustand dan disimpan di `localStorage` dengan key `resikku-cart`.
- Checkout mengarahkan pengguna langsung ke WhatsApp berdasarkan isi keranjang. Saat ini tidak ada backend order-management atau payment gateway di alur checkout tersebut.
- Folder `mini-services` hanya berisi placeholder `.gitkeep`, sehingga belum menunjukkan service backend terpisah.
- Fitur seperti AI chat dan beberapa section interaktif tertentu terlihat masih disiapkan/ditonaktifkan di source code, sehingga belum sebaiknya dianggap sebagai fitur aktif utama.

## License

Project ini menggunakan **MIT License**. Lihat file [`LICENSE`](./LICENSE) untuk detail lengkap.

## Repository

GitHub: https://github.com/xafarid/Resikku-web
