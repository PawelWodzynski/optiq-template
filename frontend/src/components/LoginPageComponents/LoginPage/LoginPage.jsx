import React from "react";
import styles from "./LoginPage.module.css"; // Import CSS module
import LoginPageLayout from "./LoginPageLayout/LoginPageLayout";

const LoginPage = () => {
  // Apply a root class if LoginPage.module.css defines one, e.g., styles.loginPageContainer
  // Assuming LoginPage.module.css might have a container style
  return (
    <div className={styles.loginPageContainer || ''}> {/* Example usage */}
      <LoginPageLayout />
    </div>
  );
};

export default LoginPage;

