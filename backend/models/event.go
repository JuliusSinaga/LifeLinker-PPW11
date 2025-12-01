package models

import (
	"gorm.io/gorm"
	"time"
)

type Event struct {
	gorm.Model
	NamaEvent      string    `json:"nama_event"`
	TanggalEvent   time.Time `json:"tanggal_event"`
	DeskripsiEvent string    `json:"deskripsi_event"`
	GambarEvent    string    `json:"gambar_event"`

	// Foreign Key: Lokasi
	LokasiID uint   `json:"lokasi_id"`
	Lokasi   Lokasi `gorm:"foreignKey:LokasiID" json:"lokasi"`

	// Foreign Key: Admin yang membuat event (Organizer)
	OrganizerID uint `json:"organizer_id"`
	Organizer   User `gorm:"foreignKey:OrganizerID" json:"organizer"`

	// Many-to-Many: Daftar User yang hadir
	// GORM akan otomatis membuat tabel perantara bernama 'event_participants'
	Participants []User `gorm:"many2many:event_participants;" json:"participants"`
}