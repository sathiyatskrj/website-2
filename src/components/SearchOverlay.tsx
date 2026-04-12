"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Trophy, Users, Calendar, FileText } from "lucide-react";
import Link from "next/link";

interface SearchResult {
  title: string;
  href: string;
  category: string;
  icon: React.ElementType;
}

const SEARCH_INDEX: SearchResult[] = [
  { title: "About ANCA", href: "/about", category: "Organization", icon: Trophy },
  { title: "Executive Committee", href: "/committee", category: "Organization", icon: Users },
  { title: "Tournament Calendar", href: "/tournaments", category: "Tournaments", icon: Calendar },
  { title: "Register as Player", href: "/players/register", category: "Players", icon: Users },
  { title: "Player Directory", href: "/players", category: "Players", icon: Users },
  { title: "Download Constitution", href: "/downloads", category: "Downloads", icon: FileText },
  { title: "Latest News", href: "/news", category: "News", icon: FileText },
  { title: "Arbiters & Coaches", href: "/arbiters-coaches", category: "Resources", icon: Users },
  { title: "Contact ANCA", href: "/contact", category: "Contact", icon: FileText },
  { title: "District Units", href: "/districts", category: "Organization", icon: Trophy },
  { title: "State Championship 2026", href: "/tournaments", category: "Tournaments", icon: Trophy },
  { title: "FIDE Ratings Lookup", href: "https://ratings.fide.com", category: "External", icon: Trophy },
];

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");

  const results = query.trim().length > 0
    ? SEARCH_INDEX.filter(r =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : SEARCH_INDEX.slice(0, 6);

  useEffect(() => {
    if (!open) { setQuery(""); return; }
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="relative w-full max-w-xl bg-background/95 backdrop-blur-2xl border border-border rounded-2xl shadow-2xl overflow-hidden"
            initial={{ y: -20, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border/60">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search tournaments, news, players..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-base outline-none font-sans"
              />
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results */}
            <div className="p-3 max-h-96 overflow-y-auto">
              {results.length === 0 ? (
                <p className="text-center text-muted-foreground text-sm py-8">No results found.</p>
              ) : (
                <>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2 mb-2">
                    {query.trim() ? "Results" : "Quick Links"}
                  </p>
                  <ul className="space-y-1">
                    {results.map((r) => {
                      const Icon = r.icon;
                      return (
                        <li key={r.href + r.title}>
                          <Link
                            href={r.href}
                            onClick={onClose}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/60 transition-colors group"
                          >
                            <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                {r.title}
                              </span>
                              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                                {r.category}
                              </span>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>

            <div className="px-5 py-3 border-t border-border/40 flex items-center gap-4 text-[10px] text-muted-foreground font-medium">
              <span><kbd className="bg-muted border border-border rounded px-1.5 py-0.5 font-mono text-[9px]">↑↓</kbd> navigate</span>
              <span><kbd className="bg-muted border border-border rounded px-1.5 py-0.5 font-mono text-[9px]">↵</kbd> open</span>
              <span><kbd className="bg-muted border border-border rounded px-1.5 py-0.5 font-mono text-[9px]">Esc</kbd> close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
