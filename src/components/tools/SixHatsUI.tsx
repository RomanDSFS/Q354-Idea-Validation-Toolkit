// src/components/tools/SixHatsUI.tsx
'use client';

import { useEffect, useState } from 'react';
import { loadSession, saveSession, LocalToolSession } from '@/lib/tool-session';

type Hats = 'white' | 'black' | 'yellow' | 'red' | 'green' | 'blue';

type HatsOutput = Record<Hats, string[]>;
type HatsInputs = { goal?: string; constraints?: string };

type Props = {
  ideaId: string;
  ideaDescription: string;
  runTool: (payload: { inputs: HatsInputs }) => Promise<{ sessionId: string; output: HatsOutput }>;
};

const HAT_LABEL: Record<Hats, string> = {
  white: 'White — факты',
  black: 'Black — риски',
  yellow: 'Yellow — выгоды',
  red: 'Red — интуиция',
  green: 'Green — идеи',
  blue: 'Blue — управление',
};

export default function SixHatsUI({ ideaId, ideaDescription, runTool }: Props) {
  const toolId = 'six-hats';
  const [inputs, setInputs] = useState<HatsInputs>({});
  const [output, setOutput] = useState<HatsOutput | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const s = loadSession<HatsOutput, HatsInputs>(toolId, ideaId);
    if (s) {
      setInputs(s.inputs || {});
      setOutput(s.output);
      setSessionId(s.sessionId);
    }
  }, [ideaId]);

  const save = (payload: LocalToolSession<HatsOutput, HatsInputs>) =>
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

  function addItem(hat: Hats, text: string) {
    if (!text.trim()) return;
    const next: HatsOutput = { ...(output || defaultOutput()) };
    next[hat] = [...(next[hat] || []), text.trim()];
    setOutput(next);
    save({
      ideaId,
      toolId,
      inputs,
      output: next,
      updatedAt: new Date().toISOString(),
      status: 'updated',
      sessionId,
    });
  }

  function removeItem(hat: Hats, idx: number) {
    if (!output) return;
    const next: HatsOutput = { ...output, [hat]: output[hat].filter((_, i) => i !== idx) };
    setOutput(next);
    save({
      ideaId,
      toolId,
      inputs,
      output: next,
      updatedAt: new Date().toISOString(),
      status: 'updated',
      sessionId,
    });
  }

  function defaultOutput(): HatsOutput {
    return { white: [], black: [], yellow: [], red: [], green: [], blue: [] };
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-gray-700 bg-gray-800/60 p-4">
        <h3 className="text-white font-semibold text-lg">Six Thinking Hats</h3>
        <p className="text-gray-400 text-sm mt-1">{ideaDescription}</p>

        <div className="mt-4 grid md:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-white/80 text-sm">Цель обсуждения</span>
            <input
              className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 p-2 text-sm text-white"
              value={inputs.goal || ''}
              onChange={(e) => setInputs((s) => ({ ...s, goal: e.target.value }))}
              placeholder="Что хотим решить/понять?"
            />
          </label>
          <label className="block">
            <span className="text-white/80 text-sm">Ограничения</span>
            <input
              className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 p-2 text-sm text-white"
              value={inputs.constraints || ''}
              onChange={(e) => setInputs((s) => ({ ...s, constraints: e.target.value }))}
              placeholder="Сроки, бюджет, ресурсы"
            />
          </label>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={generate}
            disabled={busy}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white text-sm"
          >
            {busy ? 'Формируем шляпы…' : 'Сгенерировать тезисы'}
          </button>
          {sessionId && <span className="text-xs text-white/60">Session: {sessionId}</span>}
          {err && <span className="text-xs text-red-300">{err}</span>}
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(output || defaultOutput()) &&
          (Object.keys(HAT_LABEL) as Hats[]).map((hat) => (
            <div key={hat} className="rounded-xl border border-gray-700 bg-gray-800/60 p-4">
              <h4 className="text-white font-semibold">{HAT_LABEL[hat]}</h4>

              <ul className="mt-2 space-y-2">
                {(output?.[hat] || []).map((item, idx) => (
                  <li key={idx} className="flex items-start justify-between gap-3">
                    <span className="text-sm text-gray-200">{item}</span>
                    <button
                      onClick={() => removeItem(hat, idx)}
                      className="text-xs px-2 py-1 rounded bg-gray-900 border border-gray-700 hover:bg-gray-700 text-white/80"
                      title="Удалить"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>

              <HatAdder onAdd={(text) => addItem(hat, text)} />
            </div>
          ))}
      </section>
    </div>
  );
}

function HatAdder({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState('');
  return (
    <div className="mt-3 flex items-center gap-2">
      <input
        className="flex-1 rounded-lg bg-gray-900 border border-gray-700 p-2 text-sm text-white"
        placeholder="Добавить тезис…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onAdd(text);
            setText('');
          }
        }}
      />
      <button
        onClick={() => {
          onAdd(text);
          setText('');
        }}
        className="px-2 py-1 rounded bg-gray-900 border border-gray-700 hover:bg-gray-700 text-white/80 text-sm"
      >
        Добавить
      </button>
    </div>
  );
}
