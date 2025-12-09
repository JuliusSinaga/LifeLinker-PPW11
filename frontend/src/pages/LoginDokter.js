import React, { useState } from "react";
import "./LoginShared.css";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; // Import Google Login
import Footer from "../components/Footer";
import axiosClient from "../service/axiosClient"; // Pastikan axiosClient sudah ada

const LoginDokter = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("dokter");
  const [error, setError] = useState("");

  // 1. Tambahkan State untuk Input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // --- LOGIN MANUAL (SIMULASI REAL-TIME) ---
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Logika: Ambil nama dari email, tambah gelar "Dr." di depannya
    // Contoh: anastasya@gmail.com -> Dr. Anastasya
    const namePart = email.split("@")[0];
    const dynamicName = "Dr. " + namePart.charAt(0).toUpperCase() + namePart.slice(1);

    // Simulasi Login Sukses dengan Data Dinamis
    const userData = {
      name: dynamicName, // Nama sesuai input email
      email: email,
      role: "dokter",
      isLoggedIn: true
    };

    // 1. Simpan data sesi
    localStorage.setItem("user", JSON.stringify(userData));

    // 2. Update Header secara otomatis
    window.dispatchEvent(new Event("user-login"));

    // 3. Arahkan ke Dashboard Dokter
    navigate("/dashboard");
  };

  // --- LOGIN GOOGLE ---
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Kirim token ke backend untuk verifikasi & cek STR
      const res = await axiosClient.post("/auth/google/doctor", {
        id_token: credentialResponse.credential,
      });

      if (res.data.token) {
        const userData = {
          ...res.data.user,
          isLoggedIn: true,
          role: "dokter"
        };

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(userData));
        
        window.dispatchEvent(new Event("user-login"));
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Google Login Error:", err);
      setError("Gagal login Google. Pastikan email terdaftar sebagai dokter.");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          
          {/* Logo */}
          <div className="logo-wrapper">
            <img
              src={process.env.PUBLIC_URL + "/images/lifelinker-logo.png"}
              alt="LifeLinker Logo"
              className="logo-image"
            />
            <h2 className="logo-text">
              <span className="logo-life">Life</span>
              <span className="logo-bold">Linker</span>
            </h2>
          </div>

          {/* Judul */}
          <h3 className="welcome-title">Selamat Datang, Dokter</h3>
          {error && <p style={{color: 'red', textAlign:'center', fontSize:'13px'}}>{error}</p>}

          {/* Pilihan Role (Admin Dihapus) */}
          <div className="role-buttons">
            <button
              className={role === "pengguna" ? "role-btn active" : "role-btn"}
              onClick={() => {
                setRole("pengguna");
                navigate("/login-pengguna");
              }}
            >
              Pengguna
            </button>

            <button
              className={role === "dokter" ? "role-btn active" : "role-btn"}
              onClick={() => setRole("dokter")}
            >
              Dokter
            </button>
          </div>

          {/* Form Login (Controlled Inputs) */}
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              placeholder="Alamat Email"
              className="form-input"
              value={email} // Binding Value
              onChange={(e) => setEmail(e.target.value)} // Update State
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="form-input"
              value={password} // Binding Value
              onChange={(e) => setPassword(e.target.value)} // Update State
              required
            />
            <button type="submit" className="btn-login">
              Masuk
            </button>
          </form>

          <div className="divider"><span>ATAU</span></div>

          {/* Tombol Google Login */}
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Login Google Gagal")}
              useOneTap
              theme="outline"
              size="large"
              width="340px"
              text="signin_with"
              shape="rectangular"
            />
          </div>

          {/* Link daftar */}
          <p className="register-text">
            Belum punya akun? <a href="/daftar-dokter">Daftar Sekarang</a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LoginDokter;