"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimeTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
}

/**
 * Framer Motion letter-by-letter text reveal (replaces animejs version).
 */
export function AnimeTextReveal({
  text,
  className = "",
  delay = 0,
  duration = 0.5,
  staggerDelay = 0.03
}: AnimeTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const words = text.split(" ").map(word => ({
    word,
    letters: word.split("")
  }));

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      }
    }
  };

  const letterVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`overflow-hidden flex flex-wrap gap-[0.25em] ${className}`}
    >
      {words.map((wordObj, wordIndex) => (
        <span key={`word-${wordIndex}`} className="inline-flex overflow-hidden">
          {wordObj.letters.map((letter, letterIndex) => (
            <motion.span
              key={`letter-${wordIndex}-${letterIndex}`}
              variants={letterVariants}
              className="inline-block"
              style={{ transformOrigin: "0 100%" }}
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
}
