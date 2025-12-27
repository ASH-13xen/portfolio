import { X } from "lucide-react";

// 1. Define the shape of your Project object based on usage (title, description)
interface Project {
  title: string;
  description: string;
  // Add other fields here if needed (e.g., id: string, tags: string[], etc.)
}

// 2. Define the Props interface for the component
interface ProjectDialogProps {
  project: Project;
  onClose: () => void;
  onTryNow: () => void;
}

// 3. Apply the type to the destructured props
export function ProjectDialog({
  project,
  onClose,
  onTryNow,
}: ProjectDialogProps) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] z-50 animate-in zoom-in-95 duration-200 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
      {/* Aero Glass Border */}
      <div className="bg-[#1c669f]/40 backdrop-blur-md p-1.5 rounded-lg border border-[#3e8dc6] shadow-inner">
        <div className="bg-[#f0f0f0] rounded flex flex-col h-full border border-gray-400">
          {/* Title Bar */}
          <div className="h-8 bg-gradient-to-b from-[#eaf6fd] via-[#d9f0fc] to-[#bee6fd] border-b border-[#a0c4de] flex items-center justify-between px-2 rounded-t select-none">
            <span className="text-xs font-bold text-slate-800 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
              {project.title} - Properties
            </span>
            <button
              onClick={onClose}
              className="w-10 h-5 flex items-center justify-center bg-gradient-to-b from-[#eebebb] to-[#cf7878] border border-[#a84747] hover:brightness-110 rounded-sm shadow-sm transition-all"
            >
              <X size={12} color="white" strokeWidth={3} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 flex flex-col gap-4 text-gray-800 font-sans">
            <div className="flex items-start gap-4 pb-4 border-b border-[#d9d9d9] shadow-[0_1px_0_white]">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-300 rounded shadow-inner flex items-center justify-center text-3xl">
                📁
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#1e395b]">
                  {project.title}
                </h2>
                <p className="text-xs text-gray-500">File folder</p>
              </div>
            </div>

            <div className="text-sm leading-relaxed text-[#333]">
              <p className="mb-2 font-semibold">Description:</p>
              <p>{project.description}</p>
            </div>

            {/* Footer Buttons */}
            <div className="mt-4 flex justify-end gap-2 pt-3 border-t border-[#d9d9d9] shadow-[0_1px_0_white]">
              <button
                onClick={onClose}
                className="px-4 py-1 text-sm border border-[#8e8f8f] bg-gradient-to-b from-[#f2f2f2] to-[#dcdcdc] hover:bg-[#eaf6fd] hover:border-[#3c7fb1] rounded shadow-sm text-black"
              >
                Cancel
              </button>
              <button
                onClick={onTryNow}
                className="px-6 py-1 text-sm border border-[#3c7fb1] bg-gradient-to-b from-[#f2f2f2] to-[#cfdbe6] hover:from-[#eaf6fd] hover:to-[#d9f0fc] rounded shadow-[inset_0_0_2px_white] text-[#1e395b] font-medium"
              >
                Try Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
