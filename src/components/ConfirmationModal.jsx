// src/components/ConfirmationModal.jsx
import React from "react";

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  theme = "dark",
}) {
  if (!isOpen) return null;

  const modalBg = theme === "dark" ? "bg-moon-gray" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const overlayBg = theme === "dark" ? "bg-black/70" : "bg-black/40";

  return (
    <div
      id="modal-overlay"
      className={`fixed inset-0 z-50 flex items-center justify-center ${overlayBg} backdrop-blur-sm`}
      onClick={(e) => {
        if (e.target.id === "modal-overlay") onClose();
      }}
    >
      <div
        className={`${modalBg} rounded-lg shadow-lg max-w-md w-full p-6 mx-4`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-2xl font-bold ${textColor}`}>{title}</h2>
          <button
            className={`text-xl font-bold ${textColor} hover:text-red-500`}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Message */}
        <p className={`mb-6 text-sm ${textColor}`}>{message}</p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
