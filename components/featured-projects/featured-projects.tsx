"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./featured-projects.module.css";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "01",
    title: "House Under Shade",
    category: "Residential",
    location: "Kerala",
    publication: "Architectural Digest",
    img: "/images/p1.jpg", 
    link: "/projects/house-under-shade",
  },
  {
    id: "02",
    title: "Urban Courtyard",
    category: "Commercial",
    location: "Bangalore",
    img: "/images/p2.jpg",
    link: "/projects/urban-courtyard",
  },
  {
    id: "03",
    title: "The Slate Pavilion",
    category: "Architecture",
    location: "Kerala",
    publication: "Domus India",
    img: "/images/p3.jpg",
    link: "/projects/slate-pavilion",
  },
  {
    id: "04",
    title: "Onyx Residence",
    category: "Interiors",
    location: "Bangalore",
    img: "/images/p4.jpg",
    link: "/projects/onyx-residence",
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // No pin, no scrub — the row becomes a native, swipeable/scrollable
      // strip via the CSS fallback (see .section[data-motion="reduced"]).
      sectionRef.current?.setAttribute("data-motion", "reduced");
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const section = sectionRef.current!;
        const container = containerRef.current!;
        const progressBar = progressRef.current!;

        const getScrollAmount = () => -(container.scrollWidth - window.innerWidth);
        const getEnd = () => `+=${container.scrollWidth - window.innerWidth}`;

        // 1. Horizontal Scroll Sequence — the progress bar is driven from
        // this same trigger's onUpdate so it can never drift out of sync
        // with the horizontal position (previously a second ScrollTrigger
        // with a different scrub value caused a visible lag between the
        // two).
        const tween = gsap.to(container, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: getEnd,
            pin: true,
            scrub: 1.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set(progressBar, { scaleX: self.progress });
            },
          },
        });

        // 2. Parallax effect for the images inside the cards
        imageRefs.current.forEach((img) => {
          if (!img) return;
          gsap.to(img, {
            x: 120,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: getEnd,
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          });
        });

        return () => {
          tween.kill();
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      
      {/* Refined Header */}
      <div className={styles.header}>
        <div className="flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-2">
            02 / Portfolio
          </span>
          <h2 className="font-display text-3xl lg:text-4xl italic text-foreground tracking-wide">
            Featured Projects
          </h2>
          {/* Progress Bar (Desktop) */}
          <div className="hidden md:block w-36 h-[1px] bg-line mt-4 origin-left relative">
             <div ref={progressRef} className="absolute inset-0 bg-accent scale-x-0 origin-left" />
          </div>
        </div>

        <Link 
          href="/projects" 
          className="group flex items-center gap-2 mt-4 md:mt-0 pb-1 border-b border-transparent hover:border-brass transition-colors"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-muted group-hover:text-foreground transition-colors">
            View All Projects
          </span>
          <svg className="w-4 h-4 text-muted group-hover:text-brass transition-all group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      {/* Horizontally Scrolling Container */}
      <div ref={containerRef} className={styles.scrollContainer}>
        {PROJECTS.map((project, i) => (
          <Link href={project.link} key={project.id} className={styles.card}>
            
            <div className={styles.imageMask}>
              <Image
                ref={(el) => { imageRefs.current[i] = el; }}
                src={project.img}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className={styles.image}
                priority={i === 0}
                onLoad={() => ScrollTrigger.refresh()}
              />
              <div className={styles.overlay} />
            </div>

            <div className={styles.metaContainer}>
              <div className="flex justify-between items-start w-full">
                
                {/* Left Side: Category & Title */}
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                    {project.id} — {project.category}
                  </span>
                  <h3 className="font-display text-xl lg:text-2xl text-foreground">
                    {project.title}
                  </h3>
                </div>

                {/* Right Side: Location & Publication */}
                <div className="flex flex-col items-end text-right mt-1">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted pb-1">
                    {project.location}
                  </span>
                  
                  {project.publication && (
                    <div className="flex items-center gap-2 mt-1 border border-line px-2 py-[0.3rem] bg-surface/60 transition-colors duration-500 group-hover:border-brass/50 group-hover:bg-background">
                      <span className="w-1 h-1 rounded-full bg-brass" />
                      <span className="font-mono text-[9px] uppercase tracking-widest text-foreground whitespace-nowrap">
                        {project.publication}
                      </span>
                    </div>
                  )}
                </div>

              </div>
            </div>
            
          </Link>
        ))}

        {/* End of scroll CTA */}
        <div className={styles.endCta}>
           <h3 className="font-display text-2xl lg:text-3xl italic text-foreground mb-6 text-center max-w-xs">
             Explore all works & commissions.
           </h3>
           <Link href="/projects" className={styles.ctaButton}>
             Archive Index
           </Link>
        </div>
      </div>
    </section>
  );
}