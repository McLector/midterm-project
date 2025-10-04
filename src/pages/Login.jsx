import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  function submit(e) {
    e.preventDefault();
    if (!name || !password) return; // basic validation
    const user = login(name, password);
    if (user) navigate(from, { replace: true });
    else alert("Invalid credentials.");
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1500&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/90 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Log in to StudySpot PH
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your username"
            className="w-full px-4 py-2 rounded bg-gray-100 text-gray-800 border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded bg-gray-100 text-gray-800 border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
