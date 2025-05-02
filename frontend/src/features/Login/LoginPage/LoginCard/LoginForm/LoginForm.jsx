import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import LoginButton from "./LoginButton/LoginButton";
import LoginCardHeader from "../LoginCardHeader/LoginCardHeader";
import LoginFields from "./LoginFields/LoginFields";
import RegisterSection from "./components/RegisterSection"; // Import the new RegisterSection

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", {
        login,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      // Add user feedback for login errors
    }
  };

  return (
    // Removed the outer React Fragment as it's no longer needed
    <form onSubmit={handleLogin} className={styles.loginFormGrid}>
      <LoginCardHeader />
      <LoginFields
        login={login}
        setLogin={setLogin}
        password={password}
        setPassword={setPassword}
      />
      <div className={styles.buttonContainer}>
        <LoginButton />
        {/* Use the new RegisterSection component */}
        <RegisterSection />
      </div>
      {/* Modal logic is now inside RegisterSection */}
    </form>
  );
};

export default LoginForm;

