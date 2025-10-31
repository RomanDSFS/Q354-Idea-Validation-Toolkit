// src/components/tools/TrizUI.tsx
'use client';

import { useEffect, useState } from 'react';
import { loadSession, saveSession, LocalToolSession } from '@/lib/tool-session';

type TrizOutput = {
  principles: Array<{ id: number | string; name: string; rationale: string; example: string }>;
};

type TrizInputs = {
  improve: string;
  worsens: string;
  params?: { improveId?: number; worsenId?: number };
};

type Props = {
  ideaId: string;
  ideaDescription: string;
  runTool: (inputs: { inputs: TrizInputs }) => Promise<{ sessionId: string; output: TrizOutput }>;
};

export default function TrizUI({ ideaId, ideaDescription, runTool }: Props) {
  const toolId = 'triz';

  const [inputs, setInputs] = useState<TrizInputs>({ improve: '', worsens: '' });
  const [output, setOutput] = useState<TrizOutput | null>(null);
  const [ratings, setRatings] = useState<Record<string, 'fit' | 'skip'>>({});
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const s = loadSession<TrizOutput, TrizInputs>(toolId, ideaId);
    if (s) {
      setInputs((s.inputs as TrizInputs) || { improve: '', worsens: '' });
      setOutput(s.output);
      setSessionId(s.sessionId);
    }
    
  }, [ideaId]);

  const save = (payload: LocalToolSession<TrizOutput, TrizInputs>) =>
    saveSession(toolId, ideaId, payload);

  async function generate() {
    setBusy(true);
    setErr(null);
    try {
      const res = await runTool({ inputs });
      setOutput(res.output);
      setSessionId(res.sessionId);
      save({
        ideaId,
        toolId,
        inputs,
        output: res.output,
        updatedAt: new Date().toISOString(),
        status: 'updated',
        sessionId: res.sessionId,
      });
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Failed to generate');
    } finally {
      setBusy(false);
    }
  }

  function mark(principleId: number | string, value: 'fit' | 'skip') {
    const pid = String(principleId);
    setRatings((r) => {
      const next = { ...r, [pid]: value };
      if (output) {
        save({
          ideaId,
          toolId,
          inputs,
          output: { ...output },
          updatedAt: new Date().toISOString(),
          status: 'updated',
          sessionId,
        });
      }
      return next;
    });
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-gray-700 bg-gray-800/60 p-4">
        <h3 className="text-white font-semibold text-lg">TRIZ</h3>
        <p className="text-gray-400 text-sm mt-1">{ideaDescription}</p>

        <div className="mt-4 grid md:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-white/80 text-sm">Что хотим улучшить</span>
            <input
              className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 p-2 text-sm text-white"
              value={inputs.improve}
              onChange={(e) => setInputs((s) => ({ ...s, improve: e.target.value }))}
              placeholder="Напр., скорость внедрения"
            />
          </label>
          <label className="block">
            <span className="text-white/80 text-sm">Что при этом ухудшается</span>
            <input
              className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 p-2 text-sm text-white"
              value={inputs.worsens}
              onChange={(e) => setInputs((s) => ({ ...s, worsens: e.target.value }))}
              placeholder="Напр., качество результата"
            />
          </label>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={generate}
            disabled={busy}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white text-sm"
          >
            {busy ? 'Подбор принципов…' : 'Подобрать принципы'}
          </button>
          {sessionId && <span className="text-xs text-white/60">Session: {sessionId}</span>}
          {err && <span className="text-xs text-red-300">{err}</span>}
        </div>
      </section>

      <section className="space-y-3">
        {!output?.principles?.length ? (
          <p className="text-sm text-gray-500">
            Нажмите «Подобрать принципы», чтобы увидеть рекомендации.
          </p>
        ) : (
          output.principles.map((p, idx) => {
            const key = `${p?.id ?? 'no-id'}-${idx}`;
            const pid = String(p.id);
            return (
              <div key={key} className="rounded-xl border border-gray-700 bg-gray-800/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-white font-semibold">{p.name}</h4>
                    <p className="text-gray-300 text-sm mt-1">{p.rationale}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => mark(p.id, 'fit')}
                      className={`px-2 py-1 rounded text-sm border ${
                        ratings[pid] === 'fit'
                          ? 'bg-emerald-600 text-white border-emerald-500'
                          : 'bg-gray-900 text-white/80 border-gray-700 hover:bg-gray-700'
                      }`}
                    >
                      Подходит
                    </button>
                    <button
                      onClick={() => mark(p.id, 'skip')}
                      className={`px-2 py-1 rounded text-sm border ${
                        ratings[pid] === 'skip'
                          ? 'bg-red-600 text-white border-red-500'
                          : 'bg-gray-900 text-white/80 border-gray-700 hover:bg-gray-700'
                      }`}
                    >
                      Не то
                    </button>
                  </div>
                </div>
                <div className="mt-2 rounded-lg bg-gray-900/70 border border-gray-700 p-3">
                  <p className="text-sm text-gray-200">{p.example}</p>
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}
