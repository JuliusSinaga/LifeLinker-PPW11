import { Link, useLocation } from "react-router-dom";

export default function FooterNav() {
  const location = useLocation();
  const navItems = [
    { name: "Beranda", path: "/" },
    { name: "Lokasi Donor", path: "/lokasi-donor" },
    { name: "Stok Darah", path: "/stok-darah" },
    { name: "Event", path: "/event" },
    { name: "Riwayat", path: "/riwayat" },
    { name: "Konsultasi", path: "/konsultasi" },
  ];

  return (
    <footer className="bg-red-700 text-white py-4">
      <div className="container mx-auto flex justify-center space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`hover:underline ${
              location.pathname === item.path ? "font-bold" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </footer>
  );
}
