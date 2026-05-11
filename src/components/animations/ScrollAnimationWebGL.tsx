"use client";

import React from "react";

/**
 * ScrollAnimationWebGL — lightweight CSS floating chess pieces.
 * Reduced from 12 pieces → 6, only on desktop, lower opacity.
 * Removed from global layout to prevent running on every page.
 * Only used on the homepage HeroCarousel.
 */
export function ScrollAnimationWebGL() {
  const pieces = ["♟", "♜", "♝", "♛", "♔", "♞"];

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden hidden md:block"
      aria-hidden="true"
    >
      {pieces.map((piece, i) => {
        const left = `${8 + (i * 16) % 90}%`;
        const duration = 22 + (i * 4) % 12;
        const delay = -(i * 3.5) % duration;
        const size = 18 + (i * 6) % 20;
        const opacity = 0.018 + (i % 3) * 0.006;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left,
              bottom: "-10%",
              fontSize: `${size}px`,
              opacity,
              animation: `floatUp ${duration}s linear ${delay}s infinite`,
              color: "currentColor",
            }}
          >
            {piece}
          </span>
        );
      })}
    </div>
  );
}
