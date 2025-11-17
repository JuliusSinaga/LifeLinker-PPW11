import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./EventPage.css";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaChevronRight,
  FaUsers,
  FaFilter,
  FaCalendarCheck,
} from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Sample events data
const eventsData = {
  featured: {
    id: 1,
    title: "Donor Hari Pahlawan 2025",
    date: "Rabu, 15 Oktober 2025",
    location: "Institut Teknologi Del",
    image: "bg beranda awal.jpg",
    description:
      "Ikuti berbagai kegiatan donor darah dan aksi sosial di sekitar Anda.",
  },
  upcoming: [
    {
      id: 2,
      title: "Aksi Kemanusiaan Balige",
      date: "20 Oktober 2025",
      location: "Lapangan Balige",
      image: "bg beranda awal.jpg",
    },
    {
      id: 3,
      title: "Setetes Darah Untuk Harapan",
      date: "29 Oktober 2025",
      location: "Lapangan Balige",
      image: "bg beranda awal.jpg",
    },
  ],
};

const participationStats = {
  totalParticipants: "1.000+",
  cities: [
    { name: "Medan", participants: 550 },
    { name: "Siantar", participants: 400 },
    { name: "Laguboti", participants: 180 },
  ],
};

export default function EventPage() {
  const [selectedFilter, setSelectedFilter] = useState("Semua Lokasi");

  const filterOptions = [
    "Semua Lokasi",
    "Medan",
    "Balige",
    "Siantar",
    "Laguboti",
  ];

  return (
    <div className="event-page-root">
      <Header />

      {/* Hero Section */}
      <section className="event-hero">
        <div className="event-hero-content">
          <h1>
            <FaCalendarCheck style={{ fontSize: "2rem" }} />
            Event Donor Darah
          </h1>
          <p>
            Ikuti berbagai kegiatan donor darah dan aksi sosial di sekitar Anda
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="event-main">
        <div className="event-container">
          {/* Featured Event Section */}
          <section className="featured-event-section">
            <h2>
              Event <span className="highlight">Unggulan</span>
            </h2>

            <div className="featured-event-card">
              <div className="featured-event-image">
                <img
                  src={process.env.PUBLIC_URL + "/images/bg beranda awal.jpg"}
                  alt={eventsData.featured.title}
                />
              </div>
              <div className="featured-event-content">
                <h3>{eventsData.featured.title}</h3>

                <div className="event-details">
                  <div className="event-detail-item">
                    <FaCalendarAlt className="event-icon" />
                    <span>
                      <strong>Tanggal:</strong> {eventsData.featured.date}
                    </span>
                  </div>
                  <div className="event-detail-item">
                    <FaMapMarkerAlt className="event-icon" />
                    <span>
                      <strong>Lokasi:</strong> {eventsData.featured.location}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/event/${eventsData.featured.id}`}
                  className="featured-event-button"
                >
                  Lihat Detail & Daftar <FaChevronRight />
                </Link>
              </div>
            </div>
          </section>

          {/* Upcoming Events Section */}
          <section className="upcoming-events-section">
            <h2>
              Semua Event <span className="highlight">Mendatang</span>
            </h2>

            {/* Filter */}
            <div className="events-filter">
              <div className="filter-item">
                <FaFilter className="filter-icon" />
                <span>Filter Lokasi:</span>
                <select
                  className="filter-dropdown"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  {filterOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="upcoming-events-grid">
              {eventsData.upcoming.map((event) => (
                <div key={event.id} className="upcoming-event-card">
                  <div className="upcoming-event-image">
                    <img
                      src={process.env.PUBLIC_URL + `/images/${event.image}`}
                      alt={event.title}
                    />
                  </div>
                  <div className="upcoming-event-content">
                    <h4>{event.title}</h4>
                    <div className="event-details">
                      <div className="event-detail-item">
                        <FaCalendarAlt className="event-icon" />
                        <span>
                          <strong>Tanggal:</strong> {event.date}
                        </span>
                      </div>
                      <div className="event-detail-item">
                        <FaMapMarkerAlt className="event-icon" />
                        <span>
                          <strong>Lokasi:</strong> {event.location}
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/event/${event.id}`}
                      className="upcoming-event-button"
                    >
                      Lihat Detail <FaChevronRight />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Participation Stats Section */}
          <section className="participation-section">
            <h2>
              Partisipasi <span className="highlight">Komunitas</span>
            </h2>

            <div className="participation-content">
              <div className="total-participants">
                <div className="participants-icon">
                  <FaUsers />
                </div>
                <div className="participants-info">
                  <div className="participants-number">
                    {participationStats.totalParticipants}
                  </div>
                  <div className="participants-label">
                    Total Pendaftar Bulan Ini
                  </div>
                </div>
              </div>

              <div className="participation-by-city">
                <h3>Pendaftar Per Kota</h3>
                <div className="city-stats">
                  {participationStats.cities.map((city) => (
                    <div key={city.name} className="city-stat-item">
                      <div className="city-name">{city.name}</div>
                      <div className="city-progress">
                        <div className="progress-bar-container">
                          <div
                            className="progress-bar-fill"
                            style={{
                              width: `${(city.participants / 550) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="city-count">{city.participants}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
