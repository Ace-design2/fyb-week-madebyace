import { list } from "@vercel/blob";
import type { ImageProps } from "./types";
import metadata from "../image-metadata.json";

let cached: ImageProps[] | null = null;

export default async function getResults(): Promise<ImageProps[]> {
  if (cached) return cached;

  console.log("Fetching blobs from Vercel Blob...");
  const { blobs } = await list();
  
  const sorted = blobs.sort((a, b) => (a.pathname > b.pathname ? 1 : -1));

  // Map blobs to their pre-generated metadata
  cached = sorted.map((blob, id) => {
    const filename = blob.pathname.replace("images/", "");
    const meta = metadata[filename];
    
    return {
      id,
      url: blob.url,
      width: meta?.width || 1920,
      height: meta?.height || 1080,
      blurDataUrl: meta?.blurDataUrl || "",
    };
  });

  console.log(`Successfully loaded ${cached.length} images with pre-generated metadata instantly!`);

  return cached;
}
