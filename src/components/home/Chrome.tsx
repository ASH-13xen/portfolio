import React, { useState } from "react";
import { X, ArrowLeft, ArrowRight, RotateCw, Home } from "lucide-react";

interface ChromeProps {
  onClose: () => void;
  initialUrl?: string; // New Prop
}

const Chrome = ({ onClose, initialUrl }: ChromeProps) => {
  // Default to Bing, or use the Game URL if provided
  const defaultHome = "https://www.bing.com";
  const startUrl = initialUrl || defaultHome;

  const [url, setUrl] = useState(startUrl);
  const [inputValue, setInputValue] = useState(startUrl);
  const [iframeSrc, setIframeSrc] = useState(startUrl);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let target = inputValue;
    if (!target.startsWith("http")) {
      target = `https://${target}`;
    }
    setUrl(target);
    setIframeSrc(target);
  };

  const handleRefresh = () => {
    setIframeSrc(url);
  };

  const handleHome = () => {
    setInputValue(defaultHome);
    setUrl(defaultHome);
    setIframeSrc(defaultHome);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col font-sans animate-in zoom-in-95 duration-200">
      {/* Title Bar */}
      <div className="h-8 bg-[#bed0e8] flex items-center justify-between px-2 space-x-1 select-none">
        <div className="flex space-x-2 pt-1">
          <div className="w-48 h-7 bg-white rounded-t-lg text-xs flex items-center px-3 shadow-sm truncate">
            {initialUrl ? "Game Mode" : "New Tab"}
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-5 h-5 flex items-center justify-center bg-[#d44026] hover:bg-[#e81123] rounded-sm text-white transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      {/* Address Bar */}
      <div className="h-9 bg-[#f2f2f2] border-b border-gray-300 flex items-center px-2 space-x-2">
        <ArrowLeft className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
        <ArrowRight className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
        <RotateCw
          className="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800"
          onClick={handleRefresh}
        />
        <Home
          className="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800"
          onClick={handleHome}
        />

        <form onSubmit={handleNavigate} className="flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-full h-7 px-3 text-xs text-gray-600 focus:outline-none focus:border-blue-400"
          />
        </form>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white relative">
        <iframe
          src={iframeSrc}
          title="Browser"
          className="w-full h-full border-none"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
        />
      </div>
    </div>
  );
};

export default Chrome;
