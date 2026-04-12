"use client";

import { motion } from "framer-motion";

/**
 * SponsorsMarquee — infinite scrolling banner of partner logos/text.
 * Replaces PythonNerdTerminal on the homepage bento.
 * All framer-motion, zero external dependencies.
 */

interface Partner {
  name: string;
  abbr: string;
  color?: string;
}

const partners: Partner[] = [
  { name: "All India Chess Federation", abbr: "AICF", color: "text-blue-400" },
  { name: "World Chess Federation", abbr: "FIDE", color: "text-emerald-400" },
  { name: "Sports Authority of India", abbr: "SAI", color: "text-amber-400" },
  { name: "Andaman & Nicobar Admin", abbr: "A&N ADMIN", color: "text-purple-400" },
  { name: "Ministry of Youth Affairs", abbr: "MoYA", color: "text-rose-400" },
  { name: "CHESS IN SCHOOLS", abbr: "CIS", color: "text-cyan-400" },
];

function PartnerBadge({ partner }: { partner: Partner }) {
  return (
    <div className="flex items-center gap-3 mx-8 shrink-0">
      <div className="w-10 h-10 rounded-full border-2 border-border/60 bg-muted/30 flex items-center justify-center">
        <span className={`font-black text-[9px] tracking-widest ${partner.color ?? ""}`}>
          {partner.abbr.slice(0, 4)}
        </span>
      </div>
      <div className="flex flex-col">
        <span className={`font-black text-xs tracking-widest uppercase ${partner.color ?? "text-foreground"}`}>
          {partner.abbr}
        </span>
        <span className="text-[10px] text-muted-foreground font-medium max-w-[140px] truncate">
          {partner.name}
        </span>
      </div>
      <span className="text-border/60 ml-4 text-xl font-thin select-none">·</span>
    </div>
  );
}

export function SponsorsMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-6">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground text-center mb-4">
        Recognised &amp; Affiliated With
      </p>
      <div className="flex overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: "-50%" }}
          transition={{
            x: {
              duration: 22,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            },
          }}
        >
          {/* Doubled for seamless loop */}
          {[...partners, ...partners].map((p, i) => (
            <PartnerBadge key={i} partner={p} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
