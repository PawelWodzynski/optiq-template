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
          <FaSpinner className={styles.spinner} /> {/* Use styles from CSS module */}
          <span>Testowanie...</span>
        </>
      ) : (
        <>
          <FaLock />
          <span>Testuj autoryzację API</span>
        </>
      )}
    </button>
  );
};

export default ApiTestButton;

