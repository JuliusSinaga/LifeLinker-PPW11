import React, { useState } from "react";
import "./DaftarPengguna.css";

export default function DaftarPengguna() {
  const [notif, setNotif] = useState({ show: false, type: "", message: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    birth_date: "",
    gender: "",
    phone: "",
    city: "",
    blood_type: "",
    rhesus: "",
    weight: "",
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
        `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/users`,
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
          message: "Pendaftaran akun berhasil ✔",
        });
        setFormData({
          name: "",
          email: "",
          password: "",
          birth_date: "",
          gender: "",
          phone: "",
          city: "",
          blood_type: "",
          rhesus: "",
          weight: "",
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
    }, 3000);
  };

  return (
    <div className="daftar-wrapper">
      <div className="daftar-container">
        {notif.show && (
          <div
            className={`notif ${
              notif.type === "success" ? "notif-sukses" : "notif-error"
            }`}
          >
            {notif.message}
          </div>
        )}

        <header className="daftar-header">
          <h1 className="logo">
            <img
              src="/images/lifelinker-logo.png"
              alt="LifeLinker Logo"
              className="logo-image"
            />
            <span className="red">Life</span>Linker
          </h1>
          <h2 className="judul">Buat Akun Pendonor</h2>
          <p className="subtitle">
            Lengkapi informasi untuk menjadi bagian dari pahlawan kemanusiaan.
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          <section className="form-section">
            <h3>Informasi Akun</h3>
            <div className="form-grid">
              <div className="form-group">
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
              <div className="form-group">
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

          <section className="form-section">
            <h3>Informasi Pribadi & Medis</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nama Lengkap"
                  required
                />
              </div>
              <div className="form-group">
                <label>Tanggal Lahir</label>
                <input
                  type="date"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
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
              <div className="form-group">
                <label>Nomor Telepon</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Nomor Telepon"
                  required
                />
              </div>
              <div className="form-group">
                <label>Kota Domisili</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Contoh: Medan"
                  required
                />
              </div>
              <div className="form-group">
                <label>Golongan Darah</label>
                <select
                  name="blood_type"
                  value={formData.blood_type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih Golongan Darah</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select>
              </div>
              <div className="form-group">
                <label>Rhesus</label>
                <select
                  name="rhesus"
                  value={formData.rhesus}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih</option>
                  <option value="+">Positif (+)</option>
                  <option value="-">Negatif (-)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Berat Badan (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Contoh: 55"
                  required
                />
              </div>
            </div>
          </section>

          <button type="submit" className="btn-submit">
            Buat Akun
          </button>

          <p className="login-link">
            Sudah punya akun? <a href="/login-pengguna">Masuk di sini</a>
          </p>
        </form>
      </div>
    </div>
  );
}
