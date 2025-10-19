"use client";

import { useEffect, useState } from "react";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const introAudio = document.getElementById("introAudio") as HTMLAudioElement;
    const spaceAudio = document.getElementById("spaceAudio") as HTMLAudioElement;

    if (introAudio && !introAudio.paused) {
      introAudio.play();
      introAudio.onended = () => {
        if (spaceAudio) {
          spaceAudio.play();
          setIsPlaying(true);
        }
      };
    } else if (spaceAudio && !spaceAudio.paused) {
      setIsPlaying(true);
    }

    return () => {
      if (introAudio) introAudio.onended = null;
    };
  }, []);

  const toggleMusic = () => {
    const spaceAudio = document.getElementById("spaceAudio") as HTMLAudioElement | null;
    if (spaceAudio) {
      if (spaceAudio.paused) {
        spaceAudio.play();
      } else {
        spaceAudio.pause();
      }
      setIsPlaying(!spaceAudio.paused);
    }
  };

  return (
    <button
      id="musicToggle"
      className="fixed top-4 right-4 w-12 h-12 flex items-center justify-center text-transparent shadow-none transition-all duration-300"
      onClick={toggleMusic}
    >
      <div className={`relative w-full h-full ${isPlaying ? "playing" : ""}`}>
        <span className="absolute w-8 h-8 bg-blue-500 rounded-full opacity-70 animate-pulse"></span>
        <span className="absolute w-6 h-6 bg-green-400 rounded-full opacity-50 animate-pulse-delay"></span>
        <span className="absolute w-4 h-4 bg-purple-300 rounded-full opacity-30 animate-pulse-delay-2"></span>
      </div>
      <style>
        {`
          .animate-pulse {
            animation: pulse 1.5s infinite;
          }
          .animate-pulse-delay {
            animation: pulse 1.5s infinite 0.3s;
          }
          .animate-pulse-delay-2 {
            animation: pulse 1.5s infinite 0.6s;
          }
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.5); opacity: 0.3; }
            100% { transform: scale(1); opacity: 0.7; }
          }
          #musicToggle.playing .animate-pulse {
            animation: pulsePlaying 1.5s infinite;
          }
          #musicToggle.playing .animate-pulse-delay {
            animation: pulsePlaying 1.5s infinite 0.3s;
          }
          #musicToggle.playing .animate-pulse-delay-2 {
            animation: pulsePlaying 1.5s infinite 0.6s;
          }
          @keyframes pulsePlaying {
            0% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(2); opacity: 0.1; }
            100% { transform: scale(1); opacity: 0.7; }
          }
          #musicToggle:not(.playing) .animate-pulse,
          #musicToggle:not(.playing) .animate-pulse-delay,
          #musicToggle:not(.playing) .animate-pulse-delay-2 {
            animation-play-state: paused;
          }
        `}
      </style>
    </button>
  );
}