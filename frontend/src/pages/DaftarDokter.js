// src/pages/DaftarDokter.jsx
import React, { useState } from "react";
import "./DaftarDokter.css";
import { Link } from "react-router-dom";

export default function DaftarDokter() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    strNumber: "",
    specialization: "",
    hospital: "",
    birthDate: "",
    gender: "",
    phone: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // simple required validation: enable button only if required fields filled
  const isValid =
    form.email.trim() !== "" &&
    form.password.trim() !== "" &&
    form.fullName.trim() !== "" &&
    form.strNumber.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      alert("Lengkapi field wajib: Email, Password, Nama Lengkap, Nomor STR.");
      return;
    }

    // TODO: kirim form ke backend (fetch/axios)
    console.log("submit doctor registration", form);
    alert("Form submitted — cek console. Implementasikan pengiriman ke backend.");
  };

  return (
    <div className="dd-page">
      <div className="dd-card">
        <h1 className="dd-title">Pendaftaran Akun Dokter</h1>

        <div className="dd-info" role="status" aria-live="polite">
          <div className="dd-info-icon" aria-hidden="true">i</div>
          <div className="dd-info-text">
            Akun Anda akan aktif setelah data dan Nomor STR berhasil diverifikasi oleh Admin.
          </div>
        </div>

        <form className="dd-form" onSubmit={handleSubmit} noValidate>
          <h3 className="dd-section-title">Informasi Akun</h3>

          <div className="dd-row">
            <div className="dd-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="dd-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimal 8 karakter"
                required
              />
            </div>
          </div>

          <h3 className="dd-section-title">Informasi Profesional & Pribadi</h3>

          <div className="dd-field full">
            <label htmlFor="fullName">Nama Lengkap (dengan gelar)</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Contoh : Dr. Julius Sinaga, Sp.PD"
              required
            />
          </div>

          <div className="dd-row">
            <div className="dd-field">
              <label htmlFor="strNumber">Nomor STR (Wajib)</label>
              <input
                id="strNumber"
                name="strNumber"
                type="text"
                value={form.strNumber}
                onChange={handleChange}
                placeholder="Masukkan Nomor Valid Anda"
                required
              />
            </div>

            <div className="dd-field">
              <label htmlFor="specialization">Spesialisasi</label>
              <input
                id="specialization"
                name="specialization"
                type="text"
                value={form.specialization}
                onChange={handleChange}
                placeholder="Contoh : Penyakit Dalam"
              />
            </div>
          </div>

          <div className="dd-field full">
            <label htmlFor="hospital">Nama Rumah Sakit / Instansi</label>
            <input
              id="hospital"
              name="hospital"
              type="text"
              value={form.hospital}
              onChange={handleChange}
              placeholder="Contoh : RSUP Porsea"
            />
          </div>

          <div className="dd-row">
            <div className="dd-field">
              <label htmlFor="birthDate">Tanggal Lahir</label>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                value={form.birthDate}
                onChange={handleChange}
              />
            </div>

            <div className="dd-field">
              <label htmlFor="gender">Jenis Kelamin</label>
              <select id="gender" name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Pilih Jenis Kelamin</option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
                <option value="other">Lainnya</option>
              </select>
            </div>
          </div>

          <div className="dd-row">
            <div className="dd-field">
              <label htmlFor="phone">Nomor Telepon (WhatsApp)</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+62 8123xxxx"
              />
            </div>

            <div className="dd-field">
              <label htmlFor="city">Kota Domisili</label>
              <input
                id="city"
                name="city"
                type="text"
                value={form.city}
                onChange={handleChange}
                placeholder="Contoh : Laguboti"
              />
            </div>
          </div>

          <div className="dd-submit-wrap">
            <button type="submit" className="dd-submit" disabled={!isValid}>
              Daftar &amp; Kirim Verifikasi
            </button>
          </div>

          <div className="dd-footer">
            Sudah punya akun?{" "}
            <Link to="/login-dokter" className="dd-link">
              Masuk di sini
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
