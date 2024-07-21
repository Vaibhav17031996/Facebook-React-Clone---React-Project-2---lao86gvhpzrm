import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const navigate = useNavigate();
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
      }
    } catch (error) {
      console.error("Error logging in: ", error);
    }
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
          <button className="loginBtn" onClick={handleLogin}>
            Log in
          </button>
        </div>
        <div className="forgotPassword">
          <a href="forgotPassword">Forgot password?</a>
          <br />
          <button className="newAccountBtn" onClick={() => navigate("/signup")}>
            Create a new account
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;
