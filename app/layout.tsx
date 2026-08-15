import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Space_Mono } from "next/font/google";
import Script from "next/script";

import Nav from "@/components/nav";
import Footer from "@/components/footer";

import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SU·EN Studio",
    template: "%s — SU·EN Studio",
  },
  description:
    "SU·EN Studio is an architecture and interiors practice focused on thoughtful spaces, materiality, and context.",
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#F7F5F0",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#100F0B",
    },
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
      className={`${playfair.variable} ${inter.variable} ${spaceMono.variable} h-full antialiased`}
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

        <Nav />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}