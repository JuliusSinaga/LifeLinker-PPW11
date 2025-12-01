import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

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

// === Admin Dashboard Pages ===
import DashboardAdmin from "./pages/DashboardAdmin";
import ManajemenDokter from "./pages/ManajemenDokter";
import ManajemenUser from "./pages/ManajemenUser";
import ManajemenEvent from "./pages/ManajemenEvent";
import ManajemenPendonor from "./pages/ManajemenPendonor";
import Laporan from "./pages/Laporan";
import ProfilAdmin from "./pages/ProfilAdmin";
import Logout from "./pages/Logout";

// === Dokter Dashboard Pages ===
import DashboardDokter from "./pages/DashboardDokter";
import ManajemenStok from "./pages/ManajemenStok";
import KonsultasiEdukasi from "./pages/KonsultasiEdukasi";
import ProfilDokter from "./pages/ProfilDokter";


// === Components ===
import Footer from "./components/Footer";

// === Fallback ===
import Home from "./pages/Home";

function AppContent() {
  const location = useLocation();

  // Hilangkan footer pada halaman tertentu
  const hideFooterPaths = [
    "/pilih-role",
    "/role-selection",
    "/login-admin",
    "/login-user",
    "/login-dokter",
    "/login-pengguna",
    "/dashboard-admin",
    "/manajemen-dokter",
    "/manajemen-user",
    "/manajemen-event",
    "/manajemen-pendonor",
    "/laporan",
    "/profil-admin",
    "/logout",

    // Dokter dashboard
    "/dashboard",
    "/manajemen-stok",
    "/konsultasi-edukasi",
    "/profil-saya",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <Routes>
          {/* Redirect default */}
          <Route path="/" element={<Navigate to="/beranda" replace />} />

          {/* === Public Routes === */}
          <Route path="/beranda" element={<BerandaPage />} />
          <Route path="/lokasi-donor" element={<LokasiDonorPage />} />
          <Route path="/stok-darah" element={<StokDarahPage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/riwayat" element={<RiwayatPage />} />
          <Route path="/konsultasi" element={<KonsultasiPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Detail Pages */}
          <Route path="/event/:id" element={<DetailEventPage />} />
          <Route path="/lokasi-donor/:id" element={<DetailLokasiPage />} />
          <Route path="/stok-darah/:id" element={<DetailStokDarahPage />} />

          {/* === Login & Roles === */}
          <Route path="/pilih-role" element={<RoleSelection />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/login-user" element={<LoginUser />} />
          <Route path="/login-dokter" element={<LoginDokter />} />
          <Route path="/login-pengguna" element={<LoginPengguna />} />
          <Route path="/daftar-pengguna" element={<DaftarPengguna />} />
          <Route path="/daftar-dokter" element={<DaftarDokter />} />

          {/* === Admin Dashboard === */}
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          <Route path="/manajemen-dokter" element={<ManajemenDokter />} />
          <Route path="/manajemen-user" element={<ManajemenUser />} />
          <Route path="/manajemen-event" element={<ManajemenEvent />} />
          <Route path="/manajemen-pendonor" element={<ManajemenPendonor />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/profil-admin" element={<ProfilAdmin />} />
          <Route path="/logout" element={<Logout />} />

          {/* === Dokter Dashboard === */}
          <Route path="/dashboard" element={<DashboardDokter />} />
          <Route path="/manajemen-stok" element={<ManajemenStok />} />
          <Route path="/konsultasi-edukasi" element={<KonsultasiEdukasi />} />
          <Route path="/profil-saya" element={<ProfilDokter />} />

          {/* Fallback */}
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<h1>404 - Halaman Tidak Ditemukan</h1>} />
        </Routes>
      </div>

      {/* Footer otomatis hilang */}
      {!hideFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
