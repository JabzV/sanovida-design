"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { motion } from "motion/react";
import { images, type ImageId } from "@/lib/catalog";
import { EASE, pop, viewportOnce } from "./Motion";
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
  /**
   * How the image arrives: "zoom" settles from a slight enlargement on page
   * load (hero photos); "reveal" fades and grows in when scrolled into view.
   */
  enter?: "zoom" | "reveal";
}

const ENTER = {
  zoom: { initial: { scale: 1.08, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 1.4, ease: EASE } },
  reveal: { initial: "hidden", whileInView: "show", viewport: viewportOnce, variants: pop },
} as const;

/**
 * Renders `public/images/<file>` when it exists, otherwise a labelled
 * placeholder naming the manifest id, so the page always shows what goes where.
 */
export function Media({ id, alt, sizes, className = "", priority, fit = "cover", position, tint, fallback, quiet, style, quality, enter }: MediaProps) {
  const { available, t } = useSite();
  const meta = images[id];
  const motionProps = enter ? ENTER[enter] : {};

  if (available.has(id)) {
    return (
      <motion.div className={`media ${className}`} style={style} {...motionProps}>
        <Image src={`/images/${meta.file}`} alt={alt} fill sizes={sizes} priority={priority} quality={quality} style={{ objectFit: fit, objectPosition: position }} />
      </motion.div>
    );
  }

  return (
    <motion.div className={`media media--pending ${className}`} style={{ ...style, ["--tint" as string]: tint }} role="img" aria-label={alt} {...motionProps}>
      {fallback}
      {!quiet && (
        <span className="media__tag" aria-hidden="true">
          <b>{id}</b> {meta.label}
          <small>
            {t.placeholder} · {meta.w}×{meta.h}
          </small>
        </span>
      )}
    </motion.div>
  );
}
