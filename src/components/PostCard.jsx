import React, { useState, useEffect } from "react";

function getRelativeTime(isoString) {
  const postDate = new Date(isoString);
  const now = new Date();
  const diff = Math.floor((now - postDate) / 1000); // seconds

  if (isNaN(diff)) return "Invalid time";
  if (diff < 10) return "Just now";
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return postDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" });
}

export default function PostCard({
  title,
  link,
  summary,
  tags = [],
  sentiment,
  impact = 0,
  source,
  display_time,
}) {
  const [showExact, setShowExact] = useState(false);
  const [relativeTime, setRelativeTime] = useState("N/A");

  const profilePicUrl = `https://unavatar.io/${source.split(" - ").pop()?.toLowerCase() || "whitehouse.gov"}`;
  const impactValue = impact || 0;
  const hasImpact = impactValue > 0;
  const impactWidth =
    impactValue >= 5 ? "w-full" : impactValue >= 3 ? "w-2/4" : impactValue >= 1 ? "w-1/4" : "w-0";

  const postDate = new Date(display_time);
  const exactTime = isNaN(postDate)
    ? "Invalid time"
    : postDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" });

  useEffect(() => {
    const updateRelative = () => setRelativeTime(getRelativeTime(display_time));
    updateRelative(); // initial
    const intervalId = setInterval(updateRelative, 30000); // every 30s
    return () => clearInterval(intervalId);
  }, [display_time]);

  return (
    <div className="max-w-3xl max-[640px]:max-w-full mx-auto bg-[#2F403C] rounded-xl shadow p-6 max-[640px]:p-2 mb-8 flex space-x-4 max-[640px]:w-full max-[640px]:px-4">
      {/* Avatar */}
      <div className="w-14 flex justify-center">
        <img src={profilePicUrl} alt="Avatar" className="w-10 h-10 rounded-full object-cover mt-2" />
      </div>

      {/* Post Content */}
      <div className="flex-1 space-y-4">
        {/* Title and Timestamp */}
        <div className="flex justify-between items-center border-b border-[#1B1F19] pb-1">
          <h2 className="text-[#E3DCCF] font-semibold text-2xl max-[640px]:text-lg">{title}</h2>
          <span
            className="text-xs text-orange-400 font-bold cursor-pointer"
            title="Click to toggle time format"
            onClick={() => setShowExact(!showExact)}
          >
            {showExact ? exactTime : relativeTime}
          </span>
        </div>

        {/* Summary */}
        <p className="text-base max-[640px]:text-sm text-[#E3DCCF] leading-relaxed max-[640px]:leading-snug">
          {summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 border-t border-[#1B1F19] pt-2">
          {tags.map((tag, idx) => (
            <span key={idx} className="bg-slate-700 text-xs max-[640px]:text-[10px] text-white px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Impact Bar */}
        {hasImpact && (
          <div className="flex flex-col space-y-2 mt-2">
            <div className="flex items-center text-[#1B1F19] text-xs font-bold uppercase tracking-wide">
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#1B1F19] to-transparent"></div>
              <span className="px-2 pulse-impact">Impact</span>
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#1B1F19] to-transparent"></div>
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div className={`h-full bg-[#6FCF97] animate-breathe ${impactWidth}`}></div>
            </div>
          </div>
        )}

        {/* Link to Original Post */}
        <div className="pt-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm max-[640px]:text-xs text-moss-green underline font-medium"
          >
            View Original Post →
          </a>
        </div>
      </div>
    </div>
  );
}
