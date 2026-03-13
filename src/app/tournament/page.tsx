"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { Suspense } from "react";

import { mockTournaments } from "@/lib/mockData";

type Tournament = {
  id: string;
  name: string;
  slug: string;
  start_date: string;
  end_date: string;
  venue: string;
  prize_fund: number | null;
  entry_fee: number | null;
  categories: string | null;
  brochure_url: string | null;
  results_url: string | null;
  description: string | null;
  status: "upcoming" | "ongoing" | "completed";
};

function TournamentContent() {
  const search = useSearchParams();
  const slug = search.get("slug");

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [tournament, setTournament] = React.useState<Tournament | null>(null);

  React.useEffect(() => {
    // Simulate loading to prevent harsh flash and hydration mismatches
    setLoading(true);
    
    // Simulate network delay
    const timer = setTimeout(() => {
      if (!slug) {
        setTournament(null);
        setLoading(false);
        return;
      }

      const t = mockTournaments.find(t => 
        t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") === slug || 
        t.id === slug
      );

      if (t) {
        setTournament(t as any);
      } else {
        setError("Failed to load tournament.");
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [slug]);

  if (!slug) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="font-medium">No tournament selected</div>
        <div className="mt-2 text-sm text-muted-foreground">
          Go to{" "}
          <Link className="text-primary hover:underline" href="/tournaments">
            tournaments
          </Link>{" "}
          and open a tournament.
        </div>
      </div>
    );
  }

  if (loading) return <div className="text-sm text-muted-foreground">Loading…</div>;

  if (error) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="font-medium">Unable to load tournament</div>
        <div className="mt-2 text-sm text-muted-foreground">{error}</div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="font-medium">Tournament not found</div>
        <div className="mt-2 text-sm text-muted-foreground">
          Go back to{" "}
          <Link className="text-primary hover:underline" href="/tournaments">
            tournaments
          </Link>
          .
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="inline-flex w-fit rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
          {tournament.status.toUpperCase()}
        </div>
        <h1 className="font-[var(--font-heading)] text-2xl font-semibold">
          {tournament.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          {tournament.venue} • {tournament.start_date} to {tournament.end_date}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-[var(--font-heading)] text-lg font-semibold">
            Details
          </h2>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
              <span className="text-muted-foreground">Prize fund</span>
              <span className="font-medium">
                {tournament.prize_fund ? `₹${tournament.prize_fund}` : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
              <span className="text-muted-foreground">Entry fee</span>
              <span className="font-medium">
                {tournament.entry_fee ? `₹${tournament.entry_fee}` : "—"}
              </span>
            </div>
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="text-muted-foreground">Categories</div>
              <div className="mt-1 font-medium">
                {tournament.categories || "—"}
              </div>
            </div>
          </div>

          {tournament.description ? (
            <div className="mt-5">
              <div className="text-sm font-medium">Description</div>
              <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
                {tournament.description}
              </p>
            </div>
          ) : null}
        </section>

        <aside className="rounded-2xl border border-border bg-card p-6">
          <div className="text-sm font-medium">Actions</div>
          <div className="mt-4 grid gap-2">
            <Link
              href={`/tournament/register?slug=${encodeURIComponent(
                tournament.slug,
              )}`}
              className="rounded-md bg-primary px-4 py-2 text-center text-sm text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Register online
            </Link>
            {tournament.brochure_url ? (
              <a
                href={tournament.brochure_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-border bg-background px-4 py-2 text-center text-sm hover:bg-muted transition-colors"
              >
                Download brochure
              </a>
            ) : null}
            {tournament.results_url ? (
              <a
                href={tournament.results_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-border bg-background px-4 py-2 text-center text-sm hover:bg-muted transition-colors"
              >
                View results
              </a>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function TournamentPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading interface...</div>}>
      <TournamentContent />
    </Suspense>
  );
}
