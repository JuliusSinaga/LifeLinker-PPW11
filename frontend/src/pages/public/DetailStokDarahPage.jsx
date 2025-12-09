import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./DetailStokDarahPage.css";
import {
  FaPhone,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaFilter,
  FaCheckCircle,
  FaArrowLeft,
  FaHospital,
  FaClock,
  FaClipboardList,
} from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Sample detailed blood stock data for specific hospitals
const hospitalDetailData = {
  1: {
    id: 1,
    name: "RSUP H. Adam Malik",
    address: "Jl. Bunga Lau No.17, Medan",
    operationalHours: "Senin - Jumat (08:00 - 15:00 WIB)",
    phone: "08123456789",
    bloodStockData: [
      {
        type: "A+",
        status: "Kritis",
        units: 12,
        percentage: 15,
        statusClass: "critical",
      },
      {
        type: "A-",
        status: "Standar",
        units: 45,
        percentage: 60,
        statusClass: "standard",
      },
      {
        type: "B+",
        status: "Aman",
        units: 97,
        percentage: 85,
        statusClass: "safe",
      },
      {
        type: "B-",
        status: "Kritis",
        units: 9,
        percentage: 12,
        statusClass: "critical",
      },
      {
        type: "O+",
        status: "Standar",
        units: 45,
        percentage: 55,
        statusClass: "standard",
      },
      {
        type: "O-",
        status: "Kritis",
        units: 5,
        percentage: 8,
        statusClass: "critical",
      },
      {
        type: "AB+",
        status: "Aman",
        units: 60,
        percentage: 78,
        statusClass: "safe",
      },
      {
        type: "AB-",
        status: "Standar",
        units: 43,
        percentage: 65,
        statusClass: "standard",
      },
    ],
  },
  2: {
    id: 2,
    name: "RS HKBP Balige",
    address: "Jl. Gereja No.17, Balige",
    operationalHours: "Senin - Jumat (08:00 - 15:00 WIB)",
    phone: "08123456788",
    bloodStockData: [
      {
        type: "A+",
        status: "Standar",
        units: 32,
        percentage: 45,
        statusClass: "standard",
      },
      {
        type: "A-",
        status: "Aman",
        units: 65,
        percentage: 80,
        statusClass: "safe",
      },
      {
        type: "B+",
        status: "Aman",
        units: 87,
        percentage: 90,
        statusClass: "safe",
      },
      {
        type: "B-",
        status: "Kritis",
        units: 7,
        percentage: 10,
        statusClass: "critical",
      },
      {
        type: "O+",
        status: "Standar",
        units: 34,
        percentage: 50,
        statusClass: "standard",
      },
      {
        type: "O-",
        status: "Kritis",
        units: 3,
        percentage: 5,
        statusClass: "critical",
      },
      {
        type: "AB+",
        status: "Aman",
        units: 78,
        percentage: 85,
        statusClass: "safe",
      },
      {
        type: "AB-",
        status: "Standar",
        units: 23,
        percentage: 40,
        statusClass: "standard",
      },
    ],
  },
  3: {
    id: 3,
    name: "RS Universitas Sumatera Utara",
    address: "Jl. Dr. Mansyur No.5, Medan",
    operationalHours: "Senin - Jumat (08:00 - 16:00 WIB)",
    phone: "08123456787",
    bloodStockData: [
      {
        type: "A+",
        status: "Aman",
        units: 78,
        percentage: 82,
        statusClass: "safe",
      },
      {
        type: "A-",
        status: "Standar",
        units: 23,
        percentage: 48,
        statusClass: "standard",
      },
      {
        type: "B+",
        status: "Aman",
        units: 65,
        percentage: 75,
        statusClass: "safe",
      },
      {
        type: "B-",
        status: "Standar",
        units: 18,
        percentage: 42,
        statusClass: "standard",
      },
      {
        type: "O+",
        status: "Kritis",
        units: 8,
        percentage: 10,
        statusClass: "critical",
      },
      {
        type: "O-",
        status: "Kritis",
        units: 4,
        percentage: 6,
        statusClass: "critical",
      },
      {
        type: "AB+",
        status: "Aman",
        units: 55,
        percentage: 70,
        statusClass: "safe",
      },
      {
        type: "AB-",
        status: "Standar",
        units: 30,
        percentage: 52,
        statusClass: "standard",
      },
    ],
  },
  4: {
    id: 4,
    name: "PMI Kota Medan",
    address: "Jl. Pemuda No.32, Medan",
    operationalHours: "Senin - Jumat (08:00 - 14:00 WIB)",
    phone: "08123456786",
    bloodStockData: [
      {
        type: "A+",
        status: "Standar",
        units: 42,
        percentage: 55,
        statusClass: "standard",
      },
      {
        type: "A-",
        status: "Kritis",
        units: 6,
        percentage: 8,
        statusClass: "critical",
      },
      {
        type: "B+",
        status: "Aman",
        units: 89,
        percentage: 88,
        statusClass: "safe",
      },
      {
        type: "B-",
        status: "Kritis",
        units: 4,
        percentage: 5,
        statusClass: "critical",
      },
      {
        type: "O+",
        status: "Aman",
        units: 92,
        percentage: 90,
        statusClass: "safe",
      },
      {
        type: "O-",
        status: "Kritis",
        units: 2,
        percentage: 3,
        statusClass: "critical",
      },
      {
        type: "AB+",
        status: "Standar",
        units: 38,
        percentage: 58,
        statusClass: "standard",
      },
      {
        type: "AB-",
        status: "Standar",
        units: 25,
        percentage: 45,
        statusClass: "standard",
      },
    ],
  },
};

const procedureInfo = [
  "Siapkan surat permintaan darah resmi dari dokter yang merawat.",
  "Sangat disarankan untuk menghubungi unit darah rumah sakit terlebih dahulu untuk konfirmasi stok dan prosedur.",
];

export default function DetailStokDarahPage() {
  const { id } = useParams();
  const hospital = hospitalDetailData[id] || hospitalDetailData[1];

  const [selectedFilter, setSelectedFilter] = useState("Tampilkan Semua");
  const filterOptions = [
    "Tampilkan Semua",
    "Kritis Saja",
    "Standar Saja",
    "Aman Saja",
  ];

  const filteredData = hospital.bloodStockData.filter((item) => {
    if (selectedFilter === "Tampilkan Semua") return true;
    if (selectedFilter === "Kritis Saja") return item.status === "Kritis";
    if (selectedFilter === "Standar Saja") return item.status === "Standar";
    if (selectedFilter === "Aman Saja") return item.status === "Aman";
    return true;
  });

  const getProgressBarClass = (statusClass) => {
    switch (statusClass) {
      case "critical":
        return "progress-critical";
      case "standard":
        return "progress-standard";
      case "safe":
        return "progress-safe";
      default:
        return "progress-standard";
    }
  };

  const getStatusBadgeClass = (statusClass) => {
    switch (statusClass) {
      case "critical":
        return "status-critical";
      case "standard":
        return "status-standard";
      case "safe":
        return "status-safe";
      default:
        return "status-standard";
    }
  };

  // Calculate statistics
  const criticalCount = hospital.bloodStockData.filter(
    (item) => item.status === "Kritis"
  ).length;
  const standardCount = hospital.bloodStockData.filter(
    (item) => item.status === "Standar"
  ).length;
  const safeCount = hospital.bloodStockData.filter(
    (item) => item.status === "Aman"
  ).length;

  return (
    <div className="detail-stok-root">
      <Header />

      {/* Hospital Info Section */}
      <section className="hospital-info-section" style={{ paddingTop: "40px" }}>
        <div className="hospital-container">
          <div className="back-button">
            <Link to="/stok-darah" className="back-link">
              <FaArrowLeft /> Kembali ke Daftar Rumah Sakit
            </Link>
          </div>

          <div className="hospital-info">
            <h1>
              <FaHospital
                style={{
                  display: "inline",
                  marginRight: "12px",
                  color: "var(--primary-red)",
                }}
              />
              {hospital.name}
            </h1>
            <div className="hospital-details">
              <div className="detail-item">
                <FaMapMarkerAlt className="detail-icon" />
                <span>{hospital.address}</span>
              </div>
              <div className="detail-item">
                <FaClock
                  className="detail-icon"
                  style={{ color: "var(--primary-red)" }}
                />
                <span>
                  <strong>Jam Operasional Unit Darah:</strong>{" "}
                  {hospital.operationalHours}
                </span>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn-contact">
                <FaPhone /> Hubungi
              </button>
              <button className="btn-whatsapp">
                <FaWhatsapp /> WhatsApp
              </button>
              <button className="btn-maps">
                <FaMapMarkerAlt /> Lihat Lokasi di Google Maps
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="stok-main">
        <div className="stok-container">
          {/* Statistics Summary */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #fee2e2, #fecaca)",
                padding: "20px",
                borderRadius: "16px",
                textAlign: "center",
                border: "2px solid #ef4444",
                animation: "fadeInUp 0.5s ease-out",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "800",
                  color: "#991b1b",
                  marginBottom: "8px",
                }}
              >
                {criticalCount}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#991b1b",
                  fontWeight: "600",
                }}
              >
                Golongan Kritis
              </div>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                padding: "20px",
                borderRadius: "16px",
                textAlign: "center",
                border: "2px solid #f59e0b",
                animation: "fadeInUp 0.5s ease-out 0.1s both",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "800",
                  color: "#92400e",
                  marginBottom: "8px",
                }}
              >
                {standardCount}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#92400e",
                  fontWeight: "600",
                }}
              >
                Golongan Standar
              </div>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
                padding: "20px",
                borderRadius: "16px",
                textAlign: "center",
                border: "2px solid #10b981",
                animation: "fadeInUp 0.5s ease-out 0.2s both",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "800",
                  color: "#166534",
                  marginBottom: "8px",
                }}
              >
                {safeCount}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#166534",
                  fontWeight: "600",
                }}
              >
                Golongan Aman
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="filter-section">
            <div className="filter-label">
              <FaFilter className="filter-icon" />
              <span>Filter Golongan Darah:</span>
            </div>
            <select
              className="filter-dropdown"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              {filterOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Blood Stock Table */}
          <div className="blood-table-container">
            <table className="blood-table">
              <thead>
                <tr>
                  <th>Golongan Darah</th>
                  <th>Status Ketersediaan</th>
                  <th>Jumlah (Kantong)</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index} className="blood-row">
                      <td className="blood-type-cell">
                        <span className="blood-type-text">{item.type}</span>
                      </td>
                      <td className="status-cell">
                        <div className="progress-container">
                          <div
                            className={`progress-bar ${getProgressBarClass(
                              item.statusClass
                            )}`}
                          >
                            <div
                              className="progress-fill"
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                          <span
                            className={`status-badge ${getStatusBadgeClass(
                              item.statusClass
                            )}`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </td>
                      <td className="units-cell">
                        <span className="units-number">{item.units}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      style={{
                        textAlign: "center",
                        padding: "40px",
                        color: "#666",
                      }}
                    >
                      Tidak ada data yang sesuai dengan filter yang dipilih.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Informasi & Prosedur */}
          <div className="procedure-section">
            <h3>
              <FaClipboardList
                style={{
                  color: "var(--primary-red)",
                  marginRight: "10px",
                  display: "inline",
                }}
              />
              Informasi & Prosedur Permintaan
            </h3>
            <div className="procedure-list">
              {procedureInfo.map((info, index) => (
                <div key={index} className="procedure-item">
                  <FaCheckCircle className="check-icon" />
                  <span>{info}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
