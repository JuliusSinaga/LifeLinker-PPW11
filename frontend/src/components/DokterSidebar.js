import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SidebarDokter.css";

export default function DokterSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const active = (path) =>
    location.pathname === path ? "menu-item active" : "menu-item";

  const handleLogout = () => {
    setShowLogoutModal(false);
    // contoh logout (hapus token dll)
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <aside className="dokter-sidebar">

        <div className="doctor-profile">
          <img
            src="/images/profile-dokter1.jpg"
            alt="Foto Dokter"
            className="sidebar-photo"
          />
          <h4>Dr. Anastasya</h4>
          <p>Spesialis Hematologi</p>
        </div>

        <nav className="sidebar-menu">
          <Link to="/dashboard-dokter" className={active("/dashboard")}>Dashboard</Link>
          <Link to="/manajemen-stok" className={active("/manajemen-stok")}>Manajemen Stok</Link>
          <Link to="/manajemen-event" className={active("/manajemen-event")}>Manajemen Event</Link>
          <Link to="/konsultasi-edukasi" className={active("/konsultasi-edukasi")}>Konsultasi & Edukasi</Link>
          <Link to="/profile-dokter" className={active("/profile-dokter")}>Profil Saya</Link>
        </nav>

        <button className="logout" onClick={() => setShowLogoutModal(true)}>
          Logout
        </button>
      </aside>

      {/* ---------------- MODAL KONFIRMASI LOGOUT ---------------- */}
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

              <button className="confirm-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
