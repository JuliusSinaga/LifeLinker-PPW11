import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// === Public Pages ===
import BerandaPage from "./pages/public/BerandaPage";
import LokasiDonorPage from "./pages/public/LokasiDonorPage";
import StokDarahPage from "./pages/public/StokDarahPage";
import EventPage from "./pages/public/EventPage";
import RiwayatPage from "./pages/public/RiwayatPage";
import KonsultasiPage from "./pages/public/KonsultasiPage";
import DetailEventPage from "./pages/public/DetailEventPage";
import DetailLokasiPage from "./pages/public/DetailLokasiPage";
import DetailStokDarahPage from "./pages/public/DetailStokDarahPage";
import ProfilePage from "./pages/public/ProfilePage";

// === Login & Auth ===
import RoleSelection from "./pages/RoleSelection";
import LoginAdmin from "./pages/LoginAdmin";
import LoginUser from "./pages/LoginUser";
import LoginDokter from "./pages/LoginDokter";
import LoginPengguna from "./pages/LoginPengguna";
import DaftarPengguna from "./pages/DaftarPengguna";
import DaftarDokter from "./pages/DaftarDokter";

// === Dokter Dashboard Pages ===
import DashboardDokter from "./pages/DashboardDokter";
import ManajemenStok from "./pages/ManajemenStok";
import ManajemenEvent from "./pages/ManajemenEvent";
import KonsultasiEdukasi from "./pages/KonsultasiEdukasi";

function App() {
  return (
    <Router>
      <Routes>

        {/* Redirect default ke public beranda */}
        <Route path="/" element={<Navigate to="/beranda" replace />} />

        {/* === Public Routes === */}
        <Route path="/beranda" element={<BerandaPage />} />
        <Route path="/lokasi-donor" element={<LokasiDonorPage />} />
        <Route path="/stok-darah" element={<StokDarahPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/riwayat" element={<RiwayatPage />} />
        <Route path="/konsultasi" element={<KonsultasiPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Detail Routes */}
        <Route path="/event/:id" element={<DetailEventPage />} />
        <Route path="/lokasi-donor/:id" element={<DetailLokasiPage />} />
        <Route path="/stok-darah/:id" element={<DetailStokDarahPage />} />

        {/* === Login & Role === */}
        <Route path="/pilih-role" element={<RoleSelection />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/login-user" element={<LoginUser />} />
        <Route path="/login-dokter" element={<LoginDokter />} />
        <Route path="/login-pengguna" element={<LoginPengguna />} />
        <Route path="/daftar-pengguna" element={<DaftarPengguna />} />
        <Route path="/daftar-dokter" element={<DaftarDokter />} />

        {/* === Dokter Dashboard === */}
        <Route path="/dashboard" element={<DashboardDokter />} />
        <Route path="/manajemen-stok" element={<ManajemenStok />} />
        <Route path="/manajemen-event" element={<ManajemenEvent />} />
        <Route path="/konsultasi-edukasi" element={<KonsultasiEdukasi />} />
        

        {/* Fallback jika route salah */}
        <Route path="*" element={<h1>404 - Halaman Tidak Ditemukan</h1>} />
      </Routes>
    </Router>
  );
}

export default App;