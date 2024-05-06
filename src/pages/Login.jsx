import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div className="login py-3">
      <div className="container">
        <header className="head d-flex gap-3 align-items-center justify-content-between">
          <img src="/images/login-logo.svg" alt="logo" loading="lazy" />
          <div className="buttons">
            {/* <Link
              className="btn btn-outline-light text-dark rounded-pill me-2 py-md-2 px-md-4"
              to="/signup"
            >
              Join now
            </Link> */}
            <Link
              className="btn btn-primary rounded-pill py-md-2 px-md-4"
              to="/signin"
            >
              Sign in
            </Link>
          </div>
        </header>
        <section className="d-flex gap-4 justify-content-between align-items-center mt-4">
          <div className="content">
            <h1>Welcome to your professional community</h1>
            <LoginForm />
          </div>
          <img src="/images/login-hero.svg" className="img-fluid" alt="login" />
        </section>
      </div>
    </div>
  );
}

export default Login;
