import { buildContactMailto } from "@/lib/contact";
import styles from "./contact-enquiry.module.css";

export default function CtaProjects() {
  return (
    <section className={styles.archiveCta} aria-labelledby="project-invitation">
      <div className={styles.ctaInner}>
        <div>
          <p className={styles.label}>Your project, next</p>
          <h2 id="project-invitation" className={styles.ctaHeading}>What could your place become<span className={styles.red}>?</span></h2>
        </div>
        <div className={styles.ctaAction}>
          <p>Every project starts with a place and a conversation. Tell us about yours.</p>
          <a href={buildContactMailto()} className={styles.primary}>Discuss a project <span aria-hidden="true" className={styles.arrow}>↗</span></a>
          <p className={styles.note}>Opens a prefilled email draft</p>
        </div>
      </div>
    </section>
  );
}
