"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const chessSymbols = ["♔", "♕", "♖", "♗", "♘", "♙", "♚", "♛", "♜", "♝", "♞", "♟"];

interface FloatingPiece {
  id: number;
  symbol: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

export default function FramerChessBackground() {
  const [pieces, setPieces] = useState<FloatingPiece[]>([]);

  useEffect(() => {
    // Generate random pieces only on client to avoid hydration mismatch
    const generated = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      symbol: chessSymbols[Math.floor(Math.random() * chessSymbols.length)],
      x: Math.random() * 100, // percentage
      y: Math.random() * 100,
      size: 40 + Math.random() * 120, // 40px to 160px
      duration: 15 + Math.random() * 25, // 15s to 40s
      delay: Math.random() * 5,
      rotation: (Math.random() - 0.5) * 60, // -30 to 30 deg
    }));
    setPieces(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a1128] z-0">
      {/* Mesh gradient overlay using pseudo animated blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -60, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-amber-500/10 rounded-full blur-[140px] mix-blend-screen pointer-events-none" 
      />
      
      {/* Floating Chess Pieces */}
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute text-white/5 select-none pointer-events-none font-serif leading-none"
          style={{ fontSize: piece.size }}
          initial={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            rotate: piece.rotation,
            opacity: 0
          }}
          animate={{
            top: [`${piece.y}%`, `${piece.y - 15 - Math.random() * 10}%`, `${piece.y}%`],
            rotate: [piece.rotation, piece.rotation + 30, piece.rotation],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: piece.duration,
            repeat: Infinity,
            delay: piece.delay,
            ease: "easeInOut"
          }}
        >
          {piece.symbol}
        </motion.div>
      ))}
    </div>
  );
}
