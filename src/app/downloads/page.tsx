"use client";

import { Download, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { mockDownloads } from "@/lib/mockData";

export default function DownloadsPage() {
  const documents = mockDownloads;

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary text-primary-foreground py-16 bg-chess-pattern relative">
        <div className="absolute inset-0 bg-primary/95"></div>
        <div className="container relative mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 text-sm text-primary-foreground/70 mb-3">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Downloads</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-poppins mb-4">Downloads &amp; Resources</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Access important forms, brochures, and regulatory documents below.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background flex-1">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden min-h-[300px]">
            {documents.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No documents currently available for download.
              </div>
            ) : (
              <div className="divide-y divide-border">
                {documents.map((doc, i) => (
                  <div key={doc.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-muted/50 transition-colors gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">{doc.title}</h3>
                        <div className="flex gap-2 items-center mt-1">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded uppercase tracking-wider bg-muted text-muted-foreground">{doc.category}</span>
                            <span className="text-xs text-muted-foreground">Added: {format(parseISO(doc.uploaded_at), "dd MMM yyyy")}</span>
                        </div>
                      </div>
                    </div>
                    <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-border hover:bg-primary hover:text-primary-foreground bg-background rounded-lg font-medium text-sm w-full sm:w-auto justify-center transition-colors">
                      <Download className="h-4 w-4" /> Download PDF
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
