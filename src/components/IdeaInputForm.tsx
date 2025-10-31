// src/components/IdeaInputForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { runPipeline } from '@/lib/api-client';
import { useIdeaContext } from '@/contexts/IdeaContext';
import { useLanguage } from '@/contexts/LanguageContext';

function makeId() {
  // стабильный клиентский id для «быстрой проверки» без пайплайна
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `idea_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
}

export default function IdeaInputForm() {
  const router = useRouter();
  const { setActiveIdea } = useIdeaContext();
  const { lang } = useLanguage();

  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Локаль
  const titleText =
    lang === 'ru'
      ? 'Опиши идею / задачу / продукт, который нужно проверить'
      : 'Describe the idea / problem / product you want to validate';

  const placeholderText =
    lang === 'ru'
      ? 'Например: сервис ИИ-ассистента для предпринимателей, который автоматизирует анализ ниши и поиск точек роста.'
      : 'Example: an AI assistant for founders that analyzes their niche and suggests growth moves.';

  const buttonRunText = lang === 'ru' ? 'Проверить идею' : 'Run full pipeline';
  const buttonQuickText = lang === 'ru' ? 'Проверить отдельно' : 'Check with tools';

  const subText =
    lang === 'ru'
      ? 'Мы соберём аналитику по фазам (контекст → генерация → доработка → проверка).'
      : 'We will generate analytics across phases (context → ideation → development → validation).';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;

    setLoading(true);
    setErr(null);

    try {
      // Полный прогон по пайплайну
      const pipelineResult = await runPipeline(value.trim());
      setActiveIdea(pipelineResult.idea);
      router.push(`/idea/${pipelineResult.idea.id}/pipeline`);
    } catch (error: unknown) {
      console.error(error);
      setErr(
        lang === 'ru'
          ? 'Не удалось выполнить анализ идеи.'
          : 'Failed to run pipeline for this idea.'
      );
    } finally {
      setLoading(false);
    }
  }

  // Быстрый путь: сохранить идею и перейти в /tools без пайплайна
  function handleQuickTools() {
    if (!value.trim()) return;
    const idea = { id: makeId(), description: value.trim() };
    setActiveIdea(idea);
    router.push('/tools');
  }

  return (
    <section className="bg-[#0f172a] text-gray-100 rounded-xl border border-gray-700 p-4 md:p-4 max-w-7xl">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            {titleText}
          </label>
          <textarea
            className="w-full rounded-md bg-gray-900 border border-gray-600 text-gray-100 text-sm p-2 min-h-[100px] outline-none focus:border-blue-500"
            placeholder={placeholderText}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={loading}
          />
          <p className="text-[12px] text-gray-400 mt-2">{subText}</p>
        </div>

        {err && (
          <div className="text-sm text-red-400 bg-red-950/40 border border-red-800 rounded px-3 py-2">
            {err}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2">
          {/* Кнопка полного пайплайна */}
          <button
            type="submit"
            disabled={loading || !value.trim()}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? lang === 'ru'
                ? 'Обработка...'
                : 'Processing...'
              : buttonRunText}
          </button>

          {/* Новая кнопка быстрого перехода к инструментам */}
          <button
            type="button"
            onClick={handleQuickTools}
            disabled={loading || !value.trim()}
            className="inline-flex items-center justify-center rounded-md border border-gray-600 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            title={
              lang === 'ru'
                ? 'Сохранить идею и перейти к выбору инструментов без полного анализа'
                : 'Save the idea and go to tools without running the full pipeline'
            }
          >
            {buttonQuickText}
          </button>
        </div>
      </form>
    </section>
  );
}
