"use client";

import { UserPlus, Star, ChevronRight, ShieldCheck, GraduationCap, Phone } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { mockArbiters, mockCoaches } from "@/lib/mockData";

const ScrollReveal = dynamic(
  () => import("@/components/animations/AnimationUtils").then((m) => ({ default: m.ScrollReveal })),
  { ssr: false }
);

const StaggerList = dynamic(
  () => import("@/components/animations/AnimationUtils").then((m) => ({ default: m.StaggerList })),
  { ssr: false }
);

export default function ArbitersCoachesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative bg-primary text-primary-foreground py-16 lg:py-24 overflow-hidden border-b-4 border-secondary/80">
        <div className="absolute inset-0 bg-chess-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 text-[300px] leading-none font-black opacity-[0.05] select-none pointer-events-none font-poppins">♜</div>
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary-foreground/70 mb-5 bg-background/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-secondary">Arbiters & Coaches</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-poppins uppercase tracking-tight mb-4 text-glow">
            Arbiters & Coaches
          </h1>
          <p className="text-primary-foreground/80 md:text-lg max-w-2xl font-medium">
            Certified FIDE and AICF professionals dedicated to fair play, rule enforcement, and nurturing the next generation of chess talent in A&N Islands.
          </p>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Arbiters Section */}
          <ScrollReveal className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black font-poppins tracking-tight">Registered Arbiters</h2>
                <p className="text-sm text-muted-foreground">Licensed officials ensuring fair play at all ANCA events</p>
              </div>
            </div>
            
            <StaggerList stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockArbiters.map((a, i) => (
                <div key={i} className="bg-card border border-border p-6 rounded-2xl flex items-start justify-between shadow-sm hover:shadow-md hover:border-primary/30 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-lg font-black flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      {a.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{a.name}</h3>
                      <p className="text-sm font-bold text-secondary mb-2">{a.title}</p>
                      <p className="text-xs text-muted-foreground">License: <span className="font-mono font-medium text-foreground">{a.license}</span></p>
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{a.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-black bg-primary/10 text-primary px-3 py-1 rounded-lg">
                      {a.rating}
                    </p>
                  </div>
                </div>
              ))}
            </StaggerList>
          </ScrollReveal>

          {/* Coaches Section */}
          <ScrollReveal delay={0.2}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black font-poppins tracking-tight">Certified Coaches</h2>
                <p className="text-sm text-muted-foreground">Professional trainers building A&N&apos;s chess future</p>
              </div>
            </div>
            
            <StaggerList stagger={0.1} delay={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockCoaches.map((c, i) => (
                <div key={i} className="bg-card border border-border p-6 rounded-2xl flex items-start justify-between shadow-sm hover:shadow-md hover:border-secondary/30 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground text-lg font-black flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      {c.name.replace('FM ', '').split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{c.name}</h3>
                      <p className="text-sm font-bold text-primary mb-2">{c.title}</p>
                      <p className="text-xs text-muted-foreground">Experience: <span className="font-medium text-foreground">{c.exp}</span></p>
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{c.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-black bg-secondary/10 text-secondary px-3 py-1 rounded-lg">
                      {c.rating}
                    </p>
                  </div>
                </div>
              ))}
            </StaggerList>
          </ScrollReveal>

          {/* Info Banner */}
          <ScrollReveal delay={0.4} direction="up" className="mt-12">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground font-poppins">Want to become a certified arbiter or coach?</strong>
                <br />
                Contact the ANCA Secretariat at <a href="mailto:info@ancachess.in" className="text-primary font-bold hover:underline">info@ancachess.in</a> for upcoming certification courses and eligibility requirements.
              </p>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </div>
  );
}
