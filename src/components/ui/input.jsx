import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`rounded-xl px-3 py-2 text-sm border border-slate-600 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-moss-green ${className}`}
      {...props}
    />
  );
}
