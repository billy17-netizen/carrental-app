"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

interface VelocityMapping {
  input: [number, number];
  output: [number, number];
}

interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity: number;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
  glowEffect?: boolean;
  gradientText?: boolean;
}

interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
  texts: string[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
  glowEffect?: boolean;
  gradientText?: boolean;
  animatedBackground?: boolean;
  particles?: boolean;
}

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);

  return width;
}

// Floating particles component
const FloatingParticles: React.FC = () => {
  const particles = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-1 h-1 bg-white/30 rounded-full"
      initial={{ 
        x: Math.random() * window.innerWidth, 
        y: Math.random() * 200 
      }}
      animate={{
        x: [null, Math.random() * window.innerWidth],
        y: [null, Math.random() * 200],
        opacity: [0.3, 0.8, 0.3],
        scale: [1, 1.5, 1]
      }}
      transition={{
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  ));

  return <div className="absolute inset-0 overflow-hidden">{particles}</div>;
};

// Animated background waves
const AnimatedWaves: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-10 left-0 w-full h-20 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute -bottom-10 left-0 w-full h-20 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{
          x: ["100%", "-100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
  glowEffect = true,
  gradientText = true,
  animatedBackground = true,
  particles = true,
}) => {
  function VelocityText({
    children,
    baseVelocity = velocity,
    scrollContainerRef,
    className = "",
    damping,
    stiffness,
    numCopies,
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle,
    glowEffect,
    gradientText,
  }: VelocityTextProps) {
    const baseX = useMotionValue(0);
    const scrollOptions = scrollContainerRef
      ? { container: scrollContainerRef }
      : {};
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: damping ?? 50,
      stiffness: stiffness ?? 400,
    });
    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping?.input || [0, 1000],
      velocityMapping?.output || [0, 5],
      { clamp: false }
    );

    // Enhanced transforms for visual effects
    const scale = useTransform(
      smoothVelocity,
      [-1000, 0, 1000],
      [0.99, 1, 1.01]
    );

    const blur = useTransform(
      smoothVelocity,
      [-1000, 0, 1000],
      [0.5, 0, 0.5]
    );

    const copyRef = useRef<HTMLSpanElement>(null);
    const copyWidth = useElementWidth(copyRef);

    function wrap(min: number, max: number, v: number): number {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;
      return mod + min;
    }

    const x = useTransform(baseX, (v) => {
      if (copyWidth === 0) return "0px";
      return `${wrap(-copyWidth, 0, v)}px`;
    });

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
    });

    const spans = [];
    for (let i = 0; i < numCopies!; i++) {
      spans.push(
                  <span
            className={`flex-shrink-0 select-none ${className} ${
              gradientText 
                ? "bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent" 
                : "text-white"
            } ${
              glowEffect 
                ? "drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" 
                : ""
            }`}
            key={i}
            ref={i === 0 ? copyRef : null}
            style={{
              textShadow: glowEffect 
                ? "0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(255,255,255,0.3)" 
                : undefined
            }}
          >
          {children}
        </span>
      );
    }

    return (
      <div
        className={`${parallaxClassName} relative overflow-hidden`}
        style={parallaxStyle}
      >
        <motion.div
          className={`${scrollerClassName} flex whitespace-nowrap text-center font-sans font-black tracking-[-0.02em] will-change-transform`}
          style={{ 
            x, 
            scale,
            filter: `blur(${blur}px)`,
            ...scrollerStyle 
          }}
        >
          {spans}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Animated background elements */}
      {animatedBackground && <AnimatedWaves />}
      {particles && <FloatingParticles />}
      
      {/* Enhanced light rays */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{
          x: ["-100%", "100%"],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Pulsing glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-primary-500/20"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.02, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main content */}
      <section className="relative z-10">
        {texts.map((text: string, index: number) => (
          <VelocityText
            key={index}
            className={className}
            baseVelocity={index % 2 !== 0 ? -velocity : velocity}
            scrollContainerRef={scrollContainerRef}
            damping={damping}
            stiffness={stiffness}
            numCopies={numCopies}
            velocityMapping={velocityMapping}
            parallaxClassName={parallaxClassName}
            scrollerClassName={scrollerClassName}
            parallaxStyle={parallaxStyle}
            scrollerStyle={scrollerStyle}
            glowEffect={glowEffect}
            gradientText={gradientText}
          >
            {text}&nbsp;
          </VelocityText>
        ))}
      </section>
    </div>
  );
};

export default ScrollVelocity; 