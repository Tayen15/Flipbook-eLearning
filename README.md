# 📚 UI/UX Digital Flipbook - Design Thinking Process Report

## 🎯 Project Overview

Flipbook digital interaktif untuk laporan akhir UI/UX dengan efek dan animasi realistis menggunakan StPageFlip library. Dibuat dengan Next.js 15, TypeScript, dan Tailwind CSS.

## ✨ Features

### 🔄 Interactive Flipbook Experience
- **Realistic Page Flip Effects** - Menggunakan StPageFlip untuk animasi natural
- **A4 Format** - Ukuran 420x594px (ratio A4) untuk kemudahan baca
- **Touch & Mouse Support** - Responsif untuk desktop dan mobile
- **Keyboard Navigation** - Arrow keys, spacebar, dan escape untuk kontrol

### 🎨 Modern UI/UX Design
- **Gradient Backgrounds** - Design modern dengan gradien yang menarik
- **Glassmorphism Effects** - Backdrop blur dan transparansi
- **Icon Integration** - Lucide React icons untuk visual yang konsisten
- **Progress Tracking** - Real-time progress bar dan percentage
- **Loading States** - Smooth loading experience

### 📖 Content Structure
Sesuai dengan standar laporan UI/UX Design Thinking Process (45 poin total):

1. **Cover Page** - Halaman sampul dengan branding
2. **Discover Phase (15 poin)**
   - Profil objek penelitian
   - Latar belakang masalah
   - Empathy Map & hasil riset
   - Persona & Journey Map
3. **Define Phase (10 poin)**
   - Problem Statement (How Might We)
   - Diagram sebab akibat
4. **Develop Phase (10 poin)**
   - Brainstorming solusi
   - Wireframe & Prototype
   - Link Figma
5. **Deliver Phase (10 poin)**
   - Hasil user testing
   - Feedback & iterasi
   - Link Maze testing
6. **Back Cover** - Penutup dan summary

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.3 with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Flipbook**: StPageFlip (page-flip) v2.0.7
- **Icons**: Lucide React
- **Animations**: CSS animations + Tailwind transitions

## 📁 Project Structure

```
src/
├── app/
│   ├── data/
│   │   └── flipbook-content.ts    # Content constants & data
│   ├── globals.css                # Global styles & animations
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main flipbook component
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build application
npm run build

# Start production server
npm start
```

## 🎮 Controls & Navigation

### Mouse/Touch
- **Click & Drag** page corners to flip
- **Click** navigation buttons (Previous/Next)
- **Click** first page button to go to cover

### Keyboard
- **Arrow Left/Right** - Navigate pages
- **Spacebar** - Next page
- **Escape** - Exit fullscreen

### Features
- **Fullscreen Mode** - Maximize button
- **Progress Tracking** - Visual progress bar
- **Page Counter** - Current page / Total pages

## 📊 Content Management

Semua konten flipbook dikelola dalam file terstruktur di `src/app/data/flipbook-content.ts` dengan interface TypeScript untuk type safety dan kemudahan maintenance.

## 🎨 Customization

Mudah dikustomisasi melalui:
- **Colors & Themes** - Edit gradient di flipbook-content.ts
- **Page Dimensions** - Modify ukuran A4 di page.tsx
- **Animation Timing** - Adjust di PageFlip config

## 📱 Responsive Design

- **Desktop First** - Optimized untuk A4 reading
- **Mobile Friendly** - Touch gestures support
- **Cross Browser** - Modern browser support

---

**Built with ❤️ for UI/UX Design Process Documentation**
