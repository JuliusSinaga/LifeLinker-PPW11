import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DaftarDokter.css";
import axiosClient from "../service/axiosClient"; 
import { useGoogleLogin } from "@react-oauth/google"; 
import { FaArrowLeft } from "react-icons/fa";

export default function DaftarDokter() {
  const navigate = useNavigate();
  const [notif, setNotif] = useState({ show: false, type: "", message: "" });

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",           
    str_number: "",    
    specialization: "",
    hospital: "",       
    birth_date: "",    
    gender: "",        
    phone: "",         
    city: "",           
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isValid =
    form.email.trim() !== "" &&
    form.password.trim() !== "" &&
    form.name.trim() !== "" &&
    form.str_number.trim() !== "";

  // --- LOGIC DAFTAR MANUAL ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      setNotif({
        show: true,
        type: "error",
        message: "Lengkapi field wajib: Email, Password, Nama Lengkap, Nomor STR.",
      });
      setTimeout(() => setNotif({ show: false, type: "", message: "" }), 3000);
      return;
    }

    const payload = {
      ...form,
      role: "dokter", // Set role sebagai dokter
    };

    try {
      await axiosClient.post("/users", payload); 
      
      setNotif({
        show: true,
        type: "success",
        message: "Pendaftaran berhasil! Silakan Login.",
      });

      setTimeout(() => {
        navigate("/login-dokter"); 
      }, 2000);

    } catch (error) {
      console.error("Error Register:", error);
      const errorMsg = error.response?.data?.error || "Gagal mendaftar. Silakan coba lagi.";
      setNotif({ show: true, type: "error", message: errorMsg });
      setTimeout(() => setNotif({ show: false, type: "", message: "" }), 3000);
    }
  };

  // --- LOGIC DAFTAR DENGAN GOOGLE ---
  const googleRegister = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Kirim Access Token ke Backend (/login/google akan auto-register jika belum ada)
        const res = await axiosClient.post("/login/google", {
          id_token: tokenResponse.access_token, 
        });

        // Simpan sesi (Login otomatis setelah daftar)
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        window.dispatchEvent(new Event("user-login"));

        // Redirect ke Dashboard Dokter (atau profil untuk lengkapi data STR)
        navigate("/dashboard-dokter");

      } catch (err) {
        console.error("Google Register Error:", err);
        setNotif({ 
            show: true, 
            type: "error", 
            message: "Gagal mendaftar dengan Google. Pastikan akun belum terdaftar." 
        });
      }
    },
    onError: () => console.log("Register Google Gagal"),
  });

  return (
    <div className="dd-page">
      <div className="dd-card">
        
        {/* Notifikasi */}
        {notif.show && (
          <div
            style={{
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "8px",
              textAlign: "center",
              fontWeight: "600",
              fontSize: "14px",
              backgroundColor: notif.type === "success" ? "#d4edda" : "#f8d7da",
              color: notif.type === "success" ? "#155724" : "#721c24",
              border: `1px solid ${notif.type === "success" ? "#c3e6cb" : "#f5c6cb"}`
            }}
          >
            {notif.message}
          </div>
        )}

        {/* TOMBOL KEMBALI */}
        <button className="back-button-dokter" onClick={() => navigate("/")}>
            <FaArrowLeft /> Kembali
        </button>

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
            <label htmlFor="name">Nama Lengkap (dengan gelar)</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Contoh : Dr. Julius Sinaga, Sp.PD"
              required
            />
          </div>

          <div className="dd-row">
            <div className="dd-field">
              <label htmlFor="str_number">Nomor STR (Wajib)</label>
              <input
                id="str_number"
                name="str_number"
                type="text"
                value={form.str_number}
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

          {/* Sisa input form lainnya (Tgl Lahir, Gender, Phone, City) sama seperti sebelumnya */}
          <div className="dd-row">
            <div className="dd-field">
              <label htmlFor="birth_date">Tanggal Lahir</label>
              <input
                id="birth_date"
                name="birth_date"
                type="date"
                value={form.birth_date}
                onChange={handleChange}
              />
            </div>
            <div className="dd-field">
              <label htmlFor="gender">Jenis Kelamin</label>
              <select id="gender" name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Pilih Jenis Kelamin</option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
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

          {/* DIVIDER */}
          <div style={{ display: "flex", alignItems: "center", margin: "25px 0 15px" }}>
            <div style={{ flex: 1, borderBottom: "1px solid #e5e7eb" }}></div>
            <span style={{ padding: "0 10px", color: "#9ca3af", fontSize: "13px", fontWeight: "600" }}>
              ATAU
            </span>
            <div style={{ flex: 1, borderBottom: "1px solid #e5e7eb" }}></div>
          </div>

          {/* CUSTOM GOOGLE BUTTON (Sesuai Permintaan) */}
          <div className="google-login-wrapper">
            <button 
                type="button" 
                className="google-btn" 
                onClick={() => googleRegister()}
            >
              <img
                src={process.env.PUBLIC_URL + "/images/G-logo.svg"}
                alt="Google"
              />
              Daftar dengan Google
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