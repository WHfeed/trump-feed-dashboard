import React from "react";

export function Select({ value, onValueChange, children, className = "" }) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className={`rounded-xl px-3 py-2 text-sm bg-slate-800 text-white border border-slate-600 focus:outline-none ${className}`}
    >
      {children}
    </select>
  );
}
