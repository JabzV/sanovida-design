/* Product data shared by both locales. Prices are placeholders from the reference. */

export type DosageId = "0.8" | "2.5" | "5.5" | "9" | "14.5";
export type PlanId = "1m" | "3m" | "6m";

export interface Dosage {
  id: DosageId;
  /** Box colour of this dosage, used for its pill, rail and highlights. */
  color: string;
  /** Soft wash of the same hue for pills and backgrounds. */
  wash: string;
  /** Image manifest id of the box render. */
  image: ImageId;
}

export const dosages: Dosage[] = [
  { id: "0.8", color: "#3E8FD0", wash: "#E3F0FA", image: "B1" },
  { id: "2.5", color: "#2449A6", wash: "#E4E9F7", image: "B2" },
  { id: "5.5", color: "#23824F", wash: "#E2F1E8", image: "B3" },
  { id: "9", color: "#B48A3C", wash: "#F6EDDC", image: "B4" },
  { id: "14.5", color: "#C93A7C", wash: "#FBE6F0", image: "B5" },
];

export const DEFAULT_DOSAGE: DosageId = "0.8";
export const DEFAULT_PLAN: PlanId = "3m";

export interface Plan {
  id: PlanId;
  months: number;
  boxes: number;
  price: number;
  /** Price of the same number of single-month boxes. */
  listPrice: number;
  savePct: number;
  image: ImageId;
  popular?: boolean;
}

export const plans: Plan[] = [
  { id: "1m", months: 1, boxes: 1, price: 1990, listPrice: 1990, savePct: 0, image: "C1" },
  { id: "3m", months: 3, boxes: 3, price: 5490, listPrice: 5970, savePct: 8, image: "C2", popular: true },
  { id: "6m", months: 6, boxes: 6, price: 9990, listPrice: 11940, savePct: 16, image: "C3" },
];

export const SHIPPING_COST = 0;

export function isDosageId(v: unknown): v is DosageId {
  return dosages.some((d) => d.id === v);
}

export function isPlanId(v: unknown): v is PlanId {
  return plans.some((p) => p.id === v);
}

export function getDosage(id: DosageId) {
  return dosages.find((d) => d.id === id)!;
}

export function getPlan(id: PlanId) {
  return plans.find((p) => p.id === id)!;
}

/* Both locales print "$1,990" (the page adds "MXN" after it), as the reference does;
   en-US formatting would give "MX$1,990", which breaks the price lines on phones. */
export function formatMXN(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Placeholder contact details until the real ones are confirmed. */
export const contact = {
  whatsapp: "+52 55 1234 5678",
  whatsappHref: "https://wa.me/525512345678",
  email: "hola@sanovida.mx",
  hours: "Lun – Vie · 8:00 – 20:00 h (CDMX)",
  hoursEn: "Mon – Fri · 8:00 – 20:00 (CDMX)",
};

export const mexicanStates = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua",
  "Ciudad de México", "Coahuila", "Colima", "Durango", "Estado de México", "Guanajuato", "Guerrero",
  "Hidalgo", "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla",
  "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas",
  "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas",
];

/* ------------------------------------------------------------------ */
/* Image manifest. Drop a file at `public/images/<file>` and it        */
/* replaces the labelled placeholder on the next request.              */
/* Full generation brief per id: docs/IMAGE_LIST.md                    */
/* ------------------------------------------------------------------ */

export const images = {
  A1: { file: "a1-hero.jpg", w: 2400, h: 1350, label: "Hero (todas las páginas salvo App)" },
  A2: { file: "a2-hero-mobile.jpg", w: 1200, h: 1500, label: "Hero móvil (todas las páginas salvo App)" },
  A5: { file: "a5-hero-app.jpg", w: 2400, h: 1350, label: "Hero · App" },
  B1: { file: "b1-box-0-8mg.png", w: 447, h: 687, label: "Caja 0.8 mg" },
  B2: { file: "b2-box-2-5mg.png", w: 451, h: 659, label: "Caja 2.5 mg" },
  B3: { file: "b3-box-5-5mg.png", w: 451, h: 671, label: "Caja 5.5 mg" },
  B4: { file: "b4-box-9mg.png", w: 459, h: 679, label: "Caja 9 mg" },
  B5: { file: "b5-box-14-5mg.png", w: 461, h: 679, label: "Caja 14.5 mg" },
  C1: { file: "c1-pack-1-month.jpg", w: 896, h: 1200, label: "Paquete 1 mes" },
  C2: { file: "c2-pack-3-months.jpg", w: 896, h: 1200, label: "Paquete 3 meses" },
  C3: { file: "c3-pack-6-months.jpg", w: 896, h: 1200, label: "Paquete 6 meses" },
  D1: { file: "d1-box-tilted.jpg", w: 2752, h: 1536, label: "Las cinco cajas" },
  D2: { file: "d2-box-corner.jpg", w: 2048, h: 2048, label: "Detalle esquina" },
  D3: { file: "d3-tablets.jpg", w: 2048, h: 2048, label: "Tabletas" },
  E1: { file: "e1-meal.jpg", w: 2400, h: 1792, label: "Comida saludable" },
  E2: { file: "e2-workout.jpg", w: 2400, h: 1792, label: "Entrenamiento en casa" },
  E3: { file: "e3-progress.jpg", w: 2400, h: 1792, label: "Gráfica de progreso" },
  E4: { file: "e4-reminder.jpg", w: 2400, h: 1792, label: "Recordatorio" },
  F1: { file: "f1-closing-home.jpg", w: 2752, h: 1536, label: "Cierre · Inicio" },
  /* Shares F1's photo until the packages band gets its own (laughing pose). */
  F2: { file: "f1-closing-home.jpg", w: 2752, h: 1536, label: "Cierre · Paquetes" },
  F3: { file: "f3-boxes-trio.jpg", w: 2752, h: 1536, label: "Tres cajas" },
  G1: { file: "g1-logo.png", w: 3700, h: 837, label: "Logo" },
  G2: { file: "g2-logo-mark-white.png", w: 2164, h: 2050, label: "Logo · marca blanca" },
  H1: { file: "h1-bg-packages.jpg", w: 2752, h: 1536, label: "Fondo · Paquetes" },
} as const;

export type ImageId = keyof typeof images;
