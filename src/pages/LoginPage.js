import React, { useState } from "react";
import "../styles/LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const projectId = "f104bi07c490";

  /* const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectID: projectId,
          },
          body: JSON.stringify({
            email,
            password,
            appType: "facebook",
          }),
        }
      );
      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        alert("Login failed!");
        console.log("failed");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  }; */

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Invalid Email or Password");
      return;
    }
    login(email, password);
  };

  return (
    <div className="login-wrapper">
      <div className="facebook">
        <div className="facebookText">facebook</div>
        <div className="title">
          Facebook helps you connect and share <br /> with the people in your
          life.
        </div>
      </div>
      <div className="loginContainer">
        <div className="loginDetails">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button className="loginBtn" type="submit">
              Log in
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
        <div className="forgotPassword">
          <a href="forgotPassword">Forgot password?</a>
          <button className="newAccountBtn" onClick={() => navigate("/signup")}>
            Create a new account
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;
