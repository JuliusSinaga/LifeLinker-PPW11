import React, { useState } from 'react';
import './ManajemenUser.css';
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

export default function ManajemenUser() {
  const [nameFilter, setNameFilter] = useState('');
  const [bloodTypeFilter, setBloodTypeFilter] = useState('Semua Golongan');
  const [statusFilter, setStatusFilter] = useState('Semua Status');

  // Modal State
  const [selectedUser, setSelectedUser] = useState(null);

  // Sample users
  const users = [
    { id: 1, name: 'Rina Wijaya', email: 'rina.wijaya@email.com', donorCount: '5x', bloodType: 'A+', status: 'Aktif' },
    { id: 2, name: 'Budi Santoso', email: 'budi.santoso@email.com', donorCount: '3x', bloodType: 'O+', status: 'Tidak Aktif' },
    { id: 3, name: 'Dewi Sartika', email: 'dewi.sartika@email.com', donorCount: '2x', bloodType: 'B+', status: 'Aktif' }
  ];

  // Filtering logic
  const filteredUsers = users.filter(user => {
    const nameMatch = nameFilter === '' || user.name.toLowerCase().includes(nameFilter.toLowerCase());
    const bloodMatch = bloodTypeFilter === 'Semua Golongan' || user.bloodType === bloodTypeFilter;
    const statusMatch = statusFilter === 'Semua Status' || user.status === statusFilter;
    return nameMatch && bloodMatch && statusMatch;
  });

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    return (
      <span className={`status-badge ${status === 'Aktif' ? 'status-active' : 'status-inactive'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="manajemen-user-container">
      {/* SIDEBAR */}
      <SidebarAdmin />

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="content-header">
          <h1 className="page-title">Dashboard Administrasi</h1>
        </header>

        {/* METRICS */}
        <div className="metrics-grid">
          {[
            { value: '20,847', title: 'User Terdaftar', subtitle: 'Seluruh Sumatera Utara', icon: '👥' },
            { value: '342', title: 'Dokter Terverifikasi', subtitle: '30 Rumah Sakit', icon: '👨‍⚕️' },
            { value: '10,275', title: 'Pendonor Aktif', subtitle: 'Seluruh Provinsi', icon: '🩸' },
            { value: '47', title: 'Event', subtitle: 'Di berbagai RS', icon: '📅' },
            { value: '20,234', title: 'Stok Darah (kantong)', subtitle: '30 Rumah Sakit', icon: '🧪' },
            { value: '587', title: 'Event Terlaksana', subtitle: 'Seluruh Provinsi', icon: '✅' }
          ].map((metric, index) => (
            <MetricCard key={index} {...metric} iconColor="#dc2626" />
          ))}
        </div>

        {/* USER TABLE SECTION */}
        <div className="users-table-container">
          <div className="table-header">
            <h3 className="table-title">Daftar User</h3>
          </div>

          {/* FILTER SECTION */}
          <div className="filters-section">
            <div className="filters-grid">
              <div className="filter-group">
                <label className="filter-label">Filter Nama User:</label>
                <input
                  type="text"
                  className="filter-input"
                  placeholder="Cari nama user..."
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
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

              <div className="filter-group">
                <button className="filter-button">Filter</button>
              </div>
            </div>
          </div>

          {/* USER TABLE */}
          <div className="table-container">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Jumlah Donor</th>
                  <th>Gol. Darah</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.donorCount}</td>
                    <td>{user.bloodType}</td>
                    <td><StatusBadge status={user.status} /></td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-button view-button"
                          onClick={() => setSelectedUser(user)}
                        >
                          Lihat Info
                        </button>

                        <button className="action-button hapus-button">
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================= */}
        {/*          MODAL           */}
        {/* ========================= */}
        {selectedUser && (
          <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
            <div
              className="modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="modal-title">Detail User</h3>

              <div className="modal-content">
                <p><strong>Nama:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Golongan Darah:</strong> {selectedUser.bloodType}</p>
                <p><strong>Jumlah Donor:</strong> {selectedUser.donorCount}</p>
                <p><strong>Status:</strong> {selectedUser.status}</p>
              </div>

              <button
                className="modal-close"
                onClick={() => setSelectedUser(null)}
              >
                Tutup
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
