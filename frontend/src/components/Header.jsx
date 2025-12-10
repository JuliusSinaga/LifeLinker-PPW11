import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // State untuk Modal Logout (Sama seperti SidebarAdmin)
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

  // 1. Fungsi saat tombol "Keluar" di dropdown diklik (Hanya buka modal)
  const handleLogoutClick = () => {
    setShowDropdown(false); // Tutup dropdown dulu
    setShowLogoutModal(true); // Buka modal konfirmasi
  };

  // 2. Fungsi Eksekusi Logout (Dipanggil tombol "Logout" di dalam modal)
  const confirmLogout = () => {
    setShowLogoutModal(false); // Tutup modal
    
    // Hapus data sesi
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Update state header
    setIsLoggedIn(false);
    setUser(null);

    // Redirect
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
              <div className="app-user-info" style={{ position: 'relative' }}>
                <span className="user-name">Halo, {user.nama || user.name}</span>
                
                <div 
                  className="app-user-avatar" 
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{ cursor: 'pointer', backgroundColor: '#ef4444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}
                >
                  {getInitials(user.nama || user.name)}
                </div>

                {showDropdown && (
                  <div className="user-dropdown" style={{
                      position: 'absolute', top: '50px', right: '0', backgroundColor: 'white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)', borderRadius: '8px', padding: '10px', minWidth: '150px', zIndex: 100
                  }}>
                      <Link to="/profile" className="dropdown-item" style={{display:'block', padding:'8px 12px', color:'#333', textDecoration:'none'}}>Profil Saya</Link>
                      {user.role === 'admin' && (
                          <Link to="/dashboard-admin" className="dropdown-item" style={{display:'block', padding:'8px 12px', color:'#333', textDecoration:'none'}}>Dashboard Admin</Link>
                      )}
                      {user.role === 'dokter' && (
                          <Link to="/dashboard-dokter" className="dropdown-item" style={{display:'block', padding:'8px 12px', color:'#333', textDecoration:'none'}}>Dashboard Dokter</Link>
                      )}
                      <div 
                          onClick={handleLogoutClick} // Panggil fungsi pembuka modal
                          className="dropdown-item" 
                          style={{display:'block', padding:'8px 12px', color:'#dc2626', cursor:'pointer', borderTop:'1px solid #eee', marginTop:'5px'}}
                      >
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
      {/* Persis seperti di SidebarAdmin */}
      {showLogoutModal && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <h3>Konfirmasi Logout</h3>
            <p>Apakah Anda yakin ingin logout?</p>

            <div className="logout-actions">
              <button
                className="cancel-logout"
                onClick={() => setShowLogoutModal(false)}
              >
                Batal
              </button>

              <button className="confirm-logout" onClick={confirmLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}