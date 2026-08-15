import Link from "next/link";

export default function CtaProjects() {
  return (
    <section className="flex flex-col items-center gap-4 border-t border-line px-6 py-24 text-center">
      <p className="text-foreground/80">Want to see how this plays out in practice?</p>
      <Link
        href="/projects"
        className="font-display text-2xl italic text-bronze underline decoration-1 underline-offset-4"
      >
        See the work
      </Link>
    </section>
  );
}