export const translations = {
  ru: {
    siteTitle: 'Проверка идеи',
    description: 'Инструменты анализа, генерации и тестирования концепций.',
    allTools: 'Все инструменты',
    tip: 'Совет',
    tipText: 'используйте этот инструмент на отдельном воркшопе для максимальной глубины.',
    backToTools: 'Все инструменты',
    interactiveLabel: 'Интерактивный режим',
    comingSoon: 'Скоро будет доступен интерактивный режим',

    tools: {
      '5w1h': {
        name: '5W1H',
        shortDesc: 'Разбор идеи через What / Why / Who / Where / When / How.',
        longDesc: 'Структурированная декомпозиция сути задачи.',
        questions: {
          what: 'Что мы делаем?',
          why: 'Зачем это нужно?',
          who: 'Кто вовлечён/целевой пользователь?',
          where: 'Где это используется/применяется?',
          when: 'Когда это актуально/критично?',
          how: 'Как это будет работать?',
        },
      },

      'mind-map': {
        name: 'Mind Mapping',
        shortDesc: 'Карта связей контекста, проблем, участников и эффектов.',
        longDesc: 'Выявление узлов смысла и взаимосвязей.',
      },

      'brainstorming': {
        name: 'Brainstorming',
        shortDesc: 'Генерация максимального количества идей без критики.',
        longDesc: 'Снятие цензуры, фиксация потока решений.',
        rules: [
          'Не оцениваем идеи на этапе генерации.',
          'Стремимся к количеству.',
          'Строим на идеях друг друга.',
        ],
      },

      'random-word': {
        name: 'Random Word',
        shortDesc: 'Провокация ассоциаций через внешнее случайное слово.',
        longDesc: 'Принудительная смена контекста восприятия.',
      },

      'forced-relationships': {
        name: 'Forced Relationships',
        shortDesc: 'Комбинация несвязанных объектов для поиска нового решения.',
        longDesc: 'Целенаправленное смешивание несовместимых сущностей.',
      },

      'synectics': {
        name: 'Synectics',
        shortDesc: 'Поиск инсайтов через аналогии и метафоры.',
        longDesc: 'Снимает инерцию мышления напрямую.',
      },

      'scamper': {
        name: 'SCAMPER',
        shortDesc: 'Семь углов трансформации идеи: Substitute, Combine, Adapt...',
        longDesc: 'Системная доработка и вариативность.',
        blocks: ['Substitute', 'Combine', 'Adapt', 'Modify', 'Put to other use', 'Eliminate', 'Reverse'],
      },

      'triz': {
        name: 'TRIZ',
        shortDesc: 'Решение противоречий и поиск принципов устранения барьеров.',
        longDesc: 'Инженерный подход к изобретательским задачам.',
      },

      'disy': {
        name: 'Creative Strategy',
        shortDesc: 'Три роли: Мечтатель → Реалист → Критик.',
        longDesc: 'Разделение фаз воображения, планирования и проверки.',
        roles: ['dreamer', 'realist', 'critic'],
      },

      'six-hats': {
        name: 'Six Thinking Hats',
        shortDesc: 'Шесть режимов мышления: факты, риски, выгоды, эмоции и т.д.',
        longDesc: 'Фокусированная смена когнитивной роли.',
        hats: {
          white: 'Факты и данные',
          black: 'Риски и уязвимости',
          yellow: 'Ценность и выгоды',
          red: 'Чувства и интуиция',
          green: 'Альтернативы и креатив',
          blue: 'Структура процесса и управление мыслью',
        },
      },

      'rolestorming': {
        name: 'Rolestorming',
        shortDesc: 'Идеи от лица разных ролей и акторов.',
        longDesc: 'Смена точки зрения, выход за личные ограничения.',
      },

      'design-thinking': {
        name: 'Design Thinking',
        shortDesc: 'Понимание пользователя, прототип гипотезы, тест допущений.',
        longDesc: 'Практико-ориентированная проверка ценности.',
        stages: ['Empathize','Define', 'Ideate', 'Prototype', 'Test'],
      },
    },
  },

  en: {
    siteTitle: 'Idea Validation Toolkit',
    description: 'Interactive methods for analysis, generation and stress testing.',
    allTools: 'All Tools',
    tip: 'Tip',
    tipText: 'Run this tool in a dedicated workshop for best results.',
    backToTools: 'All Tools',
    interactiveLabel: 'Interactive mode',
    comingSoon: 'Interactive mode coming soon',

    tools: {
      '5w1h': {
        name: '5W1H',
        shortDesc: 'Decomposing the idea through What / Why / Who / Where / When / How.',
        longDesc: 'Structured decomposition of the essence of the task.',
        questions: {
          what: 'What are we doing?',
          why: 'Why is this needed?',
          who: 'Who is involved/target user?',
          where: 'Where is this used/applied?',
          when: 'When is this relevant/critical?',
          how: 'How will this work?',
        },
      },
      
      'mind-map': {
        name: 'Mind Mapping',
        shortDesc: 'Mapping connections of context, problems, participants, and effects.',
        longDesc: 'Identifying nodes of meaning and interconnections.',
      },

      'brainstorming': {
        name: 'Brainstorming',
        shortDesc: 'Generating a maximum number of ideas without criticism.',
        longDesc: 'Removing censorship, capturing the flow of solutions.',
        rules: [
          'Do not evaluate ideas during the generation phase.',
          'Aim for quantity.',
          'Build on each other\'s ideas.',
        ],
      },

      'random-word': {
        name: 'Random Word',
        shortDesc: 'Provoking associations through an external random word.',
        longDesc: 'Forced shift in perception context.',
      },

      'forced-relationships': {
        name: 'Forced Relationships',
        shortDesc: 'Combining unrelated objects to find a new solution.',
        longDesc: 'Deliberately mixing incompatible entities.',
      },

      'synectics': {
        name: 'Synectics',
        shortDesc: 'Finding insights through analogies and metaphors.',
        longDesc: 'Directly removes mental inertia.',
      },

      'scamper': {
        name: 'SCAMPER',
        shortDesc: 'Seven angles of idea transformation: Substitute, Combine, Adapt...',
        longDesc: 'Systematic refinement and variability.',
        blocks: ['Substitute', 'Combine', 'Adapt', 'Modify', 'Put to other use', 'Eliminate', 'Reverse'],
      },

      'triz': {
        name: 'TRIZ',
        shortDesc: 'Resolving contradictions and finding principles for overcoming barriers.',
        longDesc: 'An engineering approach to inventive tasks.',
      },

      'disy': {
        name: 'Creative Strategy',
        shortDesc: 'Three roles: Dreamer → Realist → Critic.',
        longDesc: 'Separation of phases of imagination, planning, and testing.',
        roles: ['dreamer', 'realist', 'critic'],
      },

      'six-hats': {
        name: 'Six Thinking Hats',
        shortDesc: 'Six modes of thinking: facts, risks, benefits, emotions, etc.',
        longDesc: 'Focused switching of cognitive roles.',
        hats: {
          white: 'Facts and data',
          black: 'Risks and vulnerabilities',
          yellow: 'Value and benefits',
          red: 'Feelings and intuition',
          green: 'Alternatives and creativity',
          blue: 'Process structure and thought management',
        },
      },

      'rolestorming': {
        name: 'Rolestorming',
        shortDesc: 'Generating ideas from the perspective of different roles and actors.',
        longDesc: 'Shifting points of view, transcending personal limitations.',
      },

      'design-thinking': {
        name: 'Design Thinking',
        shortDesc: 'Understanding the user, prototyping hypotheses, testing assumptions.',
        longDesc: 'Practice-oriented value testing.',
        stages: ['Empathize', 'Define', 'Ideate', 'Prototype', 'Test'],
      },
    },
  },
};

// Ключи инструментов:
export type ToolSlug = keyof typeof translations.ru.tools;
