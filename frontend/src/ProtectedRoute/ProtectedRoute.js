import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios"; // Assuming axios is configured with baseURL or proxy

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Use null to indicate loading/undetermined state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      console.log("ProtectedRoute - Token from localStorage:", token);

      if (!token) {
        console.log("ProtectedRoute - No token found, setting unauthenticated.");
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        console.log(`ProtectedRoute - Validating token: ${token}`);
        // Send token as a query parameter and explicitly request JSON
        const response = await axios.get(`/validate-token?token=${encodeURIComponent(token)}`, {
          headers: {
            'Accept': 'application/json'
          }
        });
        console.log("ProtectedRoute - Validation response:", response.data);

        // Check if the response data is an object and has the tokenValidity property
        if (typeof response.data === 'object' && response.data !== null && response.data.tokenValidity === true) {
          console.log("ProtectedRoute - Token is valid, setting authenticated.");
          setIsAuthenticated(true);
        } else {
          console.log("ProtectedRoute - Token is invalid or validation failed (unexpected response format?), setting unauthenticated.");
          localStorage.removeItem("token"); // Remove invalid token
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("ProtectedRoute - Error validating token:", error);
        localStorage.removeItem("token"); // Remove token on error
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    validateToken();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (isLoading) {
    // Optional: Render a loading indicator while validating
    console.log("ProtectedRoute - Loading...");
    return <div>Loading...</div>; // Or a spinner component
  }

  if (isAuthenticated === false) {
    console.log("ProtectedRoute - User not authenticated, redirecting to login.");
    return <Navigate to="/login-page" replace />;
  }

  if (isAuthenticated === true) {
    console.log("ProtectedRoute - User authenticated, rendering element.");
    return element;
  }

  // Fallback case (should ideally not be reached if logic is correct)
  console.log("ProtectedRoute - Fallback, redirecting to login.");
  return <Navigate to="/login-page" replace />;
};

export default ProtectedRoute;

