import React from "react";
import { Navigate } from "react-router-dom"; // Import Navigate for redirection
import styles from "./LoginPage.module.css";
import LoginPageLayout from "./LoginPageLayout/LoginPageLayout";

const LoginPage = () => {
  const token = localStorage.getItem("token");
  const isAuthenticated = token !== null;

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // If not authenticated, render the login page layout
  return (
    <div className={styles.loginPageContainer || ''}>
      <LoginPageLayout />
    </div>
  );
};

export default LoginPage;

