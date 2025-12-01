import React, { useState } from "react";
import "./LoginShared.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const LoginPengguna = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("pengguna");

  const handleLogin = (e) => {
    e.preventDefault();
    // nanti dihubungkan ke backend
    navigate("/home");
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          {/* Logo */}
          <div className="logo-wrapper">
            <img
              src={process.env.PUBLIC_URL + "/images/lifelinker-logo.png"}
              alt="LifeLinker Logo"
              className="logo-image"
            />
            <h2 className="logo-text">
              <span className="logo-life">Life</span>
              <span className="logo-bold">Linker</span>
            </h2>
          </div>

          {/* Judul */}
          <h3 className="welcome-title">Selamat Datang</h3>

          {/* Pilihan Role */}
          <div className="role-buttons">
            <button
              className={role === "pengguna" ? "role-btn active" : "role-btn"}
              onClick={() => setRole("pengguna")}
            >
              Pengguna
            </button>
            <button
              className={role === "dokter" ? "role-btn active" : "role-btn"}
              onClick={() => {
                setRole("dokter");
                navigate("/login-dokter");
              }}
            >
              Dokter
            </button>
            <button
              className={role === "admin" ? "role-btn active" : "role-btn"}
              onClick={() => {
                setRole("admin");
                navigate("/login-admin");
              }}
            >
              Admin
            </button>
          </div>

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

          <div className="divider"><span>ATAU</span></div>

          {/* Login dengan Google */}
          <button className="google-btn">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
              alt="Google"
            />
            Masuk dengan Google
          </button>

          {/* Link daftar */}
          <p className="register-text">
            Belum punya akun? <a href="/daftar">Daftar Sekarang</a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LoginPengguna;
