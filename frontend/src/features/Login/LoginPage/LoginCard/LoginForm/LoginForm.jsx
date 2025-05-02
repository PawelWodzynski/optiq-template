import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import LoginButton from "./LoginButton/LoginButton";
import LoginCardHeader from "../LoginCardHeader/LoginCardHeader";
import LoginFields from "./LoginFields/LoginFields";
import RegisterLink from "./components/RegisterLink"; // Import RegisterLink
import RegistrationModal from "./components/RegistrationModal"; // Import RegistrationModal
import RegistrationForm from "./components/RegistrationForm"; // Import RegistrationForm

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
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

  // Function to open the registration modal
  const handleRegisterClick = () => {
    setIsModalOpen(true);
  };

  // Function to close the registration modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
          {/* Use RegisterLink component */}
          <RegisterLink onClick={handleRegisterClick} />
        </div>
      </form>

      {/* Render RegistrationModal */}
      <RegistrationModal isOpen={isModalOpen} onClose={handleCloseModal}>
        {/* Render RegistrationForm inside the modal */}
        <RegistrationForm onSuccess={handleCloseModal} />
      </RegistrationModal>
    </>
  );
};

export default LoginForm;

