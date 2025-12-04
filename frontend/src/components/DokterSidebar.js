import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/SidebarDokter.css";

export default function DokterSidebar() {
  return (
    <aside className="dokter-sidebar">

      <div className="doctor-profile">
        <img
          src={process.env.PUBLIC_URL + "/images/profile-dokter.jpg"}
          alt="Foto Dokter"
          className="doctor-photo"
        />

        <h4>Dr. Anastasya</h4>
        <p>Spesialis Hematologi</p>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/dashboard" className="menu-item">Dashboard</NavLink>
        <NavLink to="/manajemen-stok" className="menu-item">Manajemen Stok</NavLink>
        <NavLink to="/manajemen-event" className="menu-item">Manajemen Event</NavLink>
        <NavLink to="/konsultasi-edukasi" className="menu-item">Konsultasi & Edukasi</NavLink>
        <NavLink to="/profil-saya" className="menu-item">Profil Saya</NavLink>
      </nav>

      <button className="logout">Logout</button>
    </aside>
  );
}
