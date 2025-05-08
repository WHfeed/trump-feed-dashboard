import React from "react";

export function Button({ className = "", children, ...props }) {
  return (
    <button
      className={`rounded-xl px-4 py-2 text-sm bg-moss-green hover:bg-green-600 text-white font-semibold shadow ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
