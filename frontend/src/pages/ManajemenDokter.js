import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ManajemenDokter.css';
import SidebarAdmin from "../components/SidebarAdmin";
import axiosClient from "../service/axiosClient";

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
        {/* Style color untuk icon tetap inline karena datanya dinamis dari props */}
        <div className="metric-icon" style={{ color: iconColor }}>{icon}</div>
      </div>
    </div>
  );
}

// DoctorRow component
function DoctorRow({ doctor, openModal, onVerify }) {
  const isWaiting = doctor.status === "pending";

  const getStatusLabel = (status) => {
    if (status === 'active') return 'Terverifikasi';
    if (status === 'pending') return 'Menunggu Verifikasi';
    return 'Ditolak';
  };

  const getStatusClass = (status) => {
    if (status === 'active') return 'status-verified';
    if (status === 'pending') return 'status-pending';
    return 'status-rejected';
  };

  return (
    <tr className="doctor-row">
      <td>{doctor.name}</td>
      <td>{doctor.hospital || "-"}</td>
      <td>{doctor.specialization || "Umum"}</td>
      <td>
        <span className={`status-badge ${getStatusClass(doctor.status)}`}>
          {getStatusLabel(doctor.status)}
        </span>
      </td>

      <td className="action-cell">
        <div className="action-buttons action-hover-area">
          <button
            className="action-button view-button"
            onClick={() => openModal(doctor)}
          >
            Lihat Info
          </button>

          <div className="action-animate-wrapper">
            <button
              className={`action-button verify-button ${!isWaiting ? "disabled-btn" : ""}`}
              disabled={!isWaiting}
              onClick={() => onVerify(doctor.id)}
              title="Verifikasi Dokter"
            >
              ✓
            </button>

            <button
              className={`action-button reject-button ${!isWaiting ? "disabled-btn" : ""}`}
              disabled={!isWaiting}
              title="Tolak"
            >
              ✗
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default function ManajemenDokter() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  const [nameFilter, setNameFilter] = useState('');
  const [strNumberFilter, setStrNumberFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get('/users'); 
      const allUsers = response.data.data || [];
      const doctorList = allUsers.filter(user => user.role === 'dokter');
      setDoctors(doctorList);
    } catch (error) {
      console.error("Gagal mengambil data dokter:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleVerify = async (id) => {
    if(!window.confirm("Yakin ingin memverifikasi dokter ini? Email notifikasi akan dikirim.")) return;

    try {
        await axiosClient.put(`/users/${id}/verify`);
        alert("Dokter berhasil diverifikasi!");
        fetchDoctors();
        setSelectedDoctor(null); // Tutup modal jika terbuka
    } catch (error) {
        console.error("Gagal verifikasi:", error);
        alert("Terjadi kesalahan saat verifikasi.");
    }
  };

  const totalDoctors = doctors.length;
  const verifiedDoctors = doctors.filter(d => d.status === 'active').length;
  const pendingDoctors = doctors.filter(d => d.status === 'pending').length;

  const metrics = [
    { value: totalDoctors, title: 'Total Dokter', subtitle: 'Terdaftar di Sistem', icon: '👨‍⚕️', iconColor: '#3b82f6' },
    { value: verifiedDoctors, title: 'Terverifikasi', subtitle: 'Siap Bertugas', icon: '✅', iconColor: '#10b981' },
    { value: pendingDoctors, title: 'Menunggu', subtitle: 'Perlu Verifikasi', icon: '⏳', iconColor: '#f59e0b' },
    { value: '30', title: 'Rumah Sakit', subtitle: 'Mitra LifeLinker', icon: '🏥', iconColor: '#dc2626' },
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const nameMatch = nameFilter === '' || (doctor.name && doctor.name.toLowerCase().includes(nameFilter.toLowerCase()));
    const strMatch = strNumberFilter === '' || (doctor.str_number && doctor.str_number.toLowerCase().includes(strNumberFilter.toLowerCase()));
    
    let statusMatch = true;
    if (statusFilter === 'Terverifikasi') statusMatch = doctor.status === 'active';
    if (statusFilter === 'Menunggu Verifikasi') statusMatch = doctor.status === 'pending';

    return nameMatch && strMatch && statusMatch;
  });

  return (
    <div className="manajemen-dokter-container">
      <SidebarAdmin />

      <main className="main-content">
        <header className="content-header">
          <h1 className="page-title">Dashboard Administrasi - Dokter</h1>
        </header>

        <div className="metrics-grid">
          {metrics.map((metric, i) => <MetricCard key={i} {...metric} />)}
        </div>

        <div className="doctors-table-container">
          <h3 className="table-title">Daftar Dokter</h3>

          <div className="filters-section">
            <div className="filters-grid">
              <div className="filter-group">
                <label className="filter-label">Filter Nama Dokter:</label>
                <input
                  type="text"
                  className="filter-input"
                  placeholder="Cari nama dokter..."
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">Filter Nomor STR:</label>
                <input
                  type="text"
                  className="filter-input"
                  placeholder="Cari nomor STR..."
                  value={strNumberFilter}
                  onChange={(e) => setStrNumberFilter(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">Status:</label>
                <select
                  className="filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="Semua Status">Semua Status</option>
                  <option value="Terverifikasi">Terverifikasi</option>
                  <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                </select>
              </div>
            </div>
          </div>

          <div className="table-container">
            {loading ? (
                <p className="loading-text">Memuat data dokter...</p>
            ) : (
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
                    {filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doctor) => (
                        <DoctorRow
                            key={doctor.id}
                            doctor={doctor}
                            openModal={setSelectedDoctor}
                            onVerify={handleVerify}
                        />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="empty-state-cell">Tidak ada data dokter ditemukan.</td>
                        </tr>
                    )}
                </tbody>
                </table>
            )}
          </div>
        </div>

        {selectedDoctor && (
          <div className="modal-overlay" onClick={() => setSelectedDoctor(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <h2 className="modal-title">Detail Dokter</h2>

              <div className="modal-content">
                <div className="detail-row"><strong>Nama:</strong> {selectedDoctor.name}</div>
                <div className="detail-row"><strong>Email:</strong> {selectedDoctor.email}</div>
                <div className="detail-row"><strong>Nomor HP:</strong> {selectedDoctor.phone}</div>
                <div className="detail-row"><strong>Kota:</strong> {selectedDoctor.city}</div>
                
                <hr className="modal-separator"/>
                
                <div className="detail-row"><strong>Nomor STR:</strong> {selectedDoctor.str_number}</div>
                <div className="detail-row"><strong>Spesialisasi:</strong> {selectedDoctor.specialization}</div>
                <div className="detail-row"><strong>Instansi/RS:</strong> {selectedDoctor.hospital}</div>
                <div className="detail-row">
                    <strong>Status:</strong> 
                    <span className={`modal-status-badge ${selectedDoctor.status === 'active' ? 'verified' : 'pending'}`}>
                        {selectedDoctor.status === 'active' ? 'Terverifikasi' : 'Menunggu Verifikasi'}
                    </span>
                </div>
              </div>

              <div className="modal-actions">
                {selectedDoctor.status === 'pending' && (
                    <button 
                        className="action-button verify-button modal-verify-btn" 
                        onClick={() => handleVerify(selectedDoctor.id)}
                    >
                        Verifikasi Sekarang
                    </button>
                )}
                <button className="modal-close" onClick={() => setSelectedDoctor(null)}>
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}