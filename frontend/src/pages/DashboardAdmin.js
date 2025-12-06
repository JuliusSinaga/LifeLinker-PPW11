import React from "react";
import { Link } from "react-router-dom";
import "./DashboardAdmin.css";

function MetricCard({ value, title, subtitle, icon }) {
  return (
    <div className="metric-card">
      <div className="metric-content">
        <div className="metric-value">{value}</div>
        <div className="metric-title">{title}</div>
        <div className="metric-subtitle">{subtitle}</div>
      </div>
      <div className="metric-icon">{icon}</div>
    </div>
  );
}

function BloodTypeCard({ type, count, color }) {
  return (
    <div className={`blood-type-card ${color}`}>
      <div className="blood-count">{count}</div>
      <div className="blood-type">{type}</div>
    </div>
  );
}

function NotificationCard({ title, message, time, type }) {
  return (
    <div className={`notification-card ${type}`}>
      <div className="notification-title">{title}</div>
      <div className="notification-message">{message}</div>
      <div className="notification-time">{time}</div>
    </div>
  );
}

function EventItem({ title, location, date }) {
  return (
    <div className="event-item">
      <div className="event-title">{title}</div>
      <div className="event-details">
        <span className="event-location">{location}</span>
        <span className="event-date">{date}</span>
      </div>
    </div>
  );
}

export default function DashboardAdmin() {
  const metrics = [
    { value: "20,847", title: "User Terdaftar", subtitle: "Seluruh Sumut", icon: "👥" },
    { value: "342", title: "Dokter Terverifikasi", subtitle: "30 Rumah Sakit", icon: "👨‍⚕️" },
    { value: "10,275", title: "Pendonor Aktif", subtitle: "Seluruh Provinsi", icon: "🩸" },
    { value: "47", title: "Event", subtitle: "Di Berbagai RS", icon: "📅" },
    { value: "20,234", title: "Stok Darah (Kantong)", subtitle: "30 Rumah Sakit", icon: "🧪" },
    { value: "587", title: "Event Terlaksana", subtitle: "Seluruh Provinsi", icon: "✅" },
  ];

  const bloodStock = [
    { type: "Golongan A", count: "312", color: "red" },
    { type: "Golongan B", count: "628", color: "green" },
    { type: "Golongan AB", count: "184", color: "orange" },
    { type: "Golongan O", count: "1270", color: "blue" },
  ];

  const notifications = [
    { title: "Request Akun Dokter", message: "Dr. Amanda Sari Mengajukan Verifikasi", time: "2 jam lalu", type: "blue" },
    { title: "Request Event Baru", message: "Donor Darah Akbar – RSUP Porsea", time: "4 jam lalu", type: "yellow" },
    { title: "Stok Darah Menipis", message: "Golongan AB tersisa 25 kantong", time: "1 hari lalu", type: "red" },
    { title: "Darah Hampir Kedaluwarsa", message: "3 kantong akan habis masa berlaku", time: "1 hari lalu", type: "pink" },
  ];

  const events = [
    { title: "Donor Darah di RSUD Porsea", location: "RSUD Porsea", date: "12 Januari 2025" },
    { title: "Sosialisasi Donor Darah", location: "RS HKBP Balige", date: "08 April 2025" },
    { title: "Donor Darah IT Del", location: "IT Del", date: "24 Oktober 2025" },
  ];

  return (
    <div className="dashboard-admin">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">❤️</div>
            <div className="logo-text">
              <div className="logo-main">LifeLinker</div>
              <div className="logo-sub">Admin</div>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard-admin" className="nav-item active">📊 Dashboard</Link>
          <Link to="/manajemen-dokter" className="nav-item">👨‍⚕️ Manajemen Dokter</Link>
          <Link to="/manajemen-user" className="nav-item">👤 Manajemen User</Link>
          <Link to="/manajemen-event" className="nav-item">📋 Manajemen Event</Link>
          <Link to="/manajemen-pendonor" className="nav-item">🩸 Manajemen Pendonor</Link>
          <Link to="/laporan" className="nav-item">📈 Laporan</Link>
          <Link to="/profile-admin" className="nav-item">👤 Profile</Link>
        </nav>

        <div className="sidebar-footer">
          <Link to="/logout" className="nav-item logout">🚪 Logout</Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="content-header">
          <h1>Dashboard Administrasi</h1>
        </header>

        <div className="metrics-grid">
          {metrics.map((m, i) => <MetricCard key={i} {...m} />)}
        </div>

        <div className="blood-stock-card">
          <h3>Stok Darah Terkini</h3>
          <div className="blood-types-grid">
            {bloodStock.map((b, i) => <BloodTypeCard key={i} {...b} />)}
          </div>
        </div>

        <div className="bottom-grid">

          {/* LEFT COLUMN */}
          <div className="left-column">

            {/* GRAPH */}
            <div className="chart-card">
  <h4>Perkembangan Stok Darah</h4>
  <div className="chart-container">
  <svg
    className="chart-svg"
    viewBox="0 0 800 300"
    preserveAspectRatio="xMidYMid meet"
  >
    {/* Garis Chart */}
    <polyline
      fill="none"
      stroke="#dc2626"
      strokeWidth="6"
      points="
        80,230 
        160,180 
        240,150 
        320,130 
        400,160 
        480,140 
        560,170 
        640,150
      "
    />

    {/* Titik Chart */}
    <circle cx="80" cy="230" r="10" fill="#dc2626" />
    <circle cx="160" cy="180" r="10" fill="#dc2626" />
    <circle cx="240" cy="150" r="10" fill="#dc2626" />
    <circle cx="320" cy="130" r="10" fill="#dc2626" />
    <circle cx="400" cy="160" r="10" fill="#dc2626" />
    <circle cx="480" cy="140" r="10" fill="#dc2626" />
    <circle cx="560" cy="170" r="10" fill="#dc2626" />
    <circle cx="640" cy="150" r="10" fill="#dc2626" />
  </svg>
</div>
            </div>    



            {/* EVENTS */}
            <div className="events-card">
              <h4>Event per Bulan</h4>
              <div className="events-list">
                {events.map((e, i) => <EventItem key={i} {...e} />)}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="notifications-card">
            <h4>Notifikasi Terbaru</h4>
            <div className="notifications-list">
              {notifications.map((n, i) => <NotificationCard key={i} {...n} />)}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
