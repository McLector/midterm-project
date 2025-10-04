import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accounts, setAccounts] = useLocalStorage("studyspot_accounts", {});
  const [user, setUser] = useLocalStorage("studyspot_user", null);

  function login(name, password) {
    const existingAccount = accounts[name];

    if (existingAccount) {
      if (existingAccount.password !== password) {
        alert("❌ Incorrect password!");
        return null;
      }
      setUser(existingAccount);
      return existingAccount;
    } else {
      const newUser = {
        id: "user_" + Date.now(),
        name,
        password,
        bookings: [],
      };
      const updatedAccounts = { ...accounts, [name]: newUser };
      setAccounts(updatedAccounts);
      setUser(newUser);
      return newUser;
    }
  }

  function logout() {
    setUser(null);
  }

  function addBooking(booking) {
    if (!user) return;

    const updatedUser = {
      ...user,
      bookings: [...(user.bookings || []), booking],
    };

    setUser(updatedUser);
    setAccounts((prev) => ({
      ...prev,
      [user.name]: updatedUser,
    }));
  }

  function cancelBooking(bookingId) {
    if (!user) return;
    const updatedUser = {
      ...user,
      bookings: (user.bookings || []).filter((b) => b.id !== bookingId),
    };
    setUser(updatedUser);
    setAccounts((prev) => ({
      ...prev,
      [user.name]: updatedUser,
    }));
  }

  function getUserBookings() {
    return user?.bookings || [];
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, addBooking, cancelBooking, getUserBookings }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
