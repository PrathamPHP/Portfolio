export function siteUrl() {
  const value = process.env.SITE_URL;
  if (!value) return undefined;
  const url = new URL(value);
  if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("SITE_URL must be an HTTP(S) URL.");
  return url.origin;
}
