"use client";

import { Target, Crown, Users, FileText, Building, History, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const ScrollReveal = dynamic(
  () => import("@/components/animations/AnimationUtils").then((m) => ({ default: m.ScrollReveal })),
  { ssr: false }
);

const HoverCard = dynamic(
  () => import("@/components/animations/MicroAnimations").then((m) => ({ default: m.HoverCard })),
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

export default function AboutPage() {
  const committee = [
    { name: "President (Name TBD)", role: "President", initials: "P" },
    { name: "Vice President (Name TBD)", role: "Vice President", initials: "VP" },
    { name: "Secretary General", role: "Secretary", initials: "SG" },
    { name: "Treasurer", role: "Treasurer", initials: "TR" },
  ];

  return (
    <div className="flex flex-col w-full bg-background relative overflow-hidden pb-20">
      
      {/* Premium Hero Banner */}
      <section className="relative bg-primary text-primary-foreground py-20 lg:py-32 overflow-hidden border-b-4 border-secondary/80">
        <div className="absolute inset-0 bg-chess-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 text-[300px] leading-none font-black opacity-[0.05] select-none pointer-events-none font-poppins">♛</div>
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary-foreground/70 mb-6 bg-background/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-secondary">About Us</span>
          </div>
          <AnimeTextReveal text="Our Legacy" className="text-5xl md:text-7xl font-black font-poppins uppercase tracking-tight mb-4 text-glow" />
          <p className="text-primary-foreground/80 md:text-lg max-w-2xl font-medium">
            Discover the history, mission, and the dedicated governing body behind the Andaman &amp; Nicobar Chess Association.
          </p>
        </div>
      </section>

      {/* Main Content Bento Grid */}
      <section className="container mx-auto px-4 mt-8 lg:-mt-12 relative z-20">
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Left Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* Profile Bento */}
            <ScrollReveal className="glass-panel-heavy rounded-3xl p-8 md:p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="flex items-center gap-4 mb-8 border-b border-border/50 pb-4">
                 <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                   <History className="h-6 w-6" />
                 </div>
                 <h2 className="text-3xl font-black font-poppins text-foreground tracking-tight">Organisation Profile</h2>
              </div>
              <p className="text-foreground/80 leading-relaxed text-justify mb-6 md:text-lg font-medium">
                The Andaman &amp; Nicobar Chess Association (ANCA) was established with the sole mandate of formalizing, promoting, and administering the game of chess across the Union Territory of Andaman &amp; Nicobar Islands. ANCA is the recognised state/UT chess federation affiliated to the All India Chess Federation (AICF), which is, in turn, affiliated to FIDE — the World Chess Federation.
              </p>
              <p className="text-foreground/80 leading-relaxed text-justify md:text-lg font-medium">
                Over the decades, ANCA has evolved from organizing small local club exhibitions to hosting prestigious state-level championships and sending delegations to the National Championship. Our affiliation enables our players to secure FIDE Ratings and compete on the world stage.
              </p>
            </ScrollReveal>

            {/* Mission & Vision Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <ScrollReveal delay={0.1} direction="left" className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500"><Target className="h-32 w-32" /></div>
                <div className="bg-secondary/20 p-3 inline-block rounded-xl mb-6 border border-secondary/30">
                  <Target className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-2xl font-black font-poppins mb-4 tracking-tight">Mission</h3>
                <p className="text-primary-foreground/80 leading-relaxed font-medium">
                  To identify, nurture, and elevate chess talent across all islands of Andaman &amp; Nicobar — providing regular tournaments, coaching, and a platform for national and international excellence.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2} direction="right" className="glass-panel rounded-3xl p-8 md:p-10 shadow-lg relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-5 group-hover:scale-110 transition-transform duration-500"><Crown className="h-32 w-32 text-foreground" /></div>
                <div className="bg-primary/10 text-primary p-3 inline-block rounded-xl mb-6 border border-primary/20">
                  <Crown className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-black font-poppins mb-4 tracking-tight">Vision</h3>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  To make Andaman &amp; Nicobar Islands a premier hub for chess in India, fostering a culture of strategic thinking, discipline, and intellectual growth among the youth.
                </p>
              </ScrollReveal>
            </div>

            {/* Executive Committee Focus */}
            <ScrollReveal delay={0.3} direction="up" className="glass-panel rounded-3xl p-8 md:p-12 mb-6">
              <div className="flex items-center gap-4 border-b border-border/50 pb-6 mb-8">
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <Users className="h-6 w-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-poppins font-black tracking-tight">Executive Committee</h2>
              </div>
              
              <StaggerList stagger={0.1} delay={0.2} className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {committee.map((member, i) => (
                  <HoverCard key={i} className="flex flex-col items-center text-center p-6 bg-background/40 hover:bg-background border border-border/50 hover:border-primary/30 rounded-2xl transition-all shadow-sm group">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-2xl font-black flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                      {member.initials}
                    </div>
                    <h3 className="font-bold text-foreground text-sm md:text-base leading-snug">{member.name}</h3>
                    <p className="text-xs text-secondary font-black mt-2 uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full">{member.role}</p>
                  </HoverCard>
                ))}
              </StaggerList>
            </ScrollReveal>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* At a Glance */}
            <ScrollReveal delay={0.4} direction="left" className="glass-panel rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-chess-pattern opacity-[0.02] pointer-events-none" />
              <h3 className="font-poppins font-black text-primary border-b border-border/50 pb-4 mb-6 text-lg uppercase tracking-wider flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-secondary"></div>
                At a Glance
              </h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center py-2 border-b border-border/30">
                  <span className="text-muted-foreground font-medium text-sm">Founded</span>
                  <span className="font-black text-foreground">2005</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-border/30">
                  <span className="text-muted-foreground font-medium text-sm">Affiliation</span>
                  <span className="font-black text-foreground bg-primary/10 text-primary px-3 py-1 rounded-md text-xs">AICF / FIDE</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-border/30">
                  <span className="text-muted-foreground font-medium text-sm">District Units</span>
                  <span className="font-black text-foreground">3</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-border/30">
                  <span className="text-muted-foreground font-medium text-sm">Registered Players</span>
                  <span className="font-black text-foreground text-secondary">1200+</span>
                </li>
                <li className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground font-medium text-sm">Annual Events</span>
                  <span className="font-black text-foreground">50+</span>
                </li>
              </ul>
            </ScrollReveal>

            {/* District Associations */}
            <ScrollReveal delay={0.5} direction="left" className="bg-gradient-to-br from-primary to-[#0f172a] rounded-3xl shadow-xl p-8 text-primary-foreground relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-[40px] pointer-events-none" />
              <Building className="h-10 w-10 text-secondary mb-5" />
              <h3 className="font-poppins font-black text-lg mb-6 tracking-tight">District Associations</h3>
              <ul className="space-y-4 text-sm font-medium text-primary-foreground/90">
                <li className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="bg-secondary rounded p-1.5 shrink-0"><MapPin className="h-3 w-3 text-secondary-foreground" /></div>
                  South Andaman CA
                </li>
                <li className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="bg-secondary rounded p-1.5 shrink-0"><MapPin className="h-3 w-3 text-secondary-foreground" /></div>
                  North &amp; Middle Andaman
                </li>
                <li className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="bg-secondary rounded p-1.5 shrink-0"><MapPin className="h-3 w-3 text-secondary-foreground" /></div>
                  Nicobar District CA
                </li>
              </ul>
            </ScrollReveal>

            {/* Useful Links */}
            <ScrollReveal delay={0.6} direction="left" className="glass-panel rounded-3xl p-8">
              <h3 className="font-poppins font-black text-primary border-b border-border/50 pb-4 mb-6 text-lg uppercase tracking-wider flex items-center gap-3">
                 <div className="h-2 w-2 rounded-full bg-secondary"></div>
                 Useful Links
              </h3>
              <ul className="space-y-3 font-medium text-sm">
                <li>
                  <Link href="/downloads" className="p-3 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 text-foreground flex items-center gap-3 transition-colors group">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"><FileText className="h-4 w-4" /></div> 
                    Constitution &amp; Rules
                  </Link>
                </li>
                <li>
                  <Link href="/arbiters-coaches" className="p-3 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 text-foreground flex items-center gap-3 transition-colors group">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"><Users className="h-4 w-4" /></div> 
                    Arbiters &amp; Coaches
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="p-3 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 text-foreground flex items-center gap-3 transition-colors group">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"><FileText className="h-4 w-4" /></div> 
                    Contact Secretariat
                  </Link>
                </li>
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
