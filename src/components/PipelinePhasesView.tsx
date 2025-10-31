// src/components/PipelinePhasesView.tsx
'use client';

import Link from 'next/link';
import { PipelineResult } from '@/types/pipeline';
import { useLanguage } from '@/contexts/LanguageContext';
import React from 'react';
import JsonBlock from '@/components/common/JsonBlock';
// import ToolStatusBadge from "@/components/ToolStatusBadge"; // пока не используем

type PipelinePhasesViewProps = {
  data: PipelineResult;
};

export default function PipelinePhasesView({ data }: PipelinePhasesViewProps) {
  const { lang } = useLanguage();

  // локализованные заголовки фаз
  const phaseTitles = {
    research:
      lang === 'ru' ? 'Фаза 1. Исследование контекста' : 'Phase 1. Context / Research',
    generation:
      lang === 'ru' ? 'Фаза 2. Генерация вариантов' : 'Phase 2. Ideation / Generation',
    development:
      lang === 'ru' ? 'Фаза 3. Доработка и проработка' : 'Phase 3. Development',
    reflection:
      lang === 'ru' ? 'Фаза 4. Проверка и критика' : 'Phase 4. Validation / Critique',
  };

  // короткие описания фаз
  const phaseDesc = {
    research:
      lang === 'ru'
        ? 'Прояснение сути задачи, среды, пользователей и ограничений.'
        : 'Clarify the problem, environment, users, and constraints.',
    generation:
      lang === 'ru'
        ? 'Создание широкого спектра альтернатив.'
        : 'Produce a wide range of possible solutions.',
    development:
      lang === 'ru'
        ? 'Структурная доработка идеи, поиск противоречий и путей их снятия.'
        : 'Structural refinement and contradiction removal.',
    reflection:
      lang === 'ru'
        ? 'Проверка рисков, ценности, реализуемости и роли стейкхолдеров.'
        : 'Stress-test risks, value, feasibility and stakeholder views.',
  };

  // Вспомогательная вёрстка блока инструмента в фазе
  function ToolBlock({
    title,
    summary,
    toolSlug,
  }: {
    title: string;
    summary?: unknown;
    toolSlug: string;
  }) {
    const hasContent =
      summary !== undefined &&
      summary !== null &&
      (typeof summary === 'string' ? summary.trim() !== '' : true);

    return (
      <div className="rounded-lg border border-gray-700 bg-gray-800/70 p-4">
        <div className="flex items-start justify-between gap-4">
          <h4 className="text-white font-semibold text-sm md:text-base">{title}</h4>

          <Link
            href={`//${toolSlug}`}
            className="text-[12px] md:text-sm rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium px-3 py-1 whitespace-nowrap"
          >
            {lang === 'ru' ? 'Открыть инструмент' : 'Open tool'}
          </Link>
        </div>

        <div className="mt-3 text-gray-300 text-sm leading-relaxed whitespace-pre-line break-words">
          {hasContent ? (
            typeof summary === 'string' ? (
              summary
            ) : (
              // Рендерим объект/массив как JSON с коллапсом
              <JsonBlock data={summary} title={title} />
            )
          ) : (
            <span className="text-gray-500 text-[12px] italic">
              {lang === 'ru'
                ? 'Пока нет данных для этой техники.'
                : 'No data from this tool yet.'}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ФАЗА 1 */}
      <section className="bg-[#0f172a] border border-gray-700 rounded-xl p-4 md:p-6 text-gray-100">
        <header className="mb-4">
          <h3 className="text-lg font-semibold text-white">{phaseTitles.research}</h3>
          <p className="text-sm text-gray-400">{phaseDesc.research}</p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <ToolBlock
            title="5W1H"
            summary={data.phases.research?.fiveW1H}
            toolSlug="5w1h"
          />
          <ToolBlock
            title="Mind Mapping"
            summary={data.phases.research?.mindMap}
            toolSlug="mind-map"
          />
        </div>
      </section>

      {/* ФАЗА 2 */}
      <section className="bg-[#0f172a] border border-gray-700 rounded-xl p-4 md:p-6 text-gray-100">
        <header className="mb-4">
          <h3 className="text-lg font-semibold text-white">{phaseTitles.generation}</h3>
          <p className="text-sm text-gray-400">{phaseDesc.generation}</p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ToolBlock
            title="Brainstorming"
            summary={data.phases.generation?.brainstorming}
            toolSlug="brainstorming"
          />
          <ToolBlock
            title="Random Word"
            summary={data.phases.generation?.randomWord}
            toolSlug="random-word"
          />
          <ToolBlock
            title="Synectics"
            summary={data.phases.generation?.synectics}
            toolSlug="synectics"
          />
          <ToolBlock
            title="Forced Relationships"
            summary={data.phases.generation?.forcedRelationships}
            toolSlug="forced-relationships"
          />
        </div>
      </section>

      {/* ФАЗА 3 */}
      <section className="bg-[#0f172a] border border-gray-700 rounded-xl p-4 md:p-6 text-gray-100">
        <header className="mb-4">
          <h3 className="text-lg font-semibold text-white">{phaseTitles.development}</h3>
          <p className="text-sm text-gray-400">{phaseDesc.development}</p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <ToolBlock
            title="SCAMPER"
            summary={data.phases.development?.scamper}
            toolSlug="scamper"
          />
          <ToolBlock
            title="TRIZ"
            summary={data.phases.development?.triz}
            toolSlug="triz"
          />
        </div>
      </section>

      {/* ФАЗА 4 */}
      <section className="bg-[#0f172a] border border-gray-700 rounded-xl p-4 md:p-6 text-gray-100">
        <header className="mb-4">
          <h3 className="text-lg font-semibold text-white">{phaseTitles.reflection}</h3>
          <p className="text-sm text-gray-400">{phaseDesc.reflection}</p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <ToolBlock
            title="Six Thinking Hats"
            summary={data.phases.reflection?.sixHats}
            toolSlug="six-hats"
          />
          <ToolBlock
            title="Rolestorming"
            summary={data.phases.reflection?.rolestorming}
            toolSlug="rolestorming"
          />
          <ToolBlock
            title="Design Thinking"
            summary={data.phases.reflection?.designThinking}
            toolSlug="design-thinking"
          />
          <ToolBlock
            title="Creative Strategy  "
            summary={data.phases.reflection?.disy}
            toolSlug="disy"
          />
        </div>
      </section>
    </div>
  );
}
