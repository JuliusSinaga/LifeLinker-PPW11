import React from "react";
import "./Footer.css";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section left">
        <h3 className="footer-logo">
          Life<span className="footer-red">Linker</span>
        </h3>
        <p>Dibuat oleh Kelompok 11 PPW ©2025</p>
      </div>

      <div className="footer-section center">
        <h4 className="footer-title">Navigasi</h4>
        <p className="footer-links">
          Beranda | Lokasi Donor | Stok Darah | Event | Riwayat | Konsultasi
        </p>
      </div>

      <div className="footer-section right">
        <h4 className="footer-title">Ikuti Kami</h4>
        <div className="footer-icons">
          <FaInstagram />
          <FaFacebookF />
          <FaTwitter />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
