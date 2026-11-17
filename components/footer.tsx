"use client";

import Link from "next/link";
import Image from "next/image";
import { STUDIO_CONTACT } from "@/lib/contact";
import styles from "./footer.module.css";

function Arrow({ up = false }: { up?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={up ? styles.upArrow : styles.arrow}><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

export default function Footer() {
  function backToTop() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
    document.querySelector<HTMLAnchorElement>('nav a[href="/"]')?.focus({ preventScroll: true });
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.invitation}>
          <div>
            <p className={styles.eyebrow}><span className={styles.dot} aria-hidden="true" />Your next project</p>
            <h2 className={styles.heading}>Start with<br />a conversation<span className={styles.fullStop}>.</span></h2>
          </div>
          <div className={styles.invitationAction}>
            <p>Tell us about your site, your space, or the idea you have in mind.</p>
            <Link href="/contact" className={styles.primary}>Start a project<Arrow /></Link>
          </div>
        </div>

        <div className={styles.directory}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logoLink} aria-label="SU.EN Studio home">
              <Image src="/images/Logo-light.png" alt="" width={80} height={80} className={styles.lightLogo} />
              <Image src="/images/Logo-dark.png" alt="" width={80} height={80} className={styles.darkLogo} />
            </Link>
            <div><p className={styles.brandName}>SU.EN Studio</p><p className={styles.brandDescription}>Architecture &amp; interiors<br />{STUDIO_CONTACT.location}</p></div>
          </div>

          <nav className={styles.linkColumn} aria-label="Footer navigation">
            <h3 className={styles.columnLabel}>Explore</h3>
            <Link href="/" className={styles.textLink}><span>Home</span></Link>
            <Link href="/#studio" className={styles.textLink}><span>The studio</span></Link>
            <Link href="/projects" className={styles.textLink}><span>Projects</span></Link>
            <Link href="/contact" className={styles.textLink}><span>Contact</span></Link>
          </nav>

          <div className={styles.linkColumn}>
            <h3 className={styles.columnLabel}>Get in touch</h3>
            <a href={`mailto:${STUDIO_CONTACT.email}`} className={styles.textLink}><span>{STUDIO_CONTACT.email}</span></a>
            <a href={`tel:${STUDIO_CONTACT.phone.replace(/\s/g, "")}`} className={styles.textLink}><span>{STUDIO_CONTACT.phone}</span></a>
            <a href="https://www.instagram.com/su.en.studio" target="_blank" rel="noopener noreferrer" className={styles.textLink} aria-label="SU.EN Studio on Instagram, opens in a new tab"><span>Instagram</span><Arrow /></a>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p>© {new Date().getFullYear()} SU.EN Studio</p>
          <div className={styles.credit}><span>Site by</span><a href="https://aghar-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="Site by AUKT, opens in a new tab"><span className={styles.creditBadge}><Image src="/images/AUKT.svg" alt="AUKT" width={50} height={16} /></span></a></div>
          <button type="button" onClick={backToTop} className={styles.backToTop}><span>Back to top</span><Arrow up /></button>
        </div>
      </div>
    </footer>
  );
}
