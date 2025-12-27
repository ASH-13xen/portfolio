/* eslint-disable react-hooks/unsupported-syntax */
import React, { useState, useEffect, useRef } from "react";
import { X, Minus, Square } from "lucide-react";

const Calculator = ({ onClose }: { onClose: () => void }) => {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

  // --- DRAG STATE ---
  const [position, setPosition] = useState({ x: 80, y: 80 }); // Initial position (left-20 top-20 approx)
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  // --- CALCULATOR LOGIC ---
  const handlePress = (val: string) => {
    if (val === "=") {
      try {
        setDisplay(eval(equation).toString());
        setEquation("");
      } catch {
        setDisplay("Error");
      }
    } else if (val === "C") {
      setDisplay("0");
      setEquation("");
    } else {
      const newEq = equation + val;
      setEquation(newEq);
      setDisplay(newEq);
    }
  };

  // --- DRAG HANDLERS ---
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only allow dragging from the title bar (buttons excluded via stopPropagation on them if needed)
    setIsDragging(true);
    // Calculate where the mouse is relative to the top-left of the window
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Global mouse move/up listeners (so you don't lose the drag if mouse moves fast)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const btnClass =
    "flex-1 h-9 bg-gradient-to-b from-[#f2f2f2] to-[#dbe4f5] border border-[#8797aa] rounded-[2px] hover:brightness-110 active:brightness-95 text-sm font-sans text-slate-800 shadow-sm";

  return (
    <div
      ref={windowRef}
      className="absolute w-60 bg-[#d9e4f1] border border-[#405875] rounded-lg shadow-2xl overflow-hidden z-60 animate-in zoom-in-95 duration-200 select-none font-sans"
      style={{
        left: position.x,
        top: position.y,
        // Remove 'transition' here during drag to prevent lag, add it only when not dragging if you want smooth snapping
        cursor: isDragging ? "grabbing" : "default",
      }}
    >
      {/* Title Bar - THIS IS THE DRAG HANDLE */}
      <div
        onMouseDown={handleMouseDown}
        className="h-8 bg-linear-to-b from-[#eaf3fc] to-[#bdd6f2] flex items-center justify-between px-2 border-b border-[#8797aa] cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center text-xs font-normal text-slate-800 pointer-events-none">
          <span className="mr-1.5 font-bold">±</span> Calculator
        </div>

        {/* Window Controls (Stop propagation so clicking X doesn't start drag) */}
        <div
          className="flex space-x-1"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <button className="w-5 h-5 flex items-center justify-center hover:bg-white/40 rounded-sm">
            <Minus className="w-3 h-3 text-slate-600" />
          </button>
          <button className="w-5 h-5 flex items-center justify-center hover:bg-white/40 rounded-sm">
            <Square className="w-2.5 h-2.5 text-slate-600" />
          </button>
          <button
            onClick={onClose}
            className="w-5 h-5 flex items-center justify-center bg-[#d44026] hover:bg-[#e81123] rounded-sm text-white"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-3">
        <div className="bg-white border border-[#8e9bb3] h-12 mb-3 rounded-[2px] flex items-center justify-end px-2 text-xl font-sans overflow-hidden">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-1">
          {[
            "7",
            "8",
            "9",
            "/",
            "4",
            "5",
            "6",
            "*",
            "1",
            "2",
            "3",
            "-",
            "0",
            ".",
            "=",
            "+",
          ].map((btn) => (
            <button
              key={btn}
              onClick={() => handlePress(btn)}
              className={btnClass}
            >
              {btn}
            </button>
          ))}
          <button
            onClick={() => handlePress("C")}
            className={`${btnClass} col-span-4 mt-1 border-[#bda2a2] bg-linear-to-b from-[#fcdcdc] to-[#f2c7c7]`}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
