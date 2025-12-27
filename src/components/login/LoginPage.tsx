/* eslint-disable @next/next/no-img-element */
"use client"; // Needed for useState

import React, { useState } from "react";
import HomePage from "../home/HomePage"; // Adjust path based on your folder structure

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // If logged in, render the Home Page instead of the Login Screen
  if (isLoggedIn) {
    return <HomePage />;
  }

  return (
    <div
      className="flex h-screen w-full flex-col items-center justify-center gap-2 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/photos/lock_screen.jpg')" }}
    >
      {/* Avatar / Button Wrapper */}
      <button
        type="button"
        // ADDED onClick handler here
        onClick={() => setIsLoggedIn(true)}
        className="group flex flex-col items-center focus:outline-none"
      >
        {/* Simple Clickable Image */}
        <img
          src="/photos/user_button2.png"
          alt="User Button"
          className="h-32 w-32 rounded-lg object-cover transition-all duration-200 group-hover:scale-105 group-hover:brightness-110 group-active:scale-95s"
        />

        {/* 'Guest' Text */}
        <h3 className="mt-4 text-3xl font-normal text-white drop-shadow-md">
          Guest
        </h3>

        {/* Optional 'Locked' status */}
        <span className="mt-1 text-sm font-light text-gray-200 drop-shadow-md">
          Locked
        </span>
      </button>

      {/* Language Selector */}
      <button
        type="button"
        className="mt-8 rounded bg-black/40 px-3 py-1.5 text-xs font-medium text-white shadow-lg transition-colors hover:bg-black/60"
      >
        ENG / US
      </button>
    </div>
  );
};

export default LoginPage;
