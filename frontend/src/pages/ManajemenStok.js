import React, { useState } from "react";
import SidebarDokter from "../components/SidebarDokter";
import "./ManajemenStok.css";

export default function ManajemenStok() {
  const [showModal, setShowModal] = useState(false);

  const [newType, setNewType] = useState({
    golongan: "",
    jumlah: "",
    target: "",
    kedaluwarsa: "",
  });

  const hospitals = [
    "RSUP H. Adam Malik",
    "RS Colombia Asia",
    "RS Royal Prima",
    "RS Mitra Sejati",
  ];

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setNewType({ golongan: "", jumlah: "", target: "", kedaluwarsa: "" });
  };

  const handleSave = () => {
    if (!newType.golongan || !newType.jumlah || !newType.target) {
      alert("Harap isi semua data!");
      return;
    }

    alert("Tipe darah berhasil ditambahkan!");

    closeModal();
  };

  return (
    <div className="dokter-layout">
      <SidebarDokter />

      <main className="dokter-main">
        <h2 className="page-title">Stok Darah Terkini</h2>

        {/* ===================== CARD STOK DARAH ===================== */}
        <div className="stok-card">
          <div className="stok-card-header">
            <h3>🩸 Stok Darah Terkini</h3>

            <div className="btn-group">
              <button className="btn-export">📤 Export Data</button>

              <button className="btn-add" onClick={openModal}>
                ➕ Tambah Tipe Darah
              </button>
            </div>
          </div>

          <table className="stok-table">
            <thead>
              <tr>
                <th>Gol. Darah</th>
                <th>Jumlah (Unit)</th>
                <th>Target Minimum</th>
                <th>Kedaluwarsa Terdekat</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>A+</td>
                <td>125</td>
                <td>200</td>
                <td>2025-01-15</td>
                <td><span className="badge yellow">STANDAR</span></td>
                <td className="aksi-buttons">✏️ 🗑️</td>
              </tr>

              <tr>
                <td>B-</td>
                <td>25</td>
                <td>200</td>
                <td>2025-01-18</td>
                <td><span className="badge red">KRITIKAL</span></td>
                <td className="aksi-buttons">✏️ 🗑️</td>
              </tr>

              <tr>
                <td>O+</td>
                <td>190</td>
                <td>200</td>
                <td>2025-01-22</td>
                <td><span className="badge green">AMAN</span></td>
                <td className="aksi-buttons">✏️ 🗑️</td>
              </tr>

              <tr>
                <td>AB-</td>
                <td>22</td>
                <td>200</td>
                <td>2025-01-25</td>
                <td><span className="badge red">KRITIKAL</span></td>
                <td className="aksi-buttons">✏️ 🗑️</td>
              </tr>

              <tr>
                <td>AB+</td>
                <td>182</td>
                <td>200</td>
                <td>2025-01-28</td>
                <td><span className="badge yellow">STANDAR</span></td>
                <td className="aksi-buttons">✏️ 🗑️</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ===================== DATA PENDONOR ===================== */}
        <div className="pendonor-card">
          <div className="pendonor-header">
            <h3>📝 Data Pendonor Stok Darah</h3>

            <div className="filter-group">
              <input type="date" className="filter-input" />

              <select className="filter-input">
                <option>Semua Rumah Sakit</option>
                {hospitals.map((rs) => (
                  <option key={rs}>{rs}</option>
                ))}
              </select>
            </div>
          </div>

          <table className="pendonor-table">
            <thead>
              <tr>
                <th>Tanggal Donor</th>
                <th>Nama Pendonor</th>
                <th>Gol. Darah</th>
                <th>Jumlah(Unit)</th>
                <th>Rumah Sakit</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>2025-01-02</td>
                <td>Juniah Jaas</td>
                <td>A+</td>
                <td>1 unit</td>
                <td>RSUP H. Adam Malik</td>
                <td><span className="badge green">TERSEDIA</span></td>
                <td>🗑️</td>
              </tr>

              <tr>
                <td>2025-01-03</td>
                <td>Kooejy Sitha</td>
                <td>A+</td>
                <td>2 unit</td>
                <td>RSUP H. Adam Malik</td>
                <td><span className="badge green">TERSEDIA</span></td>
                <td>🗑️</td>
              </tr>

              <tr>
                <td>2025-01-04</td>
                <td>Derrie Lee</td>
                <td>B-</td>
                <td>2 unit</td>
                <td>RSUP H. Adam Malik</td>
                <td><span className="badge green">TERSEDIA</span></td>
                <td>🗑️</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ===================== MODAL ===================== */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3 className="modal-title">Tambah Tipe Darah</h3>

              <label>Golongan Darah</label>
              <select
                className="modal-input"
                value={newType.golongan}
                onChange={(e) => setNewType({ ...newType, golongan: e.target.value })}
              >
                <option>Pilih Golongan...</option>
                <option>A+</option><option>A-</option>
                <option>B+</option><option>B-</option>
                <option>O+</option><option>O-</option>
                <option>AB+</option><option>AB-</option>
              </select>

              <label>Jumlah Stok</label>
              <input
                type="number"
                className="modal-input"
                value={newType.jumlah}
                onChange={(e) => setNewType({ ...newType, jumlah: e.target.value })}
              />

              <label>Target Minimum</label>
              <input
                type="number"
                className="modal-input"
                value={newType.target}
                onChange={(e) => setNewType({ ...newType, target: e.target.value })}
              />

              <label>Tanggal Kedaluwarsa</label>
              <input
                type="date"
                className="modal-input"
                value={newType.kedaluwarsa}
                onChange={(e) => setNewType({ ...newType, kedaluwarsa: e.target.value })}
              />

              <div className="modal-actions">
                <button className="btn-cancel" onClick={closeModal}>Batal</button>
                <button className="btn-save" onClick={handleSave}>Simpan</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
