// src/lib/tool-session.ts
const VERSION = 'v1';
const prefix = `IVT_TOOL_SESSION_${VERSION}`;

export type LocalToolSession<TOutput = unknown, TInputs = unknown> = {
  ideaId: string;
  toolId: string;
  inputs: TInputs;
  output: TOutput;
  updatedAt: string;
  status: 'updated' | 'draft';
  sessionId?: string;
};

export function sessionKey(toolId: string, ideaId: string) {
  return `${prefix}:${toolId}:${ideaId}`;
}

export function saveSession<TOutput, TInputs>(
  toolId: string,
  ideaId: string,
  data: LocalToolSession<TOutput, TInputs>
) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(sessionKey(toolId, ideaId), JSON.stringify(data));
}

export function loadSession<TOutput, TInputs = unknown>(
  toolId: string,
  ideaId: string
): LocalToolSession<TOutput, TInputs> | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(sessionKey(toolId, ideaId));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as LocalToolSession<TOutput, TInputs>;
  } catch {
    return null;
  }
}

export function clearSession(toolId: string, ideaId: string) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(sessionKey(toolId, ideaId));
}
