import React, { useState } from "react";
import "./LoginShared.css";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Footer from "../components/Footer";
import axiosClient from "../service/axiosClient";

const LoginPengguna = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("pengguna");
  const [error, setError] = useState("");

  // State untuk Input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // --- LOGIN MANUAL (DENGAN LOGIKA ADMIN) ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // 1. Logika Simulasi: Deteksi "admin" dari email
    // Jika email mengandung kata "admin" (contoh: admin@lifelinker.com), set role jadi admin
    let assignedRole = "pengguna";
    if (email.toLowerCase().includes("admin")) {
      assignedRole = "admin";
    }

    // Nama dinamis dari email
    const namePart = email.split("@")[0];
    const dynamicName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

    const userData = {
      name: dynamicName,
      email: email,
      role: assignedRole, // Role sesuai deteksi
      isLoggedIn: true
    };

    // 2. Simpan Data
    localStorage.setItem("user", JSON.stringify(userData));
    window.dispatchEvent(new Event("user-login"));

    // 3. LOGIKA REDIRECT BERDASARKAN ROLE
    if (assignedRole === "admin") {
      navigate("/dashboard-admin"); // Arahkan Admin ke Dashboardnya
    } else {
      navigate("/beranda"); // Arahkan User biasa ke Beranda
    }
  };

  // --- LOGIN DENGAN GOOGLE (DENGAN LOGIKA ADMIN) ---
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axiosClient.post("/auth/google", {
        id_token: credentialResponse.credential,
      });

      if (res.data.token) {
        const userData = {
          ...res.data.user,
          isLoggedIn: true,
        };

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(userData));
        window.dispatchEvent(new Event("user-login"));

        // LOGIKA REDIRECT BERDASARKAN ROLE DARI BACKEND
        // Pastikan backend mengembalikan field 'role' di object user
        if (userData.role === "admin") {
          navigate("/dashboard-admin");
        } else {
          // Logika User Biasa
          if (!res.data.user.phone) {
             navigate("/beranda"); 
          } else {
             navigate("/beranda");
          }
        }
      }
    } catch (err) {
      console.error("Google Login Error:", err);
      setError("Gagal login dengan Google. Silakan coba lagi.");
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

          <h3 className="welcome-title">Selamat Datang</h3>
          {error && <p style={{color: 'red', textAlign:'center', fontSize:'14px'}}>{error}</p>}

          <div className="role-buttons">
            <button
              className={role === "pengguna" ? "role-btn active" : "role-btn"}
              onClick={() => setRole("pengguna")}
            >
              Pengguna / Admin
            </button>

            <button
              className={role === "dokter" ? "role-btn active" : "role-btn"}
              onClick={() => navigate("/login-dokter")}
            >
              Dokter
            </button>
          </div>

          {/* Form Login Manual */}
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              placeholder="Alamat Email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn-login">
              Masuk
            </button>
          </form>

          <div className="divider">
            <span>ATAU</span>
          </div>

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

          <p className="register-text">
            Belum punya akun? <Link to="/daftar-pengguna">Daftar Sekarang</Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LoginPengguna;