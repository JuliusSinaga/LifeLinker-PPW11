package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Nama     string `json:"nama"`
	Email    string `gorm:"unique" json:"email"`
	Password string `json:"-"` // Password tidak akan tampil di JSON return
	Role     string `json:"role"` // Values: "admin", "doctor", "user"
	NoHp     string `json:"no_hp"`
	Alamat   string `json:"alamat"`
	GolDarah string `json:"gol_darah"`
	Rhesus   string `json:"rhesus"`
	
	// User bisa memiliki banyak riwayat donor
	Donations []DonationHistory `gorm:"foreignKey:UserID" json:"donations,omitempty"`
	
	// User bisa mengikuti banyak event (Many-to-Many)
	EventsParticipated []Event `gorm:"many2many:event_participants;" json:"events_participated,omitempty"`
}