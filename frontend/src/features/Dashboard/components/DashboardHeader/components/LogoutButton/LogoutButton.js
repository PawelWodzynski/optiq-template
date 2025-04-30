export const useLogoutButtonLogic = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    // Redirect to login page. Using window.location for simplicity,
    // consider using react-router-dom's useNavigate hook in a real app.
    window.location.href = "/"; 
  };

  return {
    handleLogout,
  };
};

