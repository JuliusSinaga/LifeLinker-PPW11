import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="main-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-life">Life</span>
          <span className="logo-linker">Linker</span>
        </Link>
        <nav className="nav-menu">
          <Link to="/beranda" className="nav-link">
            Beranda
          </Link>
          <Link to="/lokasi-donor" className="nav-link">
            Lokasi Donor
          </Link>
          <Link to="/stok-darah" className="nav-link">
            Stok Darah
          </Link>
          <Link to="/event" className="nav-link">
            Event
          </Link>
          <Link to="/riwayat" className="nav-link">
            Riwayat
          </Link>
          <Link to="/konsultasi" className="nav-link">
            Konsultasi
          </Link>
        </nav>
        <div className="header-actions">
          <Link to="/login-pengguna" className="btn-login">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
