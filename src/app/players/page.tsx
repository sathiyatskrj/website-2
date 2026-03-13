"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, Trophy, Users, ChevronRight } from "lucide-react";
import { mockPlayers } from "@/lib/mockData";

const TITLE_COLORS: Record<string, string> = {
  GM: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  IM: "bg-blue-100 text-blue-800 border border-blue-200",
  FM: "bg-green-100 text-green-800 border border-green-200",
  CM: "bg-purple-100 text-purple-800 border border-purple-200",
  WGM: "bg-pink-100 text-pink-800 border border-pink-200",
  WIM: "bg-indigo-100 text-indigo-800 border border-indigo-200",
  WFM: "bg-teal-100 text-teal-800 border border-teal-200",
  WCM: "bg-orange-100 text-orange-800 border border-orange-200",
};

export default function PlayersPage() {
  const players = mockPlayers;
  const [searchQuery, setSearchQuery] = useState("");
  const [districtFilter, setDistrictFilter] = useState("All Districts");
  const [titleFilter, setTitleFilter] = useState("All Titles");

  const filteredPlayers = players.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.fide_id && p.fide_id.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDistrict = districtFilter === "All Districts" || p.district === districtFilter;
    const matchesTitle = titleFilter === "All Titles" || p.title === titleFilter;
    return matchesSearch && matchesDistrict && matchesTitle;
  });

  // Calculate unique districts for filter
  const districts = ["All Districts", ...Array.from(new Set(players.map(p => p.district).filter(Boolean)))];
  
  return (
    <div className="flex flex-col w-full min-h-screen">
      <section className="bg-primary text-primary-foreground py-8 border-b-4 border-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-3">
            <Link href="/">Home</Link><ChevronRight className="h-4 w-4" /><span>Player Directory</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-poppins uppercase tracking-wide flex items-center gap-3">
            <Users className="h-8 w-8 text-secondary" /> Player Directory
          </h1>
          <p className="text-primary-foreground/80 mt-2">Search FIDE-rated and AICF-registered players from A&N Islands</p>
        </div>
      </section>

      {/* Search Inputs */}
      <div className="bg-card border-b border-border shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search by name or FIDE ID..." 
                className="w-full pl-10 pr-4 py-2 border border-border rounded bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select 
              className="border border-border rounded py-2 px-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary min-w-[150px]"
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
            >
              {districts.map(d => <option key={d as string}>{d as string}</option>)}
            </select>
            <select 
              className="border border-border rounded py-2 px-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary min-w-[130px]"
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
            >
              <option>All Titles</option>
              <option>GM</option><option>IM</option><option>FM</option><option>CM</option><option>WGM</option><option>WIM</option><option>WFM</option><option>WCM</option>
            </select>
          </div>
        </div>
      </div>

      <section className="py-10 container mx-auto px-4 flex-1">
        <div className="bg-card border border-border shadow-sm rounded-md overflow-hidden min-h-[400px]">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 bg-primary text-primary-foreground text-xs uppercase tracking-widest font-bold py-3 px-6">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">Player Name</div>
            <div className="col-span-1 text-center">Title</div>
            <div className="col-span-2 text-center">Rating</div>
            <div className="col-span-2">FIDE ID</div>
            <div className="col-span-2">District</div>
          </div>

          {filteredPlayers.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No players found matching your search.
            </div>
          ) : (
            filteredPlayers.map((p, idx) => {
              const rank = idx + 1; // Basic ranking based on sorted rating
              return (
                <div key={p.id} className={`grid md:grid-cols-12 gap-4 px-6 py-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors items-center ${idx % 2 === 0 ? "" : "bg-muted/20"}`}>
                  {/* Mobile view combines */}
                  <div className="md:hidden flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                        <div>
                        <div className="font-bold text-foreground text-lg">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.fide_id || 'No FIDE ID'} · {p.district || 'Unknown'}</div>
                        </div>
                        <div className="text-xl font-bold text-muted-foreground">#{rank}</div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {p.title && <span className={`px-2 py-0.5 text-xs font-bold rounded-sm uppercase ${TITLE_COLORS[p.title] || 'bg-gray-100 text-gray-800'}`}>{p.title}</span>}
                      <span className="font-bold text-foreground flex items-center gap-1"><Trophy className="h-3 w-3 text-secondary"/> {p.rating || 'Unrated'}</span>
                    </div>
                  </div>

                  {/* Desktop */}
                  <div className="hidden md:block md:col-span-1 text-muted-foreground font-semibold text-sm">#{rank}</div>
                  <div className="hidden md:block md:col-span-4">
                    <Link href={`/players/profile?id=${p.id}`} className="font-bold text-foreground hover:text-primary transition-colors">{p.name}</Link>
                  </div>
                  <div className="hidden md:flex md:col-span-1 justify-center">
                    {p.title ? (
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-sm uppercase ${TITLE_COLORS[p.title] || 'bg-gray-100 text-gray-800'}`}>{p.title}</span>
                    ) : <span className="text-muted-foreground text-xs">—</span>}
                  </div>
                  <div className="hidden md:flex md:col-span-2 items-center justify-center gap-1">
                    {p.rating ? (
                        <>
                            <Trophy className="h-4 w-4 text-secondary" />
                            <span className="font-bold text-foreground">{p.rating}</span>
                        </>
                    ) : (
                        <span className="text-muted-foreground text-xs">Unrated</span>
                    )}
                  </div>
                  <div className="hidden md:block md:col-span-2 text-sm text-muted-foreground">{p.fide_id || '—'}</div>
                  <div className="hidden md:block md:col-span-2 text-sm text-muted-foreground">{p.district || '—'}</div>
                </div>
              );
            })
          )}
        </div>

        {!isLoading && filteredPlayers.length > 0 && (
            <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
            <span>Showing {filteredPlayers.length} registered players</span>
            <div className="flex gap-2">
                <button disabled className="border border-border px-4 py-1.5 rounded text-xs hover:border-primary hover:text-primary cursor-not-allowed opacity-50">← Previous</button>
                <button disabled className="border border-primary bg-primary text-primary-foreground px-4 py-1.5 rounded text-xs cursor-not-allowed opacity-50">Next →</button>
            </div>
            </div>
        )}
      </section>
    </div>
  );
}
