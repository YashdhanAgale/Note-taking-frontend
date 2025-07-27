import api from "./axios";

export interface SignInData { email: string; otp: string }
export interface SignUpData { name: string; dob: string; email: string; otp: string; }

export const sendOtp = (email: string) =>
  api.post("/auth/send-otp", { email });

export const signUp = (data: SignUpData) =>
  api.post("/auth/signup", data);

export const signIn = (data: SignInData) =>
  api.post("/auth/signin", data);

export const logout = () =>
  api.post("/auth/logout");
