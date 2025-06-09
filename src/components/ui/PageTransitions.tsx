"use client";

import { motion, AnimatePresence } from "@/lib/motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface TransitionProps {
  children: ReactNode;
  className?: string;
}

// 1. Slide Transition - Halaman slide horizontal
export function SlideTransition({ children, className = "" }: TransitionProps) {
  const pathname = usePathname();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// 2. Fade Overlay Transition
export function FadeOverlayTransition({ children, className = "" }: TransitionProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"
              />
              <motion.h3 
                className="text-white text-xl font-semibold"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                🚗 CarRental
              </motion.h3>
              <motion.p 
                className="text-white/80 mt-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Memuat halaman...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className={className}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

// 3. Curtain Transition - Tirai dari atas
export function CurtainTransition({ children, className = "" }: TransitionProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setShowContent(false);
    
    // Hide scrollbar during transition
    document.body.style.overflow = 'hidden';
    
    // First timer: hide curtain
    const curtainTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Second timer: show content with delay after curtain is gone
    const contentTimer = setTimeout(() => {
      setShowContent(true);
      // Restore scrollbar
      document.body.style.overflow = 'unset';
    }, 1200);

    return () => {
      clearTimeout(curtainTimer);
      clearTimeout(contentTimer);
      // Cleanup - restore scrollbar if component unmounts
      document.body.style.overflow = 'unset';
    };
  }, [pathname]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <>
            {/* Background overlay to ensure complete coverage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9998] bg-black"
              style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9998 
              }}
            />
            
            {/* Main curtain */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[9999] bg-gradient-to-b from-secondary-900 via-primary-800 to-primary-900 flex items-center justify-center"
              style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999 
              }}
            >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-center"
            >
              <motion.div
                className="text-5xl sm:text-6xl mb-4"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🚗
              </motion.div>
              <motion.h3 
                className="text-white text-xl sm:text-2xl font-bold mb-2"
                style={{ fontFamily: 'MeraPro, sans-serif' }}
              >
                CARRENTAL
              </motion.h3>
              <motion.p 
                className="text-white/70 text-sm sm:text-base mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Memuat halaman...
              </motion.p>
              <div className="flex items-center justify-center space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Loading placeholder while waiting for content */}
      <AnimatePresence>
        {!showContent && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-[100] flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence mode="wait">
        {showContent && (
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 1.05 }}
            transition={{ 
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1
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

// 4. Scale Zoom Transition
export function ScaleTransition({ children, className = "" }: TransitionProps) {
  const pathname = usePathname();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.1, opacity: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// 5. Split Screen Transition
export function SplitTransition({ children, className = "" }: TransitionProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <>
            {/* Left half */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 w-1/2 h-full z-50 bg-primary-600"
            />
            {/* Right half */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 w-1/2 h-full z-50 bg-primary-700"
            />
            {/* Center content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              <div className="text-center text-white">
                <motion.div
                  className="text-5xl mb-4"
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  🚗
                </motion.div>
                <h3 className="text-2xl font-bold">CarRental</h3>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className={className}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

// 6. Circular Reveal Transition
export function CircularTransition({ children, className = "" }: TransitionProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ scale: 0, borderRadius: "50%" }}
            animate={{ scale: 1, borderRadius: "0%" }}
            exit={{ scale: 0, borderRadius: "50%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center origin-center"
          >
            <motion.div
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-center text-white"
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🚗
              </motion.div>
              <h3 className="text-3xl font-bold">CarRental</h3>
              <p className="text-white/80 mt-2">Loading...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 1.05, rotateY: -10 }}
          transition={{ duration: 0.6 }}
          className={className}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
} 