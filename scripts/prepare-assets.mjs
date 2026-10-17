import { readdir, open, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Build-time inventory only. Symlinks and unsupported paths are never published as content links.
export async function scanPublicAssets(root) {
  const manifest = { images: [], resumes: [] };
  async function walk(directory, prefix = "") {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const relative = `${prefix}/${entry.name}`;
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await walk(file, relative);
        continue;
      }
      if (
        !entry.isFile() ||
        !/^\/(?!\/)[a-zA-Z0-9/_-]+\.[a-zA-Z0-9]+$/.test(relative)
      )
        continue;
      const handle = await open(file, "r");
      const bytes = Buffer.alloc(32);
      try {
        await handle.read(bytes, 0, 32, 0);
      } finally {
        await handle.close();
      }
      if (
        /\.pdf$/i.test(relative) &&
        bytes.subarray(0, 5).toString() === "%PDF-"
      )
        manifest.resumes.push(relative);
      const png =
        /\.png$/i.test(relative) &&
        bytes
          .subarray(0, 8)
          .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
      const jpeg =
        /\.jpe?g$/i.test(relative) &&
        bytes.subarray(0, 3).equals(Buffer.from([255, 216, 255]));
      const webp =
        /\.webp$/i.test(relative) &&
        bytes.subarray(0, 4).toString() === "RIFF" &&
        bytes.subarray(8, 12).toString() === "WEBP";
      const avif =
        /\.avif$/i.test(relative) &&
        bytes.subarray(4, 8).toString() === "ftyp" &&
        /avif|avis/.test(bytes.subarray(8).toString());
      if (png || jpeg || webp || avif) manifest.images.push(relative);
    }
  }
  await walk(root);
  manifest.images.sort();
  manifest.resumes.sort();
  return manifest;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  const root = fileURLToPath(new URL("../public", import.meta.url));
  const manifest = await scanPublicAssets(root);
  await writeFile(
    new URL("../src/content/.public-assets.json", import.meta.url),
    JSON.stringify(manifest, null, 2) + "\n",
  );
  console.log(
    `Public assets checked: ${manifest.images.length} images, ${manifest.resumes.length} PDFs.`,
  );
}
