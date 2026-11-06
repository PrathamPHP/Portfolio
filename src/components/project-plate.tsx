import Image from "next/image";
import { assets } from "@/data/assets";
import { projects } from "@/data/profile";

export function ProjectPlate({ project, number }: { project: (typeof projects)[number]; number: number }) {
  const { screenshot, artwork } = assets.projects[project.slug];
  return <figure className={`project-plate project-${project.slug}`}>
    <div className="project-image" data-authentic={screenshot ? "" : undefined}>
      <Image src={screenshot ?? artwork} alt={screenshot ? `${project.name} project screenshot` : ""} fill sizes="(max-width: 750px) 100vw, (max-width: 1100px) 75vw, 900px" />
    </div>
    <figcaption><span>FIG. 0{number} / {screenshot ? "Project screenshot" : project.artworkTitle}</span><span>{screenshot ? "Project archive" : "Abstract artwork"}</span></figcaption>
  </figure>;
}
