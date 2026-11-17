import Image from "next/image";
import Link from "next/link";
import styles from "./studio-bio.module.css";

const FACTS = [
  { value: "2017", label: "Established" },
  { value: "50+", label: "Completed projects" },
  { value: "9", label: "Awards & mentions" },
  { value: "4", label: "Published works" },
];

export default function StudioBio() {
  return (
    <section id="studio" className={styles.section} aria-labelledby="studio-heading">
      <div className={styles.wrap}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}><span className={styles.dot} aria-hidden="true" />The studio</p>
          <span className={styles.location}>Kerala &amp; Bangalore</span>
        </div>

        <div className={styles.mainGrid}>
          <div className={styles.copy}>
            <h2 id="studio-heading" className={styles.heading}>
              <span>Two minds.</span>
              <span>One practice<span className={styles.fullStop}>.</span></span>
            </h2>
            <div className={styles.biography}>
              <p className={styles.lead}>
                A husband-and-wife team, Suhail and Farheen bring architecture and interiors together at SU.EN Studio.
              </p>
              <p className={styles.body}>
                From private homes to cafés, we consider the building and its interior as one, from its place on the site to the details you touch every day.
              </p>
            </div>
            <Link href="/contact" className={styles.contactLink}>
              <span>Start a project</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>

          <div className={styles.portrait}>
            <Image
              src="/images/studio-portrait.png"
              alt="Suhail and Farheen, the husband-and-wife team behind SU.EN Studio"
              fill
              sizes="(max-width: 639px) 130vw, (max-width: 1023px) 100vw, 52vw"
              className={styles.portraitImage}
            />
          </div>
        </div>

        <dl className={styles.facts}>
          {FACTS.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt className={styles.factLabel}>{fact.label}</dt>
              <dd className={styles.factValue}>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
