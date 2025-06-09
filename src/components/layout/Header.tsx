"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "@/lib/motion";
import { usePathname } from "next/navigation";
import { useLenis } from "@/lib/lenis";
import TransitionLink from "../ui/TransitionLink";

// Navigasi utama untuk semua halaman
const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/cars", label: "Mobil" }
];

// Navigasi scroll untuk halaman utama saja
const scrollNavItems = [
  { id: "beranda", label: "Beranda" },
  { id: "mobil-unggulan", label: "Mobil" },
  { id: "fitur", label: "Fitur" },
  { id: "testimonial", label: "Testimonial" },
  { id: "kontak", label: "Kontak" }
];

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollTo } = useLenis();

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-2 sm:py-4",
        {
          "bg-white/95 backdrop-blur-md shadow-md py-1.5 sm:py-3": isScrolled,
          "bg-transparent": !isScrolled,
        }
      )}
    >
      <div className="container mx-auto px-2 sm:px-4 max-w-6xl flex justify-between items-center min-h-[48px] sm:min-h-[64px]">
        {/* Logo */}
        <TransitionLink href="/" className="flex items-center flex-shrink-0" showSpinner={false}>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <span 
              className={cn(
                "text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold transition-colors leading-tight",
                {
                  "text-primary-600": isScrolled,
                  "text-white": !isScrolled,
                }
              )}
              style={{ fontFamily: 'MeraPro, sans-serif' }}
            >
              🚗 CARRENTAL
            </span>
          </div>
        </TransitionLink>

        {/* Desktop Navigation - ScrollNav pada halaman utama, navLinks pada halaman lain */}
        <nav className="hidden md:flex items-center space-x-6">
          {isHomePage ? (
            <div className="flex items-center space-x-6 lg:space-x-8">
              {scrollNavItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id, { offset: -80 })}
                  className={cn(
                    "font-medium transition-colors hover:text-primary-600",
                    {
                      "text-secondary-800": isScrolled,
                      "text-white hover:text-white/80": !isScrolled,
                    }
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center space-x-6 lg:space-x-8">
              {navLinks.map(link => (
                <TransitionLink 
                  href={link.href} 
                  key={link.href}
                  className={cn(
                    "font-medium transition-colors hover:text-primary-600",
                    {
                      "text-secondary-800": isScrolled,
                      "text-white hover:text-white/80": !isScrolled,
                    }
                  )}
                  showSpinner={false}
                >
                  {link.label}
                </TransitionLink>
              ))}
              {/* Kontak link - kembali ke homepage dan scroll ke kontak */}
              <TransitionLink 
                href="/#kontak"
                className={cn(
                  "font-medium transition-colors hover:text-primary-600",
                  {
                    "text-secondary-800": isScrolled,
                    "text-white hover:text-white/80": !isScrolled,
                  }
                )}
                showSpinner={false}
              >
                Kontak
              </TransitionLink>
            </div>
          )}

        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-1.5 -mr-1 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-md transition-colors hover:bg-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col items-center justify-center w-5 h-5 sm:w-6 sm:h-6">
            <span 
              className={cn(
                "block w-5 h-0.5 sm:w-6 transition-all duration-300 ease-out",
                {
                  "bg-secondary-800": isScrolled,
                  "bg-white": !isScrolled,
                },
                {
                  "rotate-45 translate-y-1.5": isMobileMenuOpen,
                  "rotate-0 translate-y-0": !isMobileMenuOpen,
                }
              )}
            />
            <span 
              className={cn(
                "block w-5 h-0.5 sm:w-6 mt-1 transition-all duration-300 ease-out",
                {
                  "bg-secondary-800": isScrolled,
                  "bg-white": !isScrolled,
                },
                {
                  "opacity-0": isMobileMenuOpen,
                  "opacity-100": !isMobileMenuOpen,
                }
              )}
            />
            <span 
              className={cn(
                "block w-5 h-0.5 sm:w-6 mt-1 transition-all duration-300 ease-out",
                {
                  "bg-secondary-800": isScrolled,
                  "bg-white": !isScrolled,
                },
                {
                  "-rotate-45 -translate-y-1.5": isMobileMenuOpen,
                  "rotate-0 translate-y-0": !isMobileMenuOpen,
                }
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200"
          >
            <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
              <div className="flex flex-col space-y-1">
                {isHomePage ? (
                  // Tampilkan navigasi scroll pada halaman utama
                  scrollNavItems.map(item => (
                    <button 
                      key={item.id}
                      className="text-left text-secondary-800 font-medium py-2.5 px-3 sm:py-3 sm:px-4 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-all duration-200 active:bg-primary-100 text-sm sm:text-base"
                      onClick={() => {
                        scrollTo(item.id, {
                          offset: -80
                        });
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </button>
                  ))
                ) : (
                  // Tampilkan navigasi biasa pada halaman lain
                  <>
                    {navLinks.map(link => (
                      <TransitionLink 
                        href={link.href} 
                        key={link.href}
                        className="block text-secondary-800 font-medium py-2.5 px-3 sm:py-3 sm:px-4 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-all duration-200 active:bg-primary-100 text-sm sm:text-base"
                        onClick={() => setIsMobileMenuOpen(false)}
                        showSpinner={false}
                      >
                        {link.label}
                      </TransitionLink>
                    ))}
                    {/* Kontak link untuk mobile */}
                    <TransitionLink 
                      href="/#kontak"
                      className="block text-secondary-800 font-medium py-2.5 px-3 sm:py-3 sm:px-4 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-all duration-200 active:bg-primary-100 text-sm sm:text-base"
                      onClick={() => setIsMobileMenuOpen(false)}
                      showSpinner={false}
                    >
                      Kontak
                    </TransitionLink>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 