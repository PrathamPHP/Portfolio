import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const url = siteUrl();
export const metadata: Metadata = {
  metadataBase: url ? new URL(url) : undefined,
  title: { default: "Pratham Pratap Singh — The Art of Becoming", template: "%s — Pratham Pratap Singh" },
  description: profile.description,
  alternates: url ? { canonical: url } : undefined,
  openGraph: { type: "website", title: "Pratham Pratap Singh — The Art of Becoming", description: profile.description, url, images: url ? ["/og.png"] : undefined },
  twitter: { card: "summary_large_image", images: url ? ["/og.png"] : undefined },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth" className={GeistSans.variable}><body>{children}</body></html>;
}
