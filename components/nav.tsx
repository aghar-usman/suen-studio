"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ThemeToggle from "./theme-toggle";

const STAGGER = 0.035;

const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
}> = ({ children, className = "", center = false }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={`relative block overflow-hidden ${className}`}
      style={{
        lineHeight: 0.8,
      }}
    >
      <div>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </div>

      <div className="absolute inset-0">
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Smart Scroll Visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Don't hide navbar if sidebar menu is open
      if (isOpen) return;

      // Hide while scrolling down past 50px
      // Show while scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isOpen]);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* =====================================================
          MAIN NAVBAR
          ===================================================== */}

      <nav
        className={`fixed top-0 inset-x-0 z-40 flex items-center justify-between border-b border-line px-6 py-4 bg-background/90 backdrop-blur-md transition-transform duration-300 ease-in-out ${
          isVisible
            ? "translate-y-0"
            : "-translate-y-full"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center"
          aria-label="SU·EN Studio — Home"
        >
          <Image
            src="/images/Logo.png"
            alt="SU·EN Studio"
            width={120}
            height={80}
            priority
            className="
              h-10
              w-auto
              object-contain
              transition-opacity
              duration-300
              group-hover:opacity-70
            "
          />
        </Link>

        {/* Right Controls */}
        <div className="flex items-center gap-5">
          <ThemeToggle />

          <div className="h-4 w-px bg-line" />

          <button
            onClick={() => setIsOpen(true)}
            className="
              font-mono
              text-xs
              uppercase
              tracking-widest
              text-foreground
              hover:text-accent
              transition-colors
              focus:outline-none
            "
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
          >
            Menu
          </button>
        </div>
      </nav>

      {/* =====================================================
          OVERLAY BACKDROP
          ===================================================== */}

      {isOpen && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-background/50
            backdrop-blur-sm
            transition-opacity
          "
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* =====================================================
          SIDEBAR DRAWER
          ===================================================== */}

      <aside
        className={`
          fixed
          top-0
          right-0
          z-50
          h-full
          w-full
          sm:w-96
          bg-background
          border-l
          border-line
          shadow-2xl
          transform
          transition-transform
          duration-500
          ease-[cubic-bezier(0.76,0,0.24,1)]
          flex
          flex-col
          ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
        aria-hidden={!isOpen}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-line">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Navigation
          </span>

          <button
            onClick={() => setIsOpen(false)}
            className="
              p-2
              -mr-2
              text-foreground
              hover:text-accent
              transition-all
              duration-300
              hover:rotate-90
              focus:outline-none
            "
            aria-label="Close menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <line
                x1="18"
                y1="6"
                x2="6"
                y2="18"
              />
              <line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col gap-6 px-8 py-12">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="w-fit"
          >
            <TextRoll className="font-display text-4xl text-foreground hover:text-accent transition-colors duration-300 pb-1">
              Home
            </TextRoll>
          </Link>

          <Link
            href="/projects"
            onClick={() => setIsOpen(false)}
            className="w-fit"
          >
            <TextRoll className="font-display text-4xl text-foreground hover:text-accent transition-colors duration-300 pb-1">
              Projects
            </TextRoll>
          </Link>

          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="w-fit"
          >
            <TextRoll className="font-display text-4xl text-foreground hover:text-accent transition-colors duration-300 pb-1">
              Contact
            </TextRoll>
          </Link>
        </div>

        {/* Sidebar Footer */}
        <div className="mt-auto px-8 py-8 border-t border-line">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Let&apos;s build something together
          </p>
        </div>
      </aside>
    </>
  );
}