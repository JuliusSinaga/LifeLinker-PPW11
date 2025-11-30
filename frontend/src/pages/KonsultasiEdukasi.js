import React, { useState } from "react";
import "./KonsultasiEdukasi.css";

const KonsultasiEdukasi = () => {
  const [data, setData] = useState([
    { id: 1, nama: "Budi Santoso", topik: "Masalah Mental Health", status: "Menunggu" },
    { id: 2, nama: "Siti Dewi", topik: "Karir & Stress", status: "Diproses" },
  ]);

  return (
    <div className="konsultasi-container">
      <h2>Manajemen Konsultasi</h2>

      <div className="konsultasi-table">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Pengguna</th>
              <th>Topik Konsultasi</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={d.id}>
                <td>{i + 1}</td>
                <td>{d.nama}</td>
                <td>{d.topik}</td>
                <td>{d.status}</td>
                <td>
                  <button className="btn-proses">Proses</button>
                  <button className="btn-hapus">Hapus</button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="5" className="empty">
                  Belum ada data konsultasi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KonsultasiEdukasi;