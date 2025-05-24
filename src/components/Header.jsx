import React from "react";
import StatsBox from "./StatsBox";

export default function Header({ totalPosts, overallImpact, sources }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1px_1fr_auto_auto] max-[1056px]:grid-cols-[auto_1px_auto] gap-4 items-start mt-6 max-[599px]:mt-2 max-[1056px]:w-full max-[1056px]:max-w-screen-sm max-[1056px]:justify-center mx-auto">

      {/* Logo */}
      <div className="flex justify-center md:justify-start min-w-0 max-[600px]:pl-2 max-[599px]:mb-1">
        <div
          className="
            w-[260px]
            max-[640px]:w-[240px]
            max-[600px]:w-[220px]
            max-[560px]:w-[200px]
            max-[500px]:w-[180px]
            max-[440px]:w-[160px]
          "
        >
          <div
            className="
              w-full
              h-[260px]
              max-[640px]:h-[240px]
              max-[600px]:h-[200px]
              max-[540px]:h-[180px]
              max-[480px]:h-[160px]
              max-[420px]:h-[140px]
              bg-contain bg-no-repeat bg-center
            "
            style={{ backgroundImage: "url('/logo2.png')" }}
          ></div>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="hidden min-[600px]:flex justify-center min-w-0">
        <div className="w-px bg-gradient-to-b from-transparent via-[#6a805b] to-transparent h-64" />
      </div>

      {/* Small screen StatsBox */}
      <div className="hidden max-[1056px]:flex items-start ml-2 w-full max-[599px]:mt-[6px]">
        <div className="w-full max-w-[240px] flex-shrink-0">
          <div className="scale-100 max-[600px]:scale-[0.9] max-[540px]:scale-[0.85] max-[480px]:scale-[0.8] max-[460px]:scale-[0.75] max-[420px]:scale-[0.70] max-[410px]:scale-[0.65] max-[380px]:scale-[0.60] origin-top">
            <StatsBox totalPosts={totalPosts} overallImpact={overallImpact} sources={sources} />
          </div>
        </div>
      </div>


      {/* Text Section */}
      <div className="flex flex-col justify-center space-y-4 max-w-xl mx-auto md:mx-0 text-center md:text-left pl-4 pr-4 max-[600px]:pl-2 max-[600px]:pr-2 max-[1056px]:col-span-full max-[1056px]:mt-4 max-[599px]:mt-0 max-[520px]:-mt-2 max-[500px]:-mt-4 max-[480px]:-mt-6 max-[460px]:-mt-8 max-[440px]:-mt-10 max-[420px]:-mt-14 max-[390px]:-mt-16 max-[360px]:-mt-18 max-[330px]:-mt-20">

        {/* Line above text (only on small screens) */}
        <div className="w-full max-[599px]:block min-[600px]:hidden mb-2">
          <div className="h-px bg-gradient-to-r from-transparent via-[#6a805b] to-transparent" />
        </div>

        <h1 className="text-xl font-bold text-[#E3DCCF]">Stay Ahead with White House Feed</h1>
        <p className="text-base leading-relaxed">
          Stay ahead of policy and market shifts with{" "}
          <span className="text-[#6FCF97] font-semibold">White House Feed</span> — your real&#8209;time source
          for breaking news, political statements, executive actions, and influential posts from top U.S. leaders.
          <br /><br />
          Powered by our custom-built <span className="text-[#6FCF97] font-semibold animate-pulse-slow">EagleEye AI</span>,
          every update is instantly analyzed for sentiment, potential impact, and summarized in an easy&#8209;to&#8209;digest format.
          <br /><br />
          From now on, all your sources are in one place to stay ahead of the curve.
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
      <div className="flex justify-center lg:flex-1 lg:justify-end lg:pl-12 max-[1056px]:hidden min-w-0">
        <StatsBox totalPosts={totalPosts} overallImpact={overallImpact} sources={sources} />
      </div>
    </div>
  );
}
