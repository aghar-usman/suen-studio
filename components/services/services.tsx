import Image from "next/image";
import Link from "next/link";
import styles from "./design-process.module.css";

const SERVICES = [
  {
    number: "01",
    title: "Architecture",
    description: "Buildings shaped around the site, the climate, and the way you live or work.",
  },
  {
    number: "02",
    title: "Interior design",
    description: "Spatial layouts, material choices, and the details that bring a room together.",
  },
];

export default function Services() {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-heading">
      <div className={styles.wrap}>
        <p className={styles.eyebrow}><span className={styles.dot} aria-hidden="true" />Our focus</p>

        <div className={styles.header}>
          <h2 id="services-heading" className={styles.heading}>
            <span>Architecture &amp;</span>
            <span>interior design<span className={styles.fullStop}>.</span></span>
          </h2>
          <div className={styles.introduction}>
            <p>For homes, cafés, and retail spaces. We start with the place and the people who will use it.</p>
            <Link href="/contact" className={styles.contactLink}>
              <span>Start a project</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>
        </div>

        <div className={styles.services}>
          {SERVICES.map((service) => (
            <article key={service.number} className={styles.service}>
              <span className={styles.number} aria-hidden="true">{service.number}</span>
              <div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.detailImage}>
          <Image
            src="public/images/projects/casa-dhalaan/05.jpg"
            alt="Red and black chairs beside a pale kitchen counter, an interior detail at Casa Dhalaan by SU.EN Studio"
            fill
            sizes="100vw"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
