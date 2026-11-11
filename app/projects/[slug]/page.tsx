import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/projects-data";
import ProjectGallery from "@/components/project-gallery";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description:
      project.excerpt ||
      `${project.title} — a ${project.category.toLowerCase()} project by Su.En. Studio in ${project.location}.`,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  // Cover image leads the carousel, followed by the rest of the
  // gallery — one continuous swipeable set instead of a separate
  // static hero plus a fixed grid below it.
  const images = [project.img, ...(project.gallery ?? [])];

  return (
    <main className="mx-auto max-w-7xl px-5 sm:px-6 md:px-12 lg:px-24 pt-28 sm:pt-32 lg:pt-40 pb-20 sm:pb-28">
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors duration-300 w-fit"
      >
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        All Projects
      </Link>

      {/* Header */}
      <div className="mt-8 sm:mt-10 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent inline-flex items-center gap-2">
          <span
            className="w-1 h-1 rounded-full bg-[var(--logo-red)] shrink-0"
            aria-hidden="true"
          />
          {project.id} — {project.category}
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tighter text-foreground">
          {project.title}
        </h1>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted">
          {project.location} · {project.year}
        </p>
        {project.excerpt && (
          <p className="mt-6 font-body text-sm sm:text-base text-foreground/70 leading-relaxed">
            {project.excerpt}
          </p>
        )}
      </div>

      {/* Carousel — cover + gallery, any count from 1 to however
          many photos this project has */}
      <div className="mt-12 sm:mt-16">
        <ProjectGallery images={images} alt={project.title} />
      </div>

      {/* Publications */}
      {project.publications && project.publications.length > 0 && (
        <div className="mt-14 sm:mt-16 border-t border-line pt-8 flex flex-col gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Featured In
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {project.publications.map((pub) => (
              <a
                key={pub.url}
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-foreground/80 hover:text-accent transition-colors duration-300 underline underline-offset-4 decoration-line focus-visible:outline focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
              >
                {pub.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Next project */}
      <div className="mt-20 sm:mt-28 border-t border-line pt-10 flex flex-col items-start gap-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Next Project
        </p>
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group inline-flex items-center gap-3 font-display text-2xl sm:text-4xl font-bold uppercase tracking-tighter text-foreground transition-colors duration-300 hover:text-accent"
        >
          {nextProject.title}
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </main>
  );
}