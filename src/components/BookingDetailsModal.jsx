import React from "react";

export default function BookingDetailsModal({ booking, onClose }) {
  if (!booking) return null;

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target.id === "modal-overlay") onClose();
      }}
    >
      <div className="bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full mx-4 overflow-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">{booking.spaceName}</h2>
          <button
            className="text-white font-bold text-xl hover:text-red-500"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Main Content */}
        <div className="p-4 space-y-4">
          {booking.spaceImage && (
            <img
              src={booking.spaceImage}
              alt={booking.spaceName}
              className="w-full h-60 object-cover rounded-lg"
            />
          )}

          <div className="text-lg font-bold text-blue-300">
            ₱{booking.spacePrice}/hr
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm bg-moon-indigo/80 px-3 py-1 rounded-full text-white">
              {booking.spaceLocation}
            </span>
            <span className="text-sm bg-green-500/70 px-3 py-1 rounded-full text-white">
              {booking.attendees} Attendees
            </span>
          </div>

          <div>
            <h3 className="font-semibold text-white">Amenities:</h3>
            <ul className="list-disc list-inside text-gray-200">
              {booking.spaceAmenities?.map((amenity, idx) => (
                <li key={idx}>{amenity}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-white">Schedule:</h3>
              <p className="text-gray-200">Date: {booking.date}</p>
              <p className="text-gray-200">Start Time: {booking.startTime}</p>
              <p className="text-gray-200">Duration: {booking.duration} hr(s)</p>
            </div>

            <div>
              <h3 className="font-semibold text-white">Booking Info:</h3>
              <p className="text-gray-200">Booked by: {booking.userName}</p>
              <p className="text-gray-200">
                Booked on: {new Date(booking.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
