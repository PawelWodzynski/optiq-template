import React from 'react';
import styles from './LibraryStatusIndicator.module.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const LibraryStatusIndicator = ({ libraryName, status }) => {
  return (
    <div className={styles.statusContainer}> {/* Use styles from CSS module */}
      {status ? (
        <>
          <FaCheckCircle className={styles.successIcon} /> {/* Use styles from CSS module */}
          <span className={styles.successText}>Biblioteka {libraryName} działa</span> {/* Use styles from CSS module */}
        </>
      ) : (
        <>
          <FaTimesCircle className={styles.errorIcon} /> {/* Use styles from CSS module */}
          <span className={styles.errorText}>Biblioteka {libraryName} nie działa</span> {/* Use styles from CSS module */}
        </>
      )}
    </div>
  );
};

export default LibraryStatusIndicator;

