import React, { useState, useEffect } from "react";
import "./KonsultasiPage.css";
import {
  FaPaperPlane,
  FaVideo,
  FaEnvelope,
  FaQuestionCircle,
  FaUserMd,
} from "react-icons/fa";
import Header from "../../components/Header";

const KonsultasiPage = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailForm, setEmailForm] = useState({
    email: "",
    question: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    if (token && userRole === "pengguna") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    // Handle chat message submission
    console.log("Chat message:", chatMessage);
    setChatMessage("");
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Handle email consultation submission
    console.log("Email consultation:", emailForm);
    setEmailForm({ email: "", question: "" });
  };

  const chatMessages = [
    {
      id: 1,
      sender: "user",
      message:
        "Halo Dokter, ada yang ingin saya tanyakan tentang donor darah",
      avatar: "/images/user.png",
    },
    {
      id: 2,
      sender: "doctor",
      message:
        "Tentu! Saya Dr. Tuti. Silakan tanyakan apa yang ingin Anda ketahui tentang donor darah.",
      avatar: "/images/dokter-tuti.png",
      name: "Dr. Tuti Astuni",
    },
  ];

  const faqData = [
    {
      id: 1,
      question: "Apakah donor darah memiliki efek samping?",
      answer:
        "Efek samping umumnya ringan seperti pusing atau memar. Pastikan istirahat cukup dan minum banyak cairan setelahnya.",
    },
    {
      id: 2,
      question: "Bolehkah saya berdonor jika sedang menstruasi?",
      answer:
        "Boleh, selama Anda tidak merasa lemah atau pusing dan kadar Hb Anda memenuhi syarat (minimal 12,5 g/dl).",
    },
  ];

  const videoSessions = [
    {
      id: 1,
      doctor: "Dr. Tuti Astuni",
      topic:
        "Syarat & Kondisi Khusus Donor Senin, 29 Sep 2025 (10:00 - 11:00 WIB)",
      status: "available",
      avatar: "/images/dokter-tuti.png",
    },
    {
      id: 2,
      doctor: "Dr. Anastasya",
      topic:
        "Persiapan Sebelum & Sesudah Donor Selasa, 30 Sep 2025 (14:00 - 15:00 WIB)",
      status: "full",
      avatar: "/images/dokter-anas.jpg",
    },
  ];

  const recentQuestions = [
    {
      id: 1,
      name: "Aisha Feransiaka",
      question: "Saya punya tekanan darah rendah, apakah masih bisa donor?",
      avatar: "/images/user.png",
    },
    {
      id: 2,
      name: "Aisha Triswana",
      question: "Saya punya tekanan darah rendah, apakah masih bisa donor?",
      avatar: "/images/user.png",
    },
  ];

  return (
    <div className="konsultasi-page">
      <Header showUserProfile={isLoggedIn} />

      <div className="konsultasi-container">
        <div className="hero-section">
          <img
            src="/images/Konsultasi.jpg"
            alt="Konsultasi"
            className="hero-image"
          />
        </div>

        <div className="consultation-content">
          <div className="left-section">
            {/* Live Chat Section */}
            <div className="chat-section">
              <div className="section-header">
                <FaUserMd className="section-icon" />
                <h2>Live Chat dengan Dokter</h2>
              </div>

              <div className="chat-container">
                <div className="chat-messages">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`message ${message.sender}`}
                    >
                      <div className="message-avatar">
                        <img src={message.avatar} alt={message.sender} />
                      </div>
                      <div className="message-content">
                        {message.name && (
                          <div className="message-name">{message.name}</div>
                        )}
                        <div className="message-text">{message.message}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <form className="chat-input-form" onSubmit={handleChatSubmit}>
                  <input
                    type="text"
                    placeholder="Ketik pertanyaan Anda disini..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="chat-input"
                  />
                  <button type="submit" className="chat-send-btn">
                    <FaPaperPlane />
                  </button>
                </form>
              </div>
            </div>

            {/* Recent Questions */}
            <div className="recent-questions">
              <h3>Tanya Jawab Terkini dari Live Chat</h3>
              <div className="questions-list">
                {recentQuestions.map((item) => (
                  <div key={item.id} className="question-item">
                    <div className="question-avatar">
                      <img src={item.avatar} alt={item.name} />
                    </div>
                    <div className="question-content">
                      <div className="question-name">{item.name}</div>
                      <div className="question-text">"{item.question}"</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Doctor Responses */}
              <div className="doctor-responses">
                <div className="doctor-response">
                  <div className="doctor-avatar">
                    <img src="/images/dokter-tuti.png" alt="Dr. Tuti Astuni" />
                  </div>
                  <div className="doctor-content">
                    <div className="doctor-name">Dr. Tuti Astuni:</div>
                    <div className="doctor-text">
                      Tergantung pada seberapa rendah. Saat pemeriksaan, tekanan
                      darah sistolik harus antara 110-160 mmHg. Sebaiknya
                      periksakan dulu saat di lokasi untuk memastikannya.
                    </div>
                  </div>
                </div>

                <div className="doctor-response">
                  <div className="doctor-avatar">
                    <img
                      src="/images/dokter-anas.jpg"
                      alt="Dr. Anastasya"
                    />
                  </div>
                  <div className="doctor-content">
                    <div className="doctor-name">Dr. Anastasya:</div>
                    <div className="doctor-text">
                      Tergantung pada seberapa rendah. Saat pemeriksaan, tekanan
                      darah sistolik harus antara 110-160 mmHg. Sebaiknya
                      periksakan dulu saat di lokasi untuk memastikannya.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Session Section */}
            <div className="video-session-section">
              <div className="section-header">
                <FaVideo className="section-icon" />
                <h2>Sesi Konsultasi Video (via Zoom)</h2>
              </div>

              <div className="video-sessions">
                {videoSessions.map((session) => (
                  <div key={session.id} className="video-session-card">
                    <div className="session-info">
                      <div className="doctor-avatar">
                        <img src={session.avatar} alt={session.doctor} />
                      </div>
                      <div className="session-details">
                        <div className="doctor-name">{session.doctor}</div>
                        <div className="session-topic">{session.topic}</div>
                      </div>
                    </div>
                    <button
                      className={`session-btn ${
                        session.status === "available" ? "available" : "full"
                      }`}
                      disabled={session.status === "full"}
                    >
                      {session.status === "available"
                        ? "Segera"
                        : "Gabung Sekarang"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="right-section">
            {/* FAQ Section */}
            <div className="faq-section">
              <div className="section-header">
                <FaQuestionCircle className="section-icon" />
                <h2>FAQ</h2>
              </div>

              <div className="faq-list">
                {faqData.map((faq) => (
                  <div key={faq.id} className="faq-item">
                    <div className="faq-question">{faq.question}</div>
                    <div className="faq-answer">{faq.answer}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Consultation Section */}
            <div className="email-consultation">
              <div className="section-header">
                <FaEnvelope className="section-icon" />
                <h2>Konsultasi via Email</h2>
              </div>

              <div className="email-info">
                <p>
                  Pertanyaan Anda akan dijawab tim medis dalam 30-60 menit pada
                  jam kerja.
                </p>
              </div>

              <form className="email-form" onSubmit={handleEmailSubmit}>
                <input
                  type="email"
                  placeholder="Email anda"
                  value={emailForm.email}
                  onChange={(e) =>
                    setEmailForm({ ...emailForm, email: e.target.value })
                  }
                  className="email-input"
                  required
                />
                <textarea
                  placeholder="Tuliskan pertanyaan anda"
                  value={emailForm.question}
                  onChange={(e) =>
                    setEmailForm({ ...emailForm, question: e.target.value })
                  }
                  className="question-textarea"
                  rows="4"
                  required
                ></textarea>
                <button type="submit" className="submit-btn">
                  Kirim Pertanyaan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KonsultasiPage;
