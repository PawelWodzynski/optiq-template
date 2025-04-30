import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useI18nextSectionLogic = (initialExpanded = false) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');

  // Update local state if i18n language changes externally
  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      setCurrentLanguage(lng);
    };
    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  const changeLanguage = (lang) => {
    // Use i18n instance to change language
    if (i18n && typeof i18n.changeLanguage === 'function') {
      try {
        i18n.changeLanguage(lang);
        // No need to manually set localStorage, i18next-browser-languagedetector handles it
      } catch (error) {
        console.error('Error using i18n.changeLanguage:', error);
      }
    } else {
      console.error('i18n.changeLanguage function not available.');
      // Fallback or error handling if i18n is not configured correctly
      setCurrentLanguage(lang); // Update local state as a fallback
    }
  };

  return {
    isExpanded,
    toggleExpand,
    currentLanguage,
    changeLanguage,
    t, // Pass translation function
  };
};

