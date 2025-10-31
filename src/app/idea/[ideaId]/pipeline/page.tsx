// src/app/idea/[ideaId]/pipeline/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { getPipeline } from '@/lib/api-client';
import { PipelineResult } from '@/types/pipeline';
import { useIdeaContext } from '@/contexts/IdeaContext';
import { useLanguage } from '@/contexts/LanguageContext';
import PipelinePhasesView from '@/components/PipelinePhasesView';
import PipelineSummaryBar from '@/components/PipelineSummaryBar';
import PhaseNav from '@/components/PhaseNav';

export default function IdeaPipelinePage() {
  const { ideaId } = useParams<{ ideaId: string }>();
  const { activeIdea, setActiveIdea } = useIdeaContext();
  const { lang } = useLanguage();

  const [data, setData] = useState<PipelineResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ideaId) return;

    setLoading(true);
    setError(null);

    // Грузим пайплайн и синхронизируем идею в контексте
    getPipeline(ideaId)
      .then((res) => {
        setData(res);
        if (!activeIdea || activeIdea.id !== res.idea.id) {
          setActiveIdea(res.idea);
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load pipeline.');
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ideaId]);

  if (loading) {
    return (
      <div className="p-8 text-gray-300 text-center">
        {lang === 'ru' ? 'Загрузка пайплайна...' : 'Loading pipeline...'}
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8 text-red-400 text-center">
        {lang === 'ru'
          ? 'Ошибка загрузки данных пайплайна.'
          : 'Failed to load pipeline data.'}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 space-y-6">
      <PhaseNav />
      <PipelineSummaryBar
        idea={data.idea}
        onExport={() => {
          // TODO: export report (Markdown/PDF)
          const md = `# Отчёт по идее\n\n**Идея:** ${data.idea.description}\n\n## Фазы\n\n\`\`\`json\n${JSON.stringify(data.phases, null, 2)}\n\`\`\`\n`;
          const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `ivt-${data.idea.id}-report.md`;
          a.click();
          URL.revokeObjectURL(url);
        }}
      />

      {/* ВАЖНО: у PipelinePhasesView остаётся проп data, не pipeline */}
      <PipelinePhasesView data={data} />
    </div>
  );
}
