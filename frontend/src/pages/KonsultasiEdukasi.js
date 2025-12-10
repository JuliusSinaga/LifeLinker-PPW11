import React, { useState } from "react";
import DokterSidebar from "../components/SidebarDokter";
import "../styles/KonsultasiEdukasi.css";
import { FaVideo, FaEdit, FaTrash, FaClock, FaPaperPlane } from "react-icons/fa";

export default function KonsultasiEdukasi() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [draft, setDraft] = useState("");

  const chats = [
    {
      id: 1,
      name: "Budi Setiawan",
      message: "Baik Dok. Terima kasih atas infonya.",
      chat: [
        { from: "patient", text: "Halo Dok. Saya mau tanya, apakah aman berolahraga setelah donor?" },
        { from: "doctor", text: "Halo Pak Budi. Sebaiknya hindari aktivitas fisik berat selama 24 jam setelah donor untuk memberi waktu tubuh memulihkan diri." },
        { from: "patient", text: "Baik, Dok. Terima kasih atas informasinya" },
      ],
    },
    {
      id: 2,
      name: "Siti Amizah",
      message: "Dok, saya mau bertanya...",
      chat: [],
    },
  ];

  const sessions = [
    {
      id: 1,
      title: "Konsultasi: Persiapan Khusus Donor Darah",
      doctor: "Dr. Tuti Astuti",
      topic: "Syarat & Kondisi Khusus Donor",
      date: "Senin, 30 Sep 2025",
      time: "10:00 – 11:00 WIB",
      status: "Terjadwal",
    },
    {
      id: 2,
      title: "Konsultasi: Persiapan Donor Darah",
      doctor: "Dr. Anastasya",
      topic: "Persiapan Sebelum & Sesudah Donor",
      date: "Senin, 29 Sep 2025",
      time: "14:00 – 15:00 WIB",
      status: "Sedang Berlangsung",
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "Apakah donor darah memiliki efek samping?",
      answer:
        "Efek samping umumnya ringan seperti pusing atau lemas. Pastikan istirahat cukup dan minum banyak sebelum mendonor.",
    },
    {
      id: 2,
      question: "Bolehkah saya berdonor jika sedang menstruasi?",
      answer:
        "Boleh, selama Anda merasa fit dan tidak mengalami nyeri berlebih. Namun, Anda memerlukan minimal hemoglobin 12.5 g/dL.",
    },
  ];

  function handleSend() {
    if (!draft.trim()) return;
    // simulasi menambahkan chat (tidak persisten)
    const chatIndex = chats.findIndex((c) => c.id === selectedChat);
    if (chatIndex !== -1) {
      chats[chatIndex].chat.push({ from: "doctor", text: draft.trim() });
      // reset draft (in real app update state properly)
      setDraft("");
    } else {
      setDraft("");
    }
    // NOTE: above mutates sample data — in production use state and setState
  }

  return (
    <div className="dokter-layout">
      <DokterSidebar />

      <main className="dokter-main">
        <h1 className="page-title">Manajemen Konsultasi</h1>

        {/* ================= CHAT PANEL ================= */}
        <div className="chat-section">
          <div className="chat-left">
            <input type="text" className="chat-search" placeholder="Cari percakapan..." />

            {chats.map((c) => (
              <div
                key={c.id}
                className={`chat-item ${selectedChat === c.id ? "active" : ""}`}
                onClick={() => setSelectedChat(c.id)}
              >
                <h4>{c.name}</h4>
                <p>{c.message}</p>
              </div>
            ))}
          </div>

          {/* CHAT RIGHT */}
          <div className="chat-right">
            <div className="chat-header">{chats.find((c) => c.id === selectedChat)?.name}</div>

            <div className="chat-window" id="chat-window">
              {chats
                .find((c) => c.id === selectedChat)
                ?.chat.map((msg, i) => (
                  <div key={i} className={`chat-bubble ${msg.from}`}>
                    {msg.text}
                  </div>
                ))}
            </div>

            <div className="chat-input">
              <textarea
                rows={2}
                className="reply-textarea"
                placeholder="Ketik balasan Anda..."
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
              <button className="send-btn" onClick={handleSend} title="Kirim">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>

        {/* ================= VIDEO SESSIONS ================= */}
        <div className="session-section">
          <div className="session-header">
            <h2>Jadwal & Sesi Konsultasi Video</h2>
            <div className="tabs">
              <span className="active">Sesi Mendatang</span>
              <span>Riwayat Sesi</span>
            </div>
          </div>

          {sessions.map((s) => (
            <div key={s.id} className="session-card">
              <div className="session-title">{s.title}</div>
              <div className="session-doctor">dengan {s.doctor}</div>
              <div className="session-topic">Topik: {s.topic}</div>

              <div className="session-details">
                <span><FaClock /> {s.date}</span>
                <span><FaClock /> {s.time}</span>
                <span><FaVideo /> Zoom Meeting</span>
                <a href="#">🔗 Buka Link</a>
              </div>

              <div className="session-actions">
                <button className="btn-start">Mulai Sesi</button>
                <button className="btn-edit"><FaEdit /></button>
                <button className="btn-cancel">Batalkan</button>

                <span className={`session-status ${s.status === "Terjadwal" ? "green" : "yellow"}`}>
                  {s.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ================= FAQ SECTION ================= */}
        <div className="faq-section">
          <h2>Manajemen FAQ</h2>

          <div className="faq-filter">
            <select>
              <option>Semua Kategori</option>
            </select>

            <input type="text" placeholder="Cari FAQ..." />
          </div>

          {faqs.map((f) => (
            <div key={f.id} className="faq-card">
              <div className="faq-q">
                <strong>{f.question}</strong>
                <div className="faq-actions">
                  <button><FaEdit /></button>
                  <button className="delete"><FaTrash /></button>
                </div>
              </div>

              <p className="faq-a">{f.answer}</p>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
