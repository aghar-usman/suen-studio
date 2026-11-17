"use client";

import { useLayoutEffect, useRef } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./hero.module.css";

const PANELS = [
  { id: "01", word: "Light", detail: "Rooms shaped around daylight." },
  { id: "02", word: "Form", detail: "A building that belongs to its site." },
  { id: "03", word: "Context", detail: "A response to place and climate." },
  { id: "04", word: "Flow", detail: "Space for the rhythms of daily life." },
  { id: "05", word: "Material", detail: "Texture you can see and feel." },
  { id: "06", word: "Space", detail: "Room to gather. Room to pause." },
];

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={down ? styles.downArrow : styles.arrow}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function Hero() {
  const scopeRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const scope = scopeRef.current;
      const intro = introRef.current;
      const content = contentRef.current;
      if (!scope || !stageRef.current || !intro || !content) return;
      const select = gsap.utils.selector(scope);
      const panels = select(`.${styles.slat}`);
      const flips = select(`.${styles.scrollFlip}`);
      const copy = select(`.${styles.revealItem}`);
      let revealed = false;
      const setAccess = (show: boolean) => {
        content.inert = !show;
        intro.inert = show;
        if (show) intro.setAttribute("aria-hidden", "true");
        else intro.removeAttribute("aria-hidden");
      };
      scope.dataset.motion = "ready";
      setAccess(false);
      gsap.set(copy, { autoAlpha: 0, y: 18 });
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          const show = timeline.progress() >= 0.8;
          if (show !== revealed) {
            revealed = show;
            setAccess(show);
          }
        },
      });
      timeline
        .to(flips, { rotateY: 180, duration: 0.9, stagger: 0.065, ease: "power2.inOut" }, 0.08)
        .to(select(`.${styles.topRail}`), { autoAlpha: 0, duration: 0.16 }, 0.06)
        .to(select(`.${styles.introFooter}`), { autoAlpha: 0, duration: 0.2 }, 2.1)
        .to(panels, {
          xPercent: (i) => window.innerWidth < 769 ? (i % 2 ? 104 : -104) : 0,
          yPercent: (i) => window.innerWidth < 769 ? 0 : (i % 2 ? 104 : -104),
          duration: 0.78,
          stagger: { each: 0.045, from: "center" },
          ease: "power3.inOut",
        }, 1.48)
        .set(copy, { autoAlpha: 1 }, 1.78)
        .to(copy, { y: 0, duration: 0.55, stagger: 0.055, ease: "power2.out" }, 1.78)
        .to({}, { duration: 0.25 });
      timelineRef.current = timeline;
      return () => {
        timelineRef.current = null;
        delete scope.dataset.motion;
        content.inert = false;
        intro.inert = false;
        intro.removeAttribute("aria-hidden");
      };
    }, scopeRef);
    return () => media.revert();
  }, []);

  function skipIntro() {
    const timeline = timelineRef.current;
    const trigger = timeline?.scrollTrigger;
    if (!timeline || !trigger) return;
    window.scrollTo({ top: trigger.end, behavior: "instant" });
    trigger.update();
    timeline.progress(1);
    contentRef.current?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });
  }

  function revealOnFocus() {
    if (contentRef.current?.inert) skipIntro();
  }

  return (
    <section ref={scopeRef} className={styles.heroWrap} aria-labelledby="hero-title">
      <div ref={stageRef} className={styles.stage}>
        <div ref={contentRef} className={styles.welcomeScreen} onFocusCapture={revealOnFocus}>
          <div className={styles.contentGrid}>
            <div className={styles.copy}>
              <p className={`${styles.eyebrow} ${styles.revealItem}`}><span className={styles.dot} />SU.EN Studio · Since 2017</p>
              <h1 id="hero-title" className={`${styles.headline} ${styles.revealItem}`}>
                <span className={styles.headlineLine}>Architecture</span>
                <span className={styles.headlineLine}>rooted in</span>
                <span className={styles.headlineLine}>place<span className={styles.fullStop}>.</span></span>
              </h1>
              <p className={`${styles.description} ${styles.revealItem}`}>
                Homes and interiors shaped by the site, the light, and the people who live in them.
              </p>
              <div className={`${styles.actions} ${styles.revealItem}`}>
                <Link href="/projects" className={styles.primary}>See our projects<Arrow /></Link>
                <Link href="/contact" className={styles.secondary}>Start a project<Arrow /></Link>
              </div>
            </div>
            <div className={`${styles.projectImage} ${styles.revealItem}`}>
              <Image src="/images/p1.jpg" alt="SU.EN Studio residence with white volumes, timber screens, and deep shaded verandas among coconut palms" fill preload sizes="(max-width: 768px) 180vw, 52vw" />
            </div>
          </div>
          <div className={`${styles.bottomRail} ${styles.revealItem}`}>
            <span>Kerala &amp; Bangalore</span>
            <span>Architecture &amp; interiors</span>
          </div>
        </div>

        <div ref={introRef} className={styles.intro}>
          <div className={styles.topRail}>
            <span>SU.EN Studio</span><span>Architecture &amp; interiors</span>
          </div>
          <div className={styles.slatsContainer} aria-hidden="true">
            {PANELS.map((panel, index) => (
              <div key={panel.id} className={styles.slat} style={{ "--i": index } as CSSProperties}>
                <div className={styles.scrollFlip}>
                  <div className={`${styles.face} ${styles.front}`}><div className={styles.logoSlice} /></div>
                  <div className={`${styles.face} ${styles.back}`}>
                    <span className={styles.panelNumber}>{panel.id}<span className={styles.dot} /></span>
                    <div className={styles.panelCopy}><span className={styles.panelWord}>{panel.word}</span><span className={styles.panelDetail}>{panel.detail}</span></div>
                    <span className={styles.panelRule} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.introFooter}>
            <span className={styles.scrollGuide}><span className={styles.dot} />Scroll to open<Arrow down /></span>
            <button type="button" onClick={skipIntro} className={styles.skip}>Skip intro<Arrow /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
