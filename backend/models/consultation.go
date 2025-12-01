package models

import (
	"gorm.io/gorm"
	"time"
)

type Consultation struct {
	gorm.Model
	// Foreign Key: Pasien
	UserID uint `json:"user_id"`
	User   User `gorm:"foreignKey:UserID" json:"user"`

	// Foreign Key: Dokter
	DoctorID uint `json:"doctor_id"`
	Doctor   User `gorm:"foreignKey:DoctorID" json:"doctor"`

	ConsultationDate time.Time `json:"consultation_date"`
	Issue            string    `json:"issue"`          // Keluhan pasien
	Recommendation   string    `json:"recommendation"` // Saran dokter
	Status           string    `json:"status"`         // Scheduled, Completed, Cancelled
}