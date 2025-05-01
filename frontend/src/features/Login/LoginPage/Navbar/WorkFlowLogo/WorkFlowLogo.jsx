import React from "react";
import styles from "./WorkFlowLogo.module.css"; // Import CSS module

const WorkFlowLogo = () => {
  // Apply classes using styles object
  // Assuming 'workflowLogo' and 'navbarLogoItem1' are defined in the module
  return <p className={`${styles.workflowLogo || ''} ${styles.navbarLogoItem1 || ''}`}>WorkFlow</p>;
};

export default WorkFlowLogo;

