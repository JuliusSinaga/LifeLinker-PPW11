import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header({ showUserProfile }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State untuk menyimpan data user
  const [user, setUser] = useState(null);

  // Cek login saat komponen dimuat
  useEffect(() => {
    // Ambil data user dari localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Gagal parse user data", e);
      }
    }

    // Event listener untuk update otomatis jika login/logout terjadi di tab lain/komponen lain
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    // Custom event agar update instan dalam satu tab
    window.addEventListener("user-login", handleStorageChange); 

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("user-login", handleStorageChange);
    };
  }, []);

  const isActive = (path) => {
    if (path === "/" || path === "/beranda") {
      return location.pathname === "/" || location.pathname === "/beranda";
    }
    return location.pathname.startsWith(path);
  };

  // Prioritaskan props 'showUserProfile' jika diberikan (untuk override), 
  // jika tidak cek state 'user' dari localStorage
  const isLoggedIn = showUserProfile || user !== null;

  // Nama user default jika data di localStorage tidak lengkap
  const userName = user?.name || user?.fullName || "Pengguna";

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
          {isLoggedIn ? (
            <div className="app-user-info">
              <span>{userName}</span>
              <Link to="/profile" className="app-user-avatar">
                <img
                  src={process.env.PUBLIC_URL + "/images/budi-avatar.png"}
                  alt="User"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src="https://via.placeholder.com/40";
                  }}
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