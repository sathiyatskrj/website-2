"use client";

import { motion } from "framer-motion";

/**
 * Floating3DHero previously used @react-three/fiber.
 * Replaced with a framer-motion animated floating chess crown.
 */
export default function Floating3DHero({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`} aria-hidden="true">
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotateY: [0, 360],
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 12, repeat: Infinity, ease: "linear" },
        }}
        style={{ fontSize: "6rem", filter: "drop-shadow(0 8px 32px oklch(0.65 0.2 240 / 0.5))" }}
      >
        ♛
      </motion.div>
    </div>
  );
}
