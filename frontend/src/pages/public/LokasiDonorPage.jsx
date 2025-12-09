import React from "react";
import { Link } from "react-router-dom";
import "./LokasiDonorPage.css";
import {
  FaStar,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GoogleMapComponent from "../../components/GoogleMapComponent"; // 1. Import Komponen Peta

// 2. Update Data dengan Koordinat (Lat, Lng)
const sampleLocations = [
  {
    id: 1,
    city: "Medan",
    name: "RSUP H. Adam Malik",
    address: "Jl. Bunga Lau No.17",
    rating: 4.6,
    distance: "12.3 km",
    donors: 124,
    urgent: true,
    blood: "A+ O+",
    lat: 3.5186, // Koordinat
    lng: 98.6053,
  },
  {
    id: 2,
    city: "Balige",
    name: "RS HKBP Balige",
    address: "Jl. Gereja No.17",
    rating: 4.4,
    distance: "2.3 km",
    donors: 156,
    urgent: true,
    blood: "B+",
    lat: 2.3339, // Koordinat
    lng: 99.0664,
  },
  {
    id: 3,
    city: "Medan",
    name: "RSU Pirgandi",
    address: "Jl. Prof. HM. Yamin",
    rating: 4.7,
    distance: "22.5 km",
    donors: 16,
    urgent: false,
    blood: "O+",
    lat: 3.5901, // Koordinat
    lng: 98.6874,
  },
];

export default function LokasiDonorPage() {
  return (
    <div className="lokasid-root">
      {/* Shared Header Component */}
      <Header />

      {/* Hero Section */}
      <section
        className="lokasi-hero"
        style={{
          backgroundImage: `url(${encodeURI(
            process.env.PUBLIC_URL + "/images/bg beranda awal.jpg"
          )})`,
        }}
      >
        <div className="lokasi-hero-overlay">
          <div className="lokasi-hero-inner">
            <h1>
              Temukan Lokasi <span className="accent">Donor Darah</span>
            </h1>
            <p className="lokasi-sub">
              Cek ketersediaan stok darah dan jadwalkan donormu
              <br />
              di rumah sakit atau PMI terdekat.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="lokasi-search-section">
        <div className="lokasi-search-container">
          <div className="lokasi-search-card">
            <div className="search-input-group">
              <input
                type="text"
                placeholder="Cari nama rumah sakit atau PMI..."
                className="lokasi-search-input"
              />
            </div>
            <div className="search-select-group">
              <select className="lokasi-search-select">
                <option>Semua Kota/Kabupaten</option>
                <option>Medan</option>
                <option>Balige</option>
              </select>
            </div>
            <button className="search-btn">Cari Lokasi</button>
          </div>
        </div>
      </section>

      <main className="lokasi-main">
        
        {/* 3. SECTION PETA GOOGLE MAPS */}
        <div className="lokasi-list" style={{ marginBottom: "40px" }}>
            <h2 style={{fontSize: "1.5rem", fontWeight: "700", marginBottom: "15px", color: "#333"}}>
                Peta Sebaran Lokasi
            </h2>
            {/* Panggil komponen peta dan kirim data locations */}
            <GoogleMapComponent locations={sampleLocations} />
        </div>

        {/* List Card Lokasi */}
        <div className="lokasi-list">
          {sampleLocations.map((loc) => (
            <article className="lokasi-card" key={loc.id}>
              <div className="lokasi-card-img">
                <img
                  src={process.env.PUBLIC_URL + "/images/bg beranda awal.jpg"}
                  alt={loc.name}
                />
              </div>
              <div className="lokasi-card-body">
                <div className="lokasi-card-header">
                  <span className="lokasi-tag">{loc.city}</span>
                  <h3>{loc.name}</h3>
                  <div className="lokasi-address">{loc.address}</div>
                </div>

                {/* Kebutuhan Mendesak */}
                {loc.urgent && (
                  <div className="urgent-container">
                    <div className="urgent-box-top">
                      <strong>Kebutuhan Mendesak</strong>
                      <div className="urgent-blood">{loc.blood}</div>
                    </div>
                  </div>
                )}

                <div className="lokasi-card-meta">
                  <div className="meta-left">
                    <span className="meta-star">
                      <FaStar className="meta-icon" /> {loc.rating}
                    </span>
                    <span className="meta-distance">
                      <FaMapMarkerAlt className="meta-icon" /> {loc.distance}
                    </span>
                    <span className="meta-donors">
                      <FaUsers className="meta-icon" /> {loc.donors} Pendonor
                    </span>
                  </div>

                  <div className="meta-right">
                    <Link
                      to={`/lokasi-donor/${loc.id}`}
                      className="lokasi-detail-link"
                    >
                      Lihat Detail Lokasi →
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Shared Footer Component
      <Footer /> */}
    </div>
  );
}