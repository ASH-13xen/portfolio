import React from "react";
import { X } from "lucide-react"; // Ensure you have lucide-react installed

interface IframeOverlayProps {
  url: string;
  onClose: () => void;
}

const IframeOverlay = ({ url, onClose }: IframeOverlayProps) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-in fade-in duration-300">
      {/* Top Control Bar */}
      <div className="h-10 bg-[#333] flex items-center justify-between px-4 text-white shadow-md">
        <span className="text-sm font-mono text-gray-300 truncate w-2/3">
          Running: {url}
        </span>
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-500 text-xs font-bold uppercase tracking-wider rounded transition-colors"
        >
          <X size={14} /> Close Preview
        </button>
      </div>

      {/* The Iframe */}
      <div className="flex-1 w-full h-full bg-white relative">
        <iframe
          src={url}
          title="Project Preview"
          className="w-full h-full border-0"
          // Security best practices for allowing interactivity but preventing navigation of top frame
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  );
};

export default IframeOverlay;
