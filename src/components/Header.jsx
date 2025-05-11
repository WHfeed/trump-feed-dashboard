import React from "react";
import StatsBox from "./StatsBox";

export default function Header({ totalPosts, overallImpact, sources }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1px_1fr_auto_auto] max-[1056px]:grid-cols-[auto_1px_auto] gap-4 max-[640px]:gap-2 items-start mt-6 max-[1056px]:w-full max-[1056px]:max-w-screen-sm max-[1056px]:justify-center mx-auto">

      {/* Logo */}
      <div className="flex justify-center md:justify-start">
        <img
          src="/logo2.png"
          alt="White House Feed Logo"
          className="h-64 max-[640px]:h-40 min-w-[120px] object-contain"
        />
      </div>

      {/* Vertical Divider */}
      <div className="flex justify-center">
        <div className="w-px bg-gradient-to-b from-transparent via-[#6a805b] to-transparent h-64 max-[640px]:h-40 max-[459px]:h-28"></div>
      </div>

      {/* Small screen StatsBox */}
      <div className="hidden max-[1056px]:flex justify-start items-start ml-4 max-[640px]:ml-2 max-[640px]:scale-90 max-[459px]:scale-75">
        <StatsBox totalPosts={totalPosts} overallImpact={overallImpact} sources={sources} />
      </div>

      {/* Text Section */}
      <div className="flex flex-col justify-center space-y-4 max-[640px]:space-y-2 max-w-xl mx-auto md:mx-0 text-center md:text-left pl-4 max-[640px]:pl-2 max-[459px]:px-2 max-[1056px]:col-span-full max-[1056px]:mt-8 max-[640px]:mt-4 max-[459px]:mt-2 max-[1056px]:text-center">
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

      {/* Neon Image */}
      <div className="hidden 2xl:block">
        <img
          src="/whitehouse-neon.png"
          alt="White House Neon"
          className="h-56 object-contain brightness-50 opacity-25"
        />
      </div>

      {/* Large screen StatsBox */}
      <div className="flex justify-center lg:flex-1 lg:justify-end lg:pl-12 max-[1056px]:hidden">
        <StatsBox totalPosts={totalPosts} overallImpact={overallImpact} sources={sources} />
      </div>
    </div>
  );
}
