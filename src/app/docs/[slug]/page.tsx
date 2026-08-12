import { notFound } from "next/navigation";
import { componentDocs, type ComponentDoc } from "@/lib/component-docs";
import { DocPageClient } from "./doc-page-client";

export function generateStaticParams() {
  return componentDocs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = componentDocs.find((d) => d.slug === slug);
  if (!doc) return { title: "Not Found — RetroChunk" };

  return {
    title: `${doc.name} — RetroChunk Docs`,
    description: doc.description,
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = componentDocs.find((d) => d.slug === slug);

  if (!doc) notFound();

  return <DocPageClient doc={doc} />;
}
