import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/about",
  "/work",
  "/journey",
  "/journal",
  "/contact",
  "/recruiter",
];

test("public routes have consistent branding, metadata and no fabricated content", async ({
  page,
}) => {
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(
      route === "/" ? "XY's Side Notes" : /\| XY's Side Notes$/,
    );
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
      "content",
      "XY's Side Notes",
    );
    await expect(page.locator('meta[name="description"]')).not.toHaveAttribute(
      "content",
      "",
    );
    await expect(page.locator("body")).not.toContainText(
      /THE XIAOYAO SYSTEM|Bachelor of Accountancy|GPA|Secret draft/,
    );
    await expect(
      page
        .locator("header")
        .getByRole("link", { name: "XY's Side Notes home" }),
    ).toBeVisible();
  }
  await page.goto("/about");
  await expect(
    page.getByText("Nanyang Technological University", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Bachelor of Business", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("2026–2030 (Expected)", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Skills & tools" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "Beyond academics" }),
  ).toHaveCount(0);
});

test("empty content is quiet, with no empty filters or unconfigured links", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Currently", exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "From the Journal" }),
  ).toHaveCount(0);
  await page.goto("/work");
  await expect(page.getByText(/No published projects yet/)).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Project categories" }),
  ).toHaveCount(0);
  await page.goto("/journal");
  await expect(page.getByText(/No published notes yet/)).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Journal categories" }),
  ).toHaveCount(0);
  await page.goto("/contact");
  await expect(
    page.getByText("Contact details aren’t listed here yet."),
  ).toBeVisible();
  await expect(
    page.locator('a[href^="mailto:"], a[target="_blank"]'),
  ).toHaveCount(0);
  await page.goto("/recruiter");
  await expect(
    page.getByRole("heading", { name: "Skills", exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "Experience & milestones" }),
  ).toHaveCount(0);
  await expect(page.locator("a[download]")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "View the full journey" }),
  ).toBeVisible();
});

test("desktop navigation has five main items, recruiter entry and working destinations", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const nav = page.getByRole("navigation", {
    name: "Main navigation",
    exact: true,
  });
  await expect(nav.getByRole("link")).toHaveCount(5);
  await expect(
    page.locator("header").getByRole("link", { name: "Recruiter Mode" }),
  ).toBeVisible();
  for (const name of ["Home", "Work", "About", "Journal", "Contact"]) {
    await nav.getByRole("link", { name, exact: true }).click();
    await expect(nav.getByRole("link", { name, exact: true })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(page.locator("main h1")).toBeVisible();
  }
  await page.goto("/about");
  await page.getByRole("link", { name: "Follow the journey" }).click();
  await expect(page).toHaveURL(/\/journey$/);
  await expect(page.locator("main ol > li")).toHaveCount(1);
});

test("missing and unpublished detail routes remain 404 and absent from sitemaps", async ({
  request,
}) => {
  for (const path of [
    "/work/draft-fixture",
    "/work/unknown",
    "/journal/draft-note",
    "/journal/unknown",
    "/workspace",
    "/workspace/settings",
  ]) {
    expect((await request.get(path)).status()).toBe(404);
  }
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).not.toMatch(
    /draft-fixture|draft-note|workspace|example\.com/,
  );
});

for (const theme of ["light", "dark"]) {
  test(`${theme}: every portfolio page passes accessibility scans`, async ({
    page,
  }) => {
    await page.addInitScript(
      (theme) => localStorage.setItem("theme", theme),
      theme,
    );
    for (const route of routes) {
      await page.goto(route);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(result.violations, route).toEqual([]);
    }
  });
}

for (const width of [320, 375, 430, 768, 1440]) {
  test(`portfolio pages fit ${width}px screens in both themes`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ["light", "dark"]) {
      await page.addInitScript(
        (theme) => localStorage.setItem("theme", theme),
        theme,
      );
      for (const route of routes) {
        await page.goto(route);
        await page.evaluate(() => document.fonts.ready);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          `${route} ${theme}`,
        ).toBe(true);
        const heading = page.locator("main h1");
        const box = await heading.boundingBox();
        expect(box?.x).toBeGreaterThanOrEqual(0);
        expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(width);
      }
    }
  });
}

test("public links have real destinations and keyboard skip navigation works", async ({
  page,
  request,
}) => {
  for (const route of routes) {
    await page.goto(route);
    const hrefs = await page
      .locator("a")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    for (const href of new Set(hrefs)) {
      expect(href).toBeTruthy();
      expect(href).not.toBe("#");
      if (href?.startsWith("/") && !href.startsWith("//"))
        expect((await request.get(href)).status(), href).toBe(200);
    }
  }
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeVisible();
});
