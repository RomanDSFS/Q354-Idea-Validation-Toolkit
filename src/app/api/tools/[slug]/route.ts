// src/app/api/tools/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Если нужен CSR в деве: можно включить динамику
// export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ slug: string }> };

type ToolPayload = {
  ideaId: string;
  inputs?: unknown;
};

function makeSessionId(): string {
  // Генерация id с учётом окружения
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    try {
      
      return crypto.randomUUID();
    } catch {
      /* fallthrough */
    }
  }
  return `sess_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
}

export async function POST(request: NextRequest, context: Ctx) {
  const { slug } = await context.params;

  let payload: unknown = {};
  try {
    payload = await request.json();
  } catch {
    // пустое тело — ок
  }

  const { ideaId, inputs } = (payload || {}) as ToolPayload;
  if (!ideaId) {
    return NextResponse.json({ error: 'ideaId is required' }, { status: 400 });
  }

  const sessionId = makeSessionId();

  // Моки под конкретные инструменты
  switch (slug) {
    case 'scamper': {
      // UI ожидает ключи в нижнем регистре
      const output = {
        substitute: [
          'Заменить ручной онбординг на интерактивные подсказки внутри продукта.',
          'Использовать открытые данные вместо платных интеграций на первом этапе.',
        ],
        combine: [
          'Объединить анализ ниши с подсказками по позиционированию.',
          'Склеить отчёты с чеклистами next-steps для команды продаж.',
        ],
        adapt: [
          'Адаптировать подсказки под отраслевой жаргон пользователя.',
          'Подстроить формат отчётов под роли: фаундер, PM, маркетолог.',
        ],
        modify: [
          'Упростить форму ввода до двух полей и авто-дополнений.',
          'Добавить режим «быстрый ответ за 60 секунд».',
        ],
        putToOtherUses: [
          'Использовать движок анализа ниши для скрининга конкурсов/грантов.',
          'Применить рекомендации для контент-плана блога.',
        ],
        eliminate: [
          'Убрать шаг регистрации до просмотра первого результата (passwordless).',
          'Сократить количество обязательных вопросов при старте.',
        ],
        reverse: [
          'Сначала предложить гипотезы, затем спросить цель пользователя.',
          'Считать успех по отказам гипотез, а не по количеству идей.',
        ],
      };
      return NextResponse.json({ sessionId, output });
    }

    case 'triz': {
      // UI ждёт: { principles: Array<{ id, name, rationale, example }> }
      type TrizInputs = { improve?: string; worsens?: string };
      const { improve, worsens } = ((inputs ?? {}) as TrizInputs);
      const imp = improve ?? 'скорость внедрения';
      const wor = worsens ?? 'качество результата';

      const output = {
        principles: [
          {
            id: 10,
            name: 'Предварительное действие',
            rationale: `Если мы заранее подготавливаем данные/шаблоны — улучшается ${imp}, но риск по ${wor} компенсируем проверками.`,
            example:
              'Генерировать каркас отчёта при вводе идеи и постепенно уточнять разделы по мере сбора фактов.',
          },
          {
            id: 35,
            name: 'Изменение параметров',
            rationale: `Сменив метрику успешности фичи, снижаем негатив по "${wor}".`,
            example:
              'Оценивать качество не по субъективной «полезности», а по скорости принятия решения пользователем.',
          },
          {
            id: 1,
            name: 'Дробление',
            rationale: `Разбиваем большую задачу на этапы — прирост к ${imp} без резкой просадки ${wor}.`,
            example:
              'Разнести тяжёлый анализ на 3 коротких шага с быстрым фидбеком после каждого.',
          },
        ],
      };
      return NextResponse.json({ sessionId, output });
    }

    case 'six-hats': {
      // UI ждёт шесть массивов по шляпам в нижнем регистре
      const output = {
        white: ['Ключевые факты рынка: CAGR 12–15%, 3 крупных конкурента.'],
        black: ['Риск точности ИИ на узких доменах, возможен холодный старт.'],
        yellow: ['Сокращение времени анализа, улучшение решений, эффект «вау».'],
        red: ['Пользователь боится «слива» коммерческих данных.'],
        green: ['Встроить «what-if» симуляции и сценарии монетизации.'],
        blue: ['Ввести регулярные ревью гипотез раз в 2 недели.'],
      };
      return NextResponse.json({ sessionId, output });
    }

    default: {
      // Дефолтный мок — просто эхо
      const output = {
        message: `No specific mock for tool "${slug}". Echoing inputs.`,
        inputs,
        extra: { ideaId },
      };
      return NextResponse.json({ sessionId, output });
    }
  }
}

// (Необязательно) Если у тебя есть GET — приведи к той же сигнатуре
export async function GET(_request: NextRequest, context: Ctx) {
  const { slug } = await context.params;
  return NextResponse.json({ ok: true, tool: slug });
}
