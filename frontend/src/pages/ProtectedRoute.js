import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ element: Element }) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decodedToken = jwtDecode(token);

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        return <Navigate to="/" />;
      }

      return Element;
    } catch (error) {
      console.error("Error decoding token:", error);
      return <Navigate to="/" />;
    }
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
