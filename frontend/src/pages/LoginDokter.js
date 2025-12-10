import React, { useState } from "react";
import "./LoginShared.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const LoginDokter = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("dokter");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simpan data login ke localStorage (simulasi - nanti dihubungkan ke backend)
    localStorage.setItem("token", "dokter-token-" + Date.now());
    localStorage.setItem("role", "dokter");
    localStorage.setItem("userName", formData.email.split("@")[0]);
    localStorage.setItem("email", formData.email);
    
    // Redirect ke dashboard dokter
    navigate("/dashboard");
  };return (
<> <div className="login-container"> <div className="login-card">
  
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
          onClick={() => {
            setRole("pengguna");
            navigate("/login-pengguna");
          }}
        >
          Pengguna
        </button>

        <button
          className={role === "dokter" ? "role-btn active" : "role-btn"}
          onClick={() => setRole("dokter")}
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
          name="email"
          placeholder="Alamat Email"
          className="form-input"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-input"
          value={formData.password}
          onChange={handleChange}
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
        Belum punya akun? <a href="/daftar-dokter">Daftar Sekarang</a>
      </p>
    </div>
  </div>

  <Footer />
</>

);
};

export default LoginDokter;
