// src/contexts/IdeaContext.tsx
'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Idea } from '@/types/idea';

export interface IdeaContextValue {
  activeIdea: Idea | null;
  setActiveIdea: (idea: Idea) => void;
  clearActiveIdea: () => void;

  /**
   * Для случая, когда у нас список прошлых идей юзера,
   * например при выборе на /tools.
   * Пока оставляем как массив в состоянии.
   */
  knownIdeas: Idea[];
  setKnownIdeas: (ideas: Idea[]) => void;
}

const IdeaContext = createContext<IdeaContextValue | undefined>(undefined);

export function IdeaProvider({ children }: { children: ReactNode }) {
  const [activeIdea, _setActiveIdea] = useState<Idea | null>(null);
  const [knownIdeas, _setKnownIdeas] = useState<Idea[]>([]);

  const setActiveIdea = useCallback((idea: Idea) => {
    _setActiveIdea(idea);
    // если мы выбрали новую идею — имеет смысл добавить её в список известных
    _setKnownIdeas((prev) => {
      const exists = prev.find((i) => i.id === idea.id);
      if (exists) return prev;
      return [...prev, idea];
    });
  }, []);

  const clearActiveIdea = useCallback(() => {
    _setActiveIdea(null);
  }, []);

  const setKnownIdeas = useCallback((ideas: Idea[]) => {
    _setKnownIdeas(ideas);
  }, []);

  return (
    <IdeaContext.Provider
      value={{
        activeIdea,
        setActiveIdea,
        clearActiveIdea,
        knownIdeas,
        setKnownIdeas,
      }}
    >
      {children}
    </IdeaContext.Provider>
  );
}

export function useIdeaContext(): IdeaContextValue {
  const ctx = useContext(IdeaContext);
  if (!ctx) {
    throw new Error('useIdeaContext must be used within <IdeaProvider />');
  }
  return ctx;
}
