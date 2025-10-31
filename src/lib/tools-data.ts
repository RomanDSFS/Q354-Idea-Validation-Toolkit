// src/lib/tools-data.ts
import { ToolSlug } from './translations';

export type Tool = {
  id: ToolSlug;
  icon?: string;
  interactive: boolean;
  /** Процент готовности инструмента (0–100). Заполняется вручную. */
  progress?: number;
};

export const tools: Tool[] = [
  { id: '5w1h',                 interactive: true,  progress: 0 },
  { id: 'mind-map',             interactive: true,  progress: 0 },
  { id: 'brainstorming',        interactive: true,  progress: 0 },
  { id: 'random-word',          interactive: true,  progress: 0 },
  { id: 'forced-relationships', interactive: true,  progress: 0 },
  { id: 'synectics',            interactive: true,  progress: 0 },
  { id: 'scamper',              interactive: true,  progress: 10 },
  { id: 'triz',                 interactive: true,  progress: 10 },
  { id: 'disy',                 interactive: true,  progress: 0 },
  { id: 'six-hats',             interactive: true,  progress: 10 },
  { id: 'rolestorming',         interactive: true,  progress: 0 },
  { id: 'design-thinking',      interactive: true,  progress: 0 },
] satisfies Tool[];
