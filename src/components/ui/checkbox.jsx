import React from "react";

export function Checkbox({ checked, onCheckedChange }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className="form-checkbox h-5 w-5 text-moss-green border-slate-600 bg-slate-800 rounded focus:ring-0"
    />
  );
}
