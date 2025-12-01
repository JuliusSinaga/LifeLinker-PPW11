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

<<<<<<< HEAD
export default function ManajemenEvent() {
  const [form, setForm] = useState({
    namaEvent: "",
    tanggalMulai: "",
    tanggalSelesai: "",
    lokasi: "",
    targetKantong: "",
    deskripsi: "",
    partner: "",
    targetDonor: "",
    unggahPoster: null,
  });

  const [requests, setRequests] = useState([
    { id: 1, nama: "Donor Darah Kemanusiaan", tanggal: "17 Apr 2025", lokasi: "IT DEL", status: "Disetujui" },
    { id: 2, nama: "Bakti Sosial 2025", tanggal: "11 Feb 2025", lokasi: "Lapangan Legi", status: "Menunggu" },
    { id: 3, nama: "Donor Darah Ramadhan", tanggal: "17 Mar 2025", lokasi: "Depan Pasar", status: "Ditolak" },
  ]);

  const completed = [
    { id: 1, title: "World Blood Donor Day 2024", date: "14 Jun 2024", donors: 127, units: 152, attendees: 152 },
    { id: 2, title: "Donor Darah Hari Kartini", date: "21 Apr 2024", donors: 89, units: 95, attendees: 89 },
  ];

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "unggahPoster") {
      setForm((s) => ({ ...s, unggahPoster: files && files[0] }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newReq = {
      id: Date.now(),
      nama: form.namaEvent || "(Belum diisi)",
      tanggal: form.tanggalMulai || "-",
      lokasi: form.lokasi || "-",
      status: "Menunggu",
    };
    setRequests((r) => [newReq, ...r]);
    setForm({
      namaEvent: "",
      tanggalMulai: "",
      tanggalSelesai: "",
      lokasi: "",
      targetKantong: "",
      deskripsi: "",
      partner: "",
      targetDonor: "",
      unggahPoster: null,
    });
  }

  return (
    <div className="me-page">
      <div className="me-appbar">
        <div className="me-appbar-inner">PPW Sistem Informasi Bank Darah Digital</div>
      </div>

      <div className="me-container">
        <aside className="me-sidebar-card">
          <div className="me-profile-compact">
            <img src="/images/doctor-avatar.png" alt="dokter" className="me-avatar-lg" />
            <div>
              <div className="me-name-lg">Dr. Anastasya</div>
              <div className="me-role-sm">Spesialis Hematologi</div>
            </div>
          </div>

          <nav className="me-nav-vertical">
            <a className="nav-item">Dashboard</a>
            <a className="nav-item">Manajemen Stok</a>
            <a className="nav-item active">Manajemen Event</a>
            <a className="nav-item">Konsultasi & Edukasi</a>
            <a className="nav-item">Profil Saya</a>
            <button className="me-logout-link">Logout</button>
          </nav>
        </aside>

        <main className="me-main-area">
          <h1 className="page-title">Request Event Donor Darah</h1>

          <div className="me-grid">
            <section className="me-left-col">
              <div className="panel form-panel">
                <div className="panel-header">
                  <h3>Formulir Pengajuan Event</h3>
                </div>

                <form onSubmit={handleSubmit} className="form-body" encType="multipart/form-data">
                  <div className="row two">
                    <div className="field">
                      <label>Nama Event</label>
                      <input name="namaEvent" value={form.namaEvent} onChange={handleChange} placeholder="Contoh: Donor Darah Sehat Bersama" />
                    </div>

                    <div className="field">
                      <label>Lokasi Event</label>
                      <input name="lokasi" value={form.lokasi} onChange={handleChange} placeholder="Contoh: Aula Utama RSUP H. Adam Malik" />
                    </div>
                  </div>

                  <div className="row two">
                    <div className="field">
                      <label>Tanggal Mulai</label>
                      <input type="date" name="tanggalMulai" value={form.tanggalMulai} onChange={handleChange} />
                    </div>

                    <div className="field">
                      <label>Tanggal Selesai</label>
                      <input type="date" name="tanggalSelesai" value={form.tanggalSelesai} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="row two">
                    <div className="field">
                      <label>Target Kantong Darah</label>
                      <input name="targetKantong" value={form.targetKantong} onChange={handleChange} placeholder="Contoh: 50" />
                    </div>

                    <div className="field">
                      <label>Unggah Poster (Opsional)</label>
                      <input type="file" name="unggahPoster" onChange={handleChange} />
                    </div>
                  </div>

                  <div className="field">
                    <label>Deskripsi</label>
                    <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} placeholder="Jelaskan detail mengenai acara ini" />
                  </div>

                  <div className="row two">
                    <div className="field">
                      <label>Partner / Sponsor</label>
                      <input name="partner" value={form.partner} onChange={handleChange} placeholder="Contoh: IT Del, PMI, Dinkes..." />
                    </div>

                    <div className="field">
                      <label>Target Donor</label>
                      <input name="targetDonor" value={form.targetDonor} onChange={handleChange} placeholder="Contoh: 50" />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button className="btn primary">Request Event</button>
                  </div>
                </form>
              </div>

              <div className="panel table-panel">
                <h4 className="panel-title">Status Pengajuan Event</h4>

                <div className="table-wrap">
                  <table className="styled-table">
                    <thead>
                      <tr>
                        <th>Nama Event</th>
                        <th>Tanggal</th>
                        <th>Lokasi</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((r) => (
                        <tr key={r.id}>
                          <td>{r.nama}</td>
                          <td>{r.tanggal}</td>
                          <td>{r.lokasi}</td>
                          <td>
                            <span className={`status ${r.status === "Disetujui" ? "ok" : r.status === "Menunggu" ? "pending" : "fail"}`}>
                              {r.status}
                            </span>
                          </td>
                          <td>
                            <div className="row actions-row">
                              <button className="btn sm ghost">View</button>
                              <button className="btn sm outline">Edit</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <aside className="me-right-col">
              <div className="panel small right-card">
                <h4>Event Yang Telah Selesai</h4>
                <div className="completed-list">
                  {completed.map((e) => (
                    <div className="completed-item" key={e.id}>
                      <div>
                        <div className="completed-title">{e.title}</div>
                        <div className="completed-date">{e.date}</div>
                      </div>
                      <div className="completed-count">
                        <div className="count">{e.donors}</div>
                        <div className="label">Donor</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel small right-card">
                <h4>Ringkasan Cepat</h4>
                <div className="summary-grid">
                  <div className="summary-card sc-red">
                    <div className="n">127</div>
                    <div className="t">Donor Terkumpul</div>
                  </div>
                  <div className="summary-card sc-blue">
                    <div className="n">152</div>
                    <div className="t">Unit Darah</div>
                  </div>
                  <div className="summary-card sc-green">
                    <div className="n">89</div>
                    <div className="t">Pendonor Hari Ini</div>
                  </div>
                  <div className="summary-card sc-yellow">
                    <div className="n">15</div>
                    <div className="t">Event Aktif</div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
=======
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
>>>>>>> a5f2186efca9891a1c834f580c60118c1fada696
    </div>
  );
}
