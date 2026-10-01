import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Silkscreen } from "next/font/google";
import { Providers } from "@/components/Providers";
import { en } from "@/content/en";
import "./globals.css";

// next/font downloads the fonts at build time and serves them from this site.
// The visitor's browser never talks to Google.
const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const silkscreen = Silkscreen({ variable: "--font-silkscreen", subsets: ["latin"], weight: ["400"], display: "swap" });

export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description,
  icons: { icon: "/brand/logo-mark.png" },
};

export const viewport: Viewport = {
  themeColor: "#07081A",
};

// Runs before paint: hides the final hero state while the ignition plays,
// so nothing flashes. Skipped on repeat visits and with reduced motion.
const introScript = `try{var r=location.search.indexOf('replay')>-1;if((r||!sessionStorage.getItem('bs-ignited'))&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.intro='1'}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${silkscreen.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-spark focus:px-4 focus:py-2 focus:text-note-ink"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
