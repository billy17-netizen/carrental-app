"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "@/lib/motion";
import { useLenis } from "@/lib/lenis";

export default function Hero() {
  const { scrollTo } = useLenis();
  
  const handleScrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo("fitur", { offset: -80 });
  };
  
  return (
    <section id="beranda" className="relative h-screen min-h-[500px] sm:min-h-[600px] max-h-[900px] flex items-center overflow-hidden pt-16 sm:pt-0">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-secondary-900/70 z-10" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 to-secondary-900/30 z-10" />
      
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/cars/hero-bg.jpg"
          alt="Luxury Car"
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
      </div>
      
      {/* Content */}
      <div className="container relative z-20 px-3 sm:px-4">
        <div className="max-w-3xl xl:max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-white mb-4 sm:mb-6 leading-tight text-shadow-md text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
              Jelajahi Indonesia dengan Kenyamanan Berkendara
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-white text-sm sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl xl:max-w-3xl text-shadow leading-relaxed">
              Dapatkan pengalaman berkendara terbaik dengan armada mobil premium kami. 
              Harga terjangkau, layanan berkualitas.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Link 
              href="/cars" 
              className="btn-primary text-center px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base"
            >
              <span className="relative z-10">
                Lihat Mobil
              </span>
            </Link>
            <button
              onClick={handleScrollToFeatures}
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-md font-medium hover:bg-white/20 transition-all text-center relative text-sm sm:text-base"
            >
              <span className="relative z-10">
                Pelajari Lebih Lanjut
              </span>
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 sm:mt-12 flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-4 text-white"
          >
            <div className="flex items-center">
              <span className="text-lg sm:text-2xl md:text-3xl font-bold mr-1.5 sm:mr-2">50+</span>
              <span className="text-primary-200 text-sm sm:text-base">Jenis Mobil</span>
            </div>
            <div className="flex items-center">
              <span className="text-lg sm:text-2xl md:text-3xl font-bold mr-1.5 sm:mr-2">100+</span>
              <span className="text-primary-200 text-sm sm:text-base">Lokasi</span>
            </div>
            <div className="flex items-center">
              <span className="text-lg sm:text-2xl md:text-3xl font-bold mr-1.5 sm:mr-2">10K+</span>
              <span className="text-primary-200 text-sm sm:text-base">Pelanggan</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 