"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type ProjectGalleryProps = {
  images: string[];
  alt: string;
};

export default function ProjectGallery({ images, alt }: ProjectGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Tracks which images have finished downloading, so each slide can
  // show its own skeleton until its actual bytes arrive — this is the
  // real "buffering" fix, separate from Next.js route-level loading.tsx.
  const [loaded, setLoaded] = useState<boolean[]>(() =>
    images.map(() => false)
  );

  const markLoaded = (index: number) => {
    setLoaded((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  // Distance between the start of one slide and the start of the next.
  // Measured live (rather than assumed to equal container width) since
  // slides are 85% width with a gap on mobile, but full width with no
  // gap from sm: up — the step size differs at each breakpoint.
  const getStep = () => {
    const track = trackRef.current;
    if (!track || track.children.length < 2) return track?.clientWidth ?? 0;
    const first = track.children[0] as HTMLElement;
    const second = track.children[1] as HTMLElement;
    return second.offsetLeft - first.offsetLeft;
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const step = getStep();
      if (step === 0) return;
      setActiveIndex(Math.round(track.scrollLeft / step));
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const step = getStep();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    track.scrollTo({
      left: step * index,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  if (images.length === 0) return null;

  // A single image needs no carousel chrome at all.
  if (images.length === 1) {
    return (
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-surface">
        {!loaded[0] && (
          <div className="absolute inset-0 animate-pulse bg-line/40" aria-hidden="true" />
        )}
        <Image
          src={images[0]}
          alt={alt}
          fill
          sizes="100vw"
          className={`object-contain transition-opacity duration-500 ${
            loaded[0] ? "opacity-100" : "opacity-0"
          }`}
          priority
          onLoad={() => markLoaded(0)}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-3 sm:gap-0 overflow-x-auto snap-x snap-mandatory scroll-smooth pr-[8%] sm:pr-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((src, i) => (
            <div
              key={src}
              className="relative w-[85%] sm:w-full flex-shrink-0 snap-start aspect-[16/9] overflow-hidden bg-surface"
            >
              {!loaded[i] && (
                <div
                  className="absolute inset-0 animate-pulse bg-line/40"
                  aria-hidden="true"
                />
              )}
              <Image
                src={src}
                alt={`${alt} — image ${i + 1} of ${images.length}`}
                fill
                sizes="(max-width: 640px) 85vw, 100vw"
                className={`object-contain transition-opacity duration-500 ${
                  loaded[i] ? "opacity-100" : "opacity-0"
                }`}
                priority={i === 0}
                onLoad={() => markLoaded(i)}
              />
            </div>
          ))}
        </div>

        {/* Position counter — "02 / 06" — reinforces the dots below
            with the same small mono-label treatment used for panel
            indices and category tags elsewhere on the site. */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 px-2.5 py-1 bg-background/85 border border-line font-mono text-[10px] uppercase tracking-widest text-foreground">
          {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </div>

        {/* Arrow buttons — desktop/mouse only. Touch devices already
            get swipe from the native scroll-snap track above, so
            showing arrows there too would be redundant chrome. */}
        <button
          type="button"
          onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
          disabled={activeIndex === 0}
          aria-label="Previous image"
          className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 items-center justify-center w-11 h-11 bg-background/85 border border-line text-foreground transition-all duration-300 hover:border-accent hover:text-accent disabled:opacity-0 disabled:pointer-events-none active:scale-90 active:duration-100 focus-visible:outline focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() =>
            scrollToIndex(Math.min(activeIndex + 1, images.length - 1))
          }
          disabled={activeIndex === images.length - 1}
          aria-label="Next image"
          className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 items-center justify-center w-11 h-11 bg-background/85 border border-line text-foreground transition-all duration-300 hover:border-accent hover:text-accent disabled:opacity-0 disabled:pointer-events-none active:scale-90 active:duration-100 focus-visible:outline focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Dot indicators — also directly clickable/keyboard-focusable
          jump targets, not just a passive progress readout. */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to image ${i + 1}`}
            aria-current={i === activeIndex}
            className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-accent focus-visible:outline-offset-2 ${
              i === activeIndex
                ? "w-6 bg-accent"
                : "w-1.5 bg-line hover:bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}