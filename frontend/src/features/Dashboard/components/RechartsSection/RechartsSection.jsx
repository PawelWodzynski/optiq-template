import React from 'react';
import styles from './RechartsSection.module.css';
import { FaChartLine, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import LibraryStatusIndicator from '../LibraryStatusIndicator';
import StatusChart from './components/StatusChart';
import { useRechartsSectionLogic } from './RechartsSection';

const RechartsSection = ({ libraryStatus, chartData }) => {
  const { isExpanded, toggleExpand } = useRechartsSectionLogic();

  return (
    <section className={styles.sectionContainer}> {/* Use styles from CSS module */}
      <div className={styles.header} onClick={toggleExpand}> {/* Make header clickable */}
        <div className={styles.titleContainer}> {/* Use styles from CSS module */}
          <FaChartLine className={styles.icon} /> {/* Use styles from CSS module */}
          <h2 className={styles.title}>Recharts</h2> {/* Use styles from CSS module */}
        </div>
        <button 
          className={styles.toggleButton} /* Use styles from CSS module */
        >
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {isExpanded && (
        <div className={styles.content}> {/* Use styles from CSS module */}
          <LibraryStatusIndicator libraryName='Recharts' status={libraryStatus} />
          {libraryStatus && (
            <StatusChart data={chartData} />
          )}
        </div>
      )}
    </section>
  );
};

export default RechartsSection;

