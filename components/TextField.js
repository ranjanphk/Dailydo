// components/TextField.js
import { useState } from "react";

export default function TextField({ label, type = "text", value, onChange, ...props }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-body text-gray-700">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="px-size-ms py-size-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-body font-body w-full"
        {...props}
      />
    </div>
  );
}
