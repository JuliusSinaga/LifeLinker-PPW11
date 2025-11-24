import React, { useState } from "react";
import "./LoginShared.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const LoginAdmin = () => {
const navigate = useNavigate();

const handleLogin = (e) => {
e.preventDefault();
// proses login nanti  dihubungkan ke backend
navigate("/home-admin");
};

return (
<> <div className="login-container"> <div className="login-card">

      {/* Logo */}
      <div className="logo-wrapper">
        <h2 className="logo-text">
          <span className="logo-life">Life</span>
          <span className="logo-bold">Linker</span>
        </h2>
      </div>

      {/* Judul */}
      <h3 className="welcome-title">Login Admin</h3>

      {/* Form Login */}
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Alamat Email"
          className="form-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="form-input"
          required
        />
        <button type="submit" className="btn-login">
          Masuk
        </button>
      </form>
    </div>
  </div>

  <Footer />
</>

);
};

export default LoginAdmin;
