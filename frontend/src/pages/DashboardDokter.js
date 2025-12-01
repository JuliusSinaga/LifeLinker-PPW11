import React from "react";
import "../styles/DashboardDokter.css";
import DokterSidebar from "../components/DokterSidebar";

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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardDokter() {
  // DATA GRAFIK
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

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#555" },
      },
      x: {
        ticks: { color: "#555" },
      },
    },
  };

  return (
    <div className="dokter-layout">
      <DokterSidebar />

      <main className="dokter-main">
        <h2 className="page-title">Dashboard Utama</h2>

        {/* CARD STAT */}
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
            <span>Dalam sistem RS</span>
          </div>
        </div>

        {/* CHART */}
        <div className="chart-section">
          <h3 style={{ marginBottom: "10px" }}>Perbandingan Stok Darah</h3>
          <div className="chart-wrapper">
            <Bar data={data} options={options} />
          </div>
        </div>
      </main>
    </div>
  );
}
