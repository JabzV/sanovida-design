# SANOVIDA.MX

Multi-page marketing site with checkout for SanoVida Orforglipron and the SanoVida app. Spanish (Mexico) is the default; English is a second locale.

- Brief: [docs/PROJECT_BRIEF.md](docs/PROJECT_BRIEF.md)
- Image list (IDs A1–G1): [docs/IMAGE_LIST.md](docs/IMAGE_LIST.md)
- Visual reference: `references/Landing Page/` (desktop 1–5 are the five pages)

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Pages

| Reference | Spanish | English |
|---|---|---|
| 1 · Inicio | `/` | `/en` |
| 2 · Producto | `/producto` | `/en/product` |
| 3 · Paquetes | `/paquetes` | `/en/packages` |
| 4 · App | `/app` | `/en/app` |
| 5 · Checkout | `/checkout` | `/en/checkout` |
| Preguntas frecuentes | `/preguntas-frecuentes` | `/en/faq` |

"Cómo funciona" in the nav links to that section of the home page. Buy buttons link to `/checkout?plan=3m&dosis=0.8` so the chosen package and dosage are preselected.

## Where things live

| What | Where |
|---|---|
| Prices, dosages, dosage colors, contact details, image manifest | `lib/catalog.ts` |
| All copy (Spanish and English) | `lib/i18n.ts` |
| URL slugs per locale | `lib/routes.ts` |
| Pages | `app/[lang]/page.tsx` (home) and `app/[lang]/[slug]/page.tsx` (the rest) |
| Sections | `components/` (`home/`, `product/`, `packages/`, `app/`, plus shared) |
| Styles and design tokens | `app/globals.css` |
| Images | `public/images/` (any missing file shows a labelled placeholder) |

## Phones

Below 768px the page follows `references/Landing Page/Moblie View` (1–5): the same multi-column compositions as the desktop, drawn for a **400px-wide screen** and zoomed to the real viewport with CSS `zoom` (320px → 0.8×, 390px → 0.975×, 430px → 1.075×, capped at 1.3× from 520px). Every phone therefore shows the same picture. All phone rules live in the `@media (max-width: 767px)` block at the end of `app/globals.css`; elements that exist only in the phone layout (extra phones in the fan, the product close-ups, the pay strip, the mobile trust row) carry the `m-only` class and are hidden from 768px up.

## Motion

Animations use [Motion](https://motion.dev) (`motion/react`). The shared vocabulary lives in `components/Motion.tsx`: `fadeUp` and `pop` variants, `stagger()` for containers, `revealList()` for lists that reveal on scroll, `lift` for hover, and `MotionProvider`, which honours the visitor's reduced-motion setting. Heroes cascade in on load, sections and lists reveal once on scroll, buttons and cards react to hover, the hand-written swash draws itself, and the progress ring and chart in the phone screens draw in. Elements that carry a CSS `transform` of their own (the phone fan, the popular plan card, drawn boxes) are either animated through a wrapper or positioned with `translate`, so Motion's inline transform never overrides them.

Checkout is a full UI with a **mock submit**. No payment gateway is connected yet; `onSubmit` in `components/Checkout.tsx` is where one goes. The WhatsApp number, email and support hours in `lib/catalog.ts` are placeholders.
