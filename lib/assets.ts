import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";
import { images, type ImageId } from "./catalog";

/** Manifest ids whose file exists in public/images. The rest render as labelled placeholders. */
export function getAvailableImages(): ImageId[] {
  const dir = path.join(process.cwd(), "public", "images");
  return (Object.keys(images) as ImageId[]).filter((id) => existsSync(path.join(dir, images[id].file)));
}
