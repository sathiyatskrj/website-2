import Link from 'next/link';
import { Crown, Mail, MapPin, Phone, ChevronRight, ExternalLink, Trophy, Users, Calendar, FileText } from 'lucide-react';

const quickLinks = [
  { label: "About ANCA", href: "/about" },
  { label: "Tournament Calendar", href: "/tournaments" },
  { label: "Players Directory", href: "/players" },
  { label: "Arbiters & Coaches", href: "/arbiters-coaches" },
  { label: "Latest News", href: "/news" },
  { label: "Downloads", href: "/downloads" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Accessibility", href: "/accessibility" },
];

const affiliates = [
  { abbr: "AICF", href: "https://aicf.in", color: "text-blue-500 dark:text-blue-400" },
  { abbr: "FIDE", href: "https://fide.com", color: "text-emerald-500 dark:text-emerald-400" },
  { abbr: "SAI", href: "https://sportsauthorityofindia.nic.in", color: "text-amber-500 dark:text-amber-400" },
];

export function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-border/60 relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Upper Footer */}
      <div className="container mx-auto px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">

          {/* Brand column */}
          <div className="md:col-span-4 space-y-6 pr-0 lg:pr-8">
            <Link href="/" className="flex items-center gap-4 group w-fit">
              <div className="bg-primary/10 p-2.5 rounded-2xl shrink-0 group-hover:bg-primary/20 transition-colors border border-primary/20">
                <Crown className="h-8 w-8 text-primary group-hover:scale-110 group-hover:text-secondary transition-all duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl leading-tight uppercase tracking-wide">Andaman &amp; Nicobar</span>
                <span className="font-sans font-medium text-[12px] tracking-[0.2em] text-primary uppercase mt-0.5">Chess Association</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-[14px] leading-relaxed font-light">
              The official portal of the Andaman &amp; Nicobar Chess Association. Empowering chess players and organizing premier tournaments under the guidance of AICF &amp; FIDE.
            </p>
            {/* Affiliates mini-row */}
            <div className="flex items-center gap-3 pt-2">
              {affiliates.map((a) => (
                <a
                  key={a.abbr}
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[10px] font-black tracking-widest border border-border/60 hover:border-current px-3 py-1.5 rounded-lg transition-colors ${a.color}`}
                >
                  {a.abbr}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="font-sans font-bold uppercase tracking-[0.2em] mb-6 text-sm text-foreground/80 flex items-center gap-3">
              <span className="w-6 h-[2px] bg-primary inline-block rounded-full" /> Quick Links
            </h3>
            <ul className="space-y-3 text-[13px] text-muted-foreground font-medium">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-primary group transition-all flex items-center gap-2">
                    <ChevronRight className="h-3 w-3 text-primary/40 group-hover:translate-x-0.5 group-hover:text-primary transition-all" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div className="md:col-span-2">
            <h3 className="font-sans font-bold uppercase tracking-[0.2em] mb-6 text-sm text-foreground/80 flex items-center gap-3">
              <span className="w-6 h-[2px] bg-secondary inline-block rounded-full" /> Policies
            </h3>
            <ul className="space-y-3 text-[13px] text-muted-foreground font-medium">
              {policyLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-secondary group transition-all flex items-center gap-2">
                    <ChevronRight className="h-3 w-3 text-secondary/40 group-hover:translate-x-0.5 group-hover:text-secondary transition-all" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="font-sans font-bold uppercase tracking-[0.2em] mb-6 text-sm text-foreground/80 flex items-center gap-3">
              <span className="w-6 h-[2px] bg-accent inline-block rounded-full" /> Connect
            </h3>
            <ul className="space-y-5 text-[13px] text-muted-foreground font-medium">
              <li className="flex gap-3 items-start group">
                <div className="p-2 bg-primary/5 rounded-lg border border-primary/10 group-hover:bg-primary/15 transition-colors mt-0.5 shrink-0">
                  <MapPin className="h-4 w-4 text-primary group-hover:text-secondary transition-colors" />
                </div>
                <span className="leading-relaxed">Secretariat, ANCA<br />Port Blair, Andaman &amp; Nicobar<br />India — 744101</span>
              </li>
              <li className="flex gap-3 items-center group">
                <div className="p-2 bg-primary/5 rounded-lg border border-primary/10 group-hover:bg-primary/15 transition-colors shrink-0">
                  <Mail className="h-4 w-4 text-primary group-hover:text-secondary transition-colors" />
                </div>
                <a href="mailto:info@ancachess.in" className="hover:text-primary transition-colors">info@ancachess.in</a>
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground px-5 py-2.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Get in Touch <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>
      </div>

      {/* Lower Footer */}
      <div className="bg-foreground/[0.03] border-t border-border/40 text-xs text-muted-foreground py-5 relative z-10">
        <div className="container mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
          <div className="space-y-1 font-medium">
            <p>Content Managed by <strong className="text-foreground/70 uppercase tracking-wide">Andaman &amp; Nicobar Chess Association</strong></p>
            <p className="opacity-60">Designed &amp; Developed by ANCA IT Team &copy; {new Date().getFullYear()}</p>
          </div>
          <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.15em] opacity-50">
            <span>AICF Affiliated</span>
            <span>·</span>
            <span>FIDE Recognised</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
