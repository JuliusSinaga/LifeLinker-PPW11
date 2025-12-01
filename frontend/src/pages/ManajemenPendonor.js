import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ManajemenPendonor.css';

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

const ManajemenPendonor = () => {
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

  // Sample pendonor data sesuai UI
  const pendonors = [
    {
      id: 1,
      name: 'Andi Saputra',
      bloodType: 'O+',
      hospital: 'RS Harapan Kita',
      donorDate: '28 September 2025',
      donorCount: '3x',
      status: 'Aktif'
    },
    {
      id: 2,
      name: 'Budi Santoso',
      bloodType: 'A+',
      hospital: 'RSUD Tangerang',
      donorDate: '22 September 2025',
      donorCount: '5x',
      status: 'Aktif'
    },
    {
      id: 3,
      name: 'Dewi Sartika',
      bloodType: 'B+',
      hospital: 'RSUD Tangerang',
      donorDate: '20 September 2025',
      donorCount: '3x',
      status: 'Aktif'
    }
  ];

  // Filter pendonors
  const filteredPendonors = pendonors.filter(pendonor => {
    const nameMatch = nameFilter === '' || pendonor.name.toLowerCase().includes(nameFilter.toLowerCase());
    const bloodTypeMatch = bloodTypeFilter === 'Semua Golongan' || pendonor.bloodType === bloodTypeFilter;
    const statusMatch = statusFilter === 'Semua Status' || pendonor.status === statusFilter;
    return nameMatch && bloodTypeMatch && statusMatch;
  });

  return (
    <div className="manajemen-pendonor-container">
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
          
          <Link to="/manajemen-user" className="nav-link">
            <span className="nav-icon">👤</span>
            <span>Manajemen User</span>
          </Link>
          
          <Link to="/manajemen-event" className="nav-link">
            <span className="nav-icon">📋</span>
            <span>Manajemen Event</span>
          </Link>
          
          <Link to="/manajemen-pendonor" className="nav-link active">
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

        {/* Pendonor Management Section */}
        <div className="pendonor-management-section">
          <h3 className="section-title">
            Manajemen Pendonor
          </h3>
          
          {/* Filter Section */}
          <div className="filter-section">
            <div className="filter-group">
              <label className="filter-label">
                Filter Nama Pendonor:
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
          </div>

          {/* Pendonor Table */}
          <div className="table-container">
            <table className="pendonor-table">
              <thead className="table-header">
                <tr>
                  <th className="table-th">Nama</th>
                  <th className="table-th center">Gol. Darah</th>
                  <th className="table-th center">Rumah Sakit</th>
                  <th className="table-th center">Tanggal Donor</th>
                  <th className="table-th center">Jumlah Donor</th>
                  <th className="table-th center">Status</th>
                  <th className="table-th center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredPendonors.map(pendonor => (
                  <tr key={pendonor.id} className="table-row">
                    <td className="table-td">{pendonor.name}</td>
                    <td className="table-td center">
                      <span className={`blood-type-badge blood-${pendonor.bloodType.replace('+', 'pos').replace('-', 'neg')}`}>
                        {pendonor.bloodType}
                      </span>
                    </td>
                    <td className="table-td center">{pendonor.hospital}</td>
                    <td className="table-td center">{pendonor.donorDate}</td>
                    <td className="table-td center">
                      <span className="donor-count">{pendonor.donorCount}</span>
                    </td>
                    <td className="table-td center">
                      <span className={`status-badge ${pendonor.status === 'Aktif' ? 'status-active' : 'status-inactive'}`}>
                        {pendonor.status}
                      </span>
                    </td>
                    <td className="table-td center">
                      <div className="action-buttons">
                        <button className="action-button detail-button">
                          Detail
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pendonor Table */}
          <div className="table-container">
            <table className="pendonor-table">
              <thead className="table-header">
                <tr>
                  <th className="table-th">
                    Nama
                  </th>
                  <th className="table-th center">
                    Gol. Darah
                  </th>
                  <th className="table-th center">
                    Rumah Sakit
                  </th>
                  <th className="table-th center">
                    Tanggal Donor
                  </th>
                  <th className="table-th center">
                    Jumlah Donor
                  </th>
                  <th className="table-th center">
                    Status
                  </th>
                  <th className="table-th center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPendonors.map(pendonor => (
                  <tr key={pendonor.id} className="table-row">
                    <td className="table-td">{pendonor.name}</td>
                    <td className="table-td center">
                      <span className={`blood-type-badge blood-type-${pendonor.bloodType.replace('+', 'plus').replace('-', 'minus')}`}>
                        {pendonor.bloodType}
                      </span>
                    </td>
                    <td className="table-td center">{pendonor.hospital}</td>
                    <td className="table-td center">{pendonor.donorDate}</td>
                    <td className="table-td center">
                      <span className="donor-count">{pendonor.donorCount}</span>
                    </td>
                    <td className="table-td center">
                      <span className={`status-badge ${
                        pendonor.status === 'Aktif' ? 'status-active' : 
                        pendonor.status === 'Tidak Aktif' ? 'status-inactive' : 
                        'status-suspended'
                      }`}>
                        {pendonor.status}
                      </span>
                    </td>
                    <td className="table-td center">
                      <div className="action-buttons">
                        <button className="action-button detail-button">
                          Detail
                        </button>
                        <button className="action-button edit-button">
                          Aktif
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredPendonors.length === 0 && (
              <div className="empty-state">
                <p className="empty-message">Tidak ada pendonor yang sesuai dengan filter yang dipilih.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManajemenPendonor;