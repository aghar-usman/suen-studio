import Hero from "@/components/hero/hero";
import StudioBio from "@/components/studio-bio/studio-bio";
import FeaturedProjects from "@/components/featured-projects/featured-projects";
import Services from "@/components/services/services";

export default function Home() {
  return (
    <>
      <Hero />
      <StudioBio />
      <Services />
      <FeaturedProjects />
    </>
  );
}