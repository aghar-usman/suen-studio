"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Sync the React component with the raw DOM state (set by the 
    // blocking script in layout.tsx) after the initial server render.
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
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
      aria-label="Toggle theme"
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