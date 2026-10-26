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

Checkout is a full UI with a **mock submit**. No payment gateway is connected yet; `onSubmit` in `components/Checkout.tsx` is where one goes. The WhatsApp number, email and support hours in `lib/catalog.ts` are placeholders.
