import React from "react";
import styles from "./Navbar.module.css"; // Import CSS module
import WorkFlowLogo from "./WorkFlowLogo/WorkFlowLogo";

const LoginPageNavbar = () => {
  return (
    // Apply classes using styles object
    // Assuming 'navbar' and 'navbarGrid' are defined in the module
    <div className={`${styles.navbar || ''} ${styles.navbarGrid || ''}`}>
      <WorkFlowLogo />
    </div>
  );
};

export default LoginPageNavbar;

