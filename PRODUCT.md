# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router, TypeScript, Tailwind CSS v4), chosen by the user. Locale routing: Spanish (Mexico) at `/`, English at `/en`.

## Users

Adult women in Mexico who want to lose weight and are looking for a product plus guidance they can follow at home. They arrive mostly from social or paid traffic on a phone, decide quickly, and buy in one visit when the offer is clear and the purchase feels safe.

## Product Purpose

SANOVIDA.MX sells Orforglipron tablets (oral, once daily) in five dosages and three package lengths. Every purchase includes free access to the SANOVIDA.MX app. Success means a visitor understands the product, chooses a dosage and package, and completes checkout on a single page.

## Positioning

More than pills: one brand that bundles the product, nutrition plans, workout plans, and a personal tracking app (a white-label of Harbiz). Competitors sell the tablet; SANOVIDA.MX sells the full program.

## Operating Context

- Seven pages: Inicio (home, with product, packages, app and how-it-works sections), Producto, Paquetes, App, Cómo funciona (added 27 Oct 2026, not in the reference screens; built in the same visual world), Checkout and Preguntas frecuentes. Spanish slugs at the root, English under `/en`.
- After purchase, the customer receives an order confirmation and app access instructions by email.
- Payment methods shown: card, Mercado Pago, PayPal. Shipping across Mexico.

## Capabilities and Constraints

- Dosages: 0.8 mg, 2.5 mg, 5.5 mg, 9 mg, 14.5 mg. 30 tablets per box.
- Packages (placeholder prices taken from the reference, confirmed as placeholders by the user):
  - 1 month: $1,990 MXN
  - 3 months: $5,490 MXN (save 8%)
  - 6 months: $9,990 MXN (save 16%)
- Checkout is a full UI with a mock submit. No payment gateway is connected yet.
- Open decision: whether prices differ by dosage. Currently every dosage costs the same.
- Open decision: final payment provider.

## Brand Commitments

- Name: SanoVida / SANOVIDA.MX. Tagline in the reference: "Natural Wellness for a Better You".
- Visual reference supplied by the user (binding; the build must stay very close to it): `references/Landing Page/` (desktop 1–5 are the five pages, mobile 1–5 their phone layouts). Mediterranean daylight, flowers, white and cream ground, deep green type, pink accent, gold call-to-action buttons, and a distinct box color for each dosage (blue, deep blue, green, gold, magenta).
- Brand concept "8 kilos en 10 días" may appear only as a concept, never as a guaranteed result, and always with a disclaimer.

## Evidence on Hand

- No customer numbers, testimonials, clinical data, or guarantees yet. Do not write "miles de mujeres", "satisfacción garantizada", or results claims.
- No final photography, product renders, logo files, or app screenshots yet. The site uses labeled placeholders (see `docs/IMAGE_LIST.md`).

## Product Principles

1. Clarity first: the offer, the price, and the next step are always visible.
2. Honest by default: no unproven claims, with medical caution in the copy.
3. One page, one decision path: dosage, then package, then checkout.
4. The app is part of the product, not a bonus footnote.

## Accessibility & Inclusion

Spanish (Mexico) is the default and English is secondary. Mobile-first. WCAG AA contrast and full keyboard support.
