import React from "react";

export default function StatsBox({ totalPosts, overallImpact, sources }) {
  return (
    <div className="bg-[#1A1A1A] rounded-xl p-4 shadow-lg border border-[#333] pro-neon-glow w-64 space-y-4 mr-8">
      <div>
        <p className="text-gray-400 text-xs uppercase">Posts Today</p>
        <p className="text-3xl font-bold text-gray-200">{totalPosts}</p>
      </div>

      <div>
        <p className="text-gray-400 text-xs uppercase">Overall Impact</p>
        <p className="text-xl font-semibold text-orange-400">{overallImpact}</p>
      </div>

      <div>
        <p className="text-gray-400 text-xs uppercase">By Source</p>
        <ul className="text-green-400 space-y-1 text-sm">
          {Object.entries(sources).map(([source, count]) => (
            <li key={source}>
              <span className="capitalize">{source}</span>: {count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
