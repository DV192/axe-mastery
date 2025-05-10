"use client";

import CanvasRenderer from "@/components/home/CanvasRenderer";
import HomePage from "@/components/home/HomePage";

export default function Home() {
  return (
    <main className="w-full h-full min-h-[100dvh] flex flex-col items-center justify-center text-center">
      <HomePage />
      <CanvasRenderer />
    </main>
  );
}
