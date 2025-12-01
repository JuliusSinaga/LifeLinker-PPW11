import React, { useState } from "react";
import "./ManajemenEvent.css";

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
    { id: 1, nama: "Donor Darah Kemanusiaan", tanggal: "17 Apr 2025", lokasi: "IT DEL", status: "Disetujui" },
    { id: 2, nama: "Bakti Sosial 2025", tanggal: "11 Feb 2025", lokasi: "Lapangan Legi", status: "Menunggu" },
    { id: 3, nama: "Donor Darah Ramadhan", tanggal: "17 Mar 2025", lokasi: "Depan Pasar", status: "Ditolak" },
  ]);

  const completed = [
    { id: 1, title: "World Blood Donor Day 2024", date: "14 Jun 2024", donors: 127, units: 152, attendees: 152 },
    { id: 2, title: "Donor Darah Hari Kartini", date: "21 Apr 2024", donors: 89, units: 95, attendees: 89 },
  ];

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

  return (
    <div className="me-page">
      <div className="me-appbar">
        <div className="me-appbar-inner">PPW Sistem Informasi Bank Darah Digital</div>
      </div>

      <div className="me-container">
        <aside className="me-sidebar-card">
          <div className="me-profile-compact">
            <img src="/images/doctor-avatar.png" alt="dokter" className="me-avatar-lg" />
            <div>
              <div className="me-name-lg">Dr. Anastasya</div>
              <div className="me-role-sm">Spesialis Hematologi</div>
            </div>
          </div>

          <nav className="me-nav-vertical">
            <a className="nav-item">Dashboard</a>
            <a className="nav-item">Manajemen Stok</a>
            <a className="nav-item active">Manajemen Event</a>
            <a className="nav-item">Konsultasi & Edukasi</a>
            <a className="nav-item">Profil Saya</a>
            <button className="me-logout-link">Logout</button>
          </nav>
        </aside>

        <main className="me-main-area">
          <h1 className="page-title">Request Event Donor Darah</h1>

          <div className="me-grid">
            <section className="me-left-col">
              <div className="panel form-panel">
                <div className="panel-header">
                  <h3>Formulir Pengajuan Event</h3>
                </div>

                <form onSubmit={handleSubmit} className="form-body" encType="multipart/form-data">
                  <div className="row two">
                    <div className="field">
                      <label>Nama Event</label>
                      <input name="namaEvent" value={form.namaEvent} onChange={handleChange} placeholder="Contoh: Donor Darah Sehat Bersama" />
                    </div>

                    <div className="field">
                      <label>Lokasi Event</label>
                      <input name="lokasi" value={form.lokasi} onChange={handleChange} placeholder="Contoh: Aula Utama RSUP H. Adam Malik" />
                    </div>
                  </div>

                  <div className="row two">
                    <div className="field">
                      <label>Tanggal Mulai</label>
                      <input type="date" name="tanggalMulai" value={form.tanggalMulai} onChange={handleChange} />
                    </div>

                    <div className="field">
                      <label>Tanggal Selesai</label>
                      <input type="date" name="tanggalSelesai" value={form.tanggalSelesai} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="row two">
                    <div className="field">
                      <label>Target Kantong Darah</label>
                      <input name="targetKantong" value={form.targetKantong} onChange={handleChange} placeholder="Contoh: 50" />
                    </div>

                    <div className="field">
                      <label>Unggah Poster (Opsional)</label>
                      <input type="file" name="unggahPoster" onChange={handleChange} />
                    </div>
                  </div>

                  <div className="field">
                    <label>Deskripsi</label>
                    <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} placeholder="Jelaskan detail mengenai acara ini" />
                  </div>

                  <div className="row two">
                    <div className="field">
                      <label>Partner / Sponsor</label>
                      <input name="partner" value={form.partner} onChange={handleChange} placeholder="Contoh: IT Del, PMI, Dinkes..." />
                    </div>

                    <div className="field">
                      <label>Target Donor</label>
                      <input name="targetDonor" value={form.targetDonor} onChange={handleChange} placeholder="Contoh: 50" />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button className="btn primary">Request Event</button>
                  </div>
                </form>
              </div>

              <div className="panel table-panel">
                <h4 className="panel-title">Status Pengajuan Event</h4>

                <div className="table-wrap">
                  <table className="styled-table">
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
                            <span className={`status ${r.status === "Disetujui" ? "ok" : r.status === "Menunggu" ? "pending" : "fail"}`}>
                              {r.status}
                            </span>
                          </td>
                          <td>
                            <div className="row actions-row">
                              <button className="btn sm ghost">View</button>
                              <button className="btn sm outline">Edit</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <aside className="me-right-col">
              <div className="panel small right-card">
                <h4>Event Yang Telah Selesai</h4>
                <div className="completed-list">
                  {completed.map((e) => (
                    <div className="completed-item" key={e.id}>
                      <div>
                        <div className="completed-title">{e.title}</div>
                        <div className="completed-date">{e.date}</div>
                      </div>
                      <div className="completed-count">
                        <div className="count">{e.donors}</div>
                        <div className="label">Donor</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel small right-card">
                <h4>Ringkasan Cepat</h4>
                <div className="summary-grid">
                  <div className="summary-card sc-red">
                    <div className="n">127</div>
                    <div className="t">Donor Terkumpul</div>
                  </div>
                  <div className="summary-card sc-blue">
                    <div className="n">152</div>
                    <div className="t">Unit Darah</div>
                  </div>
                  <div className="summary-card sc-green">
                    <div className="n">89</div>
                    <div className="t">Pendonor Hari Ini</div>
                  </div>
                  <div className="summary-card sc-yellow">
                    <div className="n">15</div>
                    <div className="t">Event Aktif</div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
