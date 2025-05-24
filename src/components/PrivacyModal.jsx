import React from "react";

export default function PrivacyModal({ isOpen, onClose }) {
  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Centered modal box */}
      <div className={`absolute top-1/2 left-1/2 w-full max-w-2xl transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out
        ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
        <div className="bg-[#0F171F] bg-opacity-95 border border-orange-400 p-8 text-[#E3DCCF] shadow-lg rounded-xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold tracking-wide">Privacy Policy</h2>
            <button onClick={onClose} className="text-orange-400 font-semibold hover:underline text-sm">
              Close ✕
            </button>
          </div>

          <div className="text-sm leading-relaxed space-y-4">
            <p>
              White House Feed respects your privacy. We do not collect personally identifiable
              information from our users.
            </p>

            <p>
              We use Google Analytics to understand how people use the site — such as page views,
              browser types, and traffic sources. This data is anonymous and helps us improve the
              experience. Google Analytics may use cookies to perform this function.
            </p>

            <p>
              You can opt out of Google Analytics using browser extensions like{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#6FCF97] hover:text-[#85d7a4]"
              >
                Google's official opt-out tool
              </a>.
            </p>

            <p>
              We do not sell, rent, or share your data. We may update this policy as we add new
              features (like alerts or signups) in the future.
            </p>

            <p>Last updated: May 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
