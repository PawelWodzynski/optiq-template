import React from 'react';
import styles from './I18nextSection.module.css';
import { FaLanguage, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import LibraryStatusIndicator from '../LibraryStatusIndicator';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useI18nextSectionLogic } from './I18nextSection';

const I18nextSection = ({ libraryStatus }) => {
  const { 
    isExpanded, 
    toggleExpand, 
    currentLanguage, 
    changeLanguage, 
    t // Get translation function from hook
  } = useI18nextSectionLogic();

  return (
    <section className={styles.sectionContainer}> {/* Use styles from CSS module */}
      <div className={styles.header} onClick={toggleExpand}> {/* Make header clickable */}
        <div className={styles.titleContainer}> {/* Use styles from CSS module */}
          <FaLanguage className={styles.icon} /> {/* Use styles from CSS module */}
          <h2 className={styles.title}>i18next</h2> {/* Use styles from CSS module */}
        </div>
        <button 
          className={styles.toggleButton} /* Use styles from CSS module */
        >
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {isExpanded && (
        <div className={styles.content}> {/* Use styles from CSS module */}
          <LibraryStatusIndicator libraryName='i18next' status={libraryStatus} />
          {libraryStatus && (
            <div className={styles.translationDemo}> {/* Use styles from CSS module */}
              <p>Aktualny język: {currentLanguage === 'pl' ? 'Polski' : 'English'}</p>
              {/* Use translation function from hook */}
              <p>Tekst testowy: {t('dashboard.welcome', 'Welcome to the dashboard')}</p> 
              <LanguageSwitcher 
                currentLanguage={currentLanguage} 
                onChangeLanguage={changeLanguage} 
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default I18nextSection;

