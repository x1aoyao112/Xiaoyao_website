// Builds a disposable copy with synthetic content. The real checkout stays empty of fixtures.
import { cp, mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile, spawn } from "node:child_process";
import { promisify } from "node:util";
import { once } from "node:events";
import { deflateSync, crc32 } from "node:zlib";
import assert from "node:assert/strict";
import AxeBuilder from "@axe-core/playwright";
import { chromium, expect } from "@playwright/test";
import { projects, journal } from "../tests/fixtures/portfolio.mjs";
import { profile } from "../src/content/profile.ts";

const run = promisify(execFile);
const source = fileURLToPath(new URL("..", import.meta.url));
const root = await mkdtemp(path.join(tmpdir(), "xy-portfolio-fixtures-"));
let server;
let browser;
let serverLog = "";
try {
  console.log(
    "Preparing an isolated fixture build (no Git checkout or production content changes).",
  );
  for (const name of [
    "src",
    "public",
    "scripts",
    "next.config.ts",
    "next-env.d.ts",
    "tsconfig.json",
    "package.json",
    "package-lock.json",
  ]) {
    await cp(path.join(source, name), path.join(root, name), {
      recursive: true,
      verbatimSymlinks: true,
    });
  }
  await cp(path.join(source, "node_modules"), path.join(root, "node_modules"), {
    recursive: true,
    verbatimSymlinks: true,
  });
  const content = async (name, value) => {
    const types = {
      projects: "PortfolioProject",
      journal: "JournalEntry",
      profile: "Profile",
      currently: "CurrentNote",
      skills: "SkillGroup",
      experience: "ExperienceEntry",
      "about-photos": "PersonalPhoto",
    };
    await writeFile(
      path.join(root, `src/content/${name}.ts`),
      `import type { ${types[name]} } from "@/types/content"; export const ${name === "about-photos" ? "moments" : name}: ${name === "profile" ? "Profile" : `readonly ${types[name]}[]`} = ${JSON.stringify(value)};\n`,
    );
  };
  await content("projects", projects);
  await content("journal", journal);
  await content("profile", {
    ...profile,
    portrait: {
      src: "/images/fixture-portrait.png",
      alt: "Synthetic portrait layout fixture",
      width: 600,
      height: 800,
      caption: "Test-only portrait caption",
    },
    interests: [
      {
        title: "Business & Finance",
        description: "Test-only authentic-description slot.",
      },
      { title: "Technology", description: "" },
    ],
    resume: { url: "/fixture-resume.pdf", label: "Download resume" },
  });
  await content("currently", [
    { label: "Fixture activity", text: "Test-only current note." },
  ]);
  await content("skills", [
    { title: "Fixture skills", skills: ["Test-only skill"] },
  ]);
  await content("experience", [
    {
      id: "fixture-experience",
      category: "Work & internships",
      title: "Fixture experience",
      period: "Test period",
      sortYear: 2026,
      description: ["Synthetic experience, not a personal claim."],
    },
  ]);
  await writeFile(
    path.join(root, "src/content/social-links.ts"),
    'export const socialLinks = {email:"fixture@ntu.edu.sg",linkedin:"https://www.linkedin.com/in/fixture",github:"https://github.com/x1aoyao112"}; export const otherSocialLinks = [];\n',
  );
  const sitePath = path.join(root, "src/config/site.ts");
  await writeFile(
    sitePath,
    (await readFile(sitePath, "utf8")).replace(
      'url: ""',
      'url: "https://portfolio-fixture.vercel.app"',
    ),
  );
  // Valid blank one-page PDF, solely for testing download mechanics in this temporary server.
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] >>",
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (let i = 0; i < objects.length; i++) {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
  }
  const xref = Buffer.byteLength(pdf);
  pdf += `xref\n0 4\n0000000000 65535 f \n${offsets
    .slice(1)
    .map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`)
    .join("")}trailer\n<< /Size 4 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  await mkdir(path.join(root, "public/images"), { recursive: true });
  await writeFile(path.join(root, "public/fixture-resume.pdf"), pdf);
  const chunk = (type, data) => {
    const result = Buffer.alloc(data.length + 12);
    result.writeUInt32BE(data.length, 0);
    result.write(type, 4);
    data.copy(result, 8);
    result.writeUInt32BE(
      crc32(result.subarray(4, data.length + 8)),
      data.length + 8,
    );
    return result;
  };
  const header = Buffer.alloc(13);
  header.writeUInt32BE(1, 0);
  header.writeUInt32BE(1, 4);
  header[8] = 8;
  header[9] = 6;
  await writeFile(
    path.join(root, "public/images/fixture.png"),
    Buffer.concat([
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
      chunk("IHDR", header),
      chunk("IDAT", deflateSync(Buffer.from([0, 0, 0, 0, 0]))),
      chunk("IEND", Buffer.alloc(0)),
    ]),
  );
  // Solid-color layout fixtures only; never committed as personal photographs.
  for (const [filename, width, height, color] of [
    ["fixture-portrait.png", 600, 800, [220, 235, 250, 255]],
    ["fixture-landscape.png", 900, 600, [255, 240, 184, 255]],
  ]) {
    const ihdr = Buffer.from(header);
    ihdr.writeUInt32BE(width, 0);
    ihdr.writeUInt32BE(height, 4);
    const scanlines = Buffer.alloc((width * 4 + 1) * height);
    for (let y = 0; y < height; y++)
      for (let x = 0; x < width; x++) {
        scanlines.set(color, y * (width * 4 + 1) + 1 + x * 4);
      }
    await writeFile(
      path.join(root, "public/images", filename),
      Buffer.concat([
        Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
        chunk("IHDR", ihdr),
        chunk("IDAT", deflateSync(scanlines)),
        chunk("IEND", Buffer.alloc(0)),
      ]),
    );
  }
  await content("about-photos", [
    {
      src: "/images/fixture-landscape.png",
      alt: "Synthetic landscape layout fixture",
      width: 900,
      height: 600,
      caption: "Test-only landscape caption",
      order: 20,
    },
    {
      src: "/images/fixture-portrait.png",
      alt: "Synthetic gallery portrait fixture",
      width: 600,
      height: 800,
      order: 10,
    },
    {
      src: "/images/missing.png",
      alt: "Missing fixture",
      width: 600,
      height: 800,
      order: 1,
    },
    { src: "/images/fixture.png", alt: "", width: 1, height: 1, order: 2 },
  ]);
  const fixtureProjects = projects.map((p, i) =>
    i === 0
      ? {
          ...p,
          coverImage: {
            src: "/images/fixture.png",
            alt: "Test-only fixture image",
            width: 1,
            height: 1,
          },
        }
      : p,
  );
  await content("projects", fixtureProjects);
  console.log("Building isolated published/draft fixtures.");
  await run(
    process.platform === "win32" ? "npm.cmd" : "npm",
    ["run", "build"],
    { cwd: root, maxBuffer: 4_000_000 },
  );
  server = spawn(
    process.execPath,
    [
      path.join(root, "node_modules/next/dist/bin/next"),
      "start",
      "--port",
      "3120",
    ],
    { cwd: root, stdio: ["ignore", "pipe", "pipe"] },
  );
  server.stdout.on("data", (data) => (serverLog += data));
  server.stderr.on("data", (data) => (serverLog += data));
  const base = "http://127.0.0.1:3120";
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    if (server.exitCode !== null) throw new Error(serverLog);
    try {
      if ((await fetch(base)).ok) {
        ready = true;
        break;
      }
    } catch {
      // The child server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  assert(ready, "Fixture server did not start.");
  browser = await chromium.launch({
    ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : {}),
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(base);
  assert.equal(
    await page
      .getByRole("heading", { name: "Published fixture project", exact: true })
      .count(),
    1,
  );
  assert.equal(
    await page
      .getByRole("heading", { name: "Second fixture project", exact: true })
      .count(),
    0,
  );
  assert.equal(await page.getByText("Test-only current note.").count(), 1);
  await page.goto(`${base}/about`);
  await expect(
    page.getByRole("img", {
      name: "Synthetic portrait layout fixture",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByText("Test-only portrait caption", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Test-only authentic-description slot."),
  ).toBeVisible();
  const gallery = page.getByRole("region", { name: "Little moments." });
  await expect(gallery.getByRole("img")).toHaveCount(2);
  assert.deepEqual(
    await gallery
      .getByRole("img")
      .evaluateAll((images) => images.map((image) => image.alt)),
    [
      "Synthetic gallery portrait fixture",
      "Synthetic landscape layout fixture",
    ],
  );
  for (const theme of ["light", "dark"]) {
    await page.evaluate((theme) => {
      localStorage.setItem("theme", theme);
    }, theme);
    await page.reload();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    assert.deepEqual(
      result.violations,
      [],
      `Configured photo accessibility: ${theme}`,
    );
    for (const width of [320, 375, 430, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(() => document.fonts.ready);
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
      for (const image of await page.locator("main img").all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveJSProperty("complete", true);
        assert(await image.evaluate((image) => image.naturalWidth > 0));
        const box = await image.boundingBox();
        const ratio = await image.evaluate(
          (image) =>
            Number(image.getAttribute("width")) /
            Number(image.getAttribute("height")),
        );
        assert(
          Math.abs(box.width / box.height - ratio) < 0.01,
          "Photos retain their aspect ratio",
        );
      }
      await page.screenshot({
        path: `/tmp/xy-sprint31-photos-${width}-${theme}.png`,
        fullPage: true,
      });
    }
  }
  await page.goto(`${base}/work`);
  assert.equal(await page.locator("main article").count(), 2);
  assert.equal(
    await page.getByRole("link", { name: "Accounting", exact: true }).count(),
    0,
  );
  await page
    .getByRole("navigation", { name: "Project categories" })
    .getByRole("link", { name: "Finance", exact: true })
    .click();
  await expect(page.locator("main article")).toHaveCount(1);
  await page.getByRole("link", { name: "Published fixture project" }).click();
  await page
    .getByRole("heading", {
      level: 1,
      name: "Published fixture project",
      exact: true,
    })
    .waitFor();
  assert.equal(
    await page.getByText("My individual fixture contribution.").count(),
    1,
  );
  assert.equal(await page.getByText("A fixture team outcome.").count(), 1);
  assert.equal(
    await page.getByRole("heading", { name: "Problem or objective" }).count(),
    0,
  );
  assert.equal(
    await page.getByRole("link", { name: "Unsafe link" }).count(),
    0,
  );
  assert.equal(
    await page.getByRole("img", { name: "Test-only fixture image" }).count(),
    1,
  );
  const imageUrl = await page
    .getByRole("img", { name: "Test-only fixture image" })
    .evaluate((image) => image.currentSrc || image.src);
  assert(
    (await fetch(imageUrl)).ok,
    "Optional image optimizer must return a real image.",
  );
  assert.match(
    await page.title(),
    /^Published fixture project \| XY's Side Notes$/,
  );
  await page.goto(`${base}/journal`);
  assert.equal(await page.locator("main article").count(), 2);
  await page
    .getByRole("navigation", { name: "Journal categories" })
    .getByRole("link", { name: "Technology", exact: true })
    .click();
  await expect(page.locator("main article")).toHaveCount(1);
  await page
    .getByRole("link", { name: "Published fixture note", exact: true })
    .click();
  await page
    .getByRole("heading", {
      level: 1,
      name: "Published fixture note",
      exact: true,
    })
    .waitFor();
  assert.equal(await page.getByText("A fixture article paragraph.").count(), 1);
  assert.equal(await page.getByText("#fixture", { exact: true }).count(), 1);
  await page.goto(`${base}/contact`);
  assert.equal(await page.locator("main a").count(), 3);
  assert.equal(
    await page
      .locator('main a[target="_blank"][rel="noopener noreferrer"]')
      .count(),
    2,
  );
  await page.goto(`${base}/recruiter`);
  assert.equal(
    await page.getByText("Test-only skill", { exact: true }).count(),
    1,
  );
  assert.equal(
    await page.getByRole("heading", { name: "Fixture experience" }).count(),
    1,
  );
  const downloadPromise = page.waitForEvent("download");
  await page
    .getByRole("link", { name: "Download resume", exact: true })
    .click();
  assert.equal(
    (await downloadPromise).suggestedFilename(),
    "fixture-resume.pdf",
  );
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  assert(
    sitemap.includes("/work/published-fixture") &&
      sitemap.includes("/journal/published-note"),
  );
  assert(!sitemap.includes("draft") && !sitemap.includes("workspace"));
  for (const route of ["/work/draft-fixture", "/journal/draft-note"]) {
    const response = await fetch(base + route);
    assert.equal(response.status, 404);
    assert(!(await response.text()).includes("Secret draft"));
  }
  for (const width of [320, 375, 430, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/work/published-fixture",
      "/journal/published-note",
      "/recruiter",
    ]) {
      await page.goto(base + route);
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
    }
  }
  assert.deepEqual(errors, []);
  console.log(
    "PASS: isolated production fixtures verify real category navigation, featured selection, project/article details, omitted sections, safe links, optional image, skills/experience/current notes, social visibility, PDF download, published-only sitemap, direct draft 404s, responsive detail pages, configured portrait/gallery ordering, captions, invalid-photo omission, and photo aspect ratios/accessibility in both themes at five widths.",
  );
} catch (error) {
  if (serverLog) console.error(serverLog);
  throw error;
} finally {
  if (browser) await browser.close();
  if (server && server.exitCode === null) {
    const exited = once(server, "exit");
    server.kill("SIGTERM");
    await exited;
  }
  await rm(root, { recursive: true, force: true });
}
