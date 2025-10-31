// src/components/PhaseNav.tsx
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

const phases = [
  { id: 'research', labelRu: 'Research', labelEn: 'Research' },
  { id: 'generation', labelRu: 'Generation', labelEn: 'Generation' },
  { id: 'development', labelRu: 'Development', labelEn: 'Development' },
  { id: 'reflection', labelRu: 'Reflection', labelEn: 'Reflection' },
];

export default function PhaseNav({ active }: { active?: string }) {
  const pathname = usePathname();
  const params = useSearchParams();
  const { lang } = useLanguage();

  return (
    <nav className="sticky top-0 z-20 backdrop-blur bg-slate-900/70 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between gap-3">
        {/* ЛЕВЫЙ УГОЛ: Все инструменты */}
        <Link
          href="/"
          className="text-bold text-blue-600 font-bold hover:text-blue-700 whitespace-nowrap"
        >
          {lang === 'ru' ? ' Все инструменты' : 'All tools'}
        </Link>

        {/* ПРАВЫЙ УГОЛ: чипы фаз */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {phases.map((p) => {
            const href = `${pathname}?phase=${p.id}`;
            const isActive = (params.get('phase') ?? active) === p.id;
            const label = lang === 'ru' ? p.labelRu : p.labelEn;
            return (
              <Link
                key={p.id}
                href={href}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap border transition
                  ${isActive
                    ? 'bg-white text-slate-900 border-white'
                    : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
