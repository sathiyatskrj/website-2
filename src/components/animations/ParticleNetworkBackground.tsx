"use client";

import React, { useEffect, useRef } from 'react';

export default function ParticleNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    let animationFrameId: number;
    let mouse = { x: -9999, y: -9999 };
    let isVisible = true;

    // ── IntersectionObserver: pause RAF when hero is off-screen ──
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight ?? window.innerHeight;

      // Reduced from 120 → 55 particles max
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 20000), 55);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,  // slower movement
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 1.5 + 0.5  // smaller dots
        });
      }
    };

    // Reduced connection distance: 120 → 100px (fewer line draws per frame)
    const MAX_DIST = 100;
    const MAX_DIST_MOUSE = 130;

    let frameCount = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Skip if not visible
      if (!isVisible) return;

      // Throttle to ~30fps instead of 60fps
      frameCount++;
      if (frameCount % 2 !== 0) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const n = particles.length;

      for (let i = 0; i < n; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(168, 85, 247, 0.35)';
        ctx.fill();

        // Connect to nearby particles (O(n²) but smaller n + early exit)
        for (let j = i + 1; j < n; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;

          // Quick bounding-box rejection before sqrt
          if (Math.abs(dx) > MAX_DIST || Math.abs(dy) > MAX_DIST) continue;

          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(168, 85, 247, ${(1 - dist / MAX_DIST) * 0.18})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Mouse connection (only if mouse is actually in frame)
        if (mouse.x > 0) {
          const dxm = p.x - mouse.x;
          const dym = p.y - mouse.y;
          if (Math.abs(dxm) < MAX_DIST_MOUSE && Math.abs(dym) < MAX_DIST_MOUSE) {
            const distm = Math.sqrt(dxm * dxm + dym * dym);
            if (distm < MAX_DIST_MOUSE) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(217, 70, 239, ${(1 - distm / MAX_DIST_MOUSE) * 0.25})`;
              ctx.lineWidth = 1;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
            }
          }
        }
      }
    };

    init();
    animate();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 200); // debounce resize
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    window.addEventListener('resize', handleResize, { passive: true });
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto z-0">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
