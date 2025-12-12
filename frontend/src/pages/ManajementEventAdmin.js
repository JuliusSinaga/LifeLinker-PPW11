import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import "./ManajementEventAdmin.css";
import axiosClient from "../service/axiosClient";

function MetricCard({ value, title, subtitle, icon, colorClass }) {
  return (
    <div className="metric-card">
      <div className="metric-content">
        <div className="metric-value">{value}</div>
        <div className="metric-title">{title}</div>
        <div className="metric-subtitle">{subtitle}</div>
      </div>
      <div className={`metric-icon ${colorClass}`}>{icon}</div>
    </div>
  );
}

export default function ManajementEventAdmin() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [monthFilter, setMonthFilter] = useState("Semua Bulan");
  
  // Modal State
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 1. Fetch Data dari Backend
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/events");
      // Asumsi backend mengembalikan { data: [...] }
      const data = response.data.data || [];
      // Urutkan dari yang terbaru (opsional)
      const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setEvents(sortedData);
    } catch (error) {
      console.error("Gagal mengambil data event:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 2. Fungsi Update Status (Approve/Reject)
  const handleUpdateStatus = async (id, newStatus) => {
    const action = newStatus === 'approved' ? 'menyetujui' : 'menolak';
    if (!window.confirm(`Apakah Anda yakin ingin ${action} event ini?`)) return;

    try {
      // Asumsi endpoint update status: PUT /events/:id/status
      // Atau PUT /events/:id dengan body { status: ... }
      await axiosClient.put(`/events/${id}`, { status: newStatus });
      
      alert(`Event berhasil ${newStatus === 'approved' ? 'disetujui' : 'ditolak'}!`);
      fetchEvents(); // Refresh data
      setSelectedEvent(null); // Tutup modal jika sedang terbuka
    } catch (error) {
      console.error("Gagal update status:", error);
      alert("Terjadi kesalahan saat memperbarui status.");
    }
  };

  // Helper: Format Tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric", month: "short", year: "numeric"
    });
  };

  // Helper: Get Month Name untuk Filter
  const getMonthName = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("id-ID", { month: "short" });
  };

  // 3. Hitung Metrik Dinamis
  const totalEvents = events.length;
  const pendingEvents = events.filter(e => e.status === 'pending').length;
  const approvedEvents = events.filter(e => e.status === 'approved').length;
  const completedEvents = events.filter(e => e.status === 'completed').length;

  const metrics = [
    { value: totalEvents, title: "Total Event", subtitle: "Semua Pengajuan", icon: "📅", colorClass: "blue" },
    { value: pendingEvents, title: "Menunggu", subtitle: "Perlu Persetujuan", icon: "⏳", colorClass: "yellow" },
    { value: approvedEvents, title: "Disetujui", subtitle: "Event Akan Datang", icon: "✅", colorClass: "green" },
    { value: completedEvents, title: "Terlaksana", subtitle: "Event Selesai", icon: "🎉", colorClass: "purple" },
  ];

  // 4. Filtering Logic
  const filteredEvents = events.filter((e) => {
    // Filter Nama
    const nameMatch = search === "" || e.title.toLowerCase().includes(search.toLowerCase());
    
    // Filter Status (Mapping Frontend -> Backend values)
    let statusMatch = true;
    if (statusFilter === "Disetujui") statusMatch = e.status === "approved";
    if (statusFilter === "Menunggu") statusMatch = e.status === "pending";
    if (statusFilter === "Ditolak") statusMatch = e.status === "rejected";
    if (statusFilter === "Selesai") statusMatch = e.status === "completed";

    // Filter Bulan
    const eventMonth = getMonthName(e.start_date); // Misal: "Apr", "Nov"
    const matchMonth = monthFilter === "Semua Bulan" || eventMonth.includes(monthFilter);

    return nameMatch && statusMatch && matchMonth;
  });

  // Badge Status UI
  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved': return <span className="badge badge-green">Disetujui</span>;
      case 'pending': return <span className="badge badge-yellow">Menunggu</span>;
      case 'rejected': return <span className="badge badge-red">Ditolak</span>;
      case 'completed': return <span className="badge badge-blue">Selesai</span>;
      default: return <span className="badge badge-gray">{status}</span>;
    }
  };

  return (
    <div className="event-admin-page">
      <SidebarAdmin />

      <main className="main-content">
        <h1 className="page-title">Dashboard Administrasi - Event</h1>

        {/* METRICS */}
        <div className="metrics-grid">
          {metrics.map((m, i) => (
            <MetricCard key={i} {...m} />
          ))}
        </div>

        {/* EVENT SECTION */}
        <div className="event-section">
          <h2>Manajemen Event</h2>

          {/* FILTERS */}
          <div className="event-filters">
            <div className="filter-group">
              <label>Filter Nama Event:</label>
              <input
                type="text"
                placeholder="Cari nama event..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>Filter Status:</label>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option>Semua Status</option>
                <option>Disetujui</option>
                <option>Menunggu</option>
                <option>Ditolak</option>
                <option>Selesai</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Filter Bulan:</label>
              <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)}>
                <option>Semua Bulan</option>
                {/* Daftar bulan hardcoded atau digenerate */}
                {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'].map(m => (
                    <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {/* EVENT TABLE */}
          <div className="table-wrapper">
            {loading ? (
                <p className="loading-text">Memuat data event...</p>
            ) : (
                <table className="event-table">
                <thead>
                    <tr>
                    <th>Nama Event</th>
                    <th>Lokasi</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                    <th>Aksi</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((e) => (
                        <tr key={e.id}>
                            <td>{e.title}</td>
                            <td>{e.location}</td>
                            <td>{formatDate(e.start_date)}</td>
                            <td>{getStatusBadge(e.status)}</td>

                            <td className="actions-col">
                            <div className="action-hover-area">
                                {/* VIEW BUTTON */}
                                <button
                                    className="action-btn view"
                                    onClick={() => setSelectedEvent(e)}
                                    title="Lihat Detail"
                                >
                                👁
                                </button>

                                {/* ACTION BUTTONS (Only for pending) */}
                                <div className="action-animate-wrapper">
                                <button
                                    className={`action-btn approve ${e.status !== "pending" ? "disabled-btn" : ""}`}
                                    disabled={e.status !== "pending"}
                                    onClick={() => handleUpdateStatus(e.id, 'approved')}
                                    title="Setujui"
                                >
                                    ✔
                                </button>

                                <button
                                    className={`action-btn reject ${e.status !== "pending" ? "disabled-btn" : ""}`}
                                    disabled={e.status !== "pending"}
                                    onClick={() => handleUpdateStatus(e.id, 'rejected')}
                                    title="Tolak"
                                >
                                    ✘
                                </button>
                                </div>
                            </div>
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="empty-state">Tidak ada data event ditemukan.</td>
                        </tr>
                    )}
                </tbody>
                </table>
            )}
          </div>
        </div>

        {/* MODAL DETAIL */}
        {selectedEvent && (
          <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <h2 className="modal-title">Detail Event</h2>

              <div className="modal-content">
                <div className="detail-row"><strong>Nama Event:</strong> {selectedEvent.title}</div>
                {/* Jika backend menyediakan data organizer (user), tampilkan di sini */}
                <div className="detail-row"><strong>Lokasi:</strong> {selectedEvent.location}</div>
                <div className="detail-row">
                    <strong>Waktu:</strong> {formatDate(selectedEvent.start_date)} - {formatDate(selectedEvent.end_date)}
                </div>
                <div className="detail-row">
                    <strong>Jam:</strong> {selectedEvent.start_time || "-"} s/d {selectedEvent.end_time || "-"}
                </div>
                <div className="detail-row"><strong>Target Kantong:</strong> {selectedEvent.target_bags}</div>
                <div className="detail-row">
                    <strong>Status:</strong> {getStatusBadge(selectedEvent.status)}
                </div>
                <hr className="modal-divider"/>
                <div className="detail-row"><strong>Deskripsi:</strong></div>
                <p className="detail-desc">{selectedEvent.description || "Tidak ada deskripsi."}</p>
              </div>

              <div className="modal-actions">
                {selectedEvent.status === 'pending' && (
                    <>
                        <button className="btn-modal approve" onClick={() => handleUpdateStatus(selectedEvent.id, 'approved')}>
                            Setujui
                        </button>
                        <button className="btn-modal reject" onClick={() => handleUpdateStatus(selectedEvent.id, 'rejected')}>
                            Tolak
                        </button>
                    </>
                )}
                <button className="modal-close" onClick={() => setSelectedEvent(null)}>
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}