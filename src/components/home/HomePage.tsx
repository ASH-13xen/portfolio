"use client";

import React, { useState } from "react";
import Taskbar from "./Taskbar";
import DesktopIcon from "./DesktopIcon";
import FolderWindow from "./FolderWindow";
import Chrome from "./Chrome";
import Calculator from "./Calculator";
import { getFolderContents } from "../../data/fileSystem";

const HomePage = () => {
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);

  // APP STATES
  const [isBrowserOpen, setIsBrowserOpen] = useState(false);
  const [browserInitialUrl, setBrowserInitialUrl] = useState<
    string | undefined
  >(undefined);
  const [isCalcOpen, setIsCalcOpen] = useState(false);

  const desktopItems = getFolderContents("desktop");

  const openBrowser = (url?: string) => {
    setBrowserInitialUrl(url); // Set the URL (either game link or undefined for default)
    setIsBrowserOpen(true);
  };

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden font-sans"
      style={{ backgroundImage: "url('/photos/home_page.jpg')" }}
    >
      {/* 1. DESKTOP ICONS */}
      <div className="absolute top-0 left-0 p-2 flex flex-col flex-wrap content-start gap-2 h-[calc(100vh-50px)]">
        {desktopItems.map((item) => (
          <DesktopIcon
            key={item.id}
            icon={item.icon}
            label={item.name}
            onClick={() => setActiveFolderId(item.id)}
          />
        ))}
      </div>

      {/* 2. FOLDER WINDOWS */}
      {activeFolderId && (
        <FolderWindow
          currentFolderId={activeFolderId}
          onNavigate={(newId) => setActiveFolderId(newId)}
          onClose={() => setActiveFolderId(null)}
        />
      )}

      {/* 3. APP WINDOWS */}
      {isBrowserOpen && (
        <Chrome
          initialUrl={browserInitialUrl}
          onClose={() => setIsBrowserOpen(false)}
        />
      )}

      {isCalcOpen && <Calculator onClose={() => setIsCalcOpen(false)} />}

      {/* 4. TASKBAR */}
      <Taskbar
        onOpenBrowser={openBrowser}
        onOpenCalc={() => setIsCalcOpen(true)}
      />
    </div>
  );
};

export default HomePage;
