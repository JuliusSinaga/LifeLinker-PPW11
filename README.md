# LifeLinker - Bank Darah Digital 

**LifeLinker** adalah sebuah aplikasi web bank darah digital yang dikembangkan sebagai bagian dari mata kuliah Pemrograman dan Pengujian Aplikasi Web (PPW) Semester V 2025/2026, Kelompok 11. 

## 📜 Tentang Proyek

Proyek LifeLinker merupakan sebuah inovasi digital yang bertujuan untuk mengatasi permasalahan sulitnya memperoleh donor darah dengan cepat, aman, dan transparan.  Aplikasi ini dirancang untuk menghubungkan seluruh pihak yang terlibat dalam proses donor darah—pendonor, penerima darah, tenaga medis (dokter), serta admin—dalam satu platform yang terintegrasi.  

Tujuan utama dari proyek ini adalah:
* Membangun sistem informasi donor darah berbasis web yang terintegrasi. 
* Menyediakan fitur pengecekan stok darah secara *real-time* untuk mendukung transparansi data. 
* Menyediakan sistem pencarian pendonor terdekat berbasis lokasi (geolokasi). 
* Menyediakan fasilitas konsultasi medis secara daring. 
* Mempercepat proses koordinasi antara masyarakat, rumah sakit, dan PMI. 

## ✨ Fitur Utama

Aplikasi ini dirancang untuk memiliki tiga peran pengguna utama: **User**, **Dokter**, dan **Admin**.  

### Fungsionalitas Umum
* **Beranda (Homepage):** Menampilkan visi misi, ringkasan statistik (jumlah pendonor, kantong darah, event), dan akses cepat ke fitur utama. 
* **Event:** Menampilkan daftar kegiatan donor darah lengkap dengan detail jadwal, lokasi, dan opsi pendaftaran.  
* **Lokasi:** Daftar PMI/RS dengan informasi alamat, kontak, jam operasional, dan integrasi peta.  
* **Stok Darah:** Informasi ketersediaan darah di PMI/RS secara berkala berdasarkan golongan darah, lengkap dengan status ketersediaan (aman, kurang, kritis) dan waktu pembaruan terakhir. 
* **Riwayat:** Menampilkan riwayat donor darah pengguna, total donasi, dan siklus donor.  
* **Konsultasi:** Fasilitas komunikasi dengan pihak medis atau admin seputar kelayakan donor.  

### Peran Pengguna
1.  **User (Pendonor/Penerima):**
    * Melakukan registrasi dan login. 
    * Memantau ketersediaan stok darah. 
    * Mencari pendonor terdekat. 
    * Mengikuti event donor darah dan bergabung dalam komunitas. 
    * Berkonsultasi dengan tenaga medis. 
2.  **Dokter:**
    * Melakukan verifikasi kesehatan pendonor. 
    * Mencatat riwayat donor. 
    * Memberikan layanan konsultasi medis. 
    * Melakukan validasi kegiatan donor. 
3.  **Admin:**
    * Mengelola data user dan dokter. 
    * Memperbarui informasi stok darah. 
    * Mengoordinasikan event donor darah dan mengelola forum komunitas. 
    * Menyusun laporan sistem. 

## 🛠️ Tumpukan Teknologi (Tech Stack)

Berdasarkan dokumen perencanaan, proyek ini akan dikembangkan menggunakan:
* **Backend:** Golang
* **Frontend:** React JS
* **Database:** PostgreSQL  
* **Desain UI/UX:** Figma  
* **Editor Kode:** Visual Studio Code  
* **API (Integrasi):** API Geolokasi dan API Stok Darah (dummy data).  

## 👨‍💻 Tim Pengembang (Kelompok 11)

Proyek ini dikerjakan oleh mahasiswa Program Studi Sarjana Sistem Informasi, Institut Teknologi Del.  

* **Pemberi Kerja (Dosen):** Chandro Pardede, S.Kom., M.Sc.  

### Anggota Tim
* **Rachel C.P Simorangkir** (12S23020) – Project Manager 
* **Julius K.B.T Sinaga** (12S23035) – Backend Developer 
* **Clarissa Manurung** (12S23049) – Frontend Developer 
* **Dina Marlina Siagian** (12S23009) – UI/UX Designer 

## 🗓️ Jadwal Proyek

Proyek ini dilaksanakan dalam 13 Minggu Akademik (22 September s/d 20 Desember 2025). 

| Tahapan | Durasi | Kegiatan Utama   |
| :--- | :--- | :--- |
| **Planning** | 1 Minggu | Pembuatan proposal & ToR, Instalasi tools. |
| **Analisis & Desain** | 2 Minggu | Analisis kebutuhan, Perancangan ERD, Desain UI/UX di Figma. |
| **Development I** | 2 Minggu | Implementasi antarmuka (HTML/CSS), Backend dasar (Laravel), Fitur registrasi/login, Menampilkan stok darah. |
| **Seminar Proses** | Minggu-7 | Presentasi progres dan perbaikan feedback. |
| **Development II** | 2 Minggu | Fitur geolokasi, Integrasi API, Fitur riwayat donor. |
| **Testing** | 1 Minggu | Unit testing, Uji integrasi, Uji coba pengguna. |
| **Implementasi** | 2 Minggu | Bug fixing, Hosting, Peluncuran prototipe. |
