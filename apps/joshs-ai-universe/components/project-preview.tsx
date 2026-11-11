import Image from "next/image";
import type { PortfolioProject } from "@/lib/portfolio";
export function ProjectPreview({ project }: { project: PortfolioProject }) {
  const preview =
    project.demo === "buildbrief"
      ? {
          src: "/buildbrief-preview.jpg",
          alt: "Actual BuildBrief prototype showing the problem-discovery form with a clearly fictional example.",
          caption: "Working prototype · fictional example",
        }
      : project.demo === "planner"
        ? {
            src: "/planner-preview.jpg",
            alt: "Actual Sprint Planner prototype showing the empty board and planning controls.",
            caption: "Original working sample · empty demonstration board",
          }
        : {
            src: "/jeff-electric-website.jpg",
            alt: "Jeff Electric public website snapshot, with its customer introduction and team photograph.",
            caption: "Public website snapshot",
          };
  return (
    <figure
      className={`pf-preview ${project.number === "01" ? "pf-preview-jeff" : ""}`}
    >
      <Image
        src={preview.src}
        alt={preview.alt}
        width={1348}
        height={800}
        unoptimized
        sizes="(max-width:760px) 90vw, 450px"
      />
      <figcaption>{preview.caption}</figcaption>
    </figure>
  );
}
