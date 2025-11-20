import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.css";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profil");

  return (
    <div className="profile-root">
      {/* Shared Header Component with user profile display */}
      <Header showUserProfile={true} />

      <main className="profile-main">
        <div className="profile-container">
          <div className="profile-sidebar">
            <div className="profile-user-card">
              <div className="profile-user-avatar">
                <img
                  src={process.env.PUBLIC_URL + "/images/budi-avatar.png"}
                  alt="Budi Setiawan"
                />
              </div>
              <h3>Budi Setiawan</h3>
              <p>Medan, Sumatera Utara</p>
            </div>

            <div className="profile-donor-card">
              <div className="donor-card-header">
                <h4>KARTU DONOR DIGITAL</h4>
              </div>
              <div className="donor-card-blood-type">O+</div>
              <div className="donor-card-info">
                <div className="donor-card-row">
                  <span>Tanggal Lahir</span>
                  <span>Jenis Kelamin</span>
                </div>
                <div className="donor-card-row">
                  <span>15-08-1995</span>
                  <span>Laki-laki</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-content">
            <div className="profile-tabs">
              <button
                className={`profile-tab ${
                  activeTab === "profil" ? "active" : ""
                }`}
                onClick={() => setActiveTab("profil")}
              >
                Profil Saya
              </button>
              <button
                className={`profile-tab ${
                  activeTab === "statistik" ? "active" : ""
                }`}
                onClick={() => setActiveTab("statistik")}
              >
                Statistik & Riwayat
              </button>
              <button
                className={`profile-tab ${
                  activeTab === "pengaturan" ? "active" : ""
                }`}
                onClick={() => setActiveTab("pengaturan")}
              >
                Pengaturan Akun
              </button>
            </div>

            {activeTab === "profil" && (
              <div className="profile-form-section">
                <h3>Informasi Pribadi & Medis</h3>
                <div className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nama Lengkap</label>
                      <input type="text" value="Budi Setiawan" />
                    </div>
                    <div className="form-group">
                      <label>Tanggal Lahir</label>
                      <input type="text" value="15-08-1995" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Jenis Kelamin</label>
                      <select>
                        <option>Laki-laki</option>
                        <option>Perempuan</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Nomor Telepon</label>
                      <input type="text" value="089783565327" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Kota Domisili</label>
                      <input type="text" value="Medan" />
                    </div>
                    <div className="form-group">
                      <label>Golongan Darah</label>
                      <input type="text" value="O" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Rhesus</label>
                      <select>
                        <option>+</option>
                        <option>-</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Berat Badan (kg)</label>
                      <input type="text" value="70" />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button className="btn-save">Ubah</button>
                    <button className="btn-cancel">Simpan</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "statistik" && (
              <div className="profile-stats">
                <h3>Statistik Kebaikan Anda</h3>

                <div className="stats-summary">
                  <div className="stat-box">
                    <div className="stat-number">12</div>
                    <div className="stat-label">Total Donasi</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-number">36</div>
                    <div className="stat-label">Nyawa Terselamatkan</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-number">25 Hari</div>
                    <div className="stat-label">Menuju Donor Berikutnya</div>
                  </div>
                </div>

                <div className="history-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Tanggal</th>
                        <th>Lokasi</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>01 Okt 2025</td>
                        <td>PMI Medan City</td>
                        <td>
                          <span className="status-badge success">Berhasil</span>
                        </td>
                      </tr>
                      <tr>
                        <td>15 Jul 2025</td>
                        <td>Event di Balai Kota</td>
                        <td>
                          <span className="status-badge success">Berhasil</span>
                        </td>
                      </tr>
                      <tr>
                        <td>20 Apr 2025</td>
                        <td>Laguboti</td>
                        <td>
                          <span className="status-badge success">Berhasil</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "pengaturan" && (
              <div className="profile-settings">
                <div className="settings-section">
                  <div className="form-group-full">
                    <label>Email</label>
                    <input
                      type="email"
                      value="budi.setiawan@email.com"
                      className="settings-input"
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
                    <button className="btn-save-settings">Simpan</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Shared Footer Component */}
      <Footer />
    </div>
  );
}
