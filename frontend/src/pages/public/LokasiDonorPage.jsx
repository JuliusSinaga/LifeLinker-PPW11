import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LokasiDonorPage.css";
import {
  FaStar,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";
import Header from "../../components/Header";
import GoogleMapComponent from "../../components/GoogleMapComponent"; // Import GoogleMapComponent
import axiosClient from "../../service/axiosClient"; 

export default function LokasiDonorPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Cek Login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // 2. Fetch Data Lokasi dari Backend
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axiosClient.get("/lokasi");
        const dataDB = response.data.data || [];

        // Mapping data DB ke format UI + Data Dummy pelengkap
        const mappedLocations = dataDB.map((item, index) => {
          // Logika dummy untuk simulasi UI
          const isUrgent = index % 2 === 0; // Selang-seling urgent
          const city = item.alamat_lokasi.includes("Balige") ? "Balige" : "Medan";
          
          return {
            id: item.ID,
            name: item.nama_lokasi,
            address: item.alamat_lokasi,
            city: city,
            image: item.gambar_lokasi || "/images/bg beranda awal.jpg",
            
            // --- Data Dummy ---
            rating: (4 + Math.random()).toFixed(1), // Rating acak 4.0 - 5.0
            distance: `${(2 + index * 1.5).toFixed(1)} km`,
            donors: 100 + index * 25,
            urgent: isUrgent,
            blood: isUrgent ? (index % 3 === 0 ? "A+ O+" : "B+") : "",
            
            // Koordinat Dummy (Sekitar Medan) agar peta muncul
            // Geser sedikit tiap lokasi agar tidak menumpuk
            lat: 3.5186 + (index * 0.02), 
            lng: 98.6053 + (index * 0.02),
          };
        });

        setLocations(mappedLocations);
      } catch (error) {
        console.error("Gagal mengambil data lokasi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="lokasid-root">
      {/* Shared Header Component */}
      <Header showUserProfile={isLoggedIn} />

      {/* Hero Section with background image */}
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
        {loading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>Memuat Lokasi...</div>
        ) : (
          <>
            {/* SECTION PETA GOOGLE MAPS */}
            <div className="lokasi-list" style={{ marginBottom: "40px" }}>
                <h2 style={{fontSize: "1.5rem", fontWeight: "700", marginBottom: "15px", color: "#333"}}>
                    Peta Sebaran Lokasi
                </h2>
                <GoogleMapComponent locations={locations} />
            </div>

            {/* List Card Lokasi */}
            <div className="lokasi-list">
              {locations.length > 0 ? (
                locations.map((loc) => (
                  <article className="lokasi-card" key={loc.id}>
                    <div className="lokasi-card-img">
                      <img
                        src={process.env.PUBLIC_URL + loc.image}
                        alt={loc.name}
                        onError={(e) => {e.target.onerror = null; e.target.src="/images/bg beranda awal.jpg"}}
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
                ))
              ) : (
                <div style={{ textAlign: "center", padding: "40px", width: "100%", color: "#666" }}>
                  Tidak ada lokasi ditemukan.
                </div>
              )}
            </div>
          </>
        )}
      </main>
      
    </div>
  );
}