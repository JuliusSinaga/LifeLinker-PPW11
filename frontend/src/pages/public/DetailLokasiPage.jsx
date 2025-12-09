import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./DetailLokasiPage.css";
import {
  FaStar,
  FaPhone,
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaInfoCircle,
  FaComments,
  FaRoute,
  FaUsers,
  FaHeart,
  FaTrophy,
  FaBullhorn,
} from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Sample data for hospital details
const hospitalData = {
  1: {
    id: 1,
    name: "RSUP H. Adam Malik",
    city: "Medan",
    fullAddress: "Medan, Sumatera Utara",
    rating: 4.6,
    reviewCount: 125,
    phone: "08123456789",
    operationalHours: "Senin - Jumat, 08:00 - 16:00",
    event: {
      title: "Event Donor Darah Spesial!",
      subtitle: "Bekerja sama dengan Institut Teknologi Del.",
      date: "15-17 Oktober 2025",
    },
    bloodStock: {
      "A+": "Kritis",
      "AB-": "Standar",
      "B+": "Aman",
      "O+": "Kritis",
    },
    quotaUsed: 250,
    quotaTotal: 500,
    features: [
      {
        icon: "FaUsers",
        title: "Dibutuhkan Segera",
        subtitle:
          "Golongan darah O adalah donor universal yang paling sering dibutuhkan untuk keadaan darurat.",
      },
      {
        icon: "FaHeart",
        title: "Manfaat Sehat",
        subtitle:
          "Donor darah rutin dapat membantu mengurangi risiko penyakit jantung dan membakar kalori hingga tiga ratus.",
      },
      {
        icon: "FaTrophy",
        title: "Selamatkan 3 Nyawa",
        subtitle:
          "Satu kantong darah yang Anda donasikan dapat dipisah dan menyelamatkan hingga tiga nyawa.",
      },
    ],
    reviews: [
      {
        name: "Dina Siagian",
        rating: 5,
        text: "Penyelenggaraan sangat ramah dan profesional. Tempatnya bersih dan nyaman, kecaneratatisas!",
      },
      {
        name: "Friska Patria",
        rating: 4,
        text: "Prosenya cepat, tidak lama menunggu sampai selesai cukup lima belas menit online dulu lewat halo chat.",
      },
    ],
  },
  2: {
    id: 2,
    name: "RS HKBP Balige",
    city: "Balige",
    fullAddress: "Porsea, Sumatera Utara",
    rating: 4.0,
    reviewCount: 100,
    phone: "08123456789",
    operationalHours: "Senin - Jumat, 08:00 - 16:00",
    event: {
      title: "Event Donor Darah Spesial!",
      subtitle: "Bekerja sama dengan Institut Teknologi Del.",
      date: "15-17 Oktober 2025",
    },
    bloodStock: {
      "A+": "Kritis",
      "AB-": "Standar",
      "B+": "Aman",
      "O+": "Kritis",
    },
    quotaUsed: 250,
    quotaTotal: 500,
    features: [
      {
        icon: "FaUsers",
        title: "Dibutuhkan Segera",
        subtitle:
          "Golongan darah O adalah donor universal yang paling sering dibutuhkan untuk keadaan darurat.",
      },
      {
        icon: "FaHeart",
        title: "Manfaat Sehat",
        subtitle:
          "Donor darah rutin dapat membantu mengurangi risiko penyakit jantung dan membakar kalori hingga tiga ratus.",
      },
      {
        icon: "FaTrophy",
        title: "Selamatkan 3 Nyawa",
        subtitle:
          "Satu kantong darah yang Anda donasikan dapat dipisah dan menyelamatkan hingga tiga nyawa.",
      },
    ],
    reviews: [
      {
        name: "Dina Siagian",
        rating: 5,
        text: "Penyelenggaraan sangat ramah dan profesional. Tempatnya bersih dan nyaman, kecaneratatisas!",
      },
      {
        name: "Friska Patria",
        rating: 4,
        text: "Prosenya cepat, tidak lama menunggu sampai selesai cukup lima belas menit online dulu lewat halo chat.",
      },
    ],
  },
};

export default function DetailLokasiPage() {
  const { id } = useParams();
  const hospital = hospitalData[id] || hospitalData[1];

  const [formData, setFormData] = useState({
    namaLengkap: "",
    nomorHP: "",
    golonganDarah: "",
    tanggalDonor: "",
    pilihTanggal: "",
    pilihJam: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pendaftaran berhasil!");
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= rating ? "star-filled" : "star-empty"}
        />
      );
    }
    return stars;
  };

  const getBloodTypeClass = (status) => {
    switch (status) {
      case "Kritis":
        return "blood-critical";
      case "Standar":
        return "blood-standard";
      case "Aman":
        return "blood-safe";
      default:
        return "blood-standard";
    }
  };

  const renderIcon = (iconName) => {
    switch (iconName) {
      case "FaUsers":
        return <FaUsers />;
      case "FaHeart":
        return <FaHeart />;
      case "FaTrophy":
        return <FaTrophy />;
      default:
        return <FaInfoCircle />;
    }
  };

  return (
    <div className="detail-root">
      <Header />

      {/* Hero Section */}
      <section className="detail-hero">
        <div className="detail-hero-content">
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
              <button className="event-info-btn">Informasi & Stok Darah</button>
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
                    width: `${
                      (hospital.quotaUsed / hospital.quotaTotal) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Daftar Event */}
            <div className="registration-card">
              <h3>Daftar Event</h3>
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
                  <select
                    name="nomorHP"
                    value={formData.nomorHP}
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
                    type="text"
                    name="pilihJam"
                    value={formData.pilihJam}
                    onChange={handleInputChange}
                    placeholder="Pilih waktu donor"
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
              <button className="maps-btn">
                <FaRoute /> Buka di Google Maps
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
