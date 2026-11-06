"use client";

import { useEffect } from "react";

export default function Motion() {
  useEffect(() => {
    const media = matchMedia("(min-width: 751px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let dispose: (() => void) | undefined;
    let revision = 0;

    async function setup() {
      const current = ++revision;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (current !== revision) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          if (element.getBoundingClientRect().top < window.innerHeight) return;
          gsap.from(element, {
            y: 19, duration: .73, ease: "power3.out", clearProps: "transform",
            scrollTrigger: { trigger: element, start: "top 94%", once: true },
          });
        });
      });
      dispose = () => context.revert();
    }

    function startOnScroll() {
      if (window.scrollY < 12) return;
      window.removeEventListener("scroll", startOnScroll);
      void setup();
    }

    function configure() {
      revision++;
      dispose?.();
      dispose = undefined;
      window.removeEventListener("scroll", startOnScroll);
      if (!media.matches) return;
      if (window.scrollY >= 12) void setup();
      else window.addEventListener("scroll", startOnScroll, { passive: true });
    }

    configure();
    media.addEventListener("change", configure);
    return () => {
      revision++;
      window.removeEventListener("scroll", startOnScroll);
      media.removeEventListener("change", configure);
      dispose?.();
    };
  }, []);
  return null;
}
