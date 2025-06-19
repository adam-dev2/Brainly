// components/ProtectedRoute.tsx
import type React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to login if no token
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
