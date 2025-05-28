import React, { useState } from "react";

function getRelativeTime(displayTime, now = new Date()) {
  const postDate = new Date(displayTime);
  if (isNaN(postDate)) return "Invalid time";

  const diffSec = Math.floor((now - postDate) / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHr / 24);

  if (diffSec < 10) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDays === 1) {
    return `Yesterday, ${postDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })}`;
  }
  if (diffDays <= 3) return `${diffDays} days ago`;
  return postDate.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
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
  timestamp,
  currentTime,
}) {
  const [showExact, setShowExact] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const hasImpact = impact > 0;
  const impactWidth =
    impact >= 5 ? "w-full" : impact >= 3 ? "w-2/4" : impact >= 1 ? "w-1/4" : "w-0";

  const postDate = new Date(display_time || timestamp);
  const exactTime = isNaN(postDate)
    ? "Invalid time"
    : postDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" });

  const relativeTime = getRelativeTime(display_time || timestamp, currentTime);

  const handleShare = () => {
  const postUrl = `https://whitehousefeed.com/post?link=${encodeURIComponent(link)}`;
    if (navigator.share) {
      navigator
        .share({
          title,
          text: summary,
          url: postUrl,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      navigator.clipboard.writeText(postUrl).then(() => {
        alert("Link copied to clipboard!");
      });
    }
  };

  return (
    <div className="max-w-3xl max-[640px]:max-w-full mx-auto bg-[#2F403C] rounded-xl shadow p-6 max-[640px]:p-2 mb-8 max-[640px]:w-full max-[640px]:px-4 transition-all duration-300">
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

        {/* Summary */}
        <div
          className={`overflow-hidden transition-[max-height] duration-500 ease-in-out`}
          style={{
            maxHeight: expanded ? "500px" : "110px"
          }}
        >
          <p
            className="text-base max-[640px]:text-[15px] text-[#E3DCCF] leading-relaxed max-[640px]:leading-[1.5] whitespace-pre-line"
          >
            {expanded && summary_expanded ? summary_expanded : summary}
          </p>
        </div>

        {/* Toggle Button */}
        {summary_expanded && (
          <div className="text-center mt-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="px-3 py-1 rounded-md text-sm font-medium text-orange-400 bg-[#3B4C45] hover:bg-[#4F6159] transition-all"
            >
              {expanded ? (
                <span className="flex items-center justify-center space-x-1">
                  <span className="text-xs">▲</span>
                  <span>Show Less</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-1">
                  <span className="text-xs">▼</span>
                  <span>Show More</span>
                </span>
              )}
            </button>
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

        {/* Link and Share Row */}
        <div className="flex justify-between items-center pt-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm max-[640px]:text-xs text-moss-green underline font-medium"
          >
            View Original Post →
          </a>
          <button
            onClick={handleShare}
            className="p-2 bg-[#3A4A47] text-[#E3DCCF] rounded-full hover:bg-[#4E5D5A] transition"
            title="Share this post"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v4a2 2 0 002 2h12a2 2 0 002-2v-4m-4-4l-4-4m0 0l-4 4m4-4v12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
