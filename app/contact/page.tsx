import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import { STUDIO_CONTACT } from "@/lib/contact";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Su.En. Studio to discuss your next architecture or interiors commission in Kerala or Bangalore.",
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.eyebrow}><span aria-hidden="true" />Contact the studio</p>
          <h1 className={styles.heading}>Good spaces start<br />with a conversation<span>.</span></h1>
          <p className={styles.intro}>Tell us about the place you have, the life you imagine, and what you’d like to build.</p>
        </header>
        <div className={styles.layout}>
          <ContactForm />
          <aside className={styles.details} aria-label="Studio contact details">
            <div className={styles.detail}><h2>Write to us</h2><a href={`mailto:${STUDIO_CONTACT.email}`}>{STUDIO_CONTACT.email}</a></div>
            <div className={styles.detail}><h2>Give us a call</h2><a href={`tel:${STUDIO_CONTACT.phone.replace(/\s/g, "")}`}>{STUDIO_CONTACT.phone}</a></div>
            <div className={styles.detail}><h2>Find the studio</h2><address>{STUDIO_CONTACT.address}</address></div>
            <div className={styles.studioNote}><span aria-hidden="true" /><p>Architecture &amp; interiors<br />{STUDIO_CONTACT.location}<br />Since {STUDIO_CONTACT.founded}</p></div>
          </aside>
        </div>
      </div>
    </div>
  );
}
