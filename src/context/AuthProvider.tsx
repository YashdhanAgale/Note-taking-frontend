// src/context/AuthProvider.tsx
import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { signIn, signUp, logout } from "../api/auth";
import { AuthContext } from "./AuthContext"; // Import context from separate file
import type { User } from "./AuthContext";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSignIn = async (email: string, otp: string) => {
    const res = await signIn({ email, otp });
    setUser(res.data.user);
  };

  const handleSignUp = async (name: string, dob: string, email: string, otp: string) => {
    await signUp({ name, dob, email, otp });
    const res = await signIn({ email, otp });
    setUser(res.data.user);
  };

  const handleLogOut = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn: handleSignIn, signUp: handleSignUp, logOut: handleLogOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
