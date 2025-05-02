import React from "react";
import styles from "./LoginPage.module.css"; // Import module CSS
import LoginHeader from "./components/LoginHeader"; // Import LoginHeader
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterSection from "./components/Register/RegisterSection"; // Import RegisterSection

const LoginPage = () => {
  return (
    <div className={styles.loginPage}> {/* Use module CSS class */}
      <div className={styles.loginContainer}> {/* Use module CSS class */}
        <LoginHeader /> {/* Use LoginHeader component */}
        <LoginForm />
        <RegisterSection /> {/* Add RegisterSection here */}
      </div>
    </div>
  );
};

export default LoginPage;

