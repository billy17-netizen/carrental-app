"use client";

// Re-export framer-motion components with optimized imports
export { 
  motion, 
  AnimatePresence,
  useInView,
  useAnimation,
  useScroll,
  useTransform,
  LayoutGroup,
  Reorder
} from "framer-motion";

// Custom easing curves
export const easeInOutCubic = [0.22, 1, 0.36, 1];
export const easeOutExpo = [0.16, 1, 0.3, 1];
export const easeInOutQuart = [0.76, 0, 0.24, 1];

// Common animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.05 }
};

export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 }
};

// Page transition variants
export const pageTransition = {
  duration: 0.4,
  ease: easeInOutCubic
};

export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -20
  }
}; 