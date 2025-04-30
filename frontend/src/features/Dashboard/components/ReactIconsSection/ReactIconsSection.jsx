import React from 'react';
import styles from './ReactIconsSection.module.css';
import { FaReact, FaNodeJs, FaGithub, FaDocker, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import LibraryStatusIndicator from '../LibraryStatusIndicator';
import { useReactIconsSectionLogic } from './ReactIconsSection';

const ReactIconsSection = ({ libraryStatus }) => {
  const { isExpanded, toggleExpand } = useReactIconsSectionLogic();

  return (
    <section className={styles.sectionContainer}> {/* Use styles from CSS module */}
      <div className={styles.header} onClick={toggleExpand}> {/* Make header clickable */}
        <div className={styles.titleContainer}> {/* Use styles from CSS module */}
          <FaReact className={styles.icon} /> {/* Use styles from CSS module */}
          <h2 className={styles.title}>React Icons</h2> {/* Use styles from CSS module */}
        </div>
        <button 
          className={styles.toggleButton} /* Use styles from CSS module */
        >
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {isExpanded && (
        <div className={styles.content}> {/* Use styles from CSS module */}
          <LibraryStatusIndicator libraryName='React Icons' status={libraryStatus} />
          {libraryStatus && (
            <div className={styles.iconsGrid}> {/* Use styles from CSS module */}
              <FaReact className={styles.displayIcon} /> {/* Use styles from CSS module */}
              <FaNodeJs className={styles.displayIcon} /> {/* Use styles from CSS module */}
              <FaGithub className={styles.displayIcon} /> {/* Use styles from CSS module */}
              <FaDocker className={styles.displayIcon} /> {/* Use styles from CSS module */}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ReactIconsSection;

