import React, { useState, useEffect } from "react";
import "./ManajemenPendonor.css";
import SidebarAdmin from "../components/SidebarAdmin"; 
import axiosClient from "../service/axiosClient";

// MetricCard component
function MetricCard({ value, title, subtitle, icon, iconClass }) {
  return (
    <div className="metric-card">
      <div className="metric-header">
        <div className="metric-content">
          <div className="metric-value">{value}</div>
          <div className="metric-title">{title}</div>
          <div className="metric-subtitle">{subtitle}</div>
        </div>
        {/* Menggunakan class CSS untuk warna icon */}
        <div className={`metric-icon ${iconClass}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function ManajemenPendonor() {
  const [pendonors, setPendonors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [nameFilter, setNameFilter] = useState("");
  const [bloodTypeFilter, setBloodTypeFilter] = useState("Semua Golongan");
  const [statusFilter, setStatusFilter] = useState("Semua Status");

  // Modal State
  const [selectedPendonor, setSelectedPendonor] = useState(null);

  // 1. Fetch Data dari Backend
  const fetchPendonors = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/users");
      const allUsers = response.data.data || [];
      
      // Filter hanya user biasa (Pendonor)
      const donorList = allUsers.filter(user => user.role === 'user');
      setPendonors(donorList);
    } catch (error) {
      console.error("Gagal mengambil data pendonor:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendonors();
  }, []);

  // 2. Logic Filter
  const filteredPendonors = pendonors.filter((p) => {
    const nameMatch = nameFilter === "" || (p.name && p.name.toLowerCase().includes(nameFilter.toLowerCase()));
    
    // Gabungkan Blood Type + Rhesus untuk filter (Contoh: "A" + "+" = "A+")
    const fullBloodType = (p.blood_type && p.rhesus) ? `${p.blood_type}${p.rhesus}` : "-";
    const bloodMatch = bloodTypeFilter === "Semua Golongan" || fullBloodType === bloodTypeFilter;
    
    // Mapping Status Backend ke Frontend
    const statusLabel = p.status === "active" ? "Aktif" : "Tidak Aktif";
    const statusMatch = statusFilter === "Semua Status" || statusLabel === statusFilter;

    return nameMatch && bloodMatch && statusMatch;
  });

  // 3. Metrik Dinamis
  const totalPendonor = pendonors.length;
  // Hitungan statis untuk contoh lain (karena belum ada endpoint khusus statistik)
  const metrics = [
    { value: "20,847", title: "User Terdaftar", subtitle: "Seluruh Sumatera Utara", icon: "👥", iconClass: "icon-red" },
    { value: "342", title: "Dokter Terverifikasi", subtitle: "30 Rumah Sakit", icon: "👨‍⚕️", iconClass: "icon-red" },
    { value: totalPendonor, title: "Pendonor Aktif", subtitle: "Data Real-time", icon: "🩸", iconClass: "icon-red" },
    { value: "47", title: "Event", subtitle: "Di berbagai RS", icon: "📅", iconClass: "icon-red" },
    { value: "20,234", title: "Stok Darah", subtitle: "30 Rumah Sakit", icon: "🧪", iconClass: "icon-red" },
    { value: "587", title: "Event Terlaksana", subtitle: "Seluruh Provinsi", icon: "✅", iconClass: "icon-red" },
  ];

  return (
    <div className="manajemen-pendonor-container">
      <SidebarAdmin />

      <main className="main-content">
        <header className="content-header">
          <h1 className="page-title">Dashboard Administrasi - Pendonor</h1>
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
            {loading ? (
                <p className="loading-text">Memuat data pendonor...</p>
            ) : (
                <table className="pendonor-table">
                <thead className="table-header">
                    <tr>
                    <th>Nama</th>
                    <th className="center">Gol. Darah</th>
                    <th className="center">Kota Domisili</th>
                    {/* Kolom ini placeholder karena data belum tersedia di user endpoint */}
                    <th className="center">No. HP</th> 
                    <th className="center">Status</th>
                    <th className="center">Aksi</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredPendonors.length > 0 ? (
                        filteredPendonors.map((p) => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td className="center">
                                {(p.blood_type && p.rhesus) ? (
                                    <span className="blood-type-badge">
                                        {p.blood_type}{p.rhesus}
                                    </span>
                                ) : (
                                    <span className="text-muted">-</span>
                                )}
                            </td>
                            <td className="center">{p.city || "-"}</td>
                            <td className="center">{p.phone || "-"}</td>
                            <td className="center">
                                <span className={`status-badge ${p.status === "active" ? "status-active" : "status-inactive"}`}>
                                    {p.status === "active" ? "Aktif" : "Non-Aktif"}
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
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="empty-state">Tidak ada pendonor yang sesuai filter.</td>
                        </tr>
                    )}
                </tbody>
                </table>
            )}
          </div>
        </div>

        {/* =========================== */}
        {/* MODAL             */}
        {/* =========================== */}
        {selectedPendonor && (
          <div className="modal-overlay" onClick={() => setSelectedPendonor(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <h2 className="modal-title">Detail Pendonor</h2>

              <div className="modal-content">
                <div className="detail-row"><strong>Nama:</strong> {selectedPendonor.name}</div>
                <div className="detail-row"><strong>Email:</strong> {selectedPendonor.email}</div>
                <div className="detail-row"><strong>Golongan Darah:</strong> {selectedPendonor.blood_type}{selectedPendonor.rhesus}</div>
                <div className="detail-row"><strong>Kota Domisili:</strong> {selectedPendonor.city}</div>
                <div className="detail-row"><strong>Nomor HP:</strong> {selectedPendonor.phone}</div>
                <div className="detail-row">
                    <strong>Status Akun:</strong> 
                    <span className={`status-text ${selectedPendonor.status === 'active' ? 'active' : 'inactive'}`}>
                        {selectedPendonor.status === 'active' ? ' Aktif' : ' Non-Aktif'}
                    </span>
                </div>
                {/* Placeholder untuk data history jika nanti diimplementasikan */}
                <hr className="modal-divider"/>
                <p className="info-muted">Riwayat donasi belum tersedia.</p>
              </div>

              <div className="modal-actions">
                <button className="modal-close" onClick={() => setSelectedPendonor(null)}>
                    Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}