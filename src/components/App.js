import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ProfilePage from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import "../styles/App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  return (
    <Router>
      <AuthProvider>
        <div className={darkMode ? "App dark-mode" : "App"}>
          <Routes>
            <Route
              path="/profile"
              element={
                <ProfilePage
                  toggleDarkMode={toggleDarkMode}
                  darkMode={darkMode}
                />
              }
            />
            <Route
              path="/homepage"
              element={
                <HomePage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
              }
            />
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
