import React from "react";
import DokterSidebar from "../components/DokterSidebar";
import "../styles/KonsultasiEdukasi.css";

export default function KonsultasiEdukasiDokter() {
  return (
    <div className="dokter-layout">
      <DokterSidebar />

      <main className="dokter-main">
        <h2 className="page-title">Manajemen Konsultasi</h2>

        {/* =============== CHAT SECTION =============== */}
        <div className="chat-container">
          {/* LEFT CHAT LIST */}
          <div className="chat-list">
            <input
              type="text"
              placeholder="Cari percakapan..."
              className="search-chat"
            />

            <div className="chat-user active">
              <img src="/images/user1.jpg" alt="" />
              <div>
                <h4>Budi Setiawan</h4>
                <p>Baik, Dok. Terima kasih atas...</p>
              </div>
            </div>

            <div className="chat-user">
              <img src="/images/user2.jpg" alt="" />
              <div>
                <h4>Siti Amizah</h4>
                <p>Dok, saya mau bertanya…</p>
              </div>
            </div>
          </div>

          {/* RIGHT CHAT VIEW */}
          <div className="chat-view">
            <div className="chat-header">
              <img src="/images/user1.jpg" alt="" />
              <h3>Budi Setiawan</h3>
            </div>

            <div className="chat-messages">
              <div className="bubble patient">
                Halo Dok. Saya mau tanya, apakah aman berolahraga setelah donor?
              </div>

              <div className="bubble doctor">
                Halo Pak Budi. Sebaiknya hindari aktivitas fisik berat selama 24
                jam setelah donor untuk memberi waktu tubuh memulihkan diri.
              </div>

              <div className="bubble patient">
                Baik, Dok. Terima kasih atas informasinya
              </div>
            </div>

            <div className="chat-input-area">
              <input placeholder="Ketik balasan Anda..." />
              <button className="send-btn">➤</button>
            </div>
          </div>
        </div>

        {/* =============== JADWAL KONSULTASI =============== */}
        <div className="schedule-container">
          <div className="schedule-header">
            <h3>Jadwal & Sesi Konsultasi Video</h3>
            <div className="tabs">
              <span className="tab active">Sesi Mendatang</span>
              <span className="tab">Riwayat Sesi</span>
            </div>
          </div>

          <div className="schedule-card">
            <h4>Konsultasi: Persiapan Khusus Donor Darah</h4>
            <p className="topic">
              Topik: Syarat & Kondisi Khusus Donor <br />
              <span>Senin, 30 Sep 2025 • 10:00 – 11:00 WIB • Zoom Meeting</span>
            </p>

            <div className="schedule-actions">
              <button className="btn start">Mulai Sesi</button>
              <button className="btn edit">✏ Edit</button>
              <button className="btn cancel">❌ Batalkan</button>
              <a className="link" href="#">🔗 Buka Link</a>

              <span className="status sukses">Terjadwal</span>
            </div>
          </div>

          <div className="schedule-card">
            <h4>Konsultasi: Persiapan Donor Darah</h4>
            <p className="topic">
              Topik: Sebelum & Sesudah Donor <br />
              <span>Senin, 29 Sep 2025 • 14:00 – 15:00 WIB • Zoom Meeting</span>
            </p>

            <div className="schedule-actions">
              <button className="btn start">Mulai Sesi</button>
              <button className="btn edit">✏ Edit</button>
              <button className="btn cancel">❌ Batalkan</button>
              <a className="link" href="#">🔗 Buka Link</a>

              <span className="status ongoing">Sedang Berlangsung</span>
            </div>
          </div>
        </div>

        {/* =============== FAQ =============== */}
        <div className="faq-container">
          <h3>Manajemen FAQ</h3>

          <div className="faq-controls">
            <select>
              <option>Semua Kategori</option>
              <option>Donor Darah</option>
            </select>

            <input placeholder="Cari FAQ…" />
          </div>

          <div className="faq-item">
            <h4>Apakah donor darah memiliki efek samping?</h4>
            <p>
              Efek samping umumnya ringan seperti pusing atau memar. Pastikan
              istirahat cukup dan minum banyak cairan setelahnya.
            </p>

            <div className="faq-btn-group">
              <button className="btn edit">✏</button>
              <button className="btn delete">🗑</button>
            </div>
          </div>

          <div className="faq-item">
            <h4>Bolehkah saya berdonor jika sedang menstruasi?</h4>
            <p>
              Boleh, selama Anda tidak merasa lemas atau pusing dan kadar Hb Anda
              memenuhi syarat (minimal 12.5 g/dL).
            </p>

            <div className="faq-btn-group">
              <button className="btn edit">✏</button>
              <button className="btn delete">🗑</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
