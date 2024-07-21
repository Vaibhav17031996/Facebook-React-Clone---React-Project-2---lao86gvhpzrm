import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjRjN2U5ZWJmY2ZiM2YyYmYwMTQ0NCIsImlhdCI6MTcxMzY4NjUwNSwiZXhwIjoxNzQ1MjIyNTA1fQ.IO2-UKaz1CASUB62DSwh2_uoIVRgBp7HINE_cr63siE";
const projectId = "f104bi07c490";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    console.log(typeof user === "object");
    if (typeof user === "object") {
      setUser(user);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const loginDetails = JSON.stringify({
        email,
        password,
        appType: "facebook",
      });
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectID: projectId,
          },
          body: loginDetails,
        }
      );
      console.log(loginDetails);
      const userData = await response.json();
      if (userData.token) {
        setUser(userData.data.user);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(userData.data.user));
        navigate("/homepage");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      // console.log(error);
      alert("Error occured during login");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const signup = async (name, email, password) => {
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectID: projectId,
          },
          body: JSON.stringify({
            name,
            email,
            password,
            appType: "facebook",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Signup response failed");
      }

      const userData = await response.json();
      if (userData.token) {
        setUser(userData.data.user);
        localStorage.setItem("token", userData.token);
        navigate("/");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      alert("Error occured during signup");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
