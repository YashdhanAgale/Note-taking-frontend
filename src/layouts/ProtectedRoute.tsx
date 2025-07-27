import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const auth = useContext(AuthContext);
  if (auth!.loading) return <div className="h-screen flex items-center justify-center">Loading…</div>;
  if (!auth!.user) return <Navigate to="/signin" replace />;
  return children;
};

export default ProtectedRoute;
