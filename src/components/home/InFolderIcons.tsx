/* eslint-disable @next/next/no-img-element */
import React from "react";

interface InFolderIconsProps {
  label: string;
  iconSrc: string;
  onClick: () => void;
  selected?: boolean;
}

const InFolderIcons = ({
  label,
  iconSrc,
  onClick,
  selected,
}: InFolderIconsProps) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation(); // Prevent deselecting when clicking the icon
        onClick();
      }}
      className={`group flex flex-col items-center justify-start w-[74px] p-1 rounded-[2px] border 
        ${
          selected
            ? "bg-sky-200/60 border-sky-300/80"
            : "border-transparent hover:bg-sky-100/60 hover:border-sky-200/80"
        } 
        transition-colors outline-none cursor-default`}
    >
      <img
        src={iconSrc}
        alt={label}
        className="w-11 h-11 object-contain mb-1 drop-shadow-sm"
      />
      <span
        className={`text-xs text-center leading-tight line-clamp-2 break-words px-0.5 
        ${selected ? "text-slate-900" : "text-slate-700"}`}
      >
        {label}
      </span>
    </button>
  );
};

export default InFolderIcons;
