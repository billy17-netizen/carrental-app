"use client";

import { useState, useMemo } from "react";
import CarGrid from "@/components/cars/CarGrid";
import { Car } from "@/components/cars/CarCard";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import Link from "next/link";
import { CurtainTransition } from "@/components/ui/PageTransitions";


// Sample data for cars
const cars: Car[] = [
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
  },
  {
    id: "5",
    name: "Honda HR-V",
    brand: "Honda",
    image: "/images/cars/honda-hrv.png",
    pricePerDay: 600000,
    seats: 5,
    transmission: "Automatic",
    fuelType: "Bensin",
    year: 2022,
    available: true
  },
  {
    id: "6",
    name: "Toyota Fortuner",
    brand: "Toyota",
    image: "/images/cars/toyota-fortuner.png",
    pricePerDay: 1100000,
    seats: 7,
    transmission: "Automatic",
    fuelType: "Diesel",
    year: 2023,
    available: true
  },
  {
    id: "7",
    name: "Daihatsu Xenia",
    brand: "Daihatsu",
    image: "/images/cars/daihatsu-xenia.png",
    pricePerDay: 300000,
    seats: 7,
    transmission: "Manual",
    fuelType: "Bensin",
    year: 2021,
    available: true
  },
  {
    id: "8",
    name: "Suzuki Ertiga",
    brand: "Suzuki",
    image: "/images/cars/suzuki-ertiga.png",
    pricePerDay: 350000,
    seats: 7,
    transmission: "Manual",
    fuelType: "Bensin",
    year: 2022,
    available: true
  }
];

// Filter interfaces
interface FilterState {
  search: string;
  category: string;
  priceRange: string;
  transmission: string[];
  sortBy: string;
}

export default function CarsPage() {
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    priceRange: 'all',
    transmission: [],
    sortBy: 'price-low'
  });

  // Filter functions
  const updateFilter = (key: keyof FilterState, value: string | string[]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleTransmission = (transmission: string) => {
    setFilters(prev => ({
      ...prev,
      transmission: prev.transmission.includes(transmission)
        ? prev.transmission.filter(t => t !== transmission)
        : [...prev.transmission, transmission]
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      priceRange: 'all',
      transmission: [],
      sortBy: 'price-low'
    });
  };

  // Filtered and sorted cars
  const filteredCars = useMemo(() => {
    let result = [...cars];

    // Search filter
    if (filters.search) {
      result = result.filter(car => 
        car.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        car.brand.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      const categoryMap: { [key: string]: string[] } = {
        'suv': ['Fortuner', 'Pajero'],
        'mpv': ['Avanza', 'Xenia', 'Ertiga', 'Alphard'],
        'sedan': ['Civic'],
        'hatchback': ['HR-V']
      };
      
      if (categoryMap[filters.category]) {
        result = result.filter(car => 
          categoryMap[filters.category].some(model => 
            car.name.includes(model)
          )
        );
      }
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      switch (filters.priceRange) {
        case 'under-500k':
          result = result.filter(car => car.pricePerDay < 500000);
          break;
        case '500k-1m':
          result = result.filter(car => car.pricePerDay >= 500000 && car.pricePerDay <= 1000000);
          break;
        case 'over-1m':
          result = result.filter(car => car.pricePerDay > 1000000);
          break;
      }
    }

    // Transmission filter
    if (filters.transmission.length > 0) {
      result = result.filter(car => 
        filters.transmission.includes(car.transmission)
      );
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case 'price-high':
        result.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case 'newest':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [filters]);

  const availableCars = filteredCars.filter(car => car.available);

  return (
    <CurtainTransition>
      <div className="flex flex-col min-h-screen max-w-[2000px] mx-auto">
        {/* Floating Back Button */}
            <Link 
              href="/"
              className="fixed top-4 left-2 sm:top-6 sm:left-6 z-50 group bg-white/90 backdrop-blur-md hover:bg-white text-secondary-800 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>

        {/* Modern Hero Section */}
            <div className="relative bg-gradient-to-br from-secondary-900 via-primary-900 to-secondary-800 pt-16 sm:pt-24 pb-8 sm:pb-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Geometric Shapes */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-primary-300/15 to-primary-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          ></div>
        </div>

        {/* Floating Elements - Hidden on mobile */}
        <div className="hidden sm:block absolute top-10 right-10 text-white/20 animate-bounce">
          <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>
        </div>

        <div className="hidden sm:block absolute bottom-10 left-10 text-white/15 animate-pulse">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        {/* Main Content */}
        <div className="w-full px-3 sm:px-4 lg:px-6 xl:px-8 relative z-10">
          <div className="max-w-screen-2xl mx-auto">
            {/* Logo Section */}
            <div className="mb-4 sm:mb-8">
              <Link href="/" className="inline-block group">
                <div className="opacity-90 hover:opacity-100 transition-all duration-300 group-hover:scale-105">
                  <span 
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white transition-all duration-300"
                    style={{ fontFamily: 'MeraPro, sans-serif' }}
                  >
                    🚗 CARRENTAL
                  </span>
                </div>
              </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 items-center">
              
              {/* Left Content */}
              <div className="text-left">
                <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-primary-500/20 backdrop-blur-sm rounded-full text-primary-300 text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-primary-400/30">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">Rental Mobil Terpercaya #1 di Indonesia</span>
                  <span className="sm:hidden">Rental Terpercaya #1</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-[1.1]">
                  <span className="text-white">Jelajahi</span>
                  <br />
                  <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                    Tanpa Batas
                  </span>
                </h1>
                
                <p className="text-sm sm:text-lg text-secondary-300 mb-4 sm:mb-6 leading-relaxed max-w-xl">
                  Dengan armada premium dan layanan 24/7, wujudkan perjalanan impian Anda. 
                  Booking mudah, harga transparan, dan pengalaman tak terlupakan.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-8">
                  <a
                    href="https://wa.me/6282248751765?text=Halo! Saya tertarik dengan layanan rental mobil Anda. Mohon informasi lebih lanjut."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                    </svg>
                    Chat WhatsApp
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  
                  <button className="group inline-flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="hidden sm:inline">+62 822-4875-1765</span>
                    <span className="sm:hidden">Telepon</span>
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center gap-3 sm:gap-8 text-xs sm:text-sm text-secondary-400">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <svg className="w-3 h-3 sm:w-5 sm:h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="hidden sm:inline">Garansi Kualitas</span>
                    <span className="sm:hidden">Garansi</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <svg className="w-3 h-3 sm:w-5 sm:h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>24/7</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <svg className="w-3 h-3 sm:w-5 sm:h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="hidden sm:inline">Harga Terbaik</span>
                    <span className="sm:hidden">Terbaik</span>
                  </div>
                </div>
              </div>

              {/* Right Content - Stats Cards */}
              <div className="lg:justify-self-end">
                <div className="grid grid-cols-2 gap-2 sm:gap-4 max-w-sm">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="text-lg sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">{cars.length}+</div>
                    <div className="text-secondary-300 text-xs sm:text-sm uppercase tracking-wider">Pilihan Mobil</div>
                    <div className="mt-1.5 sm:mt-3 text-xs text-secondary-400 hidden sm:block">Berbagai kategori tersedia</div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="text-lg sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">{cars.filter(car => car.available).length}</div>
                    <div className="text-secondary-300 text-xs sm:text-sm uppercase tracking-wider">Tersedia</div>
                    <div className="mt-1.5 sm:mt-3 text-xs text-secondary-400 hidden sm:block">Siap untuk disewa</div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 col-span-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg sm:text-xl font-bold text-white mb-0.5 sm:mb-1">24/7</div>
                        <div className="text-secondary-300 text-xs sm:text-sm uppercase tracking-wider">Layanan</div>
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-1.5 sm:mt-3 text-xs text-secondary-400 hidden sm:block">Bantuan kapan saja dibutuhkan</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Section */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 py-8 sm:py-16">
        <div className="w-full px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-12 max-w-6xl mx-auto">
              <div className="text-center p-4 sm:p-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-secondary-900 mb-2 sm:mb-3">Kualitas Terjamin</h3>
                <p className="text-xs sm:text-sm text-secondary-600">Semua mobil terawat dengan baik dan bergaransi</p>
              </div>
              <div className="text-center p-4 sm:p-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-secondary-900 mb-2 sm:mb-3">Harga Transparan</h3>
                <p className="text-xs sm:text-sm text-secondary-600">Tidak ada biaya tersembunyi, semua sudah termasuk</p>
              </div>
              <div className="text-center p-4 sm:p-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-secondary-900 mb-2 sm:mb-3">Support 24/7</h3>
                <p className="text-xs sm:text-sm text-secondary-600">Tim siap membantu kapan saja via WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area with Sidebar */}
      <div className="w-full py-4 sm:py-8 px-2 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 max-w-screen-2xl mx-auto">
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-80 lg:flex-shrink-0">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-secondary-100 p-3 sm:p-6 lg:sticky lg:top-24">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-3 sm:mb-6 pb-2 sm:pb-4 border-b border-secondary-200">
                <div className="flex items-center gap-1.5 sm:gap-3">
                  <div className="w-5 h-5 sm:w-8 sm:h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                    </svg>
                  </div>
                  <h3 className="text-sm sm:text-xl font-bold text-secondary-900">Filter Mobil</h3>
                </div>
                {/* Mobile Filter Toggle */}
                <button 
                  className="lg:hidden flex items-center gap-1 px-2 py-1.5 bg-primary-50 text-primary-600 rounded-lg text-xs font-medium hover:bg-primary-100 transition-colors"
                  onClick={() => {
                    const filterContent = document.getElementById('filter-content');
                    const toggleIcon = document.getElementById('filter-toggle-icon');
                    const toggleText = document.getElementById('filter-toggle-text');
                    
                    if (filterContent && toggleIcon && toggleText) {
                      const isHidden = filterContent.classList.contains('hidden');
                      if (isHidden) {
                        filterContent.classList.remove('hidden');
                        toggleIcon.classList.add('rotate-180');
                        toggleText.textContent = 'Tutup';
                      } else {
                        filterContent.classList.add('hidden');
                        toggleIcon.classList.remove('rotate-180');
                        toggleText.textContent = 'Filter';
                      }
                    }
                  }}
                >
                  <span id="filter-toggle-text">Filter</span>
                  <svg id="filter-toggle-icon" className="w-3 h-3 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Filter Content - Hidden by default on mobile */}
              <div id="filter-content" className="hidden lg:block space-y-3 sm:space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-secondary-700 mb-1.5 sm:mb-3">Cari Mobil</label>
                  <div className="relative">
                    <svg className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Ketik nama mobil..."
                      value={filters.search}
                      onChange={(e) => updateFilter('search', e.target.value)}
                      className="w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-3 border border-secondary-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    />
                  </div>
                </div>

                {/* Quick Filter Tags - Mobile */}
                <div className="lg:hidden">
                  <label className="block text-xs font-semibold text-secondary-700 mb-1.5">Filter Cepat</label>
                  <div className="flex flex-wrap gap-1.5">
                    <button 
                      onClick={() => {
                        setFilters({
                          search: '',
                          category: 'all',
                          priceRange: 'all',
                          transmission: [],
                          sortBy: 'price-low'
                        });
                      }}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                        filters.category === 'all' && filters.priceRange === 'all' && filters.transmission.length === 0
                          ? 'bg-primary-600 text-white'
                          : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                      }`}
                    >
                      Semua
                    </button>
                    <button 
                      onClick={() => updateFilter('priceRange', filters.priceRange === 'under-500k' ? 'all' : 'under-500k')}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                        filters.priceRange === 'under-500k'
                          ? 'bg-primary-600 text-white'
                          : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                      }`}
                    >
                      &lt; 500k
                    </button>
                    <button 
                      onClick={() => toggleTransmission('Manual')}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                        filters.transmission.includes('Manual')
                          ? 'bg-primary-600 text-white'
                          : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                      }`}
                    >
                      Manual
                    </button>
                    <button 
                      onClick={() => toggleTransmission('Automatic')}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                        filters.transmission.includes('Automatic')
                          ? 'bg-primary-600 text-white'
                          : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                      }`}
                    >
                      Auto
                    </button>
                  </div>
                </div>

                {/* Desktop Full Filters */}
                <div className="hidden lg:block space-y-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-3">Kategori</label>
                    <div className="space-y-2">
                      <button 
                        onClick={() => updateFilter('category', 'all')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all ${
                          filters.category === 'all'
                            ? 'bg-primary-600 text-white hover:bg-primary-700'
                            : 'bg-secondary-50 hover:bg-secondary-100 text-secondary-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Semua Mobil
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          filters.category === 'all' ? 'bg-white/20' : 'bg-secondary-200'
                        }`}>{cars.length}</span>
                      </button>
                      
                      <button 
                        onClick={() => updateFilter('category', 'mpv')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all ${
                          filters.category === 'mpv'
                            ? 'bg-primary-600 text-white hover:bg-primary-700'
                            : 'bg-secondary-50 hover:bg-secondary-100 text-secondary-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                            <path d="M3 4a1 1 0 00-1 1v10a2 2 0 002 2h1.5a1.5 1.5 0 001.5-1.5v-1h7v1a1.5 1.5 0 001.5 1.5H17a2 2 0 002-2V5a1 1 0 00-1-1H3z"/>
                          </svg>
                          MPV (Family Car)
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          filters.category === 'mpv' ? 'bg-white/20' : 'bg-secondary-200'
                        }`}>4</span>
                      </button>
                      
                      <button 
                        onClick={() => updateFilter('category', 'suv')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all ${
                          filters.category === 'suv'
                            ? 'bg-primary-600 text-white hover:bg-primary-700'
                            : 'bg-secondary-50 hover:bg-secondary-100 text-secondary-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                            <path d="M3 4a1 1 0 00-1 1v10a2 2 0 002 2h1.5a1.5 1.5 0 001.5-1.5v-1h7v1a1.5 1.5 0 001.5 1.5H17a2 2 0 002-2V5a1 1 0 00-1-1H3z"/>
                          </svg>
                          SUV (Sport Utility)
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          filters.category === 'suv' ? 'bg-white/20' : 'bg-secondary-200'
                        }`}>2</span>
                      </button>
                      
                      <button 
                        onClick={() => updateFilter('category', 'sedan')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all ${
                          filters.category === 'sedan'
                            ? 'bg-primary-600 text-white hover:bg-primary-700'
                            : 'bg-secondary-50 hover:bg-secondary-100 text-secondary-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                            <path d="M3 4a1 1 0 00-1 1v10a2 2 0 002 2h1.5a1.5 1.5 0 001.5-1.5v-1h7v1a1.5 1.5 0 001.5 1.5H17a2 2 0 002-2V5a1 1 0 00-1-1H3z"/>
                          </svg>
                          Sedan (City Car)
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          filters.category === 'sedan' ? 'bg-white/20' : 'bg-secondary-200'
                        }`}>1</span>
                      </button>
                      
                      <button 
                        onClick={() => updateFilter('category', 'hatchback')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all ${
                          filters.category === 'hatchback'
                            ? 'bg-primary-600 text-white hover:bg-primary-700'
                            : 'bg-secondary-50 hover:bg-secondary-100 text-secondary-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                            <path d="M3 4a1 1 0 00-1 1v10a2 2 0 002 2h1.5a1.5 1.5 0 001.5-1.5v-1h7v1a1.5 1.5 0 001.5 1.5H17a2 2 0 002-2V5a1 1 0 00-1-1H3z"/>
                          </svg>
                          Hatchback (Compact)
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          filters.category === 'hatchback' ? 'bg-white/20' : 'bg-secondary-200'
                        }`}>1</span>
                      </button>
                    </div>
                  </div>

                  {/* Reset Filter */}
                  <button 
                    onClick={resetFilters}
                    className="w-full px-4 py-2.5 sm:py-3 bg-secondary-100 hover:bg-secondary-200 text-secondary-700 rounded-xl font-medium transition-all"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Reset Filter
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Sort & Results Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="text-secondary-700">
                <p className="text-lg">
                  Menampilkan <span className="font-bold text-secondary-900">{availableCars.length}</span> dari <span className="font-bold text-secondary-900">{cars.length}</span> mobil tersedia
                </p>
                {(filters.search || filters.category !== 'all' || filters.priceRange !== 'all' || filters.transmission.length > 0) && (
                  <p className="text-sm text-primary-600 mt-1">
                    Filter aktif: {filteredCars.length} mobil ditemukan
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z" />
                </svg>
                <span className="text-secondary-700 font-medium text-sm">Urutkan:</span>
                <select 
                  value={filters.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value)}
                  className="px-3 py-2 border border-secondary-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white min-w-[180px]"
                >
                  <option value="price-low">Harga: Rendah ke Tinggi</option>
                  <option value="price-high">Harga: Tinggi ke Rendah</option>
                  <option value="newest">Terbaru</option>
                  <option value="name">Nama A-Z</option>
                </select>
              </div>
            </div>

            {/* Cars Grid */}
            <CarGrid cars={filteredCars} />
          </main>
        </div>
      </div>

      {/* Footer and Scroll to Top */}
      <div className="w-full">
        <Footer />
        <ScrollToTop threshold={400} offset={30} />
      </div>
      </div>
    </CurtainTransition>
  );
}