import React from "react";
import { Link } from "react-router-dom"; // Untuk navigasi
// import { getPublicStats } from "../../services/publicService"; // Kita pakai data statis dulu
import "./BerandaPage.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// --- Import Icons (Pastikan Anda sudah 'npm install react-icons') ---
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
  // Kita gunakan data statis dulu agar 100% cocok dengan UI
  const stats = {
    total_users: 15204,
    total_kantong: 45890,
    total_event: 89,
    nyawa_selamet: 1250, // UI Anda menunjukkan 1.250
  };

  return (
    <div className="beranda-root">
      {/* Shared Header Component */}
      <Header />

      {/* 1. LAYAR PENUH: HERO Section with background image */}
      <section
        className="hero"
        style={{
          backgroundImage: `url(${encodeURI(
            process.env.PUBLIC_URL + "/images/bg beranda awal.jpg"
          )})`,
          backgroundPosition: "center right",
          backgroundSize: "cover",
        }}
      >
        <div className="hero-overlay">
          {/* Konten Hero */}
          <div className="hero-content-wrapper">
            <div className="hero-content">
              <h1>
                Selamatkan Nyawa
                <br />
                <span className="accent">dengan Donor Darah</span>
              </h1>
              <p className="hero-sub">
                Bergabunglah dengan jutaan pendonor darah di seluruh Indonesia.
                Satu Tetes Darah, Ribuan Harapan.
              </p>
              <Link to="/lokasi-donor" className="btn-primary">
                Cari Lokasi Donor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT (di dalam root yang bisa di-scroll) */}

      {/* 2. LAYAR PENUH: Ragu Untuk Donor? */}
      <section className="checklist-section">
        <h2>Ragu Untuk Donor?</h2>
        <h3 className="checklist-subtitle">Cek Kelayakan Cepat!</h3>
        <div className="checklist-card">
          {/* Progress Bar (statis untuk UI ini) */}
          <div className="progress-wrap">
            <div className="progress-bar-fill" style={{ width: "25%" }}></div>
          </div>

          {/* Daftar Pertanyaan */}
          {[
            {
              icon: <FaHeartbeat />,
              q: "Apakah Anda dalam kondisi sehat saat ini?",
            },
            {
              icon: <FaSyringe />,
              q: "Apakah Anda memiliki riwayat penyakit menular (misalnya hepatitis, HIV, TBC)?",
            },
            {
              icon: <FaPills />,
              q: "Apakah Anda sedang mengonsumsi obat-obatan secara rutin?",
            },
            {
              icon: <FaStethoscope />,
              q: "Apakah dalam 6 bulan terakhir Anda menjalani operasi besar atau perawatan medis serius?",
            },
            {
              icon: <FaTired />,
              q: "Apakah Anda sering mengalami pusing, lemas, atau mudah lelah dalam aktivitas sehari-hari?",
            },
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

      {/* 3. LAYAR PENUH: Apa itu LifeLinker? */}
      <section className="about-section">
        <h2>
          Apa itu <span className="accent">LifeLinker?</span>
        </h2>
        <div className="about-cards-grid">
          {/* Visi Kami */}
          <div className="about-card-item">
            <FaHandHoldingHeart className="about-icon" />
            <h3>Visi kami</h3>
            <p>
              Kami memiliki visi untuk menjadi wadah yang peduli dan
              berkontribusi nyata dalam meningkatkan kesehatan serta
              ketersediaan darah di Indonesia.
            </p>
          </div>
          {/* Misi Kami */}
          <div className="about-card-item">
            <FaLightbulb className="about-icon" />
            <h3>Misi kami</h3>
            <p>
              Mengedukasi masyarakat tentang pentingnya donor darah dan
              memfasilitasi proses donor yang aman, cepat, dan terorganisir.
            </p>
          </div>
          {/* Tujuan Mulia */}
          <div className="about-card-item">
            <FaExchangeAlt className="about-icon" />
            <h3>Tujuan Mulia</h3>
            <p>
              Platform digital untuk menghubungkan pendonor darah dengan mereka
              yang membutuhkan secara cepat dan efisien.
            </p>
          </div>
          {/* Mudah & Praktis (Sesuai UI) */}
          <div className="about-card-item">
            <FaBoxes className="about-icon" />
            <h3>Mudah & Praktis</h3>
            <p>
              Temukan jadwal donor, daftar event, dan simpan riwayat donor Anda
              dalam satu aplikasi yang mudah diakses.
            </p>
          </div>
          {/* Komunitas Solidaritas (Sesuai UI) */}
          <div className="about-card-item">
            <FaHandsHelping className="about-icon" />
            <h3>Komunitas Solidaritas</h3>
            <p>
              Bergabunglah dengan komunitas pendonor, berbagi cerita, dan saling
              menginspirasi untuk kebaikan.
            </p>
          </div>
        </div>
      </section>

      {/* 4. LAYAR PENUH: Kekuatan Kolektif Kita */}
      <section className="collective-strength-section">
        <div className="collective-strength-overlay">
          <h2>
            Kekuatan <span className="accent">Kolektif</span> Kita
          </h2>
          <p className="collective-strength-subtitle">
            Terima kasih kepada para pendonor dan relawan yang telah menjadi
            bagian dari perjalanan ini.
          </p>
          <div className="stats-grid">
            <div className="stat-item-new">
              <FaUserFriends className="stat-icon" />
              <div className="stat-number">
                {stats.total_users.toLocaleString("id-ID")}
              </div>
              <div className="stat-label">Pendonor Terdaftar</div>
            </div>
            <div className="stat-item-new">
              <FaBoxes className="stat-icon" />
              <div className="stat-number">
                {stats.total_kantong.toLocaleString("id-ID")}
              </div>
              <div className="stat-label">Kantong Darah Terkumpul</div>
            </div>
            <div className="stat-item-new">
              <FaLifeRing className="stat-icon" />
              <div className="stat-number">
                {stats.nyawa_selamet.toLocaleString("id-ID")}
              </div>
              <div className="stat-label">Nyawa Terselamatkan</div>
            </div>
            <div className="stat-item-new">
              <FaCalendarAlt className="stat-icon" />
              <div className="stat-number">
                {stats.total_event.toLocaleString("id-ID")}
              </div>
              <div className="stat-label">Event Telah Dilaksanakan</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LAYAR PENUH: Jejak Kebaikan Anda */}
      <section className="good-deeds-section">
        <h2>Jejak Kebaikan Anda</h2>
        <p className="good-deeds-subtitle">
          Setiap tetes darah sangat berarti. Lihat bagaimana donasi kolektif
          dari komunitas kita telah memberikan harapan baru.
        </p>
        <div className="good-deeds-cards-grid">
          <div className="good-deeds-card-item">
            <FaHeart className="good-deeds-icon" />
            <h3>Operasi Jantung Anak</h3>
            <p>
              <strong>Kemarin:</strong> 5 kantong darah dari event di
              Universitas Indonesia membantu kelancaran operasi jantung seorang
              anak di RS Harapan Kita.
            </p>
          </div>
          <div className="good-deeds-card-item">
            <FaCarCrash className="good-deeds-icon" />
            <h3>Korban Kecelakaan</h3>
            <p>
              <strong>3 Hari Lalu:</strong> Stok golongan darah O+ dari PMI
              Bandung berhasil menyelamatkan nyawa seorang korban kecelakaan
              lalu lintas.
            </p>
          </div>
          <div className="good-deeds-card-item">
            <FaUserInjured className="good-deeds-icon" />
            <h3>Pasien Thalassemia</h3>
            <p>
              <strong>Minggu Lalu:</strong> Kebutuhan transfusi rutin pasien
              Thalassemia di Surabaya terpenuhi berkat 10 pendonor setia.
            </p>
          </div>
        </div>
      </section>

      {/* 6. LAYAR PENUH: Apa Kata Mereka? - Testimoni */}
      <section className="testimonials-section">
        <h2>Apa Kata Mereka?</h2>
        <div className="testimonials-grid">
          {/* Testimoni Budi */}
          <div className="testimonial-item">
            <img
              src={process.env.PUBLIC_URL + "/images/budi-avatar.png"}
              alt="Budi S. Avatar"
              className="testimonial-avatar"
            />
            <div className="testimonial-content">
              <strong>Budi S., Pendonor Aktif</strong>
              <p>
                "LifeLinker membuat saya jadi rutin donor. Fitur pengingatnya
                sangat membantu! Desainnya juga keren banget sekarang."
              </p>
            </div>
          </div>
          {/* Testimoni Siti */}
          <div className="testimonial-item">
            <img
              src={process.env.PUBLIC_URL + "/images/siti-avatar.png"}
              alt="Siti A. Avatar"
              className="testimonial-avatar"
            />
            <div className="testimonial-content">
              <strong>Siti A., Penerima Donor</strong>
              <p>
                "Terima kasih untuk para pendonor. Anak saya selamat berkat
                darah yang tersedia cepat. Aplikasinya sangat memudahkan."
              </p>
            </div>
          </div>
          {/* Testimoni Rina */}
          <div className="testimonial-item">
            <img
              src={process.env.PUBLIC_URL + "/images/rina-avatar.png"}
              alt="Rina W. Avatar"
              className="testimonial-avatar"
            />
            <div className="testimonial-content">
              <strong>Rina W., Relawan</strong>
              <p>
                "Komunitasnya sangat positif! Saya jadi banyak belajar tentang
                pentingnya donor darah. Senang bisa jadi bagian dari ini."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Footer Component
      <Footer /> */}
    </div>
  );
}
