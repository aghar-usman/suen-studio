"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/lib/projects-data";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsArchive() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Tracks whether the component is currently mounted so async callbacks
  // (like an image's onLoad firing late) don't call ScrollTrigger.refresh()
  // after cleanup has already run.
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    // Keep the refs array in sync with the current list length so a
    // future filtered/shorter list doesn't leave stale nodes behind
    // that GSAP would otherwise still try to animate.
    cardRefs.current = cardRefs.current.slice(0, PROJECTS.length);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, gridRef);

    return () => {
      isMountedRef.current = false;
      ctx.revert();
    };
  }, []);

  const handleImageLoad = () => {
    if (isMountedRef.current) {
      ScrollTrigger.refresh();
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-5 sm:px-6 md:px-12 lg:px-24 pt-28 sm:pt-32 lg:pt-40 pb-20 sm:pb-28">
      {/* Header */}
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent inline-flex items-center gap-2">
          {/* Small red dot before "Archive" — echoes the two dots in the
              logo mark, matching the eyebrow-label treatment used across
              the hero, studio-bio, and featured-projects sections. */}
          <span
            className="w-1 h-1 rounded-full bg-[var(--logo-red)] shrink-0"
            aria-hidden="true"
          />
          Archive
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tighter text-foreground">
          All Projects
        </h1>
        <p className="mt-4 sm:mt-5 font-body text-sm sm:text-base text-foreground/70 leading-relaxed">
          Every commission, from first sketch to final handover.
        </p>
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-y-12"
      >
        {PROJECTS.map((project, i) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="group flex flex-col gap-4 outline-none transition-transform duration-300 active:scale-[0.98] active:duration-100 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
          >
            {/* 3:2 mirrors the landscape aspect most of the studio's
                photography comes in — a 4:5 portrait crop was cutting
                into the tops/bottoms of wide architectural shots. */}
            <div className="relative w-full aspect-[3/2] overflow-hidden bg-line">
              <Image
                src={project.img}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover saturate-[0.85] sepia-[0.08] contrast-[1.05] transition-all duration-700 group-hover:saturate-100 group-hover:sepia-0 group-hover:contrast-100 group-hover:scale-[1.03]"
                onLoad={handleImageLoad}
              />
            </div>

            <div className="flex flex-col gap-1 border-t border-line pt-4 transition-colors duration-500 group-hover:border-accent">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent inline-flex items-center">
                {project.id} — {project.category}
                {/* Quiet dot that fades and scales in on card hover —
                    same interactive echo used on featured-projects cards. */}
                <span
                  className="w-1 h-1 rounded-full bg-[var(--logo-red)] ml-1.5 opacity-0 scale-50 transition-all duration-300 motion-reduce:transition-none group-hover:opacity-100 group-hover:scale-100 shrink-0"
                  aria-hidden="true"
                />
              </span>
              <h2 className="font-display text-lg sm:text-xl text-foreground">
                {project.title}
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                {project.location} · {project.year}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {PROJECTS.length === 0 && (
        <p className="mt-16 font-mono text-xs uppercase tracking-widest text-muted text-center">
          No projects available.
        </p>
      )}
    </main>
  );
}