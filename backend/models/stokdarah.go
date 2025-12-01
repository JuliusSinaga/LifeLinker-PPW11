package models

import (
	"gorm.io/gorm"
	"time"
)

type StokDarah struct {
	gorm.Model
	GolDarah       string    `json:"gol_darah"`    // A, B, AB, O
	Rhesus         string    `json:"rhesus"`       // +, -
	Ketersediaan   string    `json:"ketersediaan"` // Aman, Kurang, Kritis
	JumlahKantong  int       `json:"jumlah_kantong"`
	WaktuPembaruan time.Time `json:"waktu_pembaruan"`

	// Foreign Key: Admin yang melakukan update terakhir
	AdminID uint `json:"admin_id"`
	Admin   User `gorm:"foreignKey:AdminID" json:"admin"`
}