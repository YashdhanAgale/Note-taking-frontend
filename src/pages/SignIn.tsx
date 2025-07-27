import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signIn } from "../api/auth";
import Input from "../components/Input";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";

const SignIn: React.FC = () => {
  const auth = useContext(AuthContext)!;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email"|"otp">("email");
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    try {
      await sendOtp(email);
      setStep("otp");
      setError("");
    } catch (e: any) {
      setError(e.response?.data?.error || "Failed to send OTP");
    }
  };

  const handleSignIn = async () => {
    try {
      await auth.signIn(email, otp);
      navigate("/dashboard");
    } catch (e: any) {
      setError(e.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6">Sign In</h1>
          {step === "email" ? (
            <>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={error}
              />
              <Button onClick={handleSendOtp}>Send OTP</Button>
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
                onChange={e => setOtp(e.target.value)}
                error={error}
              />
              <button
                className="text-sm text-blue-600 mb-4"
                onClick={()=>{ setStep("email"); setOtp(""); }}
              >Resend OTP</button>
              <Button onClick={handleSignIn}>Sign In</Button>
            </>
          )}
          <p className="mt-4 text-center">
            Need an account?{" "}
            <Link to="/signup" className="text-blue-600">Create one</Link>
          </p>
        </div>
      </div>
      {/* Right Image */}
      <div className="flex-1 hidden md:block bg-cover bg-center" style={{
        backgroundImage: `url('/your-static-folder/bg-large.png')`
      }} />
    </div>
  );
};

export default SignIn;
