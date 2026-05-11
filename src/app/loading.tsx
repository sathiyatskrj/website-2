export default function Loading() {
  return (
    <div className="flex flex-col w-full bg-background overflow-x-hidden">
      {/* News ticker skeleton */}
      <div className="h-9 bg-muted/30 animate-pulse border-b border-border/50" />

      {/* Hero skeleton */}
      <div className="w-full h-[500px] md:h-[620px] lg:h-[740px] bg-muted/20 animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-muted/60 via-muted/20 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 md:px-16 space-y-6 max-w-2xl">
            <div className="h-5 w-24 bg-muted/50 rounded" />
            <div className="space-y-3">
              <div className="h-14 w-3/4 bg-muted/50 rounded" />
              <div className="h-14 w-1/2 bg-muted/40 rounded" />
            </div>
            <div className="h-5 w-full bg-muted/30 rounded" />
            <div className="h-5 w-4/5 bg-muted/20 rounded" />
            <div className="flex gap-4 mt-4">
              <div className="h-12 w-36 bg-primary/20 rounded" />
              <div className="h-12 w-32 bg-muted/30 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Sponsors strip skeleton */}
      <div className="h-20 border-y border-border/50 bg-muted/10 animate-pulse" />

      {/* Bento grid skeleton */}
      <div className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-40 bg-muted/30 rounded-2xl animate-pulse" style={{ animationDelay: `${i * 80}ms` }} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2 h-80 bg-muted/25 rounded-3xl animate-pulse" style={{ animationDelay: "100ms" }} />
          <div className="lg:col-span-2 h-80 bg-muted/20 rounded-3xl animate-pulse" style={{ animationDelay: "150ms" }} />
          <div className="lg:col-span-2 h-80 bg-muted/20 rounded-3xl animate-pulse" style={{ animationDelay: "200ms" }} />
          <div className="lg:col-span-2 h-80 bg-muted/15 rounded-3xl animate-pulse" style={{ animationDelay: "250ms" }} />
        </div>
      </div>
    </div>
  );
}
