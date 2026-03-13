"use client";

import { ChevronRight, Image as ImageIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import { mockGallery } from "@/lib/mockData";
import Link from "next/link";

export default function GalleryPage() {
  const images = mockGallery;

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary text-primary-foreground py-16 bg-chess-pattern relative">
        <div className="absolute inset-0 bg-primary/95"></div>
        <div className="container relative mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 text-sm text-primary-foreground/70 mb-3">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Photo Gallery</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-poppins mb-4 flex items-center justify-center gap-3">
            <ImageIcon className="h-10 w-10 text-secondary" /> Photo Gallery
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Memories from our state championships, award ceremonies, and coaching camps.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background flex-1">
        <div className="container mx-auto px-4">
          {images.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground bg-card border border-border rounded-xl">
              No photos have been uploaded to the gallery yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((img) => (
                <div key={img.id} className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                  <div className="relative aspect-square w-full bg-muted cursor-pointer overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.image_url} alt={img.album} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <a href={img.image_url} target="_blank" rel="noopener noreferrer" className="text-white font-medium border border-white/50 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors">
                        View Full
                      </a>
                    </div>
                  </div>
                  <div className="p-4 border-t border-border">
                    <h3 className="font-bold text-foreground text-sm truncate">{img.album}</h3>
                    {img.date && (
                        <p className="text-xs text-muted-foreground mt-1">{format(parseISO(img.date), "dd MMM yyyy")}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
