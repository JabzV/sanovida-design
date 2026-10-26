"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { images, type ImageId } from "@/lib/catalog";
import { useSite } from "./SiteContext";

interface MediaProps {
  id: ImageId;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** "cover" fills the box (photos); "contain" keeps the whole render (cut-outs). */
  fit?: "cover" | "contain";
  /** CSS object-position for cover images. */
  position?: string;
  /** Tint of the placeholder wash while the file is missing. */
  tint?: string;
  /** Custom placeholder content, e.g. a drawn box for product renders. */
  fallback?: ReactNode;
  /** Hide the id tag on the placeholder (for tiny thumbnails). */
  quiet?: boolean;
  style?: CSSProperties;
  /** JPEG/WebP quality for the optimizer (default 75). Raise it for large hero renders. */
  quality?: number;
}

/**
 * Renders `public/images/<file>` when it exists, otherwise a labelled
 * placeholder naming the manifest id, so the page always shows what goes where.
 */
export function Media({ id, alt, sizes, className = "", priority, fit = "cover", position, tint, fallback, quiet, style, quality }: MediaProps) {
  const { available, t } = useSite();
  const meta = images[id];

  if (available.has(id)) {
    return (
      <div className={`media ${className}`} style={style}>
        <Image src={`/images/${meta.file}`} alt={alt} fill sizes={sizes} priority={priority} quality={quality} style={{ objectFit: fit, objectPosition: position }} />
      </div>
    );
  }

  return (
    <div className={`media media--pending ${className}`} style={{ ...style, ["--tint" as string]: tint }} role="img" aria-label={alt}>
      {fallback}
      {!quiet && (
        <span className="media__tag" aria-hidden="true">
          <b>{id}</b> {meta.label}
          <small>
            {t.placeholder} · {meta.w}×{meta.h}
          </small>
        </span>
      )}
    </div>
  );
}
