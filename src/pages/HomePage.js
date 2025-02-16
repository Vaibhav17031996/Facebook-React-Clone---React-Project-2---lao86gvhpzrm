import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SidebarRight from "../components/SidebarRight";
import Feed from "../components/Feed";
import "../styles/HomePage.css";
import { useAuth } from "../context/AuthContext";

function HomePage({ toggleDarkMode, darkMode }) {
  const { user } = useAuth();
  console.log(user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      {user && (
        <div className="home ">
          <Navbar
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
            token={token}
          />
          <div className="home-body">
            <Sidebar
              toggleDarkMode={toggleDarkMode}
              darkMode={darkMode}
              token={token}
            />
            <Feed
              toggleDarkMode={toggleDarkMode}
              darkMode={darkMode}
              token={token}
            />
            <SidebarRight
              toggleDarkMode={toggleDarkMode}
              darkMode={darkMode}
              token={token}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
