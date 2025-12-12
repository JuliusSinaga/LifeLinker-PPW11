import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import "../styles/ProfileAdmin.css"; // CSS Terpisah
import axiosClient from "../service/axiosClient";

export default function ProfilAdmin() {
  const [adminData, setAdminData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "Admin",
    department: "IT & Sistem", // Field statis atau bisa dari DB
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // Load Data dari LocalStorage saat pertama kali buka
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAdminData((prev) => ({
        ...prev,
        id: user.id,
        name: user.name || user.nama,
        email: user.email,
        phone: user.phone || user.no_hp || "",
        role: user.role || "Admin",
      }));
    }
  }, []);

  // Handle Perubahan Input Profil
  const handleProfileChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  // Handle Perubahan Input Password
  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // Simpan Profil
  const handleSaveProfile = async () => {
    try {
      // Panggil API Update User (Sesuaikan endpoint backend)
      // await axiosClient.put(`/users/${adminData.id}`, adminData);
      
      // Update LocalStorage agar data tidak hilang saat refresh
      const updatedUser = { ...JSON.parse(localStorage.getItem("user")), ...adminData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      alert("Profil berhasil diperbarui!");
      window.dispatchEvent(new Event("user-login")); // Update header/sidebar
    } catch (error) {
      console.error("Gagal update profil:", error);
      alert("Terjadi kesalahan saat menyimpan profil.");
    }
  };

  // Simpan Password
  const handleSavePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      alert("Konfirmasi password baru tidak cocok!");
      return;
    }
    if (passwords.new.length < 6) {
      alert("Password minimal 6 karakter.");
      return;
    }

    try {
      // Simulasi API Change Password
      // await axiosClient.post("/change-password", { ... });
      alert("Password berhasil diubah (Simulasi).");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (error) {
      alert("Gagal mengubah password.");
    }
  };

  // Metrik Statis (Bisa dibuat dinamis via API dashboard)
  const metrics = [
    { value: "20,847", title: "User Terdaftar", subtitle: "Seluruh Sumut", icon: "👥" },
    { value: "342", title: "Dokter Terverifikasi", subtitle: "30 Rumah Sakit", icon: "👨‍⚕️" },
    { value: "10,275", title: "Pendonor Aktif", subtitle: "Seluruh Provinsi", icon: "🩸" },
    { value: "47", title: "Event", subtitle: "Di berbagai RS", icon: "📅" },
    { value: "20,234", title: "Stok Darah", subtitle: "Kantong Darah", icon: "🧪" },
    { value: "587", title: "Event Terlaksana", subtitle: "Seluruh Provinsi", icon: "✅" },
  ];

  return (
    <div className="admin-layout">
      <SidebarAdmin />

      <main className="admin-main">
        <div className="profil-header">
          <h1 className="page-title">Profil Administrator</h1>
        </div>

        {/* METRICS CARDS */}
        <div className="metrics-grid">
          {metrics.map((m, idx) => (
            <div className="metric-card" key={idx}>
              <div className="metric-content">
                <div className="metric-value">{m.value}</div>
                <div className="metric-title">{m.title}</div>
                <div className="metric-subtitle">{m.subtitle}</div>
              </div>
              <div className="metric-icon">{m.icon}</div>
            </div>
          ))}
        </div>

        {/* FORM PROFIL */}
        <div className="profile-card">
          <h2 className="section-title">Edit Informasi Profil</h2>

          <div className="profile-grid">
            {/* Kolom Kiri: Form Input */}
            <div className="profile-left">
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  value={adminData.name}
                  onChange={handleProfileChange}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={adminData.email}
                  readOnly // Email biasanya tidak boleh diganti sembarangan
                  className="input-readonly"
                />
              </div>

              <div className="form-group">
                <label>Nomor Telepon</label>
                <input
                  type="text"
                  name="phone"
                  value={adminData.phone}
                  onChange={handleProfileChange}
                  placeholder="+62..."
                />
              </div>

              <div className="form-group">
                <label>Departemen / Role</label>
                <input
                  type="text"
                  value={`${adminData.department} - ${adminData.role}`}
                  readOnly
                  className="input-readonly"
                />
              </div>

              <div className="form-group">
                <label>Status Akun</label>
                <div className="status-badge-active">🟢 Aktif</div>
              </div>

              <button className="btn-save" onClick={handleSaveProfile}>
                Simpan Perubahan
              </button>
            </div>

            {/* Kolom Kanan: Foto Profil */}
            <div className="profile-right">
              <h3>Foto Profil</h3>
              <div className="avatar-preview">
                {/* Menggunakan Inisial jika tidak ada foto */}
                {adminData.name.charAt(0).toUpperCase()}
              </div>
              
              <p className="photo-name">{adminData.name}</p>
              <p className="photo-role">{adminData.role}</p>

              <div className="photo-actions">
                <button className="btn-upload">📁 Upload Foto</button>
                <button className="btn-delete">🗑️ Hapus</button>
              </div>
            </div>
          </div>
        </div>

        {/* FORM GANTI PASSWORD */}
        <div className="profile-card">
          <h2 className="section-title">Ubah Kata Sandi</h2>

          <div className="password-grid">
            <div className="form-group">
              <label>Password Saat Ini</label>
              <input
                type="password"
                name="current"
                value={passwords.current}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="form-group">
              <label>Password Baru</label>
              <input
                type="password"
                name="new"
                value={passwords.new}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="form-group">
              <label>Konfirmasi Password Baru</label>
              <input
                type="password"
                name="confirm"
                value={passwords.confirm}
                onChange={handlePasswordChange}
              />
            </div>
          </div>

          <button className="btn-save-password" onClick={handleSavePassword}>
            Update Password
          </button>
        </div>
      </main>
    </div>
  );
}