import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./StokDarahPage.css";
import {
  FaMapMarkerAlt,
  FaFilter,
  FaClock,
  FaChevronRight,
  FaMapPin,
  FaHospital,
} from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Sample hospitals with blood stock data
const hospitalsData = [
  {
    id: 1,
    name: "RSUP H. Adam Malik",
    city: "Medan",
    address: "Jl. Bunga Lau No.17, Medan",
    operationalHours: "08:00 - 15:00 WIB",
    distance: "12.3 km",
    bloodStock: {
      "A+": { status: "Kritis", units: 12, statusClass: "critical" },
      "A-": { status: "Standar", units: 45, statusClass: "standard" },
      "B+": { status: "Aman", units: 97, statusClass: "safe" },
      "B-": { status: "Kritis", units: 9, statusClass: "critical" },
      "O+": { status: "Standar", units: 45, statusClass: "standard" },
      "O-": { status: "Kritis", units: 5, statusClass: "critical" },
    },
    urgentNeeds: ["A+", "B-", "O-"],
  },
  {
    id: 2,
    name: "RS HKBP Balige",
    city: "Balige",
    address: "Jl. Gereja No.17, Balige",
    operationalHours: "08:00 - 15:00 WIB",
    distance: "2.3 km",
    bloodStock: {
      "A+": { status: "Standar", units: 32, statusClass: "standard" },
      "A-": { status: "Aman", units: 65, statusClass: "safe" },
      "B+": { status: "Aman", units: 87, statusClass: "safe" },
      "B-": { status: "Kritis", units: 7, statusClass: "critical" },
      "O+": { status: "Standar", units: 34, statusClass: "standard" },
      "O-": { status: "Kritis", units: 3, statusClass: "critical" },
    },
    urgentNeeds: ["B-", "O-"],
  },
  {
    id: 3,
    name: "RS Universitas Sumatera Utara",
    city: "Medan",
    address: "Jl. Dr. Mansyur No.5, Medan",
    operationalHours: "08:00 - 16:00 WIB",
    distance: "8.7 km",
    bloodStock: {
      "A+": { status: "Aman", units: 78, statusClass: "safe" },
      "A-": { status: "Standar", units: 23, statusClass: "standard" },
      "B+": { status: "Aman", units: 65, statusClass: "safe" },
      "B-": { status: "Standar", units: 18, statusClass: "standard" },
      "O+": { status: "Kritis", units: 8, statusClass: "critical" },
      "O-": { status: "Kritis", units: 4, statusClass: "critical" },
    },
    urgentNeeds: ["O+", "O-"],
  },
  {
    id: 4,
    name: "PMI Kota Medan",
    city: "Medan",
    address: "Jl. Pemuda No.32, Medan",
    operationalHours: "08:00 - 14:00 WIB",
    distance: "15.2 km",
    bloodStock: {
      "A+": { status: "Standar", units: 42, statusClass: "standard" },
      "A-": { status: "Kritis", units: 6, statusClass: "critical" },
      "B+": { status: "Aman", units: 89, statusClass: "safe" },
      "B-": { status: "Kritis", units: 4, statusClass: "critical" },
      "O+": { status: "Aman", units: 92, statusClass: "safe" },
      "O-": { status: "Kritis", units: 2, statusClass: "critical" },
    },
    urgentNeeds: ["A-", "B-", "O-"],
  },
];

export default function StokDarahPage() {
  const [selectedFilter, setSelectedFilter] = useState("Semua Kota");
  const [selectedBloodType, setSelectedBloodType] = useState("Semua Golongan");

  const filterOptions = ["Semua Kota", "Medan", "Balige"];

  const bloodTypeOptions = [
    "Semua Golongan",
    "A+",
    "A-",
    "B+",
    "B-",
    "O+",
    "O-",
    "AB+",
    "AB-",
  ];

  const filteredHospitals = hospitalsData.filter((hospital) => {
    const cityMatch =
      selectedFilter === "Semua Kota" || hospital.city === selectedFilter;
    const bloodTypeMatch =
      selectedBloodType === "Semua Golongan" ||
      hospital.bloodStock[selectedBloodType];

    return cityMatch && bloodTypeMatch;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case "Kritis":
        return "critical";
      case "Standar":
        return "standard";
      case "Aman":
        return "safe";
      default:
        return "standard";
    }
  };

  return (
    <div className="stok-darah-root">
      <Header />

      {/* Hero Section */}
      <section className="stok-hero">
        <div className="stok-hero-content">
          <h1>🩸 Stok Darah Rumah Sakit</h1>
          <p>Cek ketersediaan stok darah di rumah sakit dan PMI terdekat</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="stok-main">
        {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-container">
            <div className="filter-card">
              <div className="filter-item">
                <span className="filter-label">
                  <FaFilter className="filter-icon" />
                  Filter Kota:
                </span>
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

              <div className="filter-item">
                <span className="filter-label">
                  <FaHospital className="filter-icon" />
                  Golongan Darah:
                </span>
                <select
                  className="filter-dropdown"
                  value={selectedBloodType}
                  onChange={(e) => setSelectedBloodType(e.target.value)}
                >
                  {bloodTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="stok-container">
          {/* Results Info */}
          {filteredHospitals.length > 0 && (
            <div
              style={{
                marginBottom: "20px",
                color: "#666",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Menampilkan {filteredHospitals.length} rumah sakit
            </div>
          )}

          {/* Hospital Cards */}
          <div className="hospitals-grid">
            {filteredHospitals.length > 0 ? (
              filteredHospitals.map((hospital) => (
                <div key={hospital.id} className="hospital-card">
                  <div className="hospital-card-header">
                    <div className="hospital-basic-info">
                      <span className="hospital-city-tag">{hospital.city}</span>
                      <h3>{hospital.name}</h3>
                      <div className="hospital-meta">
                        <div className="meta-item">
                          <FaMapMarkerAlt className="meta-icon" />
                          <span>{hospital.address}</span>
                        </div>
                        <div className="meta-item">
                          <FaClock className="meta-icon" />
                          <span>{hospital.operationalHours}</span>
                        </div>
                        <div className="meta-item">
                          <FaMapPin className="meta-icon" />
                          <span>{hospital.distance}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Blood Stock Summary */}
                  <div className="blood-stock-summary">
                    <h4>Status Stok Darah:</h4>
                    <div className="blood-types-grid">
                      {Object.entries(hospital.bloodStock).map(
                        ([type, data]) => (
                          <div
                            key={type}
                            className={`blood-type-badge ${getStatusClass(
                              data.status
                            )}`}
                          >
                            <span className="blood-type">{type}</span>
                            <span className="blood-units">
                              {data.units} Kantong
                            </span>
                            <span className="blood-status">{data.status}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Urgent Needs */}
                  {hospital.urgentNeeds.length > 0 && (
                    <div className="urgent-needs">
                      <strong>Kebutuhan Mendesak</strong>
                      <div className="urgent-blood-types">
                        {hospital.urgentNeeds.map((type) => (
                          <span key={type} className="urgent-blood-badge">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="hospital-card-actions">
                    <Link
                      to={`/stok-darah/${hospital.id}`}
                      className="detail-button"
                    >
                      Lihat Detail Stok <FaChevronRight />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "40px",
                  background: "white",
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              >
                <p
                  style={{
                    fontSize: "16px",
                    color: "#666",
                    margin: 0,
                  }}
                >
                  Tidak ada rumah sakit yang sesuai dengan filter yang dipilih.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
