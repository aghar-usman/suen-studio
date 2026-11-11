import type { Metadata, Viewport } from "next";
import { Syne, Inter, Space_Mono, Fraunces } from "next/font/google";
import Script from "next/script";

import Nav from "@/components/nav";
import Footer from "@/components/footer";
import PageTransitionOverlay from "@/components/page-transition-overlay";

import "./globals.css";

// The Avant-Garde Display Font
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Clean, highly legible body font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

// Edgy, architectural monospace font
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Restrained editorial serif — used sparingly for hero-scale headlines
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Su.En. Studio",
    template: "%s — Su.En. Studio",
  },
  description:
    "Su.En. Studio is an architecture and interiors practice focused on thoughtful spaces, materiality, and context.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#100F0B" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${spaceMono.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground font-body"
        suppressHydrationWarning
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function () {
              try {
                var stored = localStorage.getItem("theme");
                var theme = stored === "dark" || stored === "light" ? stored : "light";
                document.documentElement.classList.toggle("dark", theme === "dark");
              } catch (e) {}
            })();
          `}
        </Script>

        <PageTransitionOverlay />

        <Nav />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}