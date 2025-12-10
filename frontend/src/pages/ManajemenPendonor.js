import React, { useState } from "react";
import "./ManajemenPendonor.css";
import SidebarAdmin from "../components/SidebarAdmin"; 

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

export default function ManajemenPendonor() {
  const [nameFilter, setNameFilter] = useState("");
  const [bloodTypeFilter, setBloodTypeFilter] = useState("Semua Golongan");
  const [statusFilter, setStatusFilter] = useState("Semua Status");

  // 📌 MODAL STATE
  const [selectedPendonor, setSelectedPendonor] = useState(null);

  const metrics = [
    { value: "20,847", title: "User Terdaftar", subtitle: "Seluruh Sumatera Utara", icon: "👥", iconColor: "#dc2626" },
    { value: "342", title: "Dokter Terverifikasi", subtitle: "30 Rumah Sakit", icon: "👨‍⚕️", iconColor: "#dc2626" },
    { value: "10,275", title: "Pendonor Aktif", subtitle: "Seluruh Provinsi", icon: "🩸", iconColor: "#dc2626" },
    { value: "47", title: "Event", subtitle: "Di berbagai RS", icon: "📅", iconColor: "#dc2626" },
    { value: "20,234", title: "Stok Darah (kantong)", subtitle: "30 Rumah Sakit", icon: "🧪", iconColor: "#dc2626" },
    { value: "587", title: "Event Terlaksana", subtitle: "Seluruh Provinsi", icon: "✅", iconColor: "#dc2626" },
  ];

  const pendonors = [
    {
      id: 1,
      name: "Andi Saputra",
      bloodType: "O+",
      hospital: "RS Harapan Kita",
      donorDate: "28 September 2025",
      donorCount: "3x",
      status: "Aktif",
      phone: "0812-3456-7890",
      address: "Jl. Merdeka No. 12, Medan",
    },
    {
      id: 2,
      name: "Budi Santoso",
      bloodType: "A+",
      hospital: "RSUD Tangerang",
      donorDate: "22 September 2025",
      donorCount: "5x",
      status: "Aktif",
      phone: "0813-9876-5432",
      address: "Jl. Mawar No. 55, Tangerang",
    },
    {
      id: 3,
      name: "Dewi Sartika",
      bloodType: "B+",
      hospital: "RSUD Tangerang",
      donorDate: "20 September 2025",
      donorCount: "3x",
      status: "Aktif",
      phone: "0812-7788-9911",
      address: "Jl. Kenanga No. 21, Tangerang",
    },
  ];

  const filteredPendonors = pendonors.filter((p) => {
    const nameMatch = p.name.toLowerCase().includes(nameFilter.toLowerCase());
    const bloodMatch = bloodTypeFilter === "Semua Golongan" || p.bloodType === bloodTypeFilter;
    const statusMatch = statusFilter === "Semua Status" || p.status === statusFilter;
    return nameMatch && bloodMatch && statusMatch;
  });

  return (
    <div className="manajemen-pendonor-container">
      <SidebarAdmin />

      <main className="main-content">
        <header className="content-header">
          <h1 className="page-title">Dashboard Administrasi</h1>
        </header>

        {/* METRICS */}
        <div className="metrics-grid">
          {metrics.map((metric, i) => (
            <MetricCard key={i} {...metric} />
          ))}
        </div>

        {/* PENDONOR SECTION */}
        <div className="pendonor-management-section">
          <h3 className="section-title">Manajemen Pendonor</h3>

          {/* FILTERS */}
          <div className="filter-section">
            <div className="filter-group">
              <label className="filter-label">Filter Nama Pendonor:</label>
              <input
                type="text"
                placeholder="Cari nama pendonor..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Golongan Darah:</label>
              <select
                value={bloodTypeFilter}
                onChange={(e) => setBloodTypeFilter(e.target.value)}
                className="filter-select"
              >
                <option value="Semua Golongan">Semua Golongan</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="Semua Status">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Tidak Aktif">Tidak Aktif</option>
              </select>
            </div>
          </div>

          {/* TABLE */}
          <div className="table-container">
            <table className="pendonor-table">
              <thead className="table-header">
                <tr>
                  <th>Nama</th>
                  <th className="center">Gol. Darah</th>
                  <th className="center">Rumah Sakit</th>
                  <th className="center">Tanggal Donor</th>
                  <th className="center">Jumlah Donor</th>
                  <th className="center">Status</th>
                  <th className="center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredPendonors.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td className="center">
                      <span className="blood-type-badge">{p.bloodType}</span>
                    </td>
                    <td className="center">{p.hospital}</td>
                    <td className="center">{p.donorDate}</td>
                    <td className="center">{p.donorCount}</td>
                    <td className="center">
                      <span className={`status-badge ${p.status === "Aktif" ? "status-active" : "status-inactive"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="center">
                      <button
                        className="action-button detail-button"
                        onClick={() => setSelectedPendonor(p)}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredPendonors.length === 0 && (
              <div className="empty-state">
                <p className="empty-message">Tidak ada pendonor yang sesuai filter.</p>
              </div>
            )}
          </div>
        </div>

        {/* =========================== */}
        {/*           MODAL             */}
        {/* =========================== */}
        {selectedPendonor && (
          <div className="modal-overlay" onClick={() => setSelectedPendonor(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <h2 className="modal-title">Detail Pendonor</h2>

              <div className="modal-content">
                <p><strong>NAMA:</strong> {selectedPendonor.name}</p>
                <p><strong>Golongan Darah:</strong> {selectedPendonor.bloodType}</p>
                <p><strong>Rumah Sakit:</strong> {selectedPendonor.hospital}</p>
                <p><strong>Tanggal Donor Terakhir:</strong> {selectedPendonor.donorDate}</p>
                <p><strong>Total Donor:</strong> {selectedPendonor.donorCount}</p>
                <p><strong>Status:</strong> {selectedPendonor.status}</p>
                <p><strong>Nomor HP:</strong> {selectedPendonor.phone}</p>
                <p><strong>Alamat:</strong> {selectedPendonor.address}</p>
              </div>

              <button className="modal-close" onClick={() => setSelectedPendonor(null)}>
                Tutup
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
