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
	SeedUsers(db)        // Pastikan User dibuat dulu
	SeedStokDarah(db)    // Butuh Admin
	SeedEvents(db)       // Butuh Lokasi & Admin
	SeedDonations(db)    // Butuh User & Dokter
	SeedConsultations(db) // Butuh User & Dokter
	SeedMessages(db)     // [BARU] Butuh Konsultasi
}

// --- SEEDER LOKASI ---
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
			NamaLokasi:           "RS Pirngadi", 
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

// --- SEEDER USER ---
func SeedUsers(db *gorm.DB) {
	var checkUser models.User
	if err := db.Where("email = ?", "budi@gmail.com").First(&checkUser).Error; err == nil {
		return 
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
            Status:   "active",
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
            Status:       "active",
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
            Status:       "active",
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
            Status:     "active",
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
            Status:     "active",
		},
	}

	for _, user := range users {
		var existing models.User
		if err := db.Where("email = ?", user.Email).First(&existing).Error; err != nil {
			db.Create(&user)
		}
	}
	log.Println("Seeding User Berhasil!")
}

// --- SEEDER STOK DARAH ---
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

// --- SEEDER EVENT ---
func SeedEvents(db *gorm.DB) {
	var count int64
	db.Model(&models.Event{}).Count(&count)
	if count > 0 {
		return
	}

	var admin models.User
	var lokasi models.Lokasi
	
    // Ambil data pendukung
    if err := db.Where("role = ?", "admin").First(&admin).Error; err != nil {
        log.Println("Skip Events: Admin tidak ditemukan.")
        return
    }
    
    // Ambil lokasi pertama
	if err := db.First(&lokasi).Error; err != nil {
        log.Println("Skip Events: Lokasi tidak ditemukan.")
        return
    }

	events := []models.Event{
		{
			NamaEvent:      "Donor Darah Serentak Medan",
			TanggalEvent:   time.Now().AddDate(0, 0, 7), 
			DeskripsiEvent: "Ayo ikut serta dalam aksi kemanusiaan donor darah masal di pusat kota Medan.",
			GambarEvent:    "/images/bg beranda awal.jpg",
			LokasiID:       lokasi.ID,
			OrganizerID:    admin.ID,
            Status:         "approved", // Biar langsung muncul di list approved
		},
		{
			NamaEvent:      "Kampanye Sehat Bersama LifeLinker",
			TanggalEvent:   time.Now().AddDate(0, 1, 0),
			DeskripsiEvent: "Kegiatan rutin donor darah untuk menjaga ketersediaan stok darah nasional.",
			GambarEvent:    "/images/bg beranda awal.jpg",
			LokasiID:       lokasi.ID,
			OrganizerID:    admin.ID,
            Status:         "pending", // Untuk demo approval admin
		},
	}

	if err := db.Create(&events).Error; err != nil {
		log.Printf("Gagal seeding event: %v", err)
	} else {
		log.Println("Seeding Event Berhasil!")
	}
}

// --- SEEDER DONASI ---
func SeedDonations(db *gorm.DB) {
	var count int64
	db.Model(&models.DonationHistory{}).Count(&count)
	if count > 0 {
		return
	}

	var user, dokter models.User
	
	if err := db.Where("email = ?", "budi@gmail.com").First(&user).Error; err != nil {
		log.Println("Skip SeedDonations: User 'budi@gmail.com' tidak ditemukan.")
		return
	}
	
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

// --- SEEDER KONSULTASI ---
func SeedConsultations(db *gorm.DB) {
	var count int64
	db.Model(&models.Consultation{}).Count(&count)
	if count > 0 {
		return
	}

	var user, dokter models.User
	
	if err := db.Where("email = ?", "budi@gmail.com").First(&user).Error; err != nil { return }
	if err := db.Where("email = ?", "dokteranastasya@gmail.com").First(&dokter).Error; err != nil { return }

	consultations := []models.Consultation{
		{
			UserID:           user.ID,
			DoctorID:         dokter.ID,
			ConsultationDate: time.Now().AddDate(0, 0, -2).Format("2006-01-02"),
            ConsultationTime: "10:00",
			Topic:            "Efek Samping Donor",
            // Recommendation: "Perbanyak minum air putih...", // Diganti dengan model Message
			Status:           "Completed",
		},
		{
			UserID:           user.ID,
			DoctorID:         dokter.ID,
			ConsultationDate: time.Now().Format("2006-01-02"),
            ConsultationTime: "14:00",
			Topic:            "Syarat Donor Flu Ringan",
            // Recommendation: "", 
			Status:           "Scheduled",
		},
	}

	if err := db.Create(&consultations).Error; err != nil {
		log.Printf("Gagal seeding konsultasi: %v", err)
	} else {
		log.Println("Seeding Konsultasi Berhasil!")
	}
}

// --- [BARU] SEEDER PESAN CHAT ---
func SeedMessages(db *gorm.DB) {
    var count int64
    db.Model(&models.Message{}).Count(&count)
    if count > 0 { return }

    // Ambil Konsultasi Pertama (Efek Samping Donor)
    var consult models.Consultation
    if err := db.First(&consult).Error; err != nil {
        log.Println("Skip SeedMessages: Konsultasi tidak ditemukan.")
        return
    }

    messages := []models.Message{
        {
            ConsultationID: consult.ID,
            SenderRole:     "patient",
            Text:           "Halo Dok, saya sering merasa pusing setelah donor darah. Apakah itu normal?",
        },
        {
            ConsultationID: consult.ID,
            SenderRole:     "doctor",
            Text:           "Halo Pak Budi. Itu hal yang wajar jika tubuh belum terbiasa atau kurang istirahat.",
        },
        {
            ConsultationID: consult.ID,
            SenderRole:     "doctor",
            Text:           "Pastikan Anda minum banyak air putih sebelum dan sesudah donor, serta hindari aktivitas berat selama 24 jam.",
        },
        {
            ConsultationID: consult.ID,
            SenderRole:     "patient",
            Text:           "Baik Dok, terima kasih sarannya.",
        },
    }

    if err := db.Create(&messages).Error; err != nil {
        log.Printf("Gagal seeding pesan: %v", err)
    } else {
        log.Println("Seeding Pesan Chat Berhasil!")
    }
}