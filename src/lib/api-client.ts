// src/lib/api-client.ts
import { Idea } from '@/types/idea';
import { PipelineResult } from '@/types/pipeline';

export interface PipelineRunResponse {
  ideaId: string;
  phases: PipelineResult['phases'];
  idea?: Idea;
}

export interface ToolRunResponse<TOutput = unknown> {
  sessionId: string;
  output: TOutput;
}

export async function runPipeline(ideaDescription: string): Promise<PipelineResult> {
  const res = await fetch('/api/pipeline', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description: ideaDescription }),
  });
  if (!res.ok) throw new Error('Failed to run pipeline');

  const data: PipelineRunResponse = await res.json();
  return {
    idea: data.idea ?? { id: data.ideaId, description: ideaDescription },
    phases: data.phases ?? {},
  };
}

export async function getPipeline(ideaId: string): Promise<PipelineResult> {
  const res = await fetch(`/api/pipeline?ideaId=${encodeURIComponent(ideaId)}`, { method: 'GET' });
  if (!res.ok) throw new Error('Failed to fetch pipeline data');

  const data: PipelineRunResponse = await res.json();
  if (!data.idea) throw new Error('Pipeline response missing idea data');

  return { idea: data.idea, phases: data.phases ?? {} };
}

/**
 * A) runTool(toolId, ideaId, params?)
 * B) runTool(toolId, payload) // payload обязательно содержит ideaId
 */
export async function runTool<TOutput = unknown>(
  toolId: string,
  ideaOrPayload?: string | Record<string, unknown>,
  params?: Record<string, unknown>
): Promise<ToolRunResponse<TOutput>> {
  let body: Record<string, unknown> = {};
  if (typeof ideaOrPayload === 'string') {
    body = { ideaId: ideaOrPayload, ...(params || {}) };
  } else if (ideaOrPayload && typeof ideaOrPayload === 'object') {
    body = { ...ideaOrPayload };
  }
  if (!('ideaId' in body)) throw new Error('runTool: payload must include ideaId');

  const res = await fetch(`/api/tools/${encodeURIComponent(toolId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Failed to run tool');

  const data = (await res.json()) as ToolRunResponse<TOutput>;
  return data;
}

export async function getIdeas(): Promise<Idea[]> {
  const res = await fetch('/api/ideas', { method: 'GET' });
  if (!res.ok) throw new Error('Failed to fetch ideas');
  return (await res.json()) as Idea[];
}
