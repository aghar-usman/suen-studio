"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PROJECTS } from "@/lib/projects-data";
import styles from "./projects-archive.module.css";

type Category = "All" | (typeof PROJECTS)[number]["category"];
type Sort = "newest" | "oldest" | "name";
const CATEGORIES: Category[] = ["All", ...Array.from(new Set(PROJECTS.map((project) => project.category)))];

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

export default function ProjectsArchive() {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("newest");
  const reducedMotion = useReducedMotion();
  const visible = useMemo(() => {
    const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    return PROJECTS.filter((project) => {
      const text = `${project.title} ${project.location} ${project.year} ${project.category}`.toLocaleLowerCase();
      return (category === "All" || project.category === category) && words.every((word) => text.includes(word));
    }).sort((a, b) => sort === "name" ? a.title.localeCompare(b.title) : sort === "oldest" ? Number(a.year) - Number(b.year) : Number(b.year) - Number(a.year));
  }, [category, query, sort]);
  const reset = () => { setCategory("All"); setQuery(""); };

  return (
    <section className={styles.archive} aria-labelledby="archive-heading">
      <div className={styles.wrap}>
        <header className={styles.header}>
          <div><p className={styles.eyebrow}><span className={styles.dot} aria-hidden="true" />SU.EN Studio · Work</p><h1 id="archive-heading" className={styles.heading}>Places for life<span className={styles.fullStop}>.</span></h1></div>
          <p className={styles.introduction}>Explore our homes, interiors, and spaces for business. Find a project by name, place, or year.</p>
        </header>

        <div className={styles.toolbar}>
          <div className={styles.filters} role="group" aria-label="Filter projects by category">
            {CATEGORIES.map((item) => <button key={item} type="button" aria-pressed={category === item} aria-controls="archive-results" onClick={() => setCategory(item)}><span>{item}</span><span className={styles.filterCount}>{item === "All" ? PROJECTS.length : PROJECTS.filter((project) => project.category === item).length}</span></button>)}
          </div>
          <div className={styles.searchAndSort}>
            <div className={styles.searchField}>
              <label htmlFor="archive-search">Find a project</label>
              <div className={styles.inputWrap}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="1.5" /><path d="m15 15 5 5" stroke="currentColor" strokeWidth="1.5" /></svg><input id="archive-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, place, or year" autoComplete="off" aria-controls="archive-results" /></div>
            </div>
            <div className={styles.sortField}><label htmlFor="archive-sort">Sort by</label><select id="archive-sort" value={sort} onChange={(event) => setSort(event.target.value as Sort)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="name">Name A–Z</option></select></div>
          </div>
        </div>

        <div className={styles.resultsBar}>
          <p role="status" aria-live="polite" aria-atomic="true">{visible.length} {visible.length === 1 ? "project" : "projects"}{category !== "All" ? ` · ${category}` : ""}{query.trim() ? ` matching “${query.trim()}”` : ""}</p>
          {(category !== "All" || query) && <button type="button" onClick={reset} className={styles.reset}>Clear filters</button>}
        </div>

        <div id="archive-results" className={styles.grid}>
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((project, index) => (
              <motion.article key={project.slug} layout={!reducedMotion} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ layout: { duration: reducedMotion ? 0 : .24, ease: [.2, .8, .2, 1] }, opacity: { duration: reducedMotion ? 0 : .12 } }} className={styles.project}>
                <Link href={`/projects/${project.slug}`} className={styles.projectLink} aria-label={`View ${project.title} project`}>
                  <div className={styles.projectHeader}>
                    <div><p className={styles.meta}>{project.location} · {project.year} · {project.category}</p><h2 className={styles.projectTitle}>{project.title}</h2></div>
                    <span className={styles.projectAction}><span>View project</span><Arrow /></span>
                  </div>
                  <div className={styles.imageFrame}><Image src={project.img} alt={`${project.title}, ${project.category.toLowerCase()} project in ${project.location}`} fill sizes="(max-width: 639px) 100vw, 50vw" loading={index < 2 ? "eager" : "lazy"} className={styles.image} /></div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
        {visible.length === 0 && <div className={styles.empty}><h2>No matching projects<span className={styles.fullStop}>.</span></h2><p>Try another name, place, or year, or return to the complete archive.</p><button type="button" onClick={reset}>Show all projects<Arrow /></button></div>}
      </div>
    </section>
  );
}


