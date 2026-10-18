import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, mkdir, symlink, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { projects, journal } from "./fixtures/portfolio.mjs";
import {
  publishedProjects,
  publishedJournal,
  categories,
  filterCategory,
  validDate,
  safeExternalUrl,
  emailUrl,
  socialDestinations,
  publicContentPaths,
} from "../src/lib/content.ts";
import {
  validImage,
  validResume,
  orderedImages,
} from "../src/lib/public-files.ts";
import { scanPublicAssets } from "../scripts/prepare-assets.mjs";
import { isActivePath } from "../src/config/navigation.ts";

test("publication gates exclude drafts, malformed and duplicate projects", () => {
  assert.deepEqual(
    publishedProjects(projects).map((p) => p.slug),
    ["published-fixture", "second-fixture"],
  );
  assert.equal(
    publishedProjects([
      { ...projects[0], title: "" },
      { ...projects[1], slug: "../unsafe" },
    ]).length,
    0,
  );
  assert.equal(
    publishedProjects([projects[0], { ...projects[0], published: false }])
      .length,
    0,
  );
});
test("filters include only populated published categories and handle invalid queries", () => {
  const visible = publishedProjects(projects);
  assert.deepEqual(categories(visible), ["Finance", "Personal Projects"]);
  assert.deepEqual(
    filterCategory(visible, "Finance").map((p) => p.slug),
    ["published-fixture"],
  );
  assert.equal(filterCategory(visible, "Accounting").length, 2);
  assert.deepEqual(categories([]), []);
});
test("journal gate excludes drafts and invalid articles, and sorts by date", () => {
  assert.deepEqual(
    publishedJournal(journal).map((p) => p.slug),
    ["second-note", "published-note"],
  );
  assert.deepEqual(
    publishedJournal([{ ...journal[0], date: "2026-02-30" }]),
    [],
  );
  assert.deepEqual(publishedJournal([{ ...journal[0], sections: [] }]), []);
  assert.deepEqual(publishedJournal([journal[0], journal[0]]), []);
  assert.equal(validDate("2030-01-01"), true);
  assert.equal(validDate("not-a-date"), false);
});
test("sitemap paths cannot include draft details or the private OS", () => {
  const paths = publicContentPaths(projects, journal);
  assert(paths.includes("/work/published-fixture"));
  assert(paths.includes("/journal/published-note"));
  assert(!paths.some((p) => p.includes("draft") || p.includes("workspace")));
});
test("external URLs reject unsafe protocols, credentials and placeholder hosts", () => {
  for (const value of [
    "",
    "#",
    "javascript:alert(1)",
    "data:text/html,test",
    "//github.com/user",
    "http://github.com/user",
    "https://name:password@github.com/user",
    "https://example.com",
    "https://localhost",
    " https://github.com/user",
  ])
    assert.equal(safeExternalUrl(value), undefined, value);
  assert.equal(
    safeExternalUrl("https://github.com/x1aoyao112"),
    "https://github.com/x1aoyao112",
  );
});
test("email links are validated and safely encoded", () => {
  for (const value of [
    "",
    "not-email",
    "x@example.com",
    "x@host..com",
    "x..y@ntu.edu.sg",
    "x@ntu.edu.sg\r\nBcc:y@ntu.edu.sg",
  ])
    assert.equal(emailUrl(value), undefined);
  assert.equal(
    emailUrl("fixture+test@ntu.edu.sg"),
    "mailto:fixture%2Btest@ntu.edu.sg",
  );
});
test("empty or invalid social configuration produces no links", () => {
  assert.deepEqual(
    socialDestinations({ email: "", linkedin: "", github: "" }),
    [],
  );
  assert.deepEqual(
    socialDestinations({
      email: "bad",
      linkedin: "https://github.com/user",
      github: "https://github.com.evil.invalid/user",
    }),
    [],
  );
});
test("valid social configuration produces email and safe external links", () => {
  const links = socialDestinations({
    email: "fixture@ntu.edu.sg",
    linkedin: "https://www.linkedin.com/in/fixture",
    github: "https://github.com/x1aoyao112",
  });
  assert.deepEqual(
    links.map((l) => l.label),
    ["Email", "LinkedIn", "GitHub"],
  );
  assert.equal(links[0].external, false);
  assert.equal(links[1].external, true);
});
test("resume and image links require verified local assets", () => {
  const manifest = {
    images: ["/images/fixture.png"],
    resumes: ["/fixture.pdf"],
  };
  assert.equal(validResume("/fixture.pdf", manifest), "/fixture.pdf");
  for (const value of [
    "",
    "/missing.pdf",
    "/../fixture.pdf",
    "https://github.com/resume.pdf",
  ])
    assert.equal(validResume(value, manifest), undefined);
  const image = {
    src: "/images/fixture.png",
    alt: "Test fixture",
    width: 1,
    height: 1,
  };
  assert.deepEqual(validImage(image, manifest), image);
  assert.equal(validImage({ ...image, alt: "" }, manifest), undefined);
  assert.equal(validImage({ ...image, width: 0 }, manifest), undefined);
  assert.equal(
    validImage({ ...image, src: "/missing.png" }, manifest),
    undefined,
  );
});
test("asset preparation rejects missing, disguised and symlinked files", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "xy-assets-"));
  try {
    await mkdir(path.join(root, "images"));
    await writeFile(
      path.join(root, "resume.pdf"),
      "%PDF-1.4\nTEST FIXTURE\n%%EOF",
    );
    await writeFile(path.join(root, "not-pdf.pdf"), "not a PDF");
    await writeFile(
      path.join(root, "images/valid.png"),
      Buffer.from("89504e470d0a1a0a", "hex"),
    );
    await writeFile(path.join(root, "images/not-image.png"), "not an image");
    await symlink(path.join(root, "resume.pdf"), path.join(root, "linked.pdf"));
    assert.deepEqual(await scanPublicAssets(root), {
      images: ["/images/valid.png"],
      resumes: ["/resume.pdf"],
    });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
test("active navigation handles detail paths without matching unrelated routes", () => {
  assert.equal(isActivePath("/work/published-fixture", "/work"), true);
  assert.equal(isActivePath("/workshop", "/work"), false);
  assert.equal(isActivePath("/about", "/"), false);
});

test("gallery order is editable, stable, optional, validated and non-mutating", () => {
  const manifest = { images: ["/a.png", "/b.png", "/c.png"], resumes: [] };
  const image = (src, order) => ({
    src,
    alt: "Fixture image",
    width: 900,
    height: 600,
    ...(order === undefined ? {} : { order }),
  });
  const entries = [
    image("/a.png", 20),
    image("/b.png", 10),
    image("/c.png", 10),
  ];
  assert.deepEqual(
    orderedImages(entries, manifest).map((i) => i.src),
    ["/b.png", "/c.png", "/a.png"],
  );
  assert.equal(entries[0].src, "/a.png");
  assert.deepEqual(
    orderedImages([image("/c.png"), image("/a.png")], manifest).map(
      (i) => i.src,
    ),
    ["/c.png", "/a.png"],
  );
  assert.deepEqual(
    orderedImages(
      [
        image("/missing.png", 0),
        image("/a.png", NaN),
        image("/b.png", Infinity),
        { ...image("/c.png", 1), alt: "" },
      ],
      manifest,
    ),
    [],
  );
  assert.deepEqual(orderedImages([], manifest), []);
});
