/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { X, Trophy, Medal, Eye } from "lucide-react"; // Added 'Eye' icon

export const VictoryDialog = ({
  victory,
  onClose,
}: {
  victory: any;
  onClose: () => void;
}) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] z-[70] animate-in zoom-in-95 duration-200">
      <div className="bg-[#664e1c]/40 backdrop-blur-md p-1.5 rounded-lg border border-[#886a2d] shadow-2xl">
        <div className="bg-[#fffdf5] rounded flex flex-col h-full border border-gray-400">
          {/* Header - Gold Tinted */}
          <div className="h-7 bg-gradient-to-b from-[#fdfbea] via-[#fcf6d9] to-[#fbe6be] border-b border-[#dec4a0] flex items-center justify-between px-2 select-none">
            <span className="text-xs font-bold text-[#5b4e1e]">
              Achievement Unlocked
            </span>
            <button
              onClick={onClose}
              className="w-8 h-4 flex items-center justify-center bg-gradient-to-b from-[#eebebb] to-[#cf7878] border border-[#a84747] hover:brightness-110 rounded-sm shadow-sm"
            >
              <X size={10} color="white" />
            </button>
          </div>

          <div className="p-5">
            <div className="flex items-start gap-4">
              {/* Left: Trophy Icon */}
              <div className="shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 border border-yellow-400 rounded-md flex items-center justify-center shadow-inner">
                <Trophy size={32} className="text-yellow-700" />
              </div>

              {/* Right: Text */}
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  {victory.eventName}
                </h2>
                <div className="flex items-center gap-1 mt-1 text-sm font-bold text-yellow-700">
                  <Medal size={14} /> {victory.rank}
                </div>
                <p className="text-xs text-gray-500 mt-1">{victory.date}</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white border border-[#dec4a0]/30 rounded text-sm text-slate-700 shadow-inner">
              {victory.description}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              {/* REPLACED SHARE BUTTON WITH VIEW CERTIFICATE */}
              {victory.proofUrl && (
                <a
                  href={victory.proofUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 text-xs border border-yellow-600/30 hover:border-yellow-600 bg-yellow-50 hover:bg-yellow-100 text-[#8a6d1f] rounded cursor-pointer flex items-center gap-1 transition-colors no-underline"
                >
                  <Eye size={12} />
                  View Certificate
                </a>
              )}

              <button
                onClick={onClose}
                className="px-4 py-1 text-xs border border-[#c4a03c] bg-gradient-to-b from-[#fff] to-[#fcf6d9] hover:from-[#fff] hover:to-[#fbe6be] rounded shadow-sm text-[#5b4e1e] font-medium"
              >
                Awesome!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
