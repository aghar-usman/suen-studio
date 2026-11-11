"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { buildContactMailto } from "@/lib/contact";

gsap.registerPlugin(ScrollTrigger);

export default function CtaProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const elRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        elRefs.current,
        { y: 30, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto max-w-7xl px-5 sm:px-6 md:px-12 lg:px-24 py-20 sm:py-28 lg:py-36"
    >
      <span
        ref={lineRef}
        className="absolute left-5 right-5 sm:left-6 sm:right-6 md:left-12 md:right-12 lg:left-24 lg:right-24 top-0 h-px origin-left scale-x-0 bg-line"
        aria-hidden="true"
      >
        {/* Marks the origin point of the hairline with a tiny red dot —
            same treatment as the metrics-band hairline in studio-bio and
            the progress-bar track in featured-projects. */}
        <span
          className="absolute -left-[3px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--logo-red)]"
          aria-hidden="true"
        />
      </span>

      <div className="flex flex-col items-center text-center gap-6 sm:gap-8 pt-16 sm:pt-20">
        <p
          ref={(el) => {
            elRefs.current[0] = el;
          }}
          className="font-mono text-xs uppercase tracking-[0.25em] text-accent inline-flex items-center gap-2"
        >
          {/* Small red dot before "Start a Project" — echoes the two
              dots in the logo mark, matching the eyebrow-label treatment
              used across the hero, studio-bio, and archive sections. */}
          <span
            className="w-1 h-1 rounded-full bg-[var(--logo-red)] shrink-0"
            aria-hidden="true"
          />
          Start a Project
        </p>

        <h2
          ref={(el) => {
            elRefs.current[1] = el;
          }}
          className="max-w-3xl font-display text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-[1.05] text-foreground"
        >
          Have a site in mind?
          <br />
          <span className="text-accent">Let&apos;s design for it.</span>
        </h2>

        <p
          ref={(el) => {
            elRefs.current[2] = el;
          }}
          className="max-w-xl font-body text-sm sm:text-base text-foreground/70 leading-relaxed"
        >
          From first sketch to final handover — we take on a limited number
          of commissions each year to give every project the attention it
          deserves.
        </p>

        <div
          ref={(el) => {
            elRefs.current[3] = el;
          }}
          className="mt-2 sm:mt-4"
        >
          <a
            href={buildContactMailto()}
            className="inline-flex items-center gap-3 px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-background bg-foreground border border-foreground transition-all duration-500 hover:bg-transparent hover:text-foreground hover:border-accent"
          >
            Let&apos;s build something together
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <p
          ref={(el) => {
            elRefs.current[4] = el;
          }}
          className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted"
        >
          Kerala &amp; Bangalore &nbsp;·&nbsp; Est. 2017
        </p>
      </div>
    </section>
  );
}