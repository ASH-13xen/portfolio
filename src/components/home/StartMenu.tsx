"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import React, { useState, useMemo } from "react";
import {
  Search,
  ChevronRight,
  Download,
  ArrowRight,
  FileText,
} from "lucide-react";

// --- DATA CONFIGURATION ---
const startMenuData: Record<
  string,
  {
    userImage: string;
    imageSize: string;
    items: Array<{
      icon?: string;
      label: string;
      url?: string;
      type?: "app" | "link" | "game";
    }>;
  }
> = {
  home: {
    userImage: "/photos/icondefaultapps.png",
    imageSize: "w-[50px] h-[50px]",
    items: [
      { icon: "/photos/iconchrome.png", label: "Google Chrome", type: "app" },
      { icon: "/photos/iconcalc.png", label: "Calculator", type: "app" },
    ],
  },
  games: {
    userImage: "/photos/icongames.png",
    imageSize: "w-27 h-16",
    items: [
      {
        label: "WorseDino",
        icon: "/photos/icondino.png",
        url: "https://worsedinoo.onrender.com",
        type: "game",
      },
    ],
  },
  socials: {
    userImage: "/photos/iconsocials.png",
    imageSize: "w-17 h-14",
    items: [
      {
        label: "LinkedIn",
        icon: "/photos/iconlinkedin.png",
        url: "https://www.linkedin.com/in/ashank-mishra-667185328/",
        type: "link",
      },
      {
        label: "GitHub",
        icon: "/photos/icongithub.png",
        url: "https://github.com/ASH-13xen",
        type: "link",
      },
      {
        label: "Instagram",
        icon: "/photos/iconinsta.png",
        url: "https://www.instagram.com/ashank_mishra13/",
        type: "link",
      },
    ],
  },
  pictures: {
    userImage: "/photos/iconcamera.png",
    imageSize: "w-19 h-14",
    items: [],
  },
  generic: {
    userImage: "/photos/icondefaultapps.png",
    imageSize: "w-[50px] h-[50px]",
    items: [],
  },
};

// --- HELPER COMPONENTS ---

const ProgramItem = ({
  icon,
  label,
  isSpecial = false,
  onClick,
}: {
  icon?: string;
  label: string;
  isSpecial?: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center p-1.5 rounded-[2px] cursor-pointer group transition-colors ${
        isSpecial
          ? "hover:bg-blue-100 hover:shadow-[inset_0_0_0_1px_#7da2ce]"
          : "hover:bg-[#dcebfd]/80 hover:shadow-[inset_0_0_0_1px_#7da2ce]"
      }`}
    >
      <div className="w-6 h-6 flex items-center justify-center mr-2">
        {icon ? (
          <img
            src={icon}
            alt={label}
            className="w-full h-full object-contain"
          />
        ) : isSpecial ? (
          label.includes("Resume") ? (
            <Download className="w-4 h-4 text-blue-600" />
          ) : (
            <FileText className="w-4 h-4 text-blue-600" />
          )
        ) : (
          <div className="w-5 h-5 bg-blue-400 rounded-sm" />
        )}
      </div>
      <div className="flex-1 flex flex-col">
        <span
          className={`text-xs text-slate-900 truncate ${
            isSpecial ? "font-bold" : "font-normal"
          }`}
        >
          {label}
        </span>
      </div>
      {isSpecial && (
        <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-blue-600" />
      )}
    </div>
  );
};

const SystemLink = ({ label, bold = false, categoryKey, onHover }: any) => (
  <button
    onMouseEnter={() => onHover(categoryKey)}
    onClick={() => onHover(categoryKey)}
    className={`w-full text-left px-3 py-1.5 text-xs text-white hover:bg-white/10 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] rounded-[2px] transition-colors truncate ${
      bold ? "font-semibold" : "font-normal"
    }`}
  >
    {label}
  </button>
);

// --- MAIN START MENU ---

interface StartMenuProps {
  onOpenBrowser: (url?: string) => void;
  onOpenCalc: () => void;
}

const StartMenu = ({ onOpenBrowser, onOpenCalc }: StartMenuProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("home");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const displayedItems = useMemo(() => {
    if (searchQuery.trim().length > 0) {
      const allItems = Object.values(startMenuData).flatMap((cat) => cat.items);
      return allItems.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return startMenuData[activeCategory]?.items || startMenuData.generic.items;
  }, [searchQuery, activeCategory]);

  const currentView = startMenuData[activeCategory] || startMenuData.generic;

  const handleItemClick = (item: any) => {
    if (item.label === "Google Chrome") {
      window.open("https://www.google.com", "_blank");
    } else if (item.label === "Calculator") {
      onOpenCalc();
    } else if (item.type === "game" && item.url) {
      onOpenBrowser(item.url);
    } else if (item.url) {
      window.open(item.url, "_blank");
    }
  };

  const handleDownload = (fileName: string, downloadName: string) => {
    const link = document.createElement("a");
    link.href = `/${fileName}`;
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShutdown = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <div
      className="fixed bottom-12 left-0 z-[49] w-[413px] h-[461px] flex rounded-t-lg overflow-visible font-sans select-none animate-in fade-in slide-in-from-bottom-2 duration-100 bg-no-repeat bg-bottom"
      style={{
        backgroundImage: "url('/photos/startmenubg3.png')",
        backgroundSize: "100% 100%",
      }}
    >
      {/* LEFT COLUMN */}
      <div className="w-[62%] h-full relative flex flex-col pl-4 pr-1 pt-12 pb-10">
        <div className="flex-1 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-gray-300 pr-1 mt-2">
          {displayedItems.length > 0 ? (
            displayedItems.map((item, idx) => (
              <ProgramItem
                key={`${activeCategory}-${idx}`}
                icon={item.icon}
                label={item.label}
                onClick={() => handleItemClick(item)}
              />
            ))
          ) : (
            <div className="px-2 py-4 text-xs text-slate-500 italic">
              No programs found.
            </div>
          )}
        </div>

        {/* BOTTOM SECTION - RESUME & LOR */}
        <div className="mt-1 pb-1">
          <div className="border-b border-gray-200/50 mb-1 mx-2" />
          <ProgramItem
            label="Download My Resume"
            isSpecial={true}
            onClick={() => handleDownload("resume.pdf", "Resume.pdf")}
          />
          <ProgramItem
            label="Download LORs"
            isSpecial={true}
            onClick={() => handleDownload("lor.pdf", "LORs.pdf")}
          />
        </div>

        <div className="absolute bottom-[14px] left-[14px] w-[88%] h-[30px]">
          <div className="relative group h-full w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search inside startmenu"
              className="w-full h-full bg-transparent border-none pl-2 pr-8 text-xs italic text-slate-600 focus:outline-none"
            />
            <Search className="absolute right-2 top-2 w-3.5 h-3.5 text-slate-500" />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="flex-1 h-full relative flex flex-col pr-2 pl-1 pt-12">
        {/* User Avatar */}
        <div className="absolute -top-[-8px] right-1/2 translate-x-1/2 flex flex-col items-center cursor-default z-50">
          <div
            className={`relative ${currentView.imageSize} flex items-center justify-center`}
          >
            <img
              src={currentView.userImage}
              className="h-full w-full object-contain animate-in fade-in zoom-in-95 duration-300"
              alt="User"
            />
          </div>
        </div>

        {/* System Links */}
        <div className="flex-1 flex flex-col px-1 space-y-2.25 mt-8 relative z-10">
          <SystemLink
            label="Default Apps"
            bold
            categoryKey="home"
            onHover={setActiveCategory}
          />
          <SystemLink
            label="Games"
            bold
            categoryKey="games"
            onHover={setActiveCategory}
          />
          <SystemLink
            label="Socials"
            bold
            categoryKey="socials"
            onHover={setActiveCategory}
          />
          <SystemLink
            label="Pictures"
            bold
            categoryKey="pictures"
            onHover={setActiveCategory}
          />
        </div>

        {/* --- CUSTOM INDEPENDENT IMAGE START --- */}
        {/* HOW TO CONTROL:
            1. top-[220px]: Moves it down from the top edge of the right column.
            2. left-[20px]: Moves it from the left edge of the right column.
            3. w-[100px]: Controls width.
            4. src: Update with your actual image path.
        */}
        <img
          src="/meri_photo.png" // <--- PUT YOUR IMAGE PATH HERE
          alt="Custom Element"
          className="absolute top-[285px] left-[20px] w-[104px] h-auto object-contain hover:scale-105 transition-transform z-20"
        />
        {/* --- CUSTOM INDEPENDENT IMAGE END --- */}

        {/* Shutdown Button */}
        <div className="absolute bottom-[14px] right-[33px] z-30">
          <div
            onClick={handleShutdown}
            className="flex items-center rounded-[2px] border border-[#3e5d7a]/80 bg-gradient-to-b from-[#87a9c9] to-[#639abf] shadow-sm hover:brightness-110 cursor-pointer active:scale-[0.99] transition-all"
          >
            <button className="px-3 py-1 text-[11px] text-white font-medium border-r border-[#3e5d7a]/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
              Shut down
            </button>
            <div className="px-1.5 py-1.5 hover:bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
              <ChevronRight className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
