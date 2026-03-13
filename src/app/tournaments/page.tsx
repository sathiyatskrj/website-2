"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Download, Users, MapPin, IndianRupee, Trophy, Calendar, ChevronRight } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { format, isBefore, isAfter, parseISO } from "date-fns";
import { mockTournaments } from "@/lib/mockData";

const ScrollReveal = dynamic(
  () => import("@/components/animations/AnimationUtils").then((m) => ({ default: m.ScrollReveal })),
  { ssr: false }
);

const StaggerList = dynamic(
  () => import("@/components/animations/AnimationUtils").then((m) => ({ default: m.StaggerList })),
  { ssr: false }
);

interface Tournament {
  id: string;
  name: string;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  category: string | null;
  registration_link: string | null;
  results_link: string | null;
  organizer: string | null;
}

const STATUS_STYLES: Record<string, string> = {
  Upcoming: "bg-green-100 text-green-800 border-green-200",
  Ongoing: "bg-blue-100 text-blue-800 border-blue-200",
  Completed: "bg-gray-100 text-gray-600 border-gray-200",
};

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function fetchTournaments() {
      const supabase = getSupabaseBrowserClient();
      const { data } = await supabase
        .from("tournaments")
        .select("*")
        .order("start_date", { ascending: false });

      if (data && data.length > 0) {
        setTournaments(data);
      } else {
        setTournaments(mockTournaments as any);
      }
      setIsLoading(false);
    }
    fetchTournaments();
  }, []);

  const getStatus = (start: string | null, end: string | null) => {
    if (!start) return "Upcoming";
    const today = new Date();
    const startDate = parseISO(start);
    const endDate = end ? parseISO(end) : startDate;

    if (isBefore(today, startDate)) return "Upcoming";
    if (isAfter(today, endDate)) return "Completed";
    return "Ongoing";
  };

  const filteredTournaments = tournaments.filter(t => {
    if (filter === "All") return true;
    return getStatus(t.start_date, t.end_date) === filter;
  });

  const formatDateRange = (start: string | null, end: string | null) => {
    if (!start) return "TBD";
    const startDate = parseISO(start);
    if (!end || start === end) return format(startDate, "dd MMM yyyy");
    const endDate = parseISO(end);
    if (startDate.getMonth() === endDate.getMonth()) {
      return `${format(startDate, "dd")}–${format(endDate, "dd MMM yyyy")}`;
    }
    return `${format(startDate, "dd MMM")} – ${format(endDate, "dd MMM yyyy")}`;
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background pb-20">
      {/* Premium Hero Banner */}
      <section className="relative bg-primary text-primary-foreground py-16 lg:py-24 overflow-hidden border-b-4 border-secondary/80">
        <div className="absolute inset-0 bg-chess-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 text-[300px] leading-none font-black opacity-[0.05] select-none pointer-events-none font-poppins">♛</div>
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary-foreground/70 mb-5 bg-background/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-secondary">Tournaments</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-poppins uppercase tracking-tight mb-4 flex items-center justify-center gap-4 text-glow">
             <Trophy className="h-10 w-10 md:h-14 md:w-14 text-secondary drop-shadow-xl" /> Tournaments
          </h1>
          <p className="text-primary-foreground/80 md:text-lg max-w-2xl font-medium">
             Upcoming &amp; completed official chess events organized by the Andaman &amp; Nicobar Chess Association.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="bg-card/80 backdrop-blur-md border-b border-border shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4 flex flex-wrap gap-3 justify-center md:justify-start">
          {["All", "Upcoming", "Ongoing", "Completed"].map((f) => (
            <button 
              key={f} 
              onClick={() => setFilter(f)}
              className={`text-xs md:text-sm font-black uppercase tracking-widest px-6 py-2 rounded-xl border-2 transition-all ${filter === f ? "bg-primary text-primary-foreground border-primary shadow-md scale-105" : "bg-card text-muted-foreground border-border/50 hover:border-primary/50 hover:text-primary hover:bg-primary/5 hover:scale-105"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <section className="py-12 container mx-auto px-4 lg:px-6 flex-1">
        <ScrollReveal className="glass-panel-heavy rounded-3xl overflow-hidden min-h-[400px] shadow-2xl relative">
          <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl blur pointer-events-none" />
          
          <div className="relative z-10 bg-card rounded-3xl overflow-hidden">
             {/* Header Row */}
             <div className="hidden md:grid grid-cols-12 bg-primary/5 border-b border-border/50 text-foreground text-xs uppercase tracking-widest font-black py-4 px-8 gap-4">
               <div className="col-span-5 text-primary">Tournament Name</div>
               <div className="col-span-2 text-primary">Dates</div>
               <div className="col-span-2 text-primary">Venue / Organizer</div>
               <div className="col-span-1 text-primary">Status</div>
               <div className="col-span-2 text-right text-primary">Action</div>
             </div>

             {isLoading ? (
               <div className="flex justify-center items-center h-64 flex-col gap-4">
                 <div className="h-12 w-12 border-4 border-primary border-t-transparent animate-spin rounded-full shadow-lg"></div>
                 <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Loading Events...</p>
               </div>
             ) : filteredTournaments.length === 0 ? (
               <div className="text-center py-20 px-4">
                 <Trophy className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                 <p className="text-lg font-bold text-foreground">No tournaments found</p>
                 <p className="text-sm text-muted-foreground">Try selecting a different filter above.</p>
               </div>
             ) : (
               <StaggerList stagger={0.08} className="divide-y divide-border/40">
                 {filteredTournaments.map((t, idx) => {
                   const status = getStatus(t.start_date, t.end_date);
                   const dateDisplay = formatDateRange(t.start_date, t.end_date);
                   
                   return (
                     <div key={t.id} className="grid md:grid-cols-12 gap-5 px-6 md:px-8 py-6 hover:bg-primary/5 transition-all group/row cursor-pointer relative overflow-hidden">
                       {/* Background highlight on hover */}
                       <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/[0.03] to-primary/0 translate-x-[-100%] group-hover/row:translate-x-[100%] transition-transform duration-1000" />
                       
                       <div className="md:col-span-5 flex flex-col justify-center relative z-10">
                         <div className="flex items-center gap-2 mb-2 md:hidden">
                           <span className={`px-2.5 py-1 text-[10px] font-black rounded uppercase tracking-widest border ${STATUS_STYLES[status]}`}>{status}</span>
                         </div>
                         <h2 className="font-bold font-poppins text-foreground text-base md:text-lg group-hover/row:text-primary transition-colors leading-tight mb-2">{t.name}</h2>
                         <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-medium text-muted-foreground">
                           <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-secondary" />{t.category || "Open"}</span>
                           <span className="flex items-center gap-1.5"><IndianRupee className="h-3.5 w-3.5 text-secondary" />Prize: Variable</span>
                         </div>
                       </div>
                       
                       <div className="md:col-span-2 flex items-center relative z-10">
                         <div className="flex items-center gap-2 text-sm md:text-base font-semibold text-foreground bg-background rounded-lg px-3 py-1.5 border border-border/50">
                           <Calendar className="h-4 w-4 shrink-0 text-secondary" />
                           <span>{dateDisplay}</span>
                         </div>
                       </div>
                       
                       <div className="md:col-span-2 flex items-center relative z-10">
                         <div className="text-sm font-medium text-foreground">
                           <div className="flex items-center gap-2 truncate"><MapPin className="h-4 w-4 text-secondary shrink-0" />{t.location || "TBD"}</div>
                           <div className="text-xs text-muted-foreground mt-1.5 pl-6">{t.organizer || "ANCA"}</div>
                         </div>
                       </div>
                       
                       <div className="md:col-span-1 hidden md:flex items-center relative z-10">
                         <span className={`px-3 py-1.5 text-[10px] font-black rounded border uppercase tracking-widest shadow-sm ${STATUS_STYLES[status]}`}>{status}</span>
                       </div>
                       
                       <div className="md:col-span-2 flex flex-wrap items-center justify-start md:justify-end gap-3 relative z-10 mt-2 md:mt-0">
                         {status !== "Completed" ? (
                           <>
                             <a href={t.registration_link || "#"} className={`text-xs px-5 py-2.5 rounded-lg font-black uppercase tracking-widest transition-all ${t.registration_link ? "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-[0_4px_14px_0_rgba(var(--secondary),0.3)] hover:shadow-[0_6px_20px_rgba(var(--secondary),0.5)] hover:-translate-y-0.5" : "bg-muted text-muted-foreground cursor-not-allowed"}`}>
                               Register
                             </a>
                             <button className="text-xs font-bold border-2 border-border/50 bg-background text-foreground px-4 py-2.5 rounded-lg hover:border-primary hover:text-primary flex items-center gap-2 transition-all hover:bg-primary/5 group-hover/row:border-primary/30">
                               <Download className="h-3.5 w-3.5" /> <span className="hidden lg:inline">Brochure</span>
                             </button>
                           </>
                         ) : (
                           <a href={t.results_link || "#"} className={`text-xs px-5 py-2.5 rounded-lg font-black uppercase tracking-widest transition-all ${t.results_link ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_4px_14px_0_rgba(var(--primary),0.3)] hover:-translate-y-0.5" : "bg-muted border border-border text-muted-foreground hover:bg-muted/80"}`}>
                             Results
                           </a>
                         )}
                       </div>
                     </div>
                   );
                 })}
               </StaggerList>
             )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4} direction="up" className="mt-8 glass-panel-light border border-border rounded-xl p-6">
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex items-start gap-4">
             <div className="bg-secondary/20 p-2 rounded-full shrink-0"><IndianRupee className="h-5 w-5 text-secondary" /></div>
             <span>
               <strong className="text-foreground font-poppins tracking-wide">Important Details:</strong> Players are strictly advised to register well before the deadline. Entry fees are completely non-refundable. All participants must carry a valid photo ID proof and AICF registration proof to the venue. For inquiries or disputes, reach out to the ANCA Secretariat at <a href="mailto:info@ancachess.in" className="text-primary font-bold hover:underline">info@ancachess.in</a>.
             </span>
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
}
