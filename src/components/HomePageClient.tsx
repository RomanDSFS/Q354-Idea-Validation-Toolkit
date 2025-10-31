// src/components/HomePageClient.tsx
'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Tool } from '@/lib/tools-data';
import { ToolSlug } from '@/lib/translations';

export default function HomePageClient({ tools }: { tools: Tool[] }) {
  const { t, tTool } = useLanguage();

  return (
    <div className="">
      {/* ТОЛЬКО ГРИД, БЕЗ ХЕДЕРА */}
      <div className="max-w-7xl mx-auto px-0 py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => {
            const id = tool.id as ToolSlug;

            return (
              <Link key={id} href={`/tools/${id}`} className="block">
                <div className="relative bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all hover:bg-gray-750 p-4 h-full flex flex-col border border-gray-700">
                  {/* Бейдж прогресса (справа сверху) */}
                  {typeof tool.progress === 'number' && (
                    <div
                      className="absolute top-2 right-2 select-none"
                      aria-label={`${tool.progress}% ready`}
                      title={`${tool.progress}%`}
                    >
                      <span
                        className={[
                          'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold',
                          tool.progress >= 75
                            ? 'bg-emerald-700 text-emerald-200'
                            : tool.progress >= 50
                            ? 'bg-amber-900 text-amber-200'
                            : tool.progress >= 10
                            ? 'bg-amber-500 text-amber-900'
                            : 'bg-gray-700 text-gray-300',
                        ].join(' ')}
                      >
                        {tool.progress}%
                      </span>
                    </div>
                  )}

                  {/* Заголовок и описание */}
                  <h2 className="text-lg md:text-xl font-semibold text-white clamp-2">
                    {tTool(id, 'name')}
                  </h2>
                  <p className="mt-1 text-sm text-gray-300 clamp-3">
                    {tTool(id, 'shortDesc')}
                  </p>

                  {/* Метка «интерактивный/демо» */}
                  <div className="mt-3 pt-1">
                    <span className="inline-block px-3 py-1 text-xs md:text-sm font-medium bg-blue-700 text-blue-200 rounded-full">
                      {tool.interactive ? t('interactiveLabel') : 'Описание'}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
