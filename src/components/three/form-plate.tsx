"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState, Component } from "react";
import { Crosshair, Plus } from "lucide-react";
import { Mark } from "../identity";

const Scene = dynamic(() => import("./scene"), { ssr: false });
const labels = ["Curiosity", "Creation", "Exploration", "Possibility"];
let webglAvailable: boolean | undefined;

function supportsWebGL() {
  if (webglAvailable !== undefined) return webglAvailable;
  try {
    const context = document.createElement("canvas").getContext("webgl2");
    webglAvailable = Boolean(context);
    context?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    webglAvailable = false;
  }
  return webglAvailable;
}

class SceneBoundary extends Component<{ children: React.ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function FormPlate({ still, portrait, phase = 0, compact = false }: { still?: string; portrait?: string; phase?: number; compact?: boolean }) {
  const stage = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [proof, setProof] = useState(false);

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const capability = matchMedia("(min-width: 760px) and (pointer: fine)");
    // The query override makes it possible to capture the exact live geometry for static artwork.
    const proof = process.env.NODE_ENV === "development" && new URLSearchParams(location.search).has("form-proof");
    if (portrait && !proof) return;
    const update = () => {
      const device = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
      setProof(proof);
      setEnabled(proof || (!motion.matches && capability.matches && (device.deviceMemory ?? 8) > 2 && !device.connection?.saveData && supportsWebGL()));
    };
    const timer = window.setTimeout(update, 250);
    const intersection = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "65px" });
    intersection.observe(element);
    motion.addEventListener("change", update);
    capability.addEventListener("change", update);
    return () => {
      clearTimeout(timer);
      intersection.disconnect();
      motion.removeEventListener("change", update);
      capability.removeEventListener("change", update);
    };
  }, [portrait]);

  if (portrait && !proof) return <figure className="form-plate">
    <div className="form-stage hero-portrait" ref={stage}>
      <Image src={portrait} alt="Pratham Pratap Singh" fill loading="eager" fetchPriority="high" sizes="(max-width: 750px) 100vw, 54vw" />
    </div>
    <figcaption className="form-caption mono"><span>Portrait</span><span>Pratham Pratap Singh</span></figcaption>
  </figure>;

  const live = enabled && visible && !failed;

  return <figure className={`form-plate${compact ? " form-compact" : ""}`} data-form-phase={phase}>
    <div className={`form-stage${live && ready ? " form-live" : ""}`} ref={stage}>
      <div className="form-object" aria-hidden="true">
        <div className="form-still">{still ? <Image src={still} alt="" fill loading={phase === 0 ? "eager" : "lazy"} fetchPriority={phase === 0 ? "high" : undefined} sizes={compact ? "(max-width: 750px) 75vw, 35vw" : "(max-width: 750px) 100vw, 54vw"} /> : <div className="form-fallback"><Mark /></div>}</div>
        {live && <div className="form-canvas">
          <SceneBoundary onFailure={() => { setFailed(true); setReady(false); }}>
            <Scene stage={stage} phase={phase} proof={proof} onReady={setReady} onFailure={() => { setFailed(true); setReady(false); }} />
          </SceneBoundary>
        </div>}
      </div>
      {!compact && <>
        <span className="form-annot top mono"><Crosshair size={14} /> PPS–001</span>
        <span className="form-annot right mono">Form study</span>
        <span className="form-annot bottom mono">X / Y / Z</span>
        <span className="form-annot bottom-right"><Plus size={15} /></span>
      </>}
    </div>
    <figcaption className="form-caption mono"><span>0{phase + 1} / {labels[phase]}</span><span>The Living Form</span></figcaption>
  </figure>;
}
