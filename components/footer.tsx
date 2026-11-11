"use client";

import Link from "next/link";
import Image from "next/image";

const focusRing =
  "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 rounded-sm";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer className="bg-background px-6 py-16 md:px-12 lg:px-24 md:py-24 border-t border-line transition-colors duration-500">
      <div className="mx-auto max-w-7xl flex flex-col gap-16 lg:gap-24">
        
        {/* =====================================================
            TOP SECTION: LOGO & LINKS
            ===================================================== */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:items-start">
          
          {/* Left Column: Brand */}
          <div className="flex flex-col gap-6 lg:gap-8 max-w-sm">
            <Link
              href="/"
              className={`inline-block w-fit ${focusRing}`}
              aria-label="SU·EN Studio Home"
            >
              <Image
                src="/images/Logo-light.png"
                alt="SU·EN Studio"
                width={140}
                height={140}
                className="w-28 md:w-36 h-auto block dark:hidden transition-all duration-500"
              />
              <Image
                src="/images/Logo-dark.png"
                alt="SU·EN Studio"
                width={140}
                height={140}
                className="w-28 md:w-36 h-auto hidden dark:block transition-all duration-500"
              />
            </Link>
            <p className="font-body text-foreground/85 text-sm leading-relaxed">
              Spaces shaped by context.<br />
              Designed for life.
            </p>
            <span className="font-mono text-[10px] tracking-widest text-muted uppercase inline-flex items-center gap-2">
              {/* Small red dot before "Est." — echoes the two dots in the
                  logo mark, matching the same treatment used in the hero
                  and studio-bio sections. */}
              <span
                className="w-1 h-1 rounded-full bg-[var(--logo-red)] shrink-0"
                aria-hidden="true"
              />
              Est. 2017 — Kerala &amp; Bangalore
            </span>
          </div>

          {/* Right Column: Links Grid */}
          <div className="grid grid-cols-2 gap-12 md:gap-24 lg:gap-32 font-mono text-xs tracking-widest text-foreground uppercase">
            
            {/* Navigation */}
            <nav aria-label="Footer navigation" className="flex flex-col gap-5">
              <span className="text-muted mb-1 text-[10px]">Navigation</span>
              <Link
                href="/"
                className={`group flex items-center gap-2 w-fit hover:text-accent transition-colors ${focusRing}`}
              >
                {/* Quiet red dot that fades and scales in on hover —
                    a small interactive echo of the logo's dots. */}
                <span
                  className="w-1 h-1 rounded-full bg-[var(--logo-red)] opacity-0 scale-50 transition-all duration-300 motion-reduce:transition-none group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100 shrink-0"
                  aria-hidden="true"
                />
                <span className="relative overflow-hidden">
                  <span className="block transition-transform duration-300 motion-reduce:transition-none group-hover:-translate-y-full group-focus-visible:-translate-y-full">
                    Home
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 block translate-y-full transition-transform duration-300 motion-reduce:transition-none group-hover:translate-y-0 group-focus-visible:translate-y-0"
                  >
                    Home
                  </span>
                </span>
              </Link>
              <Link
                href="/projects"
                className={`group flex items-center gap-2 w-fit hover:text-accent transition-colors ${focusRing}`}
              >
                <span
                  className="w-1 h-1 rounded-full bg-[var(--logo-red)] opacity-0 scale-50 transition-all duration-300 motion-reduce:transition-none group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100 shrink-0"
                  aria-hidden="true"
                />
                <span className="relative overflow-hidden">
                  <span className="block transition-transform duration-300 motion-reduce:transition-none group-hover:-translate-y-full group-focus-visible:-translate-y-full">
                    Work
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 block translate-y-full transition-transform duration-300 motion-reduce:transition-none group-hover:translate-y-0 group-focus-visible:translate-y-0"
                  >
                    Work
                  </span>
                </span>
              </Link>
              <Link
                href="/contact"
                className={`group flex items-center gap-2 w-fit hover:text-accent transition-colors ${focusRing}`}
              >
                <span
                  className="w-1 h-1 rounded-full bg-[var(--logo-red)] opacity-0 scale-50 transition-all duration-300 motion-reduce:transition-none group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100 shrink-0"
                  aria-hidden="true"
                />
                <span className="relative overflow-hidden">
                  <span className="block transition-transform duration-300 motion-reduce:transition-none group-hover:-translate-y-full group-focus-visible:-translate-y-full">
                    Contact
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 block translate-y-full transition-transform duration-300 motion-reduce:transition-none group-hover:translate-y-0 group-focus-visible:translate-y-0"
                  >
                    Contact
                  </span>
                </span>
              </Link>
            </nav>

            {/* Inquiries */}
            <div className="flex flex-col gap-5">
              <span className="text-muted mb-1 text-[10px]">Inquiries</span>
              
              <a 
                href="mailto:studio.su.en@gmail.com" 
                className={`group flex items-center gap-2.5 relative w-fit hover:text-accent transition-colors ${focusRing}`}
              >
                <svg
                  className="w-[14px] h-[14px] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <span className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 group-focus-visible:after:origin-bottom-left group-focus-visible:after:scale-x-100">
                  Email Studio
                </span>
              </a>

              <a 
                href="tel:+918943333119" 
                className={`group flex items-center gap-2.5 relative w-fit hover:text-accent transition-colors ${focusRing}`}
              >
                <svg
                  className="w-[14px] h-[14px] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 group-focus-visible:after:origin-bottom-left group-focus-visible:after:scale-x-100">
                  +91 8943333119
                </span>
              </a>

              <a 
                href="https://instagram.com/yourhandle" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`group flex items-center gap-2.5 relative w-fit hover:text-accent transition-colors ${focusRing}`}
              >
                <svg
                  className="w-[14px] h-[14px] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                <span className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 group-focus-visible:after:origin-bottom-left group-focus-visible:after:scale-x-100">
                  Instagram
                </span>
              </a>
            </div>

          </div>
        </div>

        {/* =====================================================
            BOTTOM SECTION: COPYRIGHT, CREDIT & BACK TO TOP
            ===================================================== */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pt-8 border-t border-line">
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
              © {currentYear} SU·EN Studio. All rights reserved.
            </span>
            
            {/* AUKT Signature */}
            <div className="flex items-center gap-2.5 font-mono text-[10px] text-muted tracking-widest uppercase">
              <span>Site by</span>
              <a 
                href="https://aghar-portfolio.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`opacity-75 hover:opacity-100 focus-visible:opacity-100 transition-opacity ${focusRing}`}
                aria-label="Site by AUKT"
              >
                <Image 
                  src="/images/AUKT.svg" 
                  alt="AUKT" 
                  width={50} 
                  height={16} 
                  className="theme-logo w-auto h-4" 
                />
              </a>
            </div>
          </div>
          
          <button 
            onClick={scrollToTop}
            className={`group flex items-center gap-3 font-mono text-[10px] text-foreground hover:text-accent active:text-accent tracking-widest uppercase transition-colors ${focusRing}`}
          >
            <span>Back to Top</span>
            <svg 
              className="w-3 h-3 transition-transform duration-300 motion-reduce:transition-none group-hover:-translate-y-1 group-focus-visible:-translate-y-1" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </button>

        </div>
        
      </div>
    </footer>
  );
}