import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

function Logout() {
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
