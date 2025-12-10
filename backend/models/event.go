package models

import (
	"gorm.io/gorm"
	"time"
)

type Event struct {
	gorm.Model
	// Tambahkan 'not null' untuk field wajib
	NamaEvent      string    `gorm:"not null" json:"nama_event"`
	TanggalEvent   time.Time `gorm:"not null" json:"tanggal_event"`
	
	// Gunakan type:text agar bisa menampung deskripsi panjang
	DeskripsiEvent string    `gorm:"type:text" json:"deskripsi_event"` 
	GambarEvent    string    `json:"gambar_event"`

	// --- FITUR TAMBAHAN (Sangat Disarankan) ---
	
	// 1. Status Event: "Open", "Closed", "Completed", "Cancelled"
	// Defaultnya "Open" saat dibuat
	Status string `gorm:"default:'Open';size:20" json:"status"`

	// 2. Kuota Peserta: Untuk membatasi jumlah pendaftar
	// Default 0 bisa berarti unlimited, atau set default 50/100
	Kuota int `gorm:"default:100" json:"kuota"` 

	// --- RELASI ---

	// LokasiID Wajib ada (not null)
	LokasiID uint   `gorm:"not null" json:"lokasi_id"`
	Lokasi   Lokasi `gorm:"foreignKey:LokasiID" json:"lokasi"`

	// OrganizerID Wajib ada (not null)
	OrganizerID uint `gorm:"not null" json:"organizer_id"`
	Organizer   User `gorm:"foreignKey:OrganizerID" json:"organizer"`

	// Daftar Peserta
	// omitempty agar JSON response tidak penuh jika peserta kosong
	Participants []User `gorm:"many2many:event_participants;" json:"participants,omitempty"`
}