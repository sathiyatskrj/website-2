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
            timerId = setTimeout(typeChar, Math.random() * 30 + 10);
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
    <div className="w-full h-full min-h-[280px] bg-[#0a0f1e]/80 backdrop-blur-xl rounded-xl border border-[#3b82f6]/30 shadow-[0_0_30px_rgba(59,130,246,0.2)] overflow-hidden font-mono flex flex-col items-start p-5 relative text-sm group">
      
      {/* Animated Glowing Python Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#3b82f6]/10 via-transparent to-[#8b5cf6]/10 pointer-events-none z-0"></div>
      
      {/* Terminal Header */}
      <div className="flex items-center justify-between w-full border-b border-[#3b82f6]/20 pb-3 mb-4 relative z-10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_#27c93f]"></div>
        </div>
        <div className="text-[#a5b4fc] text-xs font-semibold uppercase tracking-widest bg-[#3b82f6]/10 px-3 py-1 rounded-full border border-[#3b82f6]/20">Python Engine</div>
      </div>

      {/* Terminal Content */}
      <div className="flex flex-col gap-1.5 text-[11px] sm:text-xs text-gray-300 w-full overflow-y-auto overflow-x-hidden pb-4 relative z-10">
        <AnimatePresence>
          {SCRIPT_LINES.slice(0, lines).map((line, idx) => {
            const getColor = (t: string) => {
              if (t === "cmd") return "text-[#38bdf8] font-bold";
              if (t === "info") return "text-[#818cf8]";
              if (t === "success") return "text-[#34d399] font-bold text-glow";
              if (t === "out") return "text-gray-400 font-light italic";
              if (t === "sys") return "text-[#c084fc]";
              return "text-gray-300";
            };

            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }} 
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`${getColor(line.type)} leading-relaxed break-all`}
              >
                {line.type === "cmd" ? (
                    idx === SCRIPT_LINES.length - 1 ? (
                        <span><span className="text-[#f43f5e]">user@anca</span><span className="text-[#38bdf8]">:~$</span> </span>
                    ) : (
                        <span>
                            <span className="text-[#f43f5e]">user@anca</span><span className="text-[#38bdf8]">:~$</span>
                            <span className="text-[#a3e635] ml-2">{line.text.replace("user@anca:~$ ", "")}</span>
                        </span>
                    )
                ) : line.text}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Currently typing line */}
        {lines < SCRIPT_LINES.length && SCRIPT_LINES[lines].type === "cmd" && (
          <div className="text-[#38bdf8] font-bold leading-relaxed break-all flex items-center">
            <span><span className="text-[#f43f5e]">user@anca</span><span className="text-[#38bdf8]">:~$</span> </span>
            <span className="text-[#a3e635] ml-2">{typing.replace("user@anca:~$ ", "")}</span>
            <span className="w-2 h-4 bg-[#a3e635] ml-1 shadow-[0_0_8px_#a3e635] animate-pulse inline-block"></span>
          </div>
        )}
        
        {/* Blinking cursor at end when pending loop */}
        {lines >= SCRIPT_LINES.length && (
           <div className="leading-relaxed break-all mt-1 flex items-center">
               <span className="w-2 h-4 bg-[#38bdf8] shadow-[0_0_8px_#38bdf8] animate-pulse inline-block"></span>
           </div>
        )}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 text-9xl pointer-events-none z-0">
        <i className="nf nf-dev-python drop-shadow-[0_0_100px_rgba(59,130,246,0.3)]"></i>
      </div>
    </div>
  );
}
