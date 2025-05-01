import React from "react"; // Import React
import styles from "./UsernameField.module.css"; // Import CSS module

const UsernameField = ({ login, setLogin }) => {
  return (
    // Apply class using styles object
    <div className={styles.usernameLoginField}>
      <input
        type="text"
        value={login || ""} // Ensure value is controlled, default to empty string if undefined
        onChange={(e) => setLogin(e.target.value)}
        placeholder="Username"
        className={styles.inputField} // Assuming a style for the input itself
      />
    </div>
  );
};

export default UsernameField;

