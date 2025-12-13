import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../../styles/DetailLokasiPage.css";
import {
  FaStar,
  FaPhone,
  FaClock,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaComments,
  FaRoute,
  FaUsers,
  FaHeart,
  FaTrophy,
  FaBullhorn,
  FaArrowLeft,
} from "react-icons/fa";
import Header from "../../components/Header";
import axiosClient from "../../service/axiosClient";

export default function DetailLokasiPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // State Form Pendaftaran (Simulasi)
  const [formData, setFormData] = useState({
    namaLengkap: "",
    nomorHP: "",
    golonganDarah: "",
    tanggalDonor: "",
    pilihTanggal: "",
    pilihJam: "",
  });

  // 1. Fetch Detail Lokasi dari Backend
  useEffect(() => {
    const fetchDetailLokasi = async () => {
      try {
        const response = await axiosClient.get(`/lokasi/${id}`);
        const dataDB = response.data.data;

        // 2. Gabungkan Data DB dengan Data Dummy (Hybrid)
        // Data DB: Nama, Alamat, Kontak, Jam Ops, Gambar
        // Data Dummy: Stok, Event, Review, Fitur (karena belum ada tabel relasinya)
        const mergedData = {
          id: dataDB.ID,
          name: dataDB.nama_lokasi,
          city: dataDB.alamat_lokasi.includes("Balige") ? "Balige" : "Medan", // Deteksi kota sederhana
          fullAddress: dataDB.alamat_lokasi,
          phone: dataDB.kontak_lokasi,
          operationalHours: dataDB.jam_operasional_lokasi,
          image: dataDB.gambar_lokasi || "/images/bg beranda awal.jpg",
          
          // --- Data Dummy Pelengkap ---
          rating: 4.8,
          reviewCount: 120,
          event: {
            title: "Donor Darah Rutin",
            subtitle: "Mari donorkan darah Anda di lokasi ini.",
            date: "Setiap Hari Kerja",
          },
          bloodStock: {
            "A+": "Aman",
            "AB-": "Kurang",
            "B+": "Aman",
            "O+": "Kritis",
          },
          quotaUsed: 45,
          quotaTotal: 100,
          features: [
            { icon: "FaUsers", title: "Dibutuhkan", subtitle: "Golongan darah O+ sangat dibutuhkan." },
            { icon: "FaHeart", title: "Pelayanan", subtitle: "Ramah dan profesional." },
            { icon: "FaTrophy", title: "Fasilitas", subtitle: "Ruang tunggu nyaman dan ber-AC." },
          ],
          reviews: [
            { name: "Andi S.", rating: 5, text: "Pelayanan sangat cepat dan tempat bersih." },
            { name: "Budi P.", rating: 4, text: "Antrian cukup panjang tapi tertib." },
          ],
        };

        setHospital(mergedData);
      } catch (error) {
        console.error("Gagal mengambil detail lokasi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailLokasi();
  }, [id]);

  // Helper Functions
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pendaftaran berhasil (Simulasi)!");
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} className={i < rating ? "star-filled" : "star-empty"} />
    ));
  };

  const getBloodTypeClass = (status) => {
    switch (status) {
      case "Kritis": return "blood-critical";
      case "Kurang": return "blood-standard"; // Reuse standard style for 'Kurang'
      case "Aman": return "blood-safe";
      default: return "blood-standard";
    }
  };

  const renderIcon = (iconName) => {
    switch (iconName) {
      case "FaUsers": return <FaUsers />;
      case "FaHeart": return <FaHeart />;
      case "FaTrophy": return <FaTrophy />;
      default: return <FaInfoCircle />;
    }
  };

  // Render Loading
  if (loading) {
    return (
      <div className="detail-root" style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <p>Memuat data lokasi...</p>
      </div>
    );
  }

  // Render Not Found
  if (!hospital) {
    return (
      <div className="detail-root" style={{textAlign:'center', padding:'50px'}}>
        <h2>Lokasi tidak ditemukan</h2>
        <button onClick={() => navigate('/lokasi-donor')} style={{marginTop:'20px', padding:'10px 20px', cursor:'pointer'}}>
          Kembali ke Daftar
        </button>
      </div>
    );
  }

  return (
    <div className="detail-root">
      <Header />

      {/* Hero Section */}
      <section className="detail-hero">
        <div className="detail-hero-content">
          {/* Tombol Kembali */}
          <button 
            className="btn-back" 
            onClick={() => navigate(-1)} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'transparent', 
              border: 'none', 
              color: 'white', 
              cursor: 'pointer', 
              marginBottom: '15px',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            <FaArrowLeft /> Kembali
          </button>

          <h1>{hospital.name}</h1>
          <p>{hospital.fullAddress}</p>
          <div className="detail-rating">
            {renderStars(Math.floor(hospital.rating))}
            <span className="rating-text">
              {hospital.rating} ({hospital.reviewCount} Review)
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="detail-main">
        <div className="detail-container">
          {/* Left Column */}
          <div className="detail-left">
            {/* Event Banner */}
            <div className="event-banner">
              <div className="event-icon">
                <FaBullhorn />
              </div>
              <div className="event-content">
                <h3>{hospital.event.title}</h3>
                <p>{hospital.event.subtitle}</p>
                <p>{hospital.event.date}</p>
              </div>
              <button className="event-info-btn">Informasi</button>
            </div>

            {/* Informasi & Stok Darah */}
            <div className="info-stok-section">
              <h3>Informasi & Stok Darah</h3>

              <div className="operational-info">
                <div className="info-item">
                  <FaClock className="info-icon" />
                  <div>
                    <strong>Jam Operasional</strong>
                    <p>{hospital.operationalHours}</p>
                  </div>
                </div>
                <div className="info-item">
                  <FaPhone className="info-icon" />
                  <div>
                    <strong>Nomor Kontak</strong>
                    <p>{hospital.phone}</p>
                  </div>
                </div>
              </div>

              <div className="blood-stock-grid">
                {Object.entries(hospital.bloodStock).map(([type, status]) => (
                  <div
                    key={type}
                    className={`blood-type-card ${getBloodTypeClass(status)}`}
                  >
                    <div className="blood-type">{type}</div>
                    <div className="blood-status">{status}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tahukah Anda? */}
            <div className="tahukah-section">
              <h3>Tahukah Anda?</h3>
              <div className="features-grid">
                {hospital.features.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div className="feature-icon">
                      {renderIcon(feature.icon)}
                    </div>
                    <h4>{feature.title}</h4>
                    <p>{feature.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="reviews-section">
              <h3>Review dari Pendonor</h3>
              {hospital.reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="review-header">
                    <strong>{review.name}</strong>
                    <div className="review-stars">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p>{review.text}</p>
                </div>
              ))}

              <div className="add-review">
                <h4>Bagikan Pengalaman Anda</h4>
                <div className="review-stars-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className="star-input" />
                  ))}
                </div>
                <textarea
                  placeholder="Tulis pengalaman Anda di sini..."
                  className="review-textarea"
                ></textarea>
                <button className="submit-review-btn">Kirim Review</button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="detail-right">
            {/* Status Pendaftaran */}
            <div className="status-card">
              <h3>Status Pendaftaran</h3>
              <div className="quota-info">
                <span>Kuota Terisi</span>
                <span>
                  {hospital.quotaUsed} / {hospital.quotaTotal}
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(hospital.quotaUsed / hospital.quotaTotal) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Daftar Event */}
            <div className="registration-card">
              <h3>Daftar Donor Disini</h3>
              <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                  <label>Nama Lengkap</label>
                  <input
                    type="text"
                    name="namaLengkap"
                    value={formData.namaLengkap}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Nomor HP</label>
                  <input
                    type="tel"
                    name="nomorHP"
                    value={formData.nomorHP}
                    onChange={handleInputChange}
                    placeholder="Contoh: 0812..."
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Golongan Darah</label>
                  <select
                    name="golonganDarah"
                    value={formData.golonganDarah}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Pilih Golongan Darah</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Tanggal Donor Terakhir</label>
                  <input
                    type="date"
                    name="tanggalDonor"
                    value={formData.tanggalDonor}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Pilih Tanggal Donor</label>
                  <input
                    type="date"
                    name="pilihTanggal"
                    value={formData.pilihTanggal}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Pilih Jam</label>
                  <input
                    type="time"
                    name="pilihJam"
                    value={formData.pilihJam}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <button type="submit" className="register-btn">
                  Daftar Sekarang
                </button>
              </form>
            </div>

            {/* Punya Pertanyaan */}
            <div className="question-card">
              <h3>Punya Pertanyaan?</h3>
              <p>
                Tanyakan langsung pada petugas medis di lokasi ini mengenai
                syarat atau kondisi kesehatan Anda.
              </p>
              <button className="chat-btn">
                <FaComments /> Chat dengan Petugas Medis
              </button>
            </div>

            {/* Arahkan ke Lokasi */}
            <div className="location-card">
              <h3>Arahkan ke Lokasi</h3>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.fullAddress)}`}
                target="_blank"
                rel="noreferrer"
                className="maps-btn"
                style={{textDecoration: 'none', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px'}}
              >
                <FaRoute /> Buka di Google Maps
              </a>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
}