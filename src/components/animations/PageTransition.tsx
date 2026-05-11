"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Wraps page content with a smooth fade transition on route changes.
 * `initial={false}` prevents the flash/fade-in on first page load —
 * the animation only fires when the route actually changes.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // On first render, skip the enter animation entirely so the page
  // appears instantly without any opacity flash.
  const initial = isFirstRender.current
    ? false
    : { opacity: 0, y: 8 };
  isFirstRender.current = false;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={initial}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{
          duration: 0.28,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Slide transition style.
 */
export function SlideTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
