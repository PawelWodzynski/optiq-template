import React from 'react';
import styles from './TailwindSection.module.css';
import { SiTailwindcss, FaChevronUp, FaChevronDown } from 'react-icons/fa'; // Assuming FaChevronUp/Down are needed
import LibraryStatusIndicator from '../LibraryStatusIndicator';
import { useTailwindSectionLogic } from './TailwindSection';

const TailwindSection = ({ libraryStatus }) => {
  const { isExpanded, toggleExpand } = useTailwindSectionLogic();

  return (
    <section className={styles.sectionContainer}> {/* Use styles from CSS module */}
      <div className={styles.header} onClick={toggleExpand}> {/* Make header clickable */}
        <div className={styles.titleContainer}> {/* Use styles from CSS module */}
          <SiTailwindcss className={styles.icon} /> {/* Use styles from CSS module */}
          <h2 className={styles.title}>Tailwind CSS</h2> {/* Use styles from CSS module */}
        </div>
        <button 
          className={styles.toggleButton} /* Use styles from CSS module */
        >
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {isExpanded && (
        <div className={styles.content}> {/* Use styles from CSS module */}
          <LibraryStatusIndicator libraryName='Tailwind' status={libraryStatus} />
        </div>
      )}
    </section>
  );
};

export default TailwindSection;

