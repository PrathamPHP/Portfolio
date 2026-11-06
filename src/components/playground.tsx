"use client";

import { useEffect, useRef, useState } from "react";
import { Asterisk, RotateCcw } from "lucide-react";

const patterns = [
  [[15, 54], [29, 27], [44, 47], [59, 20], [75, 37], [82, 65], [64, 76], [39, 74]],
  [[18, 30], [33, 65], [49, 76], [66, 58], [83, 68], [76, 26], [54, 37], [38, 25]],
  [[17, 65], [30, 43], [20, 24], [44, 30], [66, 18], [81, 41], [73, 70], [49, 69]],
] as const;

export default function Playground() {
  const [round, setRound] = useState(0);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [focusNext, setFocusNext] = useState(false);
  const spark = useRef<HTMLButtonElement>(null);
  const replay = useRef<HTMLButtonElement>(null);
  const pattern = patterns[round % patterns.length];
  const target = pattern[count];
  const finished = count === pattern.length;

  useEffect(() => {
    if (!focusNext) return;
    (finished ? replay.current : spark.current)?.focus({ preventScroll: true });
  }, [count, finished, focusNext, started, round]);

  function start(keyboard: boolean) {
    if (started) setRound((previous) => previous + 1);
    setFocusNext(keyboard);
    setCount(0);
    setStarted(true);
  }

  return <div className="game">
    <div className="game-header"><h3><Asterisk size={20} aria-hidden="true" /> Catch the Spark</h3><p className="mono" role="status">{count} / {pattern.length} sparks{finished ? " · Complete" : ""}</p></div>
    <div className="game-arena" aria-label="Constellation field">
      <svg className="game-grid" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polyline points={pattern.slice(0, count).map((point) => point.join(",")).join(" ")} fill="none" stroke="#90a7ff" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
        {pattern.slice(0, count).map(([x, y]) => <path key={x} d={`M${x} ${y}h.02`} stroke="#ecf1ff" strokeWidth="6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />)}
      </svg>
      {started && target && <button
        className="spark" key={`${round}-${count}`} ref={spark}
        type="button" aria-label={`Collect spark ${count + 1} of ${pattern.length}`}
        style={{ left: `${target[0]}%`, top: `${target[1]}%` }}
        onClick={(event) => { setFocusNext(event.detail === 0); setCount((previous) => Math.min(previous + 1, pattern.length)); }}
      ><Asterisk size={27} aria-hidden="true" /></button>}
      {(!started || finished) && <div className="game-message">
        <h4>{finished ? "Constellation complete." : "Find the first light."}</h4>
        <p>{finished ? "Every spark became a point in the same constellation." : "Collect eight sparks to draw a constellation. Click, tap, or press Enter on each spark."}</p>
        <button className="button game-button" ref={replay} type="button" onClick={(event) => start(event.detail === 0)}>{finished ? "Play again" : "Begin experiment"}</button>
      </div>}
    </div>
    <div className="game-footer">
      <p className="mono">Click / tap / Enter</p>
      {started && <button className="text-link game-reset" type="button" onClick={(event) => start(event.detail === 0)}><RotateCcw size={14} aria-hidden="true" /> Restart</button>}
    </div>
  </div>;
}
