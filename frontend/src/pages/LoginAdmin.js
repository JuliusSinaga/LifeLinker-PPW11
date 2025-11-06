import React from "react";
import "./LoginAdmin.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const LoginAdmin = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // proses login admin di sini
    navigate("/dashboard-admin");
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          {/* Logo */}
          <h2 className="logo-text">
            <span className="logo-icon">❤️</span> Life
            <span className="logo-bold">Linker</span>
          </h2>

          {/* Judul */}
          <h3 className="welcome-title">Login Admin</h3>
          <p className="subtitle">Masukkan email dan password untuk masuk</p>

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
