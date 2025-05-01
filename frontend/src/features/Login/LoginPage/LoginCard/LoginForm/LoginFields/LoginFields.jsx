import React from "react";
import styles from "./LoginFields.module.css"; // Import CSS module
import UsernameField from "./UsernameField/UsernameField";
import PasswordField from "./PasswordField/PasswordField";

const LoginFields = ({ login, setLogin, password, setPassword }) => {
  return (
    // Apply class using styles object
    <div className={styles.loginFields}>
      <UsernameField login={login} setLogin={setLogin} />
      <PasswordField password={password} setPassword={setPassword} />
    </div>
  );
};

export default LoginFields;

