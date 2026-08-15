import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--background)] px-6 py-12 md:px-24 md:py-16 mx-auto max-w-[1180px] flex flex-wrap gap-8 justify-between items-end border-t border-[var(--line)] transition-colors duration-500">
      
      {/* Brand Mark & Founded Year */}
      <div className="flex flex-col gap-2">
        <h2 className="font-display italic text-3xl md:text-4xl text-[var(--foreground)]">
          SU·EN Studio
        </h2>
        <span className="font-mono text-xs tracking-widest text-[var(--stone)] uppercase">
          Est. 2022 — Kerala & Bangalore
        </span>
      </div>

      {/* Meta / Contact Links */}
      <div className="flex flex-wrap gap-6 md:gap-12 font-mono text-xs tracking-widest text-[var(--ink-soft)] uppercase">
        <div className="flex flex-col gap-2">
          <span className="text-[var(--stone)]">Inquiries</span>
          <a 
            href="mailto:studio.su.en@gmail.com" 
            className="text-[var(--foreground)] hover:text-[var(--bronze)] transition-colors border-b border-[var(--line)] pb-1"
          >
            studio.su.en@gmail.com
          </a>
          <a 
            href="tel:+918943333119" 
            className="text-[var(--foreground)] hover:text-[var(--bronze)] transition-colors border-b border-[var(--line)] pb-1"
          >
            +91 8943333119
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[var(--stone)]">Navigation</span>
          <Link href="/projects" className="text-[var(--foreground)] hover:text-[var(--bronze)] transition-colors border-b border-[var(--line)] pb-1">
            Work
          </Link>
          <Link href="/contact" className="text-[var(--foreground)] hover:text-[var(--bronze)] transition-colors border-b border-[var(--line)] pb-1">
            Contact
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full mt-8 font-mono text-[10px] text-[var(--stone)] tracking-widest flex justify-between items-center">
        <span>© {currentYear} SU·EN Studio. All rights reserved.</span>
      </div>
      
    </footer>
  );
}