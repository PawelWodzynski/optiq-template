import React from 'react';
import styles from './ApiAuthorizationSection.module.css';
import { FaKey, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import ApiTestButton from './components/ApiTestButton';
import ApiStatusDisplay from './components/ApiStatusDisplay';
import TokenDisplay from './components/TokenDisplay';
import DataTable from './components/DataTable';
import { useApiAuthorizationSectionLogic } from './ApiAuthorizationSection';

const ApiAuthorizationSection = ({ apiAuthStatus, onTestApi }) => {
  const { isExpanded, toggleExpand } = useApiAuthorizationSectionLogic();

  return (
    <section className={styles.sectionContainer}> {/* Use styles */}
      <div className={styles.header} onClick={toggleExpand}> {/* Make header clickable */}
        <div className={styles.titleContainer}> {/* Use styles */}
          <FaKey className={styles.icon} /> {/* Use styles */}
          <h2 className={styles.title}>Api Authorization</h2> {/* Use styles */}
        </div>
        <button 
          className={styles.toggleButton} /* Use styles */
        >
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {isExpanded && (
        <div className={styles.content}> {/* Use styles */}
          <div className={styles.descriptionContainer}> {/* Use styles */}
            <p className={styles.description}>Test autoryzacji API z wykorzystaniem tokena z localStorage</p> {/* Use styles */}
            <p className={styles.endpointInfo}>
              Endpoint: <code>/example/test</code> z tokenem jako parametrem zapytania
            </p> {/* Use styles */}
          </div>
          
          <ApiTestButton 
            onClick={onTestApi} 
            isLoading={apiAuthStatus.loading} 
          />
          
          <ApiStatusDisplay status={apiAuthStatus} />
          
          <TokenDisplay />
          
          {/* Render DataTable only if API call was successful and returned data */}
          {apiAuthStatus.success && apiAuthStatus.data && (
            <DataTable data={apiAuthStatus.data} />
          )}
        </div>
      )}
    </section>
  );
};

export default ApiAuthorizationSection;

