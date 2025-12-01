import React from "react";
import DokterSidebar from "../components/DokterSidebar";
import "../styles/ProfilDokter.css";

export default function ProfilDokter() {
  return (
    <div className="dokter-wrapper">
      <DokterSidebar />

      <main className="profil-container">

        <div className="profil-header">
          <h1>Profil Saya</h1>
          <button className="refresh-btn">🔄 Refresh Data</button>
        </div>

        {/* ======================== INFORMASI PROFESIONAL ======================= */}
        <section className="profil-card">
          <h2>Informasi Profesional & Pribadi</h2>

          <div className="profil-grid">
            <div className="form-group">
              <label>Nama Lengkap (dengan gelar)</label>
              <input defaultValue="Dr. Anastasya Silalahi, Sp.PD-KHOM" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input defaultValue="anastasya@gmail.com" />
            </div>

            <div className="form-group">
              <label>Nomor STR</label>
              <input defaultValue="12345362856372897" />
            </div>

            <div className="form-group">
              <label>Instansi</label>
              <input defaultValue="RSUP H. Adam Malik" />
            </div>

            <div className="form-group">
              <label>Spesialis</label>
              <input defaultValue="Spesialis Hematologi" />
            </div>

            <div className="form-group">
              <label>Kota Domisili</label>
              <input defaultValue="Medan" />
            </div>

            <div className="form-group">
              <label>Nomor Telepon</label>
              <input defaultValue="082117643656" />
            </div>
          </div>

          <button className="btn-primary">Simpan Perubahan</button>
        </section>

        {/* ======================== UBAH PASSWORD ============================ */}
        <section className="profil-card">
          <h2>Ubah Kata Sandi</h2>

          <div className="profil-grid">
            <div className="form-group">
              <label>Password Lama</label>
              <input type="password" />
            </div>

            <div className="form-group">
              <label>Password Baru</label>
              <input type="password" />
            </div>
          </div>

          <button className="btn-primary">Ubah Kata Sandi</button>
        </section>
      </main>
    </div>
  );
}
