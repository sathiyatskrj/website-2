import Link from 'next/link';
import { Menu, Crown } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-background/40 dark:bg-black/20 backdrop-blur-3xl border-b border-white/20 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Crown className="h-8 w-8 text-secondary transition-transform group-hover:-rotate-12 drop-shadow-[0_0_8px_rgba(var(--secondary),0.5)]" />
          <span className="font-poppins font-bold text-xl tracking-tight text-primary dark:text-foreground text-glow">ANCA</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-foreground/80">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <Link href="/tournaments" className="hover:text-primary transition-colors">Tournaments</Link>
          <Link href="/players" className="hover:text-primary transition-colors">Players</Link>
          <Link href="/news" className="hover:text-primary transition-colors">News</Link>
          <Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/tournaments" className="hidden md:inline-flex items-center justify-center rounded-md bg-secondary text-secondary-foreground h-9 px-4 py-2 font-medium transition-colors hover:bg-secondary/90">
            Register Now
          </Link>
          <button className="md:hidden p-2 text-foreground">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
