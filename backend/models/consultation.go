package models

import (
	"gorm.io/gorm"
	"time"
)

type Consultation struct {
	gorm.Model
	
	// --- RELASI ---

	// Pasien (User) - Wajib ada
	UserID uint `gorm:"not null" json:"user_id"`
	User   User `gorm:"foreignKey:UserID" json:"user"`

	// Dokter - Wajib ada
	DoctorID uint `gorm:"not null" json:"doctor_id"`
	Doctor   User `gorm:"foreignKey:DoctorID" json:"doctor"`

	// --- DATA KONSULTASI ---

	ConsultationDate time.Time `gorm:"not null" json:"consultation_date"`
	
	// Keluhan Pasien: Gunakan tipe TEXT agar bisa panjang
	Issue string `gorm:"type:text;not null" json:"issue"` 
	
	// Saran Dokter: Gunakan tipe TEXT. 
	// Tidak pakai 'not null' karena saat baru dibuat (Scheduled), rekomendasi masih kosong.
	Recommendation string `gorm:"type:text" json:"recommendation"` 
	
	// Status: "Scheduled", "In Progress", "Completed", "Cancelled"
	// Default: "Scheduled"
	Status string `gorm:"default:'Scheduled';size:20" json:"status"`
}