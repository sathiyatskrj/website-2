"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CanvasChessBackground from "@/components/animations/CanvasChessBackground";
import { HeroTypewriter } from "@/components/animations/TypewriterText";

const slides = [
  {
    id: 1,
    bg: "from-[#0f172a]/90 to-[#1e3a5f]/90",
    tag: "Official",
    tagColor: "text-amber-400 border-amber-400",
    prefix: "Andaman's",
    words: ["Chess Authority", "Governing Body", "Premier Federation"],
    subtitle: "Certified by AICF & FIDE. Promoting excellence across all islands since 2005.",
    link: "/about",
    cta: "About ANCA",
  },
  {
    id: 2,
    bg: "from-[#1a0f2e]/90 to-[#3b1f5e]/90",
    tag: "Upcoming",
    tagColor: "text-emerald-400 border-emerald-400",
    prefix: "Register for",
    words: ["State Championship", "Open Category", "Under-19 Trials"],
    subtitle: "Prize fund of ₹1,50,000. Registrations close 30 April 2026.",
    link: "/tournaments",
    cta: "Register Now",
  },
  {
    id: 3,
    bg: "from-[#0a1628]/90 to-[#143d6b]/90",
    tag: "Notice",
    tagColor: "text-orange-400 border-orange-400",
    prefix: "Upcoming",
    words: ["Arbiter Seminar", "Coach Training", "FIDE Rated Events"],
    subtitle: "Stay updated on circulars, ratings, and events from ANCA.",
    link: "/news",
    cta: "Read Updates",
  },
];

const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d < 0 ? "100%" : "-100%", opacity: 0 }),
};

export function HeroCarousel() {
  const [[current, direction], setCurrent] = useState([0, 0]);

  const paginate = useCallback((newDir: number) => {
    setCurrent(([prev]) => [(prev + newDir + slides.length) % slides.length, newDir]);
  }, []);

  useEffect(() => {
    const t = setInterval(() => paginate(1), 7000);
    return () => clearInterval(t);
  }, [paginate]);

  const slide = slides[current];

  return (
    <div className="relative w-full h-[480px] md:h-[600px] lg:h-[720px] overflow-hidden group">
      
      <CanvasChessBackground />
      {/* Premium Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 bg-chess-pattern pointer-events-none z-0 mix-blend-overlay" />

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute inset-0 pointer-events-none z-10 flex mix-blend-luminosity opacity-40`}
        >
			    <div className={`w-full h-full bg-gradient-to-br ${slide.bg}`} />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
           key={`content-${current}`}
           custom={direction}
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 1.05 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="absolute inset-0 z-20 h-full flex items-center pointer-events-auto"
        >
            <div className="container mx-auto px-6 md:px-16 mt-12 md:mt-0">
              <div className="max-w-3xl">
                {/* Tag badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-6"
                >
                  <span className={`inline-flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] border-l-4 pl-3 py-1 ${slide.tagColor === 'text-amber-400 border-amber-400' ? 'border-secondary text-secondary' : 'border-primary text-primary'}`}>
                    {slide.tag}
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-foreground text-4xl md:text-6xl lg:text-7xl font-serif mb-6 leading-[1.1]"
                >
                  <HeroTypewriter
                    prefix={slide.prefix}
                    rotatingWords={slide.words}
                    prefixClassName="text-foreground mr-3"
                    wordClassName="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
                  />
                </motion.div>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl font-sans font-light leading-relaxed"
                >
                  {slide.subtitle}
                </motion.p>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex items-center gap-6"
                >
                  <Link
                    href={slide.link}
                    className="relative overflow-hidden group/btn bg-primary text-primary-foreground font-sans font-semibold uppercase tracking-widest px-8 py-4 text-xs md:text-sm rounded-none transition-all shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_var(--primary)]"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {slide.cta} <ChevronRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              </div>
            </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrow controls */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20">
        <motion.div
          className="h-full bg-amber-400"
          key={`progress-${current}`}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 7, ease: "linear" }}
        />
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent([idx, idx > current ? 1 : -1])}
            className={`h-1.5 transition-all duration-300 rounded-full ${idx === current ? "w-8 bg-amber-400" : "w-2 bg-white/40 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </div>
  );
}
