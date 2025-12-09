import React, { useState, useEffect } from 'react';
import './ManajemenUser.css';
import SidebarAdmin from "../components/SidebarAdmin";
import axiosClient from "../service/axiosClient"; // Import axios yang baru dibuat

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
  // STATE DATA DARI BACKEND
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  
  // State Filter
  const [nameFilter, setNameFilter] = useState('');
  const [bloodTypeFilter, setBloodTypeFilter] = useState('Semua Golongan');
  const [statusFilter, setStatusFilter] = useState('Semua Status');

  // Modal State
  const [selectedUser, setSelectedUser] = useState(null);

  // FETCH DATA SAAT HALAMAN DIBUKA
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosClient.get("/users");
        // Response backend: { "users": [...] }
        setUsers(response.data.users); 
        setLoading(false);
      } catch (err) {
        console.error("Gagal mengambil data user:", err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // LOGIKA FILTERING (Sesuaikan dengan field Backend: nama, gol_darah)
  const filteredUsers = users.filter(user => {
    // Backend field: user.nama
    const nameMatch = nameFilter === '' || user.nama.toLowerCase().includes(nameFilter.toLowerCase());
    
    // Backend field: user.gol_darah
    const bloodMatch = bloodTypeFilter === 'Semua Golongan' || user.gol_darah === bloodTypeFilter;
    
    // Backend belum ada 'status', kita anggap semua 'Aktif' dulu atau gunakan Role
    // Misal kita filter berdasarkan Role jika mau
    const statusMatch = statusFilter === 'Semua Status' || 'Aktif' === statusFilter; 
    
    return nameMatch && bloodMatch && statusMatch;
  });

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    // Karena backend belum kirim status, kita default ke "Aktif"
    const displayStatus = status || "Aktif"; 
    return (
      <span className={`status-badge ${displayStatus === 'Aktif' ? 'status-active' : 'status-inactive'}`}>
        {displayStatus}
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

        {/* METRICS (Bisa diganti data real nanti) */}
        <div className="metrics-grid">
          {[
            { value: users.length.toString(), title: 'User Terdaftar', subtitle: 'Total di Database', icon: '👥' },
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
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
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
            {loading ? (
                <p style={{textAlign: "center", padding: "20px"}}>Sedang memuat data...</p>
            ) : (
            <table className="user-table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>No HP</th>
                  <th>Gol. Darah</th>
                  <th>Role</th>
                  <th>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.ID}> {/* Gunakan ID dari GORM */}
                    <td>{user.nama}</td>
                    <td>{user.email}</td>
                    <td>{user.no_hp || "-"}</td>
                    <td>{user.gol_darah}</td>
                    <td><StatusBadge status={user.role || "User"} /></td>
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
            )}
            
            {!loading && filteredUsers.length === 0 && (
                <p style={{textAlign: "center", padding: "20px"}}>Tidak ada data user ditemukan.</p>
            )}
          </div>
        </div>

        {/* ========================= */}
        {/* MODAL           */}
        {/* ========================= */}
        {selectedUser && (
          <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
            <div
              className="modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="modal-title">Detail User</h3>

              <div className="modal-content">
                <p><strong>Nama:</strong> {selectedUser.nama}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Golongan Darah:</strong> {selectedUser.gol_darah}</p>
                <p><strong>Rhesus:</strong> {selectedUser.rhesus}</p>
                <p><strong>Nomor HP:</strong> {selectedUser.no_hp}</p>
                <p><strong>Role:</strong> {selectedUser.role}</p>
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