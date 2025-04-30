import React from 'react';
import styles from './AxiosSection.module.css';
import { SiAxios } from 'react-icons/si';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import LibraryStatusIndicator from '../LibraryStatusIndicator';
import { useAxiosSectionLogic } from './AxiosSection';

const AxiosSection = ({ libraryStatus }) => {
  const { isExpanded, toggleExpand } = useAxiosSectionLogic();

  return (
    <section className={styles.sectionContainer}> {/* Use styles from CSS module */}
      <div className={styles.header} onClick={toggleExpand}> {/* Make header clickable */}
        <div className={styles.titleContainer}> {/* Use styles from CSS module */}
          <SiAxios className={styles.icon} /> {/* Use styles from CSS module */}
          <h2 className={styles.title}>Axios</h2> {/* Use styles from CSS module */}
        </div>
        <button 
          className={styles.toggleButton} /* Use styles from CSS module */
        >
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {isExpanded && (
        <div className={styles.content}> {/* Use styles from CSS module */}
          <LibraryStatusIndicator libraryName='Axios' status={libraryStatus} />
          {/* No additional content needed for Axios section based on original code */}
        </div>
      )}
    </section>
  );
};

export default AxiosSection;

