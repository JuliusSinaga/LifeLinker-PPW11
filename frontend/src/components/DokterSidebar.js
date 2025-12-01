import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/SidebarDokter.css";

export default function DokterSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => navigate("/login-dokter");

  return (
    <aside className="dokter-sidebar">

      <div className="doctor-profile">
        <img src="/images/doctor-avatar.png" alt="dokter" />
        <h4>Dr. Anastasya</h4>
        <p>Spesialis Hematologi</p>
      </div>

      <nav className="sidebar-menu">
        <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
          Dashboard
        </Link>

        <Link to="/manajemen-stok" className={location.pathname === "/manajemen-stok" ? "active" : ""}>
          Manajemen Stok
        </Link>

        <Link to="/manajemen-event" className={location.pathname === "/manajemen-event" ? "active" : ""}>
          Manajemen Event
        </Link>

        <Link to="/konsultasi-edukasi" className={location.pathname === "/konsultasi-edukasi" ? "active" : ""}>
          Konsultasi & Edukasi
        </Link>

        <Link to="/profil-saya" className={location.pathname === "/profil-saya" ? "active" : ""}>
          Profil Saya
        </Link>

        <button className="logout" onClick={logout}>
          Logout
        </button>
      </nav>

    </aside>
  );
}
