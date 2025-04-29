import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>
      <main className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome to Auth React JWT</h2>
          <p>You have successfully logged in using JWT authentication.</p>
          <p>This is a protected route that can only be accessed by authenticated users.</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
