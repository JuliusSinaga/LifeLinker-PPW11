import React, { useMemo, useState } from "react";
import DokterSidebar from "../components/DokterSidebar";
import "../styles/ManajemenStok.css";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function ManajemenStok() {
  // DATA STOK (contoh)
  const stock = [
    { gol: "A+", jumlah: 125, min: 200, exp: "2025-01-15", status: "Standar" },
    { gol: "B-", jumlah: 25, min: 200, exp: "2025-01-18", status: "Kritikal" },
    { gol: "O+", jumlah: 190, min: 200, exp: "2025-01-22", status: "Aman" },
    { gol: "AB-", jumlah: 22, min: 200, exp: "2025-01-25", status: "Kritikal" },
    { gol: "AB+", jumlah: 182, min: 200, exp: "2025-01-28", status: "Standar" },
  ];

  // DATA PENDONOR (simpan tanggal dalam ISO agar mudah filter)
  const initialPendonor = [
    { tanggal: "2025-01-02", nama: "Juniah Jaos", gol: "A+", unit: "1 unit", rs: "RSUP H. Adam Malik", status: "Tersedia" },
    { tanggal: "2025-01-03", nama: "Kooley Sitha", gol: "A+", unit: "2 unit", rs: "RSUP H. Adam Malik", status: "Tersedia" },
    { tanggal: "2025-01-04", nama: "Demie Loe", gol: "B-", unit: "2 unit", rs: "RSUP H. Adam Malik", status: "Tersedia" },
    { tanggal: "2025-01-05", nama: "Lisbae Rees", gol: "B+", unit: "2 unit", rs: "RSUP H. Adam Malik", status: "Tersedia" },
    { tanggal: "2025-01-05", nama: "Andika Ola", gol: "O+", unit: "1 unit", rs: "RSUP H. Adam Malik", status: "Digunakan" },
    { tanggal: "2025-01-06", nama: "Kael Simatu", gol: "O-", unit: "1 unit", rs: "RSUP H. Adam Malik", status: "Digunakan" },
  ];

  // Filter state
  const [dateFilter, setDateFilter] = useState(""); // format yyyy-mm-dd
  const [hospitalFilter, setHospitalFilter] = useState("Semua Rumah Sakit");

  // Options rumah sakit (bisa ambil dari API nantinya)
  const hospitals = ["Semua Rumah Sakit", "RSUP H. Adam Malik", "RS Columbia Asia", "RS Mitra Medika", "RS Royal Prima"];

  // derived filtered pendonor
  const filteredPendonor = useMemo(() => {
    return initialPendonor.filter((p) => {
      const matchDate = dateFilter ? p.tanggal === dateFilter : true;
      const matchRs = hospitalFilter && hospitalFilter !== "Semua Rumah Sakit" ? p.rs === hospitalFilter : true;
      return matchDate && matchRs;
    });
  }, [dateFilter, hospitalFilter]);

  const getStatusClass = (status) => {
    if (status === "Aman" || status === "Tersedia") return "status-aman";
    if (status === "Standar") return "status-standar";
    if (status === "Kritikal" || status === "Digunakan") return "status-kritikal";
    return "status-standar";
  };

  // helper display date in "2 Jan 2025" format
  const formatDisplayDate = (iso) => {
    try {
      const d = new Date(iso);
      const opts = { day: "numeric", month: "short", year: "numeric" };
      return d.toLocaleDateString("en-GB", opts); // e.g. "2 Jan 2025"
    } catch {
      return iso;
    }
  };

  return (
    <div className="dokter-layout">
      <DokterSidebar />

      <main className="dokter-main">
        <h1 className="stok-title">Manajemen Stok Darah</h1>
        <p className="stok-sub">Perbarui dan pantau ketersediaan darah di instansi Anda.</p>

        {/* CARD 1 — Stok Darah */}
        <div className="stok-card">
          <div className="stok-card-header">
            <h3>🩸 Stok Darah Terkini</h3>

            <div className="stok-actions">
              <button className="btn-export">Export Data</button>
              <button className="btn-add"><FaPlus /> Tambah Tipe Darah</button>
            </div>
          </div>

          <table className="stok-table">
            <thead>
              <tr>
                <th>Gol. Darah</th>
                <th>Jumlah (Unit)</th>
                <th>Target Minimum</th>
                <th>Tanggal Kedaluwarsa Terdekat</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {stock.map((s, i) => {
                const percent = Math.min(100, Math.round((s.jumlah / s.min) * 100));
                const statusClass = getStatusClass(s.status);
                return (
                  <tr key={i}>
                    <td>{s.gol}</td>

                    <td>
                      <div className="progress-box">
                        <div className="progress-top">
                          <span className="progress-number">{s.jumlah}</span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className={`progress-fill ${statusClass}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td>{s.min}</td>
                    <td>{formatDisplayDate(s.exp)}</td>

                    <td>
                      <span className={`status-badge ${statusClass}`}>{s.status}</span>
                    </td>

                    <td>
                      <button className="edit-btn" title="Edit"><FaEdit /></button>
                      <button className="delete-btn" title="Delete"><FaTrash /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* CARD 2 — Data Pendonor */}
        <div className="stok-card">
          <div className="stok-card-header between">
            <h3>📄 Data Pendonor Stok Darah</h3>

            <div className="filter-box">
              <input
                type="date"
                className="filter-input"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                placeholder="Masukkan Tanggal Donor..."
                title="Filter tanggal donor"
              />

              <select
                className="filter-select"
                value={hospitalFilter}
                onChange={(e) => setHospitalFilter(e.target.value)}
              >
                {hospitals.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
          </div>

          <table className="stok-table">
            <thead>
              <tr>
                <th>Tanggal Donor</th>
                <th>Nama Pendonor</th>
                <th>Gol. Darah</th>
                <th>Jumlah (Unit)</th>
                <th>Rumah Sakit</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {filteredPendonor.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "20px 0" }}>
                    Tidak ada data pendonor sesuai filter.
                  </td>
                </tr>
              ) : (
                filteredPendonor.map((p, idx) => (
                  <tr key={idx}>
                    <td>{formatDisplayDate(p.tanggal)}</td>
                    <td>{p.nama}</td>
                    <td>{p.gol}</td>
                    <td>{p.unit}</td>
                    <td>{p.rs}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(p.status)}`}>{p.status}</span>
                    </td>
                    <td>
                      <button className="delete-btn small">Detail</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
