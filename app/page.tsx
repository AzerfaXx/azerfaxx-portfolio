"use client";

import { useContext, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Particles from "./components/particles";
import { IntroContext } from "./context/IntroContext";

const navigation = [
  { name: "Projets", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  const { hasLaunched, setHasLaunched } = useContext(IntroContext);

  // Références pour les deux audios
  const introAudioRef = useRef<HTMLAudioElement | null>(null);
  const spaceAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleStart = async () => {
    if (hasLaunched) return;

    if (!introAudioRef.current) {
      introAudioRef.current = new Audio("/son/intro.mp3"); // Chemin corrigé
      introAudioRef.current.volume = 0.5;
    }

    try {
      await introAudioRef.current.play();
      setHasLaunched(true);
    } catch (err) {
      console.warn("Lecture audio bloquée par le navigateur :", err);
    }
  };

  // Gestion de la transition entre intro et space audio
  useEffect(() => {
    if (hasLaunched && introAudioRef.current) {
      introAudioRef.current.onended = () => {
        if (spaceAudioRef.current) {
          spaceAudioRef.current.play();
        }
      };
    }
  }, [hasLaunched]);

  // Initialisation du bouton musique
  useEffect(() => {
    if (!spaceAudioRef.current) {
      spaceAudioRef.current = new Audio("/son/space.mp3");
      spaceAudioRef.current.loop = true; // Boucle pour space.mp3
      spaceAudioRef.current.volume = 0.3; // Volume initial (ajustable)
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />

      <AnimatePresence>
        {!hasLaunched ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
            onClick={handleStart}
          >
            <h1 className="font-display text-3xl md:text-5xl text-zinc-200 select-none animate-glow-text transition-colors duration-500 hover:text-white">
              Appuyez pour lancer
            </h1>
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center w-full h-full"
          >
            <nav className="my-16 animate-fade-in">
              <ul className="flex items-center justify-center gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
                  >
                    {item.name}
                  </Link>
                ))}
              </ul>
            </nav>
            <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
            <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
              AzerfaXx
            </h1>
            <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
            <div className="my-16 text-center animate-fade-in">
              <h2 className="text-sm text-zinc-500 ">
                Télécharge mon application si tu veux mieux t'organiser dans
                ta vie :
                <br />
                <Link
                  target="_blank"
                  href="https://tasklife.base44.app/"
                  className="underline duration-500 hover:text-zinc-300"
                >
                  TaskLife
                </Link>
              </h2>
            </div>
            {/* Bouton de contrôle de la musique */}
            <button
              id="musicToggle"
              className="fixed bottom-4 right-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-600 transition-all duration-300"
              onClick={() => {
                if (spaceAudioRef.current) {
                  const isPlaying = spaceAudioRef.current.paused;
                  if (isPlaying) {
                    spaceAudioRef.current.play();
                  } else {
                    spaceAudioRef.current.pause();
                  }
                  const button = document.getElementById("musicToggle");
                  if (button) button.classList.toggle("playing", !isPlaying);
                }
              }}
            >
              <span id="musicIcon" className="text-xl">🎵</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Styles pour l'animation du bouton */}
      <style>
        {`
          #musicToggle.playing {
            animation: pulse 1.5s infinite;
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}