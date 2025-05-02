import React from "react";
import styles from "./LoginCard.module.css"; // Import CSS module
import LoginForm from "./LoginForm/LoginForm";
// Removed import for RegisterSection

const LoginCard = () => {
  return (
    // Apply class using styles object - CSS class names fixed in CSS file
    <div className={styles.loginCard}> 
      {/* Row 1: Placeholder or Header if needed - Removed as LoginForm has header */}
      {/* Row 2: Login Form */}
      <LoginForm />
      {/* Row 3: Register Section - Removed */}
    </div>
  );
};

export default LoginCard;

