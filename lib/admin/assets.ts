/** Images used by the admin panel. Every file lives under `public/admin-images/`. */
export const adminImages = {
  logo: { file: "logo.png", w: 3700, h: 837 },
  /** Splash art shown on every drawn phone screen. */
  splash: { file: "phone-splash.png", w: 1920, h: 1080 },
  B1: { file: "b1-box-0-8mg.png", w: 447, h: 687 },
  B2: { file: "b2-box-2-5mg.png", w: 451, h: 659 },
  B3: { file: "b3-box-5-5mg.png", w: 451, h: 671 },
  B4: { file: "b4-box-9mg.png", w: 459, h: 679 },
  B5: { file: "b5-box-14-5mg.png", w: 461, h: 679 },
} as const;

export type AdminImageKey = keyof typeof adminImages;

export const adminImg = (key: AdminImageKey) => `/admin-images/${adminImages[key].file}`;

/** Box render for a dosage, keyed by the catalog's `image` id (B1…B5). */
export function adminBox(image: string) {
  const key = (image in adminImages ? image : "B1") as AdminImageKey;
  return { src: adminImg(key), ...adminImages[key] };
}
