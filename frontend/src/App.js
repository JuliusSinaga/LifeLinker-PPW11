import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import LokasiDonor from "./pages/LokasiDonor";
import StokDarah from "./pages/StokDarah";
import Event from "./pages/Event";
import Riwayat from "./pages/Riwayat";
import Konsultasi from "./pages/Konsultasi";
import RoleSelection from "./pages/RoleSelection";
import LoginAdmin from "./pages/LoginAdmin";
import LoginUser from "./pages/LoginUser";
import LoginDokter from "./pages/LoginDokter";
import LoginPengguna from "./pages/LoginPengguna";
import FooterNav from "./components/FooterNav";
import DaftarPengguna from "./pages/DaftarPengguna";

function AppContent() {
  const location = useLocation();
  const hideFooterPaths = ["/role-selection", "/login-admin", "/login-user", "/login-dokter", "/login-pengguna"];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <Routes>
          <Route path="/pilih-role" element={<RoleSelection />} />
          {/* Halaman awal */}
          <Route path="/" element={<RoleSelection />} />

          {/* Halaman utama */}
          <Route path="/home" element={<Home />} />
          <Route path="/lokasi-donor" element={<LokasiDonor />} />
          <Route path="/stok-darah" element={<StokDarah />} />
          <Route path="/event" element={<Event />} />
          <Route path="/riwayat" element={<Riwayat />} />
          <Route path="/konsultasi" element={<Konsultasi />} />

          {/* Halaman login */}
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/login-user" element={<LoginUser />} />
          <Route path="/login-dokter" element={<LoginDokter />} />
          <Route path="/daftar-pengguna" element={<DaftarPengguna />} />
          <Route path="/login-pengguna" element={<LoginPengguna />} />
        </Routes>
      </div>

      {/* Footer hanya muncul di halaman utama */}
      {!hideFooterPaths.includes(location.pathname) && <FooterNav />}
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
