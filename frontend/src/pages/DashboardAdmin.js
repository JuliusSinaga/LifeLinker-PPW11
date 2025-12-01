import React from 'react';
import { Link } from 'react-router-dom';
import "./DashboardAdmin.css";

// MetricCard component for displaying statistics
function MetricCard({ value, title, subtitle, icon, iconColor }) {
  return (
    <div className="metric-card">
      <div className="metric-content">
        <div className="metric-value">{value}</div>
        <div className="metric-title">{title}</div>
        <div className="metric-subtitle">{subtitle}</div>
      </div>
      <div className="metric-icon" style={{ color: iconColor }}>{icon}</div>
    </div>
  );
}

// BloodTypeCard component for blood stock display
function BloodTypeCard({ type, count, color }) {
  const colorMap = {
    'red': '#dc2626',
    'green': '#16a34a', 
    'orange': '#ea580c',
    'blue': '#2563eb'
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '15px 0'
    }}>
      <div style={{
        width: '4px',
        height: '40px',
        backgroundColor: colorMap[color],
        borderRadius: '2px'
      }}></div>
      <div>
        <div style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: colorMap[color]
        }}>
          {count}
        </div>
        <div style={{
          fontSize: '12px',
          color: '#6b7280'
        }}>
          {type}
        </div>
      </div>
    </div>
  );
}

// Notification component
function NotificationCard({ title, message, time, type }) {
  const typeColors = {
    'blue': '#3b82f6',
    'yellow': '#f59e0b',
    'red': '#ef4444',
    'pink': '#ec4899'
  };

  const bgColors = {
    'blue': '#dbeafe',
    'yellow': '#fef3c7',
    'red': '#fee2e2',
    'pink': '#fce7f3'
  };

  return (
    <div style={{
      backgroundColor: bgColors[type],
      borderLeft: `4px solid ${typeColors[type]}`,
      padding: '16px 20px',
      borderRadius: '10px',
      marginBottom: '16px'
    }}>
      <div style={{
        fontSize: '15px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '6px'
      }}>
        {title}
      </div>
      <div style={{
        fontSize: '13px',
        color: '#4b5563',
        marginBottom: '6px'
      }}>
        {message}
      </div>
      <div style={{
        fontSize: '12px',
        color: '#9ca3af'
      }}>
        {time}
      </div>
    </div>
  );
}

// Event item component
function EventItem({ title, location, date }) {
  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      padding: '16px 20px',
      borderRadius: '10px',
      marginBottom: '12px',
      border: '1px solid #e9ecef'
    }}>
      <div style={{
        fontSize: '15px',
        fontWeight: '500',
        color: '#1f2937',
        marginBottom: '6px'
      }}>
        {title}
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '13px',
        color: '#6b7280'
      }}>
        <span>{location}</span>
        <span>{date}</span>
      </div>
    </div>
  );
}

export default function DashboardAdmin() {
  // Data matching the exact UI design
  const metrics = [
    { value: '20,847', title: 'User Terdaftar', subtitle: 'Seluruh Sumatera Utara', icon: '👥', iconColor: '#dc2626' },
    { value: '342', title: 'Dokter Terverifikasi', subtitle: '30 Rumah Sakit', icon: '👨‍⚕️', iconColor: '#dc2626' },
    { value: '10,275', title: 'Pendonor Aktif', subtitle: 'Seluruh Provinsi', icon: '🩸', iconColor: '#dc2626' },
    { value: '47', title: 'Event', subtitle: 'Di berbagai RS', icon: '📅', iconColor: '#dc2626' },
    { value: '20,234', title: 'Stok Darah (kantong)', subtitle: '30 Rumah Sakit', icon: '🧪', iconColor: '#dc2626' },
    { value: '587', title: 'Event Terlaksana', subtitle: 'Seluruh Provinsi', icon: '✅', iconColor: '#dc2626' }
  ];

  const bloodStock = [
    { type: 'Golongan A', count: '312', color: 'red' },
    { type: 'Golongan B', count: '628', color: 'green' },
    { type: 'Golongan B', count: '184', color: 'orange' },
    { type: 'Golongan B', count: '1270', color: 'blue' }
  ];

  const notifications = [
    { title: 'Request Akun Dokter', message: 'Dr. Amanda Sari Mengajukan Verifikasi', time: '2 jam lalu', type: 'blue' },
    { title: 'Request Event Baru', message: 'Donor Darah Akbar - RSUP Porsea', time: '4 jam lalu', type: 'yellow' },
    { title: 'Stok Darah Menipis', message: 'Golongan AB hanya tersisa 25 kantong', time: '1 hari lalu', type: 'red' },
    { title: 'Darah Hampir Kadaluwarsa', message: '5 kantong akan kadaluwarsa dalam 3 hari', time: '1 hari lalu', type: 'pink' }
  ];

  const events = [
    { title: 'Donor Darah di RSUD Porsea', location: 'RSUD Porsea', date: '12 Januari 2025' },
    { title: 'Sosialisasi Donor Darah', location: 'RS HKBP Balige', date: '08 April 2025' },
    { title: 'Donor Darah IT Del', location: 'IT Del', date: '24 Oktober 2025' }
  ];

  return (
    <div className="dashboard-admin">
      {/* Sidebar */}
      <aside className="sidebar">
        {/* Logo */}
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              ❤️
            </div>
            <div className="logo-text">
              <div className="logo-main">LifeLinker</div>
              <div className="logo-sub">Admin</div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="sidebar-nav">
          <Link to="/dashboard-admin" className="nav-item active">
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </Link>
          
          <Link to="/manajemen-dokter" className="nav-item">
            <span className="nav-icon">👨‍⚕️</span>
            <span>Manajemen Dokter</span>
          </Link>
          
          <Link to="/manajemen-user" className="nav-item">
            <span className="nav-icon">👤</span>
            <span>Manajemen User</span>
          </Link>
          
          <Link to="/manajemen-event" className="nav-item">
            <span className="nav-icon">📋</span>
            <span>Manajemen Event</span>
          </Link>
          
          <Link to="/manajemen-pendonor" className="nav-item">
            <span className="nav-icon">🩸</span>
            <span>Manajemen Pendonor</span>
          </Link>
          
          <Link to="/laporan" className="nav-item">
            <span className="nav-icon">📈</span>
            <span>Laporan</span>
          </Link>
          
          <Link to="/profil-admin" className="nav-item">
            <span className="nav-icon">👤</span>
            <span>Profile</span>
          </Link>
        </nav>

        {/* Logout */}
        <div className="sidebar-logout">
          <Link to="/logout" className="nav-item">
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

        {/* Metrics Grid - 3x2 layout */}
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

        {/* Blood Stock Section */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #f1f5f9'
        }}>
          <h3 style={{margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#1f2937'}}>
            Stok Darah terkini
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px'
          }}>
            {bloodStock.map((blood, index) => (
              <BloodTypeCard
                key={index}
                type={blood.type}
                count={blood.count}
                color={blood.color}
              />
            ))}
          </div>
        </div>

        {/* Bottom Grid Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '20px'
        }}>
          {/* Left Column - Chart and Events */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
            {/* Chart Card */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: '1px solid #f1f5f9'
            }}>
              <h4 style={{margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#1f2937'}}>
                Perkembangan Stok Darah
              </h4>
              <div style={{height: '220px', background: '#fafafa', borderRadius: '8px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <svg viewBox="0 0 320 180" style={{width: '100%', height: '100%', maxHeight: '160px'}}>
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid" width="40" height="36" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 36" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Chart line */}
                  <polyline
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="3"
                    points="40,140 100,100 160,80 220,110 280,90"
                  />
                  
                  {/* Data points */}
                  <circle cx="40" cy="140" r="4" fill="#dc2626" />
                  <circle cx="100" cy="100" r="4" fill="#dc2626" />
                  <circle cx="160" cy="80" r="4" fill="#dc2626" />
                  <circle cx="220" cy="110" r="4" fill="#dc2626" />
                  <circle cx="280" cy="90" r="4" fill="#dc2626" />
                  
                  {/* Y-axis labels */}
                  <text x="8" y="148" fontSize="11" fill="#6b7280">400</text>
                  <text x="8" y="112" fontSize="11" fill="#6b7280">500</text>
                  <text x="8" y="76" fontSize="11" fill="#6b7280">600</text>
                  <text x="8" y="40" fontSize="11" fill="#6b7280">700</text>
                  <text x="8" y="165" fontSize="10" fill="#6b7280">mg</text>
                </svg>
              </div>
            </div>

            {/* Events Card */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: '1px solid #f1f5f9'
            }}>
              <h4 style={{margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#1f2937'}}>
                Event per Bulan
              </h4>
              <div>
                {events.map((event, index) => (
                  <EventItem
                    key={index}
                    title={event.title}
                    location={event.location}
                    date={event.date}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Notifications */}
          <div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: '1px solid #f1f5f9'
            }}>
              <h4 style={{margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#1f2937'}}>
                Notifikasi Terbaru
              </h4>
              <div>
                {notifications.map((notification, index) => (
                  <NotificationCard
                    key={index}
                    title={notification.title}
                    message={notification.message}
                    time={notification.time}
                    type={notification.type}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}