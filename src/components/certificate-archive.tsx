"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useRef, useState } from "react";
import type { Certificate } from "@/data/assets";

export function CertificateArchive({ certificates }: { certificates: readonly Certificate[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const viewer = useRef<HTMLDialogElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const active = selected === null ? null : certificates[selected];

  function open(index: number, button: HTMLButtonElement) {
    opener.current = button;
    setSelected(index);
    viewer.current?.showModal();
    close.current?.focus();
  }

  function move(offset: number) {
    setSelected((index) => index === null ? null : (index + offset + certificates.length) % certificates.length);
  }

  return <section className="certificate-archive" id="archive" aria-labelledby="archive-title">
    <header className="archive-heading" data-reveal>
      <p className="mono archive-kicker">Field notes / Document archive</p>
      <h3 className="display" id="archive-title">Evidence of <em>exploration.</em></h3>
      <p className="section-copy">Original documents from the rooms I’ve learned in.</p>
    </header>
    <ol className="archive-list">
      {certificates.map((item, index) => <li key={item.id} id={`record-${item.id}`} data-reveal>
        <button type="button" className="archive-record" onClick={(event) => open(index, event.currentTarget)}>
          <span className="archive-mat">
            <Image {...item.image} alt="" sizes={index === 0 ? "(max-width: 750px) 84vw, 50vw" : "(max-width: 750px) 80vw, 24vw"} />
          </span>
          <span className="archive-record-copy">
            <span className="mono archive-kicker">Record 0{index + 1} / {item.recognition}</span>
            <strong>{item.event}</strong>
            <span className="archive-date">{item.period}</span>
            <ArrowUpRight className="archive-arrow" size={19} aria-hidden="true" />
          </span>
        </button>
      </li>)}
    </ol>
    <dialog ref={viewer} className="certificate-viewer" aria-label="Certificate viewer"
      onClose={() => { setSelected(null); opener.current?.focus({ preventScroll: true }); }}
      onClick={(event) => { if (event.target === event.currentTarget) viewer.current?.close(); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}>
      <div className="viewer-inner">
        <header className="viewer-header">
          <span className="mono">Document archive</span>
          <button ref={close} type="button" className="viewer-button" aria-label="Close certificate" onClick={() => viewer.current?.close()}><X size={20} /></button>
        </header>
        {active && <div className="viewer-record" aria-live="polite">
          <div>
            <p className="mono archive-kicker">{active.recognition} / {active.period}</p>
            <h3>{active.event}</h3>
            <p>{active.title} · {active.issuer}</p>
          </div>
          <Image {...active.image} alt={`${active.title} for Pratham Pratap Singh, issued by ${active.issuer}`} sizes="(max-width: 750px) 90vw, 880px" loading="eager" />
        </div>}
        <footer className="viewer-footer">
          <button type="button" className="viewer-button" aria-label="Previous certificate" onClick={() => move(-1)}><ArrowLeft size={20} /></button>
          <span className="mono" aria-live="polite">{selected === null ? "" : `0${selected + 1} / 0${certificates.length}`}</span>
          <button type="button" className="viewer-button" aria-label="Next certificate" onClick={() => move(1)}><ArrowRight size={20} /></button>
        </footer>
      </div>
    </dialog>
  </section>;
}
