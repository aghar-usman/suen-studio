// Real project data for Su.En. Studio.
// Images live in public/images/projects/<slug>/ — cover.jpg for the
// listing/featured thumbnail (used as `img`), then 01.jpg, 02.jpg...
// for the gallery shown on each project's own detail page.

export type Publication = {
  name: string;
  url: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: "Residential" | "Commercial" | "Interiors";
  location: string;
  year: string;
  img: string;
  gallery?: string[];
  excerpt: string;
  featured?: boolean;
  publications?: Publication[];
};

export const CATEGORIES = ["All", "Residential", "Commercial", "Interiors"] as const;

const projectImage = (slug: string, file: string) =>
  `/images/projects/${slug}/${file}`;

export const PROJECTS: Project[] = [
  {
    id: "01",
    slug: "planet-cafe",
    title: "Planet Cafe",
    category: "Commercial",
    location: "Perinthalmanna",
    year: "2026",
    img: projectImage("planet-cafe", "cover.jpg"),
    gallery: [
      projectImage("planet-cafe", "01.jpg"),
      projectImage("planet-cafe", "02.jpg"),
      
    ],
    excerpt: "", // TODO: add a short project description
    // featured: true, // uncomment if this should appear in the homepage FeaturedProjects scroll
  },
  {
    id: "02",
    slug: "cnc-footwear",
    title: "CnC Footwear",
    category: "Commercial",
    location: "Perinthalmanna",
    year: "2026",
    img: projectImage("cnc-footwear", "cover.jpg"),
    gallery: [
      projectImage("cnc-footwear", "01.jpg"),
      projectImage("cnc-footwear", "02.jpg"),
      projectImage("cnc-footwear", "03.jpg"),
    ],
    excerpt: "", // TODO: add a short project description
  },
  {
    id: "03",
    slug: "arun-residence",
    title: "Arun Residence",
    category: "Residential",
    location: "Perinthalmanna",
    year: "2026",
    img: projectImage("arun-residence", "cover.jpg"),
    gallery: [
      projectImage("arun-residence", "01.jpg"),
      projectImage("arun-residence", "02.jpg"),
      projectImage("arun-residence", "03.jpg"),
      projectImage("arun-residence", "04.jpg"),
      projectImage("arun-residence", "05.jpg"),
      
    ],
    excerpt: "", // TODO: add a short project description
  },
  {
    id: "04",
    slug: "caper-residence",
    title: "Caper Residence",
    category: "Residential",
    location: "Palakkad",
    year: "2022",
    img: projectImage("caper-residence", "cover.jpg"),
    gallery: [
      projectImage("caper-residence", "01.jpg"),
      projectImage("caper-residence", "02.jpg"),
      projectImage("caper-residence", "03.jpg"),
    ],
    excerpt:
      "Native stone and timber carry the load-bearing logic of the house, aging into the site rather than sitting on top of it.",
    featured: true,
    publications: [
      {
        name: "Volume Zero",
        url: "https://volzero.com/articles/view/caper-residence-by-suen-studio",
      },
      {
        name: "ArchDaily",
        url: "https://www.archdaily.com/980003/caper-residence-sn-studio",
      },
    ],
  },
  {
    id: "05",
    slug: "box-house",
    title: "Box House",
    category: "Residential",
    location: "Perinthalmanna",
    year: "2022",
    img: projectImage("box-house", "cover.jpg"),
    gallery: [
      projectImage("box-house", "01.jpg"),
      projectImage("box-house", "02.jpg"),
    ],
    excerpt: "", // TODO: add a short project description
  },
  {
    id: "06",
    slug: "gokulam-residence",
    title: "Gokulam Residence",
    category: "Residential",
    location: "Angadippuram",
    year: "2022",
    img: projectImage("gokulam-residence", "cover.jpg"),
    gallery: [
      projectImage("gokulam-residence", "01.jpg"),
      projectImage("gokulam-residence", "02.jpg"),
      projectImage("gokulam-residence", "03.jpg"),
    ],
    excerpt:
      "A courtyard residence organized around light and cross-ventilation, its massing responding directly to the plot's orientation.",
    featured: true,
    publications: [
      {
        name: "Volume Zero",
        url: "https://volzero.com/articles/view/gokulam-residence-by-suen-studio",
      },
    ],
  },
  {
    id: "07",
    slug: "casa-dhalaan",
    title: "Casa Dhalaan",
    category: "Residential",
    location: "Perinthalmanna",
    year: "2022",
    img: projectImage("casa-dhalaan", "cover.jpg"),
    gallery: [
      projectImage("casa-dhalaan", "01.jpg"),
      projectImage("casa-dhalaan", "02.jpg"),
    ],
    excerpt:
      "A family home built around a central void, letting daylight and air move through every level without a single mechanical assist.",
    featured: true,
    publications: [
      {
        name: "Volume Zero",
        url: "https://volzero.com/articles/view/casa-dhalaan-by-suen-studio",
      },
    ],
  },
];