import React, { useState, useEffect } from "react";
import DokterSidebar from "../components/SidebarDokter";
import "../styles/ManajemenEvent.css"; // Pastikan path CSS benar
import axiosClient from "../service/axiosClient";

export default function ManajemenEvent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State Form (Sesuai dengan Model Event di Backend)
  const [form, setForm] = useState({
    title: "",
    location: "",
    description: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    target_bags: "",
    // partner: "", // Opsional: bisa dimasukkan ke deskripsi jika di backend tidak ada field khusus
  });

  // State Modal
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);

  // 1. Fetch Data Event dari Backend
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/events");
      // Backend mungkin mengembalikan { data: [...] }
      const data = response.data.data || [];
      setEvents(data);
    } catch (error) {
      console.error("Gagal mengambil data event:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle Input Change
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // 2. Submit Event Baru (Request)
  async function handleSubmit(e) {
    e.preventDefault();
    
    // Validasi sederhana
    if (!form.title || !form.start_date || !form.location) {
      alert("Mohon lengkapi data wajib (Nama, Tanggal, Lokasi)");
      return;
    }

    try {
      // Konversi target_bags ke integer
      const payload = {
        ...form,
        target_bags: parseInt(form.target_bags) || 0,
        status: "pending" // Default status saat request
      };

      await axiosClient.post("/events", payload);
      
      alert("Permintaan Event berhasil dikirim!");
      fetchEvents(); // Refresh data
      
      // Reset Form
      setForm({
        title: "", location: "", description: "",
        start_date: "", end_date: "", start_time: "", end_time: "",
        target_bags: "",
      });

    } catch (error) {
      console.error("Gagal membuat event:", error);
      alert("Gagal mengirim permintaan event.");
    }
  }

  // Helper: Format Tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric", month: "short", year: "numeric"
    });
  };

  // Helper: Status Badge Class
  const getStatusClass = (status) => {
    switch(status) {
      case 'approved': return 'status-approved';
      case 'pending': return 'status-pending';
      case 'rejected': return 'status-rejected';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  // Helper: Status Label Frontend
  const getStatusLabel = (status) => {
    switch(status) {
      case 'approved': return 'Disetujui';
      case 'pending': return 'Menunggu';
      case 'rejected': return 'Ditolak';
      case 'completed': return 'Selesai';
      default: return status;
    }
  };

  // Filter Data untuk Tabel (Request Aktif) & Completed
  const activeRequests = events.filter(e => e.status !== 'completed');
  const completedEvents = events.filter(e => e.status === 'completed');

  return (
    <div className="dokter-layout">
      <DokterSidebar />

      <main className="dokter-main">
        <h1 className="page-title">Request Event Donor Darah</h1>

        <div className="event-container">

          {/* FORM PENGAJUAN */}
          <div className="card event-form-card">
            <h3 className="card-title">📄 Formulir Pengajuan Event</h3>

            <form onSubmit={handleSubmit} className="event-form">
              <div className="form-group">
                <label>Nama Event</label>
                <input 
                  name="title"
                  placeholder="Contoh: Donor Darah Sehat Bersama"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tanggal Mulai</label>
                  <input type="date" name="start_date" value={form.start_date} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Tanggal Selesai</label>
                  <input type="date" name="end_date" value={form.end_date} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Jam Mulai</label>
                  <input type="time" name="start_time" value={form.start_time} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Jam Selesai</label>
                  <input type="time" name="end_time" value={form.end_time} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label>Lokasi Event</label>
                <input 
                  name="location"
                  placeholder="Contoh: Aula Utama RSUP H. Adam Malik"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Target Kantong Darah</label>
                  <input 
                    name="target_bags"
                    type="number"
                    placeholder="Contoh: 50"
                    value={form.target_bags}
                    onChange={handleChange}
                  />
                </div>
                {/* Upload Poster bisa ditambahkan nanti jika backend support multipart/form-data */}
              </div>

              <div className="form-group">
                <label>Deskripsi & Partner</label>
                <textarea 
                  name="description"
                  placeholder="Jelaskan detail acara dan partner penyelenggara..."
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <button className="btn-submit">Kirim Request</button>
            </form>
          </div>

          {/* TABLE REQUEST STATUS */}
          <div className="card event-table-card">
            <h3 className="card-title">📊 Status Pengajuan Event</h3>

            <div className="table-responsive">
              <table className="event-table">
                <thead>
                  <tr>
                    <th>Nama Event</th>
                    <th>Tanggal</th>
                    <th>Lokasi</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="5" className="text-center">Memuat data...</td></tr>
                  ) : activeRequests.length > 0 ? (
                    activeRequests.map((r) => (
                      <tr key={r.id}>
                        <td>{r.title}</td>
                        <td>{formatDate(r.start_date)}</td>
                        <td>{r.location}</td>
                        <td>
                          <span className={`status-badge ${getStatusClass(r.status)}`}>
                            {getStatusLabel(r.status)}
                          </span>
                        </td>
                        <td className="aksi-btns">
                          <button className="view-btn" onClick={() => setSelected(r)}>👁 Detail</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="5" className="text-center">Belum ada pengajuan event.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* EVENT SELESAI */}
          <div className="card event-completed-card">
            <h3 className="card-title">🎉 Event Yang Telah Selesai</h3>

            <div className="completed-grid">
              {completedEvents.length > 0 ? (
                completedEvents.map((e) => (
                  <div className="completed-card" key={e.id}>
                    <div className="completed-top">
                      <h4>{e.title}</h4>
                      <p>{formatDate(e.start_date)}</p>
                    </div>
                    <div className="completed-bottom">
                      <div className="big-number">{e.realization || 0}</div>
                      <div className="label">Kantong Terkumpul</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">Belum ada event yang selesai.</p>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* MODAL DETAIL */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Detail Event</h3>
            <div className="modal-body">
              <p><strong>Nama:</strong> {selected.title}</p>
              <p><strong>Waktu:</strong> {formatDate(selected.start_date)} s/d {formatDate(selected.end_date)}</p>
              <p><strong>Jam:</strong> {selected.start_time || "-"} - {selected.end_time || "-"}</p>
              <p><strong>Lokasi:</strong> {selected.location}</p>
              <p><strong>Target:</strong> {selected.target_bags} Kantong</p>
              <p><strong>Status:</strong> {getStatusLabel(selected.status)}</p>
              <p><strong>Deskripsi:</strong> {selected.description || "-"}</p>
            </div>
            <button className="close-btn" onClick={() => setSelected(null)}>Tutup</button>
          </div>
        </div>
      )}

    </div>
  );
}