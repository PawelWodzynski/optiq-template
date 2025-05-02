import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import axios from '../../../../utils/axios';
import { useNavigate } from "react-router-dom";

// Import subcomponents
import FormHeader from "./components/FormHeader";
import ErrorMessage from "./components/ErrorMessage";
import UsernameField from "./components/UsernameField";
import PasswordField from "./components/PasswordField";
import LoginButton from "./components/LoginButton";

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/login", {
        login,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.response) {
        setError(error.response.data.message || "Nieprawidłowy login lub hasło");
      } else if (error.request) {
        setError("Brak odpowiedzi z serwera. Sprawdź połączenie sieciowe.");
      } else {
        setError("Wystąpił nieznany błąd podczas logowania");
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className={styles.loginForm}>
      <FormHeader title="Logowanie" />
      <ErrorMessage message={error} />
      <UsernameField 
        value={login} 
        onChange={(e) => setLogin(e.target.value)} 
      />
      <PasswordField 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <LoginButton type="submit">
        Zaloguj się
      </LoginButton>
    </form>
  );
};

export default LoginForm;

