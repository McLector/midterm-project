// src/components/SearchBar.jsx
import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name or location"
        className="flex-1 px-4 py-2 rounded-lg bg-moon-indigo/90 text-white placeholder-white border border-gray-500 focus:border-moon-teal focus:ring-1 focus:ring-moon-teal transition drop-shadow-md"
      />
      <span className="absolute right-3 top-2.5 text-gray-300">
        🔍
      </span>
    </div>
  );
}
