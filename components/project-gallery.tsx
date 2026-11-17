import Image from "next/image";
import dimensions from "./project-image-sizes.json";
import styles from "./project-gallery.module.css";

export default function ProjectGallery({ images, alt }: { images: string[]; alt: string }) {
  const sizes = dimensions as Record<string, { width: number; height: number }>;
  return (
    <div className={styles.gallery}>
      {Array.from(new Set(images)).map((src, index) => {
        const size = sizes[src] ?? { width: 1600, height: 1067 };
        return <div key={src} className={`${styles.frame} ${index === 0 || index % 3 === 0 || (index === images.length - 1 && index % 3 === 1) ? styles.wide : ""}`}>
          <Image src={src} alt={`${alt} — architectural photograph ${index + 1}`} width={size.width} height={size.height} sizes={index === 0 || index % 3 === 0 || (index === images.length - 1 && index % 3 === 1) ? "(max-width: 1599px) 90vw, 1440px" : "(max-width: 767px) 90vw, 44vw"} loading={index === 0 ? "eager" : "lazy"} className={styles.image} />
        </div>;
      })}
    </div>
  );
}

