"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FramerChessBackground from "@/components/animations/FramerChessBackground";
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
    <div className="relative w-full h-[380px] md:h-[500px] lg:h-[620px] overflow-hidden group">
      
      <FramerChessBackground />

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.bg} pointer-events-none`}
        >
          {/* Content */}
          <div className="relative z-10 h-full flex items-center pointer-events-auto">
            <div className="container mx-auto px-6 md:px-16 mt-8">
              {/* Tag badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <span className={`inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] border px-3 py-1 mb-5 bg-black/20 backdrop-blur-sm ${slide.tagColor}`}>
                  <span className="text-base">♟</span> {slide.tag}
                </span>
              </motion.div>

              {/* Typewriter headline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-white text-3xl md:text-5xl lg:text-6xl font-black font-poppins mb-5 leading-tight drop-shadow-lg"
              >
                <HeroTypewriter
                  prefix={slide.prefix}
                  rotatingWords={slide.words}
                  prefixClassName="text-white/95 mr-2"
                  wordClassName="text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
                />
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-white/80 text-base md:text-lg mb-8 max-w-xl font-medium drop-shadow-md"
              >
                {slide.subtitle}
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.4 }}
                className="flex items-center gap-4"
              >
                <Link
                  href={slide.link}
                  className="inline-block relative overflow-hidden group/btn border-2 border-amber-400 bg-amber-400/10 backdrop-blur-sm text-amber-400 hover:text-[#0f172a] font-bold uppercase tracking-widest px-7 md:px-10 py-3 text-sm transition-all duration-300 shadow-[0_0_15px_rgba(251,191,36,0.2)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)]"
                >
                  <span className="relative z-10 flex items-center gap-2">{slide.cta} <ChevronRight className="h-4 w-4" /></span>
                  <div className="absolute inset-0 bg-amber-400 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300 ease-out z-0"></div>
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
