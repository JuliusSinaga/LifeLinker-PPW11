import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./LoginUser.css";

function LoginUser() {
  const [role, setRole] = useState("Pengguna");

  return (
    <div className="login-container">
      <header className="login-header">
        <h1 className="logo">
          <span className="logo-heart">❤️</span>
          <span className="logo-text">Life</span>
          <span className="logo-linker">Linker</span>
        </h1>
      </header>

      <div className="login-card">
        <h2 className="welcome-title"><strong>Selamat Datang</strong></h2>

        <div className="role-switch">
          {["Pengguna", "Dokter", "Admin"].map((r) => (
            <button
              key={r}
              className={`role-btn ${role === r ? "active" : ""}`}
              onClick={() => setRole(r)}
            >
              {r}
            </button>
          ))}
        </div>

        <form className="login-form">
          <input type="email" placeholder="Alamat Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="btn-login">Masuk</button>
        </form>

        <div className="divider">ATAU</div>

        <button className="btn-google">Masuk dengan Google</button>

        <p className="register-text">
          Belum punya akun?{" "}
          <Link to="/daftar-pengguna" className="register-link">
            Daftar Sekarang
          </Link>
        </p>
      </div>

      <footer className="footer">
        <div className="footer-section">
          <h3 className="footer-logo">
            <span className="logo-text">Life</span>
            <span className="logo-linker">Linker</span>
          </h3>
          <p>Dibuat Oleh Kelompok 11 PPW @2025</p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Navigasi</h4>
          <nav className="footer-nav">
            <Link to="/home">Beranda</Link> | 
            <Link to="/lokasi-donor"> Lokasi Donor</Link> | 
            <Link to="/stok-darah"> Stok Darah</Link> | 
            <Link to="/event"> Event</Link> | 
            <Link to="/riwayat"> Riwayat</Link> | 
            <Link to="/konsultasi"> Konsultasi</Link>
          </nav>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Ikuti Kami</h4>
          <div className="social-icons">
            <i className="fab fa-instagram"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LoginUser;
