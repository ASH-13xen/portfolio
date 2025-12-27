/* eslint-disable @next/next/no-img-element */
import React from "react";
import { X, Download, Award } from "lucide-react";

interface SkillDialogProps {
  skill: {
    name: string;
    icon: string;
    description: string;
    notesUrl: string;
  };
  onClose: () => void;
}

export const SkillDialog = ({ skill, onClose }: SkillDialogProps) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] z-[60] animate-in zoom-in-95 duration-200">
      {/* AERO GLASS BORDER */}
      <div className="bg-[#1c669f]/50 backdrop-blur-md p-1.5 rounded-lg border border-[#3e8dc6] shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        {/* INNER WINDOW */}
        <div className="bg-white rounded flex flex-col h-full border border-gray-500 overflow-hidden">
          {/* TITLE BAR */}
          <div className="h-7 bg-gradient-to-b from-[#eaf6fd] via-[#d9f0fc] to-[#bee6fd] border-b border-[#a0c4de] flex items-center justify-between px-2 select-none">
            <span className="text-xs font-bold text-slate-800 drop-shadow-sm">
              {skill.name} Properties
            </span>
            <button
              onClick={onClose}
              className="w-8 h-4 flex items-center justify-center bg-gradient-to-b from-[#eebebb] to-[#cf7878] border border-[#a84747] hover:brightness-110 rounded-sm shadow-sm transition-all"
            >
              <X size={10} color="white" strokeWidth={3} />
            </button>
          </div>

          {/* CONTENT BODY */}
          <div className="p-5 bg-[#f0f0f0]">
            {/* Top Section: Icon & General Info */}
            <div className="flex gap-4 pb-4 border-b border-[#d1d1d1] shadow-[0_1px_0_white]">
              <div className="shrink-0">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-16 h-16 object-contain drop-shadow-md"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-lg font-bold text-[#1e395b]">
                  {skill.name}
                </h2>
                <p className="text-xs text-gray-500">Development Skill</p>
                <div className="flex gap-1 mt-1">
                  {/* Star Rating Visual (Static for now) */}
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-yellow-400 border border-yellow-600 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle Section: Description */}
            <div className="py-4 text-sm text-[#333] leading-relaxed">
              <p>{skill.description}</p>
            </div>

            {/* Bottom Section: Action Buttons */}
            <div className="pt-4 flex flex-col gap-2 border-t border-[#d1d1d1] shadow-[0_1px_0_white]">
              {/* Button 1: Download Notes */}
              <a
                href={skill.notesUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between px-3 py-2 bg-white border border-[#8e8f8f] hover:border-[#3c7fb1] hover:bg-[#eaf6fd] rounded transition-all cursor-pointer shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Download size={16} className="text-green-600" />
                  <span className="text-xs font-medium text-slate-700 group-hover:text-blue-700">
                    Download Study Notes
                  </span>
                </div>
                <span className="text-[10px] text-gray-400">PDF</span>
              </a>
            </div>

            {/* OK Button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-1 text-xs border border-[#3c7fb1] bg-gradient-to-b from-[#f2f2f2] to-[#cfdbe6] hover:from-[#eaf6fd] hover:to-[#d9f0fc] rounded shadow-[inset_0_0_2px_white] text-[#1e395b]"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
