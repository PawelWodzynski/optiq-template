import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginButton.module.css";

const LoginButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <button onClick={handleClick} className={styles.loginButton}>
      Login
    </button>
  );
};

export default LoginButton;

