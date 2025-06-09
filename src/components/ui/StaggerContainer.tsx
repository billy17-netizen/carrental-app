"use client";

import { motion } from "@/lib/motion";
import { ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export default function StaggerContainer({ 
  children, 
  className = "",
  delay = 0,
  staggerDelay = 0.1 
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Individual stagger item
export function StaggerItem({ 
  children, 
  className = "",
  direction = "up" 
}: { 
  children: ReactNode; 
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "scale";
}) {
  const variants = {
    hidden: {
      opacity: 0,
      ...(direction === "up" && { y: 30 }),
      ...(direction === "down" && { y: -30 }),
      ...(direction === "left" && { x: 30 }),
      ...(direction === "right" && { x: -30 }),
      ...(direction === "scale" && { scale: 0.8 })
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
} 