// src/components/ToolContextHeader.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useIdeaContext } from '@/contexts/IdeaContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ToolContextHeader() {
  const router = useRouter();
  const { activeIdea, knownIdeas, setActiveIdea } = useIdeaContext();
  const { lang } = useLanguage();

  const [selectOpen, setSelectOpen] = useState(false);

  const noIdeaText =
    lang === 'ru'
      ? 'Идея не выбрана'
      : 'No active idea selected';

  // const chooseIdeaText =
  //   lang === 'ru'
  //     ? 'Выбрать идею'
  //     : 'Choose idea';

  const goToPipelineText =
    lang === 'ru'
      ? 'Сводка по идее'
      : 'View pipeline';

  const currentIdeaLabel =
    lang === 'ru'
      ? 'Текущая идея'
      : 'Current idea';

  const changeIdeaLabel =
    lang === 'ru'
      ? 'Сменить идею'
      : 'Switch idea';

  const handleSelect = (id: string) => {
    const found = knownIdeas.find((i) => i.id === id);
    if (found) {
      setActiveIdea(found);
      setSelectOpen(false);
    }
  };

  return (
    <section className="bg-[#0f172a] border border-gray-700 rounded-xl p-4 text-gray-100 mb-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        {/* Левая половина: текущая идея */}
        <div className="flex-1 min-w-0">
          <div className="text-xs text-gray-400 uppercase tracking-wide">
            {currentIdeaLabel}
          </div>

          {activeIdea ? (
            <>
              <div className="text-white font-semibold text-sm md:text-base break-words">
                {activeIdea.title || activeIdea.description.slice(0, 120)}
                {activeIdea.description.length > 120 ? '…' : ''}
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <button
                  type="button"
                  className="rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium px-3 py-1 text-[12px]"
                  onClick={() =>
                    router.push(`/idea/${activeIdea.id}/pipeline`)
                  }
                >
                  {goToPipelineText}
                </button>

                <button
                  type="button"
                  className="rounded-md bg-gray-700 hover:bg-gray-600 text-gray-100 font-medium px-3 py-1 text-[12px]"
                  onClick={() => setSelectOpen((s) => !s)}
                >
                  {changeIdeaLabel}
                </button>
              </div>
            </>
          ) : (
            <div className="text-gray-400 italic text-sm">
              {noIdeaText}
            </div>
          )}
        </div>

        {/* Правая половина: селектор выбора идеи */}
        {selectOpen && (
          <div className="md:w-64 w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-sm text-gray-100">
            {knownIdeas.length === 0 ? (
              <div className="text-gray-500 text-xs">
                {lang === 'ru'
                  ? 'Пока нет сохранённых идей.'
                  : 'No saved ideas yet.'}
              </div>
            ) : (
              <ul className="space-y-2 max-h-48 overflow-y-auto">
                {knownIdeas.map((idea) => (
                  <li key={idea.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(idea.id)}
                      className="w-full text-left rounded-md bg-gray-800 hover:bg-gray-700 border border-gray-600 px-3 py-2"
                    >
                      <div className="text-gray-100 font-medium text-[13px] leading-snug break-words">
                        {idea.title || idea.description.slice(0, 80)}
                        {idea.description.length > 80 ? '…' : ''}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-1 truncate">
                        {idea.id}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
