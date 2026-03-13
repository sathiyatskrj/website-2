"use client";

import React, { useEffect, useRef, useMemo } from 'react';

// Light, medium, and dark variants of chess pieces
const CHESS_PIECES = ['♔', '♕', '♖', '♗', '♘', '♙', '♚', '♛', '♜', '♝', '♞', '♟'];

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  piece: string;
  rotation: number;
  rotationSpeed: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    // Particles sizing
    this.size = Math.random() * 20 + 8;
    // Slow drifting movement
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    
    // Select color based on random factor for depth effect
    const opacity = Math.random() * 0.15 + 0.05;
    this.color = `rgba(255, 255, 255, ${opacity})`;
    
    this.piece = CHESS_PIECES[Math.floor(Math.random() * CHESS_PIECES.length)];
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 0.2;
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;

    // Wrap around edges smoothly
    if (this.x < -this.size * 2) this.x = canvasWidth + this.size * 2;
    if (this.x > canvasWidth + this.size * 2) this.x = -this.size * 2;
    if (this.y < -this.size * 2) this.y = canvasHeight + this.size * 2;
    if (this.y > canvasHeight + this.size * 2) this.y = -this.size * 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.font = `${this.size}px Arial`;
    ctx.fillStyle = this.color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.piece, 0, 0);
    ctx.restore();
  }
}

export default function CanvasChessBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    const init = () => {
      canvas.width = window.innerWidth;
      // We take max height to ensure it covers even when scrolling/resizing slightly
      canvas.height = Math.max(window.innerHeight, document.documentElement.scrollHeight || window.innerHeight);
      
      const numberOfCounter = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100);
      particlesArray = [];
      for (let i = 0; i < numberOfCounter; i++) {
        particlesArray.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(canvas.width, canvas.height);
        particlesArray[i].draw(ctx);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
      {/* Overlay gradient to blend with the hero carousel background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
    </div>
  );
}
