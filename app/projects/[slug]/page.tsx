import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/projects-data";
import ProjectGallery from "@/components/project-gallery";
import { buildContactMailto } from "@/lib/contact";
import styles from "./project.module.css";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return PROJECTS.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find(p => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return { title: project.title, description: project.excerpt || `${project.title} — a ${project.category.toLowerCase()} project by Su.En. Studio in ${project.location}.` };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find(p => p.slug === slug);
  if (!project) notFound();
  const index = PROJECTS.findIndex(p => p.slug === slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const images = Array.from(new Set([project.img, ...(project.gallery ?? [])]));
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <Link href="/projects" className={styles.back}><span aria-hidden="true">←</span> All projects</Link>
        <header className={styles.header}>
          <div><p className={styles.eyebrow}><span aria-hidden="true" />{project.id} / {project.category}</p><h1 className={styles.title}>{project.title}<span>.</span></h1></div>
          <dl className={styles.facts}><div><dt>Location</dt><dd>{project.location}</dd></div><div><dt>Year</dt><dd>{project.year}</dd></div><div><dt>Project type</dt><dd>{project.category}</dd></div></dl>
        </header>
        {project.excerpt && <p className={styles.excerpt}>{project.excerpt}</p>}
        <div className={styles.galleryHeading}><h2>A closer look</h2><span>{String(images.length).padStart(2,"0")} photographs</span></div>
        <ProjectGallery images={images} alt={project.title} />
        {!!project.publications?.length && <section className={styles.publications} aria-label="Project publications"><h2>Featured in</h2>{project.publications.map(pub => <a key={pub.url} href={pub.url} target="_blank" rel="noopener noreferrer">{pub.name}<span aria-hidden="true"> ↗</span></a>)}</section>}
        <div className={styles.enquiry}><p>Have a place in mind?</p><a href={buildContactMailto()}>Discuss your project <span aria-hidden="true">↗</span></a></div>
        <section className={styles.next} aria-labelledby="next-project-heading">
          <Link href={`/projects/${next.slug}`} className={styles.nextLink}>
            <div className={styles.nextText}><p className={styles.eyebrow}>Next project</p><h2 id="next-project-heading">{next.title}<span aria-hidden="true">↗</span></h2><p className={styles.nextMeta}>{next.location} · {next.year} · {next.category}</p></div>
            <div className={styles.nextImage}><Image src={next.img} alt={next.title} fill sizes="(max-width:767px) 90vw, 35vw" /></div>
          </Link>
        </section>
        <Link href="/projects" className={styles.back}>Explore the complete archive <span aria-hidden="true">→</span></Link>
      </div>
    </div>
  );
}

