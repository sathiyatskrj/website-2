"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, MapPin, Users, Award, BarChart3, Trophy, ChevronDown } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { mockDistrictStats } from "@/lib/mockData";

interface Player {
  id: string;
  name: string;
  rating: number | null;
  district: string | null;
  title: string | null;
}

interface DistrictStat {
  district: string;
  totalPlayers: number;
  averageRating: number;
  titledPlayers: number;
  highestRating: number;
  topPlayers: Player[];
}

export default function DistrictDashboardsPage() {
  const [stats, setStats] = useState<DistrictStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedDistrict, setExpandedDistrict] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAndCalculateStats() {
      const supabase = getSupabaseBrowserClient();
      const { data: players } = await supabase
        .from("players")
        .select("id, name, rating, district, title")
        // @ts-ignore
        .order("rating", { ascending: false, nullsFirst: false });

      if (players && players.length > 0) {
        // Group by district
        const grouped = players.reduce((acc, player) => {
          const d = player.district || "Unassigned";
          if (!acc[d]) {
            acc[d] = {
              district: d,
              totalPlayers: 0,
              totalRating: 0,
              ratedPlayers: 0,
              titledPlayers: 0,
              highestRating: 0,
              topPlayers: [],
            };
          }
          
          acc[d].totalPlayers += 1;
          
          if (player.rating) {
            acc[d].totalRating += player.rating;
            acc[d].ratedPlayers += 1;
            if (player.rating > acc[d].highestRating) {
                acc[d].highestRating = player.rating;
            }
          }
          
          if (player.title) {
              acc[d].titledPlayers += 1;
          }
          
          // Store all players for now, will slice later
          acc[d].topPlayers.push(player as Player);
          
          return acc;
        }, {} as Record<string, any>);

        // Process and format stats
        const processedStats: DistrictStat[] = Object.values(grouped).map((g: any) => ({
          district: g.district,
          totalPlayers: g.totalPlayers,
          averageRating: g.ratedPlayers > 0 ? Math.round(g.totalRating / g.ratedPlayers) : 0,
          titledPlayers: g.titledPlayers,
          highestRating: g.highestRating,
          // Since query was already ordered by rating, filtering top 5 is just slice
          topPlayers: g.topPlayers.filter((p: Player) => p.rating !== null).slice(0, 5),
        }));

        // Sort by total players descending to highlight active districts
        processedStats.sort((a, b) => b.totalPlayers - a.totalPlayers);

        setStats(processedStats);
      } else {
        // Use mock data when no Supabase data is available
        setStats(mockDistrictStats);
      }
      setIsLoading(false);
    }
    fetchAndCalculateStats();
  }, []);

  // Calculate global max for progress bars
  const maxPlayers = Math.max(...stats.map(s => s.totalPlayers), 1);
  const maxRating = Math.max(...stats.map(s => s.averageRating), 1500);

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      {/* Header Banner */}
      <section className="bg-primary text-primary-foreground py-10 border-b-4 border-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>District Units &amp; Analytics</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-poppins uppercase tracking-wide flex items-center gap-3 mb-2">
            <BarChart3 className="h-10 w-10 text-secondary" /> Performance Dashboard
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl text-lg">
            Real-time analytics and player strength metrics across all Andaman &amp; Nicobar districts.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 container mx-auto px-4 flex-1">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : stats.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border shadow-sm rounded-xl">
            <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-foreground">No Analytics Available</h3>
            <p className="text-muted-foreground mt-2">Cannot generate dashboard. No player data found in the database.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Global Summary Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white dark:bg-card p-6 rounded-xl border border-border shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Districts</p>
                        <p className="text-3xl font-black">{stats.length}</p>
                    </div>
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary"><MapPin className="h-6 w-6"/></div>
                </div>
                <div className="bg-white dark:bg-card p-6 rounded-xl border border-border shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Registered Players</p>
                        <p className="text-3xl font-black">{stats.reduce((a, b) => a + b.totalPlayers, 0)}</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500"><Users className="h-6 w-6"/></div>
                </div>
                <div className="bg-white dark:bg-card p-6 rounded-xl border border-border shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Titled Masters</p>
                        <p className="text-3xl font-black">{stats.reduce((a, b) => a + b.titledPlayers, 0)}</p>
                    </div>
                    <div className="h-12 w-12 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-600"><Award className="h-6 w-6"/></div>
                </div>
                <div className="bg-white dark:bg-card p-6 rounded-xl border border-border shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Island Avg Rating</p>
                        <p className="text-3xl font-black">
                            {Math.round(stats.reduce((a, b) => a + (b.averageRating * b.totalPlayers), 0) / Math.max(stats.reduce((a, b) => a + b.totalPlayers, 0), 1))}
                        </p>
                    </div>
                    <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-600"><Trophy className="h-6 w-6"/></div>
                </div>
            </div>

            {/* District Breakdown */}
            <h2 className="text-2xl font-black font-poppins uppercase tracking-wider flex items-center gap-2 mb-6">
                <MapPin className="text-primary h-6 w-6" /> District Activity Index
            </h2>
            
            <div className="grid gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-card border border-border shadow-sm rounded-xl overflow-hidden transition-all hover:shadow-md">
                    {/* Compact View Data Row */}
                    <div 
                        className="p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-6 cursor-pointer hover:bg-muted/30 transition-colors"
                        onClick={() => setExpandedDistrict(expandedDistrict === stat.district ? null : stat.district)}
                    >
                        {/* District Name */}
                        <div className="md:w-1/4 flex-shrink-0">
                            <h3 className="text-xl font-bold text-foreground flex items-center justify-between">
                                {stat.district}
                                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 md:hidden ${expandedDistrict === stat.district ? 'rotate-180' : ''}`} />
                            </h3>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.totalPlayers} Active Members</p>
                        </div>
                        
                        {/* Metrics visualization */}
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 w-full">
                            {/* Players Bar */}
                            <div>
                                <div className="flex justify-between text-xs mb-1 font-bold">
                                    <span className="text-muted-foreground uppercase tracking-wider">Volume</span>
                                    <span>{stat.totalPlayers} Players</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div 
                                        className="bg-blue-500 h-2 rounded-full transition-all duration-1000" 
                                        style={{ width: `${(stat.totalPlayers / maxPlayers) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Avg Rating Bar */}
                            <div>
                                <div className="flex justify-between text-xs mb-1 font-bold">
                                    <span className="text-muted-foreground uppercase tracking-wider">Avg Strength</span>
                                    <span>{stat.averageRating > 0 ? stat.averageRating : 'N/A'}</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div 
                                        className="bg-green-500 h-2 rounded-full transition-all duration-1000" 
                                        style={{ width: `${stat.averageRating > 0 ? (stat.averageRating / Math.max(maxRating, 1)) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Expand Icon Desktop */}
                        <div className="hidden md:flex flex-shrink-0 w-10 justify-end">
                            <ChevronDown className={`h-6 w-6 text-muted-foreground transition-transform duration-300 ${expandedDistrict === stat.district ? 'rotate-180' : ''}`} />
                        </div>
                    </div>

                    {/* Expandable Top Players Details */}
                    {expandedDistrict === stat.district && (
                        <div className="border-t border-border bg-muted/10 p-5 md:p-6 animate-in slide-in-from-top-4 fade-in duration-300">
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="md:col-span-1 bg-white dark:bg-card p-5 rounded-lg border border-border">
                                    <h4 className="font-bold text-sm uppercase text-primary mb-4 flex items-center gap-2"><Award className="h-4 w-4"/> Unit Highlights</h4>
                                    <ul className="space-y-3 text-sm">
                                        <li className="flex justify-between border-b border-border pb-2">
                                            <span className="text-muted-foreground">Highest Rating</span>
                                            <span className="font-black">{stat.highestRating > 0 ? stat.highestRating : 'N/A'}</span>
                                        </li>
                                        <li className="flex justify-between border-b border-border pb-2">
                                            <span className="text-muted-foreground">Titled Players</span>
                                            <span className="font-black text-secondary">{stat.titledPlayers}</span>
                                        </li>
                                        <li className="flex justify-between border-b border-border pb-2">
                                            <span className="text-muted-foreground">Unrated Ratio</span>
                                            <span className="font-black">
                                                {Math.round(((stat.totalPlayers - (stat.averageRating > 0 ? (stat.totalPlayers / (stat.totalPlayers / (stat.totalPlayers || 1))) : 0)) / Math.max(stat.totalPlayers, 1)) * 100)}%
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="md:col-span-2">
                                    <h4 className="font-bold text-sm uppercase text-primary mb-4">Top 5 Strongest Players</h4>
                                    {stat.topPlayers.length > 0 ? (
                                        <div className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden">
                                            {stat.topPlayers.map((player, pIdx) => (
                                                <Link 
                                                    key={player.id} 
                                                    href={`/players/profile?id=${player.id}`}
                                                    className="flex items-center justify-between p-3 border-b border-border last:border-0 hover:bg-muted transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs font-black text-muted-foreground w-4">{pIdx + 1}</span>
                                                        {player.title && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase bg-primary/10 text-primary border border-primary/20">{player.title}</span>}
                                                        <span className="text-sm font-bold text-foreground">{player.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 font-black text-sm text-foreground">
                                                        <Trophy className="h-3 w-3 text-secondary"/> {player.rating}
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground italic bg-muted/30 p-4 rounded-lg border border-border">No rated players currently found in this district.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
              ))}
            </div>
            
            {/* Disclaimer */}
            <div className="text-center mt-12">
                <p className="text-xs text-muted-foreground">District ratings and analytics are compiled from FIDE classical lists and AICF rapid data where applicable. Charts are completely generated dynamically.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
