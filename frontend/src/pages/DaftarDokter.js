import React, { useState } from "react";
import "./DaftarDokter.css";

export default function DaftarDokter() {
  const [notif, setNotif] = useState({ show: false, type: "", message: "" });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    strNumber: "",
    specialization: "",
    hospitalName: "",
    birthDate: "",
    gender: "",
    phone: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/doctors`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        setNotif({
          show: true,
          type: "success",
          message:
            "Pendaftaran akun dokter berhasil! Menunggu verifikasi admin ✔",
        });
        setFormData({
          email: "",
          password: "",
          fullName: "",
          strNumber: "",
          specialization: "",
          hospitalName: "",
          birthDate: "",
          gender: "",
          phone: "",
          city: "",
        });
      } else {
        const err = await res.json();
        setNotif({
          show: true,
          type: "error",
          message: err.error || "Gagal mendaftarkan akun. Coba lagi.",
        });
      }
    } catch (error) {
      setNotif({
        show: true,
        type: "error",
        message: "Terjadi kesalahan jaringan. Pastikan server aktif.",
      });
    }

    setTimeout(() => {
      setNotif({ show: false, type: "", message: "" });
    }, 4000);
  };

  return (
    <div className="daftar-dokter-wrapper">
      <div className="daftar-dokter-container">
        {notif.show && (
          <div
            className={`notif-dokter ${
              notif.type === "success"
                ? "notif-dokter-sukses"
                : "notif-dokter-error"
            }`}
          >
            {notif.message}
          </div>
        )}

        <header className="daftar-dokter-header">
          <h1 className="dokter-logo">
            <img
              src="/images/lifelinker-logo.png"
              alt="LifeLinker Logo"
              className="dokter-logo-image"
            />
            <span className="red">Life</span>Linker
          </h1>
          <h2 className="dokter-judul">Pendaftaran Akun Dokter</h2>
          <p className="dokter-subtitle">
            Akun Anda akan aktif setelah data dan Nomor STR berhasil
            diverifikasi oleh Admin.
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          <section className="dokter-form-section">
            <h3>Informasi Akun</h3>
            <div className="dokter-form-grid">
              <div className="dokter-form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="dokter-form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>
            </div>
          </section>

          <section className="dokter-form-section">
            <h3>Informasi Profesional & Pribadi</h3>
            <div className="dokter-form-grid">
              <div className="dokter-form-group full-width">
                <label>Nama Lengkap (dengan gelar)</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Contoh: Dr. Julius Sinaga, Sp.PD"
                  required
                />
              </div>
              <div className="dokter-form-group">
                <label>Nomor STR (Wajib)</label>
                <input
                  type="text"
                  name="strNumber"
                  value={formData.strNumber}
                  onChange={handleChange}
                  placeholder="Masukkan Nomor Valid Anda"
                  required
                />
              </div>
              <div className="dokter-form-group">
                <label>Spesialisasi</label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="Contoh: Penyakit Dalam"
                  required
                />
              </div>
              <div className="dokter-form-group full-width">
                <label>Nama Rumah Sakit / Instansi</label>
                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  placeholder="Contoh: RSUP Porsea"
                  required
                />
              </div>
              <div className="dokter-form-group">
                <label>Tanggal Lahir</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="dokter-form-group">
                <label>Jenis Kelamin</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <div className="dokter-form-group">
                <label>Nomor Telepon (WhatsApp)</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Nomor Telepon"
                  required
                />
              </div>
              <div className="dokter-form-group">
                <label>Kota Domisili</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Contoh: Laguboti"
                  required
                />
              </div>
            </div>
          </section>

          <button type="submit" className="dokter-btn-submit">
            Daftar & Kirim Verifikasi
          </button>

          <p className="dokter-login-link">
            Sudah punya akun? <a href="/login-dokter">Masuk di sini</a>
          </p>
        </form>
      </div>
    </div>
  );
}
