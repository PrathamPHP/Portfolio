import type { MetadataRoute } from "next";
import { projects } from "@/data/profile";
import { siteUrl } from "@/lib/site-url";
export default function sitemap(): MetadataRoute.Sitemap {
  const url = siteUrl();
  return url ? [{ url }, ...projects.map(({ slug }) => ({ url: `${url}/work/${slug}` }))] : [];
}
