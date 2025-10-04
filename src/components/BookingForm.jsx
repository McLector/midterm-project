import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import spaces from "../data/spaces.json";

export default function BookingForm({ space: propSpace }) {
  const { user, addBooking } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { spaceId } = useParams();

  // Use passed prop or find by param
  const space = propSpace || spaces.find(s => s.id === Number(spaceId));

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(1);
  const [attendees, setAttendees] = useState(1);
  const [message, setMessage] = useState("");

  if (!space) return <div className="p-4 text-white">Space not found</div>;

  function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (!date || !startTime) {
      setMessage("⚠️ Please choose date and start time.");
      return;
    }

    // ✅ Prevent booking in the past
    const today = new Date();
    const selectedDate = new Date(date);

    today.setHours(0, 0, 0, 0); // Ignore time
    if (selectedDate < today) {
      setMessage("⚠️ You cannot book for a past date.");
      return;
    }

    const booking = {
      id: "b_" + Date.now(),
      userId: user.id,
      userName: user.name,
      spaceId: space.id,
      spaceName: space.name,
      date,
      startTime,
      duration,
      attendees,
      createdAt: new Date().toISOString(),

      // Extra details for dashboard
      spaceImage: space.main_image,
      spaceAmenities: space.amenities,
      spacePrice: space.price,
      spaceLocation: space.location,
    };

    addBooking(booking);

    setMessage("✅ Booking confirmed!");
    setDate("");
    setStartTime("");
    setDuration(1);
    setAttendees(1);
  }

  // Get today's date in YYYY-MM-DD format for the date picker
  const todayString = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-white/10 p-6 rounded shadow max-w-lg mx-auto">
      <h3 className="text-xl font-semibold text-white text-center mb-4">
        Book {space.name}
      </h3>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {/* Date */}
        <div>
          <label className="block text-sm text-white mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={todayString} // Prevent selecting past dates
            className="w-full border rounded p-2 bg-gray-800 text-white"
          />
        </div>

        {/* Start Time */}
        <div>
          <label className="block text-sm text-white mb-1">Start time</label>
          <select
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border rounded p-2 bg-gray-800 text-white"
          >
            <option value="">Select time</option>
            {space.time_slots.map((slot, idx) => (
              <option key={idx} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm text-white mb-1">
            Duration (hrs)
          </label>
          <input
            type="number"
            min="1"
            max="12"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full border rounded p-2 bg-gray-800 text-white"
          />
        </div>

        {/* Attendees */}
        <div>
          <label className="block text-sm text-white mb-1">Attendees</label>
          <input
            type="number"
            min="1"
            max={space.capacity || 10}
            value={attendees}
            onChange={(e) => setAttendees(Number(e.target.value))}
            className="w-full border rounded p-2 bg-gray-800 text-white"
          />
        </div>

        {/* Submit */}
        <div className="sm:col-span-2 text-center">
          <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
            Confirm Booking
          </button>
          <div className="mt-2 text-sm text-gray-300">{message}</div>
        </div>
      </form>
    </div>
  );
}
