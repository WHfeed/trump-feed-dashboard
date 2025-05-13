import React from "react";

export default function RecapBox({ summary, lastUpdated, className = "" }) {
  return (
    <div className={`bg-[#2F403C] rounded-xl p-6 max-[640px]:p-3 shadow-lg border border-[#1B1F19] pro-neon-glow ${className} w-[540px] max-w-full md:w-full mx-auto space-y-4 max-[640px]:space-y-2 max-h-[600px] overflow-auto`}>
      <h3 className="text-orange-400 text-sm uppercase font-bold tracking-wide">
        Daily Recap
      </h3>

      <p className="text-[#E3DCCF] text-base max-[640px]:text-base leading-relaxed max-[640px]:leading-snug whitespace-pre-line">
        {summary}
      </p>

      <div className="text-xs text-gray-400 pt-2 border-t border-[#1B1F19]">
        Updated hourly · Last updated: {lastUpdated}
      </div>
    </div>
  );
}
