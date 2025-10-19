"use client";

import { useEffect } from "react";

export default function MusicToggle() {
  useEffect(() => {
    const introAudio = document.getElementById("introAudio") as HTMLAudioElement;
    const spaceAudio = document.getElementById("spaceAudio") as HTMLAudioElement;
    const musicToggle = document.getElementById("musicToggle");

    if (introAudio && !introAudio.paused) {
      introAudio.play();
      introAudio.onended = () => {
        if (spaceAudio) spaceAudio.play();
      };
    } else if (spaceAudio) {
      spaceAudio.play();
    }

    return () => {
      if (introAudio) introAudio.onended = null;
    };
  }, []);

  return (
    <button
      id="musicToggle"
      className="fixed top-4 right-4 w-12 h-12 bg-transparent border-none flex items-center justify-center text-transparent shadow-none transition-all duration-300"
      onClick={() => {
        const spaceAudio = document.getElementById("spaceAudio") as HTMLAudioElement | null;
        if (spaceAudio) {
          if (spaceAudio.paused) {
            spaceAudio.play();
          } else {
            spaceAudio.pause();
          }
          const button = document.getElementById("musicToggle");
          if (button) button.classList.toggle("playing", !spaceAudio.paused);
        }
      }}
    >
      <span className="wave-animation"></span>
    </button>
  );
}