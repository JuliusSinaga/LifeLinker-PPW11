# [cite_start]LifeLinker - Bank Darah Digital [cite: 7]

[cite_start]**LifeLinker** adalah sebuah aplikasi web bank darah digital yang dikembangkan sebagai bagian dari mata kuliah Pemrograman dan Pengujian Aplikasi Web (PPW) Semester V 2025/2026, Kelompok 11. [cite: 2]

## 📜 Tentang Proyek

[cite_start]Proyek LifeLinker merupakan sebuah inovasi digital yang bertujuan untuk mengatasi permasalahan sulitnya memperoleh donor darah dengan cepat, aman, dan transparan. [cite: 9] [cite_start]Aplikasi ini dirancang untuk menghubungkan seluruh pihak yang terlibat dalam proses donor darah—pendonor, penerima darah, tenaga medis (dokter), serta admin—dalam satu platform yang terintegrasi. [cite: 10, 84]

Tujuan utama dari proyek ini adalah:
* [cite_start]Membangun sistem informasi donor darah berbasis web yang terintegrasi. [cite: 112]
* [cite_start]Menyediakan fitur pengecekan stok darah secara *real-time* untuk mendukung transparansi data. [cite: 113]
* [cite_start]Menyediakan sistem pencarian pendonor terdekat berbasis lokasi (geolokasi). [cite: 114]
* [cite_start]Menyediakan fasilitas konsultasi medis secara daring. [cite: 115]
* [cite_start]Mempercepat proses koordinasi antara masyarakat, rumah sakit, dan PMI. [cite: 116]

## ✨ Fitur Utama

[cite_start]Aplikasi ini dirancang untuk memiliki tiga peran pengguna utama: **User**, **Dokter**, dan **Admin**. [cite: 15, 119]

### Fungsionalitas Umum
* [cite_start]**Beranda (Homepage):** Menampilkan visi misi, ringkasan statistik (jumlah pendonor, kantong darah, event), dan akses cepat ke fitur utama. [cite: 41]
* [cite_start]**Event:** Menampilkan daftar kegiatan donor darah lengkap dengan detail jadwal, lokasi, dan opsi pendaftaran. [cite: 42, 43]
* [cite_start]**Lokasi:** Daftar PMI/RS dengan informasi alamat, kontak, jam operasional, dan integrasi peta. [cite: 44, 45]
* [cite_start]**Stok Darah:** Informasi ketersediaan darah di PMI/RS secara berkala berdasarkan golongan darah, lengkap dengan status ketersediaan (aman, kurang, kritis) dan waktu pembaruan terakhir. [cite: 46, 47, 48]
* [cite_start]**Riwayat:** Menampilkan riwayat donor darah pengguna, total donasi, dan siklus donor. [cite: 49, 50]
* [cite_start]**Konsultasi:** Fasilitas komunikasi dengan pihak medis atau admin seputar kelayakan donor. [cite: 51, 52]

### Peran Pengguna
1.  **User (Pendonor/Penerima):**
    * [cite_start]Melakukan registrasi dan login. [cite: 16]
    * [cite_start]Memantau ketersediaan stok darah. [cite: 16]
    * [cite_start]Mencari pendonor terdekat. [cite: 16]
    * [cite_start]Mengikuti event donor darah dan bergabung dalam komunitas. [cite: 16]
    * [cite_start]Berkonsultasi dengan tenaga medis. [cite: 16]
2.  **Dokter:**
    * [cite_start]Melakukan verifikasi kesehatan pendonor. [cite: 17]
    * [cite_start]Mencatat riwayat donor. [cite: 17]
    * [cite_start]Memberikan layanan konsultasi medis. [cite: 17]
    * [cite_start]Melakukan validasi kegiatan donor. [cite: 17]
3.  **Admin:**
    * [cite_start]Mengelola data user dan dokter. [cite: 18]
    * [cite_start]Memperbarui informasi stok darah. [cite: 18]
    * [cite_start]Mengoordinasikan event donor darah dan mengelola forum komunitas. [cite: 18]
    * [cite_start]Menyusun laporan sistem. [cite: 18]

## 🛠️ Tumpukan Teknologi (Tech Stack)

Berdasarkan dokumen perencanaan, proyek ini akan dikembangkan menggunakan:
* [cite_start]**Backend:** Golang [cite: 23, 26, 145]
* [cite_start]**Frontend:** React JS [cite: 23, 28, 152]
* [cite_start]**Database:** PostgreSQL [cite: 27] [cite_start]
* [cite_start]**Desain UI/UX:** Figma [cite: 25, 147]
* [cite_start]**Editor Kode:** Visual Studio Code [cite: 26, 144]
* [cite_start]**API (Integrasi):** API Geolokasi dan API Stok Darah (dummy data). [cite: 29, 148]

## 👨‍💻 Tim Pengembang (Kelompok 11)

[cite_start]Proyek ini dikerjakan oleh mahasiswa Program Studi Sarjana Sistem Informasi, Institut Teknologi Del. [cite: 78, 80]

* [cite_start]**Pemberi Kerja (Dosen):** Chandro Pardede, S.Kom., M.Sc. [cite: 3, 130]

### Anggota Tim
* [cite_start]**Rachel C.P Simorangkir** (12S23020) – Project Manager [cite: 160]
* [cite_start]**Julius K.B.T Sinaga** (12S23035) – Backend Developer [cite: 158]
* [cite_start]**Clarissa Manurung** (12S23049) – Frontend Developer [cite: 161]
* [cite_start]**Dina Marlina Siagian** (12S23009) – UI/UX Designer [cite: 159]

## 🗓️ Jadwal Proyek

[cite_start]Proyek ini dilaksanakan dalam 13 Minggu Akademik (22 September s/d 20 Desember 2025). [cite: 5]

| Tahapan | Durasi | [cite_start]Kegiatan Utama [cite: 67, 163] |
| :--- | :--- | :--- |
| **Planning** | 1 Minggu | Pembuatan proposal & ToR, Instalasi tools. |
| **Analisis & Desain** | 2 Minggu | Analisis kebutuhan, Perancangan ERD, Desain UI/UX di Figma. |
| **Development I** | 2 Minggu | Implementasi antarmuka (HTML/CSS), Backend dasar (Laravel), Fitur registrasi/login, Menampilkan stok darah. |
| **Seminar Proses** | Minggu-7 | Presentasi progres dan perbaikan feedback. |
| **Development II** | 2 Minggu | Fitur geolokasi, Integrasi API, Fitur riwayat donor. |
| **Testing** | 1 Minggu | Unit testing, Uji integrasi, Uji coba pengguna. |
| **Implementasi** | 2 Minggu | Bug fixing, Hosting, Peluncuran prototipe. |