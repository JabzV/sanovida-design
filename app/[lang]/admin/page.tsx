import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdminDictionary } from "@/lib/admin/i18n";
import { isLocale } from "@/lib/i18n";
import { Dashboard } from "@/components/admin/pages/Dashboard";

export async function generateMetadata({ params }: PageProps<"/[lang]/admin">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: getAdminDictionary(lang).nav.dashboard };
}

export default function AdminDashboardPage({ params }: PageProps<"/[lang]/admin">) {
  return (
    <Suspense fallback={null}>
      <Body params={params} />
    </Suspense>
  );
}

async function Body({ params }: Pick<PageProps<"/[lang]/admin">, "params">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <Dashboard />;
}
