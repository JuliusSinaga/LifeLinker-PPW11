import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import halaman lama (fallback)
import Home from "./pages/Home";
import RoleSelection from "./pages/RoleSelection";
import LoginAdmin from "./pages/LoginAdmin";
import LoginUser from "./pages/LoginUser";
import LoginDokter from "./pages/LoginDokter";
import LoginPengguna from "./pages/LoginPengguna";
import DaftarPengguna from "./pages/DaftarPengguna";
import DaftarDokter from "./pages/DaftarDokter";

// Import halaman baru dari folder public
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

function AppContent() {
  return (
    <div className="app-container">
      <Routes>
        {/* Halaman awal */}
        <Route path="/" element={<BerandaPage />} />
        <Route path="/beranda" element={<BerandaPage />} />

        {/* Halaman utama - gunakan versi baru dari folder public */}
        <Route path="/lokasi-donor" element={<LokasiDonorPage />} />
        <Route path="/stok-darah" element={<StokDarahPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/riwayat" element={<RiwayatPage />} />
        <Route path="/konsultasi" element={<KonsultasiPage />} />

        {/* Halaman detail */}
        <Route path="/event/:id" element={<DetailEventPage />} />
        <Route path="/lokasi-donor/:id" element={<DetailLokasiPage />} />
        <Route path="/stok-darah/:id" element={<DetailStokDarahPage />} />

        {/* Halaman profile */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* Halaman role & login */}
        <Route path="/pilih-role" element={<RoleSelection />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/login-user" element={<LoginUser />} />
        <Route path="/login-dokter" element={<LoginDokter />} />
        <Route path="/daftar-pengguna" element={<DaftarPengguna />} />
        <Route path="/daftar-dokter" element={<DaftarDokter />} />
        <Route path="/login-pengguna" element={<LoginPengguna />} />

        {/* Fallback halaman lama */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
