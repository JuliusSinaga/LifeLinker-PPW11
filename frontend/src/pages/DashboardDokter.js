import React from "react";
import "./DashboardDokter.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// === React Icons ===
import {
  FaTachometerAlt,
  FaTint,
  FaCalendarAlt,
  FaComments,
  FaUserMd,
  FaSignOutAlt,
} from "react-icons/fa";

// Registrasi Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardDokter = () => {
  // === Data Grafik Stok Darah ===
  const data = {
    labels: ["A", "B", "AB", "O"],
    datasets: [
      {
        label: "Stok Darah (Unit)",
        data: [320, 210, 120, 405],
        backgroundColor: ["#e74c3c", "#3498db", "#f39c12", "#2ecc71"],
        borderRadius: 6,
      },
    ],
  };

  // === Opsi Tampilan Grafik ===
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Distribusi Stok Darah Berdasarkan Golongan",
        font: { size: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 100 },
      },
    },
  };

  return (
    <div className="dashboard-wrapper">
      {/* ================= SIDEBAR ================= */}
      <div className="sidebar">
        <div className="doctor-profile">
          <img
            src="/images/doctor-avatar.png"
            alt="Dokter"
            className="doctor-photo"
          />
          <h4>Dr. Anastasya</h4>
          <p>Spesialis Hematologi</p>
        </div>

        <div className="sidebar-menu">
          <a href="#" className="active">
            <FaTachometerAlt className="menu-icon" /> Dashboard
          </a>
          <a href="#">
            <FaTint className="menu-icon" /> Manajemen Stok
          </a>
          <a href="#">
            <FaCalendarAlt className="menu-icon" /> Manajemen Event
          </a>
          <a href="#">
            <FaComments className="menu-icon" /> Konsultasi & Edukasi
          </a>
          <a href="#">
            <FaUserMd className="menu-icon" /> Profil Saya
          </a>
          <a href="#" className="logout">
            <FaSignOutAlt className="menu-icon" /> Logout
          </a>
        </div>
      </div>

      {/* ================= KONTEN UTAMA ================= */}
      <div className="main-container">
        <div className="dashboard-header">
          <h2>Dashboard Utama</h2>
          <button className="refresh-btn">Refresh Data</button>
        </div>

        {/* === CARD STATISTIK === */}
        <div className="dashboard-cards">
          <div className="card merah">
            <h3>1,247</h3>
            <p>Total Stok Darah (Unit)</p>
            <span>RS Siloam Kebon Jeruk</span>
          </div>

          <div className="card biru">
            <h3>89</h3>
            <p>Pendonor Bulan Ini</p>
            <span>Target: 120 orang</span>
          </div>

          <div className="card oranye">
            <h3>15</h3>
            <p>Total Event RS Kami</p>
            <span>12 selesai, 3 berlangsung</span>
          </div>

          <div className="card hijau">
            <h3>845</h3>
            <p>Pendonor Aktif</p>
            <span>Di rumah sakit kami</span>
          </div>
        </div>

        {/* === GRAFIK & NOTIFIKASI === */}
        <div className="grafik-notif-container">
          <div className="grafik-section">
            <h4>Perbandingan Stok Darah</h4>
            <div className="grafik-box">
              <Bar data={data} options={options} />
            </div>
          </div>

          <div className="notif-section">
            <div className="notif-header">
              <h4>Notifikasi Terbaru</h4>
              <button className="mark-read-btn">Tandai Sudah Dibaca</button>
            </div>

            <ul className="notif-list">
              <li>
                ✅ Request event "Bakti Sosial" disetujui Admin
                <span>2 jam yang lalu</span>
              </li>
              <li>
                💬 Konsultasi baru menunggu balasan
                <span>5 jam yang lalu</span>
              </li>
              <li>
                ⚠️ 5 kantong darah (A+) akan kedaluwarsa dalam 3 hari
                <span>1 hari yang lalu</span>
              </li>
              <li>
                🧍‍♀️ 12 pendonor baru terdaftar minggu ini
                <span>2 hari yang lalu</span>
              </li>
            </ul>

            <div className="lihat-semua">Lihat semua notifikasi</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDokter;