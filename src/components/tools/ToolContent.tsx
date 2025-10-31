// src/components/tools/ToolContent.tsx
'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import { ToolSlug } from '@/lib/translations';
import { useIdeaContext } from '@/contexts/IdeaContext';
import { runTool as runToolApi, ToolRunResponse } from '@/lib/api-client';
import type { ScamperBuckets, TrizPrinciple, SixHatsBuckets } from '@/types/pipeline';

/**
 * Типы пропсов для интерактивов, чтобы корректно типизировать dynamic()
 */
type ScamperInputs = { goals?: string; constraints?: string };
type TrizInputs = { improve: string; worsens: string; params?: { improveId?: number; worsenId?: number } };
type HatsInputs = { goal?: string; constraints?: string };

type ScamperUIProps = {
  ideaId: string;
  ideaDescription: string;
  runTool: (payload: { inputs: ScamperInputs }) => Promise<{ sessionId: string; output: ScamperBuckets }>;
};
type TrizOutput = { principles: Array<TrizPrinciple> };
type TrizUIProps = {
  ideaId: string;
  ideaDescription: string;
  runTool: (payload: { inputs: TrizInputs }) => Promise<{ sessionId: string; output: TrizOutput }>;
};
type SixHatsUIProps = {
  ideaId: string;
  ideaDescription: string;
  runTool: (payload: { inputs: HatsInputs }) => Promise<{ sessionId: string; output: SixHatsBuckets }>;
};

/**
 * Динамические компоненты.
 * Указываем generic с типом пропсов и используем .then(m => m.default),
 * чтобы снять конфликт типов модуля и компонента.
 */
const ScamperUI = dynamic<ScamperUIProps>(() => import('./ScamperUI').then(m => m.default), { ssr: false });
const SixHatsUI = dynamic<SixHatsUIProps>(() => import('./SixHatsUI').then(m => m.default), { ssr: false });
const TrizUI = dynamic<TrizUIProps>(() => import('./TrizUI').then(m => m.default), { ssr: false });

/** Остальные (без специальных пропсов) */
const DisyUI = dynamic(() => import('./DisyUI'), { ssr: false });
const DesignThinkingUI = dynamic(() => import('./DesignThinkingUI'), { ssr: false });
const RolestormingUI = dynamic(() => import('./RolestormingUI'), { ssr: false });
const FiveWOneHUI = dynamic(() => import('./FiveWOneHUI'), { ssr: false });
const MindMapUI = dynamic(() => import('./MindMapUI'), { ssr: false });
const BrainstormingUI = dynamic(() => import('./BrainstormingUI'), { ssr: false });
const RandomWordUI = dynamic(() => import('./RandomWordUI'), { ssr: false });
const ForcedRelationshipsUI = dynamic(() => import('./ForcedRelationshipsUI'), { ssr: false });
const SynecticsUI = dynamic(() => import('./SynecticsUI'), { ssr: false });

type Props = { toolId: ToolSlug; interactive: boolean };

export default function ToolContent({ toolId, interactive }: Props) {
  const { t, tTool, lang } = useLanguage();
  const { activeIdea } = useIdeaContext();

  const pageTitle = useMemo(() => tTool(toolId, 'name'), [tTool, toolId]);
  const longDesc = useMemo(() => tTool(toolId, 'longDesc'), [tTool, toolId]);

  // Заголовок/шапка общие
  const header = (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-start">
        <div>
          <Link href="/" className="text-blue-500 hover:text-blue-400 font-semibold">
            ⬅️ {t('backToTools')}
          </Link>
          <h1 id="tool-title" className="text-2xl md:text-3xl font-bold text-gray-100 mt-2 leading-tight">
            {pageTitle}
          </h1>
        </div>
        <LanguageToggle />
      </div>
    </header>
  );

  const needIdea = interactive && !activeIdea;

  // Рисуем интерактивный блок (тип ReactNode -> не нужен JSX namespace)
  let interactiveBlock: React.ReactNode = null;

  if (interactive) {
    switch (toolId) {
      case '5w1h':
        interactiveBlock = <FiveWOneHUI />;
        break;
      case 'mind-map':
        interactiveBlock = <MindMapUI />;
        break;
      case 'brainstorming':
        interactiveBlock = <BrainstormingUI />;
        break;
      case 'random-word':
        interactiveBlock = <RandomWordUI />;
        break;
      case 'forced-relationships':
        interactiveBlock = <ForcedRelationshipsUI />;
        break;
      case 'synectics':
        interactiveBlock = <SynecticsUI />;
        break;

      case 'scamper':
        if (activeIdea) {
          const runTool = (payload: { inputs: ScamperInputs }) =>
            runToolApi<ScamperBuckets>(toolId, { ideaId: activeIdea.id, ...payload }) as Promise<
              ToolRunResponse<ScamperBuckets>
            >;
          interactiveBlock = (
            <ScamperUI
              ideaId={activeIdea.id}
              ideaDescription={activeIdea.description}
              runTool={async (payload) => {
                const res = await runTool(payload);
                // приводим тип к ожидаемому пропсу (по сути совпадает)
                return { sessionId: res.sessionId, output: res.output };
              }}
            />
          );
        }
        break;

      case 'triz':
        if (activeIdea) {
          const runTool = (payload: { inputs: TrizInputs }) =>
            runToolApi<TrizOutput>(toolId, { ideaId: activeIdea.id, ...payload }) as Promise<
              ToolRunResponse<TrizOutput>
            >;
          interactiveBlock = (
            <TrizUI
              ideaId={activeIdea.id}
              ideaDescription={activeIdea.description}
              runTool={async (payload) => {
                const res = await runTool(payload);
                return { sessionId: res.sessionId, output: res.output };
              }}
            />
          );
        }
        break;

      case 'six-hats':
        if (activeIdea) {
          const runTool = (payload: { inputs: HatsInputs }) =>
            runToolApi<SixHatsBuckets>(toolId, { ideaId: activeIdea.id, ...payload }) as Promise<
              ToolRunResponse<SixHatsBuckets>
            >;
          interactiveBlock = (
            <SixHatsUI
              ideaId={activeIdea.id}
              ideaDescription={activeIdea.description}
              runTool={async (payload) => {
                const res = await runTool(payload);
                return { sessionId: res.sessionId, output: res.output };
              }}
            />
          );
        }
        break;

      case 'disy':
        interactiveBlock = <DisyUI />;
        break;
      case 'rolestorming':
        interactiveBlock = <RolestormingUI />;
        break;
      case 'design-thinking':
        interactiveBlock = <DesignThinkingUI />;
        break;

      default:
        interactiveBlock = (
          <div className="bg-blue-50 p-6 rounded-lg text-center text-gray-900">
            <p className="font-medium">{t('comingSoon')}</p>
          </div>
        );
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {header}

      <main className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 space-y-6" aria-labelledby="tool-title">
        <section className="text-gray-300" aria-label={lang === 'ru' ? 'Описание' : 'Description'}>
          <p className="text-base md:text-lg leading-relaxed">{longDesc}</p>
        </section>

        {needIdea ? (
          <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
            <p className="text-sm">
              {lang === 'ru'
                ? 'Чтобы начать, выберите или создайте идею на странице инструментов.'
                : 'Please select or create an idea first on the tools page.'}
            </p>
            <div className="mt-3">
              <Link
                href="/tools"
                className="inline-flex items-center rounded-md bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-3 py-1.5"
              >
                {lang === 'ru' ? 'К списку инструментов' : 'Go to tools'}
              </Link>
            </div>
          </div>
        ) : (
          interactive && <section aria-label="Interactive area">{interactiveBlock}</section>
        )}

        <section
          className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r text-gray-900"
          aria-label={lang === 'ru' ? 'Подсказка' : 'Tip'}
        >
          <p className="text-sm">💡 {t('tip')}: {t('tipText')}</p>
        </section>
      </main>
    </div>
  );
}
