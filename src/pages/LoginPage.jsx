import React from "react";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <section className="d-flex gap-4 justify-content-between align-items-center mt-4">
      <div
        className="content my-3 mx-auto text-primary p-2"
        style={{ width: "450px", maxWidth: "100%" }}
      >
        <h1 className="mb-4 text-center">Login with your account</h1>
        <LoginForm />
      </div>
      {/* <img src="/images/login-hero.svg" className="img-fluid" alt="login" /> */}
    </section>
  );
}

export default LoginPage;
