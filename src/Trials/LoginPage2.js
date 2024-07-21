import React from "react";
import "../styles/LoginPage.css";

function LoginPage() {
  return (
    <div className="Login">
      <div className="facebook">
        <div className="facebookText">facebook</div>
        <div className="title">
          Facebook helps you connect and share <br /> with the people in your
          life.
        </div>
      </div>
      <div className="LoginContainer">
        <div className="LoginDetails">
          <input type="email" placeholder="Email or phone number" />
          <br />
          <input type="password" placeholder="password" />
          <br />
          <button className="loginBtn">Log in</button>
        </div>
        <div className="forgotPassword">
          <a href="forgotPassword">Forgot password?</a>
          <br />
          <button className="newAccountBtn">Create a new account</button>
        </div>
        <br />
        <div className="createPage">
          <a href="createPage">
            <b>Create a page</b>
          </a>{" "}
          for a celebrity, brand or business .
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
