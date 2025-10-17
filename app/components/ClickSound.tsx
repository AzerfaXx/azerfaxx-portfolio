// app/components/ClickSound.tsx

'use client';

import { useEffect } from 'react';

export default function ClickSound() {
  useEffect(() => {
    // Fonction qui sera appelée à chaque clic
    const handleClick = () => {
      // On crée un nouvel objet Audio avec le chemin vers votre son
      // Le chemin part de la racine car le fichier est dans /public
      const audio = new Audio('/son/click.mp3');
      audio.volume = 0.3;
      audio.play();
    };

    // On ajoute un "écouteur d'événement" sur tout le document
    document.addEventListener('click', handleClick);

    // Important : On nettoie l'écouteur quand le composant est "démonté"
    // pour éviter les fuites de mémoire.
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []); // Le tableau vide [] signifie que l'effet ne s'exécute qu'une seule fois

  return null; // Ce composant ne rend rien de visible à l'écran
}