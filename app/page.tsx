"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Particles from "./components/particles";

const navigation = [
	{ name: "Projets", href: "/projects" },
	{ name: "Contact", href: "/contact" },
];

export default function Home() {
	const [started, setStarted] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const handleStart = async () => {
		if (started) return; // Empêche de cliquer plusieurs fois

		if (!audioRef.current) {
			audioRef.current = new Audio("/son/intro.mp3");
			audioRef.current.volume = 0.5;
		}

		try {
			await audioRef.current.play();
		} catch (err) {
			console.warn("Lecture audio bloquée par le navigateur :", err);
		}

		setStarted(true);
	};

	return (
		// 👇 Structure principale qui contient les éléments communs (fond, particules)
		<div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
			<Particles
				className="absolute inset-0 -z-10 animate-fade-in"
				quantity={100}
			/>

			<AnimatePresence>
				{!started ? (
					// 👇 Écran d'intro AMÉLIORÉ
					<motion.div
						key="intro"
						initial={{ opacity: 1 }}
						exit={{
							opacity: 0,
							scale: 0.95, // Effet de zoom arrière subtil
							filter: "blur(4px)", // Effet de flou en sortant
						}}
						transition={{ duration: 0.7, ease: "easeOut" }}
						className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
						onClick={handleStart}
					>
						{/* Typo stylisée avec une animation de lueur */}
						<h1 className="font-display text-3xl md:text-5xl text-zinc-200 select-none animate-glow-text transition-colors duration-500 hover:text-white">
							Appuyez pour lancer
						</h1>
					</motion.div>
				) : (
					// 👇 Ton vrai contenu (accueil)
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
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}