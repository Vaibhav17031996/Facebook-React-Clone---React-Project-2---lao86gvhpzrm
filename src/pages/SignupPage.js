import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/SignupPage.css";

function SignupPage() {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
    } catch (error) {
      console.error("Failed to create an account", error);
    }
  };

  return (
    <div className="container">
      <h4 className="title">Sign Up</h4>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-field"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-field"
        />
        <button type="submit" className="button">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
