import React from "react";
import styles from "./LoginButton.module.css"; // Import CSS module

const LoginButton = () => {
  return (
    <button type="submit" className={styles.loginButton}> {/* Use styles object */}
      Login
    </button>
  );
};

export default LoginButton;

