import React from "react";
import "./DaftarDokter.css";

export default function DaftarDokter() {
  return (
    <div className="doctor-register-container">
      {/* ===== Header ===== */}
      <h1 className="lifelinker-logo">
        Life<span className="red">Linker</span>
      </h1>

      {/* ===== Card Form ===== */}
      <div className="register-card">
        <h2>Pendaftaran Akun Dokter</h2>

        <div className="alert-info">
          <i className="fas fa-info-circle"></i>
          Akun Anda akan aktif setelah data dan Nomor STR berhasil diverifikasi oleh Admin.
        </div>

        <form>
          <h3>Informasi Akun</h3>
          <div className="form-row">
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
          </div>

          <h3>Informasi Profesional & Pribadi</h3>
          <div className="form-row">
            <input type="text" placeholder="Nama Lengkap (dengan gelar)" required />
          </div>

          <div className="form-row">
            <input type="text" placeholder="Nomor STR (Wajib)" required />
            <input type="text" placeholder="Spesialisasi" required />
          </div>

          <div className="form-row">
            <input type="text" placeholder="Nama Rumah Sakit / Instansi" required />
          </div>

          <div className="form-row">
            <input type="date" required />
            <select required>
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Pria">Pria</option>
              <option value="Wanita">Wanita</option>
            </select>
          </div>

          <div className="form-row">
            <input type="text" placeholder="Nomor Telepon (WhatsApp)" required />
            <input type="text" placeholder="Kota Domisili" required />
          </div>

          <button type="submit" className="btn-red">
            Daftar & Kirim Verifikasi
          </button>

          <p className="login-text">
            Sudah punya akun? <a href="/login-dokter">Masuk di sini</a>
          </p>
          <p className="back-link">
            <a href="/pilih-peran">← Kembali ke Pilih Peran</a>
          </p>
        </form>
      </div>

      {/* ===== Footer ===== */}
      <footer className="footer">
        <div className="footer-section">
          <h4 className="footer-title">
            Life<span className="red">Linker</span>
          </h4>
          <p>Dibuat Oleh Kelompok 11 PPW @2025</p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title red">Navigasi</h4>
          <p className="footer-links">
            Beranda | Lokasi Donor | Stok Darah | Event | Riwayat | Konsultasi
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title red">Ikuti Kami</h4>
          <div className="footer-icons">
            <i className="fab fa-instagram"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>
      </footer>
    </div>
  );
}