import React, { useState } from "react";
import "./Admin.css";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    alert("Login admin berhasil (contoh)");
  }

  return (
    <div className="admin-wrapper">
      <div className="admin-card">

        <h1 className="admin-logo">
          <img
            src="/images/lifelinker-logo.png"
            alt="LifeLinker Logo"
            className="logo-img"
          />
          <span className="red">Life</span>Linker
        </h1>

        <h2 className="admin-title">Selamat Datang</h2>

        {/* HANYA ADMIN */}
        <div className="admin-only-tab">
          <button className="admin-active">Admin</button>
        </div>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Alamat Email"
            className="admin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="admin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="admin-submit">
            Masuk
          </button>
        </form>

      </div>
    </div>
  );
}
