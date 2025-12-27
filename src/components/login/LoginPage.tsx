/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react"; // Import a spinner icon
import HomePage from "../home/HomePage";

const LoginPage = () => {
  // We now have 3 distinct phases: 'login' | 'loading' | 'active'
  const [appState, setAppState] = useState<"login" | "loading" | "active">(
    "login"
  );

  const handleLogin = () => {
    // 1. Switch to Loading State
    setAppState("loading");

    // 2. Play the Windows 7 Startup Sound
    // Ensure the file is at: public/sounds/startup.mp3
    const audio = new Audio("/Microsoft Windows 7 Startup Sound.mp3");

    // Lower volume slightly so it doesn't blast ears
    audio.volume = 0.6;

    audio.play().catch((err) => {
      console.warn("Audio playback failed (browser policy?):", err);
    });

    // 3. Wait 4 seconds (4000ms) before showing the desktop
    setTimeout(() => {
      setAppState("active");
    }, 4000);
  };

  // --- RENDER: HOME PAGE (Desktop) ---
  if (appState === "active") {
    return <HomePage />;
  }

  // --- RENDER: LOADING SCREEN ---
  if (appState === "loading") {
    return (
      <div
        className="flex h-screen w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat transition-opacity duration-500"
        style={{ backgroundImage: "url('/photos/lock_screen.jpg')" }}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Windows 7 Style Blue Spinner */}
          <Loader2 className="h-16 w-16 animate-spin text-[#26a0da]" />

          <h2 className="text-xl font-normal text-white drop-shadow-md tracking-wide">
            Welcome
          </h2>
        </div>
      </div>
    );
  }

  // --- RENDER: LOGIN SCREEN ---
  return (
    <div
      className="flex h-screen w-full flex-col items-center justify-center gap-2 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/photos/lock_screen.jpg')" }}
    >
      {/* Avatar / Button Wrapper */}
      <button
        type="button"
        onClick={handleLogin}
        className="group flex flex-col items-center focus:outline-none transition-transform active:scale-95"
      >
        {/* Clickable Image */}
        <div className="relative">
          <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <img
            src="/photos/user_button2.png"
            alt="User Button"
            className="h-32 w-32 rounded-lg object-cover shadow-2xl transition-all duration-200 group-hover:brightness-110 border-2 border-transparent group-hover:border-white/30"
          />
        </div>

        {/* 'Guest' Text */}
        <h3 className="mt-4 text-3xl font-normal text-white drop-shadow-md group-hover:underline decoration-white/50 underline-offset-4">
          Guest
        </h3>
      </button>

      {/* Language Selector */}
      <button
        type="button"
        className="mt-12 rounded  px-4 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-[#000000]/40 flex items-center gap-2 border border-white/10"
      >
        <span>English (United States)</span>
      </button>
    </div>
  );
};

export default LoginPage;
