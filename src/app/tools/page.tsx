// src/app/tools/page.tsx
'use client';

//import ToolContextHeader from '@/components/ToolContextHeader';
//import IdeaInputForm from '@/components/IdeaInputForm';
import HomePageClient from '@/components/HomePageClient';
import { tools } from '@/lib/tools-data';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ToolsPage() {
  const { lang } = useLanguage();

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Хедер — выбор/смена активной идеи из контекста */}
       
      {/* Блок «Проверка идеи» — сразу под хедером */}
      <section className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          {lang === 'ru' ? 'Проверка идеи' : 'Idea Validation'}
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          {lang === 'ru'
            ? 'Инструменты анализа, генерации и тестирования концепций.'
            : 'Tools for analysis, generation and stress testing of concepts.'}
        </p>
        
      </section>

      {/* Грид инструментов */}
      <section>
        <HomePageClient tools={tools} />
      </section>
    </main>
  );
}
