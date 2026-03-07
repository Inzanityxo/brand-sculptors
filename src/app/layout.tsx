import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GradientBlobs } from "@/components/shared/gradient-blob";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { ThemeProvider } from "@/components/shared/theme-provider";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Brand Sculptors | Content That Converts",
  description:
    "We help experts and business owners turn their expertise into a predictable stream of qualified leads. The fire of authentic storytelling. The precision of content-marketing systems.",
  metadataBase: new URL("https://brandsculptors.com"),
  openGraph: {
    title: "Brand Sculptors | Content That Converts",
    description:
      "We help experts and business owners turn their expertise into a predictable stream of qualified leads. The fire of authentic storytelling. The precision of content-marketing systems.",
    url: "https://brandsculptors.com",
    siteName: "Brand Sculptors",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand Sculptors | Content That Converts",
    description:
      "We help experts and business owners turn their expertise into a predictable stream of qualified leads.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <ThemeProvider>
          <ScrollProgress />
          <GradientBlobs />
          <div className="noise-overlay" />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
