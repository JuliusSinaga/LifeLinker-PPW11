import React, { useState } from "react";
import "./LoginShared.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const LoginAdmin = () => {
  const navigate = useNavigate();
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
    localStorage.setItem("token", "admin-token-" + Date.now());
    localStorage.setItem("role", "admin");
    localStorage.setItem("userName", "Admin");
    localStorage.setItem("email", formData.email);
    
    // Redirect ke dashboard admin
    navigate("/dashboard-admin");
  };return (
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
    </div>
  </div>

  <Footer />
</>

);
};

export default LoginAdmin;
