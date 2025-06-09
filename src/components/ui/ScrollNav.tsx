'use client';

import { useState, useEffect } from 'react';
import { motion } from '@/lib/motion';
import { useLenis, useLenisScroll } from '@/lib/lenis';

interface NavItem {
  id: string;
  label: string;
}

interface ScrollNavProps {
  items: NavItem[];
  activeOffset?: number;
}

export default function ScrollNav({ items, activeOffset = 80 }: ScrollNavProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const { scrollTo } = useLenis();

  // Detect active section based on scroll position
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const sections = items.map(({ id }) => {
        const element = document.getElementById(id);
        if (!element) return { id, top: 0, bottom: 0 };

        const rect = element.getBoundingClientRect();
        return {
          id,
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY
        };
      });

      const currentScrollPosition = window.scrollY + activeOffset;
      
      // Find the current active section
      const currentSection = sections.find(section => 
        currentScrollPosition >= section.top && 
        currentScrollPosition < section.bottom
      );

      if (currentSection) {
        setActiveSection(currentSection.id);
      } else if (currentScrollPosition <= sections[0]?.top && sections[0]) {
        // If we're above the first section, set it as active
        setActiveSection(sections[0].id);
      } else if (currentScrollPosition >= sections[sections.length - 1]?.bottom && sections[sections.length - 1]) {
        // If we're below the last section, set it as active
        setActiveSection(sections[sections.length - 1].id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items, activeOffset]);

  // Listen to Lenis scroll events to update active section (optional enhancement)
  useLenisScroll(() => {
    // The same logic could be implemented here if needed
    // However, the window scroll event is still useful as a fallback
  });

  const handleClick = (id: string) => {
    scrollTo(id, {
      offset: -activeOffset
    });
  };

  return (
    <div className="flex items-center space-x-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
        >
          {activeSection === item.id && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute inset-0 bg-primary-600 rounded-full z-0"
              initial={false}
              transition={{ type: 'spring', duration: 0.6, bounce: 0.1 }}
            />
          )}
          <span className={`relative z-10 ${
            activeSection === item.id 
              ? 'text-white' 
              : 'text-secondary-700 hover:text-primary-600'
          }`}>{item.label}</span>
        </button>
      ))}
    </div>
  );
} 