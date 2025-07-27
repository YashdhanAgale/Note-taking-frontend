import React, { createContext, useState, useEffect, ReactNode } from "react";
import { signIn, signUp, logout } from "../api/auth";

interface User { id: string; name: string; dob: string; email: string; }
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, otp: string) => Promise<void>;
  signUp: (name: string, dob: string, email: string, otp: string) => Promise<void>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount, you could call a /me endpoint to fetch user if cookie present.
  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSignIn = async (email: string, otp: string) => {
    const res = await signIn({ email, otp });
    setUser(res.data.user);
  };

  const handleSignUp = async (name: string, dob: string, email: string, otp: string) => {
    await signUp({ name, dob, email, otp });
    // After signup we auto-login via cookie:
    const res = await signIn({ email, otp });
    setUser(res.data.user);
  };

  const handleLogOut = async () => {
    await logout();
    setUser(null);
  };
console.log("This is user in auth context: ",user)
  return (
    <AuthContext.Provider value={{
      user, loading,
      signIn: handleSignIn,
      signUp: handleSignUp,
      logOut: handleLogOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};
