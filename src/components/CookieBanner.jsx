import React, { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setVisible(false);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full z-50 bg-[#2F403C] text-[#E3DCCF] px-4 py-3 text-sm shadow-md border-t border-orange-400/40 transition-transform duration-300
        ${visible ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-center sm:text-left">
          This site uses cookies for analytics. By continuing to browse, you agree to our{" "}
          <span
            onClick={() => window.dispatchEvent(new Event("open-privacy-modal"))}
            className="underline text-orange-400 cursor-pointer"
        >
            privacy policy
        </span>
        </p>
        <button
          onClick={handleAccept}
          className="bg-orange-400 text-[#2F403C] px-4 py-1 rounded-md font-semibold hover:bg-orange-300 transition-all"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
