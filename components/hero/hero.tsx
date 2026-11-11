"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./hero.module.css";

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  { id: "01", word: "Light", cap: "orientation, apertures, the hour a room is built for" },
  { id: "02", word: "Form", cap: "massing resolved from the plot, not applied to it" },
  { id: "03", word: "Context", cap: "native materials, local climate, cultural memory" },
  { id: "04", word: "Flow", cap: "the invisible lines that connect daily rituals" },
  { id: "05", word: "Tactility", cap: "stone, timber, metal that ages with grace" },
  { id: "06", word: "Void", cap: "the negative space that gives architecture room to breathe" },
];

export default function Hero() {
  // Outer wrapper — protects React's DOM tree from GSAP's pin-spacer.
  const scopeRef = useRef<HTMLDivElement>(null);

  const wrapRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const slatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollFlipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const welcomeElementsRef = useRef<(HTMLElement | null)[]>([]);
  const scrollGuideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current || !heroRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      wrapRef.current.setAttribute("data-motion", "reduced");
      gsap.set(welcomeElementsRef.current, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    let scrollLockTimeout: ReturnType<typeof setTimeout> | null = null;
    const SCROLL_IDLE_MS = 150;

    ScrollTrigger.normalizeScroll({ type: "touch" });

    const ctx = gsap.context(() => {
      gsap.set(scrollFlipRefs.current, {
        rotateY: 0,
        z: 0,
        transformOrigin: "50% 50%",
        force3D: true,
      });
      gsap.set(welcomeElementsRef.current, {
        opacity: 0,
        y: 30,
        scale: (index) => (index === 0 ? 0.96 : 1),
        force3D: true,
      });
      gsap.set(scrollGuideRef.current, { opacity: 1 });

      const tl = gsap.timeline({
        defaults: { force3D: true },
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "+=400%",
          // 0.9 trails scroll position by nearly a second — tightened
          // toward direct 1:1 tracking. Raise it back up if this now
          // feels too twitchy on trackpads/fast wheel scrolling.
          scrub: 0.5,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: () => {
            wrapRef.current?.classList.add(styles.isScrolling);

            if (scrollLockTimeout) clearTimeout(scrollLockTimeout);
            scrollLockTimeout = setTimeout(() => {
              wrapRef.current?.classList.remove(styles.isScrolling);
              scrollLockTimeout = null;
            }, SCROLL_IDLE_MS);
          },
        },
      });

      tl.to(scrollFlipRefs.current, {
        rotateY: 180,
        z: 0,
        stagger: 0.1,
        ease: "power3.inOut",
        duration: 2.2,
      });

      tl.add("open", "+=1.8");

      tl.to(
        scrollGuideRef.current,
        {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        "open"
      );

      slatRefs.current.forEach((slat, index) => {
        if (!slat) return;
        const isEven = index % 2 === 0;

        tl.to(
          slat,
          {
            // Dynamic animation check: slide left/right on mobile, up/down on desktop
            xPercent: () => (window.innerWidth <= 768 ? (isEven ? -108 : 108) : 0),
            yPercent: () => (window.innerWidth > 768 ? (isEven ? -108 : 108) : 0),
            rotationZ: isEven ? -1.2 : 1.2,
            opacity: 0,
            ease: "power4.inOut",
            duration: 2,
          },
          "open"
        );
      });

      tl.to(
        welcomeElementsRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          ease: "power2.out",
          duration: 1.8,
        },
        "open+=0.6"
      );
    }, wrapRef);

    return () => {
      if (scrollLockTimeout) clearTimeout(scrollLockTimeout);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={scopeRef}>
      <div ref={wrapRef} className={styles.heroWrap}>
        <div ref={heroRef} className={styles.hero}>
          {/* =====================================================
              BACKGROUND EDITORIAL SCREEN
              ===================================================== */}
          <div className={styles.welcomeScreen}>
            {/* Wrapper carries the GSAP ref — both logo variants live
                inside it, only one visible at a time via plain CSS
                Module dark-mode selectors, so the wrapper's box just
                adopts whichever is showing. */}
            <div ref={(el) => { welcomeElementsRef.current[0] = el; }}>
              <Image
                className={`${styles.wMark} ${styles.wMarkLight}`}
                src="/images/Logo-light.png"
                alt="SU·EN Studio"
                width={400}
                height={400}
                priority
              />
              <Image
                className={`${styles.wMark} ${styles.wMarkDark}`}
                src="/images/Logo-dark.png"
                alt="SU·EN Studio"
                width={400}
                height={400}
                priority
              />
            </div>
            <div ref={(el) => { welcomeElementsRef.current[1] = el; }} className={styles.est}>
              Est. 2017
            </div>
            <h1 ref={(el) => { welcomeElementsRef.current[2] = el; }} className={styles.punchline}>
              Spaces shaped by context.
              <br />
              <em>Designed for life.</em>
            </h1>
            <div ref={(el) => { welcomeElementsRef.current[3] = el; }} className={styles.sub}>
              Architecture — Interiors — Kerala &amp; Bangalore
            </div>
            <div ref={(el) => { welcomeElementsRef.current[4] = el; }}>
              <Link href="/contact" className={styles.ctaButton}>
                Let&apos;s build something together
              </Link>
            </div>
          </div>

          {/* =====================================================
              FOREGROUND INTERACTIVE PANELS
              ===================================================== */}
          <div className={styles.slatsContainer} aria-hidden="true">
            {PANELS.map((panel, index) => (
              <div
                key={panel.id}
                ref={(el) => { slatRefs.current[index] = el; }}
                className={styles.slat}
                style={{ "--i": index } as React.CSSProperties}
              >
                {/* 1. OUTER WRAPPER: GSAP Scroll Flip Control */}
                <div
                  ref={(el) => { scrollFlipRefs.current[index] = el; }}
                  className={styles.scrollFlip}
                >
                  {/* 2. INNER WRAPPER: Pure CSS Hover Control */}
                  <div className={styles.hoverFlip}>
                    {/* FRONT */}
                    <div className={`${styles.slatFace} ${styles.slatFront}`}>
                      <div className={styles.frontImg} />
                      <div className={styles.slatFrontOverlay} />
                      <span className={styles.idx}>{panel.id} — SITE</span>
                    </div>

                    {/* BACK */}
                    <div className={`${styles.slatFace} ${styles.slatBack}`}>
                      <div className={styles.backLayer}>
                        <span className={styles.num}>{panel.id}</span>
                        <span className={styles.word}>{panel.word}</span>
                        <span className={styles.cap}>{panel.cap}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* =====================================================
              SCROLL GUIDE
              ===================================================== */}
          <div ref={scrollGuideRef} className={styles.scrollGuide} aria-hidden="true">
            <span className={styles.scrollDot} />
            <span className={styles.scrollText}>Scroll</span>
            <svg
              className={styles.scrollArrow}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2.5v9M4.5 8 8 11.5 11.5 8"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}