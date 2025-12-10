import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ManajemenDokter.css';
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
        <div className="metric-icon" style={{ color: iconColor }}>{icon}</div>
      </div>
    </div>
  );
}

// DoctorRow component
function DoctorRow({ doctor, openModal }) {
  const isWaiting = doctor.status === "Menunggu Verifikasi";

  const getStatusBadge = (status) => {
    if (status === 'Terverifikasi') {
      return <span className="status-badge status-verified">Terverifikasi</span>;
    } else if (status === 'Menunggu Verifikasi') {
      return <span className="status-badge status-pending">Menunggu Verifikasi</span>;
    } else {
      return <span className="status-badge status-rejected">Ditolak</span>;
    }
  };

  return (
    <tr className="doctor-row">
      <td>{doctor.name}</td>
      <td>{doctor.hospital}</td>
      <td>{doctor.specialization}</td>
      <td>{getStatusBadge(doctor.status)}</td>

      {/* Aksi dengan animasi */}
      <td className="action-cell">
        <div className="action-buttons action-hover-area">

          {/* Tombol Lihat Info */}
          <button
            className="action-button view-button"
            onClick={() => openModal(doctor)}
          >
            Lihat Info
          </button>

          {/* Tombol animasi muncul saat hover */}
          <div className="action-animate-wrapper">
            <button
              className={`action-button verify-button ${!isWaiting ? "disabled-btn" : ""}`}
              disabled={!isWaiting}
            >
              ✓
            </button>

            <button
              className={`action-button reject-button ${!isWaiting ? "disabled-btn" : ""}`}
              disabled={!isWaiting}
            >
              ✗
            </button>
          </div>

        </div>
      </td>
    </tr>
  );
}

export default function ManajemenDokter() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [nameFilter, setNameFilter] = useState('');
  const [strNumberFilter, setStrNumberFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');

  const metrics = [
    { value: '20,847', title: 'User Terdaftar', subtitle: 'Seluruh Sumatera Utara', icon: '👥', iconColor: '#dc2626' },
    { value: '342', title: 'Dokter Terverifikasi', subtitle: '30 Rumah Sakit', icon: '👨‍⚕️', iconColor: '#dc2626' },
    { value: '10,275', title: 'Pendonor Aktif', subtitle: 'Seluruh Provinsi', icon: '🩸', iconColor: '#dc2626' },
    { value: '47', title: 'Event', subtitle: 'Di berbagai RS', icon: '📅', iconColor: '#dc2626' },
    { value: '20,234', title: 'Stok Darah (kantong)', subtitle: '30 Rumah Sakit', icon: '🧪', iconColor: '#dc2626' },
    { value: '587', title: 'Event Terlaksana', subtitle: 'Seluruh Provinsi', icon: '✅', iconColor: '#dc2626' }
  ];

  const doctors = [
    { id: 1, name: 'Dr. Amanda Sari, Sp.A', hospital: 'RSUP H. Adam Malik', specialization: 'Spesialis Anak', status: 'Terverifikasi' },
    { id: 2, name: 'Dr. Eko Prasetyo', hospital: 'RS HKBP Balige', specialization: 'Dokter Umum', status: 'Menunggu Verifikasi' },
    { id: 3, name: 'Dr. Siti Nurhaliza, Sp.JP', hospital: 'RSU Pirgandi', specialization: 'Spesialis Jantung', status: 'Terverifikasi' }
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const nameMatch = nameFilter === '' || doctor.name.toLowerCase().includes(nameFilter.toLowerCase());
    const statusMatch = statusFilter === 'Semua Status' || doctor.status === statusFilter;
    return nameMatch && statusMatch;
  });

  return (
    <div className="manajemen-dokter-container">
      <SidebarAdmin />

      <main className="main-content">
        <header className="content-header">
          <h1 className="page-title">Dashboard Administrasi</h1>
        </header>

        {/* Metrics */}
        <div className="metrics-grid">
          {metrics.map((metric, i) => <MetricCard key={i} {...metric} />)}
        </div>

        {/* Doctors Table */}
        <div className="doctors-table-container">
          <h3 className="table-title">Daftar Dokter</h3>

          {/* Filters */}
          <div className="filters-section">
            <div className="filters-grid">

              <div className="filter-group">
                <label className="filter-label">Filter Nama Dokter:</label>
                <input
                  type="text"
                  className="filter-input"
                  placeholder="Cari nama dokter..."
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">Filter Nomor STR:</label>
                <input
                  type="text"
                  className="filter-input"
                  placeholder="Cari nomor STR..."
                  value={strNumberFilter}
                  onChange={(e) => setStrNumberFilter(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">Status:</label>
                <select
                  className="filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="Semua Status">Semua Status</option>
                  <option value="Terverifikasi">Terverifikasi</option>
                  <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                </select>
              </div>

              <div className="filter-group">
                <button className="filter-button">Filter</button>
              </div>

            </div>
          </div>

          {/* Table */}
          <div className="table-container">
            <table className="doctor-table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Rumah Sakit</th>
                  <th>Spesialis</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredDoctors.map((doctor) => (
                  <DoctorRow
                    key={doctor.id}
                    doctor={doctor}
                    openModal={setSelectedDoctor}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Detail */}
        {selectedDoctor && (
          <div className="modal-overlay" onClick={() => setSelectedDoctor(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <h2 className="modal-title">Detail Dokter</h2>

              <div className="modal-content">
                <p><strong>Nama:</strong> {selectedDoctor.name}</p>
                <p><strong>Rumah Sakit:</strong> {selectedDoctor.hospital}</p>
                <p><strong>Spesialis:</strong> {selectedDoctor.specialization}</p>
                <p><strong>Status:</strong> {selectedDoctor.status}</p>
              </div>

              <button className="modal-close" onClick={() => setSelectedDoctor(null)}>
                Tutup
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
