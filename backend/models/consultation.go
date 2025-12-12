package models

import "gorm.io/gorm"

type Consultation struct {
	gorm.Model
	
	// --- Data Utama Konsultasi ---
	Topic            string `json:"topic"`
	ConsultationDate string `json:"consultation_date"` // Format: YYYY-MM-DD
	ConsultationTime string `json:"consultation_time"` // Format: HH:MM
	Status           string `json:"status" gorm:"default:'Scheduled'"` // Scheduled, Active, Completed, Cancelled
	
	// --- Data Tambahan (Opsional) ---
	MeetingLink    string `json:"meeting_link"`    // Link Zoom/GMeet
	Recommendation string `json:"recommendation"`  // Kesimpulan/Saran Dokter

	// --- Relasi ke Pasien (User) ---
	UserID uint `json:"user_id"`
	User   User `gorm:"foreignKey:UserID" json:"user,omitempty"`

	// --- Relasi ke Dokter (User) ---
	DoctorID uint `json:"doctor_id"`
	Doctor   User `gorm:"foreignKey:DoctorID" json:"doctor,omitempty"`

	// --- Relasi Chat (One-to-Many) ---
	// Satu konsultasi memiliki banyak pesan chat
	Messages []Message `gorm:"foreignKey:ConsultationID" json:"messages,omitempty"`
}