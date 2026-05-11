"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

// Typed bezier curves to satisfy Framer Motion v12 strict tuple type
const EASE_OUT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const EASE_IN_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Splits text into words and animates them in one-by-one on scroll.
 */
interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  splitBy?: "words" | "chars";
  stagger?: number;
}

export function SplitTextReveal({
  text,
  className = "",
  delay = 0,
  splitBy = "words",
  stagger = 0.04,
}: SplitTextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const tokens = splitBy === "chars" ? text.split("") : text.split(" ");

  return (
    <span ref={ref} className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {tokens.map((token, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + i * stagger,
              ease: EASE_IN_OUT,
            }}
          >
            {token}{splitBy === "words" ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * Reveals children with a fade + slide-up animation when they enter the viewport.
 */
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
  duration?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.7,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: EASE_OUT,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger-animates a list of child elements.
 */
interface StaggerListProps {
  children: React.ReactNode[];
  className?: string;
  stagger?: number;
  delay?: number;
}

export function StaggerList({
  children,
  className = "",
  stagger = 0.1,
  delay = 0,
}: StaggerListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: EASE_OUT },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children.map((child, i) => (
        <motion.div key={i} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * Animates a number counting up from 0 to target value on scroll.
 */
interface CountUpProps {
  to: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

export function CountUp({ to, suffix = "", className = "", duration = 2 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current || !ref.current) return;
    hasAnimated.current = true;
    const start = Date.now();

    const frame = () => {
      const progress = Math.min((Date.now() - start) / (duration * 1000), 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * to);
      if (ref.current) ref.current.textContent = current.toLocaleString("en-IN") + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }, [isInView, to, duration, suffix]);

  return <span ref={ref} className={className}>0{suffix}</span>;
}
