"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "@/lib/motion";
import gsap from "gsap";

const testimonials = [
  {
    id: 1,
    content: "Pelayanan sangat memuaskan! Mobil bersih dan terawat. Proses pemesanan sangat mudah dan cepat. Pasti akan menggunakan layanan ini lagi untuk perjalanan berikutnya.",
    author: "Budi Santoso",
    role: "Pengusaha",
    avatar: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: 2,
    content: "Saya sangat senang dengan layanan CarRental. Mobil yang saya sewa dalam kondisi prima dan harganya sangat terjangkau. Staf juga sangat membantu dan ramah.",
    author: "Siti Rahayu",
    role: "Dosen",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: 3,
    content: "Ini adalah pengalaman rental mobil terbaik yang pernah saya alami. Proses pemesanan yang mudah, mobil berkualitas, dan layanan pelanggan yang luar biasa. Sangat direkomendasikan!",
    author: "Ahmad Hidayat",
    role: "Fotografer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: 4,
    content: "Saya sangat terkesan dengan kualitas mobil dan layanan yang diberikan. Harga yang ditawarkan juga sangat kompetitif. Tidak akan ragu untuk menggunakan layanan ini lagi.",
    author: "Dewi Lestari",
    role: "Desainer",
    avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: 5,
    content: "Proses pemesanan yang sangat mudah dan cepat. Mobil diantar tepat waktu dan dalam kondisi sangat baik. Sangat puas dengan layanan CarRental!",
    author: "Rudi Hartono",
    role: "Manajer Pemasaran",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"
  }
];

// Animasi latar belakang
const BackgroundAnimation = () => {
  useEffect(() => {
    const particles = Array.from(document.querySelectorAll('.particle'));
    
    gsap.to(particles, {
      x: "random(-50, 50)",
      y: "random(-50, 50)",
      rotate: "random(-15, 15)",
      scale: "random(0.8, 1.2)",
      duration: 4,
      ease: "sine.inOut",
      stagger: 0.1,
      repeat: -1,
      yoyo: true
    });
    
    return () => {
      gsap.killTweensOf(particles);
    };
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div 
          key={i}
          className={`particle absolute rounded-full bg-primary-${i % 2 ? '500' : '600'} opacity-${i % 3 ? '10' : '5'}`}
          style={{
            width: `${Math.random() * 80 + 40}px`,
            height: `${Math.random() * 80 + 40}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useAnimation();
  const [direction, setDirection] = useState(0);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Setiap kali activeIndex berubah, trigger animasi
  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    });
  }, [activeIndex, controls]);

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 40 : -40,
      opacity: 0
    }),
    center: {
      y: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      y: direction > 0 ? -40 : 40,
      opacity: 0
    })
  };

  return (
    <section className="py-24 bg-gradient-to-b from-secondary-50 to-secondary-100 overflow-hidden relative">
      <BackgroundAnimation />
      
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Apa Kata Pelanggan Kami
          </motion.h2>
          <motion.p 
            className="text-secondary-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Dengarkan pengalaman dari pelanggan yang telah menggunakan layanan rental mobil kami
          </motion.p>
        </div>

        <motion.div 
          className="relative max-w-5xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative Elements */}
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-primary-500 opacity-10 rounded-full blur-md"></div>
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-primary-500 opacity-10 rounded-full blur-md"></div>
          <div className="absolute top-1/3 -right-8 w-20 h-20 bg-primary-600 opacity-10 rounded-full blur-sm"></div>
          <div className="absolute bottom-1/3 -left-8 w-24 h-24 bg-primary-600 opacity-10 rounded-full blur-sm"></div>
          
          {/* Testimonial Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-14 relative z-10 border border-white/20">
            <div className="absolute top-8 left-8 md:top-14 md:left-14">
              <svg className="text-primary-500 w-16 h-16 md:w-20 md:h-20 opacity-20" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
            </div>
            
            <div className="min-h-[240px] flex flex-col justify-between mt-12 md:mt-16">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="relative"
                >
                  <p className="text-xl md:text-2xl lg:text-3xl text-secondary-800 font-medium mb-12 italic">
                    &ldquo;{testimonials[activeIndex].content}&rdquo;
                  </p>
                  
                  <div className="flex items-center">
                    <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden mr-6 border-4 border-white shadow-md">
                      <Image
                        src={testimonials[activeIndex].avatar}
                        alt={testimonials[activeIndex].author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">{testimonials[activeIndex].author}</h4>
                      <p className="text-primary-600 font-medium">{testimonials[activeIndex].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Navigation */}
            <div className="absolute -bottom-6 right-1/2 transform translate-x-1/2 flex space-x-4">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white shadow-md text-secondary-700 hover:text-primary-600 transition-colors"
                aria-label="Previous testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-white shadow-md text-secondary-700 hover:text-primary-600 transition-colors"
                aria-label="Next testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </div>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center mt-16 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className="group"
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <motion.div
                  className={`w-4 h-4 rounded-full transition-colors ${
                    index === activeIndex 
                      ? "bg-primary-600 scale-100" 
                      : "bg-secondary-300 scale-75 hover:bg-secondary-400"
                  }`}
                  initial={false}
                  animate={{
                    scale: index === activeIndex ? 1 : 0.75,
                    backgroundColor: index === activeIndex ? "#FF1F1F" : "#D4D4D4"
                  }}
                  whileHover={{ scale: 0.9 }}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 