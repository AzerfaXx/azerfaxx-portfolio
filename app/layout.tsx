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
  metadataBase: new URL("https://azerfaxx.vercel.app"), // ✅ ajouté
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        <IntroProvider>
        <ClickSound />
        {children}
        </IntroProvider>
      </body>
    </html>
  );
}
