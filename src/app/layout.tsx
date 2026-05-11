import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Andaman & Nicobar Chess Association",
    template: "%s | ANCA",
  },
  description:
    "Official portal of the Andaman & Nicobar Chess Association (ANCA) — governing body affiliated to AICF & FIDE. Tournaments, ratings, arbiters and more.",
  keywords: [
    "chess",
    "Andaman",
    "Nicobar",
    "ANCA",
    "AICF",
    "FIDE",
    "tournament",
    "chess association",
    "Port Blair",
  ],
  authors: [{ name: "ANCA IT Team" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ancachess.in",
    siteName: "Andaman & Nicobar Chess Association",
    title: "Andaman & Nicobar Chess Association",
    description:
      "Official portal of ANCA — promoting chess excellence across the islands since 2005.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ANCA — Andaman & Nicobar Chess Association",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andaman & Nicobar Chess Association",
    description:
      "Official portal of ANCA — promoting chess excellence across the islands since 2005.",
  },
  metadataBase: new URL("https://ancachess.in"),
};

import { PageTransition, ScrollAnimationWebGL } from "@/components/layout/DynamicWrappers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-background text-foreground flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div id="main-content" className="flex flex-col min-h-screen relative">
            <ScrollAnimationWebGL />
            <Header />
            <main className="flex-1 w-full flex flex-col items-center">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
