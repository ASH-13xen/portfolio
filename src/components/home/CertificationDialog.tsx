/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { X, Award, ExternalLink } from "lucide-react";

export const CertificationDialog = ({
  cert,
  onClose,
}: {
  cert: any;
  onClose: () => void;
}) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-105 z-70 animate-in zoom-in-95 duration-200">
      <div className="bg-[#1c4e66]/50 backdrop-blur-md p-1.5 rounded-lg border border-[#2d6a88] shadow-2xl">
        <div className="bg-[#fcfcfc] rounded flex flex-col h-full border border-gray-400">
          {/* Header */}
          <div className="h-7 bg-linear-to-b from-[#eaf6fd] via-[#d9f0fc] to-[#bee6fd] border-b border-[#a0c4de] flex items-center justify-between px-2 select-none">
            <span className="text-xs font-bold text-slate-800">
              Certificate Viewer
            </span>
            <button
              onClick={onClose}
              className="w-8 h-4 flex items-center justify-center bg-linear-to-b from-[#eebebb] to-[#cf7878] border border-[#a84747] hover:brightness-110 rounded-sm shadow-sm"
            >
              <X size={10} color="white" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 flex flex-col items-center text-center">
            <Award size={48} className="text-yellow-600 mb-2 drop-shadow-sm" />
            <h2 className="text-lg font-bold text-[#1e395b] leading-tight">
              {cert.name}
            </h2>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wide">
              {cert.issuer}
            </p>
            <div className="w-full h-px bg-linear-to-r from-transparent via-gray-300 to-transparent my-4"></div>

            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              {cert.description}
            </p>
            <p className="text-xs text-gray-400 italic mb-6">{cert.date}</p>

            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-300 hover:border-blue-400 hover:bg-blue-50 rounded shadow-sm transition-all text-xs font-medium text-slate-700"
            >
              <ExternalLink size={12} /> Verify Credential
            </a>
          </div>

          {/* Footer */}
          <div className="bg-[#f0f0f0] p-2 border-t border-gray-300 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-1 text-xs border border-[#8e8f8f] bg-linear-to-b from-[#f2f2f2] to-[#dcdcdc] rounded shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
