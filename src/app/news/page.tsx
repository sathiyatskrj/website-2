"use client";

import Link from 'next/link';
import { Calendar, FileText, Download, ChevronRight, Newspaper } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { mockNews } from '@/lib/mockData';

export default function NewsPage() {
  const news = mockNews;

  return (
    <div className="flex flex-col w-full min-h-screen">
      <section className="bg-primary text-primary-foreground py-8 border-b-4 border-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-3">
            <Link href="/">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>News &amp; Announcements</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-poppins uppercase tracking-wide flex items-center gap-3">
            <Newspaper className="h-8 w-8 text-secondary" /> News &amp; Announcements
          </h1>
          <p className="text-primary-foreground/80 mt-2">Latest circulars, tournament notices, and news from ANCA</p>
        </div>
      </section>

      <section className="py-10 container mx-auto px-4 flex-1">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-card border border-border shadow-sm rounded-md overflow-hidden min-h-[400px]">
              <div className="bg-primary text-primary-foreground text-xs uppercase tracking-widest font-bold py-3 px-6 flex justify-between items-center">
                <span>Latest Announcements</span>
                <span className="text-primary-foreground/70">{news.length} Items</span>
              </div>

              {news.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No news articles published yet.
                </div>
              ) : (
                news.map((item, i) => {
                  const pubDate = parseISO(item.published_date);
                  const day = format(pubDate, "dd");
                  const month = format(pubDate, "MMM");
                  const fullDate = format(pubDate, "dd MMM yyyy");

                  return (
                    <div key={item.id} className={`px-6 py-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${i % 2 === 0 ? '' : 'bg-muted/20'}`}>
                      <div className="flex items-start gap-4 flex-1">
                        <div className="bg-primary text-primary-foreground rounded p-2 text-center min-w-[48px] shrink-0 hidden sm:flex flex-col justify-center">
                          <span className="text-lg font-bold leading-none">{day}</span>
                          <span className="text-[10px] uppercase">{month}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded-sm uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
                              News
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> {fullDate}</span>
                          </div>
                          <h3 className="font-semibold text-foreground text-sm leading-snug">{item.title}</h3>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Link href={`/news/${item.slug}`} className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded text-xs font-bold hover:bg-primary/90 transition-colors">
                          <FileText className="h-3 w-3" /> Read
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-card border border-border rounded-md shadow-sm p-5">
              <h3 className="font-poppins font-bold text-primary text-sm uppercase tracking-wider border-b border-border pb-2 mb-4">Archive</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {["March 2026", "February 2026", "January 2026", "December 2025"].map(m => (
                  <li key={m}><button className="hover:text-primary hover:underline transition-colors">&rsaquo; {m}</button></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
