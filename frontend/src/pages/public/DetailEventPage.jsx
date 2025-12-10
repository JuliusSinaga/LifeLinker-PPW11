import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./DetailEventPage.css";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaArrowLeft,
  FaStar,
} from "react-icons/fa";
import Header from "../../components/Header";
import axiosClient from "../../service/axiosClient";

export default function DetailEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State Data Event & Loading
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // State Form Pendaftaran
  const [formData, setFormData] = useState({
    nama: "",
    nomor: "",
    tanggalDonorTerakhir: "",
    pilihTanggal: "",
    pilihJam: "",
  });

  // 1. Fetch Detail Event dari Backend
  useEffect(() => {
    const fetchDetailEvent = async () => {
      try {
        const response = await axiosClient.get(`/events/${id}`);
        const dataDB = response.data.data;

        // Hitung kuota (Contoh: Total 300 - Jumlah Peserta Terdaftar)
        const totalQuota = 300; 
        const currentParticipants = dataDB.Participants ? dataDB.Participants.length : 0;

        // Mapping data DB ke struktur frontend
        const eventData = {
          id: dataDB.ID,
          title: dataDB.nama_event,
          description: dataDB.deskripsi_event,
          // Format tanggal: "Senin, 20 Oktober 2025"
          date: formatDate(dataDB.tanggal_event),
          time: "08:00 - 14:00 WIB", // Default karena di DB belum ada kolom jam
          location: dataDB.lokasi?.nama_lokasi || "Lokasi belum ditentukan",
          address: dataDB.lokasi?.alamat_lokasi || "Alamat belum tersedia",
          image: dataDB.gambar_event || "bg beranda awal.jpg", // Gambar default jika kosong
          targetDate: new Date(dataDB.tanggal_event), // Untuk countdown timer
          
          // Data Pelengkap (Dummy/Default untuk fitur yang belum ada di DB)
          quota: { 
            current: currentParticipants, 
            total: totalQuota 
          },
          timeline: [
            { time: "08:00 - 10:00", activity: "Registrasi & Cek Kesehatan", status: "active" },
            { time: "10:00 - 14:00", activity: "Proses Donor Darah", status: "upcoming" },
          ],
          partners: [
            { name: "PMI", logo: "pmi-logo.png" },
            { name: "LifeLinker", logo: "lifelinker-logo.png" }
          ],
          testimonials: [
            { name: "Peserta 1", rating: 5, comment: "Acara sangat bermanfaat!" },
            { name: "Peserta 2", rating: 4, comment: "Antrian tertib." }
          ]
        };

        setEvent(eventData);
      } catch (error) {
        console.error("Gagal mengambil detail event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailEvent();
  }, [id]);

  // 2. Countdown Timer Logic
  useEffect(() => {
    if (!event) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = event.targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Jalankan sekali di awal

    return () => clearInterval(timer);
  }, [event]);

  // Helper Functions
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pendaftaran Event Berhasil (Simulasi)!");
    // Nanti bisa tambahkan axiosClient.post('/events/register', formData) di sini
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} className={i < rating ? "star-filled" : "star-empty"} />
    ));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Render Loading & Error
  if (loading) {
    return (
      <div className="detail-event-root" style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
        <p>Memuat detail event...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="detail-event-root" style={{textAlign:'center', padding:'50px'}}>
        <h2>Event tidak ditemukan.</h2>
        <button onClick={() => navigate('/event')} style={{marginTop:'20px', padding:'10px 20px'}}>Kembali ke Daftar Event</button>
      </div>
    );
  }

  return (
    <div className="detail-event-root">
      {/* Header Shared */}
      <Header />

      {/* Hero Section with Countdown */}
      <section className="event-hero-detail" style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + "/images/" + event.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
      }}>
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

              {/* Testimonials */}
              <div className="testimonials-card">
                <h3>Apa Kata Mereka?</h3>
                <div className="testimonials-list">
                  {event.testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-item">
                      <div className="testimonial-header">
                        <div className="testimonial-info">
                          <div className="testimonial-name">{testimonial.name}</div>
                          <div className="testimonial-rating">{renderStars(testimonial.rating)}</div>
                        </div>
                      </div>
                      <div className="testimonial-comment">"{testimonial.comment}"</div>
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
                          width: `${(event.quota.current / event.quota.total) * 100}%`,
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
                    <label htmlFor="nomor">Golongan Darah</label>
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

                  {/* Field tambahan bisa ditambahkan di sini */}
                  
                  <button type="submit" className="register-button">
                    Daftar Sekarang
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
}