// components/IntroAnimation.tsx
"use client";

import { useState } from "react";
import LoginPage from "../login/LoginPage"; // Adjust this import path if LoginPage is in a different folder

export default function IntroAnimation() {
  const [videoFinished, setVideoFinished] = useState(false);

  if (videoFinished) {
    return <LoginPage />;
  }

  return (
    // 'fixed inset-0' pins it to the viewport corners
    // 'bg-black' ensures the background is black
    // 'z-50' puts it on top of everything
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black w-screen h-screen">
      <video
        autoPlay
        muted
        playsInline
        // This event fires when the video reaches the end
        onEnded={() => setVideoFinished(true)}
        // 'max-w-full max-h-full' ensures video never overflows screen
        // 'object-contain' keeps aspect ratio without cropping
        className="max-w-full max-h-full object-contain"
      >
        <source src="/videos/starting_animation.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
