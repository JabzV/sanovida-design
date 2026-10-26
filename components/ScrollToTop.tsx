"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Starts every page at the top. Next.js only scrolls when it judges the new
 * page to be off-screen, and that check misses on the zoomed wide-screen
 * layout, so this does it explicitly. Hash links (e.g. #como-funciona) are
 * left to the browser so they still land on their section.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
