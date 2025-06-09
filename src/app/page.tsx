'use client';

import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import CarGrid from "@/components/cars/CarGrid";
import { Car } from "@/components/cars/CarCard";
import { motion } from "@/lib/motion";
import ScrollVelocity from "@/components/ui/ScrollVelocityText";
import { CurtainTransition } from "@/components/ui/PageTransitions";
import StaggerContainer, { StaggerItem } from "@/components/ui/StaggerContainer";

// Sample data for featured cars
const featuredCars: Car[] = [
  {
    id: "1",
    name: "Toyota Avanza",
    brand: "Toyota",
    image: "/images/cars/toyota-avanza.jpg",
    pricePerDay: 350000,
    seats: 7,
    transmission: "Manual",
    fuelType: "Bensin",
    year: 2022,
    available: true
  },
  {
    id: "2",
    name: "Honda Civic",
    brand: "Honda",
    image: "/images/cars/honda-civic.png",
    pricePerDay: 700000,
    seats: 5,
    transmission: "Automatic",
    fuelType: "Bensin",
    year: 2023,
    available: true
  },
  {
    id: "3",
    name: "Toyota Alphard",
    brand: "Toyota",
    image: "/images/cars/toyota-alphard.png",
    pricePerDay: 1500000,
    seats: 7,
    transmission: "Automatic",
    fuelType: "Bensin",
    year: 2023,
    available: true
  },
  {
    id: "4",
    name: "Mitsubishi Pajero Sport",
    brand: "Mitsubishi",
    image: "/images/cars/mitsubishi-pajero.png",
    pricePerDay: 1200000,
    seats: 7,
    transmission: "Automatic",
    fuelType: "Diesel",
    year: 2022,
    available: false
  }
];

export default function Home() {
  return (
    <CurtainTransition>
      <MainLayout>
        <StaggerContainer delay={0.2} staggerDelay={0.15}>
          {/* Hero Section */}
          <StaggerItem direction="up">
            <section id="beranda">
              <Hero />
            </section>
          </StaggerItem>
          
          {/* Search Bar */}
          <StaggerItem direction="up">
            <div className="container px-3 sm:px-4">
              <SearchBar />
            </div>
          </StaggerItem>

          {/* Scroll Velocity Text */}
          <StaggerItem direction="scale">
            <div className="w-full bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 py-6 mb-4 relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
              
              <ScrollVelocity 
                texts={["RENTAL MOBIL PREMIUM", "PERJALANAN TANPA BATAS"]}
                velocity={80}
                className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight"
                parallaxClassName="py-3"
                glowEffect={true}
                gradientText={false}
                animatedBackground={true}
                particles={false}
                damping={60}
                stiffness={300}
                numCopies={6}
              />
              
              {/* Decorative road lines */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -translate-y-1/2 mt-4"></div>
            </div>
          </StaggerItem>
          
          {/* Featured Cars */}
          <StaggerItem direction="up">
            <section id="mobil-unggulan">
              <CarGrid 
                cars={featuredCars} 
                title="Mobil Unggulan Kami" 
                subtitle="Pilihan mobil terbaik dengan kualitas premium dan harga terjangkau"
              />
            </section>
          </StaggerItem>
          
          {/* Features Section */}
          <StaggerItem direction="up">
            <section id="fitur">
              <Features />
            </section>
          </StaggerItem>
          
          {/* Testimonials */}
          <StaggerItem direction="up">
            <section id="testimonial">
              <Testimonials />
            </section>
          </StaggerItem>

          {/* Contact Section */}
          <StaggerItem direction="up">
            <section id="kontak" className="py-16 sm:py-24 bg-gradient-to-br from-secondary-50 to-primary-50">
              <div className="container mx-auto px-3 sm:px-4">
                <div className="max-w-6xl mx-auto">
                  <motion.div 
                    className="text-center mb-12 sm:mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary-900 mb-4 sm:mb-6">
                      Hubungi Kami
                    </h2>
                    <p className="text-lg sm:text-xl text-secondary-600 max-w-2xl mx-auto">
                      Siap membantu Anda 24/7. Jangan ragu untuk menghubungi tim kami
                    </p>
                  </motion.div>

                  <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
                    {/* Contact Info */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="space-y-6 sm:space-y-8"
                    >
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-secondary-900 mb-4 sm:mb-6">
                          Informasi Kontak
                        </h3>
                        <div className="space-y-4 sm:space-y-6">
                          {[
                            {
                              icon: "📱",
                              title: "WhatsApp",
                              detail: "+62 822-4875-1765",
                              link: "https://wa.me/6282248751765?text=Halo! Saya tertarik dengan layanan rental mobil Anda.",
                              color: "bg-green-50 border-green-200 hover:bg-green-100"
                            },
                            {
                              icon: "📞",
                              title: "Telepon",
                              detail: "+62 822-4875-1765",
                              link: "tel:+6282248751765",
                              color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
                            },
                            {
                              icon: "✉️",
                              title: "Email",
                              detail: "info@carrental.com",
                              link: "mailto:info@carrental.com",
                              color: "bg-purple-50 border-purple-200 hover:bg-purple-100"
                            },
                            {
                              icon: "📍",
                              title: "Alamat",
                              detail: "Jl. Contoh No. 123, Jakarta Selatan",
                              link: "#",
                              color: "bg-orange-50 border-orange-200 hover:bg-orange-100"
                            }
                          ].map((contact, index) => (
                            <motion.a
                              key={index}
                              href={contact.link}
                              target={contact.link.startsWith('http') ? '_blank' : '_self'}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                              className={`flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 ${contact.color} border-2 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md`}
                            >
                              <div className="text-2xl sm:text-3xl">{contact.icon}</div>
                              <div>
                                <h4 className="font-semibold text-secondary-900 text-sm sm:text-base">
                                  {contact.title}
                                </h4>
                                <p className="text-secondary-600 text-sm sm:text-base">{contact.detail}</p>
                              </div>
                            </motion.a>
                          ))}
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white"
                      >
                        <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Jam Operasional</h4>
                        <div className="space-y-1 sm:space-y-2 text-primary-100 text-sm sm:text-base">
                          <p>Senin - Jumat: 07:00 - 22:00</p>
                          <p>Sabtu - Minggu: 08:00 - 21:00</p>
                          <p className="font-semibold text-white mt-2 sm:mt-3">Emergency: 24/7</p>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg"
                    >
                      <h3 className="text-xl sm:text-2xl font-bold text-secondary-900 mb-4 sm:mb-6">
                        Aksi Cepat
                      </h3>
                      
                      <div className="space-y-3 sm:space-y-4">
                        <a
                          href="https://wa.me/6282248751765?text=Halo! Saya tertarik dengan layanan rental mobil Anda."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                            <span className="text-lg sm:text-xl">💬</span>
                            <span className="text-sm sm:text-base">Chat WhatsApp Sekarang</span>
                          </div>
                        </a>

                        <a
                          href="tel:+6282248751765"
                          className="block w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                            <span className="text-lg sm:text-xl">📞</span>
                            <span className="text-sm sm:text-base">Telepon Langsung</span>
                          </div>
                        </a>

                        <a
                          href="#mobil-unggulan"
                          className="block w-full bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                            <span className="text-lg sm:text-xl">🚗</span>
                            <span className="text-sm sm:text-base">Lihat Mobil Tersedia</span>
                          </div>
                        </a>
                      </div>

                      <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-semibold text-secondary-900 mb-2 text-sm sm:text-base">
                          💡 Tips Cepat
                        </h4>
                        <p className="text-xs sm:text-sm text-secondary-600">
                          Untuk respon tercepat, hubungi kami via WhatsApp dengan menyebutkan:
                        </p>
                        <ul className="text-xs sm:text-sm text-secondary-600 mt-2 space-y-1">
                          <li>• Tanggal sewa</li>
                          <li>• Durasi sewa</li>
                          <li>• Jenis mobil yang diinginkan</li>
                          <li>• Lokasi pickup</li>
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
          </StaggerItem>
        </StaggerContainer>
      </MainLayout>
    </CurtainTransition>
  );
}
