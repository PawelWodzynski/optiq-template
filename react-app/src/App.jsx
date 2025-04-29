import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios' // Import Axios

// Import dla Recharts
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Import dla React Icons
import { 
  FaReact, FaNodeJs, FaNpm, 
  FaGithub, FaDocker, FaAws,
  FaUser, FaBell, FaCog, FaSearch,
  FaChevronDown, FaEnvelope, FaSignOutAlt,
  FaChevronUp, FaGlobe, FaSpinner
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiVite, SiJavascript, 
  SiTypescript, SiMongodb, SiRedux,
  SiAxios
} from 'react-icons/si';

function App() {
  const [count, setCount] = useState(0)
  const [isTailwindExpanded, setIsTailwindExpanded] = useState(false)
  const [isRechartsExpanded, setIsRechartsExpanded] = useState(false)
  const [isIconsExpanded, setIsIconsExpanded] = useState(false)
  const [isAxiosExpanded, setIsAxiosExpanded] = useState(false)
  
  // Stan dla danych z Axios
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedData, setSelectedData] = useState('posts')

  // Dane dla wykresów Recharts
  const chartData = [
    { name: 'Sty', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Lut', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Kwi', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Maj', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Cze', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Lip', uv: 3490, pv: 4300, amt: 2100 },
  ];

  // Funkcja do pobierania danych przy użyciu Axios
  const fetchData = async (dataType) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/${dataType}`)
      if (dataType === 'posts') {
        setPosts(response.data.slice(0, 5)) // Ograniczamy ilość danych
      } else if (dataType === 'users') {
        setUsers(response.data)
      }
      setSelectedData(dataType)
    } catch (err) {
      setError(`Wystąpił błąd: ${err.message}`)
      console.error('Błąd pobierania danych:', err)
    } finally {
      setLoading(false)
    }
  }

  // Pobierz dane, gdy sekcja Axios jest rozwinięta
  useEffect(() => {
    if (isAxiosExpanded && posts.length === 0) {
      fetchData('posts')
    }
  }, [isAxiosExpanded])

  // Grupy ikon z opisami
  const iconGroups = [
    {
      title: "Technologie frontendowe",
      icons: [
        { Icon: FaReact, name: "React", color: "text-blue-500" },
        { Icon: SiVite, name: "Vite", color: "text-purple-500" },
        { Icon: SiTailwindcss, name: "Tailwind", color: "text-teal-500" },
      ]
    },
    {
      title: "Technologie backendowe",
      icons: [
        { Icon: FaNodeJs, name: "Node.js", color: "text-green-600" },
        { Icon: SiMongodb, name: "MongoDB", color: "text-green-500" },
        { Icon: FaNpm, name: "NPM", color: "text-red-500" },
      ]
    },
    {
      title: "Języki i frameworki",
      icons: [
        { Icon: SiJavascript, name: "JavaScript", color: "text-yellow-500" },
        { Icon: SiTypescript, name: "TypeScript", color: "text-blue-600" },
        { Icon: SiRedux, name: "Redux", color: "text-purple-600" },
      ]
    },
    {
      title: "DevOps i narzędzia",
      icons: [
        { Icon: FaGithub, name: "GitHub", color: "text-gray-800" },
        { Icon: FaDocker, name: "Docker", color: "text-blue-500" },
        { Icon: FaAws, name: "AWS", color: "text-yellow-600" },
      ]
    }
  ];

  // Przykładowe dane dla dashboardu
  const notifications = [
    { id: 1, text: "Nowa wiadomość od zespołu", time: "10 min temu", isRead: false },
    { id: 2, text: "Twoje zadanie zostało zaktualizowane", time: "1 godz temu", isRead: false },
    { id: 3, text: "Zaplanowane spotkanie za 30 minut", time: "3 godz temu", isRead: true },
    { id: 4, text: "Pamiętaj o terminie projektu", time: "wczoraj", isRead: true }
  ];

  const stats = [
    { label: "Projekty", value: "12", color: "bg-blue-500" },
    { label: "Zadania", value: "42", color: "bg-green-500" },
    { label: "Aktywność", value: "89%", color: "bg-purple-500" },
    { label: "Zespoły", value: "5", color: "bg-yellow-500" }
  ];

  const tasks = [
    { id: 1, title: "Przegląd projektu", status: "W trakcie", priority: "Wysoki", dueDate: "Dzisiaj" },
    { id: 2, title: "Aktualizacja dokumentacji", status: "W trakcie", priority: "Średni", dueDate: "Jutro" },
    { id: 3, title: "Testy użyteczności", status: "Zaplanowane", priority: "Niski", dueDate: "18.05" },
    { id: 4, title: "Poprawki interfejsu", status: "Ukończone", priority: "Wysoki", dueDate: "15.05" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex justify-center items-center gap-8 mb-10">
        <a href="https://vite.dev" target="_blank" className="transition-transform hover:scale-110">
          <img src={viteLogo} className="h-20 drop-shadow-lg" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="transition-transform hover:scale-110">
          <img src={reactLogo} className="h-20 animate-spin-slow drop-shadow-lg" alt="React logo" />
        </a>
      </div>
      
      {/* Tytuł */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-lg">
        Vite + React
      </h1>
      
      {/* Licznik */}
      <div className="max-w-md mx-auto mb-14 text-center bg-gray-800 bg-opacity-50 p-6 rounded-xl backdrop-blur-sm shadow-xl">
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xl font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          Licznik: {count}
        </button>
        <p className="mt-4 text-gray-300 italic font-light">
          Edytuj <code className="bg-gray-700 px-2 py-1 rounded text-yellow-300">src/App.jsx</code> i zapisz, by przetestować HMR
        </p>
      </div>

      {/* Element testowy Axios */}
      <div className="max-w-2xl mx-auto mb-14">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 backdrop-blur-sm">
            <div className="flex items-center">
              <div className="rounded-full bg-white p-3 shadow-inner">
                <SiAxios className="h-8 w-8 text-black" />
              </div>
              <div className="ml-5">
                <h2 className="text-2xl font-bold text-white tracking-wide">Axios działa!</h2>
                <p className="text-yellow-100 font-light">Biblioteka HTTP do pobierania danych z API</p>
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                onClick={() => setIsAxiosExpanded(!isAxiosExpanded)}
                className={`w-full px-5 py-3 font-bold rounded-xl shadow-lg focus:outline-none transition-all duration-300 ease-in-out text-lg flex items-center justify-center ${
                  isAxiosExpanded 
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                    : 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white hover:from-yellow-500 hover:to-yellow-600'
                }`}
              >
                {isAxiosExpanded 
                  ? <><FaChevronUp className="mr-2" /> Zwiń AXIOS</>
                  : <><FaChevronDown className="mr-2" /> Pokaż dane z AXIOS</>
                }
              </button>
            </div>
            
            {isAxiosExpanded && (
              <div className="mt-6 bg-white p-5 rounded-xl shadow-inner text-gray-800">
                <div className="flex flex-wrap gap-3 justify-center mb-6">
                  <button 
                    onClick={() => fetchData('posts')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedData === 'posts' 
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Posty
                  </button>
                  <button 
                    onClick={() => fetchData('users')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedData === 'users' 
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Użytkownicy
                  </button>
                </div>
                
                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <FaSpinner className="animate-spin text-yellow-500 h-10 w-10" />
                    <span className="ml-3 text-gray-600 text-lg">Ładowanie danych...</span>
                  </div>
                ) : error ? (
                  <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                    <p>{error}</p>
                  </div>
                ) : (
                  <div>
                    {selectedData === 'posts' && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-center border-b border-gray-200 pb-2">Posty z JSONPlaceholder API</h3>
                        {posts.map(post => (
                          <div key={post.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <h4 className="text-lg font-bold mb-2">{post.title}</h4>
                            <p className="text-gray-600">{post.body}</p>
                            <div className="mt-2 text-sm text-gray-500">
                              Post ID: {post.id} • Użytkownik ID: {post.userId}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {selectedData === 'users' && (
                      <div>
                        <h3 className="text-xl font-bold text-center border-b border-gray-200 pb-2 mb-4">Użytkownicy z JSONPlaceholder API</h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-white rounded-lg overflow-hidden">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-4 py-2 text-left text-gray-700">ID</th>
                                <th className="px-4 py-2 text-left text-gray-700">Imię i nazwisko</th>
                                <th className="px-4 py-2 text-left text-gray-700">Email</th>
                                <th className="px-4 py-2 text-left text-gray-700">Firma</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {users.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                  <td className="px-4 py-3">{user.id}</td>
                                  <td className="px-4 py-3 font-medium">{user.name}</td>
                                  <td className="px-4 py-3 text-blue-600">{user.email}</td>
                                  <td className="px-4 py-3">{user.company.name}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="mt-6 space-y-3 text-gray-700 p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-400 shadow"></span>
                    <span className="ml-3 font-medium">Pobieranie danych z zewnętrznych API</span>
                  </div>
                  <div className="flex items-center">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-400 shadow"></span>
                    <span className="ml-3 font-medium">Obsługa błędów i stanu ładowania</span>
                  </div>
                  <div className="flex items-center">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-400 shadow"></span>
                    <span className="ml-3 font-medium">Automatyczne transformacje JSON</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Element testowy Tailwind */}
      <div className="max-w-2xl mx-auto mb-14">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 backdrop-blur-sm">
            <div className="flex items-center">
              <div className="rounded-full bg-white p-3 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-5">
                <h2 className="text-2xl font-bold text-white tracking-wide">Tailwind działa!</h2>
                <p className="text-blue-100 font-light">Teraz możesz korzystać ze wszystkich funkcji Tailwind CSS</p>
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                onClick={() => setIsTailwindExpanded(!isTailwindExpanded)}
                className={`w-full px-5 py-3 font-bold rounded-xl shadow-lg focus:outline-none transition-all duration-300 ease-in-out text-lg flex items-center justify-center ${
                  isTailwindExpanded 
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600'
                }`}
              >
                {isTailwindExpanded 
                  ? <><FaChevronUp className="mr-2" /> Zwiń TAILWIND</>
                  : <><FaChevronDown className="mr-2" /> Pokaż dashboard TAILWIND</>
                }
              </button>
            </div>
            
            {isTailwindExpanded && (
              <div className="mt-6 bg-white rounded-xl shadow-inner overflow-hidden">
                {/* Dashboard UI z Tailwind */}
                <div className="text-gray-800">
                  {/* Navbar */}
                  <nav className="bg-indigo-600 text-white p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <SiTailwindcss className="h-8 w-8" />
                        <h1 className="text-xl font-bold">Tailwind Dashboard</h1>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="relative hidden sm:block">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FaSearch className="text-indigo-300" />
                          </div>
                          <input 
                            type="text" 
                            className="block w-full pl-10 pr-4 py-2 rounded-lg bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-white focus:bg-indigo-800 text-white placeholder-indigo-300"
                            placeholder="Szukaj..."
                          />
                        </div>
                        <button className="relative p-2 rounded-full hover:bg-indigo-700 transition-colors">
                          <FaBell />
                          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                        </button>
                        <div className="flex items-center space-x-2 ml-2 sm:ml-4">
                          <div className="h-8 w-8 rounded-full bg-indigo-800 flex items-center justify-center">
                            <FaUser className="h-4 w-4" />
                          </div>
                          <span className="font-medium hidden md:inline">Jan Kowalski</span>
                          <FaChevronDown className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </nav>

                  {/* Main Content */}
                  <div className="p-4 sm:p-6">
                    {/* Welcome */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-3 sm:space-y-0">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">Witaj, Jan 👋</h2>
                        <p className="text-gray-500">Oto podsumowanie Twojej aktywności</p>
                      </div>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2 w-full sm:w-auto justify-center sm:justify-start">
                        <span>Nowy projekt</span>
                        <span className="h-5 w-5 bg-indigo-500 rounded-full flex items-center justify-center">+</span>
                      </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
                      {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-4 rounded-xl shadow-md">
                          <div className={`h-2 w-16 ${stat.color} rounded-full mb-3`}></div>
                          <p className="text-gray-500 text-sm">{stat.label}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Tasks */}
                      <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-md">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-3 sm:space-y-0">
                          <h3 className="text-lg font-bold">Zadania</h3>
                          <div className="flex flex-wrap gap-2 text-sm">
                            <button className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200">Wszystkie</button>
                            <button className="px-3 py-1 text-gray-500 rounded-md hover:bg-gray-100">W trakcie</button>
                            <button className="px-3 py-1 text-gray-500 rounded-md hover:bg-gray-100">Ukończone</button>
                          </div>
                        </div>
                        <div className="divide-y">
                          {tasks.map(task => (
                            <div key={task.id} className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                              <div className="flex items-center">
                                <div className={`h-3 w-3 rounded-full mr-3 ${
                                  task.status === 'Ukończone' 
                                    ? 'bg-green-400' 
                                    : task.status === 'W trakcie' 
                                      ? 'bg-yellow-400' 
                                      : 'bg-blue-400'
                                }`}></div>
                                <div>
                                  <p className={`font-medium ${
                                    task.status === 'Ukończone' 
                                      ? 'text-gray-400 line-through' 
                                      : 'text-gray-800'
                                  }`}>{task.title}</p>
                                  <p className="text-sm text-gray-500">Termin: {task.dueDate}</p>
                                </div>
                              </div>
                              <div>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  task.priority === 'Wysoki' 
                                    ? 'bg-red-100 text-red-600' 
                                    : task.priority === 'Średni'
                                      ? 'bg-yellow-100 text-yellow-600'
                                      : 'bg-green-100 text-green-600'
                                }`}>
                                  {task.priority}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button className="mt-4 w-full py-2 border border-dashed border-indigo-300 text-indigo-500 rounded-lg hover:bg-indigo-50 transition-colors">
                          + Dodaj nowe zadanie
                        </button>
                      </div>

                      {/* Notifications */}
                      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
                        <h3 className="text-lg font-bold mb-4">Powiadomienia</h3>
                        <div className="space-y-4">
                          {notifications.map(notification => (
                            <div 
                              key={notification.id} 
                              className={`p-3 rounded-lg ${notification.isRead ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-blue-500'}`}
                            >
                              <div className="flex justify-between items-start">
                                <p className={`${notification.isRead ? 'text-gray-600' : 'text-gray-800 font-medium'}`}>
                                  {notification.text}
                                </p>
                                {!notification.isRead && (
                                  <span className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 ml-2"></span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          ))}
                        </div>
                        <button className="mt-4 w-full text-center text-indigo-500 hover:underline">
                          Zobacz wszystkie powiadomienia
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Element testowy Recharts */}
      <div className="max-w-2xl mx-auto mb-14">
        <div className="bg-gradient-to-r from-green-600 to-teal-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 backdrop-blur-sm">
            <div className="flex items-center">
              <div className="rounded-full bg-white p-3 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-5">
                <h2 className="text-2xl font-bold text-white tracking-wide">Recharts działa!</h2>
                <p className="text-green-100 font-light">Biblioteka do tworzenia interaktywnych wykresów</p>
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                onClick={() => setIsRechartsExpanded(!isRechartsExpanded)}
                className={`w-full px-5 py-3 font-bold rounded-xl shadow-lg focus:outline-none transition-all duration-300 ease-in-out text-lg flex items-center justify-center ${
                  isRechartsExpanded 
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600'
                }`}
              >
                {isRechartsExpanded 
                  ? <><FaChevronUp className="mr-2" /> Zwiń RECHARTS</>
                  : <><FaChevronDown className="mr-2" /> Pokaż wykresy RECHARTS</>
                }
              </button>
            </div>
            
            {isRechartsExpanded && (
              <div className="mt-6 bg-white p-5 rounded-xl shadow-inner text-gray-800">
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Wykres liniowy</h3>
                <div className="bg-gray-50 p-3 rounded-lg shadow-inner">
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={chartData} margin={{ top: 15, right: 15, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="name" tick={{ fill: '#4b5563' }} />
                      <YAxis tick={{ fill: '#4b5563' }} />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
                      <Legend wrapperStyle={{ paddingTop: '10px' }} />
                      <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mt-8 mb-3 text-center">Wykres słupkowy</h3>
                <div className="bg-gray-50 p-3 rounded-lg shadow-inner">
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={chartData} margin={{ top: 15, right: 15, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="name" tick={{ fill: '#4b5563' }} />
                      <YAxis tick={{ fill: '#4b5563' }} />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
                      <Legend wrapperStyle={{ paddingTop: '10px' }} />
                      <Bar dataKey="pv" fill="#8884d8" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="uv" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 space-y-3 text-gray-700 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-400 shadow"></span>
                    <span className="ml-3 font-medium">Responsywne wykresy</span>
                  </div>
                  <div className="flex items-center">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-400 shadow"></span>
                    <span className="ml-3 font-medium">Interaktywne tooltips</span>
                  </div>
                  <div className="flex items-center">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-400 shadow"></span>
                    <span className="ml-3 font-medium">Różne typy wykresów</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Element testowy React Icons */}
      <div className="max-w-2xl mx-auto mb-14">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 backdrop-blur-sm">
            <div className="flex items-center">
              <div className="rounded-full bg-white p-3 shadow-inner">
                <FaReact className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-5">
                <h2 className="text-2xl font-bold text-white tracking-wide">React Icons działa!</h2>
                <p className="text-purple-100 font-light">Biblioteka ikon dla React</p>
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                onClick={() => setIsIconsExpanded(!isIconsExpanded)}
                className={`w-full px-5 py-3 font-bold rounded-xl shadow-lg focus:outline-none transition-all duration-300 ease-in-out text-lg flex items-center justify-center ${
                  isIconsExpanded 
                    ? 'bg-purple-500 text-white hover:bg-purple-600'
                    : 'bg-gradient-to-r from-purple-400 to-purple-500 text-white hover:from-purple-500 hover:to-purple-600'
                }`}
              >
                {isIconsExpanded 
                  ? <><FaChevronUp className="mr-2" /> Zwiń REACT ICONS</>
                  : <><FaChevronDown className="mr-2" /> Pokaż ikony REACT ICONS</>
                }
              </button>
            </div>
            
            {isIconsExpanded && (
              <div className="mt-6 bg-white p-5 rounded-xl shadow-inner text-gray-800">
                {iconGroups.map((group, groupIndex) => (
                  <div key={groupIndex} className="mb-8 last:mb-0">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 text-center border-b border-gray-200 pb-2">{group.title}</h3>
                    <div className="grid grid-cols-3 gap-3 sm:gap-5">
                      {group.icons.map((item, iconIndex) => {
                        const { Icon, name, color } = item;
                        return (
                          <div key={iconIndex} className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors transform hover:scale-105 shadow-sm">
                            <Icon className={`h-8 w-8 sm:h-10 sm:w-10 ${color} mb-2 sm:mb-3`} />
                            <span className="text-sm sm:text-base text-gray-700 font-medium text-center">{name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 space-y-3 text-gray-700 p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-400 shadow"></span>
                    <span className="ml-3 font-medium">Różne zestawy ikon</span>
                  </div>
                  <div className="flex items-center">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-400 shadow"></span>
                    <span className="ml-3 font-medium">Dostosowanie stylu</span>
                  </div>
                  <div className="flex items-center">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-400 shadow"></span>
                    <span className="ml-3 font-medium">Tree-shaking (tylko używane ikony)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="max-w-2xl mx-auto">
        <p className="text-center text-lg text-gray-300 mt-10 font-light">
          Kliknij na loga Vite i React, aby dowiedzieć się więcej
        </p>
        
        {/* Copyright */}
        <p className="text-center text-sm text-gray-500 mt-4">
          © {new Date().getFullYear()} Przykładowa Aplikacja React
        </p>
      </div>
    </div>
  )
}

export default App
