import { buildContactMailto } from "@/lib/contact";
import styles from "./contact-enquiry.module.css";

export default function ContactForm() {
  return (
    <section className={styles.panel} aria-labelledby="enquiry-heading">
      <p className={styles.label}>A place to begin</p>
      <h2 id="enquiry-heading" className={styles.panelHeading}>Tell us what you have in mind<span className={styles.red}>.</span></h2>
      <p className={styles.description}>A new home, a space for your business, or a different way to live in the space you have. We’d like to hear about it.</p>
      <div className={styles.brief}>
        <p className={styles.label}>A few details help us start</p>
        <ul className={styles.list}>
          <li><span>01</span>Where you’re planning to build</li>
          <li><span>02</span>What you’d like the space to do</li>
          <li><span>03</span>Your approximate timeline</li>
        </ul>
      </div>
      <a href={buildContactMailto()} className={styles.primary}>Email the studio <span aria-hidden="true" className={styles.arrow}>↗</span></a>
      <p className={styles.note}>Opens your email app with a short project brief. Share what you know; the rest can be a conversation.</p>
    </section>
  );
}
