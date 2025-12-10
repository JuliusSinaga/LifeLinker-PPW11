import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./DetailStokDarahPage.css";
import {
  FaPhone,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaFilter,
  FaCheckCircle,
  FaArrowLeft,
  FaHospital,
  FaClock,
  FaClipboardList,
} from "react-icons/fa";
import Header from "../../components/Header";
import axiosClient from "../../service/axiosClient";

const procedureInfo = [
  "Siapkan surat permintaan darah resmi dari dokter yang merawat.",
  "Sangat disarankan untuk menghubungi unit darah rumah sakit terlebih dahulu untuk konfirmasi stok dan prosedur.",
  "Bawa identitas diri (KTP/SIM) keluarga pasien yang mengambil.",
];

export default function DetailStokDarahPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State Data
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("Tampilkan Semua");

  const filterOptions = [
    "Tampilkan Semua",
    "Kritis Saja",
    "Standar Saja",
    "Aman Saja",
  ];

  // 1. Fetch Data dari Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil detail lokasi & data stok secara paralel
        const [lokasiRes, stokRes] = await Promise.all([
          axiosClient.get(`/lokasi/${id}`),
          axiosClient.get("/stok-darah")
        ]);

        const lokasiData = lokasiRes.data.data;
        const rawStock = stokRes.data.data || [];

        // Mapping Data Stok Backend ke Format UI
        // Backend: { gol_darah: "A", rhesus: "+", jumlah_kantong: 50, ketersediaan: "Aman" }
        // Frontend UI: { type: "A+", status: "Aman", units: 50, percentage: 80, statusClass: "safe" }
        const mappedStock = rawStock.map(item => {
          const statusClass = getStatusClass(item.ketersediaan);
          // Simulasi persentase: Asumsi max kapasitas per golongan = 100 kantong
          const percentage = Math.min((item.jumlah_kantong / 100) * 100, 100); 

          return {
            type: `${item.gol_darah}${item.rhesus}`,
            status: item.ketersediaan,
            units: item.jumlah_kantong,
            percentage: percentage,
            statusClass: statusClass, 
          };
        });

        // Urutkan agar rapi (A+, A-, B+, B-, dst)
        const order = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
        mappedStock.sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));

        // Gabungkan ke object hospital
        setHospital({
          id: lokasiData.ID,
          name: lokasiData.nama_lokasi,
          address: lokasiData.alamat_lokasi,
          operationalHours: lokasiData.jam_operasional_lokasi || "08:00 - 16:00 WIB",
          phone: lokasiData.kontak_lokasi,
          bloodStockData: mappedStock
        });

      } catch (error) {
        console.error("Gagal mengambil data detail stok:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Helper Functions
  const getStatusClass = (status) => {
    switch (status) {
      case "Kritis": return "critical";
      case "Kurang": return "critical"; // Mapping Kurang -> Critical style
      case "Standar": return "standard";
      case "Aman": return "safe";
      default: return "standard";
    }
  };

  const getProgressBarClass = (statusClass) => {
    switch (statusClass) {
      case "critical": return "progress-critical";
      case "standard": return "progress-standard";
      case "safe": return "progress-safe";
      default: return "progress-standard";
    }
  };

  const getStatusBadgeClass = (statusClass) => {
    switch (statusClass) {
      case "critical": return "status-critical";
      case "standard": return "status-standard";
      case "safe": return "status-safe";
      default: return "status-standard";
    }
  };

  // Render Loading / Error
  if (loading) return <div style={{textAlign:'center', padding:'50px'}}>Memuat data stok...</div>;
  if (!hospital) return (
    <div style={{textAlign:'center', padding:'50px'}}>
      <h2>Data tidak ditemukan</h2>
      <button onClick={() => navigate('/stok-darah')}>Kembali</button>
    </div>
  );

  // Filter Logic Client-side
  const filteredData = hospital.bloodStockData.filter((item) => {
    if (selectedFilter === "Tampilkan Semua") return true;
    if (selectedFilter === "Kritis Saja") return item.status === "Kritis" || item.status === "Kurang";
    if (selectedFilter === "Standar Saja") return item.status === "Standar";
    if (selectedFilter === "Aman Saja") return item.status === "Aman";
    return true;
  });

  // Calculate statistics
  const criticalCount = hospital.bloodStockData.filter(item => item.status === "Kritis" || item.status === "Kurang").length;
  const standardCount = hospital.bloodStockData.filter(item => item.status === "Standar").length;
  const safeCount = hospital.bloodStockData.filter(item => item.status === "Aman").length;

  return (
    <div className="detail-stok-root">
      <Header />

      {/* Hospital Info Section */}
      <section className="hospital-info-section" style={{ paddingTop: "40px" }}>
        <div className="hospital-container">
          <div className="back-button">
            <Link to="/stok-darah" className="back-link">
              <FaArrowLeft /> Kembali ke Daftar Rumah Sakit
            </Link>
          </div>

          <div className="hospital-info">
            <h1>
              <FaHospital style={{ display: "inline", marginRight: "12px", color: "var(--primary-red)" }} />
              {hospital.name}
            </h1>
            <div className="hospital-details">
              <div className="detail-item">
                <FaMapMarkerAlt className="detail-icon" />
                <span>{hospital.address}</span>
              </div>
              <div className="detail-item">
                <FaClock className="detail-icon" style={{ color: "var(--primary-red)" }} />
                <span>
                  <strong>Jam Operasional Unit Darah:</strong> {hospital.operationalHours}
                </span>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn-contact">
                <FaPhone /> Hubungi
              </button>
              <button className="btn-whatsapp">
                <FaWhatsapp /> WhatsApp
              </button>
              {/* Link Google Maps Dinamis */}
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name + " " + hospital.address)}`} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-maps"
                style={{textDecoration:'none', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px'}}
              >
                <FaMapMarkerAlt /> Lihat Lokasi di Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="stok-main">
        <div className="stok-container">
          
          {/* Statistics Summary */}
          <div className="stats-summary-grid">
            {/* ... Anda bisa menggunakan CSS Grid di sini atau style inline seperti sebelumnya ... */}
            <div className="stat-box-stok critical">
              <div className="stat-number-stok">{criticalCount}</div>
              <div className="stat-label-stok">Golongan Kritis</div>
            </div>
            <div className="stat-box-stok standard">
              <div className="stat-number-stok">{standardCount}</div>
              <div className="stat-label-stok">Golongan Standar</div>
            </div>
            <div className="stat-box-stok safe">
              <div className="stat-number-stok">{safeCount}</div>
              <div className="stat-label-stok">Golongan Aman</div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="filter-section">
            <div className="filter-label">
              <FaFilter className="filter-icon" />
              <span>Filter Status Stok:</span>
            </div>
            <select
              className="filter-dropdown"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              {filterOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Blood Stock Table */}
          <div className="blood-table-container">
            <table className="blood-table">
              <thead>
                <tr>
                  <th>Golongan Darah</th>
                  <th>Status Ketersediaan</th>
                  <th>Jumlah (Kantong)</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index} className="blood-row">
                      <td className="blood-type-cell">
                        <span className="blood-type-text">{item.type}</span>
                      </td>
                      <td className="status-cell">
                        <div className="progress-container">
                          <div className={`progress-bar ${getProgressBarClass(item.statusClass)}`}>
                            <div
                              className="progress-fill"
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                          <span className={`status-badge ${getStatusBadgeClass(item.statusClass)}`}>
                            {item.status}
                          </span>
                        </div>
                      </td>
                      <td className="units-cell">
                        <span className="units-number">{item.units}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center", padding: "40px", color: "#666" }}>
                      Tidak ada data yang sesuai filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Informasi & Prosedur */}
          <div className="procedure-section">
            <h3>
              <FaClipboardList style={{ color: "var(--primary-red)", marginRight: "10px", display: "inline" }} />
              Informasi & Prosedur Permintaan
            </h3>
            <div className="procedure-list">
              {procedureInfo.map((info, index) => (
                <div key={index} className="procedure-item">
                  <FaCheckCircle className="check-icon" />
                  <span>{info}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer Dihapus (Sudah ada di App.js) */}
    </div>
  );
}