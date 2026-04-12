"use client";

/**
 * VantaBackground previously used vanta.js + three.js.
 * Replaced with a performant CSS animated gradient mesh background.
 */
export default function VantaBackground({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, oklch(0.65 0.2 240 / 0.15) 0%, transparent 60%), " +
            "radial-gradient(ellipse at 80% 20%, oklch(0.65 0.28 335 / 0.12) 0%, transparent 60%), " +
            "radial-gradient(ellipse at 60% 80%, oklch(0.75 0.18 55 / 0.08) 0%, transparent 60%)",
          animation: "meshMove 12s ease-in-out infinite alternate",
        }}
      />
      <style>{`
        @keyframes meshMove {
          0%   { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(20deg); }
        }
      `}</style>
    </div>
  );
}
