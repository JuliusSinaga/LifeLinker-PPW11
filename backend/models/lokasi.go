package models

import "gorm.io/gorm"

type Lokasi struct {
	gorm.Model
	NamaLokasi           string `json:"nama_lokasi"`
	AlamatLokasi         string `json:"alamat_lokasi"`
	KontakLokasi         string `json:"kontak_lokasi"`
	JamOperasionalLokasi string `json:"jam_operasional_lokasi"`
	GambarLokasi         string `json:"gambar_lokasi"`
}