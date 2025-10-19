import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import ClickSound from "./components/ClickSound";
import { IntroProvider } from "./context/IntroContext";

export const metadata: Metadata = {
  title: {
    default: "AzerfaXx | Portfolio",
    template: "%s | AzerfaXx",
  },
  description: "Développeur passionné et créateur de l'application TaskLife.",
  openGraph: {
    title: "AzerfaXx | Portfolio",
    description: "Découvrez mes projets et mon application TaskLife.",
    url: "https://azerfaxx.vercel.app",
    siteName: "AzerfaXx",
    images: [
      {
        url: "https://azerfaxx.vercel.app/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "fr-FR",
    type: "website",
  },
  metadataBase: new URL("https://azerfaxx.vercel.app"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "AzerfaXx",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-black ${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        <IntroProvider>
          <ClickSound />
          {children}
          {/* Bouton de contrôle de la musique - Style glassmorphic sobre */}
          <button
            id="musicToggle"
            className="fixed bottom-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-white/20 transition-all duration-300"
            onClick={() => {
              const spaceAudioRef = document.getElementById(
                "spaceAudio"
              ) as HTMLAudioElement | null;
              const introAudioRef = document.getElementById(
                "introAudio"
              ) as HTMLAudioElement | null;
              if (spaceAudioRef) {
                if (spaceAudioRef.paused && !introAudioRef?.paused) {
                  introAudioRef?.pause();
                  spaceAudioRef.play();
                } else if (spaceAudioRef.paused) {
                  spaceAudioRef.play();
                } else {
                  spaceAudioRef.pause();
                }
                const button = document.getElementById("musicToggle");
                if (button) button.classList.toggle("playing", !spaceAudioRef.paused);
              }
            }}
          >
            <span id="musicIcon" className="text-lg">
              🎵
            </span>
          </button>
          <audio id="introAudio" src="/son/intro.mp3" preload="auto"></audio>
          <audio id="spaceAudio" src="/son/space.mp3" preload="auto" loop></audio>
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
          <script
            dangerouslySetInnerHTML={{
              __html: `
                const introAudio = document.getElementById('introAudio');
                const spaceAudio = document.getElementById('spaceAudio');
                if (introAudio && !introAudio.paused) {
                  introAudio.play();
                  introAudio.onended = () => {
                    if (spaceAudio) spaceAudio.play();
                  };
                }
              `,
            }}
          />
        </IntroProvider>
      </body>
    </html>
  );
}