import React from "react";
import { Navigate } from "react-router-dom"; // Import Navigate for redirection
import styles from "./LoginPage.module.css";
import LoginPageLayout from "./LoginPageLayout/LoginPageLayout";

const LoginPage = () => {
  const token = localStorage.getItem("token");
  console.log("[LoginPage] Token from localStorage:", token); // Debug log
  const isAuthenticated = token !== null;
  console.log("[LoginPage] isAuthenticated:", isAuthenticated); // Debug log

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    console.log("[LoginPage] User is authenticated, redirecting to /dashboard..."); // Debug log
    return <Navigate to="/dashboard" replace />;
  }

  // If not authenticated, render the login page layout
  console.log("[LoginPage] User is not authenticated, rendering login layout."); // Debug log
  return (
    <div className={styles.loginPageContainer || ''}>
      <LoginPageLayout />
    </div>
  );
};

export default LoginPage;

