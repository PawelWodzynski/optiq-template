import React from "react";
import styles from "./LoginPageLayout.module.css"; // Import CSS module
import LoginPageNavbar from "../Navbar/Navbar";
import LoginContentContainer from "../LoginContentContainer/LoginContentContainer";

const LoginPageLayout = () => {
  return (
    <>
      {/* Apply class using styles object */}
      <div className={styles.loginPageGrid}>
        <LoginPageNavbar />
        <LoginContentContainer />
      </div>
    </>
  );
};

export default LoginPageLayout;

