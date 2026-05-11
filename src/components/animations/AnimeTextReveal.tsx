"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimeTextProps {
  text: string;
  className?: string;
  delay?: number;
}

/**
 * Simplified text reveal — animates whole words (not letters) to reduce Framer Motion nodes.
 * Was letter-by-letter (30+ nodes per heading) → now word-by-word (2-3 nodes per heading).
 */
export function AnimeTextReveal({
  text,
  className = "",
  delay = 0,
}: AnimeTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  const words = text.split(" ");

  return (
    <div ref={ref} className={`overflow-hidden flex flex-wrap gap-x-[0.3em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.07,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
