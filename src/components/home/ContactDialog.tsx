// components/home/ContactDialog.tsx

import React, { useState } from "react";
import { X, Send, Minus, Mail } from "lucide-react";
import emailjs from "@emailjs/browser";

interface ContactDialogProps {
  onClose: () => void;
}

export const ContactDialog = ({ onClose }: ContactDialogProps) => {
  // --- FORM STATE ---
  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // --- UI STATE ---
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  // --- HANDLERS ---
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fromName || !fromEmail || !message) {
      alert("Please fill in your name, email, and message.");
      return;
    }

    setIsSending(true);

    const templateParams = {
      to_name: "Ashank Mishra",
      from_name: fromName,
      reply_to: fromEmail,
      subject: subject || "(No Subject)",
      message: message,
    };

    emailjs
      .send(
        "service_u8mhiwn", // Your Service ID
        "template_2in2fym", // Your Template ID
        templateParams,
        "Yiha40DuDDkPG22Mk" // Your Public Key
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setIsSending(false);
          setStatus("success");
          setTimeout(() => {
            onClose();
          }, 2500);
        },
        (err) => {
          console.log("FAILED...", err);
          setIsSending(false);
          setStatus("error");
        }
      );
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] z-[100] animate-in zoom-in-95 duration-200 shadow-[0_20px_60px_rgba(0,0,0,0.6)] font-sans">
      {/* --- AERO GLASS BORDER FRAME --- */}
      <div className="bg-[#1c669f]/70 backdrop-blur-md p-[6px] rounded-lg border border-[#3e8dc6] shadow-inner">
        <div className="bg-[#f0f0f0] rounded flex flex-col h-full border border-[#696969] overflow-hidden relative">
          {/* --- 1. TITLE BAR --- */}
          <div className="h-8 bg-gradient-to-b from-[#eaf6fd] via-[#d9f0fc] to-[#bee6fd] border-b border-[#a0c4de] flex items-center justify-between px-2 select-none">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-[#1e395b]" />
              <span className="text-xs font-bold text-[#1e395b] drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
                Compose New Message
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={onClose}
                className="w-7 h-5 flex items-center justify-center border border-transparent hover:bg-white/40 hover:border-white/50 rounded-sm transition-all group"
              >
                <Minus
                  size={10}
                  className="text-[#1e395b] opacity-70 group-hover:opacity-100"
                />
              </button>
              <button
                onClick={onClose}
                className="w-10 h-5 flex items-center justify-center bg-gradient-to-b from-[#eebebb] to-[#cf7878] border border-[#a84747] hover:brightness-110 rounded-sm shadow-sm transition-all"
              >
                <X size={12} color="white" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* (REMOVED RIBBON TOOLBAR HERE) */}

          {/* --- 2. ADDRESS HEADER AREA --- */}
          <div className="bg-white px-6 py-4 flex flex-col gap-3 border-b border-[#dcdcdc] mt-1">
            {/* TO: (Hardcoded) */}
            <div className="flex items-center">
              <button className="w-16 text-right pr-3 text-[11px] text-slate-500 hover:text-blue-600 hover:underline cursor-pointer">
                To...
              </button>
              <div className="flex-1 border border-[#abc1de] bg-[#eef5fa] px-2 py-[3px] text-xs text-slate-700 select-none rounded-[2px] flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">
                  A
                </div>
                Ashank Mishra &lt;ashank13mishra@gmail.com&gt;
              </div>
            </div>

            {/* FROM: (User Input) */}
            <div className="flex items-center">
              <label className="w-16 text-right pr-3 text-[11px] text-slate-500">
                From:
              </label>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                  className="flex-1 border border-[#d9d9d9] hover:border-[#7f9db9] focus:border-[#3c7fb1] focus:bg-[#fbfdff] px-2 py-[3px] text-xs outline-none transition-colors rounded-[2px]"
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={fromEmail}
                  onChange={(e) => setFromEmail(e.target.value)}
                  className="flex-1 border border-[#d9d9d9] hover:border-[#7f9db9] focus:border-[#3c7fb1] focus:bg-[#fbfdff] px-2 py-[3px] text-xs outline-none transition-colors rounded-[2px]"
                />
              </div>
            </div>

            {/* SUBJECT: (User Input) */}
            <div className="flex items-center">
              <label className="w-16 text-right pr-3 text-[11px] text-slate-500">
                Subject:
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="flex-1 border border-[#d9d9d9] hover:border-[#7f9db9] focus:border-[#3c7fb1] focus:bg-[#fbfdff] px-2 py-[3px] text-xs outline-none transition-colors rounded-[2px]"
              />
            </div>
          </div>

          {/* --- 3. MESSAGE BODY --- */}
          <div className="flex-1 bg-white relative flex flex-col">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full flex-1 resize-none outline-none p-6 text-sm text-slate-800 font-sans"
              style={{ minHeight: "200px" }}
            />

            {/* --- NEW BOTTOM ACTION AREA --- */}
            <div className="h-12 border-t border-[#dcdcdc] bg-[#f9f9f9] flex items-center justify-end px-4 gap-3">
              <button
                onClick={onClose}
                className="px-4 py-1 text-xs text-slate-600 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={isSending || status === "success"}
                className="flex items-center gap-2 px-6 py-1.5 border border-[#3c7fb1] bg-gradient-to-b from-[#f2f2f2] to-[#cfdbe6] hover:from-[#eaf6fd] hover:to-[#d9f0fc] rounded shadow-[inset_0_0_2px_white] text-[#1e395b] text-xs font-bold active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
              >
                <Send size={14} /> Send Message
              </button>
            </div>

            {/* --- LOADING OVERLAY --- */}
            {isSending && (
              <div className="absolute inset-0 bg-white/80 z-20 flex items-center justify-center">
                <div className="w-[280px] bg-white border border-[#8e8f8f] p-1 shadow-xl">
                  <div className="bg-gradient-to-r from-[#002f9e] to-[#2a7ae2] h-6 flex items-center px-2">
                    <span className="text-white text-xs font-bold">
                      Sending...
                    </span>
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <Mail className="animate-bounce text-[#1e395b]" />
                      <span className="text-xs text-slate-700">
                        Connecting to server...
                      </span>
                    </div>
                    <div className="h-4 w-full bg-[#e6e6e6] border border-[#bcbcbc] relative overflow-hidden">
                      <div className="absolute top-0 bottom-0 left-0 bg-green-500 animate-[width_2s_ease-in-out_infinite] w-1/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- SUCCESS OVERLAY --- */}
            {status === "success" && (
              <div className="absolute inset-0 bg-white z-20 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex p-3 bg-green-100 rounded-full border-2 border-green-500 mb-2">
                    <Send size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-[#1e395b] font-bold text-lg">
                    Sent Successfully!
                  </h3>
                </div>
              </div>
            )}

            {/* --- ERROR OVERLAY --- */}
            {status === "error" && (
              <div className="absolute inset-x-0 bottom-12 bg-red-100 border-t border-red-400 p-2 flex justify-between items-center">
                <span className="text-xs text-red-700 font-bold ml-2">
                  Error: Could not send message.
                </span>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-xs underline text-red-700 mr-2"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>

          {/* --- 4. STATUS BAR --- */}
          <div className="h-6 bg-[#f0f0f0] border-t border-[#d9d9d9] flex items-center px-3 justify-between">
            <span className="text-[10px] text-slate-500">
              {status === "idle" ? "Ready" : isSending ? "Sending..." : "Done"}
            </span>
            <div className="flex gap-2">
              <div className="w-px h-full bg-[#d9d9d9]"></div>
              <span className="text-[10px] text-slate-400">Connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
