import React from "react";

export default function LoginPanel({ isOpen, onClose }) {
  return (
    <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      {/* Background dim + blur */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300" onClick={onClose} />

      {/* Login panel */}
      <div className={`absolute top-[48px] left-0 w-full max-h-[calc(100vh-48px)] overflow-y-auto transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <div className="bg-[#0F171F] bg-opacity-95 border-t border-[#6a805b] p-8 text-[#E3DCCF] shadow-lg max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold tracking-wide">Login</h2>
            <button onClick={onClose} className="text-orange-400 font-semibold hover:underline text-sm">
              Close ✕
            </button>
          </div>
          <p className="text-sm leading-relaxed">
            This feature is not available yet. Login and user-specific functionality will be added shortly as we move out of beta.
          </p>
        </div>
      </div>
    </div>
  );
}
