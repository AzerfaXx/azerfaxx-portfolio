// app/context/IntroContext.tsx

"use client";

import { createContext, useState, ReactNode } from "react";

// On définit la "forme" de notre contexte
type IntroContextType = {
  hasLaunched: boolean;
  setHasLaunched: (value: boolean) => void;
};

// On crée le contexte avec une valeur par défaut
export const IntroContext = createContext<IntroContextType>({
  hasLaunched: false,
  setHasLaunched: () => {},
});

// On crée le "Provider", le composant qui va contenir et partager l'état
export function IntroProvider({ children }: { children: ReactNode }) {
  const [hasLaunched, setHasLaunched] = useState(false);

  return (
    <IntroContext.Provider value={{ hasLaunched, setHasLaunched }}>
      {children}
    </IntroContext.Provider>
  );
}