// src/components/tools/ScamperUI.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { loadSession, saveSession, LocalToolSession } from '@/lib/tool-session';


type ScamperOutput = {
  substitute: string[];
  combine: string[];
  adapt: string[];
  modify: string[];
  putToOtherUses: string[];
  eliminate: string[];
  reverse: string[];
};

type ScamperInputs = { goals?: string; constraints?: string };

type Props = {
  ideaId: string;
  ideaDescription: string;
  runTool: (inputs: { inputs: ScamperInputs }) => Promise<{ sessionId: string; output: ScamperOutput }>;
};

export default function ScamperUI({ ideaId, ideaDescription, runTool }: Props) {
  const toolId = 'scamper';
  const [inputs, setInputs] = useState<ScamperInputs>({});  
  const [output, setOutput] = useState<ScamperOutput | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const s = loadSession<ScamperOutput, ScamperInputs>(toolId, ideaId);
    if (s) {
      setInputs(s.inputs || {});
      setOutput(s.output);
      setSessionId(s.sessionId);
    }
  }, [ideaId]);

  const save = (payload: LocalToolSession<ScamperOutput, ScamperInputs>) =>
    saveSession(toolId, ideaId, payload);

  async function generate() {
    setBusy(true);
    setError(null);
    try {
      const res = await runTool({ inputs });
      setOutput(res.output);
      setSessionId(res.sessionId);
      save({
        ideaId, toolId, inputs, output: res.output,
        updatedAt: new Date().toISOString(), status: 'updated', sessionId: res.sessionId,
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to generate');
    } finally {
      setBusy(false);
    }
  }

  const sections: Array<{ key: keyof ScamperOutput; label: string }> = useMemo(() => ([
    { key: 'substitute', label: 'Substitute' },
    { key: 'combine', label: 'Combine' },
    { key: 'adapt', label: 'Adapt' },
    { key: 'modify', label: 'Modify' },
    { key: 'putToOtherUses', label: 'Put to other uses' },
    { key: 'eliminate', label: 'Eliminate' },
    { key: 'reverse', label: 'Reverse' },
  ]), []);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-gray-700 bg-gray-800/60 p-4">
        <h3 className="text-white font-semibold text-lg">SCAMPER</h3>
        <p className="text-gray-400 text-sm mt-1">{ideaDescription}</p>

        <div className="mt-4 grid md:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-white/80 text-sm">Цели (опционально)</span>
            <textarea
              className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 p-2 text-sm text-white"
              rows={3}
              value={inputs.goals || ''}
              onChange={(e) => setInputs((s) => ({ ...s, goals: e.target.value }))}
              placeholder="Сократить time-to-value, повысить LTV, снизить ручной труд…"
            />
          </label>

          <label className="block">
            <span className="text-white/80 text-sm">Ограничения (опционально)</span>
            <textarea
              className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 p-2 text-sm text-white"
              rows={3}
              value={inputs.constraints || ''}
              onChange={(e) => setInputs((s) => ({ ...s, constraints: e.target.value }))}
              placeholder="Бюджет, сроки, доступ к данным и т.п."
            />
          </label>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={generate}
            disabled={busy}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white text-sm"
          >
            {busy ? 'Генерация…' : 'Сгенерировать'}
          </button>
          {sessionId && <span className="text-xs text-white/60">Session: {sessionId}</span>}
          {error && <span className="text-xs text-red-300">{error}</span>}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        {sections.map(({ key, label }) => (
          <div key={key} className="rounded-xl border border-gray-700 bg-gray-800/60 p-4">
            <h4 className="text-white font-semibold">{label}</h4>
            {!output?.[key]?.length ? (
              <p className="text-sm text-gray-500 mt-2">Нет данных — нажмите «Сгенерировать».</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {output[key].map((item, idx) => (
                  <li
                    key={idx}
                    className="rounded-lg bg-gray-900/70 border border-gray-700 p-2 text-sm text-gray-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
