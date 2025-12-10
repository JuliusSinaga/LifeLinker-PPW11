package models

import "gorm.io/gorm"

type Lokasi struct {
	gorm.Model
	// Tambahkan `not null` agar data tidak kosong di database
	NamaLokasi           string `gorm:"not null" json:"nama_lokasi"`
	AlamatLokasi         string `gorm:"not null" json:"alamat_lokasi"`
	
	KontakLokasi         string `json:"kontak_lokasi"`
	JamOperasionalLokasi string `json:"jam_operasional_lokasi"`
	GambarLokasi         string `json:"gambar_lokasi"`

	// ================= RELASI (UPDATED) =================
	
	// 1. Relasi ke EVENT (One-to-Many)
	// Satu Lokasi bisa menyelenggarakan banyak Event
	// Ini memungkinkan kita query: "Tampilkan semua event di RS Adam Malik"
	Events []Event `gorm:"foreignKey:LokasiID" json:"events,omitempty"`

	// 2. (Opsional Masa Depan) Relasi ke STOK DARAH
	// Jika nanti stok darah dibuat spesifik per RS, aktifkan ini:
	// StokDarah []StokDarah `gorm:"foreignKey:LokasiID" json:"stok_darah,omitempty"`
}