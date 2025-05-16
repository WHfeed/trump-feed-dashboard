import React, { useState } from "react";

function getRelativeTime(displayTime, now = new Date()) {
  const postDate = new Date(displayTime);
  const diff = Math.floor((now - postDate) / 1000); // in seconds

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
  summary_expanded,
  tags = [],
  sentiment,
  impact = 0,
  source,
  display_time,
  currentTime,
}) {
  const [showExact, setShowExact] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const hasImpact = impact > 0;
  const impactWidth =
    impact >= 5 ? "w-full" : impact >= 3 ? "w-2/4" : impact >= 1 ? "w-1/4" : "w-0";

  const postDate = new Date(display_time);
  const exactTime = isNaN(postDate)
    ? "Invalid time"
    : postDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" });

  const relativeTime = getRelativeTime(display_time, currentTime);

  return (
    <div className="max-w-3xl max-[640px]:max-w-full mx-auto bg-[#2F403C] rounded-xl shadow p-6 max-[640px]:p-2 mb-8 max-[640px]:w-full max-[640px]:px-4">
      {/* Post Content */}
      <div className="space-y-4">
        {/* Title and Timestamp */}
        <div className="flex justify-between items-start border-b border-[#1B1F19] pb-1">
          <h2 className="text-[#E3DCCF] font-semibold text-2xl max-[640px]:text-lg">{title}</h2>
          <span
            className="text-xs text-orange-400 font-bold cursor-pointer whitespace-nowrap pl-3 relative top-[7px] shrink-0"
            title="Click to toggle time format"
            onClick={() => setShowExact(!showExact)}
          >
            {showExact ? exactTime : relativeTime}
          </span>
        </div>

        {/* Summary / Expanded Summary */}
        <p className="text-base max-[640px]:text-[15px] text-[#E3DCCF] leading-relaxed max-[640px]:leading-[1.5] whitespace-pre-line">
          {expanded && summary_expanded ? summary_expanded : summary}
        </p>

        {/* Toggle Button */}
        {summary_expanded && (
          <div className="text-center text-orange-400 font-semibold text-sm cursor-pointer select-none" onClick={() => setExpanded(!expanded)}>
            <div className="flex items-center justify-center space-x-2 mt-1 mb-1">
              <div className="flex-grow h-px bg-orange-400 opacity-50" />
              <div className="flex items-center space-x-1">
                <span>{expanded ? "▼ Show Less ▼" : "▶ Show More ◀"}</span>
              </div>
              <div className="flex-grow h-px bg-orange-400 opacity-50" />
            </div>
          </div>
        )}

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
