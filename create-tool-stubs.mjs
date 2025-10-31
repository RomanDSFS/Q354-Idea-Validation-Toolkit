// create-tool-stubs.mjs
// Автоматически создаёт файлы-заглушки UI для инструментов

import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const baseDir = 'E:/Q354-Check-Idea/src/components/tools';

const tools = [
  'FiveWOneHUI',
  'MindMapUI',
  'BrainstormingUI',
  'RandomWordUI',
  'ForcedRelationshipsUI',
  'SynecticsUI',
  'TrizUI',
  'DisyUI',
  'SixHatsUI',
  'RolestormingUI',
  'DesignThinkingUI',
];

const template = (name) => `// src/components/tools/${name}.tsx
'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function ${name}() {
  const { tTool } = useLanguage();

  return (
    <div className="p-6 rounded-lg border border-gray-700 bg-gray-800">
      <h3 className="text-xl font-semibold text-white mb-4">${name}</h3>
      <p className="text-gray-300 text-sm">
        Заглушка для инструмента <strong>${name}</strong>.
        Здесь будет интерактивный интерфейс метода.
      </p>
    </div>
  );
}
`;

if (!existsSync(baseDir)) {
  mkdirSync(baseDir, { recursive: true });
}

for (const tool of tools) {
  const filePath = join(baseDir, `${tool}.tsx`);
  if (existsSync(filePath)) {
    console.log(`⚠️  ${tool}.tsx уже существует — пропущен`);
    continue;
  }
  writeFileSync(filePath, template(tool), 'utf8');
  console.log(`✅ создан: ${filePath}`);
}

console.log('\nВсе заглушки успешно созданы.');
