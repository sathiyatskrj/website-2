"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Trophy, Users, Calendar, Download, FileText,
  ChevronRight, Star, Mail, MapPin, ExternalLink, Clock
} from "lucide-react";
import { NewsTicker } from "@/components/NewsTicker";
import { SponsorsMarquee } from "@/components/SponsorsMarquee";

// HeroCarousel uses canvas particles which must be client-only
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

import { ChessPuzzleDisplay } from "@/components/games/MiniChessBoard";

const stats = [
  { label: "Registered Players", value: 1200, suffix: "+", icon: Users },
  { label: "Annual Events", value: 50, suffix: "+", icon: Trophy },
  { label: "Years of Excellence", value: 19, suffix: "", icon: Star },
  { label: "District Units", value: 3, suffix: "", icon: MapPin },
];

const newsItems = [
  { date: "08 Mar 2026", tag: "Tournament", title: "State Chess Championship 2026 registrations open — deadline 30 April", tagColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300" },
  { date: "05 Mar 2026", tag: "Circular", title: "AICF revised rating rules effective from April 2026 season", tagColor: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300" },
  { date: "28 Feb 2026", tag: "Results", title: "Andaman District Championship 2026 final standings published", tagColor: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300" },
  { date: "15 Feb 2026", tag: "Seminar", title: "Arbiter Training Seminar — seats filling fast, register immediately", tagColor: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300" },
];

const upcomingEvents = [
  { name: "45th State Chess Championship", date: "15 May 2026", venue: "Port Blair", status: "Registrations Open", statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400" },
  { name: "Nicobar District Rapid", date: "02 Jun 2026", venue: "Car Nicobar", status: "Upcoming", statusColor: "text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400" },
  { name: "Junior Selection Trial", date: "20 Jun 2026", venue: "ANCA HQ", status: "Announced", statusColor: "text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400" },
];

const playerPortalLinks = [
  { label: "New Player Registration", href: "https://prs.aicf.in/new-register", icon: Users, external: true },
  { label: "Player Search", href: "https://prs.aicf.in/players", icon: FileText, external: true },
  { label: "Upcoming National Events", href: "https://aicf.in/upcoming-nationals/", icon: Calendar, external: true },
  { label: "FIDE Ratings", href: "https://ratings.fide.com", icon: Trophy, external: true },
  { label: "Download Constitution", href: "/downloads", icon: Download, external: false },
];

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-background overflow-x-hidden">
      {/* News Ticker */}
      <NewsTicker />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Sponsors Marquee Strip */}
      <section className="border-y border-border/50 bg-muted/20">
        <SponsorsMarquee />
      </section>

      {/* Modern Bento Grid Main Content */}
      <section className="py-24 container mx-auto px-4 relative overflow-hidden">
        {/* Animated glowing orbs */}
        <div className="absolute top-0 -right-20 w-[600px] h-[600px] bg-primary/40 dark:bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-secondary/40 dark:bg-secondary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 dark:bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/20 dark:bg-emerald-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />
        
        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)] relative z-10">
          
          {/* Stats Bento Block - Spans 4 cols on lg */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 relative">
            <StaggerList stagger={0.1} delay={0.1} className="col-span-2 md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => {
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
              The Andaman &amp; Nicobar Chess Association (ANCA) is the official governing body affiliated to AICF and FIDE.
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
            <div className="grid gap-3 flex-1">
              {upcomingEvents.map((event) => (
                <HoverCard key={event.name} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-colors border border-border/50 group/event cursor-pointer">
                  <div className="h-12 w-12 rounded-full bg-secondary/10 group-hover/event:bg-secondary/20 transition-colors flex items-center justify-center shrink-0">
                    <Trophy className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-sm md:text-base truncate group-hover/event:text-secondary transition-colors">{event.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mt-0.5 flex items-center gap-1.5">
                      <Clock className="h-3 w-3" /> {event.date} · {event.venue}
                    </p>
                  </div>
                  <div className={`hidden sm:block text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md ${event.statusColor}`}>
                    {event.status}
                  </div>
                </HoverCard>
              ))}
            </div>
          </ScrollReveal>

          {/* Interactive Chess Widget */}
          <ScrollReveal delay={0.35} direction="right" className="lg:col-span-2 glass-panel rounded-3xl p-6 hover:border-primary/30 transition-colors flex flex-col justify-center items-center relative overflow-hidden">
             <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-amber-400/5 rounded-full blur-[40px] pointer-events-none" />
             <div className="w-full max-w-[320px]">
               <ChessPuzzleDisplay title="Playable Demo" description="Interact with the board directly" />
             </div>
          </ScrollReveal>

          {/* Player Portal Hub */}
          <ScrollReveal delay={0.4} direction="up" className="lg:col-span-2 glass-panel rounded-3xl p-8 flex flex-col hover:border-secondary/50 transition-colors border border-secondary/20 bg-secondary/5 relative overflow-hidden group">
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-secondary/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-secondary/20 transition-colors duration-700" />
            <div className="flex items-center justify-between mb-6 relative z-10">
              <AnimeTextReveal text="Player Portal" className="text-xl font-poppins font-bold text-secondary uppercase tracking-wider" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10 flex-1">
              {playerPortalLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link 
                    key={link.label} 
                    href={link.href}
                    target={link.external ? "_blank" : "_self"}
                    rel={link.external ? "noopener noreferrer" : ""}
                    className="flex items-center gap-3 p-3 rounded-xl bg-background/50 hover:bg-secondary text-foreground hover:text-secondary-foreground transition-all duration-300 border border-border/50 hover:border-secondary shadow-sm hover:shadow-md group/link"
                  >
                    <div className="bg-secondary/10 group-hover/link:bg-background/20 p-2 rounded-lg transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-semibold truncate">{link.label}</span>
                    {link.external && <ExternalLink className="h-3 w-3 ml-auto shrink-0 opacity-40 group-hover/link:opacity-80" />}
                  </Link>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Sponsors / Affiliations - Replaces Python Terminal */}
          <ScrollReveal delay={0.45} direction="left" className="lg:col-span-2 rounded-3xl p-[2px] bg-gradient-to-br from-primary via-[#8b5cf6] to-secondary shadow-[0_0_40px_rgba(139,92,246,0.3)] overflow-hidden hover:scale-[1.01] hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] transition-all duration-500">
             <div className="w-full h-full rounded-3xl bg-background/80 backdrop-blur-2xl p-8 flex flex-col justify-between">
               <AnimeTextReveal text="Our Affiliations" className="text-xl font-poppins font-bold text-gradient uppercase tracking-wider mb-2" />
               <p className="text-muted-foreground text-sm mb-6">
                 ANCA is recognised by AICF, FIDE, and Sports Authority of India. We operate under the full guidance of national and international chess bodies.
               </p>
               <div className="grid grid-cols-3 gap-4">
                 {[
                   { abbr: "AICF", name: "All India Chess Federation", href: "https://aicf.in", color: "border-blue-500/40 bg-blue-500/5 text-blue-400" },
                   { abbr: "FIDE", name: "World Chess Federation", href: "https://fide.com", color: "border-emerald-500/40 bg-emerald-500/5 text-emerald-400" },
                   { abbr: "SAI", name: "Sports Authority of India", href: "https://sportsauthorityofindia.nic.in", color: "border-amber-500/40 bg-amber-500/5 text-amber-400" },
                 ].map((org) => (
                   <a
                     key={org.abbr}
                     href={org.href}
                     target="_blank"
                     rel="noopener noreferrer"
                     className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border ${org.color} hover:scale-105 transition-transform group/org`}
                   >
                     <span className={`text-xl font-black tracking-widest ${org.color.split(" ")[2]}`}>{org.abbr}</span>
                     <span className="text-[9px] font-semibold uppercase tracking-widest text-center text-muted-foreground leading-tight">{org.name}</span>
                     <ExternalLink className="h-3 w-3 opacity-0 group-hover/org:opacity-60 transition-opacity" />
                   </a>
                 ))}
               </div>
             </div>
          </ScrollReveal>

          {/* Announcements Block */}
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

          {/* Contact & Affiliations */}
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
             </div>
          </ScrollReveal>

        </div>
      </section>
    </div>
  );
}
