import React, { useState } from "react";
import SpaceDetailModal from "./SpaceDetailModal";

function generateTransparentColorFromText(text) {
  const colors = [
    "bg-blue-600/80",
    "bg-purple-600/80",
    "bg-green-600/80",
    "bg-indigo-600/80",
    "bg-pink-600/80",
    "bg-yellow-600/80",
    "bg-red-600/80",
    "bg-teal-600/80",
  ];
  const charCode = text.toUpperCase().charCodeAt(0);
  const index = charCode % colors.length;
  return colors[index] + " text-white";
}

export default function SpaceCard({ space }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const badgeClass = generateTransparentColorFromText(space.location);

  return (
    <>
      <div className="bg-white/10 backdrop-blur-md rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 overflow-hidden border border-white/20">
        {/* Image */}
        <img
          src={space.main_image}
          alt={space.name}
          className="w-full h-48 object-cover"
        />

        {/* Content */}
        <div className="p-4 flex flex-col h-full">
          {/* Name + Location */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-white">{space.name}</h3>
            <span
              className={`${badgeClass} text-xs font-medium px-2 py-1 rounded-full shadow-sm`}
            >
              {space.location}
            </span>
          </div>

          {/* Description */}
          <div className="max-h-14 overflow-hidden">
            <p className="text-sm text-gray-100 bg-black/40 px-2 py-1 rounded line-clamp-2">
              {space.description}
            </p>
          </div>

          {/* Price + View Button */}
          <div className="mt-4 flex justify-between items-center">
            <div className="text-lg font-bold text-blue-300">
              ₱{space.price}/hr
            </div>
            <button
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
              onClick={() => setIsModalOpen(true)}
            >
              View
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <SpaceDetailModal space={space} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
