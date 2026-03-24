"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Trophy, Users, Calendar, Download, FileText,
  ChevronRight, Star, Mail, MapPin
} from "lucide-react";
import { NewsTicker } from "@/components/NewsTicker";
// HeroCarousel uses @react-three/fiber + vanta.js which crash during SSR prerender
const HeroCarousel = dynamic(
  () => import("@/components/HeroCarousel").then((m) => ({ default: m.HeroCarousel })),
  { ssr: false, loading: () => <div className="w-full h-[380px] md:h-[500px] lg:h-[620px] bg-[#0f172a]" /> }
);
const ScrollReveal = dynamic(
  () => import("@/components/animations/AnimationUtils").then((m) => ({ default: m.ScrollReveal })),
  { ssr: false }
);

const HoverCard = dynamic(
  () => import("@/components/animations/MicroAnimations").then((m) => ({ default: m.HoverCard })),
  { ssr: false }
);

const AnimatedLink = dynamic(
  () => import("@/components/animations/MicroAnimations").then((m) => ({ default: m.AnimatedLink })),
  { ssr: false }
);

const AnimeTextReveal = dynamic(
  () => import("@/components/animations/AnimeTextReveal").then((m) => ({ default: m.AnimeTextReveal })),
  { ssr: false }
);
const StaggerList = dynamic(
  () => import("@/components/animations/AnimationUtils").then((m) => ({ default: m.StaggerList })),
  { ssr: false }
);

const CountUp = dynamic(
  () => import("@/components/animations/AnimationUtils").then((m) => ({ default: m.CountUp })),
  { ssr: false }
);

// We keep ChessPuzzleDisplay for later or other parts.
import { ChessPuzzleDisplay } from "@/components/games/MiniChessBoard";
import { PythonNerdTerminal } from "@/components/animations/PythonNerdTerminal";

// (Skipping unchanging top constants ... keeping original constants intact)

const stats = [
  { label: "Registered Players", value: 1200, suffix: "+", icon: Users },
  { label: "Annual Events", value: 50, suffix: "+", icon: Trophy },
  { label: "Years of Excellence", value: 19, suffix: "", icon: Star },
  { label: "District Units", value: 3, suffix: "", icon: MapPin },
];

const newsItems = [
  { date: "08 Mar 2026", tag: "Tournament", title: "State Chess Championship 2026 registrations open — deadline 30 April", tagColor: "bg-blue-100 text-blue-800" },
  { date: "05 Mar 2026", tag: "Circular", title: "AICF revised rating rules effective from April 2026 season", tagColor: "bg-orange-100 text-orange-800" },
  { date: "28 Feb 2026", tag: "Results", title: "Andaman District Championship 2026 final standings published", tagColor: "bg-green-100 text-green-800" },
  { date: "15 Feb 2026", tag: "Seminar", title: "Arbiter Training Seminar — seats filling fast, register immediately", tagColor: "bg-purple-100 text-purple-800" },
];

const upcomingEvents = [
  { name: "45th State Chess Championship", date: "15 May 2026", venue: "Port Blair", status: "Registrations Open" },
  { name: "Nicobar District Rapid", date: "02 Jun 2026", venue: "Car Nicobar", status: "Upcoming" },
  { name: "Junior Selection Trial", date: "20 Jun 2026", venue: "ANCA HQ", status: "Announced" },
];

const quickLinks = [
  { label: "Player Registration Form", href: "/players/register", icon: FileText },
  { label: "Tournament Calendar", href: "/tournaments", icon: Calendar },
  { label: "Download Constitution", href: "/downloads", icon: Download },
  { label: "Rating List", href: "/players", icon: Trophy },
  { label: "Contact Secretariat", href: "/contact", icon: Mail },
  { label: "News & Circulars", href: "/news", icon: FileText },
];

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-background overflow-x-hidden">
      {/* News Ticker */}
      <NewsTicker />

      {/* Hero Carousel — Framer Motion Animated Mesh BG */}
      <HeroCarousel />

      {/* Modern Bento Grid Main Content */}
      <section className="py-16 container mx-auto px-4 relative">
        {/* Animated glowing orbs for the glassmorphic background effect */}
        <div className="orb-1 top-0 -right-20" />
        <div className="orb-2 bottom-0 -left-20" />
        <div className="orb-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        
        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)] relative z-10">
          
          {/* Stats Bento Block - Spans 4 cols on lg */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 relative">
            <StaggerList stagger={0.1} delay={0.1} className="col-span-2 md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <HoverCard key={stat.label} className="glass-panel p-6 flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden group rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <Icon className="h-10 w-10 text-secondary mb-2" />
                    <div className="text-3xl md:text-5xl font-black font-poppins text-foreground text-glow tracking-tight">
                      <CountUp to={stat.value} suffix={stat.suffix} duration={2.5} />
                    </div>
                    <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                  </HoverCard>
                );
              })}
            </StaggerList>
          </div>

          {/* About ANCA - Tall Block */}
          <ScrollReveal delay={0.2} className="lg:col-span-2 md:row-span-2 glass-panel-heavy rounded-3xl p-8 relative overflow-hidden flex flex-col justify-end group">
            <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 rounded-full blur-[50px] pointer-events-none" />
            <div className="absolute -right-10 -top-10 text-[200px] leading-none font-black opacity-[0.03] dark:opacity-5 select-none pointer-events-none font-poppins text-foreground group-hover:scale-110 transition-transform duration-700">♛</div>
            
            <AnimeTextReveal text="About ANCA" className="text-3xl md:text-4xl font-black font-poppins mb-4 text-gradient" />
            <p className="text-foreground/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl font-medium">
              The Andaman & Nicobar Chess Association (ANCA) is the official governing body affiliated to AICF and FIDE.
              We promote chess across all islands since 2005 through premium tournaments, professional training, and unparalleled talent development.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors w-fit group/link">
              Read Our Story <ChevronRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>

          {/* Upcoming Events - Wide Block */}
          <ScrollReveal delay={0.3} direction="left" className="lg:col-span-2 glass-panel rounded-3xl p-8 flex flex-col hover:border-primary/30 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <AnimeTextReveal text="Upcoming Events" className="text-xl font-poppins font-bold text-primary uppercase tracking-wider" />
              <Link href="/tournaments" className="text-sm text-secondary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                 <AnimatedLink>Calendar</AnimatedLink> <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 flex-1">
              {upcomingEvents.slice(0,2).map((event) => (
                <HoverCard key={event.name} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-colors border border-border/50 group/event cursor-pointer">
                  <div className="h-12 w-12 rounded-full bg-secondary/10 group-hover/event:bg-secondary/20 transition-colors flex items-center justify-center shrink-0">
                    <Trophy className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-sm md:text-base truncate group-hover/event:text-secondary transition-colors">{event.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mt-0.5">{event.date} · {event.venue}</p>
                  </div>
                  <div className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-md">
                    {event.status}
                  </div>
                </HoverCard>
              ))}
            </div>
          </ScrollReveal>

          {/* Interactive Chess Widget - new bento block */}
          <ScrollReveal delay={0.35} direction="right" className="lg:col-span-2 glass-panel rounded-3xl p-6 hover:border-primary/30 transition-colors flex flex-col justify-center items-center relative overflow-hidden">
             <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-amber-400/5 rounded-full blur-[40px] pointer-events-none" />
             <div className="w-full max-w-[320px]">
               <ChessPuzzleDisplay title="Playable Demo" description="Interact with the board directly" />
             </div>
          </ScrollReveal>

          {/* Python Script Terminal - new bento block */}
          <ScrollReveal delay={0.45} direction="left" className="lg:col-span-2 rounded-3xl p-1 bg-gradient-to-br from-gray-800 to-black shadow-2xl overflow-hidden hover:scale-[1.01] transition-transform duration-500">
             <div className="w-full h-full">
               <PythonNerdTerminal />
             </div>
          </ScrollReveal>

          {/* Support block - previously Announcements */}
          <ScrollReveal delay={0.5} direction="up" className="lg:col-span-2 glass-panel rounded-3xl p-8 max-h-[400px] overflow-hidden flex flex-col hover:border-primary/30 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <AnimeTextReveal text="Announcements" className="text-xl font-poppins font-bold text-primary uppercase tracking-wider" />
              <Link href="/news" className="text-sm text-secondary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                <AnimatedLink>All News</AnimatedLink> <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex flex-col gap-3 overflow-y-auto pr-2 scrollbar-thin">
              {newsItems.map((item) => (
                <HoverCard key={item.title} className="p-4 rounded-2xl border border-border/50 hover:bg-muted/40 transition-colors flex flex-col gap-2 cursor-pointer group/news">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <span className="text-[10px] md:text-xs font-bold text-muted-foreground">{item.date}</span>
                  </div>
                  <p className="font-semibold text-foreground text-sm md:text-base leading-snug group-hover/news:text-primary transition-colors">{item.title}</p>
                </HoverCard>
              ))}
            </div>
          </ScrollReveal>

          {/* Contact & Affiliations - Col 2 */}
          <ScrollReveal delay={0.6} direction="up" className="lg:col-span-2 glass-panel-heavy rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
             <div className="absolute inset-0 bg-chess-pattern opacity-[0.02] pointer-events-none" />
             <div className="relative z-10">
                <h3 className="font-poppins font-bold text-primary text-sm uppercase tracking-wider mb-6">Connect With Us</h3>
                <ul className="space-y-4 text-sm font-medium text-foreground/80 mb-8">
                  <li className="flex items-center gap-3"><div className="p-2.5 rounded-full bg-primary/10 text-primary"><MapPin className="h-4 w-4" /></div> Secretariat, Port Blair - 744101</li>
                  <li className="flex items-center gap-3"><div className="p-2.5 rounded-full bg-primary/10 text-primary"><Mail className="h-4 w-4" /></div> info@ancachess.in</li>
                </ul>
                <Link href="/contact" className="w-full text-center block text-sm font-bold uppercase tracking-widest border-2 border-secondary text-secondary hover:bg-secondary hover:text-background px-6 py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(var(--secondary),0.1)] hover:shadow-[0_0_20px_rgba(var(--secondary),0.3)]">
                  Contact Support
                </Link>
                
                <div className="mt-8 pt-6 border-t border-border/50">
                   <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-3">Recognised By</p>
                   <div className="flex gap-2 flex-wrap">
                    {["AICF", "FIDE", "Sports Authority of India"].map((org) => (
                      <span key={org} className="px-3 py-1.5 bg-background border border-border/60 text-[10px] font-black uppercase tracking-wider text-foreground rounded-md hover:border-secondary transition-colors cursor-default">
                        {org}
                      </span>
                    ))}
                  </div>
                </div>
             </div>
          </ScrollReveal>

        </div>
      </section>
    </div>
  );
}
