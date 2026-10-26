# SANOVIDA.MX — Image List

Every image on the site has an ID. Until its file exists, the page shows a labelled placeholder with that ID, so you can see exactly where it goes.

**How to add an image:** save it in `public/images/` under the file name below, then refresh the page. No code changes are needed. (For a production build, run `npm run build` again.)

## Shared art direction

Apply this to every photo so they look like one shoot. It matches the reference in `references/Landing Page/`.

- **Light:** bright, warm Mediterranean morning sun. Soft shadows, never harsh.
- **Setting:** whitewashed stone terrace, sea and hills softly out of focus, pink bougainvillea, white jasmine and green leaves framing the edges.
- **Model:** one Latina woman, late 20s to 30s, long wavy brown hair, natural makeup, relaxed real smile. Cream or ivory linen clothes. The same woman in every photo.
- **Palette:** white, cream, linen beige, deep green leaves, soft pink flowers, gold accents. Avoid cold blues, neon and grey.
- **Do not show:** before/after comparisons, scales showing numbers, tape measures around a waist, needles, or anything that suggests a guaranteed result.
- **Packaging:** white box with the SanoVida logo (woman's profile in a pink circle with green leaves), "Orforglipron" in a serif font, the dosage, "30 TABLETS", and a colored wave across the bottom. The wave color identifies the dosage:

| Dosage | Box color |
|---|---|
| 0.8 mg | Sky blue `#3E8FD0` |
| 2.5 mg | Cobalt blue `#2449A6` |
| 5.5 mg | Jade green `#23824F` |
| 9 mg | Gold `#B48A3C` |
| 14.5 mg | Magenta `#C93A7C` |

**Formats:** JPG for photos, PNG with a **transparent background** for the single-box cut-outs (B, D1, F3), and PNG on **pure white** for the package packshots (C). Export at the size listed or larger.

**Hero photos (A1, A2, A5):** the headline, text and buttons sit on the **left 45%** of every hero, so keep that side bright and calm (sky, pale wall, soft blur). Put the woman in the **center-right** and leave room at the **top right** for the hand-written note.

---

## A. Page heroes

In the reference, Inicio, Producto, Paquetes and Checkout all use the **same shot** of the woman. Only the boxes in front of her change, and the site now places those in code using the B cut-outs (two on Inicio, three on Paquetes, none on Producto). The Checkout page shows a tighter head-and-shoulders crop of the same photo. So only two hero scenes are needed: the terrace shot and the phone shot for the App page.

| ID | File name | Size | Page | What to generate |
|---|---|---|---|---|
| **A1** | `a1-hero.jpg` | 2400×1350 | Inicio, Producto, Paquetes, Checkout | The woman stands on the sunny terrace, smiling slightly off-camera and looking up, in the center-right. **No boxes**: leave the stone ledge in the lower right empty and in soft focus, since the boxes are placed on it in code. Keep her head in the upper third, because Checkout crops to a wide band across the top of this photo. |
| **A2** | `a2-hero-mobile.jpg` | 1200×1500, portrait | Same pages (phones) | The same scene cropped for phones. The text covers the **top 60%**, so keep it light. Put the woman in the bottom half, slightly right, with the empty ledge in the lower right corner. **No boxes.** |
| **A5** | `a5-hero-app.jpg` | 2400×1350 | App | The woman holding a phone with both hands, looking at it and smiling. The phone screen faces away from the camera. Leaves framing the right edge. |

> A3, A4 and A6 were removed. Their pages now reuse A1.

**Status (27 Oct 2026):** A1, A5, B1–B5 and C1–C3 are in `public/images/`. Notes on the current files:

- The current **A1** already has the two boxes baked into the photo, so the in-code box ledge is switched off on Inicio and Paquetes for now. When a clean A1 (empty ledge) is generated, add `boxes` back on those two pages in `app/[lang]/page.tsx` and `app/[lang]/[slug]/page.tsx`.
- **A2** does not exist yet, so phones show A1 cropped.
- **A5** is the English-screen version. The Spanish version had garbled screen text, so it was not used. Its big phone also sits exactly where the hand-written note goes, so the note is hidden on the App page for now (`noHand` in `app/[lang]/[slug]/page.tsx`). Regenerate it with the phone screen facing away from the camera, as the brief says, and both problems go away.
- **B1–B5** are now transparent cut-outs (the 940×788 originals were trimmed to the box, about 450×680 each). Three colors are still off: 2.5 mg came out gold instead of cobalt, 9 mg pink instead of gold, 14.5 mg purple instead of magenta. The C packshots have the right colors, so use them as the reference when regenerating.
- **C1–C3** were delivered as JPG on white, so the manifest now points at `.jpg` files.

## B. Product boxes (one per dosage)

Same angle for all five: a three-quarter front view turned slightly to the right, studio light, a soft shadow underneath, **transparent background**. Used on the home page (box row), the product page (dosage cards), and composited onto the hero ledge on Inicio (B1 and B4) and Paquetes (B1, B4 and B3).

| ID | File name | Size | What to generate |
|---|---|---|---|
| **B1** | `b1-box-0-8mg.png` | 1200×1500 | Orforglipron **0.8 mg** box, sky-blue wave |
| **B2** | `b2-box-2-5mg.png` | 1200×1500 | Orforglipron **2.5 mg** box, cobalt-blue wave |
| **B3** | `b3-box-5-5mg.png` | 1200×1500 | Orforglipron **5.5 mg** box, jade-green wave |
| **B4** | `b4-box-9mg.png` | 1200×1500 | Orforglipron **9 mg** box, gold wave |
| **B5** | `b5-box-14-5mg.png` | 1200×1500 | Orforglipron **14.5 mg** box, magenta wave |

> Check that the dosage printed on each box is correct. The reference images had some boxes labelled wrong (for example "0.5 mg" on the 2.5 mg box).

## C. Package packshots

PNG on a **pure white background (#FFFFFF)**, square 1200×1200, same lighting and angle as B. Used in the package cards on the home page and the packages page (white cards, so the white background disappears) and in the checkout summary.

| ID | File name | Size | What to generate |
|---|---|---|---|
| **C1** | `c1-pack-1-month.png` | 1200×1200 | **One** box standing upright |
| **C2** | `c2-pack-3-months.png` | 1200×1200 | **Three** boxes grouped, the front one slightly forward |
| **C3** | `c3-pack-6-months.png` | 1200×1200 | **Six** boxes: three in front, three stacked behind |

> Use a mix of dosage colors so the image fits whichever dosage the customer picks.

### Generation prompts

Paste the **base description** first, then the line for the pack you want. Generate all three in one session so the box, lighting and camera stay identical.

**Base description (shared by C1–C3)**

```
Premium pharmaceutical product packshot, e-commerce catalog style. A rectangular white cardboard box, portrait orientation, proportions about 3 wide : 4 tall : 1.2 deep, matte finish with a thin gold foil edge. Front face printed with: a small circular logo at the top (a woman's profile in a pink circle with two green leaves), the brand name "SanoVida" in a deep green serif, the product name "Orforglipron" in a dark green serif, the dosage below it in smaller text, "30 TABLETS" in a small capital-letter label, and a smooth colored wave with tiny molecule dots sweeping across the bottom quarter of the box. Three-quarter front view turned slightly to the right so the left side panel is visible, camera at box height. Soft studio lighting from the upper left, gentle highlight on the top edge, one soft contact shadow under the box. Pure white seamless background, #FFFFFF, no horizon line, no surface texture, no props. Square format, product centered with about 12% empty margin on every side. Ultra sharp, photorealistic, 8k, color accurate.
```

**Negative prompt (all three)**

```
transparent background, checkerboard, gradient background, colored background, cream background, table, shelf, flowers, leaves, hands, people, pills outside the box, blister packs, reflections on glass, mirror floor, text other than the labels described, misspelled text, extra logos, watermark, border, frame, duplicated box faces, tilted camera
```

| ID | Pack line (add after the base description) |
|---|---|
| **C1** | `One single box standing upright. Dosage printed "0.8 mg". The wave at the bottom is sky blue (#3E8FD0).` |
| **C2** | `Three boxes standing in a tight group. The front box is gold (#B48A3C) and printed "9 mg", set slightly forward and to the left. Behind it to the right, a sky blue box (#3E8FD0) printed "0.8 mg". Behind that, a jade green box (#23824F) printed "5.5 mg". The boxes overlap slightly so the group reads as one bundle, all three front faces visible.` |
| **C3** | `Six boxes arranged in two rows of three. Front row, left to right: sky blue (#3E8FD0) "0.8 mg", gold (#B48A3C) "9 mg", jade green (#23824F) "5.5 mg". Back row, standing slightly higher and offset so their tops and upper labels show between the front boxes: cobalt blue (#2449A6) "2.5 mg", magenta (#C93A7C) "14.5 mg", gold (#B48A3C) "9 mg". The group reads as one generous bundle, no box fully hidden.` |

**Checks before saving:** the dosage text on each box matches its wave color (see the dosage table at the top), "Orforglipron" and "30 TABLETS" are spelled correctly, the background is pure white with no gray gradient, and the box edges are crisp.

## D. Product page, "Calidad en cada detalle"

| ID | File name | Size | What to generate |
|---|---|---|---|
| **D1** | `d1-box-tilted.png` | 1600×1400, transparent | A 0.8 mg box tilted about 10° to the left, with a green leaf sprig tucked behind one corner. Product-focused, elegant. Shown large in the middle of the section. |
| **D2** | `d2-box-corner.jpg` | 1000×1000 | Close-up of a box corner showing the premium finish: gold foil edge and the embossed logo. Shallow depth of field. First small square tile. |
| **D3** | `d3-tablets.jpg` | 1000×1000 | Macro shot of white oval tablets in a silver blister pack, cream background, soft light. Third small square tile. |

> The middle tile (logo seal) is drawn in code from the real logo, so it needs no image.

**Status (27 Oct 2026):** D1, D2 and D3 are in place. D1 is now the five-box lineup on white (2752×1536, JPG), shown whole on a wide white panel in the middle of the section; the manifest points at `.jpg`. D2 and D3 are awaiting regeneration with the prompts below.

### Generation prompts

Use the same box as the B cut-outs: white matte box, the SanoVida logo (woman's profile in a pink ring with green leaves), "SanoVida" in green serif, the pink tagline, "Orforglipron" in dark serif, the dosage, a "30 TABLETS" label, and a sky-blue wave with small molecule dots across the bottom with a thin gold line along it. If your generator accepts a reference image, attach `public/images/b1-box-0-8mg.png`.

**D1, tilted box** (`d1-box-tilted.png`, 1600×1400, transparent)

```
Premium product render of a single SanoVida Orforglipron 0.8 mg box, matching the reference box exactly: white matte box with the SanoVida logo, "Orforglipron", "0.8 mg", "30 TABLETS" and a sky-blue wave with molecule dots and a thin gold line along the bottom. The box stands upright, rotated about 10 degrees counter-clockwise and turned slightly to show its left side panel. A small sprig of fresh green leaves is tucked behind the lower left corner, peeking out. Soft studio light from the upper left, gentle highlight on the top edge, one soft shadow under the box. Fully transparent background, no floor, no props, no text other than the box labels. Sharp, photorealistic, product centered with a 10% margin.
```

**D2, the box up close** (`d2-box-corner.jpg`, 1000×1000). Attach `public/images/d1-box-tilted.jpg` as the reference image so it is the same box.

```
Close-up product photograph of the SanoVida Orforglipron 0.8 mg box from the reference image, same box exactly: cream matte card, sky-blue top panel and sky-blue base band with the molecule-dot wave and the thin gold line. Three-quarter view of the upper front corner, framed so the circular SanoVida logo (woman's profile in a pink ring with green leaves) and the green serif "SanoVida" wordmark are fully visible and sharp, with the gold line and blue wave softly out of focus at the bottom of the frame. The box stands on a cream linen surface, a small sprig of green leaves blurred in the background. Soft warm daylight from the upper left, shallow depth of field, premium packaging editorial style. Square 1:1, no hands, no extra text.
```

**D3, the tablets with the box** (`d3-tablets.jpg`, 1000×1000). Attach `public/images/d1-box-tilted.jpg` as the reference image.

```
Still-life product photograph on a cream linen surface. In the foreground, a silver foil blister strip with small white oval tablets, one tablet pressed out and resting beside it. Behind it, slightly out of focus, the SanoVida Orforglipron 0.8 mg box from the reference image, same box exactly: cream matte card with the sky-blue wave and gold line, standing upright with its front face toward the camera. Soft warm daylight from the upper left, shallow depth of field, gentle reflections on the foil. Calm pharmacy-boutique feel, cream, white, silver and a touch of sky blue. Square 1:1, no hands, no text other than the box labels, no markings on the tablets.
```

**Negative prompt (D1–D3)**

```
cluttered, dark, harsh flash, hands, people, pills spilled everywhere, syringe, needles, scale, tape measure, extra logos, misspelled text, watermark, border, frame, cream or colored background on D1
```

## E. Home page, app tiles

Four small landscape images (1300×1000, JPG) inside the white tiles under "App SanoVida gratis". The tiles crop to a 1.3:1 box with rounded corners, so keep the subject centered with a little breathing room. If E3 or E4 is ever missing, those two tiles fall back to a drawn chart and a drawn reminder card.

**Status (27 Oct 2026):** all four are in place (delivered at 2400×1792).

| ID | File name | Size | What to generate |
|---|---|---|---|
| **E1** | `e1-meal.jpg` | 1300×1000 | Overhead shot of a colorful healthy plate: grilled chicken, quinoa, greens, cherry tomatoes. Bright and appetizing. |
| **E2** | `e2-workout.jpg` | 1300×1000 | The woman doing a gentle floor exercise on a yoga mat in a bright living room, athletic cream outfit. |
| **E3** | `e3-progress.jpg` | 1300×1000 | A clean bar chart illustration: six rounded green bars rising left to right on a white card. |
| **E4** | `e4-reminder.jpg` | 1300×1000 | A reminder card illustration: a pink bell icon above the time "10:00" and a small "Tu dosis de hoy" label with a green check, on a cream card. |

### Generation prompts

**E1, nutrition plan**

```
Overhead food photograph, shot straight down. A round white ceramic plate with sliced grilled chicken breast, a bed of fluffy quinoa, fresh arugula and baby spinach, halved cherry tomatoes, avocado slices and a scatter of sesame seeds, lightly dressed with olive oil. The plate sits on a pale cream linen cloth beside a glass of water and a sprig of fresh herbs. Bright soft daylight from the side, gentle shadows, warm whites and fresh greens. Appetizing, clean, modern healthy-eating editorial style. Landscape 13:10, sharp focus, no people, no text.
```

**E2, home workouts**

```
Lifestyle photograph of a Latina woman in her late 20s with long wavy brown hair, doing a gentle floor stretch on a cream yoga mat in a bright living room: seated, one leg extended, reaching forward with a relaxed smile. She wears a cream athletic top and matching leggings. Behind her, soft-focus white walls, a linen sofa and a green houseplant in warm morning light. Natural makeup, relaxed and real, not posed. Warm whites, cream and soft green palette. Landscape 13:10, no text, no equipment other than the mat.
```

**E3, progress chart**

```
Minimal flat illustration for an app feature tile. A simple bar chart of six vertical bars with rounded tops rising steadily from left to right, in a fresh green gradient (#2F8A4F to #6BBF8A), standing on a thin light-gray baseline. Lots of empty space around it on a pure white background. No axis labels, no numbers, no grid, no text. Clean vector style, soft and friendly, landscape 13:10.
```

**E4, reminder**

```
Minimal flat illustration for an app feature tile. A rounded cream card (#FBF7F0) centered on a white background. On the card: a small pink outline bell icon (#D6397E) at the top, below it the time "10:00" in a dark green serif font, and under that a small label "Tu dosis de hoy" with a tiny green check mark. Generous padding, soft drop shadow, no other elements. Clean vector style, landscape 13:10. Spell the text exactly.
```

**Negative prompt (E1–E4)**

```
scales, tape measure, before and after, pills, needles, watermark, logo, blurry, cluttered, harsh flash, dark mood, extra text, misspelled text
```

## F. Closing bands

| ID | File name | Size | What to generate |
|---|---|---|---|
| **F1** | `f1-closing-home.jpg` | 2752×1536 | The woman with eyes closed, face to the sun, peaceful smile, on the terrace. **In place.** The band shows her at the far left and fades the photo into cream before the heading, so the boxes in the shot stay hidden. Used on the home and product pages. |
| **F2** | `f2-closing-packages.jpg` | 2400×800, wide | A different pose with the same feel: the woman laughing, hair in the breeze, on the **far left**. Packages page. **Until it arrives, the packages band reuses F1.** |
| **F3** | `f3-boxes-trio.jpg` | 2752×1536 | Three boxes in a row (0.8 mg blue, 9 mg gold, 5.5 mg green), front view. App page closing. **In place**, delivered on white, so it sits on a white panel with soft depth. |

### Generation prompt for F3

The slot sits on the left half of the app page's closing band, beside the "Tu bienestar completo en un solo lugar" heading and the gold Buy button. The band ground is a soft white-to-blush wash, so the file must be a **true transparent PNG** (or on pure white as a fallback). Attach `public/images/d1-box-tilted.jpg` as the reference image so the boxes match the rest of the site.

```
Premium product render of three SanoVida Orforglipron boxes standing side by side in a straight row, front faces toward the camera, same box design as the reference image exactly: cream matte card, the circular SanoVida logo (woman's profile in a pink ring with green leaves), "SanoVida" in green serif, the pink tagline "Natural Wellness for a Better You", "Orforglipron" in serif, the dosage, a small "30 TABLETS" label, and a colored wave with molecule dots and a thin gold line across the bottom. Left box: sky blue (#3E8FD0) top panel and wave, printed "0.8 mg". Middle box: gold (#B48A3C) top panel and wave, printed "9 mg". Right box: jade green (#23824F) top panel and wave, printed "5.5 mg". The boxes stand evenly spaced with a small gap between them, all three fully visible and the same size, camera at box height, a very slight three-quarter turn to the left so the left side panels are just visible. Soft studio daylight from the upper left, gentle highlight on the top edges, one soft contact shadow under each box. Fully transparent background, no floor, no props, no text other than the box labels. Sharp, photorealistic, landscape 16:10, the group centered with a 10% empty margin on every side.
```

**Negative prompt**

```
cluttered, dark, harsh flash, hands, people, leaves, flowers, stone ledge, cream or colored background, reflections on glass, mirror floor, extra boxes, overlapping boxes, misspelled text, wrong dosage, extra logos, watermark, border, frame
```

> Check that each box's dosage matches its color: blue 0.8 mg, gold 9 mg, green 5.5 mg.

## H. Section backgrounds

| ID | File name | Size | What to provide |
|---|---|---|---|
| **H1** | `h1-bg-packages.jpg` | 2752×1536 | Soft-focus greenery and small white flowers on a cream wash, empty in the middle. **In place.** Shown faded behind the "Elige tu paquete" section on the home page. |

## G. Brand

| ID | File name | Size | What to provide |
|---|---|---|---|
| **G1** | `g1-logo.png` | 3700×837, transparent | The full SanoVida logo (mark plus "SanoVida" and the tagline "Natural Wellness for a Better You"). In place, from `references/Logo/sanovida-logo-full.png`. Used in the header. |
| **G2** | `g2-logo-mark-white.png` | 2164×2050, transparent | The circular mark alone in white. In place, from `references/Logo/sanovida-white.png`. Used in the footer next to the light wordmark. |

> The app screens inside the phone mockups are drawn in code from sample data and labelled "Pantallas ilustrativas". When you have real Harbiz/SanoVida screenshots (1170×2532 PNG: progress, nutrition, workouts, measurements, reminders), send them and I'll swap them in.

---

## Priority order

1. **A1, A2:** the shared hero, the first thing every visitor sees on four pages.
2. **B1–B5:** the dosage boxes, which appear in the hero ledge, the box row and the dosage cards.
3. **C1–C3:** the package cards and the checkout summary.
4. **A5:** the app page hero.
5. **G1:** the real logo.
6. **D1–D3, E1–E2, F1–F3:** supporting photos.
