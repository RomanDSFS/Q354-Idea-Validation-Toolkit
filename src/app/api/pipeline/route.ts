// src/app/api/pipeline/route.ts
import { NextRequest, NextResponse } from 'next/server';
import type { PipelinePhases } from '@/types/pipeline';
import type { Idea } from '@/types/idea';

/**
 * Типы входного/выходного формата для согласованности с фронтом.
 */
type RunBody = { description: string };

type PipelineResponse = {
  ideaId: string;
  phases: PipelinePhases;
  idea?: Idea;
};

/**
 * Вспомогательные генераторы (моки)
 */
function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    try {
      
      return crypto.randomUUID();
    } catch {
      /* noop */
    }
  }
  return `idea_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
}

function mockPhases(description: string): PipelinePhases {
  return {
    research: {
      fiveW1H: {
        what: description,
        why: 'Повысить скорость проверки гипотез.',
        who: 'Фаундеры, PM, аналитики.',
        where: 'Web-приложение.',
        when: 'На ранних этапах поиска PMF.',
        how: 'Набор структурированных методов и AI-помощник.',
      },
      mindMap: {
        root: 'Idea Validation',
        branches: ['Context', 'Ideation', 'Development', 'Validation'],
      },
    },
    generation: {
      brainstorming: ['Сценарии запуска', 'Модели монетизации', 'Партнёрства'],
      randomWord: ['Лупа → глубокий ресёрч', 'Компас → стратегия'],
      synectics: ['Аналогии из медицины/инженерии'],
      forcedRelationships: ['Фичи ↔ Ценности ↔ Метрики'],
    },
    development: {
      scamper: {
        substitute: ['Заменить длинный онбординг на прогрессивный'],
        combine: ['Склеить отчёты и next-steps'],
        adapt: ['Терминология под отрасль'],
        modify: ['Упростить ввод до 2 полей'],
        putToOtherUses: ['Использовать движок для грантов'],
        eliminate: ['Убрать регистрацию до перв.результата'],
        reverse: ['Сначала гипотезы, затем уточнение целей'],
      },
      triz: {
        principles: [
          { id: 10, name: 'Предварительное действие', rationale: 'Готовим артефакты заранее', example: 'Шаблоны отчётов' },
        ],
      },
    },
    reflection: {
      sixHats: {
        white: ['3 конкурента, CAGR ~12–15%'],
        black: ['Риск точности на узких доменах'],
        yellow: ['Экономия времени анализа'],
        red: ['Опасение за приватность данных'],
        green: ['What-if симуляции'],
        blue: ['Двухнедельные ревью гипотез'],
      },
      rolestorming: ['Клиент: хочу быстрый ROI', 'Инвестор: LTV/CAC ок?'],
      designThinking: ['Empathize → Define → Ideate → Prototype → Test'],
      disy: ['Dreamer / Realist / Critic'],
    },
  };
}

/**
 * POST /api/pipeline
 * Создание идеи и запуск пайплайна (мок).
 */
export async function POST(req: NextRequest) {
  let body: unknown = {};
  try {
    body = await req.json();
  } catch {
    // пустое тело — вернём 400 ниже
  }

  const { description } = (body || {}) as RunBody;
  if (!description || !description.trim()) {
    return NextResponse.json({ error: 'description is required' }, { status: 400 });
  }

  const idea: Idea = { id: makeId(), description: description.trim() };
  const phases = mockPhases(idea.description);

  const payload: PipelineResponse = {
    ideaId: idea.id,
    phases,
    idea,
  };

  return NextResponse.json(payload);
}

/**
 * GET /api/pipeline?ideaId=...
 * Получение пайплайна по идее (мок-версия: возвращает консистентные данные без персистенса).
 */
export async function GET(req: NextRequest) {
  const ideaId = req.nextUrl.searchParams.get('ideaId');
  if (!ideaId) {
    return NextResponse.json({ error: 'ideaId is required' }, { status: 400 });
  }

  // В демо-версии у нас нет хранения состояния между POST и GET,
  // поэтому возвращаем предсказуемый мок на основе ideaId.
  const idea: Idea = {
    id: ideaId,
    description: 'Идея была создана ранее. (Demo GET pipeline)',
  };

  const phases = mockPhases(idea.description);

  const payload: PipelineResponse = {
    ideaId: idea.id,
    phases,
    idea,
  };

  return NextResponse.json(payload);
}
