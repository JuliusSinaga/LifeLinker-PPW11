package database

import (
	"log"
	"time"

	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// Fungsi utama untuk menjalankan semua seeder
func SeedAll(db *gorm.DB) {
	SeedLokasi(db)
	SeedUsers(db)         // Pastikan User dibuat dulu
	SeedStokDarah(db)     // Butuh Admin
	SeedEvents(db)        // Butuh Lokasi & Admin
	SeedDonations(db)     // Butuh User & Dokter
	SeedConsultations(db) // Butuh User & Dokter
}

// --- SEEDER LOKASI (DATA DARI ANDA) ---
func SeedLokasi(db *gorm.DB) {
	var count int64
	db.Model(&models.Lokasi{}).Count(&count)

	if count > 0 {
		return
	}

	lokasiList := []models.Lokasi{
		{
			NamaLokasi:           "RSUP H. Adam Malik",
			AlamatLokasi:         "Jl. Bunga Lau No.17, Medan Tuntungan",
			KontakLokasi:         "(061) 8360051",
			JamOperasionalLokasi: "24 Jam",
			GambarLokasi:         "/images/bg beranda awal.jpg",
		},
		{
			NamaLokasi:           "RS HKBP Balige",
			AlamatLokasi:         "Jl. Gereja No.17, Balige",
			KontakLokasi:         "(0632) 21043",
			JamOperasionalLokasi: "08:00 - 16:00",
			GambarLokasi:         "/images/bg beranda awal.jpg",
		},
		{
			NamaLokasi:           "RS Pirngadi", // Typo fixed: Pirgandi -> Pirngadi
			AlamatLokasi:         "Jl. Prof. HM. Yamin, Medan",
			KontakLokasi:         "(061) 4158701",
			JamOperasionalLokasi: "24 Jam",
			GambarLokasi:         "/images/bg beranda awal.jpg",
		},
	}

	if err := db.Create(&lokasiList).Error; err != nil {
		log.Printf("Gagal seeding lokasi: %v", err)
	} else {
		log.Println("Seeding Lokasi Berhasil!")
	}
}

// --- SEEDER USER (DATA DARI ANDA) ---
func SeedUsers(db *gorm.DB) {
	// Cek apakah user spesifik "budi@gmail.com" sudah ada?
    // Kita tidak pakai Count > 0 lagi, karena itu kurang akurat.
	var checkUser models.User
	if err := db.Where("email = ?", "budi@gmail.com").First(&checkUser).Error; err == nil {
		return // Jika Budi sudah ada, kita asumsikan user lain juga aman. Skip.
	}

	hash := func(pwd string) string {
		bytes, _ := bcrypt.GenerateFromPassword([]byte(pwd), bcrypt.DefaultCost)
		return string(bytes)
	}

	users := []models.User{
		// 1. ADMIN
		{
			Nama:     "Admin LifeLinker",
			Email:    "admin@lifelinker.com",
			Password: hash("admin123"),
			Role:     "admin",
			NoHp:     "081234567890",
			Kota:     "Medan",
		},
		// 2. DOKTER
		{
			Nama:         "Dr. Anastasya",
			Email:        "dokteranastasya@gmail.com",
			Password:     hash("dokter123"),
			Role:         "dokter",
			NoHp:         "081298765432",
			NomorSTR:     "1234567890STR",
			Spesialisasi: "Patologi Klinik",
			Instansi:     "RSUP H. Adam Malik",
			Kota:         "Medan",
		},
		{
			Nama:         "Dr. Tuti Astuni",
			Email:        "doktertutiastuni@gmail.com",
			Password:     hash("dokter123"),
			Role:         "dokter",
			NoHp:         "081212345678",
			NomorSTR:     "1234567890STR",
			Spesialisasi: "Patologi Klinik",
			Instansi:     "RS HKBP Balige",
			Kota:         "Toba Samosir",
		},
		// 3. USER BIASA
		{
			Nama:       "Budi Setiawan",
			Email:      "budi@gmail.com",
			Password:   hash("user123"),
			Role:       "user",
			NoHp:       "085211112222",
			GolDarah:   "O",
			Rhesus:     "+",
			BeratBadan: 70,
			Kota:       "Medan",
		},
		{
			Nama:       "Aisha Feransiaka",
			Email:      "aisha@gmail.com",
			Password:   hash("user123"),
			Role:       "user",
			NoHp:       "085233334444",
			GolDarah:   "A",
			Rhesus:     "+",
			BeratBadan: 65,
			Kota:       "Toba Samosir",
		},
	}

	// Gunakan Clause(OnConflict) agar tidak error jika email duplikat sebagian
	for _, user := range users {
		var existing models.User
		if err := db.Where("email = ?", user.Email).First(&existing).Error; err != nil {
			// Jika tidak ada, buat baru
			db.Create(&user)
		}
	}
	log.Println("Seeding User Berhasil/Diperbarui!")
}

// --- SEEDER STOK DARAH (DATA DARI ANDA) ---
func SeedStokDarah(db *gorm.DB) {
	var count int64
	db.Model(&models.StokDarah{}).Count(&count)

	if count > 0 {
		return
	}

	var admin models.User
	if err := db.Where("role = ?", "admin").First(&admin).Error; err != nil {
		log.Println("Skip Stok Darah: Admin tidak ditemukan.")
		return
	}

	stokList := []models.StokDarah{
		{GolDarah: "A", Rhesus: "+", Ketersediaan: "Aman", JumlahKantong: 50, WaktuPembaruan: time.Now(), AdminID: admin.ID},
		{GolDarah: "A", Rhesus: "-", Ketersediaan: "Kurang", JumlahKantong: 10, WaktuPembaruan: time.Now(), AdminID: admin.ID},
		{GolDarah: "B", Rhesus: "+", Ketersediaan: "Aman", JumlahKantong: 45, WaktuPembaruan: time.Now(), AdminID: admin.ID},
		{GolDarah: "B", Rhesus: "-", Ketersediaan: "Kritis", JumlahKantong: 3, WaktuPembaruan: time.Now(), AdminID: admin.ID},
		{GolDarah: "AB", Rhesus: "+", Ketersediaan: "Kurang", JumlahKantong: 15, WaktuPembaruan: time.Now(), AdminID: admin.ID},
		{GolDarah: "AB", Rhesus: "-", Ketersediaan: "Kritis", JumlahKantong: 2, WaktuPembaruan: time.Now(), AdminID: admin.ID},
		{GolDarah: "O", Rhesus: "+", Ketersediaan: "Aman", JumlahKantong: 80, WaktuPembaruan: time.Now(), AdminID: admin.ID},
		{GolDarah: "O", Rhesus: "-", Ketersediaan: "Aman", JumlahKantong: 25, WaktuPembaruan: time.Now(), AdminID: admin.ID},
	}

	if err := db.Create(&stokList).Error; err != nil {
		log.Printf("Gagal seeding stok darah: %v", err)
	} else {
		log.Println("Seeding Stok Darah Berhasil!")
	}
}

// --- SEEDER EVENT (TAMBAHAN BARU) ---
func SeedEvents(db *gorm.DB) {
	var count int64
	db.Model(&models.Event{}).Count(&count)
	if count > 0 {
		return
	}

	// Ambil Admin dan Salah Satu Lokasi
	var admin models.User
	var lokasi models.Lokasi
	db.Where("role = ?", "admin").First(&admin)
	db.First(&lokasi) // Mengambil RSUP H. Adam Malik (biasanya ID 1)

	events := []models.Event{
		{
			NamaEvent:      "Donor Darah Serentak Medan",
			TanggalEvent:   time.Now().AddDate(0, 0, 7), // 7 hari lagi
			DeskripsiEvent: "Ayo ikut serta dalam aksi kemanusiaan donor darah masal di pusat kota Medan.",
			GambarEvent:    "/images/bg beranda awal.jpg",
			LokasiID:       lokasi.ID,
			OrganizerID:    admin.ID,
		},
		{
			NamaEvent:      "Kampanye Sehat Bersama LifeLinker",
			TanggalEvent:   time.Now().AddDate(0, 1, 0), // 1 bulan lagi
			DeskripsiEvent: "Kegiatan rutin donor darah untuk menjaga ketersediaan stok darah nasional.",
			GambarEvent:    "/images/bg beranda awal.jpg",
			LokasiID:       lokasi.ID,
			OrganizerID:    admin.ID,
		},
	}

	if err := db.Create(&events).Error; err != nil {
		log.Printf("Gagal seeding event: %v", err)
	} else {
		log.Println("Seeding Event Berhasil!")
	}
}

// --- SEEDER RIWAYAT DONASI (TAMBAHAN BARU) ---
func SeedDonations(db *gorm.DB) {
	var count int64
	db.Model(&models.DonationHistory{}).Count(&count)
	if count > 0 {
		return
	}

	// Cari User & Dokter dengan Error Handling yang lebih baik
	var user, dokter models.User
	
    // Cari Budi
	if err := db.Where("email = ?", "budi@gmail.com").First(&user).Error; err != nil {
		log.Println("Skip SeedDonations: User 'budi@gmail.com' tidak ditemukan.")
		return
	}
    
    // Cari Dokter Anastasya
	if err := db.Where("email = ?", "dokteranastasya@gmail.com").First(&dokter).Error; err != nil {
		log.Println("Skip SeedDonations: Dokter 'dokteranastasya' tidak ditemukan.")
		return
	}

	donations := []models.DonationHistory{
		{
			UserID:          user.ID,
			DoctorID:        dokter.ID,
			DonationDate:    time.Now().AddDate(0, -3, 0),
			BloodType:       user.GolDarah,
			QuantityDonated: 350,
			Status:          "Approved",
		},
		{
			UserID:          user.ID,
			DoctorID:        dokter.ID,
			DonationDate:    time.Now().AddDate(0, 0, -5),
			BloodType:       user.GolDarah,
			QuantityDonated: 350,
			Status:          "Pending",
		},
	}

	if err := db.Create(&donations).Error; err != nil {
		log.Printf("Gagal seeding donasi: %v", err)
	} else {
		log.Println("Seeding Riwayat Donasi Berhasil!")
	}
}

// --- PERBAIKAN SEEDER KONSULTASI ---
func SeedConsultations(db *gorm.DB) {
	var count int64
	db.Model(&models.Consultation{}).Count(&count)
	if count > 0 {
		return
	}

	var user, dokter models.User
    
    // Cari User & Dokter dengan aman
	if err := db.Where("email = ?", "budi@gmail.com").First(&user).Error; err != nil {
        log.Println("Skip SeedConsultations: User tidak ditemukan.")
		return
    }
	if err := db.Where("email = ?", "dokteranastasya@gmail.com").First(&dokter).Error; err != nil {
        log.Println("Skip SeedConsultations: Dokter tidak ditemukan.")
		return
    }

	consultations := []models.Consultation{
		{
			UserID:           user.ID,
			DoctorID:         dokter.ID,
			ConsultationDate: time.Now().AddDate(0, 0, -2),
			Issue:            "Saya sering pusing setelah donor darah, apakah itu normal?",
			Recommendation:   "Perbanyak minum air putih dan istirahat cukup setelah donor. Hindari aktivitas berat.",
			Status:           "Completed",
		},
		{
			UserID:           user.ID,
			DoctorID:         dokter.ID,
			ConsultationDate: time.Now(),
			Issue:            "Apakah boleh donor saat sedang flu ringan?",
			Recommendation:   "",
			Status:           "Scheduled",
		},
	}

	if err := db.Create(&consultations).Error; err != nil {
		log.Printf("Gagal seeding konsultasi: %v", err)
	} else {
		log.Println("Seeding Konsultasi Berhasil!")
	}
}