package models

import (
	"gorm.io/gorm"
	"time"
)

type DonationHistory struct {
	gorm.Model
	
	// --- RELASI UTAMA ---
	
	// User (Pendonor) - Wajib ada
	UserID uint `gorm:"not null" json:"user_id"`
	User   User `gorm:"foreignKey:UserID" json:"user"`

	// Dokter (Pemeriksa) - Wajib ada
	DoctorID uint `gorm:"not null" json:"doctor_id"`
	Doctor   User `gorm:"foreignKey:DoctorID" json:"doctor"`

	// Lokasi Donor (Rumah Sakit / Unit) - Tambahan Penting
	// Agar kita tahu di mana donor dilakukan
	LokasiID uint   `json:"lokasi_id"`
	Lokasi   Lokasi `gorm:"foreignKey:LokasiID" json:"lokasi"`

	// --- DATA DONOR ---

	DonationDate    time.Time `gorm:"not null" json:"donation_date"`
	BloodType       string    `gorm:"size:5;not null" json:"blood_type"` // A, B, AB, O
	QuantityDonated int       `gorm:"not null" json:"quantity_donated"` // Dalam ml (cth: 350)

	// --- DATA MEDIS (SNAPSHOT) ---
	// Penting untuk riwayat kesehatan user (sesuai tampilan Frontend Anda)
	Hemoglobin    float64 `json:"hemoglobin"`     // cth: 14.2
	BloodPressure string  `json:"blood_pressure"` // cth: "120/80"
	
	// --- STATUS & CATATAN ---

	// Status: "Pending", "Approved", "Rejected"
	Status string `gorm:"default:'Pending';size:20" json:"status"`
	
	// Catatan Dokter: Alasan penolakan atau saran kesehatan
	Notes  string `gorm:"type:text" json:"notes"` 
}