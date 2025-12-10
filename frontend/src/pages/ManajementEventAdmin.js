import React, { useState } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import "./ManajementEventAdmin.css";

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

export default function ManajementEventAdmin() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [monthFilter, setMonthFilter] = useState("Semua Bulan");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const metrics = [
    { value: "20,847", title: "User Terdaftar", subtitle: "Seluruh Sumut", icon: "👥" },
    { value: "342", title: "Dokter Terverifikasi", subtitle: "30 Rumah Sakit", icon: "👨‍⚕️" },
    { value: "10,275", title: "Pendonor Aktif", subtitle: "Seluruh Provinsi", icon: "🩸" },
    { value: "47", title: "Event", subtitle: "Di berbagai RS", icon: "📅" },
    { value: "20,234", title: "Stok Darah (Kantong)", subtitle: "30 Rumah Sakit", icon: "🧪" },
    { value: "587", title: "Event Terlaksana", subtitle: "Seluruh Provinsi", icon: "✅" },
  ];

  const eventList = [
    {
      id: 1,
      name: "Donor Darah Akbar",
      doctor: "Dr. Amanda Sari, Sp.A",
      location: "RSUP H. Adam Malik",
      date: "15 Nov 2024",
      status: "Disetujui",
      description: "Event donor darah besar yang diadakan di RSUP H. Adam Malik."
    },
    {
      id: 2,
      name: "Pemeriksaan Kesehatan Gratis",
      doctor: "Dr. Eko Prasetyo",
      location: "RS HKBP Balige",
      date: "20 Nov 2024",
      status: "Menunggu",
      description: "Layanan pemeriksaan kesehatan gratis untuk masyarakat Balige."
    },
    {
      id: 3,
      name: "Sosialisasi Donor Darah",
      doctor: "Dr. Siti Nurhaliza, Sp.JP",
      location: "RSU Pirgandi",
      date: "25 Nov 2024",
      status: "Ditolak",
      description: "Sosialisasi edukatif tentang pentingnya donor darah."
    },
  ];

  const filteredEvent = eventList.filter((e) => {
    const nameMatch = search === "" || e.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "Semua Status" || e.status === statusFilter;
    const matchMonth = monthFilter === "Semua Bulan" || e.date.includes(monthFilter);
    return nameMatch && matchStatus && matchMonth;
  });

  // BADGE STATUS
  const getStatusBadge = (status) => {
    if (status === "Disetujui") return <span className="badge badge-green">Disetujui</span>;
    if (status === "Menunggu") return <span className="badge badge-yellow">Menunggu Pemrosesan</span>;
    return <span className="badge badge-red">Ditolak</span>;
  };

  return (
    <div className="event-admin-page">
      <SidebarAdmin />

      <main className="main-content">
        <h1 className="page-title">Dashboard Administrasi</h1>

        {/* METRICS */}
        <div className="metrics-grid">
          {metrics.map((m, i) => (
            <MetricCard key={i} {...m} />
          ))}
        </div>

        {/* EVENT SECTION */}
        <div className="event-section">
          <h2>Manajemen Event</h2>

          {/* FILTERS */}
          <div className="event-filters">
            <div>
              <label>Filter Nama Event:</label>
              <input
                type="text"
                placeholder="Cari nama event..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div>
              <label>Filter Status:</label>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option>Semua Status</option>
                <option>Disetujui</option>
                <option>Menunggu</option>
                <option>Ditolak</option>
              </select>
            </div>

            <div>
              <label>Filter Bulan:</label>
              <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)}>
                <option>Semua Bulan</option>
                <option>Jan</option>
                <option>Feb</option>
                <option>Mar</option>
                <option>Apr</option>
                <option>Mei</option>
                <option>Jun</option>
                <option>Jul</option>
                <option>Agu</option>
                <option>Sep</option>
                <option>Okt</option>
                <option>Nov</option>
                <option>Des</option>
              </select>
            </div>
          </div>

          {/* EVENT TABLE */}
          <div className="table-wrapper">
            <table className="event-table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Dokter</th>
                  <th>Lokasi</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredEvent.map((e) => (
                  <tr key={e.id}>
                    <td>{e.name}</td>
                    <td>{e.doctor}</td>
                    <td>{e.location}</td>
                    <td>{e.date}</td>
                    <td>{getStatusBadge(e.status)}</td>

                    <td className="actions-col">
                      <div className="action-hover-area">

                        {/* VIEW BUTTON */}
                        <button
                          className="action-btn view"
                          onClick={() => setSelectedEvent(e)}
                        >
                          👁
                        </button>

                        {/* ACTION BUTTONS ALWAYS PRESENT */}
                        <div className="action-animate-wrapper">
                          <button
                            className={`action-btn approve ${e.status !== "Menunggu" ? "disabled-btn" : ""}`}
                            disabled={e.status !== "Menunggu"}
                          >
                            ✔
                          </button>

                          <button
                            className={`action-btn reject ${e.status !== "Menunggu" ? "disabled-btn" : ""}`}
                            disabled={e.status !== "Menunggu"}
                          >
                            ✘
                          </button>
                        </div>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL */}
        {selectedEvent && (
          <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <h2 className="modal-title">Detail Event</h2>

              <div className="modal-content">
                <p><strong>Nama Event:</strong> {selectedEvent.name}</p>
                <p><strong>Dokter Penanggung Jawab:</strong> {selectedEvent.doctor}</p>
                <p><strong>Lokasi:</strong> {selectedEvent.location}</p>
                <p><strong>Tanggal:</strong> {selectedEvent.date}</p>
                <p><strong>Status:</strong> {selectedEvent.status}</p>
                <p><strong>Deskripsi:</strong> {selectedEvent.description}</p>
              </div>

              <button className="modal-close" onClick={() => setSelectedEvent(null)}>
                Tutup
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
