import { buildContactMailto } from "@/lib/contact";

export default function ContactForm() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-6 border border-line bg-surface px-6 py-10 sm:px-8 sm:py-12">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Get In Touch
          </span>
          <p className="font-display text-2xl sm:text-3xl text-foreground tracking-tight">
            Let&apos;s talk about your project.
          </p>
          <p className="font-body text-sm text-foreground/70 leading-relaxed max-w-md">
            Send us a note with a bit about your project, your timeline, and
            where you&apos;re building — we&apos;ll get back to you shortly.
          </p>
        </div>

        <a
          href={buildContactMailto()}
          className="inline-flex items-center justify-center gap-3 mt-2 px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-background bg-foreground border border-foreground transition-[background-color,color,border-color,transform] duration-500 hover:bg-transparent hover:text-foreground hover:border-accent active:scale-[0.97] active:duration-100 focus-visible:outline focus-visible:outline-accent focus-visible:outline-offset-[3px] w-fit"
        >
          Email the Studio
        </a>
      </div>
    </div>
  );
}