'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { useLenis } from '@/lib/lenis';

interface ScrollToTopProps {
  threshold?: number;
  offset?: number;
  className?: string;
}

export default function ScrollToTop({ 
  threshold = 300,
  offset = 20,
  className = ''
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollTo } = useLenis();

  // Effect untuk mendeteksi scroll position dan menampilkan/menyembunyikan tombol
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold]);

  // Fungsi untuk scroll ke atas dengan Lenis
  const handleScrollToTop = () => {
    scrollTo(0);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          aria-label="Scroll ke atas"
          className={`fixed z-50 p-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 ${className}`}
          style={{ bottom: offset, right: offset }}
          onClick={handleScrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 15l7-7 7 7" 
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
} 