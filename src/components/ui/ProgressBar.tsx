"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { usePathname } from "next/navigation";

interface ProgressBarProps {
  color?: string;
  height?: number;
  duration?: number;
  showOnlyOnTransition?: boolean;
}

export default function ProgressBar({
  color = "#3B82F6",
  height = 3,
  duration = 800,
  showOnlyOnTransition = true
}: ProgressBarProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (showOnlyOnTransition) {
      setIsLoading(true);
      setProgress(0);

      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + Math.random() * 30;
        });
      }, 100);

      // Complete progress after duration
      const timer = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          setProgress(0);
        }, 200);
      }, duration);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [pathname, duration, showOnlyOnTransition]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50"
          style={{ height: `${height}px` }}
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 shadow-lg"
            style={{
              background: `linear-gradient(90deg, ${color}, ${color}dd, ${color})`
            }}
          />
          
          {/* Shimmer effect */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{ transform: "skewX(-20deg)" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Thin progress bar for subtle indication
export function ThinProgressBar() {
  return (
    <ProgressBar 
      height={2} 
      duration={600}
      color="#10B981"
    />
  );
}

// Thick progress bar for prominent indication
export function ThickProgressBar() {
  return (
    <ProgressBar 
      height={4} 
      duration={1000}
      color="#6366F1"
    />
  );
} 