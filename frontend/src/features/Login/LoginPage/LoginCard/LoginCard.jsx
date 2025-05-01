import React from "react";
import styles from "./LoginCard.module.css"; // Import CSS module
import LoginForm from "./LoginForm/LoginForm";

const LoginCard = () => {
  return (
    // Apply class using styles object
    <div className={styles.loginCard}>
      <LoginForm />
    </div>
  );
};

export default LoginCard;

