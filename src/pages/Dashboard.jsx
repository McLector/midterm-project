import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ConfirmationModal from "../components/ConfirmationModal";
import BookingDetailsModal from "../components/BookingDetailsModal";
import spaces from "../data/spaces.json";

export default function Dashboard() {
  const { user, getUserBookings, cancelBooking } = useAuth();

  // Merge bookings with their space details
  const myBookings = [...getUserBookings()]
    .map((booking) => {
      const space = spaces.find((s) => s.id === booking.spaceId);
      return {
        ...booking,
        spaceImage: space?.main_image || booking.spaceImage,
        spaceAmenities: space?.amenities || booking.spaceAmenities,
        spacePrice: space?.price || booking.spacePrice,
        spaceLocation: space?.location || booking.spaceLocation,
      };
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const [selected, setSelected] = useState(null);
  const [openCancel, setOpenCancel] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  function askCancel(book) {
    setSelected(book);
    setOpenCancel(true);
  }

  function confirmCancel() {
    if (selected) {
      cancelBooking(selected.id);
      setOpenCancel(false);
      setSelected(null);
    }
  }

  function viewDetails(book) {
    setSelected(book);
    setOpenDetails(true);
  }

  if (!user) {
    return (
      <div className="p-8 text-white text-center text-xl">
        Please log in to view your bookings.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-white">
        My Bookings ({myBookings.length})
      </h2>

      {myBookings.length === 0 ? (
        <div className="text-gray-300 text-lg">No bookings yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white/10 p-4 rounded-lg shadow-lg flex flex-col cursor-pointer hover:bg-white/20 transition"
              onClick={() => viewDetails(b)}
            >
              {b.spaceImage && (
                <img
                  src={b.spaceImage}
                  alt={b.spaceName}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <div className="flex flex-col flex-grow">
                <div className="font-bold text-xl text-white">{b.spaceName}</div>
                <div className="text-sm text-gray-300 mt-1">{b.spaceLocation}</div>
                <div className="text-sm text-gray-300 mt-1">
                  {b.date} • {b.startTime} • {b.duration} hr
                </div>
                <div className="text-sm text-blue-300 font-semibold mt-2">
                  ₱{b.spacePrice}/hr
                </div>
                <div className="text-xs text-gray-400 mt-auto">
                  Booked on {new Date(b.createdAt).toLocaleString()}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  askCancel(b);
                }}
                className="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Cancel Confirmation */}
      <ConfirmationModal
        isOpen={openCancel}
        onClose={() => setOpenCancel(false)}
        onConfirm={confirmCancel}
        title="Confirm Cancel"
        message="Are you sure you want to cancel this booking?"
        theme="dark"
      />

      {/* Booking Details */}
      {openDetails && (
        <BookingDetailsModal booking={selected} onClose={() => setOpenDetails(false)} />
      )}
    </div>
  );
}
