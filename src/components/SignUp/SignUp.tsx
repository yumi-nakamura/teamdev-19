import React from "react";
import "./SignUp.css";

const SignUp: React.FC = () => {
  return (
    <div className="signup-wrapper">
      <header className="signup-header">
        <nav className="signup-nav">
          <button className="btn login-btn">Login</button>
          <button className="btn signup-btn">Sign Up</button>
        </nav>
      </header>

      <main className="signup-main">
        <div className="signup-form-box">
          <h1 className="signup-title">Sign Up</h1>

          <form className="signup-form">
            <label className="signup-label">
              Name
              <input
                type="text"
                placeholder="Enter your name"
                className="signup-input"
              />
            </label>

            <label className="signup-label">
              Email
              <input
                type="email"
                placeholder="Enter your email"
                className="signup-input"
              />
            </label>

            <label className="signup-label">
              Password
              <input
                type="password"
                placeholder="Enter your password"
                className="signup-input"
              />
            </label>

            <button type="submit" className="btn submit-btn">
              Sign Up
            </button>
          </form>

          <p className="signup-footer-text">
            Already have an account ?{" "}
            <a href="/login" className="signup-login-link">
              Login
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
