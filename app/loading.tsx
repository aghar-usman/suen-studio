// Root-level Suspense fallback — Next.js shows this automatically
// during any top-level page navigation while the new route's server
// content is still loading. This is the backstop for genuine
// server-side delay; PageTransitionOverlay (a client component
// mounted in layout.tsx) handles the primary, fully-choreographed
// enter/exit sequence on every client-side navigation.
//
// No JS animation library here on purpose — this can fire during
// server rendering before hydration completes, so it leans on plain
// CSS (Tailwind's built-in pulse) rather than anything GSAP-driven.

import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-[60dvh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-5 animate-pulse">
        <div className="relative w-16 h-16">
          <Image
            src="/images/Logo-light.png"
            alt=""
            fill
            className="object-contain block dark:hidden"
          />
          <Image
            src="/images/Logo-dark.png"
            alt=""
            fill
            className="object-contain hidden dark:block"
          />
        </div>

        <span className="relative w-14 h-px bg-line">
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--logo-red)]"
            aria-hidden="true"
          />
        </span>

        <p
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