"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useAnimation } from "@/lib/motion";
import gsap from "gsap";

// Enhanced features dengan icon yang lebih menarik
const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Proses Cepat",
    description: "Proses pemesanan yang cepat dan mudah. Mobil siap dalam waktu 60 menit setelah konfirmasi."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Keamanan Terjamin",
    description: "Semua mobil kami diasuransikan penuh dan melalui pemeriksaan rutin untuk keamanan Anda."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: "Pembayaran Fleksibel",
    description: "Berbagai metode pembayaran tersedia, termasuk kartu kredit, transfer bank, dan e-wallet."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Antar Jemput",
    description: "Layanan antar jemput mobil ke lokasi Anda dengan biaya tambahan yang terjangkau."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Tanpa Deposit",
    description: "Kami tidak memerlukan deposit untuk sebagian besar mobil. Cukup tunjukkan identitas valid."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Dukungan 24/7",
    description: "Tim dukungan kami siap membantu Anda 24 jam sehari, 7 hari seminggu."
  }
];

// Komponen untuk animasi latar belakang
const FloatingShapes = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const shapes = Array.from(containerRef.current.querySelectorAll('.shape'));
    
    shapes.forEach(shape => {
      gsap.to(shape, {
        x: `random(-30, 30)`,
        y: `random(-30, 30)`,
        rotate: `random(-15, 15)`,
        duration: `random(3, 6)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: `random(0, 2)`
      });
    });
    
    return () => {
      gsap.killTweensOf(shapes);
    };
  }, []);
  
  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => {
        const size = Math.random() * 60 + 20;
        return (
          <div 
            key={i} 
            className={`shape absolute opacity-5 ${i % 3 === 0 ? 'rounded-full' : i % 3 === 1 ? 'rounded-xl' : 'rounded-lg'}`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? '#FF4949' : '#000000',
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        );
      })}
    </div>
  );
};

export default function Features() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }));
  }, [controls]);

  return (
    <section id="fitur" className="py-24 bg-gradient-to-b from-white to-secondary-50 relative overflow-hidden">
      <FloatingShapes />
      
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-primary-600 font-bold text-sm md:text-base tracking-wider uppercase mb-4 px-3 py-1 rounded-full bg-primary-50"
          >
            Keunggulan Kami
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Mengapa Memilih Kami?
          </motion.h2>
          <motion.p 
            className="text-secondary-600 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Kami menyediakan layanan rental mobil terbaik dengan berbagai keunggulan
            untuk memastikan perjalanan Anda nyaman dan menyenangkan.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                borderColor: "rgb(255, 73, 73)"
              }}
              className="bg-white rounded-2xl p-8 border border-secondary-100 transition-all duration-300 hover:border-primary-200 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              
              <div className="bg-primary-600 text-white rounded-xl p-4 inline-flex items-center justify-center mb-5 group-hover:bg-primary-700 transition-colors">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors">{feature.title}</h3>
              <p className="text-secondary-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-24 bg-secondary-900 rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-primary-500 opacity-10 blur-xl"
              />
              
              <motion.h3 
                className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Pengalaman Berkendara Premium
              </motion.h3>
              
              <motion.p 
                className="text-secondary-300 mb-8 text-lg relative z-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Nikmati pengalaman berkendara dengan mobil-mobil premium kami yang selalu dalam kondisi prima.
                Kami memastikan setiap mobil melalui pemeriksaan menyeluruh sebelum disewakan.
              </motion.p>
              
              <ul className="space-y-5 relative z-10">
                {[
                  "Mobil bersih dan terawat",
                  "Pemeriksaan teknis rutin",
                  "Fitur keamanan lengkap",
                  "Asuransi comprehensive"
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                    className="flex items-center text-white"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="mt-10"
              >
                <a 
                  href="/cars" 
                  className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Lihat Mobil Premium 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </motion.div>
            </div>
            
            <div className="relative h-80 lg:h-auto overflow-hidden">
              <motion.div
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="h-full w-full"
              >
                <Image
                  src="/images/cars/luxury-interior.jpg"
                  alt="Premium Car"
                  fill
                  className="object-cover transition-transform duration-10000 hover:scale-110"
                />
              </motion.div>
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/80 to-transparent lg:via-transparent lg:from-secondary-900/50 lg:to-secondary-900/30" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 