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
    title: "Gokulam Residence",
    category: "Residential",
    location: "Kerala",
    publications: [
      { name: "Volume Zero", url: "https://volzero.com/articles/view/gokulam-residence-by-suen-studio" },
    ],
    img: "/images/p1.jpg", 
    link: "/projects/gokulam-residence",
  },
  {
    id: "02",
    title: "Casa Dhalaan",
    category: "Residential",
    location: "Kerala",
    publications: [
      { name: "Volume Zero", url: "https://volzero.com/articles/view/casa-dhalaan-by-suen-studio" },
    ],
    img: "/images/p2.jpg",
    link: "/projects/casa-dhalaan",
  },
  {
    id: "03",
    title: "Caper Residence",
    category: "Residential",
    location: "Kerala",
    publications: [
      { name: "Volume Zero", url: "https://volzero.com/articles/view/caper-residence-by-suen-studio" },
      { name: "ArchDaily", url: "https://www.archdaily.com/980003/caper-residence-sn-studio" },
    ],
    img: "/images/p3.jpg",
    link: "/projects/caper-residence",
  },
];

export default function FeaturedProjects() {
  // We add a new outer scopeRef to protect React's DOM tree from GSAP's pin spacer
  const scopeRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      sectionRef.current?.setAttribute("data-motion", "reduced");
      return;
    }

    // Use gsap.matchMedia directly as the context manager, scoped to our safe wrapper
    const mm = gsap.matchMedia(scopeRef);

    // =========================================================
    // DESKTOP ANIMATION: Horizontal Pin + X-Axis Parallax
    // =========================================================
    mm.add("(min-width: 768px)", () => {
      const section = sectionRef.current!;
      const container = containerRef.current!;
      const progressBar = progressRef.current!;

      const getScrollAmount = () => -(container.scrollWidth - window.innerWidth);
      const getEnd = () => `+=${container.scrollWidth - window.innerWidth}`;

      gsap.to(container, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: getEnd,
          pin: true,
          // Was 1.5 — the largest scroll-to-motion lag on the site.
          // 0.6 keeps the horizontal pin smooth without feeling detached
          // from the wheel/trackpad input driving it.
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(progressBar, { scaleX: self.progress });
          },
        },
      });

      imageRefs.current.forEach((img) => {
        if (!img) return;
        gsap.to(img, {
          x: 120, 
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: getEnd,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });
    });

    // =========================================================
    // MOBILE ANIMATION: Vertical Reveal + Y-Axis Parallax
    // =========================================================
    mm.add("(max-width: 767px)", () => {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      imageRefs.current.forEach((img) => {
        if (!img) return;
        gsap.fromTo(
          img,
          { y: -30 },
          {
            y: 30, 
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(`.${styles.card}`),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    // =========================================================
    // LAYOUT SHIFT HANDLING
    // GSAP calculates pin start/end synchronously at creation time,
    // against whatever the DOM measures right then. On first load,
    // fonts and some images haven't finished settling, so those
    // numbers can be off — resizing the window "fixes" it only
    // because GSAP's own resize listener calls ScrollTrigger.refresh()
    // once things have settled. These do that same correction
    // explicitly, without relying on the user resizing anything:
    // - "load": catches images/layout finishing
    // - fonts.ready: catches web font swap changing text metrics
    // - ResizeObserver on the whole document: catches anything else
    //   that changes page height after the above have already fired
    // =========================================================
    // Guards deferred/async refreshes from firing after this effect has
    // started tearing down. document.fonts.ready in particular is a promise
    // with no built-in cancellation — without this guard, it can resolve
    // after unmount and call ScrollTrigger.refresh() while React is mid
    // DOM-cleanup, which is what caused the removeChild NotFoundError.
    let isMounted = true;

    const forceRefresh = () => {
      if (!isMounted) return;
      ScrollTrigger.refresh();
    };

    if (document.readyState === "complete") {
      forceRefresh();
    } else {
      window.addEventListener("load", forceRefresh);
    }

    document.fonts?.ready?.then(forceRefresh);

    let refreshTimeout: NodeJS.Timeout;
    const ro = new ResizeObserver(() => {
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(forceRefresh, 200);
    });
    ro.observe(document.documentElement);

    // mm.revert() safely tears down both the tweens and the physical DOM pin-spacers
    return () => {
      isMounted = false;
      window.removeEventListener("load", forceRefresh);
      ro.disconnect();
      clearTimeout(refreshTimeout);
      mm.revert();
    };
  }, []);

  return (
    /* Outer wrapper protects React from the GSAP DOM manipulation */
    <div ref={scopeRef}>
      <section ref={sectionRef} className={styles.section}>
        
        {/* Refined Header */}
        <div className={styles.header}>
          <div className="flex flex-col">
            <span className={`font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-2 ${styles.eyebrow}`}>
              02 / Portfolio
            </span>
            <h2 className="font-display text-3xl lg:text-4xl text-foreground tracking-tight">
              Featured Projects
            </h2>
            <div className={`hidden md:block w-36 h-[1px] bg-line mt-4 origin-left relative ${styles.progressTrack}`}>
               <span className={styles.progressDot} aria-hidden="true" />
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

        {/* Scrolling Container */}
        <div ref={containerRef} className={styles.scrollContainer}>
          {PROJECTS.map((project, i) => (
            <Link 
              href={project.link} 
              key={project.id} 
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`${styles.card} group`}
            >
              
              <div className={styles.imageMask}>
                <div
                  ref={(el) => { imageRefs.current[i] = el; }}
                  className={styles.imageParallaxWrapper}
                >
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className={styles.image}
                    priority={i === 0}
                    onLoad={() => ScrollTrigger.refresh()}
                  />
                </div>
                <div className={styles.overlay} />
              </div>

              <div className={styles.metaContainer}>
                <div className="flex justify-between items-start w-full">
                  
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                      {project.id} — {project.category}
                      <span className={styles.cardIdDot} aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-xl lg:text-2xl text-foreground">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex flex-col items-end text-right mt-1 gap-1">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted pb-1">
                      {project.location}
                    </span>
                    
                    {project.publications?.map((pub) => (
                      <div
                        key={pub.name}
                        className="flex items-center gap-2 border border-line px-2 py-[0.3rem] bg-surface/60 transition-colors duration-500 group-hover:border-brass/50 group-hover:bg-background"
                      >
                        <span className="w-1 h-1 rounded-full bg-brass" />
                        <span className="font-mono text-[9px] uppercase tracking-widest text-foreground whitespace-nowrap">
                          {pub.name}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
              
            </Link>
          ))}

          {/* End of scroll CTA */}
          <div ref={ctaRef} className={styles.endCta}>
             <h3 className="font-display text-2xl lg:text-3xl text-foreground mb-6 text-center max-w-xs">
               Explore all works & commissions.
             </h3>
             <Link href="/projects" className={styles.ctaButton}>
               Archive Index
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}