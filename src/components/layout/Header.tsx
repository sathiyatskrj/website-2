"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Search, Menu, Crown, ExternalLink, ChevronDown, Award, Users, MapPin, Calendar, FileText, Download, Trophy } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const [fontSize, setFontSize] = useState<number>(100);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeFontSize = (delta: number) => {
    setFontSize((prev) => {
      const newSize = prev + delta;
      if (newSize >= 80 && newSize <= 120) return newSize;
      return prev;
    });
  };

  const navLinks = [
    { label: "Home", href: "/", mega: null },
    { 
      label: "About Us", href: "/about", 
      mega: [
        { title: "Organization", items: [
          { name: "About ANCA", href: "/about", icon: Crown },
          { name: "Executive Committee", href: "/committee", icon: Users },
          { name: "District Units", href: "/districts", icon: MapPin },
        ]},
        { title: "Resources", items: [
          { name: "Constitution", href: "/downloads", icon: FileText },
          { name: "Annual Reports", href: "/downloads", icon: Download },
        ]}
      ]
    },
    { 
      label: "Tournaments", href: "/tournaments", 
      mega: [
        { title: "Events", items: [
          { name: "Tournament Calendar", href: "/tournaments", icon: Calendar },
          { name: "Live Results", href: "/tournaments/live", icon: Trophy },
          { name: "Past Archives", href: "/tournaments/archive", icon: FileText },
        ]},
        { title: "Registration", items: [
          { name: "Player Registration", href: "/players/register", icon: Users },
          { name: "Organize an Event", href: "/contact", icon: MapPin },
        ]}
      ]
    },
    { label: "Players", href: "/players", mega: null },
    { label: "Arbiters & Coaches", href: "/arbiters-coaches", mega: null },
    { label: "News & Media", href: "/news", mega: null },
    { label: "Downloads", href: "/downloads", mega: null },
    { label: "Contact Us", href: "/contact", mega: null },
  ];

  return (
    <header className="flex flex-col w-full z-50 bg-background/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-border/50 relative sticky top-0" ref={megaMenuRef}>
      {/* Tier 1: Accessibility & Gov Links Bar */}
      <div className="bg-primary text-primary-foreground text-[10px] md:text-xs font-medium py-1.5 hidden md:block">
        <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="#main-content" className="hover:text-secondary focus:bg-white focus:text-primary px-2 transition-colors">
              Skip to Main Content
            </a>
            <span className="opacity-40">|</span>
            <a href="/accessibility" className="hover:text-secondary flex items-center gap-1 transition-colors">
              Screen Reader Access
            </a>
            <span className="opacity-40">|</span>
            <div className="flex items-center gap-2">
                <span className="px-1 text-primary-foreground/70 uppercase tracking-widest text-[9px]">Theme:</span>
                <ThemeToggle />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-sm">
              <button onClick={() => changeFontSize(-10)} className="px-1 hover:text-secondary group transition-colors" aria-label="Decrease Font Size">A-</button>
              <button onClick={() => setFontSize(100)} className="px-1 hover:text-secondary font-bold transition-colors" aria-label="Normal Font Size">A</button>
              <button onClick={() => changeFontSize(10)} className="px-1 hover:text-secondary transition-colors" aria-label="Increase Font Size">A+</button>
            </div>
            <span className="opacity-40">|</span>
            <div className="flex items-center gap-3 font-semibold">
              <span className="hover:text-secondary cursor-pointer transition-colors">ENG</span>
              <span className="text-primary-foreground/40">/</span>
              <span className="hover:text-secondary cursor-pointer transition-colors">HIN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tier 2: Professional Dual-Header */}
      <div className="py-5 lg:py-6">
        <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4 group w-full md:w-auto">
            <div className="bg-primary/5 dark:bg-primary/20 p-3 rounded-2xl shrink-0 group-hover:bg-primary/10 dark:group-hover:bg-primary/30 transition-colors border border-primary/10">
              <Crown className="h-8 w-8 md:h-10 md:w-10 text-primary group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-serif font-bold text-xl md:text-3xl text-foreground leading-none tracking-tight">
                Andaman & Nicobar <span className="text-primary tracking-normal block mt-1">Chess Association</span>
              </h1>
              <p className="text-muted-foreground text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em] mt-2 hidden sm:block">
                Recognised by Govt. of A&N Islands · Affiliated to AICF
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-4 pr-8 border-r border-border/60">
                <div className="h-12 w-12 bg-background shadow-soft rounded-full flex items-center justify-center border border-border/50">
                    <span className="font-black text-[10px] text-foreground tracking-widest">AICF</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase text-foreground tracking-wider">All India</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-medium">Chess Federation</span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-background shadow-soft rounded-full flex items-center justify-center border border-border/50">
                    <span className="font-black text-[10px] text-foreground tracking-widest">FIDE</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase text-foreground tracking-wider">World Chess</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-medium">Federation</span>
                </div>
            </div>
          </div>

          <button 
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </div>

      {/* Tier 3: Main Navigation with Mega Menu */}
      <div className="bg-primary border-y border-primary-foreground/10 hidden md:block relative z-20">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center relative">
            {navLinks.map((link) => (
              <div 
                key={link.label}
                className="group inline-block"
                onMouseEnter={() => link.mega && setActiveMegaMenu(link.label)}
                onMouseLeave={() => link.mega && setActiveMegaMenu(null)}
              >
                <Link 
                  href={link.href}
                  className="px-5 lg:px-7 py-4 flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-wider text-primary-foreground/90 hover:text-white hover:bg-black/20 transition-all border-l border-primary-foreground/10 first:border-l-0"
                >
                  {link.label}
                  {link.mega && <ChevronDown className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />}
                </Link>

                {/* Mega Menu Dropdown */}
                {link.mega && activeMegaMenu === link.label && (
                  <div className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-2xl border-b border-x border-border shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex gap-12 p-8 z-50 animate-in fade-in slide-in-from-top-2 justify-center">
                    {link.mega.map((section) => (
                      <div key={section.title} className="min-w-[220px]">
                        <h4 className="font-bold text-foreground text-xs uppercase tracking-[0.2em] mb-4 border-b border-border/60 pb-2">{section.title}</h4>
                        <ul className="space-y-1">
                          {section.items.map((item) => {
                            const Icon = item.icon;
                            return (
                              <li key={item.name}>
                                <Link href={item.href} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors p-2.5 hover:bg-muted/50 rounded-lg group/item">
                                  <Icon className="h-4 w-4 text-secondary/70 group-hover/item:text-secondary group-hover/item:scale-110 transition-all shrink-0" />
                                  <span className="font-medium">{item.name}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="ml-auto pl-6 border-l border-primary-foreground/10 flex items-center">
              <button aria-label="Search" className="text-primary-foreground/70 hover:text-secondary p-2 transition-colors">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl absolute top-full left-0 w-full z-50 shadow-2xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col max-h-[75vh] overflow-y-auto">
            {navLinks.map((link) => (
              <div key={link.label} className="border-b border-border/50">
                <Link 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-6 py-4 text-sm font-bold uppercase tracking-wider hover:bg-muted/50 hover:text-primary transition-colors flex justify-between items-center"
                >
                  {link.label}
                  {link.mega && <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </Link>
                {link.mega && (
                  <div className="bg-muted/30 px-6 py-4 space-y-6">
                     {link.mega.map((section) => (
                       <div key={section.title}>
                          <p className="text-[10px] font-black text-primary/70 uppercase tracking-[0.2em] mb-3">{section.title}</p>
                          <ul className="space-y-1">
                             {section.items.map(item => {
                               const Icon = item.icon;
                               return (
                               <li key={item.name}>
                                  <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-3 py-2">
                                    <Icon className="h-4 w-4 text-secondary/60" /> {item.name}
                                  </Link>
                               </li>
                               )
                             })}
                          </ul>
                       </div>
                     ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
