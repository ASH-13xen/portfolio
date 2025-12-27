/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  Battery,
  BatteryCharging,
  Newspaper,
  RefreshCw,
} from "lucide-react";
// Ensure this points to your actual StartMenu file
import StartMenu from "./StartMenu";

// --- TYPES ---
interface NewsItem {
  title: string;
  source: string;
  time: string;
  link: string;
}

interface TaskbarProps {
  onOpenBrowser: (url?: string) => void;
  onOpenCalc: () => void;
}

// --- NEWS POPUP COMPONENT ---
const NewsPopup = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const fetchNews = async () => {
    setLoading(true);
    const apiKey = "pub_c9f34f2178294b23befae0aa100f5e13";

    try {
      const res = await fetch(
        `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&category=technology,science,business`
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();

      const realNews = data.results.slice(0, 10).map((item: any) => ({
        title:
          item.title.length > 100
            ? item.title.substring(0, 100) + "..."
            : item.title,
        source: item.source_id,
        time: new Date(item.pubDate).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        link: item.link,
      }));

      setNews(realNews);
      setLoading(false);
    } catch (error) {
      console.log(
        "API Error (likely limit reached), using fallback data:",
        error
      );
      // Fallback Data
      setNews([
        {
          title: "API Limit Reached - Showing Backup Data",
          source: "System",
          time: "Now",
          link: "#",
        },
        {
          title: "SpaceX successfully launches next-gen Starship into orbit",
          source: "TechCrunch",
          time: "2h ago",
          link: "#",
        },
        {
          title: "New AI model breaks records in coding benchmarks",
          source: "The Verge",
          time: "4h ago",
          link: "#",
        },
        {
          title: "Global markets rally as inflation data shows cooling trend",
          source: "Bloomberg",
          time: "5h ago",
          link: "#",
        },
      ]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div
      className="absolute bottom-12 right-0 w-96 bg-[#f0f0f0] border border-[#8e8f8f] shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-t-lg text-sm z-[60] font-sans select-none animate-in fade-in slide-in-from-bottom-2 cursor-default flex flex-col overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="bg-gradient-to-b from-[#e6f0fa] to-[#dcebfd] border-b border-[#aebcd8] p-3 flex justify-between items-center">
        <div className="font-bold text-[#1e528e] text-base flex items-center">
          <Newspaper className="w-4 h-4 mr-2" />
          Daily News
        </div>
        <div className="text-xs text-slate-500 font-medium">{currentDate}</div>
      </div>

      {/* Content Area */}
      <div className="h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 bg-white">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin" />
            <span>Fetching latest headlines...</span>
          </div>
        ) : (
          <div className="flex flex-col">
            {news.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="group p-4 border-b border-gray-100 hover:bg-[#eef6ff] transition-colors cursor-pointer block"
              >
                <div className="font-bold text-[#1e528e] mb-1.5 leading-snug group-hover:underline">
                  {item.title}
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span className="flex items-center capitalize font-medium">
                    {item.source}
                  </span>
                  <span>{item.time}</span>
                </div>
              </a>
            ))}
            <div
              className="p-3 text-center text-blue-600 hover:underline cursor-pointer bg-gray-50 border-t border-gray-200 flex items-center justify-center font-medium"
              onClick={fetchNews}
            >
              <RefreshCw className="w-3.5 h-3.5 mr-2" /> Refresh Feed
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- VOLUME POPUP ---
const VolumePopup = ({
  volume,
  setVolume,
}: {
  volume: number;
  setVolume: (v: number) => void;
}) => (
  <div
    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-10 h-32 bg-[#f0f0f0] border border-[#8e8f8f] shadow-lg flex flex-col items-center justify-end pb-4 z-[60] cursor-default"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="relative w-1.5 h-20 bg-gray-300 rounded-full mb-2">
      <div
        className="absolute bottom-0 w-full bg-green-500 rounded-full pointer-events-none"
        style={{ height: `${volume}%` }}
      />
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-20 w-8 opacity-0 cursor-pointer z-50"
        style={{
          appearance: "slider-vertical",
          WebkitAppearance: "slider-vertical",
        }}
        title={`Volume: ${volume}%`}
      />
    </div>
    <div className="mt-1">
      {volume === 0 ? (
        <VolumeX className="w-4 h-4 text-slate-600" />
      ) : (
        <Volume2 className="w-4 h-4 text-slate-600" />
      )}
    </div>
  </div>
);

// --- MAIN TASKBAR ---
const Taskbar = ({ onOpenBrowser, onOpenCalc }: TaskbarProps) => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [activePopup, setActivePopup] = useState<"news" | "volume" | null>(
    null
  );

  // Dynamic Data
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [volume, setVolume] = useState(50);

  const startupAudioRef = useRef<HTMLAudioElement | null>(null);

  // --- Handlers to Close Menu when App Opens ---
  const handleLaunchBrowser = (url?: string) => {
    onOpenBrowser(url);
    setIsStartMenuOpen(false);
    setActivePopup(null);
  };

  const handleLaunchCalc = () => {
    onOpenCalc();
    setIsStartMenuOpen(false);
    setActivePopup(null);
  };

  // Audio Logic
  useEffect(() => {
    const audio = new Audio("/sounds/startup.mp3");
    startupAudioRef.current = audio;
    audio.volume = volume / 100;
    audio.play().catch(() => {});
    return () => {
      if (startupAudioRef.current) {
        startupAudioRef.current.pause();
        startupAudioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (startupAudioRef.current) startupAudioRef.current.volume = volume / 100;
    document.querySelectorAll("audio, video").forEach((media) => {
      (media as HTMLMediaElement).volume = volume / 100;
    });
  }, [volume]);

  // Battery Logic
  useEffect(() => {
    // @ts-ignore
    if (typeof navigator.getBattery === "function") {
      // @ts-ignore
      navigator.getBattery().then((battery) => {
        const update = () => {
          setBatteryLevel(Math.floor(battery.level * 100));
          setIsCharging(battery.charging);
        };
        update();
        battery.addEventListener("levelchange", update);
        battery.addEventListener("chargingchange", update);
      });
    }
  }, []);

  // Clock & Online
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    setIsOnline(navigator.onLine);
    window.addEventListener("online", () => setIsOnline(true));
    window.addEventListener("offline", () => setIsOnline(false));
    return () => clearInterval(interval);
  }, []);

  const togglePopup = (popup: "news" | "volume") => {
    if (activePopup === popup) setActivePopup(null);
    else setActivePopup(popup);
  };

  return (
    <>
      {/* START MENU */}
      {isStartMenuOpen && (
        <StartMenu
          onOpenBrowser={handleLaunchBrowser}
          onOpenCalc={handleLaunchCalc}
        />
      )}

      {/* TASKBAR BAR */}
      <div
        className="fixed bottom-0 left-0 w-full h-12 bg-[#639abf] border-t border-black flex items-center px-2 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)] z-[50]"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsStartMenuOpen(false);
            setActivePopup(null);
          }
        }}
      >
        {/* Start Button */}
        <button
          type="button"
          onClick={() => {
            setIsStartMenuOpen(!isStartMenuOpen);
            setActivePopup(null);
          }}
          className="flex items-center justify-center transition-transform active:scale-95 focus:outline-none z-50"
        >
          <img
            src="/photos/task_window_icon1.png"
            alt="Windows Start Button"
            className={`h-10 w-10 rounded-full object-cover transition-all duration-200 hover:brightness-110 ${
              isStartMenuOpen
                ? "brightness-110 drop-shadow-[0_0_5px_rgba(255,255,255,0.6)]"
                : ""
            }`}
          />
        </button>

        <div className="flex-1"></div>

        {/* System Tray */}
        <div className="flex items-center text-white space-x-2 mr-2 select-none">
          {/* Network */}
          <div
            className="p-1 rounded cursor-default opacity-90"
            title={isOnline ? "Connected to Internet" : "No Internet Access"}
          >
            {isOnline ? (
              <Wifi className="w-4 h-4" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-300" />
            )}
          </div>

          {/* Volume Container */}
          <div className="relative">
            {activePopup === "volume" && (
              <VolumePopup volume={volume} setVolume={setVolume} />
            )}
            <div
              className={`p-1 rounded hover:bg-white/20 cursor-pointer ${
                activePopup === "volume" ? "bg-white/20" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                togglePopup("volume");
              }}
              title={`Website Volume: ${volume}%`}
            >
              {volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </div>
          </div>

          {/* Battery */}
          <div
            className="flex items-center p-1 rounded hover:bg-white/20 cursor-help relative"
            title={`${
              isCharging ? "Charging" : "Battery Level"
            }: ${batteryLevel}%`}
          >
            {isCharging ? (
              <BatteryCharging className="w-4 h-4" />
            ) : (
              <Battery
                className={`w-4 h-4 ${batteryLevel < 20 ? "text-red-300" : ""}`}
              />
            )}
          </div>

          {/* Clock / News Container */}
          <div className="relative">
            {activePopup === "news" && <NewsPopup />}

            <div
              className={`flex flex-col items-end text-xs font-medium shadow-black drop-shadow-md cursor-pointer leading-none ml-2 px-2 py-0.5 rounded hover:bg-white/20 ${
                activePopup === "news" ? "bg-white/20" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                togglePopup("news");
              }}
            >
              <span>{time}</span>
              <span className="text-[10px] opacity-90 mt-0.5">{date}</span>
            </div>
          </div>

          <div
            className="w-2 h-8 border-l border-white/30 ml-2 hover:bg-white/30 cursor-pointer"
            title="Show Desktop"
            onClick={() => {
              setIsStartMenuOpen(false);
              setActivePopup(null);
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Taskbar;
