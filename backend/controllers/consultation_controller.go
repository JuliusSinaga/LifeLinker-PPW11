package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/database"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/models"
)

// GET /consultations - Lihat daftar konsultasi
func GetConsultations(c *gin.Context) {
	var consultations []models.Consultation

	if err := database.DB.Preload("User").Preload("Doctor").Find(&consultations).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": consultations})
}

// POST /consultations - Pasien mengajukan konsultasi
func CreateConsultation(c *gin.Context) {
	var input models.Consultation
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Set default status jika kosong
	if input.Status == "" {
		input.Status = "Scheduled"
	}

	if err := database.DB.Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat jadwal konsultasi"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Konsultasi dijadwalkan", "data": input})
}

// PUT /consultations/:id - Dokter menjawab/update status
func UpdateConsultation(c *gin.Context) {
	id := c.Param("id")
	var consultation models.Consultation

	// Cari dulu datanya
	if err := database.DB.First(&consultation, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Data konsultasi tidak ditemukan"})
		return
	}

	// Bind data update (misal: isi Recommendation atau ubah Status)
	var input models.Consultation
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update field tertentu saja
	database.DB.Model(&consultation).Updates(models.Consultation{
		Recommendation: input.Recommendation,
		Status:         input.Status,
	})

	c.JSON(http.StatusOK, gin.H{"message": "Konsultasi diperbarui", "data": consultation})
}