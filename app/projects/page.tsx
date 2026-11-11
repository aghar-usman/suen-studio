import type { Metadata } from "next";
import ProjectsArchive from "@/components/projects-archive/projects-archive";
import CtaProjects from "@/components/cta-projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A complete archive of Su.En. Studio's work across residential, commercial, and interior commissions in Kerala and Bangalore.",
};

export default function WorkPage() {
  return (
    <>
      <ProjectsArchive />
      <CtaProjects />
    </>
  );
}