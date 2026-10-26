import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Caveat, Figtree, Ibarra_Real_Nova } from "next/font/google";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import "../globals.css";

const display = Ibarra_Real_Nova({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
});

const hand = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: { default: t.meta.home.title, template: "%s" },
    description: t.meta.home.description,
    openGraph: { siteName: "SanoVida", locale: lang === "es" ? "es_MX" : "en_US", type: "website" },
  };
}

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
  /* Phones render the page at a fixed 400px design width and zoom it to the
     screen, so form fields sit below 16px; this stops iOS zooming into them. */
  maximumScale: 1,
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang === "es" ? "es-MX" : "en"} className={`${display.variable} ${body.variable} ${hand.variable}`} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
