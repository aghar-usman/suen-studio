import Image from "next/image";
import Link from "next/link";
import { PROJECTS, type Project } from "@/lib/projects-data";
import styles from "./featured-projects.module.css";

function selectProject(slug: string): Project {
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) throw new Error(`Featured project not found: ${slug}`);
  return project;
}

const LEAD = selectProject("caper-residence");
const SELECTED = [
  {
    project: selectProject("gokulam-residence"),
    image: "/images/projects/gokulam-residence/03.jpg",
    alt: "A suspended timber swing, open dining area, and white staircase at Gokulam Residence",
    position: "50% 50%",
  },
  {
    project: selectProject("planet-cafe"),
    image: "/images/projects/planet-cafe/02.jpg",
    alt: "The curved tiled counter and warm plaster interior of Planet Cafe",
    position: "100% 50%",
  },
];

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

function ProjectHeader({ project }: { project: Project }) {
  return (
    <div className={styles.projectHeader}>
      <div className={styles.projectIdentity}>
        <p className={styles.projectMeta}>{project.location}<span aria-hidden="true"> · </span>{project.year}<span aria-hidden="true"> · </span>{project.category}</p>
        <h3 className={styles.projectTitle}><span>{project.title}</span></h3>
      </div>
      <span className={styles.viewProject}><span>View project</span><Arrow /></span>
    </div>
  );
}

export default function FeaturedProjects() {
  return (
    <section id="featured-projects" className={styles.section} aria-labelledby="featured-heading">
      <div className={styles.leadScreen}>
        <div className={styles.wrap}>
          <header className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}><span className={styles.dot} aria-hidden="true" />Featured projects</p>
              <h2 id="featured-heading" className={styles.heading}>Selected work<span className={styles.fullStop}>.</span></h2>
            </div>
            <Link href="/projects" className={styles.archiveLink}><span>See all projects</span><Arrow /></Link>
          </header>

          <Link href={`/projects/${LEAD.slug}`} className={`${styles.project} ${styles.leadProject}`} aria-label={`View ${LEAD.title} project`}>
            <ProjectHeader project={LEAD} />
            <div className={styles.leadMedia}>
              <div className={styles.imageFrame}>
                <Image src={LEAD.img} alt="Brick screens, white volumes, and a planted entrance at Caper Residence" fill sizes="(max-width: 639px) 100vw, 58vw" className={styles.exteriorImage} />
              </div>
              <div className={styles.imageFrame}>
                <Image src="/images/projects/caper-residence/04.jpg" alt="An open staircase and dining space beside the exposed brick wall inside Caper Residence" fill sizes="(max-width: 639px) 100vw, 40vw" className={styles.interiorImage} />
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className={styles.supportingScreen}>
        <div className={styles.wrap}>
          <div className={styles.projectGrid}>
            {SELECTED.map(({ project, image, alt, position }) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className={styles.project} aria-label={`View ${project.title} project`}>
                <ProjectHeader project={project} />
                <div className={`${styles.imageFrame} ${styles.supportingImage}`}>
                  <Image src={image} alt={alt} style={{ objectPosition: position }} fill sizes="(max-width: 639px) 100vw, 50vw" />
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.archiveRow}>
            <p>More homes, interiors, and spaces for business.</p>
            <Link href="/projects" className={styles.archiveLink}><span>See all projects</span><Arrow /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
