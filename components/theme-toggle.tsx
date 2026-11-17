"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const switching = useRef(false);

  useEffect(() => {
    // Sync the React component with the raw DOM state (set by the 
    // blocking script in layout.tsx) after the initial server render.
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = async (event: MouseEvent<HTMLButtonElement>) => {
    if (switching.current) return;
    const root = document.documentElement;
    const nextDark = !root.classList.contains("dark");
    const update = () => {
      flushSync(() => {
        root.classList.toggle("dark", nextDark);
        setIsDark(nextDark);
      });
      try { localStorage.setItem("theme", nextDark ? "dark" : "light"); } catch { /* Theme still works when storage is unavailable. */ }
    };
    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      update();
      return;
    }
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 2;
    root.style.setProperty("--theme-wipe-x", `${x}px`);
    root.style.setProperty("--theme-wipe-y", `${y}px`);
    root.style.setProperty("--theme-wipe-radius", `${radius}px`);
    root.dataset.themeTransition = "active";
    switching.current = true;
    try {
      const transition = document.startViewTransition(update);
      void transition.ready.catch(() => undefined);
      await transition.finished;
    } catch {
      update();
    } finally {
      switching.current = false;
      delete root.dataset.themeTransition;
      root.style.removeProperty("--theme-wipe-x");
      root.style.removeProperty("--theme-wipe-y");
      root.style.removeProperty("--theme-wipe-radius");
    }
  };

  // Prevent hydration mismatch by rendering a blank placeholder of the EXACT 
  // same dimensions on the server. The real icon snaps in on the client.
  if (!mounted) {
    return (
      <button
        type="button"
        tabIndex={-1}
        className="p-2 text-foreground opacity-0 cursor-default"
        aria-hidden="true"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="
        p-2
        text-foreground
        hover:text-accent
        active:scale-90
        transition-all
        duration-150
        outline-none
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-accent
        focus-visible:outline-offset-4
        rounded-sm
      "
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
    >
      {isDark ? (
        // Sun Icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="19.78" y1="19.78" x2="21.21" y2="21.21" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="21.21" />
          <line x1="19.78" y1="4.22" x2="21.21" y2="5.64" />
        </svg>
      ) : (
        // Moon Icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

