"use client";

import { useEffect, useRef } from "react";

export function IntroSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Crée l'objet audio
    audioRef.current = new Audio("/son/intro.mp3");
    audioRef.current.volume = 0.5;

    // Essaie de jouer le son (certains navigateurs bloquent sans interaction)
    const playAudio = () => {
      if (!audioRef.current) return;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.warn("Lecture audio bloquée :", err);
      });
    };

    // Joue automatiquement à l'arrivée
    playAudio();

    // Rejoue si l'utilisateur revient sur l’onglet
    window.addEventListener("focus", playAudio);
    return () => {
      window.removeEventListener("focus", playAudio);
      audioRef.current?.pause();
    };
  }, []);

  return null; // pas d'affichage à l’écran
}
