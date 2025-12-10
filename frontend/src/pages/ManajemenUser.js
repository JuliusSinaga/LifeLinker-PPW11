import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/SidebarAdmin"; // Pastikan path benar
import axiosClient from "../service/axiosClient";
import { FaSearch, FaTrash, FaUserEdit } from "react-icons/fa";
import "./ManajemenUser.css"; // Kita akan buat CSS sederhana di bawah

export default function ManajemenUser() {
  // 1. Inisialisasi state dengan ARRAY KOSONG [] agar tidak error .filter
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  // 2. Fetch Data User dari Backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/users");
      // Backend mengirim: { data: [...] }
      // Pastikan kita mengambil .data.data, atau fallback ke [] jika kosong
      const dataUser = response.data.data || [];
      setUsers(dataUser);
    } catch (err) {
      console.error("Gagal ambil data user:", err);
      setError("Gagal memuat data pengguna.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Fungsi Delete (Opsional)
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus user ini?")) return;
    
    // Logic hapus ke backend (belum ada di controller, tapi disiapkan di UI)
    // await axiosClient.delete(`/users/${id}`);
    alert("Fitur hapus belum diimplementasikan di backend.");
  };

  // 4. Logika Filter Pencarian (Aman karena users defaultnya [])
  const filteredUsers = users.filter((user) => {
    if (!user) return false;
    const name = user.name || user.Nama || ""; // Handle beda naming convention
    const email = user.email || user.Email || "";
    const term = searchTerm.toLowerCase();
    
    return name.toLowerCase().includes(term) || email.toLowerCase().includes(term);
  });

  return (
    <div className="admin-layout" style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      <SidebarAdmin />

      <main className="admin-content" style={{ flex: 1, padding: "30px" }}>
        <div className="admin-header-content" style={{ marginBottom: "30px" }}>
          <h1 style={{ color: "#1f2937", fontSize: "24px", fontWeight: "bold" }}>Manajemen User</h1>
          <p style={{ color: "#6b7280" }}>Kelola data pendonor dan pengguna aplikasi.</p>
        </div>

        {/* Search Bar */}
        <div className="search-bar-container" style={{ backgroundColor: "white", padding: "15px", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.05)", marginBottom: "20px", display: "flex", gap: "10px" }}>
          <FaSearch style={{ color: "#9ca3af", marginTop: "12px" }} />
          <input
            type="text"
            placeholder="Cari nama atau email user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: "none", outline: "none", width: "100%", fontSize: "16px" }}
          />
        </div>

        {/* Error Message */}
        {error && <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>}

        {/* Table Container */}
        <div className="table-container" style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>Memuat data...</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                <tr>
                  <th style={{ padding: "15px", color: "#374151", fontWeight: "600" }}>ID</th>
                  <th style={{ padding: "15px", color: "#374151", fontWeight: "600" }}>Nama Lengkap</th>
                  <th style={{ padding: "15px", color: "#374151", fontWeight: "600" }}>Email</th>
                  <th style={{ padding: "15px", color: "#374151", fontWeight: "600" }}>No HP</th>
                  <th style={{ padding: "15px", color: "#374151", fontWeight: "600" }}>Gol. Darah</th>
                  <th style={{ padding: "15px", color: "#374151", fontWeight: "600" }}>Kota</th>
                  <th style={{ padding: "15px", color: "#374151", fontWeight: "600" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr key={user.id || index} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      <td style={{ padding: "15px", color: "#6b7280" }}>#{user.id}</td>
                      <td style={{ padding: "15px", fontWeight: "500", color: "#111827" }}>
                        {user.name || user.Nama}
                      </td>
                      <td style={{ padding: "15px", color: "#6b7280" }}>{user.email || user.Email}</td>
                      <td style={{ padding: "15px", color: "#6b7280" }}>{user.phone || user.NoHp || "-"}</td>
                      <td style={{ padding: "15px" }}>
                        {(user.blood_type || user.GolDarah) ? (
                          <span style={{ backgroundColor: "#fee2e2", color: "#991b1b", padding: "4px 8px", borderRadius: "15px", fontSize: "12px", fontWeight: "bold" }}>
                            {user.blood_type || user.GolDarah} {user.rhesus || user.Rhesus}
                          </span>
                        ) : (
                          <span style={{ color: "#9ca3af", fontSize: "12px" }}>-</span>
                        )}
                      </td>
                      <td style={{ padding: "15px", color: "#6b7280" }}>{user.city || user.Kota || "-"}</td>
                      <td style={{ padding: "15px" }}>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <button style={{ border: "none", background: "none", cursor: "pointer", color: "#3b82f6" }}>
                            <FaUserEdit />
                          </button>
                          <button 
                            onClick={() => handleDelete(user.id)}
                            style={{ border: "none", background: "none", cursor: "pointer", color: "#ef4444" }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ padding: "30px", textAlign: "center", color: "#6b7280" }}>
                      Tidak ada data pengguna ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}