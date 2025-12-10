package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	// Field Umum (User & Dokter)
	Nama         string `json:"name"`        // Frontend: "name" atau "fullName" (disarankan samakan jadi "name")
	Email        string `gorm:"unique" json:"email"`
	Password     string `json:"password"`    // Hapus tag "-" agar bisa dibinding saat register (tapi hati-hati saat return JSON)
	Role         string `json:"role"`        // "user", "dokter", "admin"
	NoHp         string `json:"phone"`       // Frontend: "phone"
	Kota         string `json:"city"`        // Frontend: "city"
	TanggalLahir string `json:"birth_date"`  // Frontend: "birth_date" (User) / "birthDate" (Dokter) -> Disarankan pakai snake_case
	JenisKelamin string `json:"gender"`      // Frontend: "gender"

	// Field Khusus User (Pendonor)
	GolDarah   string `json:"blood_type"` // Frontend: "blood_type"
	Rhesus     string `json:"rhesus"`
	BeratBadan int    `json:"weight"`     // Frontend: "weight"

	// Field Khusus Dokter
	NomorSTR     string `json:"str_number"`     // Frontend: "strNumber" -> Ubah jadi snake_case di FE atau sesuaikan tag ini
	Spesialisasi string `json:"specialization"` // Frontend: "specialization"
	Instansi     string `json:"hospital"`       // Frontend: "hospital"

	// --- RELASI ---
	// User bisa memiliki banyak riwayat donor
	Donations []DonationHistory `gorm:"foreignKey:UserID" json:"donations,omitempty"`

	// User bisa mengikuti banyak event (Many-to-Many)
	EventsParticipated []Event `gorm:"many2many:event_participants;" json:"events_participated,omitempty"`
}