"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCRIPT_LINES = [
  { text: "user@anca:~$ python run_evaluation.py --engine stockfish_16 --depth 24", delay: 800, type: "cmd" },
  { text: "Initializing Stockfish 16.1 (avx2)...", delay: 400, type: "sys" },
  { text: "Loading position: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", delay: 600, type: "sys" },
  { text: "[INFO] Starting deep evaluation... CPUs: 8, Threads: 16", delay: 500, type: "info" },
  { text: "info depth 1 seldepth 1 multipv 1 score cp 33 nodes 20 nps 20000 tbhits 0 time 1 pv d2d4", delay: 200, type: "out" },
  { text: "info depth 4 seldepth 5 multipv 1 score cp 45 nodes 1342 nps 671000 tbhits 0 time 2 pv e2e4 c7c5 g1f3", delay: 300, type: "out" },
  { text: "info depth 12 seldepth 16 multipv 1 score cp 51 nodes 125432 nps 4181066 tbhits 0 time 30 pv e2e4 c7c5 g1f3 d7d6 d2d4 c5d4", delay: 600, type: "out" },
  { text: "info depth 20 seldepth 28 multipv 1 score cp 42 nodes 3125432 nps 6250864 tbhits 0 time 500 pv e2e4 e7e5 g1f3 b8c6 f1b5 a7a6", delay: 1200, type: "out" },
  { text: "info depth 24 seldepth 34 multipv 1 score cp 48 nodes 15234512 nps 7617256 tbhits 0 time 2000 pv e2e4 e7e5 g1f3 b8c6 f1c4 f8c5", delay: 1800, type: "out" },
  { text: "[SUCCESS] Evaluation complete. Best move: e2e4. Eval: +0.48", delay: 500, type: "success" },
  { text: "user@anca:~$ ", delay: 4000, type: "cmd", cursor: true }
];

export function PythonNerdTerminal() {
  const [lines, setLines] = useState<number>(0);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    let currentLine = 0;
    let isMounted = true;
    let charIndex = 0;
    let timerId: NodeJS.Timeout;

    const processLine = () => {
      if (!isMounted) return;
      if (currentLine >= SCRIPT_LINES.length) {
        timerId = setTimeout(() => {
          if (isMounted) {
            setLines(0);
            setTyping("");
            currentLine = 0;
            processLine();
          }
        }, 5000);
        return;
      }

      const line = SCRIPT_LINES[currentLine];
      
      if (line.type === "cmd") {
        setTyping("");
        charIndex = 0;
        
        const typeChar = () => {
          if (!isMounted) return;
          if (charIndex < line.text.length) {
            setTyping(line.text.substring(0, charIndex + 1));
            charIndex++;
            timerId = setTimeout(typeChar, Math.random() * 30 + 20);
          } else {
            timerId = setTimeout(() => {
              if (isMounted) {
                setLines(prev => prev + 1);
                currentLine++;
                processLine();
              }
            }, line.delay);
          }
        };
        typeChar();
      } else {
        timerId = setTimeout(() => {
          if (isMounted) {
            setLines(prev => prev + 1);
            currentLine++;
            processLine();
          }
        }, line.delay);
      }
    };

    processLine();

    return () => {
      isMounted = false;
      clearTimeout(timerId);
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[250px] bg-[#0c0c0c] rounded-xl border border-gray-800 shadow-2xl overflow-hidden font-mono flex flex-col items-start p-4 relative text-sm group">
      
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4 w-full border-b border-gray-800 pb-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="text-gray-500 text-xs ml-2 font-semibold">user@anca: ~/engine</div>
      </div>

      {/* Terminal Content */}
      <div className="flex flex-col gap-1 text-[11px] sm:text-xs text-gray-300 w-full overflow-y-auto overflow-x-hidden pb-4">
        <AnimatePresence>
          {SCRIPT_LINES.slice(0, lines).map((line, idx) => {
            const getColor = (t: string) => {
              if (t === "cmd") return "text-green-400 font-bold";
              if (t === "info") return "text-blue-400";
              if (t === "success") return "text-emerald-400 font-bold";
              if (t === "out") return "text-gray-400 italic";
              return "text-gray-300";
            };

            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                className={`${getColor(line.type)} leading-relaxed break-all`}
              >
                {/* For the last entered command, we fake the prompt since it was already typed */}
                {line.type === "cmd" ? (
                    idx === SCRIPT_LINES.length - 1 ? (
                        <span><span className="text-rose-400">user@anca</span><span className="text-blue-400">:~$</span> </span>
                    ) : line.text
                ) : line.text}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Currently typing line */}
        {lines < SCRIPT_LINES.length && SCRIPT_LINES[lines].type === "cmd" && (
          <div className="text-green-400 font-bold leading-relaxed break-all flex items-center">
            <span>{typing}</span>
            <span className="w-2 h-4 bg-gray-400 ml-1 animate-pulse inline-block"></span>
          </div>
        )}
        
        {/* Blinking cursor at end when pending loop */}
        {lines >= SCRIPT_LINES.length && (
           <div className="leading-relaxed break-all mt-1 flex items-center">
               <span className="w-2 h-4 bg-gray-400 animate-pulse inline-block"></span>
           </div>
        )}
      </div>

      <div className="absolute top-4 right-4 text-gray-700/50 text-6xl pointer-events-none group-hover:text-gray-700/80 transition-colors duration-500">
        <i className="nf nf-dev-python"></i>
      </div>
    </div>
  );
}
