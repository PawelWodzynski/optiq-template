import React, { useState, useEffect } from "react";
import { 
  FaReact, FaNodeJs, FaNpm, 
  FaGithub, FaDocker, FaAws,
  FaUser, FaBell, FaCog, FaSearch,
  FaChevronDown, FaEnvelope, FaSignOutAlt,
  FaChevronUp, FaGlobe, FaSpinner, FaCheckCircle, FaTimesCircle, FaChartLine, FaLanguage,
  FaLock, FaKey, FaDatabase, FaTable
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
  const [isApiAuthExpanded, setIsApiAuthExpanded] = useState(false);

  // Stan bibliotek
  const [libraryStatus, setLibraryStatus] = useState({
    tailwind: true,
    recharts: true,
    reactIcons: true,
    i18next: true,
    axios: true
  });

  // Stan dla API Authorization
  const [apiAuthStatus, setApiAuthStatus] = useState({
    loading: false,
    success: null,
    message: '',
    error: null,
    data: null  // Dodane pole dla danych z example_data
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

  // Funkcja do testowania autoryzacji API
  const testApiAuthorization = async () => {
    setApiAuthStatus({
      loading: true,
      success: null,
      message: '',
      error: null,
      data: null
    });

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Token nie został znaleziony w localStorage');
      }

      console.log('Wykonuję test API z tokenem:', token);
      
      // Przesyłamy token jako parametr URL (preferowana metoda)
      const response = await axios.get(`/example/test?token=${token}`);
      
      console.log('Odpowiedź API:', response);
      
      setApiAuthStatus({
        loading: false,
        success: true,
        message: response.data?.message || 'Autoryzacja API działa poprawnie',
        error: null,
        data: response.data?.data || null  // Pobieramy dane z odpowiedzi
      });
    } catch (error) {
      console.error('Błąd API:', error);
      
      setApiAuthStatus({
        loading: false,
        success: false,
        message: '',
        error: error.response?.data?.message || error.message || 'Wystąpił błąd podczas autoryzacji API',
        data: null
      });
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

  // Renderowanie tabeli z danymi example_data
  const renderExampleDataTable = (data) => {
    if (!data || data.length === 0) {
      return (
        <div className="text-center py-4 text-gray-400">
          Brak danych do wyświetlenia
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Data Cell 1</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Data Cell 2</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-800">
                <td className="px-4 py-2 whitespace-nowrap">{item.id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{item.dataCell1}</td>
                <td className="px-4 py-2 whitespace-nowrap">{item.dataCell2}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {item.timestampCell ? new Date(item.timestampCell).toLocaleString() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

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

        {/* API Authorization - nowa sekcja */}
        <section className="bg-gray-800 rounded-xl">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center space-x-3">
              <FaKey className="h-8 w-8 text-indigo-400" />
              <h2 className="text-xl font-bold">Api Authorization</h2>
            </div>
            <button 
              onClick={() => setIsApiAuthExpanded(!isApiAuthExpanded)}
              className="text-gray-400 hover:text-white"
            >
              {isApiAuthExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          {isApiAuthExpanded && (
            <div className="p-4 space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="mb-4">
                  <p className="mb-2">Test autoryzacji API z wykorzystaniem tokena z localStorage</p>
                  <p className="text-sm text-gray-400">
                    Endpoint: <code>/example/test</code> z tokenem jako parametrem zapytania
                  </p>
                </div>
                
                <button 
                  onClick={testApiAuthorization}
                  disabled={apiAuthStatus.loading}
                  className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {apiAuthStatus.loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Testowanie...</span>
                    </>
                  ) : (
                    <>
                      <FaLock />
                      <span>Testuj autoryzację API</span>
                    </>
                  )}
                </button>
                
                {apiAuthStatus.success !== null && (
                  <div className={`mt-4 p-3 rounded-lg ${apiAuthStatus.success ? 'bg-green-700' : 'bg-red-700'}`}>
                    <div className="flex items-center space-x-2">
                      {apiAuthStatus.success ? (
                        <>
                          <FaCheckCircle className="text-green-400" />
                          <span className="font-bold">Sukces</span>
                        </>
                      ) : (
                        <>
                          <FaTimesCircle className="text-red-400" />
                          <span className="font-bold">Błąd</span>
                        </>
                      )}
                    </div>
                    <p className="mt-2">
                      {apiAuthStatus.success 
                        ? apiAuthStatus.message 
                        : apiAuthStatus.error}
                    </p>
                  </div>
                )}
                
                <div className="mt-4 bg-gray-800 p-3 rounded border border-gray-700">
                  <p className="text-sm text-gray-400 mb-1">Aktualny token:</p>
                  <div className="bg-gray-900 p-2 rounded overflow-x-auto">
                    <code className="text-xs break-all text-green-400">
                      {localStorage.getItem('token') || 'Brak tokenu w localStorage'}
                    </code>
                  </div>
                </div>
                
                {/* Nowa sekcja - Tabela z danymi */}
                {apiAuthStatus.success && apiAuthStatus.data && (
                  <div className="mt-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <FaDatabase className="text-blue-400" />
                      <h3 className="text-lg font-semibold">Dane z tabeli example_data</h3>
                    </div>
                    {renderExampleDataTable(apiAuthStatus.data)}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;