"use client";

import { useEffect, useRef } from "react";

/**
 * GSAP-free reveal: replaced with framer-motion ScrollReveal from AnimationUtils.
 * This file is kept as a re-export barrel to avoid breaking any imports,
 * while removing the gsap dependency entirely.
 */
export { ScrollReveal as GSAPReveal, StaggerList as GSAPStagger } from "@/components/animations/AnimationUtils";

// Marquee using pure CSS animation
import React from "react";

interface GSAPMarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function GSAPMarquee({ children, className = "", speed = 30 }: GSAPMarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex"
        style={{
          animation: `ticker ${speed}s linear infinite`,
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

// CountUp re-export (same logic, no GSAP)
export { CountUp as GSAPCounter } from "@/components/animations/AnimationUtils";
