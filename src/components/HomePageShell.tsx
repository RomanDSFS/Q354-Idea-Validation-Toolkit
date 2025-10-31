// src/components/HomePageShell.tsx
'use client';

import { Tool } from '@/lib/tools-data';
import HomePageClient from '@/components/HomePageClient';
import IdeaInputForm from '@/components/IdeaInputForm';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

export default function HomePageShell({ tools }: { tools: Tool[] }) {
  const { lang } = useLanguage();

  const titleText = lang === 'ru' ? 'Проверка идеи' : 'Idea Validation';
  const descText =
    lang === 'ru'
      ? 'Инструменты анализа, генерации и тестирования концепций.'
      : 'Tools for analysis, generation and stress testing of concepts.';
  //const orText = lang === 'ru' ? 'или работай точечно' : 'or work with tools directly';
  //const toolsCtaText = lang === 'ru' ? 'Открыть инструменты' : 'Browse all tools';

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* ЕДИНЫЙ ХЕДЕР ВВЕРХУ СТРАНИЦЫ */}
      <header className="bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {titleText}
            </h1>
            <p className="mt-1 text-sm md:text-base text-gray-300 leading-snug">
              {descText}
            </p>
          </div>
          <LanguageToggle />
        </div>
      </header>

      {/* БЛОК «Проверка идеи» — СРАЗУ ПОД ХЕДЕРОМ */}
      <IdeaInputForm />

      {/* CTA перейти к инструментам */}
      {/* <section className="text-center text-gray-300">
        <div className="text-sm text-gray-500 mb-3">{orText}</div>
        <Link
          href="/tools"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2"
        >
          {toolsCtaText}
        </Link>
      </section> */}

      {/* ГРИД ИНСТРУМЕНТОВ — БЕЗ СВОЕГО ХЕДЕРА */}
      <section className="space-y-4">
        <HomePageClient tools={tools} />
      </section>
    </main>
  );
}
