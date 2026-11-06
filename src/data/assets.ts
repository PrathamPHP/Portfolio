import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { events, projects } from "./profile";

type Folder = "profile" | "projects" | "hackathons" | "backgrounds" | "certificates";
type ImagePath = `/images/${Folder}/${string}`;

function image(folder: Folder, filename: string): ImagePath | undefined {
  const url = `/images/${folder}/${filename}` as const;
  return existsSync(join(process.cwd(), "public", "images", folder, filename)) ? url : undefined;
}

export type Certificate = {
  id: string;
  image: { src: ImagePath; width: number; height: number };
  title: string;
  event: string;
  issuer: string;
  period: string;
  recognition: "Participation" | "Merit";
};

const certificates: readonly Certificate[] = [
  {
    id: "firewall-ctf",
    image: { src: "/images/certificates/firewall-ctf-participation.webp", width: 1210, height: 847 },
    title: "Certificate of Participation",
    event: "Firewall · Capture the Flag",
    issuer: "Kristu Jayanti Institute of Technology",
    period: "28 August 2026",
    recognition: "Participation",
  },
  {
    id: "hackathon-3",
    image: { src: "/images/certificates/hackathon-3-participation.webp", width: 1229, height: 858 },
    title: "Certificate of Excellence",
    event: "Hackathon 3.0 · Solve for Society",
    issuer: "School of Computer Science and Applications, REVA University",
    period: "9 October 2026",
    recognition: "Participation",
  },
  {
    id: "green-olympiad",
    image: { src: "/images/certificates/green-olympiad-merit.webp", width: 1084, height: 822 },
    title: "Certificate of Merit",
    event: "GREEN Olympiad",
    issuer: "The Energy and Resources Institute (TERI)",
    period: "2024–25 edition",
    recognition: "Merit",
  },
];

export const assets = {
  portrait: image("profile", "pratham-portrait.webp"),
  casual: image("profile", "pratham-casual.webp"),
  sculpture: image("backgrounds", "living-form.webp"),
  creation: image("backgrounds", "living-form-creation.webp"),
  exploration: image("backgrounds", "living-form-exploration.webp"),
  closing: image("backgrounds", "living-form-possibility.webp"),
  projects: Object.fromEntries(projects.map((project) => [project.slug, {
    screenshot: image("projects", `${project.assetFolder}/${project.screenshot}`) ?? image("projects", project.screenshot),
    artwork: `/images/backgrounds/${project.artwork}` as const,
  }])),
  hackathons: Object.fromEntries(events.map((event) => [event.photo, image("hackathons", event.photo)])),
  fieldSession: image("hackathons", "field-session.webp"),
  certificates,
};
