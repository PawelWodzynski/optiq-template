# React Vite Project Structure

## Uruchomienie projektu z Docker

Projekt jest skonfigurowany do łatwego uruchomienia za pomocą Docker:

1. Upewnij się, że masz zainstalowany Docker i docker-compose
2. Uruchom komendę w katalogu głównym projektu:
   ```
   docker-compose up -d
   ```
3. Aplikacja będzie dostępna pod adresem: http://localhost

## Używane biblioteki

W projekcie używamy następujących bibliotek i technologii:

### Główne biblioteki
- **React** `react@19.1.0` - biblioteka interfejsu użytkownika
- **React DOM** `react-dom@19.1.0` - renderowanie React w przeglądarce
- **Vite** `vite@6.3.3` - narzędzie do budowania aplikacji front-endowych
- **React Recharts** `recharts@2.15.3` - biblioteka do tworzenia wykresów
- **React Icons** `react-icons@5.5.0` - biblioteka ikon dla React
- **React i18next** `react-i18next@15.5.1` - internacjonalizacja aplikacji
- **Axios** `axios@1.9.0` - klient HTTP do komunikacji z API

### Narzędzia stylowania
- **Tailwind CSS** `tailwindcss@4.1.4` - framework CSS utility-first
- **PostCSS** `postcss@8.5.3` - narzędzie do przetwarzania CSS
- **Autoprefixer** `autoprefixer@10.4.21` - automatyczne dodawanie prefiksów dostawców
- **@tailwindcss/postcss** `@tailwindcss/postcss@4.1.4` - integracja Tailwind z PostCSS

### Narzędzia programistyczne
- **TypeScript** `@types/react@19.1.2`, `@types/react-dom@19.1.2` - typowanie dla React
- **ESLint** `eslint@9.25.1` - linter dla JavaScript/TypeScript
- **ESLint React Hooks** `eslint-plugin-react-hooks@5.2.0` - reguły ESLint dla React Hooks
- **ESLint React Refresh** `eslint-plugin-react-refresh@0.4.20` - wsparcie dla React Fast Refresh
- **@eslint/js** `@eslint/js@9.25.1` - konfiguracja ESLint dla JavaScript
- **Globals** `globals@16.0.0` - definicje globalnych zmiennych dla ESLint
- **@vitejs/plugin-react** `@vitejs/plugin-react@4.4.1` - plugin Vite dla React

Wszystkie biblioteki powinny być używane zgodnie z dokumentacją. Nie należy instalować alternatywnych bibliotek o podobnej funkcjonalności bez konsultacji z zespołem.

## Struktura projektu

```
.
├── docker-compose.yml         # Konfiguracja Docker
├── Dockerfile                 # Definicja obrazu Docker
├── react-app/                 # Główny katalog aplikacji
│   ├── public/                # Pliki statyczne
│   ├── src/                   # Kod źródłowy
│   │   ├── assets/            # Zasoby (obrazy, fonty, itp.)
│   │   ├── components/        # Komponenty wielokrotnego użytku
│   │   │   ├── common/        # Wspólne, podstawowe komponenty
│   │   │   │   ├── Button/
│   │   │   │   ├── Card/
│   │   │   │   ├── Modal/
│   │   │   │   └── ...
│   │   │   ├── layout/        # Komponenty układu strony
│   │   │   │   ├── Header/
│   │   │   │   ├── Footer/
│   │   │   │   ├── Sidebar/
│   │   │   │   └── ...
│   │   │   └── features/      # Komponenty funkcjonalne, zgrupowane według funkcji
│   │   │       ├── Dashboard/
│   │   │       ├── Auth/
│   │   │       ├── UserProfile/
│   │   │       └── ...
│   │   ├── hooks/             # Własne hooki React
│   │   ├── pages/             # Komponenty stron (widoki)
│   │   ├── services/          # Usługi, np. API, autentykacja
│   │   ├── utils/             # Funkcje pomocnicze
│   │   ├── data/              # Dane mockujące
│   │   ├── styles/            # Globalne style
│   │   ├── App.jsx            # Główny komponent z routingiem
│   │   ├── main.jsx           # Punkt wejściowy aplikacji
│   │   └── ...
│   ├── package.json           # Definicja projektu i zależności
│   └── ...
└── ...
```

## Architektura "matrioszki"

W naszym projekcie używamy architektury komponentów opartej na modelu "matrioszki" - komponentów zagnieżdżonych w komponentach. Większe komponenty używają mniejszych, bardziej wyspecjalizowanych komponentów:

### Przykład struktury komponentów:

```
features/
├── Dashboard/
│   ├── Dashboard.jsx                   # Główny komponent Dashboard
│   ├── components/                     # Wewnętrzne komponenty używane tylko przez Dashboard
│   │   ├── DashboardChart/             # Pod-komponent wykresu
│   │   │   ├── DashboardChart.jsx      
│   │   │   ├── DashboardChartLegend.jsx
│   │   │   └── DashboardChartMockData.js
│   │   ├── DashboardKPI/               # Pod-komponent Key Performance Indicators
│   │   │   ├── DashboardKPI.jsx
│   │   │   ├── DashboardKPICard.jsx
│   │   │   └── DashboardKPIMockData.js
│   │   ├── DashboardTable/             # Pod-komponent tabeli
│   │   │   ├── DashboardTable.jsx      
│   │   │   ├── DashboardTableRow.jsx
│   │   │   ├── DashboardTableHeader.jsx
│   │   │   └── DashboardTableMockData.js
│   │   └── DashboardActivity/          # Pod-komponent aktywności użytkownika
│   │       ├── DashboardActivity.jsx
│   │       ├── DashboardActivityItem.jsx
│   │       └── DashboardActivityMockData.js
│   ├── Dashboard.test.jsx              # Testy dla komponentu
│   └── index.js                        # Plik eksportujący
│
├── Analytics/
│   ├── Analytics.jsx
│   ├── components/
│   │   ├── AnalyticsComparisonChart/
│   │   │   ├── AnalyticsComparisonChart.jsx
│   │   │   └── AnalyticsComparisonChartMockData.js
│   │   ├── AnalyticsTrend/
│   │   │   ├── AnalyticsTrend.jsx
│   │   │   └── AnalyticsTrendMockData.js
│   │   └── ...
│   └── ...
│
├── UserManagement/
│   ├── UserManagement.jsx
│   ├── components/
│   │   ├── UserList/
│   │   │   ├── UserList.jsx
│   │   │   ├── UserListRow.jsx
│   │   │   ├── UserListFilter.jsx
│   │   │   └── UserListMockData.js
│   │   ├── UserDetail/
│   │   │   ├── UserDetail.jsx
│   │   │   ├── UserDetailHeader.jsx
│   │   │   ├── UserDetailForm.jsx
│   │   │   └── UserDetailMockData.js
│   │   └── ...
│   └── ...
│
├── TaskBoard/
│   ├── TaskBoard.jsx
│   ├── components/
│   │   ├── TaskColumn/
│   │   │   ├── TaskColumn.jsx
│   │   │   └── TaskColumnHeader.jsx
│   │   ├── TaskCard/
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskCardBadge.jsx
│   │   │   └── TaskCardFooter.jsx
│   │   ├── TaskFilter/
│   │   │   ├── TaskFilter.jsx
│   │   │   └── TaskFilterItem.jsx
│   │   └── TaskBoardMockData.js
│   └── ...
│
└── ... inne funkcjonalności
```

## Routing

W pliku `App.jsx` znajduje się główna konfiguracja routingu, która łączy strony i komponenty funkcjonalne:

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import UserManagement from './pages/UserManagement';
import TaskBoard from './pages/TaskBoard';
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="tasks" element={<TaskBoard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
```

## Konwencje nazewnictwa

- **Komponenty:** PascalCase (np. `UserDetailForm.jsx`)
- **Funkcje, zmienne:** camelCase (np. `getUserData`, `isLoading`)
- **Pliki MockData:** PascalCase z przyrostkiem "MockData" (np. `UserListMockData.js`)
- **Pliki eksportujące:** `index.js`
- **Testy:** przyrostek `.test.jsx` lub `.spec.jsx`

## Zalecane praktyki

- Zachowaj zasadę pojedynczej odpowiedzialności (SRP) dla każdego komponentu
- Twórz małe, wielokrotnego użytku komponenty
- Używaj prop-types lub TypeScript do typowania props
- Utrzymuj zgodny styl kodu z pomocą ESLint i Prettier
- Grupuj komponenty według funkcjonalności, a nie według typu
- Używaj lazy loading dla dużych modułów
