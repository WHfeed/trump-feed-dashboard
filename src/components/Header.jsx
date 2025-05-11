import React from "react";
import StatsBox from "./StatsBox";

export default function Header({ totalPosts, overallImpact, sources }) {
  return (
    <div className="mt-6 mx-auto max-w-screen-xl px-4">
      {/* Top section: logo + stats + divider */}
      <div className="flex items-start justify-between gap-6 max-[459px]:flex-col max-[459px]:items-center max-[459px]:gap-2">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/logo2.png"
            alt="White House Feed Logo"
            className="h-64 max-[640px]:h-40 max-[459px]:h-32 object-contain"
          />
        </div>

        {/* Vertical Divider (hide on very small screens) */}
        <div className="flex justify-center max-[459px]:hidden">
          <div className="w-px bg-gradient-to-b from-transparent via-[#6a805b] to-transparent h-64 max-[640px]:h-40"></div>
        </div>

        {/* StatsBox */}
        <div className="hidden max-[1056px]:flex justify-start items-start ml-4 max-[640px]:ml-2 max-[640px]:scale-90 max-[459px]:scale-75 max-[459px]:ml-0">
          <StatsBox
            totalPosts={totalPosts}
            overallImpact={overallImpact}
            sources={sources}
          />
        </div>

        {/* StatsBox for large screens */}
        <div className="flex justify-center lg:flex-1 lg:justify-end lg:pl-12 max-[1056px]:hidden">
          <StatsBox
            totalPosts={totalPosts}
            overallImpact={overallImpact}
            sources={sources}
          />
        </div>
      </div>

      {/* Text Section */}
      <div className="flex flex-col justify-center space-y-4 max-[640px]:space-y-2 max-w-xl mx-auto text-center md:text-left pl-4 max-[640px]:pl-2 max-[459px]:px-2 max-[459px]:mt-4">
        <h1 className="text-xl max-[640px]:text-lg max-[459px]:text-base font-bold text-[#E3DCCF]">
          Stay Ahead with White House Feed
        </h1>
        <p className="text-base max-[640px]:text-sm max-[459px]:text-xs leading-relaxed max-[640px]:leading-snug max-[459px]:leading-snug">
          Stay ahead of policy and market shifts with{" "}
          <span className="text-[#6FCF97] font-semibold">White House Feed</span> — your real-time source
          for breaking news, political statements, executive actions, and influential posts from top U.S. leaders.
          <br /><br />
          Powered by our custom-built <span className="text-[#6FCF97] font-semibold animate-pulse-slow">EagleEye AI</span>,
          every update is instantly analyzed for sentiment, potential impact, and summarized in an easy-to-digest format.
          <br /><br />
          From now on, you have all your sources in one place to stay ahead of the curve.
        </p>
      </div>

      {/* Neon Image (large screens only) */}
      <div className="hidden 2xl:flex justify-center mt-4">
        <img
          src="/whitehouse-neon.png"
          alt="White House Neon"
          className="h-56 object-contain brightness-50 opacity-25"
        />
      </div>
    </div>
  );
}
