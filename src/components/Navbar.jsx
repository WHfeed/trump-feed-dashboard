import React, { useState } from "react";
import AboutPanel from "./AboutPanel";
import FaqPanel from "./FaqPanel";
import LoginPanel from "./LoginPanel";

export default function Navbar() {
  const [showAbout, setShowAbout] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <nav className="w-full backdrop-blur-sm bg-transparent shadow-sm z-50 relative">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-2 leading-none">
          <div className="flex space-x-8 font-semibold text-[1.1rem] leading-none">
            <a href="/" className="hover:underline soft-hover text-[#50675B]">Home</a>
            <button onClick={() => setShowAbout(!showAbout)} className="hover:underline soft-hover text-[#50675B]">About</button>
            <button onClick={() => setShowFaq(!showFaq)} className="hover:underline soft-hover text-[#50675B]">FAQ</button>
          </div>
          <div className="font-semibold text-[1.1rem] leading-none">
            <button onClick={() => setShowLogin(!showLogin)} className="hover:underline soft-hover text-[#50675B]">Login</button>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-[#6a805b] to-transparent" />
      </nav>

      <AboutPanel isOpen={showAbout} onClose={() => setShowAbout(false)} />
      <FaqPanel isOpen={showFaq} onClose={() => setShowFaq(false)} />
        <LoginPanel isOpen={showLogin} onClose={() => setShowLogin(false)} />

    </>
  );
}
