import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfilAdmin.css';

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

const ProfilAdmin = () => {
  const [formData, setFormData] = useState({
    namaLengkap: 'Admin LifeLinker',
    email: 'admin@lifelinker.com',
    nomorTelepon: '+62 812-3456-7890',
    departemen: 'IT & Sistem',
    passwordSaatIni: '',
    passwordBaru: '',
    konfirmasiPassword: '',
    statusAkun: 'Aktif'
  });

  const [profileImage, setProfileImage] = useState('/api/placeholder/150/150');

  // Data statistik sesuai UI
  const metrics = [
    { value: '20,847', title: 'User Terdaftar', subtitle: 'Seluruh Sumatera Utara', icon: '👥', iconColor: '#dc2626' },
    { value: '342', title: 'Dokter Terverifikasi', subtitle: '30 Rumah Sakit', icon: '👨‍⚕️', iconColor: '#dc2626' },
    { value: '10,275', title: 'Pendonor Aktif', subtitle: 'Seluruh Provinsi', icon: '🩸', iconColor: '#dc2626' },
    { value: '47', title: 'Event', subtitle: 'Di berbagai RS', icon: '📅', iconColor: '#dc2626' },
    { value: '20,234', title: 'Stok Darah (kantong)', subtitle: '30 Rumah Sakit', icon: '🧪', iconColor: '#dc2626' },
    { value: '587', title: 'Event Terlaksana', subtitle: 'Seluruh Provinsi', icon: '✅', iconColor: '#dc2626' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form data:', formData);
    alert('Profil berhasil diperbarui!');
  };

  return (
    <div className="profil-admin-container">
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
          
          <Link to="/profil-admin" className="nav-link active">
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

        {/* Edit Profile Section */}
        <div className="edit-profile-section">
          <div className="section-header">
            <span className="section-icon">⚙️</span>
            <h3 className="section-title">Edit Informasi Profile</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-grid">
              {/* Left Column */}
              <div className="form-column">
                <div className="form-group">
                  <label className="form-label">Nama Lengkap</label>
                  <input
                    type="text"
                    name="namaLengkap"
                    value={formData.namaLengkap}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Admin LifeLinker"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="admin@lifelinker.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Nomor Telepon</label>
                  <input
                    type="tel"
                    name="nomorTelepon"
                    value={formData.nomorTelepon}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="+62 812-3456-7890"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Departemen</label>
                  <input
                    type="text"
                    name="departemen"
                    value={formData.departemen}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="IT & Sistem"
                  />
                </div>
              </div>

              {/* Middle Column */}
              <div className="form-column">
                <div className="form-group">
                  <label className="form-label">Password Saat Ini</label>
                  <input
                    type="password"
                    name="passwordSaatIni"
                    value={formData.passwordSaatIni}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="••••••••"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Password Baru</label>
                  <input
                    type="password"
                    name="passwordBaru"
                    value={formData.passwordBaru}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Password baru"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Konfirmasi Password Baru</label>
                  <input
                    type="password"
                    name="konfirmasiPassword"
                    value={formData.konfirmasiPassword}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Konfirmasi password"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Status Akun</label>
                  <div className="status-display">
                    <span className="status-badge status-active">
                      ✓ Aktif
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column - Profile Photo */}
              <div className="form-column profile-photo-column">
                <div className="form-group">
                  <label className="form-label">Foto Profile</label>
                  <div className="photo-upload-section">
                    <div className="photo-container">
                      <div className="profile-photo-wrapper">
                        <img
                          src={profileImage}
                          alt="Admin Profile"
                          className="profile-photo"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNjAiIHI9IjI1IiBmaWxsPSIjOUIxMDFDIi8+CjxwYXRoIGQ9Ik0zMCAxMjBDMzAgMTA0LjUzNiA0OC41MzYgODYgNzUgODZTMTIwIDEwNC41MzYgMTIwIDEyMFYxNTBIMzBWMTIwWiIgZmlsbD0iIzlCMTAxQyIvPgo8L3N2Zz4K';
                          }}
                        />
                      </div>
                      <div className="photo-info">
                        <div className="photo-name">Admin LifeLinker</div>
                        <div className="photo-department">IT & Sistem</div>
                      </div>
                    </div>
                    
                    <div className="photo-upload-buttons">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="file-input"
                        id="photo-upload"
                      />
                      <label htmlFor="photo-upload" className="upload-btn">
                        📁 Pilih Foto
                      </label>
                      <span className="upload-info">Tidak ada file dipilih</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProfilAdmin;