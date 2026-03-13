"use client";

import { useEffect, useRef } from "react";

// Minimal GSAP context interface — avoids the broken `import("gsap").Context` type
interface GSAPCtx {
  revert: () => void;
}

/**
 * GSAP ScrollTrigger reveal — animates elements into view on scroll.
 * All GSAP code is dynamically imported (client-only) to avoid SSR issues.
 */
interface GSAPRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right" | "fade" | "scale";
  duration?: number;
}

export function GSAPReveal({
  children,
  className = "",
  delay = 0,
  from = "bottom",
  duration = 0.8,
}: GSAPRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let ctx: GSAPCtx | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const fromVars: Record<string, Record<string, number>> = {
        bottom: { y: 50, opacity: 0 },
        left: { x: -60, opacity: 0 },
        right: { x: 60, opacity: 0 },
        fade: { opacity: 0 },
        scale: { scale: 0.85, opacity: 0 },
      };

      ctx = gsap.context(() => {
        gsap.from(ref.current!, {
          ...fromVars[from],
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            once: true,
          },
        });
      });
    };

    init();
    return () => { ctx?.revert(); };
  }, [delay, from, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * GSAP Timeline stagger — staggers direct children on scroll trigger.
 */
interface GSAPStaggerProps {
  children: React.ReactNode[];
  className?: string;
  stagger?: number;
  delay?: number;
  from?: "bottom" | "left" | "right" | "fade" | "scale";
}

export function GSAPStagger({
  children,
  className = "",
  stagger = 0.12,
  delay = 0,
  from = "bottom",
}: GSAPStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let ctx: GSAPCtx | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const fromVars: Record<string, Record<string, number>> = {
        bottom: { y: 40, opacity: 0 },
        left: { x: -40, opacity: 0 },
        right: { x: 40, opacity: 0 },
        fade: { opacity: 0 },
        scale: { scale: 0.9, opacity: 0 },
      };

      ctx = gsap.context(() => {
        gsap.from(Array.from(ref.current!.children), {
          ...fromVars[from],
          duration: 0.7,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            once: true,
          },
        });
      });
    };

    init();
    return () => { ctx?.revert(); };
  }, [stagger, delay, from]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * GSAP infinite marquee / horizontal scroll strip.
 */
interface GSAPMarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function GSAPMarquee({ children, className = "", speed = 30 }: GSAPMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    let tween: { kill: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      tween = gsap.to(trackRef.current!, {
        x: "-50%",
        duration: speed,
        ease: "none",
        repeat: -1,
      });
    };

    init();
    return () => { tween?.kill(); };
  }, [speed]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex">
        {children}
        {children}
      </div>
    </div>
  );
}

/**
 * GSAP counter — smooth eased number animation triggered on scroll.
 */
interface GSAPCounterProps {
  to: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}

export function GSAPCounter({
  to,
  suffix = "",
  prefix = "",
  className = "",
  duration = 2,
}: GSAPCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let ctx: GSAPCtx | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const obj = { value: 0 };
      ctx = gsap.context(() => {
        gsap.to(obj, {
          value: to,
          duration,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent =
                prefix + Math.round(obj.value).toLocaleString("en-IN") + suffix;
            }
          },
        });
      });
    };

    init();
    return () => { ctx?.revert(); };
  }, [to, duration, suffix, prefix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
