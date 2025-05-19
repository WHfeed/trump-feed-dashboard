import React from "react";

export default function AboutPanel({ isOpen, onClose }) {
  return (
    <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      {/* Background dim + blur */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300" onClick={onClose} />

      {/* Scrollable content panel */}
      <div className={`absolute top-[48px] left-0 w-full max-h-[calc(100vh-48px)] overflow-y-auto transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <div className="bg-[#0F171F] bg-opacity-95 border-t border-[#6a805b] p-8 text-[#E3DCCF] shadow-lg max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold tracking-wide">About White House Feed</h2>
            <button onClick={onClose} className="text-orange-400 font-semibold hover:underline text-sm">
              Close ✕
            </button>
          </div>
        <div className="text-sm leading-relaxed space-y-4">
          <span className="block mb-4">
            White House Feed was built to solve a problem: the gap between real-time political events and how they're interpreted by markets, media, and the public. News moves fast — often too fast to process — and official statements can be buried across dozens of sources, social channels, and press offices.
          </span>

          <span className="block mb-4">
            What makes White House Feed different is its focus on clarity and speed. Every update — whether it’s a post from the President, a press release from the Treasury, or a statement from the Fed — is summarized instantly by our custom-built AI engine, <strong className="text-orange-400">EagleEye</strong>. It cuts through the noise, distills the core message, and flags potential impact across markets and policy. No filler. No lag.
          </span>

          <span className="block mb-4">
            This platform is for anyone who needs to stay ahead of policy and political developments without getting lost in endless headlines: journalists, traders, analysts, risk consultants — or citizens who simply want a clean feed of what the U.S. government is actually saying, without commentary or delay.
          </span>

          <span className="block mb-4">
            EagleEye is trained to identify signals that matter — economic cues, regulatory hints, geopolitical tone shifts — and presents them in a format designed for quick scanning. Posts are tagged, scored, and color-coded where relevant, helping you spot what's worth a second look. It’s not perfect, but it’s fast, consistent, and always learning.
          </span>

          <span className="block mb-4">
            A note on transparency: all summaries and impact assessments are generated using artificial intelligence. While we work hard to filter low-quality inputs and fine-tune output quality, this site may contain errors, omissions, or misclassifications. Nothing here constitutes investment advice, and we are not liable for decisions made based on this content.
          </span>

          <span className="block">
            White House Feed is built for signal, not noise. It’s a front-row seat to the levers of American power — made legible and accessible, the moment they move.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}