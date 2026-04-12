"use client";

import { useEffect, useState, useRef } from "react";

/**
 * Pure React typewriter effect (no typed.js dependency).
 */
interface TypewriterProps {
  strings: string[];
  className?: string;
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  startDelay?: number;
  loop?: boolean;
  showCursor?: boolean;
  cursorChar?: string;
}

export function Typewriter({
  strings,
  className = "",
  typeSpeed = 50,
  backSpeed = 30,
  backDelay = 1500,
  startDelay = 500,
  loop = true,
  showCursor = true,
  cursorChar = "|",
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"wait" | "type" | "pause" | "erase">("wait");
  const [strIdx, setStrIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = strings[strIdx] ?? "";

    const tick = () => {
      if (phase === "wait") {
        timerRef.current = setTimeout(() => setPhase("type"), startDelay);
      } else if (phase === "type") {
        if (charIdx < current.length) {
          setDisplayed(current.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
          timerRef.current = setTimeout(tick, typeSpeed);
        } else {
          setPhase("pause");
          timerRef.current = setTimeout(tick, backDelay);
        }
      } else if (phase === "pause") {
        if (loop || strIdx < strings.length - 1) {
          setPhase("erase");
          timerRef.current = setTimeout(tick, backSpeed);
        }
      } else if (phase === "erase") {
        if (charIdx > 0) {
          setDisplayed(current.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
          timerRef.current = setTimeout(tick, backSpeed);
        } else {
          const next = (strIdx + 1) % strings.length;
          if (!loop && next === 0) return;
          setStrIdx(next);
          setCharIdx(0);
          setPhase("type");
          timerRef.current = setTimeout(tick, typeSpeed);
        }
      }
    };

    timerRef.current = setTimeout(tick, 0);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase, charIdx, strIdx, strings, typeSpeed, backSpeed, backDelay, startDelay, loop]);

  return (
    <span className={className}>
      {displayed}
      {showCursor && (
        <span className="animate-pulse opacity-80" style={{ animationDuration: "0.7s" }}>
          {cursorChar}
        </span>
      )}
    </span>
  );
}

/**
 * Static typewriter — types a single string once, then stops.
 */
interface StaticTypewriterProps {
  text: string;
  className?: string;
  typeSpeed?: number;
  startDelay?: number;
  onComplete?: () => void;
}

export function StaticTypewriter({
  text,
  className = "",
  typeSpeed = 40,
  startDelay = 300,
  onComplete,
}: StaticTypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
          onComplete?.();
        }
      }, typeSpeed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, typeSpeed, startDelay, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="animate-pulse opacity-70">_</span>}
    </span>
  );
}

/**
 * Hero typewriter with rotating words using pure React state.
 */
interface HeroTypewriterProps {
  prefix?: string;
  rotatingWords: string[];
  className?: string;
  prefixClassName?: string;
  wordClassName?: string;
}

export function HeroTypewriter({
  prefix = "",
  rotatingWords,
  className = "",
  prefixClassName = "",
  wordClassName = "",
}: HeroTypewriterProps) {
  return (
    <span className={className}>
      {prefix && <span className={prefixClassName}>{prefix} </span>}
      <Typewriter
        strings={rotatingWords}
        className={wordClassName}
        typeSpeed={60}
        backSpeed={40}
        backDelay={2000}
        startDelay={800}
        loop={true}
        showCursor={true}
        cursorChar="|"
      />
    </span>
  );
}
