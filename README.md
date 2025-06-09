# 🚗 CarRental - Website Rental Mobil Premium

Website rental mobil modern dengan desain premium, sistem filtering canggih, dan animasi halus. Dibangun menggunakan Next.js 15, TailwindCSS, dan Framer Motion dengan fokus pada performa dan user experience.

## ✨ Fitur Utama

### 🎨 **Design & UI/UX**
- ✅ Design modern dan responsif dengan tema merah-putih yang elegan
- ✅ Animasi halus dengan Framer Motion untuk page transitions
- ✅ Smooth scrolling menggunakan Lenis
- ✅ Mobile-first responsive design
- ✅ Progressive content reveal dengan stagger animations

### 🚙 **Sistem Mobil**
- ✅ Katalog mobil lengkap dengan detail (harga, transmisi, bahan bakar, dll)
- ✅ Sistem filtering canggih (kategori, harga, transmisi)
- ✅ Pencarian mobil berdasarkan nama/brand
- ✅ Sorting mobil (harga, nama, tahun)
- ✅ Status ketersediaan real-time

### 🔄 **Page Transitions**
- ✅ Curtain transition effect yang smooth
- ✅ Loading states dengan spinner
- ✅ Header tersembunyi saat transisi
- ✅ Content appear setelah transisi selesai

### 📱 **Mobile Experience**
- ✅ Mobile-friendly navigation dengan hamburger menu
- ✅ Touch-optimized interactions
- ✅ Responsive filter system
- ✅ Optimized performance untuk mobile

### 💬 **Integration**
- ✅ WhatsApp integration untuk booking
- ✅ Contact form dengan detail lengkap
- ✅ Call-to-action buttons yang strategis

## 🛠️ Teknologi yang Digunakan

### **Frontend Framework**
- **Next.js 15** - React framework dengan App Router
- **React 18** - Library JavaScript untuk UI
- **TypeScript** - Type-safe JavaScript

### **Styling & Animation**
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animasi dan page transitions
- **Lenis** - Smooth scrolling library

### **Tools & Utilities**
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Custom Fonts** - MeraPro dan Merriweather

## 🚀 Cara Menjalankan Proyek

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/carrental-app.git
   cd carrental-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Jalankan development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

4. **Buka di browser**
   ```
   http://localhost:3000
   ```

### Build untuk Production

```bash
npm run build
npm start
```

## 📁 Struktur Proyek

```
carrental-app/
├── public/                    # Assets statis
│   ├── images/               # Gambar mobil dan icons
│   ├── font/                 # Custom fonts
│   └── logo/                 # Logo aplikasi
├── src/
│   ├── app/                  # App Router pages
│   │   ├── cars/            # Halaman daftar mobil
│   │   │   └── [id]/        # Detail mobil (dynamic route)
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── components/           # React components
│   │   ├── booking/         # Komponen booking
│   │   ├── cars/            # Komponen mobil (CarCard, CarGrid)
│   │   ├── home/            # Komponen homepage
│   │   │   ├── Hero.tsx     # Hero section
│   │   │   ├── SearchBar.tsx # Search & filter
│   │   │   ├── Features.tsx  # Features section
│   │   │   └── Testimonials.tsx # Customer testimonials
│   │   ├── layout/          # Layout components
│   │   │   ├── Header.tsx   # Navigation header
│   │   │   ├── Footer.tsx   # Site footer
│   │   │   └── MainLayout.tsx # Main layout wrapper
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── PageTransitions.tsx # Page transition effects
│   │   │   ├── LoadingSpinner.tsx  # Loading states
│   │   │   ├── ScrollToTop.tsx     # Scroll to top button
│   │   │   └── StaggerContainer.tsx # Stagger animations
│   │   └── providers/       # Context providers
│   └── lib/                 # Utilities & configurations
│       ├── motion.ts        # Framer Motion setup
│       ├── lenis.tsx        # Smooth scrolling
│       ├── utils.ts         # Utility functions
│       └── config.ts        # App configuration
├── tailwind.config.js       # TailwindCSS configuration
├── next.config.js          # Next.js configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎯 Pages & Features

### **Homepage (`/`)**
- Hero section dengan search bar
- Fitur unggulan
- Grid mobil populer
- Testimonial pelanggan
- Contact section
- Smooth scrolling navigation

### **Cars Page (`/cars`)**
- Daftar lengkap semua mobil
- Advanced filtering system:
  - Kategori (SUV, MPV, Sedan, Hatchback)
  - Range harga
  - Jenis transmisi
- Search functionality
- Sorting options
- Responsive grid layout

### **Car Detail (`/cars/[id]`)** *(Coming Soon)*
- Detail lengkap mobil
- Galeri foto
- Spesifikasi teknis
- Form booking
- Related cars

## 🎨 Design System

### **Color Palette**
- **Primary**: Red (#FF1F1F, #E11D48, #DC2626)
- **Secondary**: Gray (#1F2937, #374151, #6B7280)
- **Accent**: White & gradients

### **Typography**
- **Heading**: MeraPro (Custom font)
- **Body**: Merriweather & Inter
- **Responsive**: 12px - 64px range

### **Components**
- Consistent spacing (4px, 8px, 16px, 24px)
- Rounded corners (8px, 12px, 16px)
- Shadow system (sm, md, lg, xl)
- Hover & focus states

## 📱 Responsive Breakpoints

```css
sm:  640px  /* Mobile landscape */
md:  768px  /* Tablet */
lg:  1024px /* Desktop */
xl:  1280px /* Large desktop */
2xl: 1536px /* Extra large */
```

## 🚀 Performance Optimizations

- ✅ **Next.js Image Optimization** - Otomatis resize & format
- ✅ **Code Splitting** - Bundle splitting per page
- ✅ **Static Generation** - Pre-built HTML untuk performa maksimal
- ✅ **Font Optimization** - Custom font loading strategy
- ✅ **CSS Purging** - Unused CSS removal
- ✅ **Lazy Loading** - Components & images loaded on demand

## 🔧 Scripts Tersedia

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint checking
npm run lint:fix # Auto-fix ESLint issues
```

## 🌟 Highlights

- **Modern Stack**: Next.js 15 + TypeScript + TailwindCSS
- **Smooth Animations**: Framer Motion page transitions
- **Mobile First**: Responsive design yang optimal
- **Type Safe**: Full TypeScript implementation
- **Performance**: Optimized untuk kecepatan loading
- **Accessibility**: ARIA labels dan keyboard navigation
- **SEO Ready**: Meta tags dan structured data

## 🤝 Kontribusi

Kontribusi sangat diterima! Untuk berkontribusi:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Developer

Dibuat dengan ❤️ untuk memberikan pengalaman rental mobil terbaik.

---

**⭐ Jika proyek ini membantu Anda, jangan lupa untuk memberikan star!**
