// src/components/tools/RandomWordUI.tsx
'use client';

//import { useLanguage } from '@/contexts/LanguageContext';

export default function RandomWordUI() {
  //const { tTool } = useLanguage();

  return (
    <div className="p-6 rounded-lg border border-gray-700 bg-gray-800">
      <h3 className="text-xl font-semibold text-white mb-4">RandomWordUI</h3>
      <p className="text-gray-300 text-sm">
        Заглушка для инструмента <strong>RandomWordUI</strong>.
        Здесь будет интерактивный интерфейс метода.
      </p>
    </div>
  );
}
