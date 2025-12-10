package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	// --- Field Umum (User, Dokter, Admin) ---
	Nama         string `json:"name"`
	Email        string `gorm:"unique" json:"email"`
	Password     string `json:"password"` // Note: Controller harus hati-hati agar tidak mengembalikan ini ke frontend
	Role         string `json:"role"`     // "user", "dokter", "admin"
	NoHp         string `json:"phone"`
	Kota         string `json:"city"`
	TanggalLahir string `json:"birth_date"` // Format: YYYY-MM-DD
	JenisKelamin string `json:"gender"`

	// --- Field Khusus User (Pendonor) ---
	GolDarah   string `json:"blood_type"`
	Rhesus     string `json:"rhesus"`
	BeratBadan int    `json:"weight"`

	// --- Field Khusus Dokter ---
	NomorSTR     string `json:"str_number"`
	Spesialisasi string `json:"specialization"`
	Instansi     string `json:"hospital"`

	// ================= RELASI (UPDATED) =================

	// 1. Relasi sebagai PENDONOR (Pasien)
	// User melakukan donasi
	Donations []DonationHistory `gorm:"foreignKey:UserID" json:"donations,omitempty"`
	// User mengajukan konsultasi
	ConsultationsAsPatient []Consultation `gorm:"foreignKey:UserID" json:"consultations_as_patient,omitempty"`
	// User mengikuti event
	EventsParticipated []Event `gorm:"many2many:event_participants;" json:"events_participated,omitempty"`

	// 2. Relasi sebagai DOKTER / ADMIN
	// Dokter menangani/memeriksa donasi
	DonationsHandled []DonationHistory `gorm:"foreignKey:DoctorID" json:"donations_handled,omitempty"`
	// Dokter menangani konsultasi
	ConsultationsAsDoctor []Consultation `gorm:"foreignKey:DoctorID" json:"consultations_as_doctor,omitempty"`
	// Admin/Organizer membuat event
	EventsOrganized []Event `gorm:"foreignKey:OrganizerID" json:"events_organized,omitempty"`
	// Admin mengupdate stok darah
	StockUpdates []StokDarah `gorm:"foreignKey:AdminID" json:"stock_updates,omitempty"`
}