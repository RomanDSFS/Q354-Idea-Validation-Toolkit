// src/app/tools/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { tools } from '@/lib/tools-data';
import { translations } from '@/lib/translations';
import ToolContent from '@/components/tools/ToolContent';
import ToolContextHeader from '@/components/ToolContextHeader';

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const key = slug as keyof typeof translations.ru.tools;
  const toolRu = translations.ru.tools[key];
  const toolEn = translations.en.tools[key];

  if (!toolRu) return {};

  return {
    title: `${toolRu.name} — Idea Validation Toolkit`,
    description: toolRu.shortDesc,
    alternates: {
      languages: {
        en: `${toolEn?.name || toolRu.name} — Idea Validation Toolkit`,
      },
    },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((t) => t.id === slug);
  if (!tool) notFound();

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <ToolContextHeader />
      <ToolContent toolId={tool.id} interactive={!!tool.interactive} />
    </main>
  );
}
