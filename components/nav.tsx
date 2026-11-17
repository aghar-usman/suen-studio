"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "./theme-toggle";
import { STUDIO_CONTACT } from "@/lib/contact";
import styles from "./nav.module.css";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/#studio", label: "Studio" },
  { href: "/projects", label: "Projects" },
];

function Brand() {
  return <Link href="/" className={styles.brand} aria-label="SU.EN Studio home"><Image src="/images/Logo-light.png" alt="" width={40} height={40} loading="eager" className={styles.lightLogo} /><Image src="/images/Logo-dark.png" alt="" width={40} height={40} loading="eager" className={styles.darkLogo} /><span>SU.EN Studio</span></Link>;
}
function Arrow() { return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" /></svg>; }

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef<string | null>(null);

  function closeMenu() { dialog.current?.close(); }
  function openMenu() {
    if (!dialog.current || dialog.current.open) return;
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current.showModal();
    setOpen(true);
  }
  function afterClose() {
    if (previousOverflow.current !== null) document.body.style.overflow = previousOverflow.current;
    previousOverflow.current = null;
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  }
  useEffect(() => {
    const onHistory = () => dialog.current?.close();
    window.addEventListener("popstate", onHistory);
    return () => {
      window.removeEventListener("popstate", onHistory);
      if (previousOverflow.current !== null) document.body.style.overflow = previousOverflow.current;
    };
  }, []);

  return (
    <>
      <header className={styles.header}>
        <a href="#main-content" className={styles.skip}>Skip to content</a>
        <div className={styles.bar}>
          <Brand />
          <div className={styles.controls}>
            <div className={styles.themeToggle}><ThemeToggle /></div>
            <button ref={trigger} type="button" className={styles.menuButton} onClick={openMenu} aria-expanded={open} aria-controls="site-menu" aria-haspopup="dialog"><span>Menu</span><span className={styles.menuIcon} aria-hidden="true"><i /><i /></span></button>
          </div>
        </div>
      </header>

      <dialog ref={dialog} id="site-menu" className={styles.menu} aria-labelledby="menu-heading" onClose={afterClose} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeMenu();
      }}>
        <div className={styles.menuBar}><p id="menu-heading"><span className={styles.dot} aria-hidden="true" />Navigation</p><button type="button" autoFocus onClick={closeMenu} className={styles.closeButton} aria-label="Close navigation menu"><span>Close</span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="1.5" /></svg></button></div>
        <nav className={styles.mobileLinks} aria-label="Site navigation">
          {[...LINKS, { href: "/contact", label: "Contact" }].map(({href,label}, index) => <Link key={href} href={href} onClick={closeMenu} aria-current={href === pathname ? "page" : undefined}><span className={styles.index}>{String(index+1).padStart(2,"0")}</span><span className={styles.mobileLabel}>{label}</span><Arrow /></Link>)}
        </nav>
        <div className={styles.menuFooter}><p>Architecture &amp; interiors<br /><span>{STUDIO_CONTACT.location}</span></p><a href={`mailto:${STUDIO_CONTACT.email}`}>{STUDIO_CONTACT.email}<Arrow /></a></div>
      </dialog>
    </>
  );
}

