import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import { FaSignOutAlt } from "react-icons/fa";
import Header from "../../components/Header";
import axiosClient from "../../service/axiosClient"; // 1. Import axiosClient

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profil");
  const navigate = useNavigate();

  // State untuk Data User (Form)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    blood_type: "O",
    rhesus: "+",
    weight: "",
    birth_date: "",
    gender: "Laki-laki",
    role: "pengguna"
  });

  // State untuk Statistik & Riwayat
  const [stats, setStats] = useState({
    totalDonations: 0,
    livesSaved: 0,
    nextDonor: "-",
    history: []
  });

  // 1. Load Data User dari LocalStorage saat Mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    // Proteksi: Jika belum login, tendang ke halaman login
    if (!storedUser) {
      navigate("/login-pengguna");
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      // Isi form dengan data user
      setFormData(prev => ({
        ...prev,
        ...user
      }));

      // Ambil data statistik dari backend
      if (user.id) {
        fetchDonationHistory(user.id);
      }
    } catch (e) {
      console.error("Error parsing user data:", e);
    }
  }, [navigate]);

  // 2. Fetch Riwayat Donasi dari Backend
  const fetchDonationHistory = async (userId) => {
    try {
      const response = await axiosClient.get(`/donations?user_id=${userId}`);
      const data = response.data.data || [];

      // Filter yang statusnya Approved
      const approvedDonations = data.filter(d => d.status === "Approved");
      
      // Urutkan dari yang terbaru
      const sortedHistory = data.sort((a, b) => new Date(b.donation_date) - new Date(a.donation_date));

      // Hitung Tanggal Donor Berikutnya (3 bulan dari terakhir)
      let nextDateStr = "-";
      if (approvedDonations.length > 0) {
        const lastDonationDate = new Date(approvedDonations[0].donation_date);
        const nextDate = new Date(lastDonationDate);
        nextDate.setMonth(nextDate.getMonth() + 3);
        
        // Cek apakah sudah lewat hari ini?
        const today = new Date();
        const diffTime = nextDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        nextDateStr = diffDays > 0 ? `${diffDays} Hari Lagi` : "Bisa Sekarang!";
      } else {
        nextDateStr = "Siap Donor";
      }

      setStats({
        totalDonations: approvedDonations.length,
        livesSaved: approvedDonations.length * 3, // Asumsi 1 kantong = 3 nyawa
        nextDonor: nextDateStr,
        history: sortedHistory
      });

    } catch (error) {
      console.error("Gagal mengambil riwayat donasi:", error);
    }
  };

  // Helper Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 3. Simpan Perubahan Profil
  const handleSave = () => {
    // Update LocalStorage
    localStorage.setItem("user", JSON.stringify(formData));
    
    // Kirim sinyal agar Header update nama
    window.dispatchEvent(new Event("user-login"));
    
    alert("Profil berhasil diperbarui!");
  };

  // 4. Logout Logic
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("user-login")); // Reset header
    navigate("/login-pengguna");
  };

  // Helper Format Tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric", month: "short", year: "numeric"
    });
  };

  return (
    <div className="profile-root">
      <Header />

      <main className="profile-main">
        <div className="profile-container">
          
          {/* SIDEBAR PROFIL */}
          <div className="profile-sidebar">
            <div className="profile-user-card">
              <div className="profile-user-avatar">
                <img
                  src={process.env.PUBLIC_URL + "/images/budi-avatar.png"}
                  alt={formData.name}
                  onError={(e) => {e.target.onerror = null; e.target.src="https://via.placeholder.com/150"}}
                />
              </div>
              <h3>{formData.name || "Pengguna"}</h3>
              <p>{formData.city || "Kota belum diisi"}</p>
              
              <button className="btn-logout" onClick={handleLogout}>
                <FaSignOutAlt /> Keluar
              </button>
            </div>

            <div className="profile-donor-card">
              <div className="donor-card-header">
                <h4>KARTU DONOR DIGITAL</h4>
              </div>
              <div className="donor-card-blood-type">
                {formData.blood_type}{formData.rhesus}
              </div>
              <div className="donor-card-info">
                <div className="donor-card-row">
                  <span>Tanggal Lahir</span>
                  <span>Jenis Kelamin</span>
                </div>
                <div className="donor-card-row">
                  <span>{formData.birth_date ? formatDate(formData.birth_date) : "-"}</span>
                  <span>{formData.gender}</span>
                </div>
              </div>
            </div>
          </div>

          {/* KONTEN UTAMA */}
          <div className="profile-content">
            <div className="profile-tabs">
              <button
                className={`profile-tab ${activeTab === "profil" ? "active" : ""}`}
                onClick={() => setActiveTab("profil")}
              >
                Profil Saya
              </button>
              <button
                className={`profile-tab ${activeTab === "statistik" ? "active" : ""}`}
                onClick={() => setActiveTab("statistik")}
              >
                Statistik & Riwayat
              </button>
              <button
                className={`profile-tab ${activeTab === "pengaturan" ? "active" : ""}`}
                onClick={() => setActiveTab("pengaturan")}
              >
                Pengaturan Akun
              </button>
            </div>

            {/* TAB 1: FORM PROFIL */}
            {activeTab === "profil" && (
              <div className="profile-form-section">
                <h3>Informasi Pribadi & Medis</h3>
                <div className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nama Lengkap</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                      />
                    </div>
                    <div className="form-group">
                      <label>Tanggal Lahir</label>
                      <input 
                        type="date" 
                        name="birth_date" 
                        value={formData.birth_date ? formData.birth_date.split('T')[0] : ""} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Jenis Kelamin</label>
                      <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Nomor Telepon</label>
                      <input 
                        type="text" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Kota Domisili</label>
                      <input 
                        type="text" 
                        name="city" 
                        value={formData.city} 
                        onChange={handleChange} 
                      />
                    </div>
                    <div className="form-group">
                      <label>Golongan Darah</label>
                      <select name="blood_type" value={formData.blood_type} onChange={handleChange}>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Rhesus</label>
                      <select name="rhesus" value={formData.rhesus} onChange={handleChange}>
                        <option value="+">+</option>
                        <option value="-">-</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Berat Badan (kg)</label>
                      <input 
                        type="number" 
                        name="weight" 
                        value={formData.weight} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button className="btn-save" onClick={handleSave}>Simpan Perubahan</button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: STATISTIK & RIWAYAT (DARI BACKEND) */}
            {activeTab === "statistik" && (
              <div className="profile-stats">
                <h3>Statistik Kebaikan Anda</h3>

                <div className="stats-summary">
                  <div className="stat-box">
                    <div className="stat-number">{stats.totalDonations}</div>
                    <div className="stat-label">Total Donasi</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-number">{stats.livesSaved}</div>
                    <div className="stat-label">Nyawa Terselamatkan</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-number" style={{fontSize:'2rem'}}>{stats.nextDonor}</div>
                    <div className="stat-label">Menuju Donor Berikutnya</div>
                  </div>
                </div>

                <div className="history-table">
                  <h3>Riwayat Donor Terakhir</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Tanggal</th>
                        <th>Lokasi/Keterangan</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.history.length > 0 ? (
                        stats.history.map((item, idx) => (
                          <tr key={idx}>
                            <td>{formatDate(item.donation_date)}</td>
                            <td>RSUP H. Adam Malik (Default)</td>
                            <td>
                              <span className={`status-badge ${item.status === 'Approved' ? 'success' : 'warning'}`}>
                                {item.status === 'Approved' ? 'Berhasil' : item.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" style={{textAlign:'center', padding:'20px'}}>Belum ada riwayat donor.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: PENGATURAN */}
            {activeTab === "pengaturan" && (
              <div className="profile-settings">
                <div className="settings-section">
                  <div className="form-group-full">
                    <label>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      className="settings-input"
                      readOnly
                      style={{backgroundColor: '#f3f4f6'}}
                    />
                  </div>

                  <div className="settings-password-row">
                    <div className="form-group">
                      <label>Password Lama</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="settings-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Password Baru</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="settings-input"
                      />
                    </div>
                  </div>

                  <div className="settings-actions">
                    <button className="btn-save-settings">Ganti Password</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}