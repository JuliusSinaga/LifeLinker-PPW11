import React from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import "../styles/ProfileAdmin.css";

export default function ProfileAdmin() {
  return (
    <div className="admin-layout">
      <SidebarAdmin />

      <main className="admin-main">
        <div className="profil-header">
          <h1>Dashboard Administrasi</h1>
        </div>

        {/* ====================== METRIC CARDS (SAMA SEPERTI HALAMAN LAIN) ====================== */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-content">
              <div className="metric-value">20,847</div>
              <div className="metric-title">User Terdaftar</div>
              <div className="metric-subtitle">Seluruh Sumut</div>
            </div>
            <div className="metric-icon">👥</div>
          </div>

          <div className="metric-card">
            <div className="metric-content">
              <div className="metric-value">342</div>
              <div className="metric-title">Dokter Terverifikasi</div>
              <div className="metric-subtitle">30 Rumah Sakit</div>
            </div>
            <div className="metric-icon">👨‍⚕️</div>
          </div>

          <div className="metric-card">
            <div className="metric-content">
              <div className="metric-value">10,275</div>
              <div className="metric-title">Pendonor Aktif</div>
              <div className="metric-subtitle">Seluruh Provinsi</div>
            </div>
            <div className="metric-icon">🩸</div>
          </div>

          <div className="metric-card">
            <div className="metric-content">
              <div className="metric-value">47</div>
              <div className="metric-title">Event</div>
              <div className="metric-subtitle">Di berbagai RS</div>
            </div>
            <div className="metric-icon">📅</div>
          </div>

          <div className="metric-card">
            <div className="metric-content">
              <div className="metric-value">20,234</div>
              <div className="metric-title">Stok Darah (Kantong)</div>
              <div className="metric-subtitle">30 Rumah Sakit</div>
            </div>
            <div className="metric-icon">🧪</div>
          </div>

          <div className="metric-card">
            <div className="metric-content">
              <div className="metric-value">587</div>
              <div className="metric-title">Event Terlaksana</div>
              <div className="metric-subtitle">Seluruh Provinsi</div>
            </div>
            <div className="metric-icon">✅</div>
          </div>
        </div>

        {/* ====================== FORM PROFIL ====================== */}
        <div className="profile-card">
          <h2 className="section-title">Edit Informasi Profile</h2>

          <div className="profile-grid">
            <div className="profile-left">

              <div className="form-group">
                <label>Nama Lengkap</label>
                <input type="text" defaultValue="Admin LifeLinker" />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="text" defaultValue="admin@lifelinker.com" />
              </div>

              <div className="form-group">
                <label>Nomor Telepon</label>
                <input type="text" defaultValue="+62 812-3456-7890" />
              </div>

              <div className="form-group">
                <label>Departemen</label>
                <input type="text" defaultValue="IT & Sistem" />
              </div>

              <div className="form-group">
                <label>Status Akun</label>
                <span className="status-active">🟢 Aktif</span>
              </div>
            </div>

            {/* FOTO PROFIL */}
            <div className="profile-right">
              <h3>Foto Profile</h3>

              <img
                src="/images/siti-avatar.png"
                alt="Admin Profile"
                className="profile-photo"
              />

              <p className="photo-name">Admin LifeLinker</p>
              <p className="photo-role">IT & Sistem</p>

              <div className="photo-actions">
                <button className="btn-upload">📁 Pilih Foto</button>
                <button className="btn-delete">🗑️ Hapus Foto</button>
              </div>
            </div>
          </div>
        </div>

        {/* ====================== UBAH PASSWORD ====================== */}
        <div className="profile-card">
          <h2 className="section-title">Ubah Kata Sandi</h2>

          <div className="password-grid">
            <div className="form-group">
              <label>Password Saat Ini</label>
              <input type="password" />
            </div>

            <div className="form-group">
              <label>Password Baru</label>
              <input type="password" />
            </div>

            <div className="form-group">
              <label>Konfirmasi Password Baru</label>
              <input type="password" />
            </div>
          </div>

          <button className="btn-save">Simpan Perubahan</button>
        </div>
      </main>
    </div>
  );
}
