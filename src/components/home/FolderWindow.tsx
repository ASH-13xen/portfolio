/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  fileSystem,
  getBreadcrumbs,
  getFolderContents,
} from "../../data/fileSystem";

// DATA IMPORTS
import { projectDetails } from "../../data/projectData";
import { skillDetails } from "../../data/skillData";
import { certDetails } from "../../data/certificationData";
import { victoryDetails } from "../../data/victoryData";

// COMPONENT IMPORTS
import InFolderIcons from "./InFolderIcons";
import { ProjectDialog } from "./ProjectDialog";
import { SkillDialog } from "./SkillDialog";
import { CertificationDialog } from "./CertificationDialog";
import { VictoryDialog } from "./VictoryDialog";
import { ContactDialog } from "./ContactDialog";
import IframeOverlay from "./IframeOverlay";

interface FolderWindowProps {
  currentFolderId: string;
  onNavigate: (folderId: string) => void;
  onClose: () => void;
}

const FolderWindow = ({
  currentFolderId,
  onNavigate,
  onClose,
}: FolderWindowProps) => {
  // --- STATE ---
  const [savedPosition, setSavedPosition] = useState({ x: 80, y: 80 });
  const [searchQuery, setSearchQuery] = useState("");

  // --- POPUP STATES ---
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [selectedCertId, setSelectedCertId] = useState<string | null>(null);
  const [selectedVictoryId, setSelectedVictoryId] = useState<string | null>(
    null
  );
  const [showContact, setShowContact] = useState(false);
  const [isIframeOpen, setIsIframeOpen] = useState(false);

  // --- REFS ---
  const windowRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  // --- HELPER: DYNAMIC CONTENT GENERATION ---
  // This function decides whether to read from fileSystem (static)
  // or generate content dynamically from your Data files.
  const getCombinedContents = (folderId: string) => {
    // 1. DYNAMIC: Certifications
    // Make sure 'folder-certifications' matches the ID in your fileSystem!
    if (folderId === "folder-certifications") {
      return Object.entries(certDetails).map(([id, cert]) => ({
        id: id,
        name: cert.name,
        icon: cert.icon, // Automatically uses icon from data
        type: "file",
      }));
    }

    // 2. DYNAMIC: Skills (Optional - logic added if you want same behavior for skills)
    if (folderId === "folder-skills") {
      return Object.entries(skillDetails).map(([id, skill]) => ({
        id: id,
        name: skill.name,
        icon: skill.icon,
        type: "file",
      }));
    }

    // 3. STATIC: Default to fileSystem for everything else
    return getFolderContents(folderId);
  };

  // --- COMPUTED DATA ---
  const currentFolder = fileSystem[currentFolderId];

  const breadcrumbs = useMemo(
    () => getBreadcrumbs(currentFolderId),
    [currentFolderId]
  );

  // Use our new helper instead of the raw import
  const currentFolderContents = useMemo(
    () => getCombinedContents(currentFolderId),
    [currentFolderId]
  );

  const displayContents = useMemo(() => {
    // If no search, return the folder contents (dynamic or static)
    if (!searchQuery) return currentFolderContents;

    const lowerQuery = searchQuery.toLowerCase();

    // 1. Search in FileSystem
    const fsResults = Object.values(fileSystem).filter((item) =>
      item.name.toLowerCase().includes(lowerQuery)
    );

    // 2. Search in Dynamic Data (So deleted FS items still show up in search)
    const certResults = Object.entries(certDetails)
      .filter(([, val]) => val.name.toLowerCase().includes(lowerQuery))
      .map(([id, val]) => ({
        id,
        name: val.name,
        icon: val.icon,
        type: "file",
      }));

    // Merge and Deduplicate
    const allResults = [...fsResults, ...certResults];
    const uniqueResults = Array.from(
      new Map(allResults.map((item) => [item.id, item])).values()
    );

    return uniqueResults;
  }, [searchQuery, currentFolderContents]);

  useEffect(() => {
    setSearchQuery("");
  }, [currentFolderId]);

  // --- DRAG HANDLERS ---
  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === "BUTTON" ||
      target.closest("button") ||
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA"
    )
      return;
    isDragging.current = true;
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !windowRef.current) return;
      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;
      windowRef.current.style.left = `${newX}px`;
      windowRef.current.style.top = `${newY}px`;
    };
    const handleMouseUp = () => {
      if (isDragging.current && windowRef.current) {
        isDragging.current = false;
        const rect = windowRef.current.getBoundingClientRect();
        setSavedPosition({ x: rect.left, y: rect.top });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // --- CENTRALIZED CLICK HANDLER ---
  const handleItemClick = (item: any) => {
    if (projectDetails[item.id]) {
      setSelectedProjectId(item.id);
      return;
    }
    if (skillDetails[item.id]) {
      setSelectedSkillId(item.id);
      return;
    }
    if (certDetails[item.id]) {
      setSelectedCertId(item.id);
      return;
    }
    if (victoryDetails[item.id]) {
      setSelectedVictoryId(item.id);
      return;
    }
    if (item.id === "contact-mail") {
      setShowContact(true);
      return;
    }
    if (item.type === "folder") {
      onNavigate(item.id);
    }
  };

  // --- SIDEBAR RENDERER ---
  const renderSidebarItem = (itemId: string, level: number = 0) => {
    const item = fileSystem[itemId];
    const isCurrent = item.id === currentFolderId;
    const isParentOfCurrent = breadcrumbs.some((b) => b.id === item.id);
    const shouldExpand =
      item.id === "desktop" || isParentOfCurrent || isCurrent;

    // Use our new Helper here too so the tree updates dynamically
    const children = getCombinedContents(item.id).filter(
      (child: any) =>
        child.type === "folder" ||
        skillDetails[child.id] ||
        projectDetails[child.id] ||
        certDetails[child.id] ||
        victoryDetails[child.id] ||
        child.id === "contact-mail"
    );

    return (
      <div key={item.id}>
        <div
          className={`flex items-center text-[11px] cursor-pointer py-[2px] transition-colors
            ${
              isCurrent
                ? "text-blue-600 font-bold"
                : "text-slate-600 hover:text-blue-500"
            }`}
          style={{ paddingLeft: `${level * 6 + 10}px` }}
          onClick={() => handleItemClick(item)}
        >
          <span className="w-3 text-[9px] text-slate-400 -ml-3 mr-0.5 text-center">
            {children.length > 0 && (shouldExpand ? "▼" : "▶")}
          </span>
          <img src={item.icon} className="w-3 h-3 mr-1 opacity-80" alt="" />
          <span className="truncate">{item.name}</span>
        </div>

        {shouldExpand && (
          <div>
            {children.map((child: any) =>
              renderSidebarItem(child.id, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={windowRef}
      onMouseDown={handleMouseDown}
      className="absolute w-[792px] h-[550px] pt-20 box-border shadow-2xl z-40 bg-no-repeat font-sans select-none animate-in fade-in zoom-in-95 duration-100"
      style={{
        backgroundImage: "url('/photos/folderwallpaper1.png')",
        backgroundSize: "792px 639px",
        top: savedPosition.y,
        left: savedPosition.x,
      }}
    >
      {/* Title */}
      <div className="absolute top-[43px] left-[14px] text-xs text-black font-normal opacity-80">
        {searchQuery
          ? `Search Results for "${searchQuery}"`
          : currentFolder?.name || "Folder"}
      </div>

      {/* Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-[32px] right-[11px] w-[66px] h-[19px] hover:bg-red-500/20 active:bg-red-500/40 cursor-default outline-none"
        title="Close"
      />

      {/* Breadcrumbs */}
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="absolute top-[77px] left-[25px] right-[200px] h-[24px] flex items-center px-1 text-xs text-slate-700 overflow-hidden whitespace-nowrap"
      >
        <img
          src="/photos/iconfolder.png"
          alt=""
          className="w-3.5 h-3.5 mr-1.5 opacity-70"
        />
        {searchQuery ? (
          <span className="font-medium ml-1">Search Results</span>
        ) : (
          breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.id}>
              {index > 0 && (
                <span className="mx-1 text-slate-400 text-[10px]">▶</span>
              )}
              <div
                onClick={() => onNavigate(crumb.id)}
                className="hover:bg-sky-100 border border-transparent px-1 py-[0px] rounded-[2px] cursor-pointer transition-colors"
              >
                {crumb.name}
              </div>
            </React.Fragment>
          ))
        )}
      </div>

      {/* Search Bar */}
      <div
        className="absolute top-[74px] right-[5px] w-[250px] h-[24px]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Computer..."
          className="w-full h-full text-xs px-2 border border-slate-400/30 rounded-[2px] bg-transparent focus:bg-white/40 focus:outline-none focus:border-sky-400 transition-colors placeholder:text-slate-500 text-slate-700"
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">
          🔍
        </span>
      </div>

      {/* Left Sidebar */}
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="absolute top-[140px] left-[15px] w-[160px] bottom-[40px] overflow-y-auto overflow-x-hidden pt-2 flex flex-col gap-0.5 scrollbar-thin scrollbar-thumb-slate-300"
      >
        {renderSidebarItem("desktop")}
      </div>

      {/* Main Content */}
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="absolute top-[140px] left-[135px] right-[10px] bottom-[40px] overflow-y-auto p-4"
      >
        <div className="flex flex-wrap content-start gap-2">
          {displayContents.length > 0 ? (
            displayContents.map((item: any) => {
              // Now we can trust item.icon because getCombinedContents already set it from the Data file!
              // But we keep the fallback logic just in case for static items.
              let specificIcon = item.icon;

              if (skillDetails[item.id])
                specificIcon = skillDetails[item.id].icon;
              else if (projectDetails[item.id])
                specificIcon = projectDetails[item.id].icon || item.icon;
              else if (certDetails[item.id])
                specificIcon = certDetails[item.id].icon || item.icon;
              else if (victoryDetails[item.id])
                specificIcon = victoryDetails[item.id].icon || item.icon;

              return (
                <InFolderIcons
                  key={item.id}
                  label={item.name}
                  iconSrc={specificIcon}
                  onClick={() => handleItemClick(item)}
                />
              );
            })
          ) : (
            <div className="w-full text-center text-slate-400 mt-10 text-sm">
              {searchQuery
                ? `No items match "${searchQuery}"`
                : "This folder is empty."}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full h-[35px] flex items-center px-4">
        <span className="text-xs text-slate-600">
          {displayContents.length} items
        </span>
      </div>

      {/* --- POPUPS --- */}
      {selectedProjectId &&
        !isIframeOpen &&
        projectDetails[selectedProjectId] && (
          <ProjectDialog
            project={projectDetails[selectedProjectId]}
            onClose={() => setSelectedProjectId(null)}
            onTryNow={() => setIsIframeOpen(true)}
          />
        )}

      {selectedSkillId && skillDetails[selectedSkillId] && (
        <SkillDialog
          skill={skillDetails[selectedSkillId]}
          onClose={() => setSelectedSkillId(null)}
        />
      )}

      {selectedCertId && certDetails[selectedCertId] && (
        <CertificationDialog
          cert={certDetails[selectedCertId]}
          onClose={() => setSelectedCertId(null)}
        />
      )}

      {selectedVictoryId && victoryDetails[selectedVictoryId] && (
        <VictoryDialog
          victory={victoryDetails[selectedVictoryId]}
          onClose={() => setSelectedVictoryId(null)}
        />
      )}

      {showContact && <ContactDialog onClose={() => setShowContact(false)} />}

      {isIframeOpen && selectedProjectId && (
        <IframeOverlay
          url={projectDetails[selectedProjectId].url}
          onClose={() => setIsIframeOpen(false)}
        />
      )}
    </div>
  );
};

export default FolderWindow;
