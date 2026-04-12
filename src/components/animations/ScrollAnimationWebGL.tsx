"use client";

import React from "react";

/**
 * ScrollAnimationWebGL previously used Three.js which bloated the bundle.
 * Replaced with a lightweight CSS-only floating chess pieces decoration.
 * Renders floating semi-transparent chess symbols that drift upward.
 */
export function ScrollAnimationWebGL() {
  const pieces = ["♟", "♜", "♝", "♞", "♛", "♚", "♙", "♖", "♗", "♘", "♕", "♔"];

  return (
    <div
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {pieces.map((piece, i) => {
        const left = `${(i * 8.3) % 100}%`;
        const duration = 18 + (i * 3.7) % 14;
        const delay = -(i * 2.1) % duration;
        const size = 16 + (i * 5) % 24;
        const opacity = 0.025 + (i % 4) * 0.008;
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
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) rotate(0deg) scale(1); }
          50%  { transform: translateY(-50vh) rotate(180deg) scale(1.05); }
          100% { transform: translateY(-110vh) rotate(360deg) scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
