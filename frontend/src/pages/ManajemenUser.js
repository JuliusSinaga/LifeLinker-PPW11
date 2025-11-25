import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ManajemenUser.css';

// MetricCard component untuk statistik
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

// UserRow component untuk setiap baris user
function UserRow({ user }) {
  const getStatusBadge = (status) => {
    if (status === 'Aktif') {
      return <span className="status-badge status-active">Aktif</span>;
    } else {
      return <span className="status-badge status-inactive">Tidak Aktif</span>;
    }
  };

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.donorCount}</td>
      <td>{user.bloodType}</td>
      <td>{getStatusBadge(user.status)}</td>
      <td>
        <div className="action-buttons">
          <button className="action-button view-button">
            Lihat Info
          </button>
          <button className="action-button hapus-button">
            Hapus
          </button>
        </div>
      </td>
    </tr>
  );
}

const ManajemenUser = () => {
  const [nameFilter, setNameFilter] = useState('');
  const [bloodTypeFilter, setBloodTypeFilter] = useState('Semua Golongan');
  const [statusFilter, setStatusFilter] = useState('Semua Status');

  // Data statistik sesuai UI
  const metrics = [
    { value: '20,847', title: 'User Terdaftar', subtitle: 'Seluruh Sumatera Utara', icon: '👥', iconColor: '#dc2626' },
    { value: '342', title: 'Dokter Terverifikasi', subtitle: '30 Rumah Sakit', icon: '👨‍⚕️', iconColor: '#dc2626' },
    { value: '10,275', title: 'Pendonor Aktif', subtitle: 'Seluruh Provinsi', icon: '🩸', iconColor: '#dc2626' },
    { value: '47', title: 'Event', subtitle: 'Di berbagai RS', icon: '📅', iconColor: '#dc2626' },
    { value: '20,234', title: 'Stok Darah (kantong)', subtitle: '30 Rumah Sakit', icon: '🧪', iconColor: '#dc2626' },
    { value: '587', title: 'Event Terlaksana', subtitle: 'Seluruh Provinsi', icon: '✅', iconColor: '#dc2626' }
  ];

  // Sample user data sesuai UI
  const users = [
    {
      id: 1,
      name: 'Rina Wijaya',
      email: 'rina.wijaya@email.com',
      donorCount: '5x',
      bloodType: 'A+',
      status: 'Aktif'
    },
    {
      id: 2,
      name: 'Budi Santoso',
      email: 'budi.santoso@email.com',
      donorCount: '3x',
      bloodType: 'O+',
      status: 'Tidak Aktif'
    },
    {
      id: 3,
      name: 'Dewi Sartika',
      email: 'dewi.sartika@email.com',
      donorCount: '2x',
      bloodType: 'B+',
      status: 'Aktif'
    }
  ];

  // Filter users
  const filteredUsers = users.filter(user => {
    const nameMatch = nameFilter === '' || user.name.toLowerCase().includes(nameFilter.toLowerCase());
    const bloodMatch = bloodTypeFilter === 'Semua Golongan' || user.bloodType === bloodTypeFilter;
    const statusMatch = statusFilter === 'Semua Status' || user.status === statusFilter;
    return nameMatch && bloodMatch && statusMatch;
  });

  return (
    <div className="manajemen-user-container">
      {/* Sidebar */}
      <aside className="sidebar">
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-content">
            <div className="logo-icon">
              ❤️
            </div>
            <div>
              <div className="logo-text">LifeLinker</div>
              <div className="logo-subtitle">Admin</div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="sidebar-nav">
          <Link to="/dashboard-admin" className="nav-link">
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </Link>
          
          <Link to="/manajemen-dokter" className="nav-link">
            <span className="nav-icon">👨‍⚕️</span>
            <span>Manajemen Dokter</span>
          </Link>
          
          <Link to="/manajemen-user" className="nav-link active">
            <span className="nav-icon">👤</span>
            <span>Manajemen User</span>
          </Link>
          
          <Link to="/manajemen-event" className="nav-link">
            <span className="nav-icon">📋</span>
            <span>Manajemen Event</span>
          </Link>
          
          <Link to="/manajemen-pendonor" className="nav-link">
            <span className="nav-icon">🩸</span>
            <span>Manajemen Pendonor</span>
          </Link>
          
          <Link to="/laporan" className="nav-link">
            <span className="nav-icon">📈</span>
            <span>Laporan</span>
          </Link>
          
          <Link to="/profil-admin" className="nav-link">
            <span className="nav-icon">👤</span>
            <span>Profile</span>
          </Link>
        </nav>

        {/* Logout */}
        <div className="sidebar-logout">
          <Link to="/logout" className="nav-link">
            <span className="nav-icon">🚪</span>
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="content-header">
          <h1 className="page-title">
            Dashboard Administrasi
          </h1>
        </header>

        {/* Metrics Grid */}
        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              value={metric.value}
              title={metric.title}
              subtitle={metric.subtitle}
              icon={metric.icon}
              iconColor={metric.iconColor}
            />
          ))}
        </div>

        {/* User Management Section */}
        <div className="users-table-container">
          <div className="table-header">
            <h3 className="table-title">
              Daftar User
            </h3>
          </div>
          
          {/* Filter Section */}
          <div className="filters-section">
            <div className="filters-grid">
              <div className="filter-group">
                <label className="filter-label">
                  Filter Nama User:
                </label>
                <input
                  type="text"
                  placeholder="Cari nama user..."
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  className="filter-input"
                />
              </div>
              
              <div className="filter-group">
                <label className="filter-label">
                  Filter Golongan Darah:
                </label>
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
                <label className="filter-label">
                  Filter Status:
                </label>
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
                <button className="filter-button">
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* User Table */}
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
                  <UserRow
                    key={user.id}
                    user={user}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManajemenUser;