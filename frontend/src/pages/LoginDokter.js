import React from "react";
import { Link } from "react-router-dom";
import "./LoginDokter.css";
import Footer from "../components/Footer";

function LoginDokter() {
  return (
    <div className="login-page">
      <div className="login-card landscape">
        <div className="login-content">
          <div className="logo-text">
            <span className="life">Life</span>
            <span className="linker">Linker</span>
          </div>

          <h2>Selamat Datang</h2>

          <div className="role-toggle">
            <Link to="/login-pengguna"><button>Pengguna</button></Link>
            <button className="active">Dokter</button>
            <Link to="/login-admin"><button>Admin</button></Link>
          </div>

          <form className="login-form">
            <input type="email" placeholder="Alamat Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit" className="btn-login">Masuk</button>
          </form>

          <div className="divider"><span>ATAU</span></div>

          <button className="google-login">
            <img src="/google-icon.png" alt="Google" /> Masuk dengan Google
          </button>

          <p className="register-text">
            Belum punya akun? <Link to="/daftar-dokter">Daftar Sekarang</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginDokter;
