import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { Shell } from "@/components/Shell";
import { PageHero } from "@/components/PageHero";
import { ProductIntro } from "@/components/home/ProductIntro";
import { PackagesTeaser } from "@/components/home/PackagesTeaser";
import { AppTeaser } from "@/components/home/AppTeaser";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CtaBand } from "@/components/CtaBand";

/* `params` is awaited inside Suspense so Next can serve a static shell on navigation. */
export default function HomePage({ params }: PageProps<"/[lang]">) {
  return (
    <Suspense fallback={null}>
      <HomeBody params={params} />
    </Suspense>
  );
}

async function HomeBody({ params }: Pick<PageProps<"/[lang]">, "params">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <Shell locale={lang} page="home">
      <PageHero copy={t.home.hero} image="A1" mobileImage="A2" alt={t.alt.heroHome} icons={["leaf", "zap", "heart"]} />
      <ProductIntro />
      <PackagesTeaser />
      <AppTeaser />
      <HowItWorks />
      <CtaBand title={t.home.closing.title} lead={t.home.closing.lead} cta={t.home.closing.cta} image="F1" alt={t.alt.closing} trust />
    </Shell>
  );
}
