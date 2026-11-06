"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Mark } from "./identity";

const chapters = [
  ["about", "About"], ["work", "Work"], ["playground", "Playground"],
];

export default function Nav({ github }: { github: string }) {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => {
      const current = chapters.findLast(([id]) => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 115);
      setActive(current?.[0] ?? "");
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const button = document.getElementById("menu-trigger");
        if (button?.getAttribute("aria-expanded") === "true") button.focus();
        setOpen(false);
      }
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("keydown", escape);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("keydown", escape);
    };
  }, []);

  return <header className="site-header">
    <div className="shell header-inner">
      <a className="wordmark" href="#top"><span className="mark"><Mark /></span><span>PPS<span className="blue">.</span></span><span className="sr-only"> Home</span></a>
      <button className="menu-trigger" id="menu-trigger" aria-expanded={open} aria-controls="chapter-nav" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"} <span aria-hidden="true">{open ? "−" : "+"}</span></button>
      <nav id="chapter-nav" className={open ? "chapter-nav is-open" : "chapter-nav"} aria-label="Chapters">
        {chapters.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="mobile-github" href={github}>GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>
      </nav>
      <a className="header-github" href={github}>GitHub <ArrowUpRight size={15} aria-hidden="true" /></a>
    </div>
  </header>;
}
