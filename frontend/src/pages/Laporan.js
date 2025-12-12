import React, { useState } from "react";
import "./Laporan.css";
import SidebarAdmin from "../components/SidebarAdmin"; // 🔥 PANGGIL SIDEBAR ADMIN

// MetricCard component
function MetricCard({ value, title, subtitle, icon, iconColor }) {
  return (
    <div className="metric-card">
      <div className="metric-header">
        <div className="metric-content">
          <div className="metric-value">{value}</div>
          <div className="metric-title">{title}</div>
          <div className="metric-subtitle">{subtitle}</div>
        </div>
        <div className="metric-icon" style={{ color: iconColor }}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function Laporan() {
  const [nameFilter, setNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");

  // Statistik
  const metrics = [
    { value: "20,847", title: "User Terdaftar", subtitle: "Seluruh Sumatera Utara", icon: "👥", iconColor: "#dc2626" },
    { value: "342", title: "Dokter Terverifikasi", subtitle: "30 Rumah Sakit", icon: "👨‍⚕️", iconColor: "#dc2626" },
    { value: "10,275", title: "Pendonor Aktif", subtitle: "Seluruh Provinsi", icon: "🩸", iconColor: "#dc2626" },
    { value: "47", title: "Event", subtitle: "Di berbagai RS", icon: "📅", iconColor: "#dc2626" },
    { value: "20,234", title: "Stok Darah (kantong)", subtitle: "30 Rumah Sakit", icon: "🧪", iconColor: "#dc2626" },
    { value: "587", title: "Event Terlaksana", subtitle: "Seluruh Provinsi", icon: "✅", iconColor: "#dc2626" },
  ];

  // Data laporan
  const reportEvents = [
    {
      id: 1,
      name: "Donor Darah Kemerdekaan",
      location: "RSUP H. Adam Malik",
      date: "17 Agustus 2024",
      participants: "150/200",
      status: "Selesai",
    },
    {
      id: 2,
      name: "Pemeriksaan Kesehatan Gratis",
      location: "RS HKBP Balige",
      date: "15 September 2024",
      participants: "0/300",
      status: "Dibatalkan",
    },
    {
      id: 3,
      name: "Donor Darah Ramadan",
      location: "RSU Pirgandi",
      date: "20 April 2024",
      participants: "120/150",
      status: "Selesai",
    },
  ];

  // Filter laporan
  const filteredReports = reportEvents.filter((r) => {
    const matchName = nameFilter === "" || r.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchDate = dateFilter === "" || r.date.includes(dateFilter);
    const matchStatus = statusFilter === "Semua Status" || r.status === statusFilter;
    return matchName && matchDate && matchStatus;
  });

  return (
    <div className="laporan-container">

      {/* 🔥 SIDEBAR ADMIN */}
      <SidebarAdmin />

      {/* MAIN CONTENT */}
      <main className="main-content">

        {/* Header */}
        <header className="content-header">
          <h1 className="page-title">Dashboard Administrasi - Laporan</h1>
        </header>

        {/* Metrics */}
        <div className="metrics-grid">
          {metrics.map((metric, i) => (
            <MetricCard key={i} {...metric} />
          ))}
        </div>

        {/* LAPORAN EVENT */}
        <div className="laporan-section">
          <h3 className="section-title">Laporan Event</h3>

          {/* FILTERS */}
          <div className="filter-section">
            <div className="filter-group">
              <label className="filter-label">Filter Nama Event:</label>
              <input
                type="text"
                placeholder="Cari nama event..."
                className="filter-input"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Filter Tanggal:</label>
              <input
                type="text"
                placeholder="Cari tanggal..."
                className="filter-input"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Filter Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="Semua Status">Semua Status</option>
                <option value="Selesai">Selesai</option>
                <option value="Dibatalkan">Dibatalkan</option>
                <option value="Berlangsung">Berlangsung</option>
              </select>
            </div>
          </div>

          {/* TABLE */}
          <div className="table-container">
            <table className="laporan-table">
              <thead>
                <tr>
                  <th>Nama Event</th>
                  <th className="center">Lokasi</th>
                  <th className="center">Tanggal</th>
                  <th className="center">Peserta</th>
                  <th className="center">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredReports.map((r) => (
                  <tr key={r.id}>
                    <td>{r.name}</td>
                    <td className="center">{r.location}</td>
                    <td className="center">{r.date}</td>
                    <td className="center">{r.participants}</td>
                    <td className="center">
                      <span
                        className={`status-badge ${
                          r.status === "Selesai"
                            ? "status-completed"
                            : r.status === "Dibatalkan"
                            ? "status-cancelled"
                            : "status-ongoing"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredReports.length === 0 && (
              <div className="empty-state">
                <p className="empty-message">Tidak ada laporan sesuai filter.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
