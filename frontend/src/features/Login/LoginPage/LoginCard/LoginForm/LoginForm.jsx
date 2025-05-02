import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import LoginButton from "./LoginButton/LoginButton";
import LoginCardHeader from "../LoginCardHeader/LoginCardHeader";
import LoginFields from "./LoginFields/LoginFields";
// Removed RegisterSection import

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
        {/* Removed RegisterSection component usage */}
      </div>
    </form>
  );
};

export default LoginForm;

