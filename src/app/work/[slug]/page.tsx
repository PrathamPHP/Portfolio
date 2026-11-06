import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects, profile } from "@/data/profile";
import { assets } from "@/data/assets";
import { Index, Mark } from "@/components/identity";
import { ProjectPlate } from "@/components/project-plate";
import { siteUrl } from "@/lib/site-url";

type Route = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Route) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  const url = siteUrl();
  return project ? { title: project.name, alternates: url ? { canonical: `${url}/work/${slug}` } : undefined } : {};
}

export default async function WorkPage({ params }: Route) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const hasNotes = project.description || project.stack || project.repository || project.demo;
  return <>
    <header className="detail-header shell">
      <Link className="wordmark" href="/"><span className="mark"><Mark /></span>PPS.<span className="sr-only"> Home</span></Link>
      <Link className="text-link" href="/#work"><ArrowLeft size={16} /> Selected work</Link>
    </header>
    <main className="shell detail-page">
      <Index number={`0${index + 1}`} label="Project file" />
      <h1>{project.name}<span className="blue">.</span></h1>
      <ProjectPlate project={project} number={index + 1} />
      <div className="detail-notes">
        <h2>{hasNotes ? "Project notes" : "Visual study"}</h2>
        <div>
          {project.description && <p>{project.description}</p>}
          {project.stack && <p>{project.stack.join(" · ")}</p>}
          {project.repository && <a className="text-link" href={project.repository}>Repository <ArrowUpRight size={17} /></a>}
          {project.demo && <a className="text-link" href={project.demo}>Demo <ArrowUpRight size={17} /></a>}
          <p className="detail-credit">Project by {profile.name}</p>
          {!assets.projects[project.slug].screenshot && <div className="art-note">
            <h3 className="mono">Artwork / {project.artworkTitle}</h3>
            <p>{project.artworkDescription}</p>
          </div>}
        </div>
      </div>
      <Link className="next-project" href={`/work/${next.slug}`}><span><small>Next project</small>{next.name}</span><ArrowUpRight aria-hidden="true" /></Link>
    </main>
  </>;
}
