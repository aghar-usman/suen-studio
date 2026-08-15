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
  const wrapRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const slatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollFlipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const welcomeElementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!wrapRef.current || !heroRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // No pin, no flip sequence, no infinite-looping scroll cue — just
      // show the real heading/CTA in their final state right away. The
      // CSS fallback (.heroWrap[data-motion="reduced"]) hides the slats
      // and scroll guide and drops the wrapper back to a normal 100vh.
      wrapRef.current.setAttribute("data-motion", "reduced");
      gsap.set(welcomeElementsRef.current, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Setup Initial States
      gsap.set(scrollFlipRefs.current, { rotateY: 0, z: 0, transformOrigin: "50% 50%" });
      gsap.set(welcomeElementsRef.current, {
        opacity: 0,
        y: 30,
        scale: (index) => (index === 0 ? 0.96 : 1),
      });

      // 2. Main Scroll Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "+=350%", // Extended end point for the reading pause
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            // Lock out CSS hovers and fade out scroll guide when scroll starts
            if (self.progress > 0) {
              wrapRef.current?.classList.add(styles.isScrolling);
            } else {
              // Restore CSS hovers and scroll guide when at the top
              wrapRef.current?.classList.remove(styles.isScrolling);
            }
          },
        },
      });

      // PHASE 1: Scroll Flip Sequence
      tl.to(scrollFlipRefs.current, {
        rotateY: 180,
        z: 0,
        stagger: 0.08,
        ease: "power2.inOut",
        duration: 1.5,
      });

      // PHASE 2: The Pause
      tl.add("open", "+=1.5");

      // PHASE 3: Parting the Panels
      slatRefs.current.forEach((slat, index) => {
        if (!slat) return;
        const isEven = index % 2 === 0;

        tl.to(
          slat,
          {
            yPercent: isEven ? -108 : 108,
            rotationZ: isEven ? -1.2 : 1.2,
            opacity: 0,
            ease: "power3.inOut",
            duration: 1.5,
          },
          "open"
        );
      });

      // PHASE 4: Welcome Screen Reveal
      tl.to(
        welcomeElementsRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          ease: "power3.out",
          duration: 1.5,
        },
        "open+=0.5"
      );
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className={styles.heroWrap}>
      <div ref={heroRef} className={styles.hero}>
        
        {/* =====================================================
            BACKGROUND EDITORIAL SCREEN
            ===================================================== */}
        <div className={styles.welcomeScreen}>
          <Image
            ref={(el) => { welcomeElementsRef.current[0] = el; }}
            className={styles.wMark}
            src="/images/Logo.png"
            alt="SU·EN Studio"
            width={180}
            height={120}
            priority
          />
          <div ref={(el) => { welcomeElementsRef.current[1] = el; }} className={styles.est}>
            Est. 2022
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
        <div className={styles.scrollGuide} aria-hidden="true">
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
  );
}