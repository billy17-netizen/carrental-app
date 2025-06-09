'use client';

import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';

interface ScrollToOptions {
  offset?: number;
  immediate?: boolean;
  duration?: number;
  easing?: (t: number) => number;
}

interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: ScrollToOptions) => void;
}

// Membuat context dengan nilai default
const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
});

interface LenisProviderProps {
  children: ReactNode;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    direction?: 'vertical' | 'horizontal';
    gestureDirection?: 'vertical' | 'horizontal' | 'both';
    smooth?: boolean;
    mouseMultiplier?: number;
    smoothTouch?: boolean;
    touchMultiplier?: number;
    infinite?: boolean;
    orientation?: 'vertical' | 'horizontal';
  };
}

export function LenisProvider({ children, options = {} }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  
  // Inisialisasi Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      ...options
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    // Mulai animasi loop
    requestAnimationFrame(raf);
    
    // Simpan instance Lenis
    lenisRef.current = lenis;

    // Cleanup
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [options]);

  // Fungsi untuk scroll ke elemen target
  const scrollTo = (target: string | HTMLElement | number, options: ScrollToOptions = {}) => {
    if (!lenisRef.current) return;

    // Jika target adalah string (ID), konversi ke elemen
    const resolvedTarget = typeof target === 'string' 
      ? document.getElementById(target) || 0 
      : target;

    // Default options
    const defaultOptions = {
      offset: 0,
      immediate: false,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    };

    // Scroll ke target
    lenisRef.current.scrollTo(resolvedTarget, {
      ...defaultOptions,
      ...options
    });
  };

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}

// Hook untuk menggunakan Lenis di komponen
export function useLenis() {
  const context = useContext(LenisContext);
  
  if (context === undefined) {
    throw new Error('useLenis harus digunakan dalam LenisProvider');
  }
  
  return context;
}

// Hook untuk menambahkan listener ke event Lenis
export function useLenisScroll(callback: (e: { scroll: number, limit: number, velocity: number, direction: number, progress: number }) => void) {
  const { lenis } = useLenis();
  
  useEffect(() => {
    if (!lenis) return;
    
    lenis.on('scroll', callback);
    
    return () => {
      lenis.off('scroll', callback);
    };
  }, [lenis, callback]);
} 