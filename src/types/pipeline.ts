// src/types/pipeline.ts
import { Idea } from './idea';

export type ScamperBuckets = {
  substitute: string[];
  combine: string[];
  adapt: string[];
  modify: string[];
  putToOtherUses: string[];
  eliminate: string[];
  reverse: string[];
};

export type TrizPrinciple = {
  id: number | string;
  name: string;
  rationale: string;
  example: string;
};

export type SixHatsBuckets = Record<'white' | 'black' | 'yellow' | 'red' | 'green' | 'blue', string[]>;

export interface PipelinePhases {
  research?: {
    fiveW1H?: unknown;
    mindMap?: unknown;
  };
  generation?: {
    brainstorming?: unknown;
    randomWord?: unknown;
    synectics?: unknown;
    forcedRelationships?: unknown;
  };
  development?: {
    scamper?: ScamperBuckets | unknown;
    triz?: { principles: TrizPrinciple[] } | unknown;
  };
  reflection?: {
    sixHats?: SixHatsBuckets | unknown;
    rolestorming?: unknown;
    designThinking?: unknown;
    disy?: unknown;
  };
}

export interface PipelineResult {
  idea: Idea;
  phases: PipelinePhases;
}
