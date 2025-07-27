import { createContext } from "react";

interface User {
  id: string;
  name: string;
  dob: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, otp: string) => Promise<void>;
  signUp: (name: string, dob: string, email: string, otp: string) => Promise<void>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
export type { AuthContextType, User };
