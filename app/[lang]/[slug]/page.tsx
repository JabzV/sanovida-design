import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { pageFromSlug, slugsFor } from "@/lib/routes";
import { Shell } from "@/components/Shell";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { DosageGrid } from "@/components/product/DosageGrid";
import { Quality } from "@/components/product/Quality";
import { Confidence } from "@/components/product/Confidence";
import { PlanCards } from "@/components/packages/PlanCards";
import { AssuranceBand, LifeBand } from "@/components/packages/PackagesBands";
import { AppClosing, AppSteps, AppTools } from "@/components/app/AppSections";
import { StoreBadges } from "@/components/Ui";
import { Faq } from "@/components/Faq";
import { HowHonest, HowJourney, HowLadder, HowRitual } from "@/components/how/HowSections";
import { Checkout } from "@/components/Checkout";

export function generateStaticParams() {
  return locales.flatMap((lang) => slugsFor(lang).map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const page = pageFromSlug(lang, slug);
  if (!page || page === "home") return {};
  const meta = getDictionary(lang).meta[page];
  return { title: meta.title, description: meta.description };
}

/* `params` is awaited inside Suspense so Next can serve a static shell on navigation. */
export default function SubPage({ params }: PageProps<"/[lang]/[slug]">) {
  return (
    <Suspense fallback={null}>
      <SubPageBody params={params} />
    </Suspense>
  );
}

async function SubPageBody({ params }: Pick<PageProps<"/[lang]/[slug]">, "params">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const page = pageFromSlug(lang, slug);
  if (!page || page === "home") notFound();
  const t = getDictionary(lang);

  return (
    <Shell locale={lang} page={page}>
      {page === "product" && (
        <>
          <PageHero copy={t.product.hero} image="A1" mobileImage="A2" alt={t.alt.heroProduct} icons={["leaf", "zap", "heart"]} titleSize="xl" />
          <DosageGrid />
          <Quality />
          <Confidence />
          <CtaBand eyebrow={t.product.closing.eyebrow} title={t.product.closing.title} lead={t.product.closing.lead} cta={t.product.closing.cta} image="F1" alt={t.alt.closing} centered mobileTrust />
        </>
      )}

      {page === "packages" && (
        <>
          <PageHero copy={t.packages.hero} image="A1" mobileImage="A2" alt={t.alt.heroPackages} icons={["leaf", "zap", "heart", "hands"]} noTrust />
          <PlanCards />
          <AssuranceBand />
          <LifeBand />
        </>
      )}

      {page === "app" && (
        <>
          <PageHero copy={t.app.hero} image="A5" noHand alt={t.alt.heroApp} icons={["gift", "phone", "heart"]} extra={<StoreBadges className="phero__stores" />} />
          <AppTools />
          <AppSteps />
          <AppClosing />
        </>
      )}

      {page === "how" && (
        <>
          <PageHero copy={t.howPage.hero} image="A1" mobileImage="A2" alt={t.alt.heroHow} icons={["leaf", "zap", "phone"]} />
          <HowJourney />
          <HowRitual />
          <HowLadder />
          <HowHonest />
          <CtaBand title={t.howPage.closing.title} lead={t.howPage.closing.lead} cta={t.howPage.closing.cta} image="F1" alt={t.alt.closing} trust />
        </>
      )}

      {page === "faq" && (
        <>
          <Faq />
          <CtaBand title={t.faq.closing.title} lead={t.faq.closing.lead} cta={t.faq.closing.cta} image="F1" alt={t.alt.closing} trust />
        </>
      )}

      {page === "checkout" && <Checkout />}
    </Shell>
  );
}
