import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import BookingForm from "./components/BookingForm";
import Header from "./components/Header";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-moon-gray">
      <Header />

      <main className="flex-1 w-full flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard/my-bookings"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* New route for direct booking */}
          <Route
            path="/booking/:spaceId"
            element={
              <ProtectedRoute>
                <BookingForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<div className="p-8 text-white">404 — Not found</div>}
          />
        </Routes>
      </main>
    </div>
  );
}
