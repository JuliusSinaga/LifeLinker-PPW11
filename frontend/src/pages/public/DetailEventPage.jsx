import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./DetailEventPage.css";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaArrowLeft,
  FaStar,
  FaPhone,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Sample detailed event data
const eventDetailData = {
  1: {
    id: 1,
    title: "Donor Hari Pahlawan 2025",
    description:
      "Dalam rangka memperingati Hari Pahlawan, BEM Institut Teknologi Del bekerja sama dengan LifeLinker Community mengadakan aksi sosial donor darah terbesar di kota Laguboti. Acara ini terbuka untuk seluruh mahasiswa dan masyarakat umum. Setiap tetes darah adalah harapan bagi mereka yang membutuhkan. Mari jadi pahlawan kemanusiaan bersama kami!",
    date: "15-17 Oktober 2025",
    time: "08:00 - 14:00 WIB",
    location: "Institut Teknologi Del",
    address: "Jl. Sisingamangaraja, Sitoluama, Laguboti",
    targetDate: new Date("2025-10-15T08:00:00"),
    quota: {
      current: 250,
      total: 500,
    },
    timeline: [
      {
        time: "08:00 - 10:00",
        activity: "Registrasi Ulang & Pemeriksaan Kesehatan",
        status: "active",
      },
      {
        time: "10:00 - 12:00",
        activity: "Proses Donor Darah",
        status: "upcoming",
      },
      { time: "12:00 - 13:00", activity: "Istirahat", status: "upcoming" },
      {
        time: "13:00 - 14:00",
        activity: "Lanjut Proses Donor Darah",
        status: "upcoming",
      },
    ],
    partners: [
      { name: "Institut Teknologi Del", logo: "del-logo.png" },
      { name: "BEM IT Del", logo: "bem-logo.png" },
      { name: "PMI Tobasa", logo: "pmi-logo.png" },
    ],
    testimonials: [
      {
        name: "Dina Siagian",
        rating: 5,
        comment:
          "Eventnya terorganisir dengan baik, fasilitasnya ramah dan sangat membantu!",
        avatar: "dina-avatar.jpg",
      },
      {
        name: "Rachel S.",
        rating: 4,
        comment:
          "Senang sekali bisa berpartisipasi. Semoga bisa diadakan lagi di tahun yang akan datang!",
        avatar: "rachel-avatar.jpg",
      },
    ],
  },
};

export default function DetailEventPage() {
  const { id } = useParams();
  const event = eventDetailData[id] || eventDetailData[1];

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [formData, setFormData] = useState({
    nama: "",
    nomor: "",
    tanggalDonorTerakhir: "",
    pilihTanggal: "",
    pilihJam: "",
  });

  // Countdown timer effect
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = event.targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [event.targetDate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} className={i < rating ? "star-filled" : "star-empty"} />
    ));
  };

  return (
    <div className="detail-event-root">
      <Header />

      {/* Hero Section with Countdown */}
      <section className="event-hero-detail">
        <div className="hero-overlay">
          <div className="hero-content-detail">
            <Link to="/event" className="back-link">
              <FaArrowLeft /> Kembali ke Event
            </Link>
            <h1>{event.title}</h1>

            {/* Countdown Timer */}
            <div className="countdown-timer">
              <div className="countdown-item">
                <div className="countdown-number">{timeLeft.days}</div>
                <div className="countdown-label">Hari</div>
              </div>
              <div className="countdown-item">
                <div className="countdown-number">{timeLeft.hours}</div>
                <div className="countdown-label">Jam</div>
              </div>
              <div className="countdown-item">
                <div className="countdown-number">{timeLeft.minutes}</div>
                <div className="countdown-label">Menit</div>
              </div>
              <div className="countdown-item">
                <div className="countdown-number">{timeLeft.seconds}</div>
                <div className="countdown-label">Detik</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="event-detail-main">
        <div className="event-detail-container">
          <div className="event-detail-grid">
            {/* Left Column - Event Info */}
            <div className="event-info-column">
              {/* Event Description */}
              <div className="event-description-card">
                <h2>Deskripsi Event</h2>
                <p>{event.description}</p>
              </div>

              {/* Event Information */}
              <div className="event-info-card">
                <h3>Informasi Penting</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <FaCalendarAlt className="info-icon" />
                    <div>
                      <div className="info-label">Tanggal</div>
                      <div className="info-value">{event.date}</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <FaClock className="info-icon" />
                    <div>
                      <div className="info-label">Waktu</div>
                      <div className="info-value">{event.time}</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <FaMapMarkerAlt className="info-icon" />
                    <div>
                      <div className="info-label">Lokasi</div>
                      <div className="info-value">{event.location}</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <FaUsers className="info-icon" />
                    <div>
                      <div className="info-label">Peserta</div>
                      <div className="info-value">Mahasiswa & Umum</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="timeline-card">
                <h3>Timeline Acara</h3>
                <div className="timeline-list">
                  {event.timeline.map((item, index) => (
                    <div key={index} className={`timeline-item ${item.status}`}>
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <div className="timeline-time">{item.time}</div>
                        <div className="timeline-activity">{item.activity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Map */}
              <div className="location-card">
                <h3>Lokasi di Peta</h3>
                <div className="map-placeholder">
                  <img
                    src={process.env.PUBLIC_URL + "/images/bg beranda awal.jpg"}
                    alt="Peta Lokasi"
                  />
                </div>
              </div>

              {/* Partners */}
              <div className="partners-card">
                <h3>Partner & Sponsor</h3>
                <div className="partners-grid">
                  {event.partners.map((partner, index) => (
                    <div className="partner-item">
                      <img
                        src={
                          process.env.PUBLIC_URL + "/images/bg beranda awal.jpg"
                        }
                        alt={partner.name}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div className="testimonials-card">
                <h3>Testimoni Peserta Sebelumnya</h3>
                <div className="testimonials-list">
                  {event.testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-item">
                      <div className="testimonial-header">
                        <div className="testimonial-avatar">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/images/bg beranda awal.jpg"
                            }
                            alt={testimonial.name}
                          />
                        </div>
                        <div className="testimonial-info">
                          <div className="testimonial-name">
                            {testimonial.name}
                          </div>
                          <div className="testimonial-rating">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>
                      </div>
                      <div className="testimonial-comment">
                        "{testimonial.comment}"
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Registration Form */}
            <div className="registration-column">
              {/* Registration Status */}
              <div className="registration-status-card">
                <h3>Status Pendaftaran</h3>
                <div className="quota-info">
                  <div className="quota-label">Kuota Terisi</div>
                  <div className="quota-progress-row">
                    <div className="quota-bar">
                      <div
                        className="quota-fill"
                        style={{
                          width: `${
                            (event.quota.current / event.quota.total) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="quota-numbers">
                      {event.quota.current} / {event.quota.total}
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Form */}
              <div className="registration-form-card">
                <h3>Daftar Event</h3>
                <form onSubmit={handleSubmit} className="registration-form">
                  <div className="form-group">
                    <label htmlFor="nama">Nama Lengkap</label>
                    <input
                      type="text"
                      id="nama"
                      name="nama"
                      value={formData.nama}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="nomor">Nomor HP</label>
                    <select
                      id="nomor"
                      name="nomor"
                      value={formData.nomor}
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
                    <label htmlFor="tanggalDonorTerakhir">
                      Tanggal Donor Terakhir
                    </label>
                    <input
                      type="date"
                      id="tanggalDonorTerakhir"
                      name="tanggalDonorTerakhir"
                      value={formData.tanggalDonorTerakhir}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="pilihTanggal">Pilih Tanggal Donor</label>
                    <input
                      type="date"
                      id="pilihTanggal"
                      name="pilihTanggal"
                      value={formData.pilihTanggal}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="pilihJam">Pilih Jam</label>
                    <input
                      type="time"
                      id="pilihJam"
                      name="pilihJam"
                      value={formData.pilihJam}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <button type="submit" className="register-button">
                    Daftar Sekarang
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
