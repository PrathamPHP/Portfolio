import { chromium } from "@playwright/test";
import { readFile, writeFile } from "node:fs/promises";

const url = process.env.PORTFOLIO_DEV_URL ?? "http://localhost:3000";
const browser = await chromium.launch({ args: ["--enable-webgl", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.35, reducedMotion: "reduce" });
  const filenames = ["living-form", "living-form-creation", "living-form-exploration", "living-form-possibility"];

  if (!process.argv.includes("--og-only")) {
    await page.goto(new URL("/?form-proof", url).href);
    for (const [phase, filename] of filenames.entries()) {
      const stage = page.locator(`[data-form-phase="${phase}"] .form-stage`);
      await stage.scrollIntoViewIfNeeded();
      await stage.locator("canvas").waitFor({ state: "visible", timeout: 45_000 });
      await stage.locator("xpath=self::*[contains(@class, 'form-live')]").waitFor();
      const image = await stage.locator("canvas").evaluate((canvas) => canvas.toDataURL("image/webp", .92));
      const data = Buffer.from(image.split(",")[1], "base64");
      if (data.length < 4000) throw new Error(`The rendered plate ${filename} was empty.`);
      await writeFile(new URL(`../public/images/backgrounds/${filename}.webp`, import.meta.url), data);
    }
  }

  const heroStill = await readFile(new URL("../public/images/backgrounds/living-form.webp", import.meta.url));
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.goto(url);
  await page.evaluate((artwork) => {
    const poster = document.createElement("div");
    poster.id = "og-poster";
    poster.style.cssText = "position:fixed;z-index:999;left:0;top:0;width:1200px;height:630px;background:#f4f3ee;color:#171a20;padding:56px;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:15px;";
    poster.innerHTML = `<div><p style="font-family:var(--mono);font-size:15px;letter-spacing:.18em;color:#283ece;margin-bottom:34px">✳ &nbsp; THE ART OF BECOMING</p>
      <p style="font-size:84px;font-weight:710;line-height:.92;letter-spacing:-.064em">Pratham<br>Pratap Singh<span style="color:#283ece">.</span></p>
      <p style="margin-top:27px;color:#515761;font-size:19px">BCA · AI &amp; ML &nbsp; / &nbsp; REVA University</p>
      <p style="margin-top:43px;font-size:27px;font-weight:620;letter-spacing:-.045em">Not finished.<br>Just getting started.</p></div>
      <div style="position:relative;height:100%;border:1px solid #aab5cf;background:radial-gradient(ellipse,#f2f4f7,#ced6e6);display:grid;place-items:center">
      <p style="position:absolute;left:19px;top:19px;font:12px var(--mono);letter-spacing:.12em;color:#253253">PPS–001 / THE LIVING FORM</p>
      <img style="width:100%;height:100%;object-fit:contain" alt="">
      <p style="position:absolute;right:19px;bottom:19px;font:12px var(--mono);letter-spacing:.12em;color:#253253">01 / CURIOSITY</p></div>`;
    poster.querySelector("img").src = artwork;
    document.body.append(poster);
  }, `data:image/webp;base64,${heroStill.toString("base64")}`);
  await page.locator("#og-poster img").evaluate((image) => image.decode());
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "public/og.png", scale: "css", timeout: 45_000 });
} finally {
  await browser.close();
}
