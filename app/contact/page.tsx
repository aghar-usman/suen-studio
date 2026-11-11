import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import { STUDIO_CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Su.En. Studio to discuss your next architecture or interiors commission in Kerala or Bangalore.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 sm:px-6 md:px-12 lg:px-24 pt-28 sm:pt-32 lg:pt-40 pb-20 sm:pb-28">
      {/* Header */}
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          Get in Touch
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tighter text-foreground">
          Let&apos;s Talk
        </h1>
        <p className="mt-4 sm:mt-5 font-body text-sm sm:text-base text-foreground/70 leading-relaxed">
          Tell us about your site, your timeline, and what you&apos;re hoping
          to build. We reply to every inquiry within two working days.
        </p>
      </div>

      {/* Form + Details */}
      <div className="mt-12 sm:mt-16 lg:grid lg:grid-cols-[1fr_380px] lg:gap-16 xl:gap-24">
        <ContactForm />

        <aside className="mt-16 lg:mt-0 flex flex-col gap-10 border-t border-line pt-10 lg:border-t-0 lg:pt-0">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
              Studio
            </p>
            <p className="font-body text-sm text-foreground/80 leading-relaxed">
              {STUDIO_CONTACT.address}
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
              Email
            </p>
            <a
              href={`mailto:${STUDIO_CONTACT.email}`}
              className="font-body text-sm text-foreground/80 hover:text-accent transition-colors rounded-sm focus-visible:outline focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              {STUDIO_CONTACT.email}
            </a>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
              Phone
            </p>
            <a
              href={`tel:${STUDIO_CONTACT.phone.replace(/\s/g, "")}`}
              className="font-body text-sm text-foreground/80 hover:text-accent transition-colors rounded-sm focus-visible:outline focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              {STUDIO_CONTACT.phone}
            </a>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
              Response Time
            </p>
            <p className="font-body text-sm text-foreground/80 leading-relaxed">
              1 to 2 working days
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
              Est.
            </p>
            <p className="font-body text-sm text-foreground/80 leading-relaxed">
              {STUDIO_CONTACT.founded}
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}