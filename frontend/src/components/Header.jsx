import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // State untuk Modal Logout
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener("user-login", checkLoginStatus);
    return () => {
      window.removeEventListener("user-login", checkLoginStatus);
    };
  }, []);

  // 1. Buka Modal Logout
  const handleLogoutClick = () => {
    setShowDropdown(false);
    setShowLogoutModal(true);
  };

  // 2. Eksekusi Logout
  const confirmLogout = () => {
    setShowLogoutModal(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    setIsLoggedIn(false);
    setUser(null);

    navigate("/");
  };

  const isActive = (path) => {
    if (path === "/" || path === "/beranda") {
      return location.pathname === "/" || location.pathname === "/beranda";
    }
    return location.pathname.startsWith(path);
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <>
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
            <li><Link to="/" className={`app-nav-link ${isActive("/") ? "active" : ""}`}>Beranda</Link></li>
            <li><Link to="/lokasi-donor" className={`app-nav-link ${isActive("/lokasi-donor") ? "active" : ""}`}>Lokasi Donor</Link></li>
            <li><Link to="/stok-darah" className={`app-nav-link ${isActive("/stok-darah") ? "active" : ""}`}>Stok Darah</Link></li>
            <li><Link to="/event" className={`app-nav-link ${isActive("/event") ? "active" : ""}`}>Event</Link></li>
            {(user?.role === 'user' || !user) && (
              <>
                <li><Link to="/riwayat" className={`app-nav-link ${isActive("/riwayat") ? "active" : ""}`}>Riwayat</Link></li>
                <li><Link to="/konsultasi" className={`app-nav-link ${isActive("/konsultasi") ? "active" : ""}`}>Konsultasi</Link></li>
              </>
            )}
          </ul>

          <div className="app-nav-actions">
            {isLoggedIn && user ? (
              <div className="app-user-info">
                <span className="user-name">Halo, {user.nama || user.name}</span>
                
                {/* Avatar */}
                <div 
                  className="app-user-avatar" 
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {getInitials(user.nama || user.name)}
                </div>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="user-dropdown">
                      <Link to="/profile" className="dropdown-item">Profil Saya</Link>
                      
                      {user.role === 'admin' && (
                          <Link to="/dashboard-admin" className="dropdown-item">Dashboard Admin</Link>
                      )}
                      
                      {user.role === 'dokter' && (
                          <Link to="/dashboard-dokter" className="dropdown-item">Dashboard Dokter</Link>
                      )}
                      
                      <div onClick={handleLogoutClick} className="dropdown-item logout">
                          Keluar
                      </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/pilih-role" className="app-btn-login">Login</Link>
                <Link to="/pilih-role" className="app-btn-register">Daftar</Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* ===================== LOGOUT MODAL ===================== */}
      {showLogoutModal && (
        <div className="header-modal-overlay">
          <div className="header-modal">
            <h3>Konfirmasi Logout</h3>
            <p>Apakah Anda yakin ingin logout?</p>

            <div className="header-modal-actions">
              <button className="btn-header-cancel" onClick={() => setShowLogoutModal(false)}>
                Batal
              </button>

              <button className="btn-header-confirm" onClick={confirmLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}