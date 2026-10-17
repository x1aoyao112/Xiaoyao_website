import generatedAssets from "../content/.public-assets.json" with { type: "json" };
import type { ContentImage } from "@/types/content";

export type AssetManifest = Readonly<{
  images: readonly string[];
  resumes: readonly string[];
}>;
const assets: AssetManifest = generatedAssets;

export function validResume(url: string, manifest: AssetManifest = assets) {
  return manifest.resumes.includes(url) ? url : undefined;
}
export function validImage(
  image?: ContentImage,
  manifest: AssetManifest = assets,
) {
  if (
    !image ||
    !image.alt.trim() ||
    !Number.isInteger(image.width) ||
    !Number.isInteger(image.height) ||
    image.width <= 0 ||
    image.height <= 0
  )
    return;
  return manifest.images.includes(image.src) ? image : undefined;
}
