import React from "react";
import styles from "./LoginPageLayout.module.css"; // Import CSS module
import LoginPageNavbar from "../Navbar/Navbar";
import LoginContentContainer from "../LoginContentContainer/LoginContentContainer";
// Import RegisterSection from its new location
import RegisterSection from "../components/RegisterSection"; 

const LoginPageLayout = () => {
  return (
    <>
      {/* Apply class using styles object - will fix class name in CSS later */}
      <div className={styles.loginPageGrid}>
        <LoginPageNavbar />
        <LoginContentContainer />
        {/* Add RegisterSection in the new third grid row */}
        <RegisterSection /> 
      </div>
    </>
  );
};

export default LoginPageLayout;

