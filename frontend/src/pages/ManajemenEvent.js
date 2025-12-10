import React, { useState } from "react";
import DokterSidebar from "../components/DokterSidebar";
import "../styles/ManajemenEvent.css";

export default function ManajemenEvent() {
  const [form, setForm] = useState({
    namaEvent: "",
    tanggalMulai: "",
    tanggalSelesai: "",
    lokasi: "",
    targetKantong: "",
    deskripsi: "",
    partner: "",
    targetDonor: "",
    unggahPoster: null,
  });

  const [requests, setRequests] = useState([
    { id: 1, nama: "Donor Darah Kemanusiaan", tanggal: "17 Apr 2025", lokasi: "IT DEL", status: "Disetujui", deskripsi: "Event kemanusiaan besar", partner: "IT Del", donor: 50 },
    { id: 2, nama: "Bakti Sosial 2025", tanggal: "11 Feb 2025", lokasi: "Lapangan Legi", status: "Menunggu", deskripsi: "Acara bakti sosial", partner: "PMI", donor: 70 },
    { id: 3, nama: "Donor Darah Ramadhan", tanggal: "17 Mar 2025", lokasi: "Depan Pasar", status: "Ditolak", deskripsi: "Event Ramadhan", partner: "Diknas", donor: 30 }
  ]);

  const completed = [
    { id: 1, title: "World Blood Donor Day 2024", date: "14 Jun 2024", donors: 127 },
    { id: 2, title: "Donor Darah Hari Kartini", date: "21 Apr 2024", donors: 89 },
  ];

  // STATE UNTUK MODAL VIEW + EDIT
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "unggahPoster") {
      setForm((s) => ({ ...s, unggahPoster: files && files[0] }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newReq = {
      id: Date.now(),
      nama: form.namaEvent || "(Belum diisi)",
      tanggal: form.tanggalMulai || "-",
      lokasi: form.lokasi || "-",
      deskripsi: form.deskripsi,
      partner: form.partner,
      donor: form.targetDonor,
      status: "Menunggu",
    };
    setRequests((r) => [newReq, ...r]);

    setForm({
      namaEvent: "",
      tanggalMulai: "",
      tanggalSelesai: "",
      lokasi: "",
      targetKantong: "",
      deskripsi: "",
      partner: "",
      targetDonor: "",
      unggahPoster: null,
    });
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    setRequests((prev) =>
      prev.map((req) =>
        req.id === editing.id ? { ...editing } : req
      )
    );
    setEditing(null);
  }

  return (
    <div className="dokter-layout">
      <DokterSidebar />

      <main className="dokter-main">
        <h1 className="page-title">Request Event Donor Darah</h1>

        <div className="event-container">

          {/* FORM */}
          <div className="card event-form-card">
            <h3 className="card-title">📄 Formulir Pengajuan Event</h3>

            <form onSubmit={handleSubmit} className="event-form">

              <div className="form-group">
                <label>Nama Event</label>
                <input 
                  name="namaEvent"
                  placeholder="Contoh: Donor Darah Sehat Bersama"
                  value={form.namaEvent}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tanggal Mulai</label>
                  <input type="date" name="tanggalMulai" value={form.tanggalMulai} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Tanggal Selesai</label>
                  <input type="date" name="tanggalSelesai" value={form.tanggalSelesai} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label>Lokasi Event</label>
                <input 
                  name="lokasi"
                  placeholder="Contoh: Aula Utama RSUP H. Adam Malik"
                  value={form.lokasi}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Target Kantong Darah</label>
                  <input 
                    name="targetKantong"
                    placeholder="Contoh: 50"
                    value={form.targetKantong}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Unggah Poster (Opsional)</label>
                  <input type="file" name="unggahPoster" onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label>Deskripsi</label>
                <textarea 
                  name="deskripsi"
                  placeholder="Jelaskan detail mengenai acara ini"
                  value={form.deskripsi}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Partner / Sponsor</label>
                  <input 
                    name="partner"
                    placeholder="Contoh: IT Del, PMI, Diknas, dll"
                    value={form.partner}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Target Donor</label>
                  <input 
                    name="targetDonor"
                    placeholder="Contoh: 50"
                    value={form.targetDonor}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button className="btn-submit">Request Event</button>
            </form>
          </div>

          {/* TABLE */}
          <div className="card event-table-card">
            <h3 className="card-title">📊 Status Pengajuan Event</h3>

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
                {requests.map((r) => (
                  <tr key={r.id}>
                    <td>{r.nama}</td>
                    <td>{r.tanggal}</td>
                    <td>{r.lokasi}</td>
                    <td>
                      <span className={`status-badge ${r.status.toLowerCase()}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="aksi-btns">
                      <button className="view-btn" onClick={() => setSelected(r)}>👁 View</button>
                      <button className="edit-btn" onClick={() => setEditing({...r})}>✏ Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* EVENT SELESAI */}
          <div className="card event-completed-card">
            <h3 className="card-title">🎉 Event Yang Telah Selesai</h3>

            <div className="completed-grid">
              {completed.map((e) => (
                <div className="completed-card" key={e.id}>
                  <div className="completed-top">
                    <h4>{e.title}</h4>
                    <p>{e.date}</p>
                  </div>
                  <div className="completed-bottom">
                    <div className="big-number">{e.donors}</div>
                    <div className="label">Donor Terkumpul</div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </main>

      {/* MODAL VIEW */}
      {selected && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Detail Event</h3>
            <p><b>Nama:</b> {selected.nama}</p>
            <p><b>Tanggal:</b> {selected.tanggal}</p>
            <p><b>Lokasi:</b> {selected.lokasi}</p>
            <p><b>Status:</b> {selected.status}</p>
            <p><b>Deskripsi:</b> {selected.deskripsi}</p>
            <p><b>Partner:</b> {selected.partner}</p>

            <button className="close-btn" onClick={() => setSelected(null)}>Tutup</button>
          </div>
        </div>
      )}

      {/* MODAL EDIT */}
      {editing && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit Event</h3>

            <form onSubmit={handleEditSubmit}>
              <label>Nama Event</label>
              <input 
                value={editing.nama}
                onChange={(e) => setEditing({ ...editing, nama: e.target.value })}
              />

              <label>Tanggal</label>
              <input 
                value={editing.tanggal}
                onChange={(e) => setEditing({ ...editing, tanggal: e.target.value })}
              />

              <label>Lokasi</label>
              <input 
                value={editing.lokasi}
                onChange={(e) => setEditing({ ...editing, lokasi: e.target.value })}
              />

              <label>Deskripsi</label>
              <textarea
                value={editing.deskripsi}
                onChange={(e) => setEditing({ ...editing, deskripsi: e.target.value })}
              />

              <div className="edit-actions">
                <button type="button" className="cancel-btn" onClick={() => setEditing(null)}>Batal</button>
                <button type="submit" className="save-btn">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
