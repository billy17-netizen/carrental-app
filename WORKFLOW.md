# Alur Kerja Car Rental Landing Page

## Overview
Project ini sekarang dirancang sebagai landing page yang mengarahkan semua booking ke WhatsApp untuk proses manual. Tidak ada sistem booking otomatis atau database.

## Alur Kerja Baru

### 1. Landing Page (Home)
- Menampilkan hero section dengan form pencarian
- Form pencarian akan mengumpulkan: lokasi, tanggal ambil, tanggal kembali
- Ketika submit, form akan redirect ke WhatsApp dengan detail pencarian

### 2. Halaman Daftar Mobil (/cars)
- Menampilkan grid mobil yang tersedia
- Setiap mobil memiliki tombol "Chat Sekarang"
- Ketika diklik, akan redirect ke WhatsApp dengan detail mobil

### 3. WhatsApp Integration
- Semua aksi booking diarahkan ke WhatsApp
- Pesan otomatis dibuat dengan detail yang relevan
- Nomor WhatsApp dapat dikonfigurasi di `src/lib/config.ts`

## Komponen yang Diubah

### SearchBar Component
- Button "Cari Mobil" → "Chat WhatsApp"
- Submit form membuat pesan WhatsApp dengan detail pencarian
- Icon WhatsApp ditambahkan

### CarCard Component
- Button "Pilih Mobil" → "Chat Sekarang"
- Click handler membuat pesan WhatsApp dengan detail mobil
- Tidak ada redirect ke halaman detail mobil

### BookingForm Component
- Button "Lanjutkan Pemesanan" → "Chat via WhatsApp"
- Form submit membuat pesan WhatsApp dengan semua detail booking
- Dapat digunakan jika ada halaman khusus booking

## Konfigurasi

### File `src/lib/config.ts`
```typescript
export const config = {
  whatsapp: {
    number: "6281234567890", // Ganti dengan nomor bisnis Anda
    baseUrl: "https://wa.me/",
  },
  business: {
    name: "Car Rental Service",
    email: "info@carrental.com",
    phone: "+62 812-3456-7890",
  }
};
```

### Cara Mengubah Nomor WhatsApp
1. Buka file `src/lib/config.ts`
2. Ganti nilai `number` dengan nomor WhatsApp bisnis Anda
3. Format: "62XXXXXXXXXX" (tanpa tanda + dan spasi)

## Halaman yang Dihapus
- `/cars/[id]` - Halaman detail mobil tidak diperlukan karena semua redirect ke WhatsApp

## Fitur Landing Page
- ✅ Hero section dengan search form
- ✅ Daftar mobil dengan filter
- ✅ WhatsApp integration
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Custom date picker
- ✅ Testimonials section
- ✅ Features section

## Cara Menjalankan
```bash
npm install
npm run dev
```

## Catatan Penting
- Pastikan nomor WhatsApp sudah dikonfigurasi dengan benar
- Test semua tombol untuk memastikan redirect WhatsApp berfungsi
- Pesan WhatsApp akan terbuka di tab baru
- Mobile responsive untuk kemudahan akses di ponsel 