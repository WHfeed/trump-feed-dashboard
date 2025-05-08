import React from "react";

export default function FilterDropdown({
  title,
  isOpen,
  onClick,
  children,
}) {
  return (
    <div className="text-center">
      <button
        onClick={onClick}
        className="text-white font-semibold bg-slate-700 hover:bg-slate-600 transition px-4 py-2 rounded-xl mb-2"
      >
        {title}
      </button>

      {isOpen && (
        <div className="bg-slate-800 border border-slate-600 rounded-xl p-4 mt-2 w-full max-w-md mx-auto">
          {children}
        </div>
      )}
    </div>
  );
}
