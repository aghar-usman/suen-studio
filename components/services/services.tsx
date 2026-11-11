"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./design-process.module.css";

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  {
    title: "Discovery & Site Visit",
    description:
      "We begin with a client meeting to understand the brief, followed by a site visit to study the existing conditions and constraints.",
  },
  {
    title: "Concept",
    description:
      "The requirements are distilled into a design direction, developed into conceptual sketches.",
  },
  {
    title: "Design Development",
    description:
      "The concept is discussed with the client and finalized into a plan, developed further into 3D design.",
  },
  {
    title: "Documentation",
    description:
      "Detailed drawings and documents are prepared, translating the design into a buildable set.",
  },
  {
    title: "Construction",
    description:
      "The design is executed on site, with the team supervising progress through each stage.",
  },
  {
    title: "Interiors",
    description:
      "The interior design stage completes the space, carrying the same intent down to the last detail.",
  },
];

export default function DesignProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const lineRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const bigNumberRef = useRef<HTMLDivElement>(null);
  const bigTitleRef = useRef<HTMLDivElement>(null);
  const tickRefs = useRef<(HTMLDivElement | null)[]>([]);

  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rowContentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !listRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        let active = -1;

        const setActive = (i: number) => {
          if (i === active) return;
          active = i;

          rowContentRefs.current.forEach((el, idx) => {
            if (el) el.dataset.active = idx === i ? "true" : "false";
          });

          tickRefs.current.forEach((el, idx) => {
            if (el) el.dataset.active = idx === i ? "true" : "false";
          });

          const phase = PHASES[i];

          // The cross-fade below is the motion — under reduced motion,
          // keep the content in sync with scroll (it's information, not
          // decoration) but swap it instantly instead of animating it.
          if (reduceMotion) {
            if (bigNumberRef.current) {
              bigNumberRef.current.textContent = String(i + 1).padStart(2, "0");
            }
            if (bigTitleRef.current) {
              bigTitleRef.current.textContent = phase.title;
            }
            return;
          }

          if (bigNumberRef.current) {
            gsap.to(bigNumberRef.current, {
              opacity: 0,
              y: -6,
              duration: 0.15,
              onComplete: () => {
                if (!bigNumberRef.current) return;
                bigNumberRef.current.textContent = String(i + 1).padStart(
                  2,
                  "0"
                );
                gsap.fromTo(
                  bigNumberRef.current,
                  { opacity: 0, y: 6 },
                  { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
                );
              },
            });
          }

          if (bigTitleRef.current) {
            gsap.to(bigTitleRef.current, {
              opacity: 0,
              duration: 0.15,
              onComplete: () => {
                if (!bigTitleRef.current) return;
                bigTitleRef.current.textContent = phase.title;
                gsap.to(bigTitleRef.current, { opacity: 1, duration: 0.3 });
              },
            });
          }
        };

        rowRefs.current.forEach((row, i) => {
          if (!row) return;

          // The scroll-synced index panel (setActive, above) is
          // functional, not decorative — keep it under reduced motion.
          // Only the entrance blur/slide is skipped.
          if (!reduceMotion) {
            gsap.fromTo(
              row,
              { y: 24, opacity: 0, filter: "blur(6px)" },
              {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: row,
                  start: "top 90%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          ScrollTrigger.create({
            trigger: row,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => {
              if (self.isActive) setActive(i);
            },
          });
        });
      });

      mm.add("(max-width: 1023px)", () => {
        // Mobile has no functional element to preserve here — the CSS
        // module's own reduced-motion block already sets the rail and
        // nodes to their settled state, so just skip these tweens.
        if (reduceMotion) return;

        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 80%",
              end: "bottom 70%",
              scrub: 0.6,
            },
          }
        );

        rowRefs.current.forEach((el, i) => {
          if (!el) return;

          gsap.fromTo(
            el,
            { y: 20, opacity: 0, filter: "blur(6px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );

          const node = nodeRefs.current[i];
          if (node) {
            gsap.fromTo(
              node,
              { scale: 0.8, backgroundColor: "var(--background)" },
              {
                scale: 1,
                backgroundColor: "var(--accent)",
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 88%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-background mx-auto max-w-7xl px-5 sm:px-6 md:px-12 lg:px-24 py-16 sm:py-24 lg:py-36"
    >
      {/* relative z-10 bg-background ensures it never turns transparent over other layers */}
      <div className="relative z-10 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          How We Work
        </p>
        <h2 className="mt-3 font-display text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-foreground">
          The Process
        </h2>
        <p className="mt-4 sm:mt-5 font-body text-sm sm:text-base text-foreground/70 leading-relaxed">
          Six phases, one continuous line — from the first site visit to the
          last interior detail.
        </p>
      </div>

      <div className="relative mt-12 sm:mt-16 lg:mt-24 lg:grid lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr] lg:gap-16 xl:gap-28">
        <div className="hidden lg:block">
          <div className="lg:sticky lg:top-28 xl:top-32">
            <div className={styles.blueprintPanel}>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                Phase
              </p>
              <div
                ref={bigNumberRef}
                className="mt-4 font-display text-8xl xl:text-9xl font-bold leading-none tracking-tighter text-accent"
              >
                01
              </div>
              <div
                ref={bigTitleRef}
                className="mt-5 font-display text-lg xl:text-xl uppercase tracking-tight text-foreground/80"
              >
                {PHASES[0].title}
              </div>

              <div className="mt-10 flex flex-col gap-2.5">
                {PHASES.map((phase, i) => (
                  <div
                    key={phase.title}
                    ref={(el) => {
                      tickRefs.current[i] = el;
                    }}
                    className={styles.tick}
                    data-active={i === 0 ? "true" : "false"}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div ref={listRef} className="relative pl-8 sm:pl-10 md:pl-14 lg:pl-0">
          <div
            ref={lineRef}
            className={`${styles.datumLine} lg:hidden`}
            aria-hidden="true"
          />

          {PHASES.map((phase, index) => (
            <div
              key={phase.title}
              ref={(el) => {
                rowRefs.current[index] = el;
              }}
              className="relative will-change-transform"
            >
              <div
                ref={(el) => {
                  nodeRefs.current[index] = el;
                }}
                className={`${styles.node} lg:hidden`}
                aria-hidden="true"
              />

              <div
                ref={(el) => {
                  rowContentRefs.current[index] = el;
                }}
                data-active={index === 0 ? "true" : "false"}
                className={`${styles.rowContent} py-7 sm:py-8 lg:py-14 xl:py-16 lg:border-t lg:border-line lg:first:border-t-0`}
              >
                <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted">
                  Phase {String(index + 1).padStart(2, "0")} / 06
                </p>
                <h3 className="mt-2 font-display text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-bold uppercase tracking-tight text-foreground">
                  {phase.title}
                </h3>
                <p className="mt-2.5 sm:mt-3 lg:mt-4 max-w-lg lg:max-w-xl xl:max-w-2xl font-body text-sm sm:text-base lg:text-lg leading-relaxed text-foreground/75">
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}