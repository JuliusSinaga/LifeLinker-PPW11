import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/SidebarAdmin"; 
import axiosClient from "../service/axiosClient";
import { FaSearch, FaTrash } from "react-icons/fa";
import "./ManajemenUser.css"; 

export default function ManajemenUser() {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  // Fetch Data saat load
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/users");
      const dataUser = response.data.data || [];
      setUsers(dataUser);
    } catch (err) {
      console.error("Gagal ambil data user:", err);
      setError("Gagal memuat data pengguna.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      // Implementasi delete nanti
      alert("Fitur hapus untuk ID " + id + " akan segera hadir.");
    }
  };

  const filteredUsers = users.filter((user) => {
    if (!user) return false;
    const name = user.name || ""; 
    const email = user.email || "";
    const term = searchTerm.toLowerCase();
    return name.toLowerCase().includes(term) || email.toLowerCase().includes(term);
  });

  return (
    <div className="admin-layout">
      {/* Sidebar Tetap */}
      <SidebarAdmin />

      {/* Konten Utama di Sebelah Kanan */}
      <main className="admin-content">
        <div className="admin-header-content">
          <h1>Manajemen User</h1>
          <p>Kelola data pendonor dan pengguna aplikasi LifeLinker.</p>
        </div>

        {/* Search Bar */}
        <div className="search-bar-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Cari nama atau email user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* Tabel Data */}
        <div className="table-card">
          {loading ? (
            <p className="loading-text">Memuat data...</p>
          ) : (
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Nama Lengkap</th>
                    <th>Email</th>
                    <th>No HP</th>
                    <th>Gol. Darah</th>
                    <th>Kota</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <tr key={user.id || index}>
                        <td>
                          <div className="user-name-cell">
                            <div className="user-avatar-small">
                              {(user.name || "U").charAt(0).toUpperCase()}
                            </div>
                            <span>{user.name}</span>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.phone || "-"}</td>
                        <td>
                          {user.blood_type ? (
                            <span className="badge-blood">
                              {user.blood_type} {user.rhesus}
                            </span>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td>{user.city || "-"}</td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="btn-icon delete" 
                              onClick={() => handleDelete(user.id)}
                              title="Hapus User"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="empty-state">
                        Tidak ada data pengguna ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}