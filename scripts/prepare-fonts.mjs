import { createHash } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { inflateRawSync } from "node:zlib";

const manifest = JSON.parse(
  await readFile(new URL("./fonts.json", import.meta.url), "utf8"),
);
const directory = new URL("../src/app/fonts/", import.meta.url);
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");

// Read only the named original member. Never extract archive paths to disk.
function readZipMember(zip, member) {
  let end = zip.length - 22;
  const limit = Math.max(0, zip.length - 65_557);
  while (end >= limit && zip.readUInt32LE(end) !== 0x06054b50) end--;
  if (end < limit) throw new Error("Invalid Fontshare ZIP directory.");
  const count = zip.readUInt16LE(end + 10);
  if (count > 1000) throw new Error("Unexpected Fontshare archive size.");
  let cursor = zip.readUInt32LE(end + 16);
  for (let index = 0; index < count; index++) {
    if (zip.readUInt32LE(cursor) !== 0x02014b50)
      throw new Error("Invalid Fontshare ZIP entry.");
    const flags = zip.readUInt16LE(cursor + 8);
    const method = zip.readUInt16LE(cursor + 10);
    const compressedSize = zip.readUInt32LE(cursor + 20);
    const size = zip.readUInt32LE(cursor + 24);
    const nameLength = zip.readUInt16LE(cursor + 28);
    const extraLength = zip.readUInt16LE(cursor + 30);
    const commentLength = zip.readUInt16LE(cursor + 32);
    const name = zip
      .subarray(cursor + 46, cursor + 46 + nameLength)
      .toString("utf8");
    if (name === member) {
      if (flags & 1 || size > 2_000_000 || compressedSize > 2_000_000)
        throw new Error("Unsupported Fontshare ZIP member.");
      const local = zip.readUInt32LE(cursor + 42);
      if (zip.readUInt32LE(local) !== 0x04034b50)
        throw new Error("Invalid font member header.");
      const start =
        local +
        30 +
        zip.readUInt16LE(local + 26) +
        zip.readUInt16LE(local + 28);
      if (start + compressedSize > zip.length)
        throw new Error("Truncated font member.");
      const compressed = zip.subarray(start, start + compressedSize);
      let bytes;
      if (method === 0) bytes = compressed;
      else if (method === 8)
        bytes = inflateRawSync(compressed, { maxOutputLength: 2_000_000 });
      else throw new Error("Unsupported font ZIP compression.");
      if (bytes.length !== size) throw new Error("Truncated font data.");
      return bytes;
    }
    cursor += 46 + nameLength + extraLength + commentLength;
  }
  throw new Error(`Fontshare archive is missing ${member}.`);
}

if (
  manifest.length !== 2 ||
  manifest.flatMap(({ files }) => files).length !== 4
) {
  throw new Error(
    "Font manifest must contain Zodiak and all three Switzer weights.",
  );
}
await mkdir(directory, { recursive: true });
await Promise.all(
  manifest.map(async ({ family, url, files }) => {
    const missing = [];
    for (const font of files) {
      try {
        if (hash(await readFile(new URL(font.file, directory))) === font.sha256)
          continue;
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }
      missing.push(font);
    }
    if (!missing.length) return;

    // Each builder obtains its own original licensed copy, directly from Fontshare.
    const response = await fetch(url, {
      signal: AbortSignal.timeout(30_000),
      redirect: "error",
    });
    if (!response.ok)
      throw new Error(
        `Fontshare returned ${response.status} for ${family}. Allow api.fontshare.com, then rerun npm run fonts:prepare.`,
      );
    const archive = Buffer.from(await response.arrayBuffer());
    if (archive.length > 8_000_000)
      throw new Error("Unexpected Fontshare archive size.");
    for (const { file, member, sha256 } of missing) {
      const bytes = readZipMember(archive, member);
      if (
        bytes.subarray(0, 4).toString() !== "wOF2" ||
        hash(bytes) !== sha256
      ) {
        throw new Error(
          `Font verification failed for ${file}; refusing to use or replace the expected checksum.`,
        );
      }
      const temporary = new URL(`${file}.${process.pid}.tmp`, directory);
      try {
        await writeFile(temporary, bytes, { flag: "wx" });
        await rename(temporary, new URL(file, directory));
      } finally {
        await rm(temporary, { force: true });
      }
    }
  }),
);
console.log(
  "Zodiak and Switzer ready: four original Fontshare files verified, no substitutions.",
);
