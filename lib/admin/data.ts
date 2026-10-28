/* Sample back-office data, mirrored from the admin reference screens.
   Everything here is illustrative until the store is connected. */

import type { DosageId, PlanId } from "../catalog";

export type PayStatus = "paid" | "pending" | "failed" | "refunded";
export type ShipStatus = "pending" | "preparing" | "shipped" | "transit" | "delivered" | "label";
export type AppStatus = "active" | "invited" | "pending" | "expired" | "syncError" | "none";

export interface Order {
  id: string;
  date: string; // ISO date
  time: string;
  customer: string;
  email: string;
  city: string;
  dosage: DosageId;
  qty: number;
  total: number;
  pay: PayStatus;
  ship: ShipStatus;
  app: AppStatus;
}

export const orders: Order[] = [
  { id: "SV1250", date: "2025-04-30", time: "14:32", customer: "María González", email: "maria@email.com", city: "Monterrey, NL", dosage: "0.8", qty: 1, total: 2199, pay: "paid", ship: "preparing", app: "active" },
  { id: "SV1249", date: "2025-04-30", time: "12:18", customer: "Carlos Ramírez", email: "carlos@email.com", city: "CDMX, CDMX", dosage: "2.5", qty: 1, total: 2299, pay: "paid", ship: "shipped", app: "invited" },
  { id: "SV1248", date: "2025-04-30", time: "10:03", customer: "Ana Torres", email: "ana@email.com", city: "Guadalajara, Jal", dosage: "5.5", qty: 2, total: 4998, pay: "paid", ship: "delivered", app: "active" },
  { id: "SV1247", date: "2025-04-29", time: "18:45", customer: "Luis Mendoza", email: "luis@email.com", city: "Puebla, Pue", dosage: "9", qty: 1, total: 2699, pay: "paid", ship: "shipped", app: "active" },
  { id: "SV1246", date: "2025-04-29", time: "16:21", customer: "Sofía Hernández", email: "sofia@email.com", city: "Tijuana, BC", dosage: "14.5", qty: 1, total: 2899, pay: "pending", ship: "preparing", app: "invited" },
  { id: "SV1245", date: "2025-04-29", time: "11:12", customer: "Jorge López", email: "jorge@email.com", city: "León, Gto", dosage: "2.5", qty: 1, total: 2299, pay: "failed", ship: "pending", app: "none" },
  { id: "SV1244", date: "2025-04-28", time: "20:16", customer: "Daniela Cruz", email: "daniela@email.com", city: "Mérida, Yuc", dosage: "0.8", qty: 3, total: 6597, pay: "paid", ship: "delivered", app: "active" },
  { id: "SV1243", date: "2025-04-28", time: "15:03", customer: "Ricardo Santana", email: "ricardo@email.com", city: "Querétaro, Qro", dosage: "5.5", qty: 1, total: 2499, pay: "paid", ship: "shipped", app: "invited" },
  { id: "SV1242", date: "2025-04-28", time: "12:27", customer: "Valeria Ruiz", email: "valeria@email.com", city: "Cancún, Q. Roo", dosage: "9", qty: 1, total: 2699, pay: "paid", ship: "preparing", app: "active" },
  { id: "SV1241", date: "2025-04-27", time: "19:10", customer: "Fernando Castro", email: "fernando@email.com", city: "San Luis Potosí, SLP", dosage: "2.5", qty: 1, total: 2299, pay: "paid", ship: "delivered", app: "active" },
];

export interface Customer {
  id: string;
  name: string;
  city: string;
  email: string;
  phone: string;
  registered: string;
  registeredTime: string;
  orders: number;
  spent: number;
  dosage: DosageId | null;
  /** True when the customer is still on the starter package. */
  starter?: boolean;
  app: "active" | "inactive";
  lastPurchase: string;
  since: string;
  birthday: string;
  device: string;
  note: string;
  noteDate: string;
}

export const customers: Customer[] = [
  { id: "C1023", name: "María González", city: "Monterrey, NL", email: "maria.glez@email.com", phone: "81 2345 6789", registered: "2025-01-12", registeredTime: "10:24", orders: 6, spent: 2199, dosage: "2.5", app: "active", lastPurchase: "2025-04-28", since: "2025-01-12", birthday: "1985-09-14", device: "iPhone 14 (iOS)", note: "Cliente muy comprometida con su tratamiento. Prefiere comunicación por WhatsApp.", noteDate: "2025-04-15" },
  { id: "C0876", name: "Carlos Ramírez", city: "CDMX", email: "carlos.ramirez@email.com", phone: "55 9876 4321", registered: "2025-01-05", registeredTime: "16:40", orders: 4, spent: 2299, dosage: "5.5", app: "active", lastPurchase: "2025-04-26", since: "2025-01-05", birthday: "1988-03-22", device: "Samsung S23 (Android)", note: "Cliente muy comprometido. Excelente adherencia al tratamiento. Prefiere comunicación por WhatsApp.", noteDate: "2025-04-10" },
  { id: "C0551", name: "Ana Torres", city: "Guadalajara, Jal", email: "ana.torres@email.com", phone: "33 1234 5678", registered: "2024-12-28", registeredTime: "11:12", orders: 3, spent: 2499, dosage: "9", app: "active", lastPurchase: "2025-04-24", since: "2024-12-28", birthday: "1990-07-02", device: "iPhone 13 (iOS)", note: "Pidió información sobre el plan de 6 meses.", noteDate: "2025-04-02" },
  { id: "C0489", name: "Luis Mendoza", city: "Puebla, Pue", email: "luis.mendoza@email.com", phone: "22 3456 7890", registered: "2024-12-18", registeredTime: "09:50", orders: 7, spent: 2699, dosage: "14.5", app: "active", lastPurchase: "2025-04-27", since: "2024-12-18", birthday: "1979-11-30", device: "Pixel 8 (Android)", note: "Renueva cada mes puntualmente.", noteDate: "2025-04-20" },
  { id: "C0312", name: "Sofía Hernández", city: "Tijuana, BC", email: "sofia.hdez@email.com", phone: "664 111 2233", registered: "2024-12-10", registeredTime: "14:32", orders: 2, spent: 1299, dosage: null, starter: true, app: "inactive", lastPurchase: "2025-04-15", since: "2024-12-10", birthday: "1993-01-18", device: "—", note: "Aún no activa la app. Enviar guía.", noteDate: "2025-04-16" },
  { id: "C0298", name: "Diego Rivera", city: "Querétaro, Qro", email: "diego.rivera@email.com", phone: "442 222 3344", registered: "2024-12-08", registeredTime: "12:11", orders: 5, spent: 2299, dosage: "5.5", app: "active", lastPurchase: "2025-04-22", since: "2024-12-08", birthday: "1986-05-09", device: "iPhone 15 (iOS)", note: "", noteDate: "" },
  { id: "C0251", name: "Valeria Pérez", city: "Mérida, Yuc", email: "valeria.perez@email.com", phone: "999 333 4455", registered: "2024-12-02", registeredTime: "17:45", orders: 1, spent: 699, dosage: null, app: "inactive", lastPurchase: "2025-04-12", since: "2024-12-02", birthday: "1995-08-27", device: "—", note: "", noteDate: "" },
  { id: "C0233", name: "Javier Rojas", city: "León, Gto", email: "javier.rojas@email.com", phone: "477 444 5566", registered: "2024-11-28", registeredTime: "09:22", orders: 3, spent: 1899, dosage: "2.5", app: "active", lastPurchase: "2025-04-18", since: "2024-11-28", birthday: "1982-02-14", device: "Xiaomi 13 (Android)", note: "", noteDate: "" },
  { id: "C0210", name: "Fernanda Cruz", city: "Cancún, Q. Roo", email: "fernanda.cruz@email.com", phone: "998 555 6677", registered: "2024-11-20", registeredTime: "13:18", orders: 4, spent: 2499, dosage: "9", app: "active", lastPurchase: "2025-04-21", since: "2024-11-20", birthday: "1991-12-03", device: "iPhone 12 (iOS)", note: "", noteDate: "" },
  { id: "C0188", name: "Ricardo Gómez", city: "San Luis Potosí, SLP", email: "ricardo.gomez@email.com", phone: "444 666 7788", registered: "2024-11-15", registeredTime: "08:30", orders: 2, spent: 1299, dosage: null, starter: true, app: "active", lastPurchase: "2025-04-19", since: "2024-11-15", birthday: "1987-06-21", device: "Motorola Edge (Android)", note: "", noteDate: "" },
];

export interface Product {
  dosage: DosageId;
  sku: string;
  price: number;
  stock: number;
  active: boolean;
}

export const products: Product[] = [
  { dosage: "0.8", sku: "SV-ORG-08", price: 2199, stock: 425, active: true },
  { dosage: "2.5", sku: "SV-ORG-25", price: 2299, stock: 325, active: true },
  { dosage: "5.5", sku: "SV-ORG-55", price: 2499, stock: 224, active: true },
  { dosage: "9", sku: "SV-ORG-90", price: 2699, stock: 162, active: true },
  { dosage: "14.5", sku: "SV-ORG-145", price: 2899, stock: 112, active: true },
];

export const LOW_STOCK = 200;

export interface Package {
  id: PlanId;
  months: number;
  boxes: number;
  tablets: number;
  price: number;
  listPrice: number;
  savePct: number;
  dosage: DosageId;
  popular?: boolean;
  active: boolean;
}

export const packages: Package[] = [
  { id: "1m", months: 1, boxes: 1, tablets: 30, price: 2499, listPrice: 2499, savePct: 0, dosage: "5.5", active: true },
  { id: "3m", months: 3, boxes: 3, tablets: 90, price: 6999, listPrice: 7497, savePct: 7, dosage: "5.5", popular: true, active: true },
  { id: "6m", months: 6, boxes: 6, tablets: 180, price: 12999, listPrice: 14994, savePct: 13, dosage: "5.5", active: true },
];

export interface AppUser {
  id: string;
  orderId: string;
  name: string;
  email: string;
  phone: string;
  dosage: DosageId;
  purchased: string;
  status: AppStatus;
  start: string | null;
  end: string | null;
  lastSync: string | null;
  lastSyncTime: string | null;
  syncOk: boolean | null;
  harbizId: string;
  note: string;
}

export const appUsers: AppUser[] = [
  { id: "C1023", orderId: "SV1250", name: "María González", email: "maria.g@mail.com", phone: "+52 81 2345 6789", dosage: "0.8", purchased: "2025-04-01", status: "active", start: "2025-04-01", end: "2025-05-01", lastSync: "2025-04-29", lastSyncTime: "10:42", syncOk: true, harbizId: "HBZ-458392", note: "Cliente receptivo. Usa la app regularmente. Renovar próximo mes." },
  { id: "C0876", orderId: "SV1249", name: "Carlos Ramírez", email: "carlos.r@gmail.com", phone: "+52 55 9876 4321", dosage: "2.5", purchased: "2025-03-28", status: "pending", start: null, end: null, lastSync: null, lastSyncTime: null, syncOk: null, harbizId: "—", note: "" },
  { id: "C0551", orderId: "SV1248", name: "Ana Torres", email: "ana.torres@mail.com", phone: "+52 55 7223 4455", dosage: "5.5", purchased: "2025-03-27", status: "active", start: "2025-03-28", end: "2025-04-27", lastSync: "2025-04-29", lastSyncTime: "09:15", syncOk: true, harbizId: "hbz_8f3a2c9d", note: "" },
  { id: "C0489", orderId: "SV1247", name: "Luis Mendoza", email: "luis.m@mail.com", phone: "+52 22 3456 7890", dosage: "9", purchased: "2025-03-15", status: "expired", start: "2025-03-15", end: "2025-04-14", lastSync: "2025-04-28", lastSyncTime: "18:20", syncOk: false, harbizId: "HBZ-441203", note: "" },
  { id: "C0312", orderId: "SV1246", name: "Sofía Hernández", email: "sofia.h@mail.com", phone: "+52 664 111 2233", dosage: "14.5", purchased: "2025-04-12", status: "active", start: "2025-04-12", end: "2025-05-12", lastSync: "2025-04-29", lastSyncTime: "12:05", syncOk: true, harbizId: "HBZ-460118", note: "" },
  { id: "C0411", orderId: "SV1238", name: "Jorge Martínez", email: "jorge.m@mail.com", phone: "+52 477 321 6677", dosage: "2.5", purchased: "2025-04-08", status: "syncError", start: "2025-04-08", end: "2025-05-08", lastSync: "2025-04-28", lastSyncTime: "16:33", syncOk: false, harbizId: "HBZ-459871", note: "" },
  { id: "C0398", orderId: "SV1236", name: "Paulina Díaz", email: "paulina.d@mail.com", phone: "+52 33 8899 0011", dosage: "9", purchased: "2025-04-05", status: "active", start: "2025-04-05", end: "2025-05-05", lastSync: "2025-04-29", lastSyncTime: "11:11", syncOk: true, harbizId: "HBZ-459402", note: "" },
  { id: "C0377", orderId: "SV1233", name: "Ricardo Vega", email: "ricardo.v@mail.com", phone: "+52 55 2233 4455", dosage: "5.5", purchased: "2025-04-01", status: "pending", start: null, end: null, lastSync: null, lastSyncTime: null, syncOk: null, harbizId: "—", note: "" },
];

export type PayMethod = "card" | "oxxo" | "mercadopago" | "spei" | "paypal";

export interface Transaction {
  id: string;
  orderId: string;
  customer: string;
  city: string;
  amount: number;
  method: PayMethod;
  provider: string;
  status: "approved" | "failed" | "refunded";
  refund: number | null;
  date: string;
  time: string;
}

export const transactions: Transaction[] = [
  { id: "TXN-8932471", orderId: "SV1250", customer: "María González", city: "Monterrey, NL", amount: 2199, method: "card", provider: "Stripe", status: "approved", refund: null, date: "2025-04-30", time: "14:32" },
  { id: "TXN-8932460", orderId: "SV1249", customer: "Carlos Ramírez", city: "CDMX", amount: 2299, method: "oxxo", provider: "OpenPay", status: "approved", refund: null, date: "2025-04-30", time: "12:18" },
  { id: "TXN-8932457", orderId: "SV1248", customer: "Ana Torres", city: "Guadalajara, Jal", amount: 2499, method: "mercadopago", provider: "", status: "approved", refund: null, date: "2025-04-30", time: "10:03" },
  { id: "TXN-8932441", orderId: "SV1247", customer: "Luis Mendoza", city: "Puebla, Pue", amount: 2699, method: "spei", provider: "BBVA", status: "failed", refund: null, date: "2025-04-29", time: "18:45" },
  { id: "TXN-8932419", orderId: "SV1246", customer: "Sofía Hernández", city: "Tijuana, BC", amount: 2899, method: "paypal", provider: "", status: "approved", refund: 2899, date: "2025-04-29", time: "16:21" },
];

export type Carrier = "estafeta" | "dhl" | "fedex" | "99minutos";

export interface Shipment {
  orderId: string;
  customer: string;
  city: string;
  address: string;
  address2: string;
  carrier: Carrier;
  tracking: string;
  status: ShipStatus;
  dispatched: string | null;
  eta: string;
  dosage: DosageId;
}

export const shipments: Shipment[] = [
  { orderId: "SV1250", customer: "María González", city: "Monterrey, NL", address: "Av. San Pedro 123", address2: "Monterrey, NL 66220", carrier: "estafeta", tracking: "ETA123456789", status: "transit", dispatched: "2025-04-30", eta: "2025-05-03", dosage: "0.8" },
  { orderId: "SV1249", customer: "Carlos Ramírez", city: "CDMX", address: "Col. Roma Norte", address2: "CDMX 06700", carrier: "dhl", tracking: "DHL789456123", status: "delivered", dispatched: "2025-04-29", eta: "2025-04-30", dosage: "2.5" },
  { orderId: "SV1248", customer: "Ana Torres", city: "Guadalajara, Jal", address: "Col. Americana", address2: "Guadalajara, Jal 44160", carrier: "fedex", tracking: "FDX345678901", status: "transit", dispatched: "2025-04-29", eta: "2025-05-02", dosage: "5.5" },
  { orderId: "SV1247", customer: "Luis Mendoza", city: "Puebla, Pue", address: "Col. Angelópolis", address2: "Puebla, Pue 72450", carrier: "99minutos", tracking: "99M987654321", status: "preparing", dispatched: null, eta: "2025-05-02", dosage: "9" },
  { orderId: "SV1246", customer: "Sofía Hernández", city: "Tijuana, BC", address: "Col. Zona Río", address2: "Tijuana, BC 22010", carrier: "estafeta", tracking: "ETA456789012", status: "label", dispatched: null, eta: "2025-05-03", dosage: "14.5" },
];

/* ------------------------------------------------------------------ */
/* Series                                                               */
/* ------------------------------------------------------------------ */

/** Daily revenue for April 2025 (MXN). */
export const salesByDay = [
  14200, 16800, 21400, 18900, 23100, 25600, 22400, 27900, 31200, 28400, 24600, 29800, 35100, 38400, 33200, 30100, 27600, 24800, 29400, 33800, 41200, 44800, 39600, 36400, 47800, 55200, 48100, 42600, 45900, 43200,
].map((revenue, i) => ({ day: i + 1, revenue, orders: Math.round(revenue / 2230) }));

/** Share of returning buyers across the month (%). */
export const retentionByDay = [12, 13.5, 14.2, 13.8, 15.5, 16.1, 16.8, 17.6, 18.2, 17.9, 19.4, 20.1, 20.8, 21.5, 21.2, 22.6, 23.4, 24.1, 23.8, 24.9, 25.3, 26.2, 26.8, 27.1, 27.9, 28.2, 28.0, 28.6, 28.9, 28.4].map((rate, i) => ({ day: i + 1, rate }));

/** App activations per day. */
export const activationsByDay = [62, 74, 58, 81, 90, 76, 68, 95, 102, 88, 71, 84, 110, 118, 97, 92, 86, 79, 101, 123, 131, 115, 99, 108, 142, 158, 136, 121, 139, 130].map((count, i) => ({ day: i + 1, count }));

/** New vs returning customers per day (mobile reports retention chart). */
export const customersByDay = activationsByDay.map(({ day, count }) => ({ day, nuevos: Math.round(count * 0.42), recurrentes: Math.round(count * 0.58) }));

export const salesByDosage: { dosage: DosageId; units: number; pct: number; revenue: number }[] = [
  { dosage: "0.8", units: 425, pct: 34, revenue: 232350 },
  { dosage: "2.5", units: 325, pct: 26, revenue: 177670 },
  { dosage: "5.5", units: 224, pct: 18, revenue: 122440 },
  { dosage: "9", units: 162, pct: 13, revenue: 88560 },
  { dosage: "14.5", units: 112, pct: 9, revenue: 63300 },
];

export const funnel = [
  { key: "visits", value: 34620, pct: 100 },
  { key: "selection", value: 12450, pct: 35.9 },
  { key: "checkout", value: 6230, pct: 18.0 },
  { key: "paid", value: 4320, pct: 12.5 },
  { key: "activation", value: 3115, pct: 9.0 },
] as const;

export const campaigns = [
  { id: "CP001", name: "Primavera Sana", orders: 845, revenue: 463750, conv: 5.2, tone: "leaf" },
  { id: "CP002", name: "Bienestar Total", orders: 612, revenue: 312480, conv: 4.8, tone: "rose" },
  { id: "CP003", name: "Envío Gratis Abril", orders: 498, revenue: 251420, conv: 3.9, tone: "gold" },
  { id: "CP004", name: "App SanoVida", orders: 420, revenue: 206150, conv: 4.1, tone: "rose" },
  { id: "CP005", name: "Paquete Familiar", orders: 388, revenue: 198320, conv: 3.7, tone: "leaf" },
] as const;

export const topCustomers = [
  { id: "C1023", name: "María González", orders: 7, revenue: 24890 },
  { id: "C0876", name: "Carlos Ramírez", orders: 6, revenue: 21450 },
  { id: "C0551", name: "Ana Torres", orders: 6, revenue: 19320 },
  { id: "C0489", name: "Luis Mendoza", orders: 5, revenue: 18750 },
  { id: "C0312", name: "Sofía Hernández", orders: 5, revenue: 17990 },
];

export const devices = [
  { key: "ios", value: 1742, pct: 55.9, color: "#1f6b3a" },
  { key: "android", value: 1217, pct: 39.1, color: "#9fd3a8" },
  { key: "web", value: 156, pct: 5.0, color: "#f4b6cf" },
] as const;

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

export function money(value: number) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(value);
}

export function num(value: number) {
  return new Intl.NumberFormat("es-MX", { maximumFractionDigits: 1 }).format(value);
}

export function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

/** Chart colour of each dosage in the admin (the reference's green → pink → gold → mint → blush order). */
export const dosageTone: Record<DosageId, string> = {
  "0.8": "#1f6b3a",
  "2.5": "#e4679e",
  "5.5": "#d1a24a",
  "9": "#9fd3a8",
  "14.5": "#f4b6cf",
};

/** Soft background used behind the dosage label pill in tables. */
export const dosageWash: Record<DosageId, string> = {
  "0.8": "#e6f2ea",
  "2.5": "#fde8f1",
  "5.5": "#f8efdc",
  "9": "#eaf6ec",
  "14.5": "#fdeaf2",
};
