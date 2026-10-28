"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * An iframe laid out at `width` CSS pixels and scaled down to fill its box,
 * so the live site previews as a miniature. The scale is measured (CSS `scale()`
 * cannot divide a percentage by a number), and follows the box when it resizes.
 *
 * `target` scrolls the previewed page (same origin) to a section: "top", "bottom"
 * or a CSS selector. The `src` should carry a matching fragment too, so the site's
 * own scroll-to-top leaves the page alone when it hydrates.
 */
export function ScaledFrame({ src, title, width, height, target = "top" }: { src: string; title: string; width: number; height: number; target?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const loaded = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const apply = () => el.style.setProperty("--pv-scale", String(el.clientWidth / width));
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  // Always instant: smooth scrolling inside a scaled iframe is throttled to a crawl.
  const scrollTo = useCallback(
    () => {
      const win = frame.current?.contentWindow;
      if (!win) return;
      try {
        const doc = win.document;
        if (target === "top") win.scrollTo({ top: 0, behavior: "instant" });
        else if (target === "bottom") win.scrollTo({ top: doc.documentElement.scrollHeight, behavior: "instant" });
        else {
          // Not scrollIntoView: that would also scroll the admin page to bring the frame into view.
          const node = doc.querySelector(target);
          const section = node?.closest("section") ?? node;
          if (!section) return;
          const pad = parseFloat(win.getComputedStyle(doc.documentElement).scrollPaddingTop) || 0;
          win.scrollTo({ top: section.getBoundingClientRect().top + win.scrollY - pad, behavior: "instant" });
        }
      } catch {
        /* cross-origin preview: nothing to scroll */
      }
    },
    [target],
  );

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  // A reload (new document) applies the target now and again while the page
  // hydrates and its images settle, since both can move the scroll position.
  const settle = useCallback(() => {
    clearTimers();
    timers.current = [300, 1000, 2000, 3500].map((ms) => window.setTimeout(() => scrollTo(), ms));
  }, [scrollTo]);

  useEffect(() => {
    loaded.current = false;
  }, [src]);

  useEffect(() => {
    if (loaded.current) {
      clearTimers();
      scrollTo();
    }
  }, [scrollTo]);

  useEffect(() => clearTimers, []);

  return (
    <div className="ad-preview__viewport" ref={box} style={{ aspectRatio: `${width} / ${height}` }}>
      <iframe
        ref={frame}
        src={src}
        title={title}
        loading="lazy"
        tabIndex={-1}
        style={{ width, height }}
        onLoad={() => {
          loaded.current = true;
          scrollTo();
          settle();
        }}
      />
    </div>
  );
}
