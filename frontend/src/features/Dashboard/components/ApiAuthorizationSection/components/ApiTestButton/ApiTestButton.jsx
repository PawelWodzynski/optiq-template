import React from 'react';
import styles from './ApiTestButton.module.css';
import { FaSpinner, FaLock } from 'react-icons/fa';

const ApiTestButton = ({ onClick, isLoading }) => {
  return (
    <button 
      onClick={onClick}
      disabled={isLoading}
      className={styles.testButton} // Use styles from CSS module
    >
      {isLoading ? (
        <>
          <FaSpinner className={styles.spinner} /> {/* Use spinner style */}
          <span className={styles.buttonText}>Testowanie...</span> {/* Apply text style */}
        </>
      ) : (
        <>
          <FaLock className={styles.icon} /> {/* Apply icon style */}
          <span className={styles.buttonText}>Testuj autoryzację API</span> {/* Apply text style */}
        </>
      )}
    </button>
  );
};

export default ApiTestButton;

