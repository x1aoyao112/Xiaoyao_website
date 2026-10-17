import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const theme of ["light", "dark"] as const) {
  test(`${theme}: accessible homepage, gallery, and dialog`, async ({
    page,
  }) => {
    await page.addInitScript(
      (theme) => localStorage.setItem("theme", theme),
      theme,
    );
    for (const path of ["/", "/design-system"]) {
      await page.goto(path);
      await expect(page.locator("html")).toHaveClass(
        new RegExp(`(?:^|\\s)${theme}(?:\\s|$)`),
      );
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(result.violations).toEqual([]);
    }
    await page.getByRole("button", { name: "Open dialog" }).click();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  });
}

test("theme follows system and persists a manual override", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/(?:^|\s)dark(?:\s|$)/);
  await page
    .getByRole("button", { name: "Toggle light and dark mode" })
    .click();
  await expect(page.locator("html")).toHaveClass(/(?:^|\s)light(?:\s|$)/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/(?:^|\s)light(?:\s|$)/);
});

test("preview controls and dialog support the keyboard without saving data", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/design-system");
  await page
    .getByLabel("Card title", { exact: true })
    .fill("Curiosity in motion");
  await expect(
    page.getByRole("heading", { name: "Curiosity in motion" }),
  ).toBeVisible();
  await page.getByLabel("Surface", { exact: true }).selectOption("powder");
  await page.getByLabel("Adjust sample progress").focus();
  await page.keyboard.press("Home");
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("progressbar", { name: "Sample progress" }),
  ).toHaveAttribute("aria-valuenow", "1");
  const trigger = page.getByRole("button", { name: "Open dialog" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((element) =>
        element.contains(document.activeElement),
      ),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await page.reload();
  await expect(page.getByLabel("Card title", { exact: true })).toHaveValue(
    "Make room for curiosity",
  );
  expect(errors).toEqual([]);
});

test("mobile menu closes with Escape and after navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/design-system");
  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.click();
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

for (const width of [320, 375, 430, 768, 1440]) {
  test(`responsive layout at ${width}px and reduced motion`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const path of ["/", "/design-system"]) {
      await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      expect(
        await page.evaluate(
          () => getComputedStyle(document.documentElement).scrollBehavior,
        ),
      ).toBe("auto");
    }
  });
}

test("private workspace stays unavailable", async ({ request }) => {
  for (const path of [
    "/workspace",
    "/workspace/settings",
    "/workspace?preview=true",
  ]) {
    expect((await request.get(path)).status()).toBe(404);
  }
});

test("homepage preserves the approved copy and removes generic labels", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "A work in progress.",
  );
  for (const copy of [
    "Xiaoyao's corner of the internet",
    "A little about what I do, what I like, and what I'm figuring out along the way.",
    "A note to myself",
    "Some things are worth figuring out.",
    "Made with too many open tabs.",
  ]) {
    await expect(page.getByText(copy, { exact: true })).toBeVisible();
  }
  for (const removed of [
    /a personal operating system/i,
    /notes to self/i,
    /always a student/i,
    /learning → building → becoming/i,
    /a life built/i,
    /curious about business\. inspired by technology/i,
    /01 \/|02 \//,
  ]) {
    await expect(page.locator("body")).not.toContainText(removed);
  }
});

test("homepage uses the two original self-hosted font families", async ({
  page,
}) => {
  const fonts: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes(".woff2")) fonts.push(request.url());
  });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const heading = page.getByRole("heading", { level: 1 });
  const label = page.getByText("Xiaoyao's corner of the internet", {
    exact: true,
  });
  expect(
    await heading.evaluate((el) => getComputedStyle(el).fontFamily),
  ).toMatch(/zodiak/i);
  expect(await label.evaluate((el) => getComputedStyle(el).fontFamily)).toMatch(
    /switzer/i,
  );
  await expect(heading).toHaveCSS("font-style", "normal");
  const loaded = await page.evaluate(() =>
    Array.from(document.fonts)
      .filter((font) => font.status === "loaded")
      .map((font) => font.family),
  );
  expect(loaded.some((family) => /zodiak/i.test(family))).toBe(true);
  expect(loaded.some((family) => /switzer/i.test(family))).toBe(true);
  expect(fonts.length).toBeGreaterThanOrEqual(2);
  expect(
    fonts.every((url) => new URL(url).origin === "http://127.0.0.1:3100"),
  ).toBe(true);
});

test("preloaded fonts keep the homepage stable during delayed cold loads", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const state = window as typeof window & { fontLayoutShifts: number[] };
    state.fontLayoutShifts = [];
    new PerformanceObserver((list) => {
      for (const raw of list.getEntries()) {
        const entry = raw as PerformanceEntry & {
          hadRecentInput: boolean;
          value: number;
        };
        if (!entry.hadRecentInput) state.fontLayoutShifts.push(entry.value);
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.route("**/*.woff2", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    await route.continue();
  });
  for (const width of [320, 375, 430, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      );
    });
    const shift = await page.evaluate(() =>
      (
        window as typeof window & { fontLayoutShifts: number[] }
      ).fontLayoutShifts.reduce((sum, value) => sum + value, 0),
    );
    expect(shift, `Font layout shift at ${width}px`).toBeLessThan(0.005);
  }
});
