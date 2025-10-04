// src/pages/Home.jsx
import React, { useState } from "react";
import spacesData from "../data/spaces";
import SpaceCard from "../components/SpaceCard";
import SearchBar from "../components/Searchbar";

export default function Home() {
  const [query, setQuery] = useState("");

  const filtered = spacesData.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-6 text-center drop-shadow-lg">
          🌙 Discover Study Spaces
        </h1>

        {/* Search Bar */}
        <div className="max-w-lg mx-auto">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        {/* Grid of Space Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <p className="text-center text-gray-300 mt-6">No spaces found.</p>
        )}
      </div>
    </div>
  );
}
