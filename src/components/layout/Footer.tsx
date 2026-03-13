import Link from 'next/link';
import { Crown, Mail, MapPin, Phone, ChevronRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-border/60 relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/3 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Upper Footer: Main Links & Contact */}
      <div className="container mx-auto px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
          
          <div className="md:col-span-5 space-y-6 pr-0 lg:pr-10">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="bg-primary/10 p-2.5 rounded-2xl shrink-0 group-hover:bg-primary/20 transition-colors border border-primary/20">
                <Crown className="h-8 w-8 text-primary group-hover:scale-110 group-hover:text-secondary transition-all duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-2xl leading-none uppercase tracking-wide">Andaman & Nicobar</span>
                <span className="font-sans font-medium text-[13px] tracking-[0.2em] text-primary uppercase mt-1">Chess Association</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-[15px] leading-relaxed text-left font-light">
              The official portal of the Andaman and Nicobar Chess Association. Empowering chess players and organizing premier tournaments across the islands under the guidance of AICF & FIDE.
            </p>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-sans font-bold uppercase tracking-[0.2em] mb-6 text-sm text-foreground/80 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-secondary inline-block"></span> Quick Links
            </h3>
            <ul className="space-y-4 text-[14px] text-muted-foreground font-medium">
              <li><Link href="/about" className="hover:text-secondary group transition-all flex items-center gap-2"><ChevronRight className="h-3 w-3 text-secondary/50 group-hover:translate-x-1 group-hover:text-secondary transition-transform" /> About Us</Link></li>
              <li><Link href="/tournaments" className="hover:text-secondary group transition-all flex items-center gap-2"><ChevronRight className="h-3 w-3 text-secondary/50 group-hover:translate-x-1 group-hover:text-secondary transition-transform" /> Tournaments</Link></li>
              <li><Link href="/players" className="hover:text-secondary group transition-all flex items-center gap-2"><ChevronRight className="h-3 w-3 text-secondary/50 group-hover:translate-x-1 group-hover:text-secondary transition-transform" /> Players Directory</Link></li>
              <li><Link href="/news" className="hover:text-secondary group transition-all flex items-center gap-2"><ChevronRight className="h-3 w-3 text-secondary/50 group-hover:translate-x-1 group-hover:text-secondary transition-transform" /> Latest News</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-sans font-bold uppercase tracking-[0.2em] mb-6 text-sm text-foreground/80 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-secondary inline-block"></span> Policies
            </h3>
            <ul className="space-y-4 text-[14px] text-muted-foreground font-medium">
              <li><Link href="/privacy-policy" className="hover:text-secondary group transition-all flex items-center gap-2"><ChevronRight className="h-3 w-3 text-secondary/50 group-hover:translate-x-1 group-hover:text-secondary transition-transform" /> Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-secondary group transition-all flex items-center gap-2"><ChevronRight className="h-3 w-3 text-secondary/50 group-hover:translate-x-1 group-hover:text-secondary transition-transform" /> Terms & Conditions</Link></li>
              <li><Link href="/disclaimer" className="hover:text-secondary group transition-all flex items-center gap-2"><ChevronRight className="h-3 w-3 text-secondary/50 group-hover:translate-x-1 group-hover:text-secondary transition-transform" /> Disclaimer</Link></li>
              <li><Link href="/accessibility" className="hover:text-secondary group transition-all flex items-center gap-2"><ChevronRight className="h-3 w-3 text-secondary/50 group-hover:translate-x-1 group-hover:text-secondary transition-transform" /> Accessibility</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-sans font-bold uppercase tracking-[0.2em] mb-6 text-sm text-foreground/80 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-secondary inline-block"></span> Connect
            </h3>
            <ul className="space-y-5 text-[14px] text-muted-foreground font-medium">
              <li className="flex gap-4 items-start group">
                <div className="p-2 bg-primary/5 rounded-lg border border-primary/10 group-hover:bg-primary/20 transition-colors mt-0.5">
                  <MapPin className="h-4 w-4 text-primary group-hover:text-secondary transition-colors" />
                </div>
                <span className="leading-relaxed">Secretariat, ANCA<br/>Port Blair, Andaman & Nicobar<br/>India - 744101</span>
              </li>
              <li className="flex gap-4 items-center group">
                <div className="p-2 bg-primary/5 rounded-lg border border-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-4 w-4 text-primary group-hover:text-secondary transition-colors" />
                </div>
                <a href="mailto:info@ancachess.in" className="hover:text-white transition-colors">info@ancachess.in</a>
              </li>
            </ul>
          </div>

        </div>
      </div>
      
      {/* Lower Footer: Copyright & Dev Info */}
      <div className="bg-black/10 border-t border-border/40 text-xs text-muted-foreground py-6 relative z-10">
        <div className="container mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="space-y-1.5 font-medium">
            <p>Content Managed by <strong className="text-foreground/80 tracking-wide uppercase">Andaman & Nicobar Chess Association</strong></p>
            <p className="opacity-70">Designed & Developed by ANCA IT Team &copy; {new Date().getFullYear()}</p>
          </div>
          <div className="flex gap-4 uppercase tracking-[0.2em] text-[10px] font-bold opacity-60">
             <span>Last Updated: {new Date().toLocaleDateString('en-IN', {day: '2-digit', month: 'short', year: 'numeric'})}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
