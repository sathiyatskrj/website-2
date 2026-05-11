"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleNetworkBackground from "@/components/animations/ParticleNetworkBackground";
import { HeroTypewriter } from "@/components/animations/TypewriterText";

const slides = [
  {
    id: 1,
    gradient: "from-blue-600/20 via-primary/10 to-secondary/5",
    tag: "Official",
    tagVariant: "primary" as const,
    prefix: "Andaman's",
    words: ["Chess Authority", "Governing Body", "Premier Federation"],
    subtitle: "Certified by AICF & FIDE. Promoting excellence across all islands since 2005.",
    link: "/about",
    cta: "About ANCA",
    ctaSecondary: { label: "View Tournaments", href: "/tournaments" },
    stat: { value: "1200+", label: "Registered Players" },
  },
  {
    id: 2,
    gradient: "from-emerald-600/20 via-secondary/10 to-primary/5",
    tag: "Upcoming",
    tagVariant: "emerald" as const,
    prefix: "Register for",
    words: ["State Championship", "Open Category", "Under-19 Trials"],
    subtitle: "Prize fund of ₹1,50,000. Registrations close 30 April 2026.",
    link: "/tournaments",
    cta: "Register Now",
    ctaSecondary: { label: "View Schedule", href: "/tournaments" },
    stat: { value: "₹1.5L", label: "Prize Fund" },
  },
  {
    id: 3,
    gradient: "from-amber-600/20 via-accent/10 to-primary/5",
    tag: "Notice",
    tagVariant: "amber" as const,
    prefix: "Upcoming",
    words: ["Arbiter Seminar", "Coach Training", "FIDE Rated Events"],
    subtitle: "Stay updated on circulars, ratings, and events from ANCA.",
    link: "/news",
    cta: "Read Updates",
    ctaSecondary: { label: "Downloads", href: "/downloads" },
    stat: { value: "50+", label: "Annual Events" },
  },
];

const tagColors = {
  primary: "border-primary text-primary",
  emerald: "border-emerald-500 text-emerald-500",
  amber: "border-amber-500 text-amber-500",
};

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
    <div className="relative w-full h-[500px] md:h-[620px] lg:h-[740px] overflow-hidden group">

      <ParticleNetworkBackground />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-chess-pattern pointer-events-none z-[1] mix-blend-overlay opacity-50" />

      {/* Animated slide background tint */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute inset-0 pointer-events-none z-[2] bg-gradient-to-br ${slide.gradient} opacity-60`}
        />
      </AnimatePresence>

      {/* Slide content */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={`content-${current}`}
          custom={direction}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0 z-10 h-full flex items-center pointer-events-auto"
        >
          <div className="container mx-auto px-6 md:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl">
              <div>
                {/* Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="mb-6"
                >
                  <span className={`inline-flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] border-l-4 pl-3 py-1 ${tagColors[slide.tagVariant]}`}>
                    {slide.tag}
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.6 }}
                  className="text-foreground text-4xl md:text-6xl lg:text-7xl font-serif mb-6 leading-[1.05]"
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
                  transition={{ delay: 0.35, duration: 0.6 }}
                  className="text-muted-foreground text-base md:text-lg mb-10 max-w-xl font-sans font-light leading-relaxed"
                >
                  {slide.subtitle}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.6 }}
                  className="flex flex-wrap items-center gap-4"
                >
                  <Link
                    href={slide.link}
                    className="relative overflow-hidden bg-primary text-primary-foreground font-sans font-semibold uppercase tracking-widest px-8 py-4 text-xs md:text-sm rounded-none transition-all shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_var(--primary)] hover:scale-[1.02] active:scale-[0.98] group/btn"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {slide.cta} <ChevronRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-secondary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  </Link>
                  <Link
                    href={slide.ctaSecondary.href}
                    className="text-xs md:text-sm font-semibold uppercase tracking-widest text-muted-foreground border border-border/60 hover:border-primary/60 hover:text-primary px-6 py-4 rounded-none transition-all"
                  >
                    {slide.ctaSecondary.label}
                  </Link>
                </motion.div>
              </div>

              {/* Right: Stat card (hidden on small) */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="hidden lg:flex flex-col items-center justify-center"
              >
                <div className="glass-panel rounded-3xl p-12 text-center relative overflow-hidden border border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />
                  <div className="text-6xl font-black font-poppins text-gradient mb-3">{slide.stat.value}</div>
                  <div className="text-sm font-bold uppercase tracking-[0.25em] text-muted-foreground">{slide.stat.label}</div>
                  <div className="mt-6 text-5xl opacity-10 select-none">♛</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrow controls — always visible at low opacity, full on hover */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white p-3 opacity-40 hover:opacity-100 group-hover:opacity-60 transition-all duration-300 border border-white/20 rounded-full"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white p-3 opacity-40 hover:opacity-100 group-hover:opacity-60 transition-all duration-300 border border-white/20 rounded-full"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-20">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary"
          key={`progress-${current}`}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 7, ease: "linear" }}
        />
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent([idx, idx > current ? 1 : -1])}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 transition-all duration-300 rounded-full ${idx === current ? "w-8 bg-primary" : "w-2 bg-white/40 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </div>
  );
}
