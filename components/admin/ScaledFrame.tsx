"use client";

import { useEffect, useRef } from "react";

/**
 * An iframe laid out at `width` CSS pixels and scaled down to fill its box,
 * so the live site previews as a miniature. The scale is measured (CSS `scale()`
 * cannot divide a percentage by a number), and follows the box when it resizes.
 */
export function ScaledFrame({ src, title, width, height }: { src: string; title: string; width: number; height: number }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const apply = () => el.style.setProperty("--pv-scale", String(el.clientWidth / width));
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div className="ad-preview__viewport" ref={box} style={{ aspectRatio: `${width} / ${height}` }}>
      <iframe src={src} title={title} loading="lazy" tabIndex={-1} style={{ width, height }} />
    </div>
  );
}
