import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BerandaPage.css";
import Header from "../../components/Header";
import axiosClient from "../../service/axiosClient"; // 1. Import API Client

// --- Import Icons ---
import {
  FaHeartbeat,
  FaSyringe,
  FaPills,
  FaStethoscope,
  FaTired,
  FaHandHoldingHeart,
  FaLightbulb,
  FaExchangeAlt,
  FaHandsHelping,
  FaUserFriends,
  FaBoxes,
  FaCalendarAlt,
  FaLifeRing,
  FaHeart,
  FaCarCrash,
  FaUserInjured,
} from "react-icons/fa";

export default function BerandaPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stats, setStats] = useState({
    total_users: 0,
    total_kantong: 0,
    total_event: 0,
    nyawa_selamet: 0,
  });

  // 2. Cek Login & Fetch Statistik dari Backend
  useEffect(() => {
    // Cek Login
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role"); // Opsional: Cek role jika perlu
    if (token) {
      setIsLoggedIn(true);
    }

    // Fetch Statistik (Kita ambil dari endpoint dashboard/admin sebagai sumber data global)
    // Atau Anda bisa buat endpoint khusus /public/stats di backend jika mau lebih aman
    const fetchStats = async () => {
      try {
        const response = await axiosClient.get("/dashboard/admin"); // Gunakan endpoint yang sudah ada
        const data = response.data.data;

        // Hitung total nyawa (Asumsi 1 kantong = 3 nyawa)
        const totalKantong = data.stock_count || 0;
        
        setStats({
          total_users: data.user_count || 0,
          total_kantong: totalKantong,
          total_event: data.event_count || 0,
          nyawa_selamet: totalKantong * 3, 
        });
      } catch (error) {
        console.error("Gagal mengambil statistik:", error);
        // Fallback jika gagal (agar tampilan tidak rusak)
        setStats({
            total_users: 15204,
            total_kantong: 45890,
            total_event: 89,
            nyawa_selamet: 137670
        });
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="beranda-root">
      {/* Shared Header Component */}
      {/* Header otomatis menangani props isLoggedIn via localStorage, tapi props ini tetap aman */}
      <Header showUserProfile={isLoggedIn} />

      {/* 1. LAYAR PENUH: HERO Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/bg%20beranda%20awal.jpg)`,
          backgroundPosition: "center right",
          backgroundSize: "cover",
        }}
      >
        <div className="hero-overlay">
          <div className="hero-content-wrapper">
            <div className="hero-content">
              <h1>
                Selamatkan Nyawa
                <br />
                <span className="accent">dengan Donor Darah</span>
              </h1>
              <p className="hero-sub">
                Bergabunglah dengan ribuan pendonor darah di seluruh Indonesia.
                Satu Tetes Darah, Ribuan Harapan.
              </p>
              <Link to="/lokasi-donor" className="btn-primary">
                Cari Lokasi Donor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}

      {/* 2. Ragu Untuk Donor? */}
      <section className="checklist-section">
        <h2>Ragu Untuk Donor?</h2>
        <h3 className="checklist-subtitle">Cek Kelayakan Cepat!</h3>
        <div className="checklist-card">
          <div className="progress-wrap">
            <div className="progress-bar-fill" style={{ width: "25%" }}></div>
          </div>

          {[
            { icon: <FaHeartbeat />, q: "Apakah Anda dalam kondisi sehat saat ini?" },
            { icon: <FaSyringe />, q: "Apakah Anda memiliki riwayat penyakit menular (hepatitis, HIV, TBC)?" },
            { icon: <FaPills />, q: "Apakah Anda sedang mengonsumsi obat-obatan secara rutin?" },
            { icon: <FaStethoscope />, q: "Apakah dalam 6 bulan terakhir Anda menjalani operasi besar?" },
            { icon: <FaTired />, q: "Apakah Anda sering mengalami pusing atau mudah lelah?" },
          ].map((item, i) => (
            <div className="check-item" key={i}>
              <div className="check-question">
                {item.icon} {item.q}
              </div>
              <div className="answers">
                <button className="btn-check-yes">Ya</button>
                <button className="btn-check-no">Tidak</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Apa itu LifeLinker? */}
      <section className="about-section">
        <h2>Apa itu <span className="accent">LifeLinker?</span></h2>
        <div className="about-cards-grid">
          <div className="about-card-item">
            <FaHandHoldingHeart className="about-icon" />
            <h3>Visi kami</h3>
            <p>Menjadi wadah peduli dan berkontribusi nyata dalam meningkatkan kesehatan serta ketersediaan darah.</p>
          </div>
          <div className="about-card-item">
            <FaLightbulb className="about-icon" />
            <h3>Misi kami</h3>
            <p>Mengedukasi masyarakat dan memfasilitasi proses donor yang aman, cepat, dan terorganisir.</p>
          </div>
          <div className="about-card-item">
            <FaExchangeAlt className="about-icon" />
            <h3>Tujuan Mulia</h3>
            <p>Platform digital penghubung pendonor darah dengan mereka yang membutuhkan secara efisien.</p>
          </div>
          <div className="about-card-item">
            <FaBoxes className="about-icon" />
            <h3>Mudah & Praktis</h3>
            <p>Temukan jadwal, daftar event, dan simpan riwayat donor dalam satu aplikasi.</p>
          </div>
          <div className="about-card-item">
            <FaHandsHelping className="about-icon" />
            <h3>Komunitas Solidaritas</h3>
            <p>Bergabunglah dengan komunitas pendonor, berbagi cerita, dan saling menginspirasi.</p>
          </div>
        </div>
      </section>

      {/* 4. Kekuatan Kolektif Kita (Statistik Dinamis) */}
      <section className="collective-strength-section">
        <div className="collective-strength-overlay">
          <h2>Kekuatan <span className="accent">Kolektif</span> Kita</h2>
          <p className="collective-strength-subtitle">
            Terima kasih kepada para pendonor dan relawan yang telah menjadi bagian dari perjalanan ini.
          </p>
          <div className="stats-grid">
            <div className="stat-item-new">
              <FaUserFriends className="stat-icon" />
              <div className="stat-number">{stats.total_users.toLocaleString("id-ID")}</div>
              <div className="stat-label">Pendonor Terdaftar</div>
            </div>
            <div className="stat-item-new">
              <FaBoxes className="stat-icon" />
              <div className="stat-number">{stats.total_kantong.toLocaleString("id-ID")}</div>
              <div className="stat-label">Kantong Darah Terkumpul</div>
            </div>
            <div className="stat-item-new">
              <FaLifeRing className="stat-icon" />
              <div className="stat-number">{stats.nyawa_selamet.toLocaleString("id-ID")}</div>
              <div className="stat-label">Nyawa Terselamatkan</div>
            </div>
            <div className="stat-item-new">
              <FaCalendarAlt className="stat-icon" />
              <div className="stat-number">{stats.total_event.toLocaleString("id-ID")}</div>
              <div className="stat-label">Event Telah Dilaksanakan</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Jejak Kebaikan Anda */}
      <section className="good-deeds-section">
        <h2>Jejak Kebaikan Anda</h2>
        <p className="good-deeds-subtitle">
          Setiap tetes darah sangat berarti. Lihat bagaimana donasi kolektif memberikan harapan baru.
        </p>
        <div className="good-deeds-cards-grid">
          <div className="good-deeds-card-item">
            <FaHeart className="good-deeds-icon" />
            <h3>Operasi Jantung Anak</h3>
            <p><strong>Kemarin:</strong> 5 kantong darah membantu operasi jantung anak di RS Harapan Kita.</p>
          </div>
          <div className="good-deeds-card-item">
            <FaCarCrash className="good-deeds-icon" />
            <h3>Korban Kecelakaan</h3>
            <p><strong>3 Hari Lalu:</strong> Stok O+ menyelamatkan korban kecelakaan lalu lintas di Bandung.</p>
          </div>
          <div className="good-deeds-card-item">
            <FaUserInjured className="good-deeds-icon" />
            <h3>Pasien Thalassemia</h3>
            <p><strong>Minggu Lalu:</strong> Kebutuhan transfusi rutin pasien Thalassemia terpenuhi.</p>
          </div>
        </div>
      </section>

      {/* 6. Testimoni */}
      <section className="testimonials-section">
        <h2>Apa Kata Mereka?</h2>
        <div className="testimonials-grid">
          <div className="testimonial-item">
            <img src={process.env.PUBLIC_URL + "/images/budi-avatar.png"} alt="Budi S." className="testimonial-avatar" />
            <div className="testimonial-content">
              <strong>Budi S., Pendonor Aktif</strong>
              <p>"LifeLinker membuat saya jadi rutin donor. Fitur pengingatnya sangat membantu!"</p>
            </div>
          </div>
          <div className="testimonial-item">
            <img src={process.env.PUBLIC_URL + "/images/siti-avatar.png"} alt="Siti A." className="testimonial-avatar" />
            <div className="testimonial-content">
              <strong>Siti A., Penerima Donor</strong>
              <p>"Anak saya selamat berkat darah yang tersedia cepat. Aplikasinya sangat memudahkan."</p>
            </div>
          </div>
          <div className="testimonial-item">
            <img src={process.env.PUBLIC_URL + "/images/rina-avatar.png"} alt="Rina W." className="testimonial-avatar" />
            <div className="testimonial-content">
              <strong>Rina W., Relawan</strong>
              <p>"Komunitasnya sangat positif! Senang bisa jadi bagian dari gerakan ini."</p>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}