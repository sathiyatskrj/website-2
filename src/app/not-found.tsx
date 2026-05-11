import Link from "next/link";
import type { Metadata } from "next";
import { Crown, Home, Search, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Tournaments", href: "/tournaments" },
    { label: "Players", href: "/players" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 text-center relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Chess piece */}
      <div className="relative mb-8">
        <div className="text-[120px] leading-none opacity-10 select-none font-serif text-foreground">♟</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-8xl font-black font-poppins text-gradient">404</span>
        </div>
      </div>

      <div className="relative z-10 max-w-lg mx-auto">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          <Crown className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">ANCA · Page Not Found</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black font-poppins text-foreground mb-4 leading-tight">
          This square is empty.
        </h1>
        <p className="text-muted-foreground text-base md:text-lg mb-10 font-light leading-relaxed">
          The page you&apos;re looking for has moved or doesn&apos;t exist. Let&apos;s get you back on the board.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold uppercase tracking-widest px-6 py-3.5 text-sm rounded-none hover:bg-secondary transition-colors hover:shadow-lg hover:-translate-y-0.5"
          >
            <Home className="h-4 w-4" /> Go Home
          </Link>
          <Link
            href="/tournaments"
            className="inline-flex items-center gap-2 border-2 border-primary/40 text-primary hover:border-primary font-bold uppercase tracking-widest px-6 py-3.5 text-sm rounded-none transition-colors"
          >
            View Tournaments <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="border-t border-border/50 pt-8">
          <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-bold mb-4">Quick Navigation</p>
          <div className="flex flex-wrap justify-center gap-3">
            {quickLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs font-semibold text-muted-foreground hover:text-primary border border-border/60 hover:border-primary/40 px-4 py-2 rounded-full transition-all hover:-translate-y-0.5"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
