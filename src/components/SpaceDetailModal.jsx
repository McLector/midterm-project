import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import BookingForm from "./BookingForm";

export default function SpaceDetailModal({ space, onClose }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  const handleBookNow = () => {
    if (!user) {
      navigate("/login", { state: { from: `/` } });
      return;
    }
    setShowBookingForm(true);
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <div className="bg-moon-gray rounded-lg shadow-lg max-w-3xl w-full mx-4 overflow-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">{space.name}</h2>
          <button
            className="text-white font-bold text-xl hover:text-red-500"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Main Content */}
        <div className="p-4 space-y-4">
          <img
            src={space.main_image}
            alt={space.name}
            className="w-full h-64 object-cover rounded"
          />

          <p className="text-gray-200">{space.description}</p>

          <div className="text-lg font-bold text-blue-300">
            ₱{space.price}/hr
          </div>

          <div>
            <span className="text-sm bg-moon-indigo/80 px-3 py-1 rounded-full text-white">
              {space.location}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-white">Amenities:</h3>
              <ul className="list-disc list-inside text-gray-200">
                {space.amenities.map((amenity, idx) => (
                  <li key={idx}>{amenity}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white">Hours:</h3>
              <p className="text-gray-200">{space.hours}</p>

              <h3 className="font-semibold text-white mt-2">Time Slots:</h3>
              <ul className="list-disc list-inside text-gray-200">
                {space.time_slots.map((slot, idx) => (
                  <li key={idx}>{slot}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Book Now Button inside modal */}
          {!showBookingForm && (
            <div className="flex justify-end">
              <button
                onClick={handleBookNow}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                Book Now
              </button>
            </div>
          )}

          {/* Booking Form */}
          {showBookingForm && <BookingForm space={space} />}
        </div>

        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
