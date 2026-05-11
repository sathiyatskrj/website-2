"use client";

import dynamic from "next/dynamic";

/**
 * Client-side wrappers for components that require `ssr: false`.
 */

export const PageTransition = dynamic(
  () => import("@/components/animations/PageTransition").then((m) => ({ default: m.PageTransition })),
  { ssr: false }
);

// ScrollAnimationWebGL removed from global layout — was running 12 RAF animations
// on every single page. Now only used inside HeroCarousel on the homepage.
