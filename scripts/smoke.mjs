import assert from "node:assert/strict";

const base = process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000";
const home = await fetch(new URL("/", base));
assert.equal(home.status, 200);
const html = await home.text();
assert.match(html, /THE XIAOYAO SYSTEM/);
assert.match(html, /A life built/);
assert.match(html, /lang="en"/);
const gallery = await fetch(new URL("/design-system", base));
assert.equal(gallery.status, 200);
const galleryHtml = await gallery.text();
assert.match(galleryHtml, /Public design preview/);
assert.match(galleryHtml, /illustrative entries/);
assert.match(galleryHtml, /Adjust sample progress/);
for (const path of [
  "/workspace",
  "/workspace/settings",
  "/workspace?preview=true",
]) {
  const response = await fetch(new URL(path, base), { redirect: "manual" });
  assert.equal(response.status, 404, `${path} must remain unavailable`);
}
console.log(
  "PASS: public homepage and component gallery render; private workspace requests return 404.",
);
