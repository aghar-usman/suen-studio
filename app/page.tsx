import Hero from "@/components/hero/hero";
import StudioBio from "@/components/studio-bio/studio-bio";
import CtaProjects from "@/components/cta-projects";
import FeaturedProjects from "@/components/featured-projects/featured-projects";
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <StudioBio />

    </>
  );
}