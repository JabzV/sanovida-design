"use client";

import { fadeUp } from "./Motion";
import { StoreBadges } from "./Ui";

/** The store badges inside the app hero, joining the copy's entrance cascade. */
export function HeroStores() {
  return <StoreBadges className="phero__stores" variants={fadeUp} />;
}
