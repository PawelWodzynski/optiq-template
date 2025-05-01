import React from "react";
import styles from "./LoginContentContainer.module.css"; // Import CSS module
import LoginCard from "../LoginCard/LoginCard";

const LoginContentContainer = () => {
  return (
    // Apply classes using styles object
    // Assuming 'loginPageContentContainer' and 'spectrumBackground' are defined in the module
    <div className={`${styles.loginPageContentContainer || ''} ${styles.spectrumBackground || ''}`}>
      <LoginCard /> {/* No props needed based on original */}
    </div>
  );
};

export default LoginContentContainer;

