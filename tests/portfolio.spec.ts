import { chromium, expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("desktop chapter navigation and all three project files", async ({ page, request }) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Pratham Pratap Singh.");
  await page.getByRole("link", { name: "Explore my work" }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.getByRole("navigation").getByRole("link", { name: "Work" })).toHaveAttribute("aria-current", "location");

  for (const project of ["AgriQueue", "Chainshield AI", "Inbox Gaurd AI"]) {
    await page.getByRole("link", { name: new RegExp(project) }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(`${project}.`);
    await expect(page.getByRole("heading", { name: "Visual study" })).toBeVisible();
    await page.getByRole("link", { name: "Selected work" }).click();
  }

  await expect(page.getByRole("link", { name: "Find me on GitHub" })).toHaveAttribute("href", "https://github.com/PrathamPHP");
  await expect(page.getByText("among the top 10 teams", { exact: false })).toBeVisible();
  expect((await request.get("/robots.txt")).ok()).toBeTruthy();
  expect((await request.get("/og.png")).ok()).toBeTruthy();
  expect(errors).toEqual([]);
});

test("mouse and keyboard can complete and replay Catch the Spark", async ({ page }) => {
  await page.goto("/#playground");
  await page.getByRole("button", { name: "Begin experiment" }).click();
  for (let n = 1; n <= 8; n++) {
    await page.getByRole("button", { name: `Collect spark ${n} of 8` }).click();
  }
  await expect(page.getByRole("status")).toHaveText("8 / 8 sparks · Complete");
  await page.getByRole("button", { name: "Play again" }).press("Enter");
  for (let n = 1; n <= 8; n++) {
    await expect(page.getByRole("button", { name: `Collect spark ${n} of 8` })).toBeFocused();
    await page.keyboard.press("Enter");
  }
  await expect(page.getByRole("button", { name: "Play again" })).toBeFocused();
  await page.getByRole("button", { name: "Restart" }).click();
  await expect(page.getByRole("status")).toHaveText("0 / 8 sparks");
});

test("authentic portrait, field photo, and all archive images decode", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const images = page.locator(".portrait-frame img, .field-photo img, .archive-mat img");
  await expect(images).toHaveCount(5);
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    expect(await image.evaluate(async (element: HTMLImageElement) => {
      await element.decode();
      return element.naturalWidth > 0;
    })).toBe(true);
  }
});

test("certificate viewer supports keyboard browsing and returns focus", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const record = page.getByRole("button", { name: /Firewall · Capture the Flag/ });
  await record.press("Enter");
  const viewer = page.getByRole("dialog", { name: "Certificate viewer" });
  await expect(viewer).toBeVisible();
  await expect(viewer.getByRole("button", { name: "Close certificate" })).toBeFocused();
  await expect(viewer.getByText(/Certificate of Participation · Kristu Jayanti/)).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(viewer.getByRole("heading", { name: /Hackathon 3.0/ })).toBeVisible();
  await viewer.getByRole("button", { name: "Next certificate" }).click();
  await expect(viewer.getByRole("heading", { name: "GREEN Olympiad" })).toBeVisible();
  expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze()).violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(viewer).toBeHidden();
  await expect(record).toBeFocused();
});

test("mobile certificate viewer works with touch and reduced motion", async ({ browser }) => {
  const context = await browser.newContext(devicesForTouch());
  try {
    const page = await context.newPage();
    await page.goto("/");
    const record = page.getByRole("button", { name: /GREEN Olympiad/ });
    await record.tap();
    const viewer = page.getByRole("dialog", { name: "Certificate viewer" });
    await expect(viewer.getByRole("heading", { name: "GREEN Olympiad" })).toBeVisible();
    await viewer.getByRole("button", { name: "Close certificate" }).tap();
    await expect(viewer).toBeHidden();
  } finally {
    await context.close();
  }
});

for (const width of [360, 390, 768, 1440, 2560]) {
  test(`layout fits ${width}px with reduced motion`, async ({ page }) => {
    await page.setViewportSize({ width, height: 850 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
  const hero = page.locator(".hero-portrait img");
  await expect(hero).toHaveAttribute("src", /pratham-portrait/);
  await expect(page.locator(".portrait-frame img")).toHaveAttribute("src", /pratham-casual/);
  await hero.evaluate((image: HTMLImageElement) => image.decode());
    await page.locator(".form-still img").first().evaluate((image: HTMLImageElement) => image.decode());
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator(".form-still img")).toHaveCount(3);
  });
}

test("mobile menu, Escape, and touch game", async ({ browser }) => {
  const context = await browser.newContext({ ...devicesForTouch() });
  try {
    const page = await context.newPage();
    await page.goto("/");
    const menu = page.getByRole("button", { name: "Menu" });
    await menu.tap();
    await expect(page.getByRole("navigation")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
    await menu.tap();
    await page.getByRole("link", { name: "Playground", exact: true }).tap();
    await expect(page.getByRole("navigation")).toBeHidden();
    await page.getByRole("button", { name: "Begin experiment" }).tap();
    await page.getByRole("button", { name: "Collect spark 1 of 8" }).tap();
    await expect(page.getByRole("status")).toHaveText("1 / 8 sparks");
  } finally {
    await context.close();
  }
});

function devicesForTouch() {
  return { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "reduce" as const };
}

test("automated accessibility scan on home and project detail", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze()).violations).toEqual([]);
  await page.goto("/work/chainshield-ai");
  expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze()).violations).toEqual([]);
});

test("the sculpture renders with WebGL and restores the still after context loss", async ({ baseURL }) => {
  test.setTimeout(75_000);
  const browser = await chromium.launch({ args: ["--enable-webgl", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  try {
    const page = await browser.newPage({ viewport: { width: 1024, height: 720 } });
    await page.goto(baseURL!);
    const stage = page.locator('[data-form-phase="1"] .form-stage');
    await stage.scrollIntoViewIfNeeded();
    await expect(stage).toHaveClass(/form-live/, { timeout: 35_000 });
    await stage.hover({ position: { x: 90, y: 120 } });
    const canvas = stage.locator("canvas");
    await expect(canvas).toBeVisible();
    await canvas.evaluate((element: HTMLCanvasElement) => {
      element.getContext("webgl2")?.getExtension("WEBGL_lose_context")?.loseContext();
    });
    await expect(canvas).toHaveCount(0);
    await expect(stage.locator(".form-still")).toHaveCSS("opacity", "1");
  } finally {
    await browser.close();
  }
});
