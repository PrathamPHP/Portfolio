import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Focus } from "lucide-react";
import Nav from "@/components/nav";
import { Index, Mark } from "@/components/identity";
import { ProjectPlate } from "@/components/project-plate";
import { StudioLink } from "@/components/studio-link";
import { CertificateArchive } from "@/components/certificate-archive";
import { FormPlate } from "@/components/three/form-plate";
import Motion from "@/components/motion";
import Playground from "@/components/playground";
import { assets } from "@/data/assets";
import { events, profile, projects, skills } from "@/data/profile";

export default function Home() {
  const structuredData = { "@context": "https://schema.org", "@type": "Person", name: profile.name, sameAs: [profile.github], affiliation: { "@type": "CollegeOrUniversity", name: profile.university } };
  const aboutPortrait = assets.casual ?? assets.portrait;

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Nav github={profile.github} />
    <Motion />
    <main id="main" tabIndex={-1}>
      <section id="top" className="hero shell" data-phase="0" aria-labelledby="hero-name">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow" data-intro><span /> An evolving portfolio <span className="eyebrow-rule" /></p>
            <h1 id="hero-name" data-intro><span>Pratham</span>{" "}<span>Pratap Singh<span className="blue name-period">.</span></span></h1>
            <p className="hero-degree" data-intro>BCA <span>·</span> AI &amp; ML <span className="degree-divider" /> REVA University</p>
            <div className="hero-lede" data-intro>
              <p className="hero-mantra">Not finished.<br />Just getting started.</p>
              <p>I’m a first-year student exploring the web, game development, and what ambitious ideas can become.</p>
            </div>
            <div className="hero-actions" data-intro>
              <StudioLink href="#work">Explore my work</StudioLink>
              <a className="text-link" href="#about">About me <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
          </div>
          <FormPlate still={assets.sculpture} portrait={assets.portrait} />
        </div>
        <div className="hero-footer mono"><span><Mark size={16} /> The Art of Becoming</span><a href="#about">Scroll to discover <ArrowDown size={14} aria-hidden="true" /></a><span>Portfolio / Vol. 01</span></div>
      </section>

      <section id="about" className="shell section about" aria-labelledby="about-title">
        <Index number="01" label="Introduction" />
        <div className="about-grid">
          <div data-reveal>
            <h2 id="about-title" className="display">Curiosity is the<br /><em>starting point.</em></h2>
            <p className="section-copy">I’m Pratham, a first-year BCA student specializing in AI and machine learning at REVA University. I’m drawn to the moment when an idea stops being a sketch and becomes something I can put in someone’s hands.</p>
            <p className="section-copy">Right now, that means building for the web, exploring games, and learning what happens when I take an idea into a room full of other builders.</p>
          </div>
          <figure className="portrait" data-reveal>
            <div className="portrait-frame">
              {aboutPortrait ? <Image src={aboutPortrait} alt="Pratham Pratap Singh" fill sizes="(max-width: 750px) 100vw, 36vw" unoptimized={Boolean(assets.casual)} /> : <div className="portrait-placeholder"><span className="mono">Image plate / 01</span><span className="portrait-initials">P<span>.</span></span><Focus size={24} aria-hidden="true" /></div>}
            </div>
            <figcaption className="mono"><span>Pratham Pratap Singh</span><span>{aboutPortrait ? "Portrait / 01" : "Portrait pending"}</span></figcaption>
          </figure>
        </div>
      </section>

      <section id="work" className="work-section" data-phase="1" aria-labelledby="work-title">
        <div className="shell section">
          <Index number="02" label="Selected work" />
          <div className="section-heading phase-heading" data-reveal>
            <div><h2 id="work-title" className="display">Ideas in <em>form.</em></h2>
            <p className="section-copy">Three projects from my first chapter as a builder.</p></div>
            <FormPlate still={assets.creation} phase={1} compact />
          </div>
          <div className="project-list">
            {projects.map((project, index) => <article className={`project-row project-row-${index}`} key={project.slug} data-reveal>
              <Link href={`/work/${project.slug}`} className="project-link">
                <ProjectPlate project={project} number={index + 1} />
                <div className="project-label"><span className="mono">0{index + 1} / Project file</span><h3>{project.name}</h3><span className="round-arrow"><ArrowUpRight size={24} aria-hidden="true" /></span></div>
              </Link>
            </article>)}
          </div>
        </div>
      </section>

      <section id="tools" className="shell section tools" aria-labelledby="tools-title">
        <Index number="03" label="The builder’s mindset" />
        <div className="section-heading" data-reveal><h2 id="tools-title" className="display">Tools for <em>making.</em></h2><p className="section-copy">The languages and tools I reach for when an idea is ready to take shape.</p></div>
        <div className="tool-list">{skills.map((group, i) => <details className="tool-row" key={group.title} open={i === 0}>
          <summary><span className="mono" aria-hidden="true">0{i + 1}</span><span className="tool-title">{group.title}</span><span className="skill-items">{group.items.join(" / ")}</span><span className="tool-toggle" aria-hidden="true" /></summary>
          <p>{group.description}</p>
        </details>)}</div>
      </section>

      <section id="experience" className="experience" aria-labelledby="experience-title">
        <div className="shell section">
          <Index number="04" label="Field notes" />
          <div className="experience-grid">
            <div data-reveal>
              <h2 id="experience-title" className="display">In the<br /><em>room.</em></h2>
              <p className="section-copy">Hackathons and challenges I’ve taken part in while learning to build under pressure.</p>
              {assets.fieldSession && <figure className="field-photo">
                <div className="event-photo"><Image src={assets.fieldSession} alt="Participants gathered around laptops at a hackathon table" fill sizes="(max-width: 750px) 90vw, 43vw" /></div>
                <figcaption className="mono">Field photograph / Hackathon session</figcaption>
              </figure>}
            </div>
            <ol className="event-list">{events.map((event, index) => <li key={event.name} data-reveal>
              <span className="event-index mono">0{index + 1}</span>
              <div><span className="mono event-tag">{event.label} / Participation</span><h3>{event.name}</h3><p>{event.context}</p>
              {event.certificate && <a className="text-link record-link" href={`#record-${event.certificate}`}>See archive record <ArrowUpRight size={14} aria-hidden="true" /></a>}
              {assets.hackathons[event.photo] && <div className="event-photo"><Image src={assets.hackathons[event.photo]!} alt={`Photograph from ${event.name}`} fill sizes="(max-width: 750px) 90vw, 45vw" /></div>}</div>
            </li>)}</ol>
          </div>
          <CertificateArchive certificates={assets.certificates} />
        </div>
      </section>

      <section id="playground" className="playground-section" data-phase="2" aria-labelledby="playground-title">
        <div className="shell section">
          <Index number="05" label="Interactive study" />
          <div className="section-heading phase-heading" data-reveal>
            <div><h2 id="playground-title" className="display">The <em>Playground.</em></h2><p className="section-copy">A small experiment in making something from scattered points of light.</p></div>
            <FormPlate still={assets.exploration} phase={2} compact />
          </div>
          <Playground />
        </div>
      </section>

      <section id="story" className="shell section story" aria-labelledby="story-title">
        <Index number="06" label="Personal notes" />
        <div className="story-grid" data-reveal>
          <div className="story-symbol" aria-hidden="true"><Mark size={128} /></div>
          <div><h2 id="story-title" className="display">Still <em>becoming.</em></h2>
            <p className="section-copy">I enjoy building for the web because I can take an idea from a sketch to something another person can try. Games make me curious about what happens when that person gets to shape the experience.</p>
            <p className="section-copy">I want to get better at finishing ambitious projects and win a hackathon. For now, I’m learning by building, entering competitions, and taking each project a little further than the last.</p>
          </div>
        </div>
      </section>

      <section id="connect" className="closing" data-phase="3" aria-labelledby="closing-title">
        <div className="shell section closing-inner">
          <Index number="07" label="Possibility" />
          <div className="closing-art" aria-hidden="true"><FormPlate still={assets.closing} phase={3} compact /></div>
          <div className="closing-copy" data-reveal>
            <h2 id="closing-title" className="display">The best is<br />still being <em>built.</em></h2>
            <p>Follow what I’m building next on GitHub.</p>
            <StudioLink href={profile.github} external>Find me on GitHub</StudioLink>
          </div>
          <div className="closing-caption mono"><span>Living Form / Study 04</span><ArrowRight size={16} aria-hidden="true" /></div>
        </div>
      </section>
    </main>
    <footer className="site-footer"><div className="shell footer-inner"><span><Mark /> {profile.name}</span><span className="mono">Designed to keep evolving.</span><a className="text-link" href="#top">Back to top <ArrowUp size={15} aria-hidden="true" /></a></div></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </>;
}
