"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./studio-bio.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function StudioBio() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

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
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Subtle zoom-out on the image itself for depth
      gsap.fromTo(
        imageRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 3. Focus Pull Text Reveal (Slide + Fade + Blur)
      gsap.fromTo(
        textRefs.current,
        { 
          y: 40, 
          opacity: 0, 
          filter: "blur(8px)" 
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
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-32 lg:flex-row lg:items-center lg:justify-between lg:gap-24"
    >
      {/* Image Container with Masking and Group Hover */}
      <div 
        ref={imageContainerRef}
        className={`aspect-[4/5] w-full flex-shrink-0 relative overflow-hidden bg-line md:max-w-md lg:max-w-[480px] group ${styles.imageMask}`}
      >
        <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_60px_rgba(10,10,10,0.2)] dark:shadow-[inset_0_0_80px_rgba(10,10,10,0.8)] transition-shadow duration-700" />
        <div className="absolute inset-0 z-10 pointer-events-none bg-accent mix-blend-color opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
        <Image
          ref={imageRef}
          src="/images/Portrait.png"
          alt="Suhail K and Farheen H"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 480px"
          className="object-cover transition-all duration-700 saturate-[0.55] sepia-[0.20] contrast-[1.1] brightness-[0.95] group-hover:saturate-100 group-hover:sepia-0 group-hover:brightness-100"
        />
      </div>

      {/* Typography Container */}
      <div className="flex w-full flex-col gap-8 lg:max-w-2xl">
        <h2 
          ref={(el) => { textRefs.current[0] = el; }}
          className="font-display text-5xl lg:text-6xl italic text-foreground tracking-wide will-change-transform"
        >
          Get to know us
        </h2>
        
        <div 
          ref={(el) => { textRefs.current[1] = el; }}
          className="text-foreground/80 leading-relaxed font-body text-base lg:text-lg space-y-6 will-change-transform"
        >
          <p>
            SU·EN Studio is run by Suhail K and Farheen H, a husband-and-wife practice working across architecture and interiors together on every project.
          </p>
          <p>
            We believe that space is not merely built, but felt. By refusing to separate architecture from interior design, we approach every project as a singular, cohesive narrative. Working as one team allows us to shape the structural massing and the intimate tactile details simultaneously, ensuring the finished spaces feel grounded, intentional, and entirely harmonious.
          </p>
        </div>
        
        <p 
          ref={(el) => { textRefs.current[2] = el; }}
          className="pt-4 font-mono text-xs lg:text-sm uppercase tracking-[0.2em] text-accent will-change-transform"
        >
          Founded 2022 · Kerala & Bangalore
        </p>
      </div>
    </section>
  );
}