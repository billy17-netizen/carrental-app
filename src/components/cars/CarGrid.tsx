"use client";

import { useState, useEffect } from "react";
import CarCard, { Car } from "./CarCard";
import { motion } from "@/lib/motion";

interface CarGridProps {
  cars: Car[];
  title?: string;
  subtitle?: string;
}

export default function CarGrid({ cars, title, subtitle }: CarGridProps) {
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Aktifkan animasi setelah komponen dimuat
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
        {(title || subtitle) && (
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <motion.span 
                  className="inline-block text-primary-600 font-bold text-sm md:text-base tracking-wider uppercase mb-4 px-3 py-1 rounded-full bg-primary-50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Koleksi Terbaik
                </motion.span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
              </motion.div>
            )}
            {subtitle && <p className="text-secondary-600 max-w-2xl mx-auto text-lg">{subtitle}</p>}
          </motion.div>
        )}



        {cars.length === 0 ? (
          <motion.div 
            className="text-center py-16 bg-white rounded-2xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </motion.div>
            <motion.h3 
              className="mt-6 text-2xl font-medium text-secondary-900"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Tidak ada mobil yang ditemukan
            </motion.h3>
            <motion.p 
              className="mt-2 text-secondary-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Silakan coba filter lain atau kembali lagi nanti.
            </motion.p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2 sm:gap-4 md:gap-6"
          >
            {cars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ 
                  opacity: animationComplete ? 1 : 0, 
                  y: animationComplete ? 0 : 30, 
                  scale: animationComplete ? 1 : 0.95 
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1 + index * 0.1,
                  ease: [0.25, 1, 0.5, 1]
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="flex h-full"
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </motion.div>
        )}
    </div>
  );
} 