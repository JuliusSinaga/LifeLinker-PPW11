import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaUserCircle, FaBars, FaTimes } from "react-icons/fa"; // Tambah Icon
import "./Header.css";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State untuk mobile menu

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
    return () => window.removeEventListener("user-login", checkLoginStatus);
  }, []);

  const handleLogoutClick = () => {
    setShowDropdown(false);
    setIsMobileMenuOpen(false);
    setShowLogoutModal(true);
  };

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

  const getInitials = (name) => name ? name.charAt(0).toUpperCase() : "U";

  return (
    <>
      <header className="app-header">
        <nav className="app-nav">
          {/* LOGO */}
          <Link to="/" className="app-logo">
            <img
              src={process.env.PUBLIC_URL + "/images/lifelinker-logo.png"}
              alt="LifeLinker"
              className="app-logo-image"
            />
            <span className="app-logo-text">LifeLinker</span>
          </Link>

          {/* MOBILE MENU TOGGLE */}
          <div className="mobile-menu-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>

          {/* NAVIGATION LINKS */}
          <div className={`nav-menu-wrapper ${isMobileMenuOpen ? "active" : ""}`}>
            <ul className="app-nav-links">
              <li><Link to="/" className={`app-nav-link ${isActive("/") ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>Beranda</Link></li>
              <li><Link to="/lokasi-donor" className={`app-nav-link ${isActive("/lokasi-donor") ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>Lokasi Donor</Link></li>
              <li><Link to="/stok-darah" className={`app-nav-link ${isActive("/stok-darah") ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>Stok Darah</Link></li>
              <li><Link to="/event" className={`app-nav-link ${isActive("/event") ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>Event</Link></li>
              
              {(user?.role === 'user' || !user) && (
                <>
                  <li><Link to="/riwayat" className={`app-nav-link ${isActive("/riwayat") ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>Riwayat</Link></li>
                  <li><Link to="/konsultasi" className={`app-nav-link ${isActive("/konsultasi") ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>Konsultasi</Link></li>
                </>
              )}
            </ul>

            {/* ACTION BUTTONS (Login/User) */}
            <div className="app-nav-actions">
              {isLoggedIn && user ? (
                <div className="app-user-info">
                  <span className="user-name">Halo, {user.nama || user.name}</span>
                  
                  <div className="app-user-avatar" onClick={() => setShowDropdown(!showDropdown)}>
                    {getInitials(user.nama || user.name)}
                  </div>

                  {showDropdown && (
                    <div className="user-dropdown">
                        <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>Profil Saya</Link>
                        {user.role === 'admin' && <Link to="/dashboard-admin" className="dropdown-item" onClick={() => setShowDropdown(false)}>Dashboard Admin</Link>}
                        {user.role === 'dokter' && <Link to="/dashboard-dokter" className="dropdown-item" onClick={() => setShowDropdown(false)}>Dashboard Dokter</Link>}
                        <div onClick={handleLogoutClick} className="dropdown-item logout">Keluar</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="auth-buttons">
                  <Link to="/pilih-role" className="app-btn-login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                  <Link to="/pilih-role" className="app-btn-register" onClick={() => setIsMobileMenuOpen(false)}>Daftar</Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* ===================== LOGOUT MODAL (Sesuai Gambar) ===================== */}
      {showLogoutModal && (
        <div className="header-modal-overlay">
          <div className="header-modal">
            <div className="modal-icon-warning">
              <FaExclamationTriangle />
            </div>
            <h3>Konfirmasi Logout</h3>
            <p>Apakah Anda yakin ingin keluar dari akun ini?</p>

            <div className="header-modal-actions">
              <button className="btn-header-cancel" onClick={() => setShowLogoutModal(false)}>
                Batal
              </button>
              <button className="btn-header-confirm" onClick={confirmLogout}>
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}