import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Axe Mastery - Temple of the Ancient Axe",
  description: "Become an axe master and break the curse of the ancient temple by exploding balloons in this cinematic 3D experience. Crafted with Three.js, R3F, and interactive VFX.",
  keywords: [
    "Axe Mastery",
    "Ancient Temple Game",
    "3D Game",
    "Three.js",
    "React Three Fiber",
    "Interactive VFX",
    "Balloon Axe Game",
    "WebGL Game",
    "R3F Physics",
    "VFX Sound Game"
  ],
  authors: [{ name: "Varun Patel", url: "https://axe-mastery.vercel.app" }],
  creator: "Varun Patel",
  metadataBase: new URL("https://axe-mastery.vercel.app"),
  openGraph: {
    title: "Axe Mastery - Temple of the Ancient Axe",
    description: "Break the ancient curse by mastering your axe skills in this immersive 3D web game.",
    url: "https://axe-mastery.vercel.app",
    siteName: "Axe Mastery",
    images: [
      {
        url: "/axe-mastery-screenshot.png",
        width: 1200,
        height: 630,
        alt: "Axe Mastery Temple Scene",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
