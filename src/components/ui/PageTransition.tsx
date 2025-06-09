"use client";

import { motion, AnimatePresence } from "@/lib/motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export default function PageTransition({ children, className = "" }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Loading overlay component
export function PageLoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white/90 backdrop-blur-sm flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl p-8 border border-secondary-200"
      >
        <LoadingSpinner 
          size="lg" 
          text="Memuat halaman..." 
          color="primary"
        />
      </motion.div>
    </motion.div>
  );
}

// Page transition with loading state
export function PageTransitionWithLoader({ children, className = "" }: PageTransitionProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setShowContent(false);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <PageLoadingOverlay />}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        {showContent && (
          <motion.div
            key={pathname}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1]
            }}
            className={className}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 