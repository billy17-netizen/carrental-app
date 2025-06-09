"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "@/lib/motion";
import { createWhatsAppUrl } from "@/lib/config";

// Custom DatePicker Component
const DatePicker = ({ 
  value, 
  onChange, 
  minDate, 
  placeholder = "Pilih tanggal",
  icon 
}: {
  value: string;
  onChange: (date: string) => void;
  minDate?: string;
  placeholder?: string;
  icon: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long", 
      year: "numeric"
    });
  };

  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const calendar = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      calendar.push(date);
    }
    return calendar;
  };

  const isDateDisabled = (date: Date) => {
    if (!minDate) return false;
    return date < new Date(minDate);
  };

  const handleDateSelect = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    onChange(dateStr);
    setIsOpen(false);
  };

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className="w-full pl-8 sm:pl-10 pr-3 py-2.5 sm:py-3.5 rounded-full border border-secondary-200 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent text-secondary-700 bg-white transition-all duration-200 cursor-pointer text-sm sm:text-base"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-primary-600 pointer-events-none">
          {icon}
        </div>
        <span className={value ? "text-secondary-700" : "text-secondary-400"}>
          {value ? formatDisplayDate(value) : placeholder}
        </span>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-primary-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-lg border border-secondary-200 p-4 z-50"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="p-1 hover:bg-secondary-100 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 className="text-lg font-semibold">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              type="button"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="p-1 hover:bg-secondary-100 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-sm font-medium text-secondary-500 p-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {generateCalendar().map((date, index) => {
              const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
              const isSelected = value === date.toISOString().split('T')[0];
              const isDisabled = isDateDisabled(date);
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => !isDisabled && handleDateSelect(date)}
                  disabled={isDisabled}
                  className={`
                    p-2 text-sm rounded-lg transition-colors
                    ${!isCurrentMonth ? 'text-secondary-300' : 'text-secondary-700'}
                    ${isSelected ? 'bg-primary-600 text-white' : ''}
                    ${isToday && !isSelected ? 'bg-primary-100 text-primary-700' : ''}
                    ${isDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-primary-50'}
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default function SearchBar() {
  const router = useRouter();
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [location, setLocation] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  
  // Tampilkan searchbar dengan animasi setelah komponen di-load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message with booking details
    const message = `Halo! Saya ingin menyewa mobil dengan detail berikut:
    
Lokasi: ${location || 'Belum dipilih'}
Tanggal Ambil: ${pickupDate ? new Date(pickupDate).toLocaleDateString("id-ID") : 'Belum dipilih'}
Tanggal Kembali: ${returnDate ? new Date(returnDate).toLocaleDateString("id-ID") : 'Belum dipilih'}

Mohon informasi ketersediaan dan harga. Terima kasih!`;

    // Open WhatsApp in new tab
    window.open(createWhatsAppUrl(message), '_blank');
  };

  // Get tomorrow's date for minimum return date
  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  // Get today's date for minimum pickup date
  const getToday = () => {
    return new Date().toISOString().split("T")[0];
  };

  // Kategori kendaraan populer dengan SVG icons untuk tampilan lebih baik
  const popularCategories = [
    { 
      name: "SUV", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17h14M5 17a2 2 0 0 1-2-2V8a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v7a2 2 0 0 1-2 2M5 17l-2 5h18l-2-5M10 7l-1.5 5h7L14 7z"/></svg>
    },
    { 
      name: "Sedan", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M5 17H3v-7l2-5h14l2 5v7h-2M15 7H9M3 10h18"/></svg>
    },
    { 
      name: "MPV", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM3 9h13.5M6 12h7M7 5v4M17 8v4M3 9a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    },
    { 
      name: "Hatchback", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17h14M5 17a2 2 0 0 1-2-2V8l2-4h14l2 4v7a2 2 0 0 1-2 2M5 13h14M7 8h6M7 15h2M14 15h2"/></svg>
    },
    { 
      name: "Listrik", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 7l-5 10M9 7l5 10M9 12h6M7 17l-2 5h14l-2-5M4 12V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4M10 5v2M14 5v2"/></svg>
    }
  ];

  return (
    <motion.div 
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: isVisible ? 0 : 30, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-7 -mt-16 sm:-mt-20 relative z-20 mx-2 sm:mx-4 md:mx-auto max-w-5xl"
    >
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-5">
        {/* Lokasi */}
        <div className="md:col-span-3">
          <label htmlFor="location" className="block text-sm sm:text-base font-semibold text-secondary-700 mb-1.5 sm:mb-2">
            Lokasi
          </label>
          <div className="relative">
            <div className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-primary-600 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-8 sm:pl-10 pr-8 sm:pr-10 py-2.5 sm:py-3.5 rounded-full border border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none text-secondary-700 bg-white transition-all duration-200 text-sm sm:text-base"
              required
            >
              <option value="">Pilih lokasi</option>
              <option value="jakarta">Jakarta</option>
              <option value="bandung">Bandung</option>
              <option value="surabaya">Surabaya</option>
              <option value="yogyakarta">Yogyakarta</option>
              <option value="bali">Bali</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary-600">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Tanggal Ambil */}
        <div className="md:col-span-3">
          <label className="block text-sm sm:text-base font-semibold text-secondary-700 mb-1.5 sm:mb-2">
            Tanggal Ambil
          </label>
          <DatePicker
            value={pickupDate}
            onChange={setPickupDate}
            minDate={getToday()}
            placeholder="Pilih tanggal ambil"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />
        </div>
        
        {/* Tanggal Kembali */}
        <div className="md:col-span-3">
          <label className="block text-sm sm:text-base font-semibold text-secondary-700 mb-1.5 sm:mb-2">
            Tanggal Kembali
          </label>
          <DatePicker
            value={returnDate}
            onChange={setReturnDate}
            minDate={pickupDate || getTomorrow()}
            placeholder="Pilih tanggal kembali"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />
        </div>
        
        {/* Tombol Cari */}
        <div className="md:col-span-3 flex items-end">
          <motion.button
            type="submit"
            className="w-full bg-primary-600 text-white py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-full font-semibold hover:bg-primary-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-lg shadow-primary-600/30 group/btn relative overflow-hidden text-sm sm:text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-primary-500/40 via-white/40 to-primary-500/0 
              transform -skew-x-12 group-hover/btn:animate-shine z-0"></span>
            <span className="relative z-10 flex items-center justify-center">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
              </svg>
              <span className="mr-0.5 sm:mr-1 hidden sm:inline">Chat WhatsApp</span>
              <span className="mr-0.5 sm:hidden">WhatsApp</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-5 sm:w-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </motion.button>
        </div>
      </form>
      
      <motion.div 
        className="mt-4 sm:mt-7 flex flex-wrap gap-2 sm:gap-3 justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <span className="text-xs sm:text-sm font-medium text-secondary-600 mr-1 sm:mr-2">Populer:</span>
        {popularCategories.map((category, index) => (
          <motion.button
            key={category.name}
            type="button"
            onClick={() => router.push(`/cars?category=${category.name.toLowerCase()}`)}
            className="text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-secondary-200 text-secondary-800 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-all duration-200"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -10 }}
            transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.icon}
            <span>{category.name}</span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
} 