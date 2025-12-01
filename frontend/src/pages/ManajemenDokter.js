import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ManajemenDokter.css';

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

// DoctorRow component untuk setiap baris dokter
function DoctorRow({ doctor }) {
  const getStatusBadge = (status) => {
    if (status === 'Terverifikasi') {
      return <span className="status-badge status-verified">Terverifikasi</span>;
    } else if (status === 'Menunggu Verifikasi') {
      return <span className="status-badge status-pending">Menunggu Verifikasi</span>;
    } else {
      return <span className="status-badge status-rejected">Ditolak</span>;
    }
  };

  const getActionButtons = (status) => {
    if (status === 'Terverifikasi') {
      return (
        <div className="action-buttons">
          <button className="action-button view-button">
            Lihat Info
          </button>
        </div>
      );
    } else if (status === 'Menunggu Verifikasi') {
      return (
        <div className="action-buttons">
          <button className="action-button view-button">
            Lihat Info
          </button>
          <button className="action-button verify-button">
            ✓
          </button>
          <button className="action-button reject-button">
            ✗
          </button>
        </div>
      );
    } else {
      return (
        <div className="action-buttons">
          <button className="action-button view-button">
            Lihat Info
          </button>
        </div>
      );
    }
  };

  return (
    <tr>
      <td>{doctor.name}</td>
      <td>{doctor.hospital}</td>
      <td>{doctor.specialization}</td>
      <td>{getStatusBadge(doctor.status)}</td>
      <td>{getActionButtons(doctor.status)}</td>
    </tr>
  );
}

export default function ManajemenDokter() {
  const [nameFilter, setNameFilter] = useState('');
  const [strNumberFilter, setStrNumberFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');

  // Sample data untuk metrics - sesuai Dashboard Administrasi
  const metrics = [
    { value: '20,847', title: 'User Terdaftar', subtitle: 'Seluruh Sumatera Utara', icon: '👥', iconColor: '#dc2626' },
    { value: '342', title: 'Dokter Terverifikasi', subtitle: '30 Rumah Sakit', icon: '👨‍⚕️', iconColor: '#dc2626' },
    { value: '10,275', title: 'Pendonor Aktif', subtitle: 'Seluruh Provinsi', icon: '🩸', iconColor: '#dc2626' },
    { value: '47', title: 'Event', subtitle: 'Di berbagai RS', icon: '📅', iconColor: '#dc2626' },
    { value: '20,234', title: 'Stok Darah (kantong)', subtitle: '30 Rumah Sakit', icon: '🧪', iconColor: '#dc2626' },
    { value: '587', title: 'Event Terlaksana', subtitle: 'Seluruh Provinsi', icon: '✅', iconColor: '#dc2626' }
  ];

  // Sample data untuk dokter - sesuai UI
  const doctors = [
    {
      id: 1,
      name: 'Dr. Amanda Sari, Sp.A',
      hospital: 'RSUP H. Adam Malik',
      specialization: 'Spesialis Anak',
      status: 'Terverifikasi'
    },
    {
      id: 2,
      name: 'Dr. Eko Prasetyo',
      hospital: 'RS HKBP Balige',
      specialization: 'Dokter Umum',
      status: 'Menunggu Verifikasi'
    },
    {
      id: 3,
      name: 'Dr. Siti Nurhaliza, Sp.JP',
      hospital: 'RSU Pirgandi',
      specialization: 'Spesialis Jantung',
      status: 'Terverifikasi'
    }
  ];

  // Filter doctors berdasarkan input
  const filteredDoctors = doctors.filter(doctor => {
    const nameMatch = nameFilter === '' || doctor.name.toLowerCase().includes(nameFilter.toLowerCase());
    const statusMatch = statusFilter === 'Semua Status' || doctor.status === statusFilter;
    return nameMatch && statusMatch;
  });

  return (
    <div className="manajemen-dokter-container">
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
          
          <Link to="/manajemen-dokter" className="nav-link active">
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

        {/* Doctor Management Section */}
        <div className="doctors-table-container">
          <div className="table-header">
            <h3 className="table-title">
              Daftar Dokter
            </h3>
          </div>
          
          {/* Filter Section */}
          <div className="filters-section">
            <div className="filters-grid">
              <div className="filter-group">
                <label className="filter-label">
                  Filter Nama Dokter:
                </label>
                <input
                  type="text"
                  placeholder="Cari nama dokter..."
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  className="filter-input"
                />
              </div>
              
              <div className="filter-group">
                <label className="filter-label">
                  Filter Nomor STR:
                </label>
                <input
                  type="text"
                  placeholder="Cari nomor STR..."
                  value={strNumberFilter}
                  onChange={(e) => setStrNumberFilter(e.target.value)}
                  className="filter-input"
                />
              </div>
              
              <div className="filter-group">
                <label className="filter-label">
                  Status:
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="Semua Status">Semua Status</option>
                  <option value="Terverifikasi">Terverifikasi</option>
                  <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                </select>
              </div>
              
              <div className="filter-group">
                <button className="filter-button">
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Doctor Table */}
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
                {filteredDoctors.map(doctor => (
                  <DoctorRow
                    key={doctor.id}
                    doctor={doctor}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}