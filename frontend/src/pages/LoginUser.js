import React, { useState } from "react";
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
          <a href="#" className="register-link">
            Daftar Sekarang
          </a>
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
            <a href="#">Beranda</a> | 
            <a href="#"> Lokasi Donor</a> | 
            <a href="#"> Stok Darah</a> | 
            <a href="#"> Event</a> | 
            <a href="#"> Riwayat</a> | 
            <a href="#"> Konsultasi</a>
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
