"use client";

import { useState, useSyncExternalStore } from "react";
import styles from "./loading-animation.module.css";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  motion.addEventListener("change", onChange);
  return () => { observer.disconnect(); motion.removeEventListener("change", onChange); };
}
function getSnapshot() {
  const theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
  return `${theme}:${window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "reduced" : "full"}`;
}
function getServerSnapshot() { return "pending"; }

function VideoAnimation({ src }: { src: string }) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return <video className={`${styles.video} ${ready ? styles.ready : ""}`} src={src} autoPlay muted loop playsInline preload="auto" disablePictureInPicture aria-hidden="true" tabIndex={-1} onPlaying={() => setReady(true)} onError={() => setFailed(true)} />;
}

export default function LoadingAnimation({ fullScreen = false, label = "Loading page" }: { fullScreen?: boolean; label?: string }) {
  const preference = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const canAnimate = preference.endsWith(":full");
  const src = preference.startsWith("dark:") ? "/images/loading-dark.mp4" : "/images/loading-light.mp4";
  return (
    <div className={styles.root} data-fullscreen={fullScreen} role="status" aria-live="polite" aria-atomic="true">
      <div className={styles.frame} aria-hidden="true">
        <div className={styles.poster}>
          {/* These small static fallbacks deliberately bypass image optimization. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/Logo-light.png" alt="" width={120} height={120} className={styles.lightLogo} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/Logo-dark.png" alt="" width={120} height={120} className={styles.darkLogo} />
        </div>
        {canAnimate && <VideoAnimation key={src} src={src} />}
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
