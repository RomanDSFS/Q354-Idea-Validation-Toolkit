import { Idea } from "@/types/idea";

export default function PipelineSummaryBar({ idea, onExport }: { idea: Idea; onExport?: () => void }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold">Результаты анализа идеи</h1>
        <p className="text-white/70 text-sm line-clamp-1">{idea.description}</p>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onExport} className="px-3 py-1.5 rounded-lg bg-white text-slate-900 text-sm">Скачать отчёт</button>
      </div>
    </div>
  );
}