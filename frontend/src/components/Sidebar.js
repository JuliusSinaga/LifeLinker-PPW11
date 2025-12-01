import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaTint, FaCalendarAlt, FaComments, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <img src="/images/doctor-avatar.png" alt="dokter" className="sidebar-avatar" />
        <div className="sidebar-profile">
          <div className="sidebar-name">Dr. Anastasya</div>
          <div className="sidebar-role">Spesialis Hematologi</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" end className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
          <FaTachometerAlt className="nav-icon" />
          <span className="nav-text">Dashboard</span>
        </NavLink>

        <NavLink to="/manajemen-stok" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
          <FaTint className="nav-icon" />
          <span className="nav-text">Manajemen Stok</span>
        </NavLink>

        <NavLink to="/manajemen-event" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
          <FaCalendarAlt className="nav-icon" />
          <span className="nav-text">Manajemen Event</span>
        </NavLink>

        <NavLink to="/konsultasi-edukasi" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
          <FaComments className="nav-icon" />
          <span className="nav-text">Konsultasi & Edukasi</span>
        </NavLink>

        <NavLink to="/profile" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
          <FaUser className="nav-icon" />
          <span className="nav-text">Profil Saya</span>
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <button className="logout-btn">
          <FaSignOutAlt className="logout-icon" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
