import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/signin" replace />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/dashboard" element={
        <Dashboard />
    }/>
  </Routes>
);

export default App;
