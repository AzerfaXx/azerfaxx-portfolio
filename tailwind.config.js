const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./mdx-components.tsx}",
		"content/**/*.mdx",
	],

	theme: {
		extend: {
			// Configuration pour le plugin @tailwindcss/typography (styles pour le MDX)
			typography: {
				DEFAULT: {
					css: {
						"code::before": { content: '""' },
						"code::after": { content: '""' },
					},
				},
				quoteless: {
					css: {
						"blockquote p:first-of-type::before": { content: "none" },
						"blockquote p:first-of-type::after": { content: "none" },
					},
				},
			},

			// Définition des polices personnalisées
			fontFamily: {
				sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
				display: ["var(--font-calsans)"],
			},

			// Définition des images de fond personnalisées
			backgroundImage: {
				"gradient-radial": "radial-gradient(50% 50% at 50% 50%, var(--tw-gradient-stops))",
			},

			// Définition des étapes d'animation (les "scènes" de l'animation)
			keyframes: {
				// Animations existantes
				"fade-in": {
					"0%": { opacity: "0%" },
					"75%": { opacity: "0%" },
					"100%": { opacity: "100%" },
				},
				"fade-left": {
					"0%": { transform: "translateX(100%)", opacity: "0%" },
					"30%": { transform: "translateX(0%)", opacity: "100%" },
					"100%": { opacity: "0%" },
				},
				"fade-right": {
					"0%": { transform: "translateX(-100%)", opacity: "0%" },
					"30%": { transform: "translateX(0%)", opacity: "100%" },
					"100%": { opacity: "0%" },
				},
				title: {
					"0%": {
						"line-height": "0%",
						"letter-spacing": "0.25em",
						opacity: "0",
					},
					"25%": { "line-height": "0%", opacity: "0%" },
					"80%": { opacity: "100%" },
					"100%": { "line-height": "100%", opacity: "100%" },
				},
				
				// NOUVELLE ANIMATION AJOUTÉE
				"glow-text": {
					"0%, 100%": {
						textShadow: "0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.1)",
					},
					"50%": {
						textShadow: "0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3)",
					},
				},
			},
			
			// Association des keyframes à des classes utilitaires (ex: "animate-title")
			animation: {
				// Animations existantes
				"fade-in": "fade-in 2s ease-in-out forwards",
				title: "title 5s ease-out forwards",
				"fade-left": "fade-left 5s ease-in-out forwards",
				"fade-right": "fade-right 5s ease-in-out forwards",

				// NOUVELLE CLASSE D'ANIMATION AJOUTÉE
				"glow-text": "glow-text 5s ease-in-out infinite",
			},
		},
	},

	plugins: [
		require("@tailwindcss/typography"),
		require("tailwindcss-debug-screens"), // Utile en dev pour voir le breakpoint actuel
	],
};