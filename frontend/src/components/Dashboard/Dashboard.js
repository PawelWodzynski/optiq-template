import React, { useState, useEffect } from "react";
import { 
  FaReact, FaNodeJs, FaNpm, 
  FaGithub, FaDocker, FaAws,
  FaUser, FaBell, FaCog, FaSearch,
  FaChevronDown, FaEnvelope, FaSignOutAlt,
  FaChevronUp, FaGlobe, FaSpinner, FaCheckCircle, FaTimesCircle, FaChartLine, FaLanguage
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiVite, SiJavascript, 
  SiTypescript, SiMongodb, SiRedux,
  SiAxios
} from 'react-icons/si';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from '../../utils/axios';
import "./Dashboard.css";

const Dashboard = () => {
  // Stany dla rozwijania sekcji
  const [isTailwindExpanded, setIsTailwindExpanded] = useState(false);
  const [isRechartsExpanded, setIsRechartsExpanded] = useState(false);
  const [isReactIconsExpanded, setIsReactIconsExpanded] = useState(false);
  const [isI18NextExpanded, setIsI18NextExpanded] = useState(false);
  const [isAxiosExpanded, setIsAxiosExpanded] = useState(false);

  // Stan bibliotek
  const [libraryStatus, setLibraryStatus] = useState({
    tailwind: true,
    recharts: true,
    reactIcons: true,
    i18next: true,
    axios: true
  });

  // Dane do wykresu Recharts
  const chartData = [
    { name: 'Sty', uv: 4000, pv: 2400 },
    { name: 'Lut', uv: 3000, pv: 1398 },
    { name: 'Mar', uv: 2000, pv: 9800 },
    { name: 'Kwi', uv: 2780, pv: 3908 },
    { name: 'Maj', uv: 1890, pv: 4800 },
  ];

  // Tłumaczenia - sprawdzenie i18next
  const { t, i18n } = useTranslation();
  const [translationTest, setTranslationTest] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  // Funkcja zmiany języka
  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
    // Próba użycia i18n jeśli dostępne
    if (i18n && typeof i18n.changeLanguage === 'function') {
      try {
        i18n.changeLanguage(lang);
      } catch (error) {
        console.error('Error using i18n.changeLanguage:', error);
      }
    } else {
      console.log('Setting language manually to:', lang);
      // Fallback: zapisz preferencję w localStorage
      localStorage.setItem('language', lang);
    }
  };

  // Sprawdzenie bibliotek
  useEffect(() => {
    // Flaga oznaczająca czy komponent jest zamontowany
    let isMounted = true;
    
    // Sprawdź czy jest zapisany język w localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Sprawdzenie Tailwind
    try {
      document.body.classList.add('bg-red-500');
      document.body.classList.remove('bg-red-500');
      if (isMounted) {
        setLibraryStatus(prev => ({ ...prev, tailwind: true }));
      }
    } catch (error) {
      if (isMounted) {
        setLibraryStatus(prev => ({ ...prev, tailwind: false }));
      }
    }

    // Sprawdzenie Recharts
    try {
      if (!LineChart) {
        throw new Error('Recharts not working');
      }
      if (isMounted) {
        setLibraryStatus(prev => ({ ...prev, recharts: true }));
      }
    } catch (error) {
      if (isMounted) {
        setLibraryStatus(prev => ({ ...prev, recharts: false }));
      }
    }

    // Sprawdzenie React Icons
    try {
      if (!FaReact) {
        throw new Error('React Icons not working');
      }
      if (isMounted) {
        setLibraryStatus(prev => ({ ...prev, reactIcons: true }));
      }
    } catch (error) {
      if (isMounted) {
        setLibraryStatus(prev => ({ ...prev, reactIcons: false }));
      }
    }

    // Sprawdzenie i18next
    try {
      const testTranslation = t('test.message', 'Domyślny tekst');
      if (isMounted) {
        setTranslationTest(testTranslation);
        setLibraryStatus(prev => ({ ...prev, i18next: true }));
      }
    } catch (error) {
      if (isMounted) {
        setLibraryStatus(prev => ({ ...prev, i18next: false }));
      }
    }

    // Sprawdzenie Axios - wykonujemy tylko raz
    let axiosCheckDone = false;
    
    try {
      if (!axiosCheckDone) {
        axiosCheckDone = true;
        axios.get('https://jsonplaceholder.typicode.com/posts/1')
          .then(() => {
            if (isMounted) {
              setLibraryStatus(prev => ({ ...prev, axios: true }));
            }
          })
          .catch((error) => {
            console.error("Axios test error:", error);
            if (isMounted) {
              setLibraryStatus(prev => ({ ...prev, axios: false }));
            }
          });
      }
    } catch (error) {
      console.error("Axios setup error:", error);
      if (isMounted) {
        setLibraryStatus(prev => ({ ...prev, axios: false }));
      }
    }

    // Funkcja czyszcząca
    return () => {
      isMounted = false;
    };
  }, []); // Usunięto t z zależności - to powodowało wielokrotne wykonywanie efektu

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Renderowanie statusu biblioteki
  const renderLibraryStatus = (libraryName, status) => (
    <div className="flex items-center space-x-2">
      {status ? (
        <>
          <FaCheckCircle className="text-green-500" />
          <span className="text-green-500">Biblioteka {libraryName} działa</span>
        </>
      ) : (
        <>
          <FaTimesCircle className="text-red-500" />
          <span className="text-red-500">Biblioteka {libraryName} nie działa</span>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      {/* Nagłówek */}
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center space-x-4">
          <FaReact className="h-10 w-10 text-blue-500" />
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleLogout} 
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
          >
            <FaSignOutAlt />
            <span>Wyloguj</span>
          </button>
        </div>
      </header>

      {/* Główna treść */}
      <main className="max-w-4xl mx-auto space-y-6">
        {/* Tailwind */}
        <section className="bg-gray-800 rounded-xl">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center space-x-3">
              <SiTailwindcss className="h-8 w-8 text-teal-400" />
              <h2 className="text-xl font-bold">Tailwind CSS</h2>
            </div>
            <button 
              onClick={() => setIsTailwindExpanded(!isTailwindExpanded)}
              className="text-gray-400 hover:text-white"
            >
              {isTailwindExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          {isTailwindExpanded && (
            <div className="p-4">
              {renderLibraryStatus('Tailwind', libraryStatus.tailwind)}
            </div>
          )}
        </section>

        {/* Recharts */}
        <section className="bg-gray-800 rounded-xl">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center space-x-3">
              <FaChartLine className="h-8 w-8 text-green-400" />
              <h2 className="text-xl font-bold">Recharts</h2>
            </div>
            <button 
              onClick={() => setIsRechartsExpanded(!isRechartsExpanded)}
              className="text-gray-400 hover:text-white"
            >
              {isRechartsExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          {isRechartsExpanded && (
            <div className="p-4 space-y-4">
              {renderLibraryStatus('Recharts', libraryStatus.recharts)}
              {libraryStatus.recharts && (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          )}
        </section>

        {/* React Icons */}
        <section className="bg-gray-800 rounded-xl">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center space-x-3">
              <FaReact className="h-8 w-8 text-blue-400" />
              <h2 className="text-xl font-bold">React Icons</h2>
            </div>
            <button 
              onClick={() => setIsReactIconsExpanded(!isReactIconsExpanded)}
              className="text-gray-400 hover:text-white"
            >
              {isReactIconsExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          {isReactIconsExpanded && (
            <div className="p-4 grid grid-cols-4 gap-4">
              {renderLibraryStatus('React Icons', libraryStatus.reactIcons)}
              {libraryStatus.reactIcons && (
                <>
                  <FaReact className="h-12 w-12 text-blue-500" />
                  <FaNodeJs className="h-12 w-12 text-green-500" />
                  <FaGithub className="h-12 w-12 text-gray-500" />
                  <FaDocker className="h-12 w-12 text-blue-500" />
                </>
              )}
            </div>
          )}
        </section>

        {/* i18next */}
        <section className="bg-gray-800 rounded-xl">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center space-x-3">
              <FaLanguage className="h-8 w-8 text-purple-400" />
              <h2 className="text-xl font-bold">i18next</h2>
            </div>
            <button 
              onClick={() => setIsI18NextExpanded(!isI18NextExpanded)}
              className="text-gray-400 hover:text-white"
            >
              {isI18NextExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          {isI18NextExpanded && (
            <div className="p-4 space-y-4">
              {renderLibraryStatus('i18next', libraryStatus.i18next)}
              {libraryStatus.i18next && (
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p>Aktualny język: {currentLanguage === 'pl' ? 'Polski' : 'English'}</p>
                  <p>Tekst testowy: {currentLanguage === 'pl' ? 'Witaj w panelu kontrolnym' : 'Welcome to the dashboard'}</p>
                  <div className="mt-4 space-x-2">
                    <button 
                      onClick={() => changeLanguage('pl')}
                      className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
                    >
                      {currentLanguage === 'pl' ? 'Polski' : 'Polish'}
                    </button>
                    <button 
                      onClick={() => changeLanguage('en')}
                      className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
                    >
                      {currentLanguage === 'pl' ? 'Angielski' : 'English'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Axios */}
        <section className="bg-gray-800 rounded-xl">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center space-x-3">
              <SiAxios className="h-8 w-8 text-yellow-400" />
              <h2 className="text-xl font-bold">Axios</h2>
            </div>
            <button 
              onClick={() => setIsAxiosExpanded(!isAxiosExpanded)}
              className="text-gray-400 hover:text-white"
            >
              {isAxiosExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          {isAxiosExpanded && (
            <div className="p-4 space-y-4">
              {renderLibraryStatus('Axios', libraryStatus.axios)}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
