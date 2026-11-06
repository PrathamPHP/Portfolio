import { Asterisk } from "lucide-react";

export function Mark({ size = 23 }: { size?: number }) {
  return <Asterisk size={size} strokeWidth={2} aria-hidden="true" />;
}

export function Index({ number, label }: { number: string; label: string }) {
  return <div className="index"><span className="index-number">{number}</span><span>{label}</span></div>;
}
