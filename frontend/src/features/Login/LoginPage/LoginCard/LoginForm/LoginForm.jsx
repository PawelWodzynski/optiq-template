import React, { useState } from "react";
import axios from "axios"; // Assuming this is the correct path for your setup
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css"; // Import CSS module
import LoginButton from "./LoginButton/LoginButton";
import LoginCardHeader from "../LoginCardHeader/LoginCardHeader";
import LoginFields from "./LoginFields/LoginFields";

const LoginForm = () => {
  const [login, setLogin] = useState(""); // Initialize state
  const [password, setPassword] = useState(""); // Initialize state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Ensure the backend URL is correct, consider using environment variables
      const response = await axios.post("http://localhost:8080/login", {
        login,
        password,
      });
      // console.log(password); // Avoid logging sensitive info
      // console.log(login);
      const { token } = response.data;
      localStorage.setItem("token", token);
      // Navigate to the dashboard or appropriate route after login
      navigate("/dashboard"); // Changed from /todo to /dashboard based on context
    } catch (error) {
      console.error("Error logging in:", error);
      // Add user feedback for login errors
    }
  };

  return (
    // Apply class using styles object
    <form onSubmit={handleLogin} className={styles.loginFormGrid}>
      <LoginCardHeader />
      <LoginFields
        login={login}
        setLogin={setLogin}
        password={password}
        setPassword={setPassword}
      />
      <LoginButton />
    </form>
  );
};

export default LoginForm;

