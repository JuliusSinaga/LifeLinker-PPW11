import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Laporan.css';

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

const Laporan = () => {
  const [nameFilter, setNameFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
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

  // Sample laporan event data sesuai UI
  const reportEvents = [
    {
      id: 1,
      name: 'Donor Darah Kemerdekaan',
      location: 'RSUP H. Adam Malik',
      date: '17 Agustus 2024',
      participants: '150/200',
      status: 'Selesai'
    },
    {
      id: 2,
      name: 'Pemeriksaan Kesehatan Gratis',
      location: 'RS HKBP Balige',
      date: '15 September 2024',
      participants: '0/300',
      status: 'Dibatalkan'
    },
    {
      id: 3,
      name: 'Donor Darah Ramadan',
      location: 'RSU Pirgandi',
      date: '20 April 2024',
      participants: '120/150',
      status: 'Selesai'
    }
  ];

  // Filter reports
  const filteredReports = reportEvents.filter(report => {
    const nameMatch = nameFilter === '' || report.name.toLowerCase().includes(nameFilter.toLowerCase());
    const dateMatch = dateFilter === '' || report.date.includes(dateFilter);
    const statusMatch = statusFilter === 'Semua Status' || report.status === statusFilter;
    return nameMatch && dateMatch && statusMatch;
  });

  return (
    <div className="laporan-container">
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

        {/* Laporan Event Section */}
        <div className="laporan-section">
          <h3 className="section-title">
            Laporan Event
          </h3>
          
          {/* Filter Section */}
          <div className="filter-section">
            <div className="filter-group">
              <label className="filter-label">
                Filter Nama Event:
              </label>
              <input
                type="text"
                placeholder="Cari nama event..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="filter-input"
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">
                Filter Tanggal:
              </label>
              <input
                type="text"
                placeholder="Cari Tanggal..."
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="filter-input"
              />
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
                <option value="Selesai">Selesai</option>
                <option value="Dibatalkan">Dibatalkan</option>
                <option value="Berlangsung">Berlangsung</option>
              </select>
            </div>
          </div>

          {/* Report Table */}
          <div className="table-container">
            <table className="laporan-table">
              <thead className="table-header">
                <tr>
                  <th className="table-th">
                    Nama Event
                  </th>
                  <th className="table-th center">
                    Lokasi
                  </th>
                  <th className="table-th center">
                    Tanggal
                  </th>
                  <th className="table-th center">
                    Peserta
                  </th>
                  <th className="table-th center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map(report => (
                  <tr key={report.id} className="table-row">
                    <td className="table-td">{report.name}</td>
                    <td className="table-td center">{report.location}</td>
                    <td className="table-td center">{report.date}</td>
                    <td className="table-td center">
                      <span className="participants-count">{report.participants}</span>
                    </td>
                    <td className="table-td center">
                      <span className={`status-badge ${
                        report.status === 'Selesai' ? 'status-completed' : 
                        report.status === 'Dibatalkan' ? 'status-cancelled' : 
                        'status-ongoing'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredReports.length === 0 && (
              <div className="empty-state">
                <p className="empty-message">Tidak ada laporan yang sesuai dengan filter yang dipilih.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Laporan;