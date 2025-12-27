// components/home/DesktopIcon.tsx
/* eslint-disable @next/next/no-img-element */
import React from "react";

interface DesktopIconProps {
  icon: string;
  label: string;
  onClick?: () => void;
}

const DesktopIcon = ({ icon, label, onClick }: DesktopIconProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center justify-start w-[86px] p-1 rounded-[2px] border border-transparent hover:bg-white/40 hover:border-white focus:bg-white/20 focus:border-white/30 active:bg-white/30 transition-colors outline-none cursor-default mb-2"
    >
      <img
        src={icon}
        alt={label}
        className="w-12 h-12 object-contain drop-shadow-lg mb-1"
      />
      <span
        className="text-xs text-white text-center leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-2"
        style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.8)" }}
      >
        {label}
      </span>
    </button>
  );
};

export default DesktopIcon;
