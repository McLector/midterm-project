// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/"); // Redirect to home after logout
  }

  return (
    <header className="bg-moon-blue shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-white font-bold text-xl">
          StudySpot PH
        </Link>

        <nav className="space-x-4 flex items-center">
          <Link to="/" className="text-white hover:text-moon-teal transition">
            Home
          </Link>

          {user ? (
            <>
              <span className="text-white px-3 py-1 bg-moon-indigo rounded-full text-sm">
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="text-white hover:text-moon-teal transition px-3 py-1 rounded"
              >
                Logout
              </button>

              <Link
                to="/dashboard/my-bookings"
                className="text-white hover:text-moon-teal transition"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="text-white hover:text-moon-teal transition"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
