import React, { useState } from "react";
import "./ManajemenEvent.css";

const ManajemenEvent = () => {
  const [events, setEvents] = useState([
    { id: 1, nama: "Webinar Teknologi", tanggal: "2025-01-15", lokasi: "Aula Rapat" },
    { id: 2, nama: "Seminar AI", tanggal: "2025-02-10", lokasi: "Auditorium Kampus" },
  ]);

  const [form, setForm] = useState({ nama: "", tanggal: "", lokasi: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.nama || !form.tanggal || !form.lokasi) {
      alert("Isi semua data terlebih dahulu!");
      return;
    }

    const newEvent = {
      id: events.length + 1,
      nama: form.nama,
      tanggal: form.tanggal,
      lokasi: form.lokasi,
    };

    setEvents([...events, newEvent]);
    setForm({ nama: "", tanggal: "", lokasi: "" });
  };

  const handleDelete = (id) => {
    setEvents(events.filter((ev) => ev.id !== id));
  };

  return (
    <div className="event-container">
      <h2>Manajemen Event</h2>

      <div className="event-form">
        <input
          type="text"
          placeholder="Nama Event"
          name="nama"
          value={form.nama}
          onChange={handleChange}
        />
        <input
          type="date"
          name="tanggal"
          value={form.tanggal}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Lokasi Event"
          name="lokasi"
          value={form.lokasi}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Tambah Event</button>
      </div>

      <div className="event-table">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Event</th>
              <th>Tanggal</th>
              <th>Lokasi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e, index) => (
              <tr key={e.id}>
                <td>{index + 1}</td>
                <td>{e.nama}</td>
                <td>{e.tanggal}</td>
                <td>{e.lokasi}</td>
                <td>
                  <button className="btn-hapus" onClick={() => handleDelete(e.id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan="5" className="empty">
                  Tidak ada event.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManajemenEvent;