import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header({ showUserProfile = false }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/" || path === "/beranda") {
      return location.pathname === "/" || location.pathname === "/beranda";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="app-header">
      <nav className="app-nav">
        <Link to="/" className="app-logo">
          <img
            src={process.env.PUBLIC_URL + "/images/lifelinker-logo.png"}
            alt="LifeLinker Logo"
            className="app-logo-image"
          />
          <span className="app-logo-text">LifeLinker</span>
        </Link>

        <ul className="app-nav-links">
          <li>
            <Link
              to="/"
              className={`app-nav-link ${isActive("/") ? "active" : ""}`}
            >
              Beranda
            </Link>
          </li>
          <li>
            <Link
              to="/lokasi-donor"
              className={`app-nav-link ${
                isActive("/lokasi-donor") ? "active" : ""
              }`}
            >
              Lokasi Donor
            </Link>
          </li>
          <li>
            <Link
              to="/stok-darah"
              className={`app-nav-link ${
                isActive("/stok-darah") ? "active" : ""
              }`}
            >
              Stok Darah
            </Link>
          </li>
          <li>
            <Link
              to="/event"
              className={`app-nav-link ${isActive("/event") ? "active" : ""}`}
            >
              Event
            </Link>
          </li>
          <li>
            <Link
              to="/riwayat"
              className={`app-nav-link ${isActive("/riwayat") ? "active" : ""}`}
            >
              Riwayat
            </Link>
          </li>
          <li>
            <Link
              to="/konsultasi"
              className={`app-nav-link ${
                isActive("/konsultasi") ? "active" : ""
              }`}
            >
              Konsultasi
            </Link>
          </li>
        </ul>

        <div className="app-nav-actions">
          {showUserProfile ? (
            <div className="app-user-info">
              <span>Budi Setiawan</span>
              <Link to="/profile" className="app-user-avatar">
                <img
                  src={process.env.PUBLIC_URL + "/images/budi-avatar.png"}
                  alt="User"
                />
              </Link>
            </div>
          ) : (
            <>
              <Link to="/pilih-role" className="app-btn-login">
                Login
              </Link>
              <Link to="/pilih-role" className="app-btn-register">
                Daftar
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
