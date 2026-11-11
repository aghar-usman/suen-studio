"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

export default function PageTransitionOverlay() {
  const pathname = usePathname();
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isTransitioningRef = useRef(false);
  const isFirstPathnameRef = useRef(true);

  const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const lockScroll = () => {
    document.documentElement.style.overflow = "hidden";
  };
  const unlockScroll = () => {
    document.documentElement.style.overflow = "";
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (prefersReducedMotion()) return;
      if (e.defaultPrevented) return;
      
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      // Safely cast to Element to support SVG path clicks
      const anchor = (e.target as Element)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      if (
        !containerRef.current ||
        !logoRef.current ||
        !lineRef.current ||
        !labelRef.current
      ) {
        return; 
      }

      e.preventDefault();
      isTransitioningRef.current = true;

      timelineRef.current?.kill();
      lockScroll();

      const tl = gsap.timeline();
      timelineRef.current = tl;

      tl.set(containerRef.current, { pointerEvents: "auto" })
        .set(logoRef.current, {
          opacity: 0,
          scale: 0.92,
          filter: "blur(6px)",
        })
        .set(lineRef.current, { scaleX: 0 })
        .set(labelRef.current, { opacity: 0, y: 8 })
        .to(containerRef.current, {
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
        })
        .to(
          logoRef.current,
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.1"
        )
        .to(
          lineRef.current,
          { scaleX: 1, duration: 0.4, ease: "power3.inOut" },
          "-=0.25"
        )
        .to(
          labelRef.current,
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
          "-=0.2"
        )
        .call(() => {
          // Included url.hash to prevent breaking anchor links
          router.push(url.pathname + url.search + url.hash);
        });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [router]);

  useEffect(() => {
    if (isFirstPathnameRef.current) {
      isFirstPathnameRef.current = false;
      return;
    }

    if (!isTransitioningRef.current) return;

    if (
      !containerRef.current ||
      !logoRef.current ||
      !lineRef.current ||
      !labelRef.current
    ) {
      isTransitioningRef.current = false;
      unlockScroll();
      return;
    }

    timelineRef.current?.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(containerRef.current, { pointerEvents: "none" });
        isTransitioningRef.current = false;
        unlockScroll();
      },
    });
    timelineRef.current = tl;

    tl.to({}, { duration: 0.3 }) 
      .to(labelRef.current, {
        opacity: 0,
        y: -8,
        duration: 0.3,
        ease: "power2.in",
      })
      .to(
        lineRef.current,
        { scaleX: 0, duration: 0.3, ease: "power3.in" },
        "<"
      )
      .to(
        logoRef.current,
        {
          opacity: 0,
          scale: 1.04,
          filter: "blur(6px)",
          duration: 0.45,
          ease: "power3.in",
        },
        "<"
      )
      .to(
        containerRef.current,
        { opacity: 0, duration: 0.4, ease: "power2.in" },
        "-=0.2"
      );
  }, [pathname]);

  useEffect(() => {
    return () => unlockScroll();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background opacity-0 pointer-events-none"
    >
      <div className="flex flex-col items-center gap-5">
        <div ref={logoRef} className="relative w-16 h-16 sm:w-20 sm:h-20">
          <Image
            src="/images/Logo-light.png"
            alt=""
            fill
            sizes="80px"
            className="object-contain block dark:hidden"
            priority
          />
          <Image
            src="/images/Logo-dark.png"
            alt=""
            fill
            sizes="80px"
            className="object-contain hidden dark:block"
            priority
          />
        </div>

        <span ref={lineRef} className="relative w-14 h-px origin-center bg-line">
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--logo-red)]"
            aria-hidden="true"
          />
        </span>

        <p
          ref={labelRef}
          role="status"
          aria-live="polite"
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted inline-flex items-center gap-2"
        >
          <span
            className="w-1 h-1 rounded-full bg-[var(--logo-red)] shrink-0"
            aria-hidden="true"
          />
          Loading
        </p>
      </div>
    </div>
  );
}