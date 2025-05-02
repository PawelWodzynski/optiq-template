import React, { useState } from "react";
import "./LoginForm.css";
import axios from '../../../../utils/axios';
import { useNavigate } from "react-router-dom";
import RegisterSection from "../Register/RegisterSection";

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Resetowanie poprzedniego błędu

    try {
      // Zmiana URL na relatywny - nginx przekieruje
      const response = await axios.post("/login", {
        login,
        password, // Usuń .split('')
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
      
      // Bardziej szczegółowa obsługa błędów
      if (error.response) {
        // Błąd z odpowiedzi serwera
        setError(error.response.data.message || "Nieprawidłowy login lub hasło");
      } else if (error.request) {
        // Błąd połączenia
        setError("Brak odpowiedzi z serwera. Sprawdź połączenie sieciowe.");
      } else {
        // Inny błąd
        setError("Wystąpił nieznany błąd podczas logowania");
      }
    }
  };

  return (
    <>
    <form onSubmit={handleLogin} className="login-form">
      <h2>Logowanie</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <label htmlFor="username">Nazwa użytkownika</label>
        <input
          type="text"
          id="username"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Hasło</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="login-button">
        Zaloguj się
      </button>
    
    </form>
     <RegisterSection/>
    </>
  );
};

export default LoginForm;
