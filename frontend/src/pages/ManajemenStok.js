import React from "react";
import { Link } from "react-router-dom";
import "./ManajemenStok.css";
import {
  FaTachometerAlt,
  FaTint,
  FaCalendarAlt,
  FaComments,
  FaUserMd,
  FaSignOutAlt,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const ManajemenStok = () => {
  const bloodData = [
    { id: 1, golongan: "A", stok: 320, status: "Aman" },
    { id: 2, golongan: "B", stok: 95, status: "Standar" },
    { id: 3, golongan: "AB", stok: 45, status: "Kritikal" },
    { id: 4, golongan: "O", stok: 410, status: "Aman" },
  ];

  const getStatusColor = (status) => {
    if (status === "Aman") return "status-aman";
    if (status === "Standar") return "status-standar";
    if (status === "Kritikal") return "status-kritikal";
  };

  return (
    <div className="stok-wrapper">
      
      {/* Sidebar */}
      <div className="sidebar">
        <div className="doctor-profile">
          <img src="/images/doctor-avatar.png" alt="dokter" />
          <h4>Dr. Anastasya</h4>
          <p>Spesialis Hematologi</p>
        </div>

        <div className="menu-links">
          <Link to="/dashboard">
            <FaTachometerAlt /> Dashboard
          </Link>
          <Link to="/manajemen-stok" className="active">
            <FaTint /> Manajemen Stok
          </Link>
          <Link to="/manajemen-event">
            <FaCalendarAlt /> Manajemen Event
          </Link>
          <Link to="/konsultasi-edukasi">
            <FaComments /> Konsultasi & Edukasi
          </Link>
          <Link to="/profile">
            <FaUserMd /> Profil Saya
          </Link>
          <a href="#" className="logout">
            <FaSignOutAlt /> Logout
          </a>
        </div>
      </div>

      {/* Konten */}
      <div className="stok-container">
        <div className="stok-header">
          <h2>Manajemen Stok Darah</h2>
          <button className="btn-tambah">
            <FaPlus /> Tambah Stok
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Golongan Darah</th>
                <th>Stok Tersedia</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {bloodData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.golongan}</td>
                  <td>{item.stok}</td>
                  <td>
                    <span className={`status-badge ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="aksi">
                    <button className="edit-btn">
                      <FaEdit />
                    </button>
                    <button className="delete-btn">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ManajemenStok;
