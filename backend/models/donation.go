package models

import (
	"gorm.io/gorm"
	"time"
)

type DonationHistory struct {
	gorm.Model
	// Foreign Key: User yang mendonor
	UserID uint `json:"user_id"`
	User   User `gorm:"foreignKey:UserID" json:"user"`

	// Foreign Key: Dokter yang menangani (User dengan role doctor)
	DoctorID uint `json:"doctor_id"`
	Doctor   User `gorm:"foreignKey:DoctorID" json:"doctor"`

	DonationDate    time.Time `json:"donation_date"`
	BloodType       string    `json:"blood_type"`       // Copy dari user saat donor (untuk history)
	QuantityDonated int       `json:"quantity_donated"` // ml
	Status          string    `json:"status"`           // Pending, Approved, Rejected
}