import React, { useState, useEffect } from "react";
import "./RiwayatPage.css";
import {
  FaTint,
  FaHeartbeat,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaDownload,
  FaClock,
  FaChartLine,
} from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Sample user data
const userData = {
  stats: [
    {
      icon: <FaTint />,
      value: "12",
      label: "Total Donasi",
      color: "#dc2626",
    },
    {
      icon: <FaTint />,
      value: "4.2 L",
      label: "Total Darah Didonorkan",
      color: "#dc2626",
    },
    {
      icon: <FaHeartbeat />,
      value: "36",
      label: "Nyawa Terselamatkan",
      color: "#dc2626",
    },
    {
      icon: <FaChartLine />,
      value: "75 Hari",
      label: "Siklus Donor Rata-rata",
      color: "#dc2626",
    },
  ],
  nextDonorDate: new Date("2025-12-15T10:00:00"),
  history: [
    {
      id: 1,
      date: "01 Okt 2025",
      location: "RSUP H. Adam Malik",
      bloodPressure: "120/80",
      hemoglobin: "14.2 g/dL",
      status: "completed",
    },
    {
      id: 2,
      date: "15 Jul 2025",
      location: "RS HKBP Balige",
      bloodPressure: "110/70",
      hemoglobin: "13.8 g/dL",
      status: "completed",
    },
    {
      id: 3,
      date: "20 Apr 2025",
      location: "RSU Pirgandi",
      bloodPressure: "115/75",
      hemoglobin: "14.6 g/dL",
      status: "completed",
    },
  ],
};

export default function RiwayatPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  // Countdown timer effect
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = userData.nextDonorDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  const handleDownloadSertifikat = (historyId) => {
    // Handle download certificate
    console.log("Download sertifikat untuk donor ID:", historyId);
    alert(`Mengunduh sertifikat untuk donor ID: ${historyId}`);
  };

  return (
    <div className="riwayat-page-root">
      <Header showUserProfile={true} />

      {/* Main Content */}
      <main className="riwayat-main">
        <div className="riwayat-container">
          {/* Dashboard Header */}
          <section className="dashboard-header">
            <h1>Dasbor Kebaikan Anda</h1>
          </section>

          {/* Statistics Cards */}
          <section className="stats-section">
            <div className="stats-grid">
              {userData.stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon" style={{ color: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Next Donor Countdown */}
          <section className="next-donor-section">
            <div className="next-donor-card">
              <h2>Anda Bisa Donor Lagi Dalam</h2>
              <div className="countdown-container">
                <div className="countdown-item-riwayat">
                  <div className="countdown-number-riwayat">
                    {timeLeft.days}
                  </div>
                  <div className="countdown-label-riwayat">Hari</div>
                </div>
                <div className="countdown-item-riwayat">
                  <div className="countdown-number-riwayat">
                    {timeLeft.hours}
                  </div>
                  <div className="countdown-label-riwayat">Jam</div>
                </div>
                <div className="countdown-item-riwayat">
                  <div className="countdown-number-riwayat">
                    {timeLeft.minutes}
                  </div>
                  <div className="countdown-label-riwayat">Menit</div>
                </div>
              </div>
            </div>
          </section>

          {/* History Section */}
          <section className="history-section">
            <div className="history-header">
              <h2>
                <FaClock className="history-icon" />
                Riwayat Donor Darah
              </h2>
            </div>

            <div className="history-list">
              {userData.history.map((record) => (
                <div key={record.id} className="history-item">
                  <div className="history-date">
                    <div className="date-text">{record.date}</div>
                  </div>

                  <div className="history-location">
                    <FaMapMarkerAlt className="location-icon" />
                    <span>{record.location}</span>
                  </div>

                  <div className="history-details">
                    <span>
                      <strong>Tekanan Darah:</strong> {record.bloodPressure} |{" "}
                      <strong>Hb:</strong> {record.hemoglobin}
                    </span>
                  </div>

                  <div className="history-actions">
                    <button
                      className="download-button"
                      onClick={() => handleDownloadSertifikat(record.id)}
                    >
                      <FaDownload />
                      Unduh Sertifikat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
