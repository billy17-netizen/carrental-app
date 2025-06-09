import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(dateObj);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Fungsi untuk scroll ke section tertentu dengan animasi yang halus
 * @param id - ID dari elemen yang akan di-scroll (tanpa #)
 * @param offset - Offset dari bagian atas (default: 0)
 * @param duration - Durasi animasi dalam ms (default: 800)
 */
export function scrollToSection(id: string, offset = 0, duration = 800): void {
  // Periksa jika kode berjalan di browser
  if (typeof window === "undefined") return;
  
  const element = document.getElementById(id);
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - offset;
  
  const startTime = performance.now();
  const startPosition = window.scrollY;
  
  function scrollAnimation(currentTime: number) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    
    // Ease-in-out function untuk scroll yang lebih natural
    const ease = (t: number) => 
      t < 0.5
        ? 4 * t * t * t
        : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    
    window.scrollTo({
      top: startPosition + (offsetPosition - startPosition) * ease(progress),
      behavior: "auto" // Kita menangani animasi sendiri, bukan menggunakan 'smooth'
    });
    
    if (elapsedTime < duration) {
      requestAnimationFrame(scrollAnimation);
    }
  }
  
  requestAnimationFrame(scrollAnimation);
} 