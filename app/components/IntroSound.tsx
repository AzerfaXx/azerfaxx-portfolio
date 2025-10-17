"use client";

import { useEffect, useRef } from "react";

export function IntroSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    // Prépare le son
    audioRef.current = new Audio("/son/intro.mp3");
    audioRef.current.volume = 0.5;

    const playAudio = async () => {
      if (!audioRef.current || hasPlayedRef.current) return;
      try {
        await audioRef.current.play();
        hasPlayedRef.current = true;
        // console.log("🎵 Son joué");
      } catch {
        // Attente d'une interaction
      }
    };

    // 1️⃣ Tente de jouer directement
    playAudio();

    // 2️⃣ Si refusé, attend la première interaction
    const onFirstInteraction = () => {
      playAudio();
      window.removeEventListener("click", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      window.removeEventListener("scroll", onFirstInteraction);
    };

    window.addEventListener("click", onFirstInteraction);
    window.addEventListener("keydown", onFirstInteraction);
    window.addEventListener("scroll", onFirstInteraction);

    // Nettoyage
    return () => {
      window.removeEventListener("click", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      window.removeEventListener("scroll", onFirstInteraction);
      audioRef.current?.pause();
    };
  }, []);

  return null;
}
