// src/pages/SignUp.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { sendOtp as sendOtpApi, signUp as signUpApi } from "../api/auth";
import Input from "../components/Input";
import Button from "../components/Button";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"info" | "otp">("info");
  const [error, setError] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);

  // Step 1: collect name, dob, email → send OTP
  const handleSendOtp = async () => {
    if (!name || !dob || !email) {
      setError("All fields are required");
      return;
    }
    setSendingOtp(true);
    try {
      await sendOtpApi(email);    // POST /api/auth/send-otp { email }
      setError("");
      setStep("otp");
    } catch (e: unknown) {
      const msg =
        axios.isAxiosError(e) && e.response?.data?.error
          ? e.response.data.error
          : "Failed to send OTP";
      setError(msg);
    } finally {
      setSendingOtp(false);
    }
  };

  // Step 2: submit name, dob, email, otp → signup
  const handleSignUp = async () => {
    if (!otp) {
      setError("OTP is required");
      return;
    }
    try {
      await signUpApi({ name, dob, email, otp });
      // your backend returns only { message: "Signup successful" }
      // so redirect to sign-in page:
      navigate("/signin");
    } catch (e: unknown) {
      const msg =
        axios.isAxiosError(e) && e.response?.data?.error
          ? e.response.data.error
          : "Signup failed";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

          {step === "info" ? (
            <>
              <Input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={e => {
                  setName(e.target.value);
                  setError("");
                }}
                error={error && !name ? error : ""}
              />
              <Input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={e => {
                  setDob(e.target.value);
                  setError("");
                }}
                error={error && !dob ? error : ""}
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setError("");
                }}
                error={error && !email ? error : ""}
              />
              <Button onClick={handleSendOtp} disabled={sendingOtp}>
                {sendingOtp ? "Sending OTP..." : "Send OTP"}
              </Button>
            </>
          ) : (
            <>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                disabled
              />
              <Input
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={e => {
                  setOtp(e.target.value);
                  setError("");
                }}
                error={error && !otp ? error : error}
              />
              <button
                className="text-sm text-blue-600 mb-4"
                onClick={() => {
                  setStep("info");
                  setError("");
                }}
              >
                Resend OTP
              </button>
              <Button onClick={handleSignUp}>Sign Up</Button>
            </>
          )}

          <p className="mt-4 text-center">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right: decorative background */}
      <div
        className="flex-1 hidden md:block bg-cover bg-center pr-8 mr-8"
        style={{ backgroundImage: `url('https://i.pinimg.com/736x/71/42/6c/71426c6e1d992c4f0d2537128587eb0a.jpg')` }}
      />
    </div>
  );
};

export default SignUp;
