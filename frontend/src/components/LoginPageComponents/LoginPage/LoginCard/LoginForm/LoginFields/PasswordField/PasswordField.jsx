import React from "react"; // Import React
import styles from "./PasswordField.module.css"; // Import CSS module

const PasswordField = ({ password, setPassword }) => {
  return (
    // Apply class using styles object
    <div className={styles.passwordLoginField}>
      <input
        type="password"
        value={password || ""} // Ensure value is controlled, default to empty string if undefined
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className={styles.inputField} // Assuming a style for the input itself
      />
    </div>
  );
};

export default PasswordField;

