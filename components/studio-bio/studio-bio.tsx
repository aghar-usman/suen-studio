"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./studio-bio.module.css";

gsap.registerPlugin(ScrollTrigger);

const METRICS = [
  { value: 9, suffix: "", label: "Years of practice" },
  { value: 50, suffix: "+", label: "Completed projects" },
  { value: 9, suffix: "", label: "Awards & mentions" },
  { value: 4, suffix: "", label: "Published works" },
];

export default function StudioBio() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRefs = useRef<(HTMLElement | null)[]>([]);

  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsLineRef = useRef<HTMLSpanElement>(null);
  const statItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statValueRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Every other section on this site skips its scroll-linked reveal
      // under reduced motion — this one was missing that check entirely.
      // Jump straight to the settled state rather than animating any of it.
      gsap.set(imageContainerRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      });
      gsap.set(imageRef.current, { scale: 1 });
      gsap.set(textRefs.current, { y: 0, opacity: 1, filter: "blur(0px)" });
      gsap.set(metricsLineRef.current, { scaleX: 1 });
      gsap.set(statItemRefs.current, { y: 0, opacity: 1, filter: "blur(0px)" });
      statValueRefs.current.forEach((el, i) => {
        if (el) el.textContent = `${METRICS[i].value}${METRICS[i].suffix}`;
      });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Cinematic wipe reveal for the image container
      gsap.fromTo(
        imageContainerRef.current,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Subtle zoom-out on the image itself
      gsap.fromTo(
        imageRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 3. Editorial Focus Pull Text Reveal
      gsap.fromTo(
        textRefs.current,
        {
          y: 30,
          opacity: 0,
          filter: "blur(12px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 4. Metrics band hairline rule
      gsap.fromTo(
        metricsLineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: metricsRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 5. Stat items reveal
      gsap.fromTo(
        statItemRefs.current,
        { y: 20, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: metricsRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 6. Count-up numerals — replays every time you scroll back into view
      statValueRefs.current.forEach((el, i) => {
        if (!el) return;
        const metric = METRICS[i];
        const counter = { value: 0 };

        gsap.to(counter, {
          value: metric.value,
          duration: 1.6,
          delay: i * 0.12,
          ease: "power2.out",
          invalidateOnRefresh: true,
          scrollTrigger: {
            trigger: metricsRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.value)}${metric.suffix}`;
          },
          onReverseComplete: () => {
            el.textContent = `0${metric.suffix}`;
          },
        });
      });

      // Recalculate ScrollTrigger positions once the portrait image has
      // actually loaded — prevents stale "top 95%" measurements (taken
      // before the image affected layout height) from firing triggers
      // in the wrong place.
      const imgEl = imageRef.current as unknown as HTMLImageElement | null;
      if (imgEl) {
        if (imgEl.complete) {
          ScrollTrigger.refresh();
        } else {
          imgEl.addEventListener("load", () => ScrollTrigger.refresh(), {
            once: true,
          });
        }
      }
    }, sectionRef);

    // Catch late layout shifts from web fonts swapping in
    const onWindowLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onWindowLoad);

    return () => {
      window.removeEventListener("load", onWindowLoad);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col justify-center gap-12 lg:gap-24 px-6 md:px-12 lg:px-24 py-20"
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
        {/* Image Container */}
        <div
          ref={imageContainerRef}
          className={`w-full flex-shrink-0 relative overflow-hidden bg-line aspect-[4/5] max-h-[60vh] lg:max-h-none md:max-w-md lg:max-w-[440px] group ${styles.imageMask}`}
        >
          <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_60px_rgba(10,10,10,0.2)] dark:shadow-[inset_0_0_80px_rgba(10,10,10,0.8)] transition-shadow duration-700" />
          <div className="absolute inset-0 z-10 pointer-events-none bg-accent mix-blend-color opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
          <Image
            ref={imageRef}
            src="/images/Portrait.png"
            alt="Suhail and Farheen"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 440px"
            className="object-cover object-top transition-all duration-700 saturate-[0.55] sepia-[0.20] contrast-[1.1] brightness-[0.95] group-hover:saturate-100 group-hover:sepia-0 group-hover:brightness-100"
          />
        </div>

        {/* Typography Container */}
        <div className="flex w-full flex-col gap-8 lg:gap-10 lg:max-w-2xl">
          <h2
            ref={(el) => {
              textRefs.current[0] = el;
            }}
            className="flex flex-col text-foreground will-change-transform"
          >
            <span className="font-body text-xl sm:text-2xl lg:text-3xl font-light text-muted mb-1 md:mb-2">
              Who shapes
            </span>
            <span
              className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-none"
              aria-label="SU·EN."
            >
              <span aria-hidden="true">SU·EN</span>
              <span className={styles.wordmarkDot} aria-hidden="true" />
            </span>
          </h2>

          <div
            ref={(el) => {
              textRefs.current[1] = el;
            }}
            className="text-foreground/85 leading-relaxed font-body text-sm md:text-base lg:text-lg space-y-5 lg:space-y-6 will-change-transform pl-4 md:pl-6 border-l border-line/50 md:border-line"
          >
            <p>
              Led by Suhail and Farheen, SU·EN Studio is a collaborative
              practice where architecture and interior design are conceived
              as a single, indivisible discipline.
            </p>
            <p>
              We believe space is not merely constructed—it is felt. By
              dissolving the boundary between exterior massing and interior
              tactility, we author every project as a cohesive narrative.
              Designing as one mind allows us to anchor the structural logic
              with intimate details, ensuring the final environment feels
              intentional, grounded, and deeply human.
            </p>
            <p>
              Our portfolio traverses diverse typologies, from expansive
              private villas to intimate commercial interventions like
              boutique espresso bars. Whether shaping the quiet, enduring
              rhythms of a residential sanctuary or the dynamic energy of a
              curated café, we apply the same exacting rigor and spatial
              intentionality to every scale.
            </p>
          </div>

          <p
            ref={(el) => {
              textRefs.current[2] = el;
            }}
            className={`pt-2 font-mono text-[10px] sm:text-xs lg:text-sm uppercase tracking-[0.2em] md:tracking-[0.25em] text-accent will-change-transform pl-4 md:pl-6 ${styles.estLabel}`}
          >
            Est. 2017 &nbsp;·&nbsp; Kerala & Bangalore
          </p>
        </div>
      </div>

      {/* Metrics Band */}
      <div ref={metricsRef} className="relative pt-8 lg:pt-10">
        <span
          ref={metricsLineRef}
          className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-line"
          aria-hidden="true"
        >
          <span className={styles.metricsLineDot} aria-hidden="true" />
        </span>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:grid-cols-4 sm:divide-x sm:divide-line">
          {METRICS.map((metric, index) => (
            <div
              key={metric.label}
              ref={(el) => {
                statItemRefs.current[index] = el;
              }}
              className={`flex flex-col gap-1.5 px-0 will-change-transform sm:px-6 md:px-8 sm:first:pl-0 sm:last:pr-0 ${styles.statItem}`}
            >
              <dd
                ref={(el) => {
                  statValueRefs.current[index] = el;
                }}
                className="order-1 font-mono font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground tabular-nums tracking-tight"
              >
                0{metric.suffix}
              </dd>
              <dt className="order-2 font-mono text-[0.55rem] sm:text-[0.65rem] uppercase tracking-[0.15em] md:tracking-[0.2em] text-foreground/60">
                {metric.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}