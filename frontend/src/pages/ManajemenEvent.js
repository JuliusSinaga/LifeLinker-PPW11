import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ManajemenEvent.css';

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

const ManajemenEvent = () => {
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');
  const [monthFilter, setMonthFilter] = useState('Semua Bulan');

  // Data statistik sesuai UI
  const metrics = [
    { value: '20,847', title: 'User Terdaftar', subtitle: 'Seluruh Sumatera Utara', icon: '👥', iconColor: '#dc2626' },
    { value: '342', title: 'Dokter Terverifikasi', subtitle: '30 Rumah Sakit', icon: '👨‍⚕️', iconColor: '#dc2626' },
    { value: '10,275', title: 'Pendonor Aktif', subtitle: 'Seluruh Provinsi', icon: '🩸', iconColor: '#dc2626' },
    { value: '47', title: 'Event', subtitle: 'Di berbagai RS', icon: '📅', iconColor: '#dc2626' },
    { value: '20,234', title: 'Stok Darah (kantong)', subtitle: '30 Rumah Sakit', icon: '🧪', iconColor: '#dc2626' },
    { value: '587', title: 'Event Terlaksana', subtitle: 'Seluruh Provinsi', icon: '✅', iconColor: '#dc2626' }
  ];

  // Sample event data sesuai UI
  const events = [
    {
      id: 1,
      name: 'Donor Darah Akbar',
      email: 'Dr. Amanda Sari, Sp.A',
      location: 'RSUP H. Adam Malik',
      date: '15 Nov 2024',
      status: 'Disetujui'
    },
    {
      id: 2,
      name: 'Pemeriksaan Kesehatan Gratis',
      email: 'Dr. Eko Prasetyo',
      location: 'RS HKBP Balige',
      date: '20 Nov 2024',
      status: 'Menunggu Persetujuan'
    },
    {
      id: 3,
      name: 'Sosialisasi Donor Darah',
      email: 'Dr. Siti Nurhaliza, Sp.JP',
      location: 'RSU Pirgandi',
      date: '25 Nov 2024',
      status: 'Ditolak'
    }
  ];

  // Filter events
  const filteredEvents = events.filter(event => {
    const nameMatch = nameFilter === '' || event.name.toLowerCase().includes(nameFilter.toLowerCase());
    const statusMatch = statusFilter === 'Semua Status' || event.status === statusFilter;
    // Simple month filter - in real app would parse date properly
    const monthMatch = monthFilter === 'Semua Bulan' || event.date.includes(monthFilter);
    return nameMatch && statusMatch && monthMatch;
  });

  return (
    <div className="manajemen-event-container">
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
          
          <Link to="/manajemen-event" className="nav-link active">
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

        {/* Event Management Section */}
        <div className="event-management-section">
          <h3 className="section-title">
            Manajemen Event
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
                Filter Status:
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="Semua Status">Semua Status</option>
                <option value="Disetujui">Disetujui</option>
                <option value="Menunggu Persetujuan">Menunggu Persetujuan</option>
                <option value="Ditolak">Ditolak</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">
                Filter Bulan:
              </label>
              <select
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="filter-select"
              >
                <option value="Semua Bulan">Semua Bulan</option>
                <option value="Nov">November</option>
                <option value="Dec">Desember</option>
              </select>
            </div>
          </div>

          {/* Event Table */}
          <div className="table-container">
            <table className="event-table">
              <thead className="table-header">
                <tr>
                  <th className="table-th">
                    Nama
                  </th>
                  <th className="table-th">
                    Email
                  </th>
                  <th className="table-th center">
                    Lokasi
                  </th>
                  <th className="table-th center">
                    Tanggal
                  </th>
                  <th className="table-th center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map(event => (
                  <tr key={event.id} className="table-row">
                    <td className="table-td">{event.name}</td>
                    <td className="table-td">{event.email}</td>
                    <td className="table-td center">{event.location}</td>
                    <td className="table-td center">{event.date}</td>
                    <td className="table-td center">
                      <div className="status-container">
                        <span className={`status-badge ${
                          event.status === 'Disetujui' ? 'status-approved' : 
                          event.status === 'Menunggu Persetujuan' ? 'status-pending' : 
                          'status-rejected'
                        }`}>
                          {event.status}
                        </span>
                        
                        {event.status === 'Menunggu Persetujuan' && (
                          <>
                            <button className="action-button approve-button">
                              ✓
                            </button>
                            <button className="action-button reject-button">
                              ✗
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredEvents.length === 0 && (
              <div className="empty-state">
                <p className="empty-message">Tidak ada event yang sesuai dengan filter yang dipilih.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManajemenEvent;