import { ArrowDown, ArrowUpRight } from "lucide-react";

// The expanding dot adapts Magic UI's MIT-licensed Interactive Hover Button.
export function StudioLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  const Arrow = external ? ArrowUpRight : ArrowDown;
  return <a className={`button studio-link ${external ? "button-light" : "button-primary"}`} href={href}>
    <span className="studio-dot" aria-hidden="true" />
    <span>{children}</span>
    <Arrow size={16} aria-hidden="true" />
  </a>;
}
