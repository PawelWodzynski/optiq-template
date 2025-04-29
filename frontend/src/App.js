import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPageComponents/LoginPage";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
