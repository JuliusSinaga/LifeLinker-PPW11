package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/database"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/models"
)

// GET /consultations
// Bisa filter: ?user_id=1 (untuk Pasien) atau ?doctor_id=2 (untuk Dokter)
func GetConsultations(c *gin.Context) {
	userID := c.Query("user_id")
	doctorID := c.Query("doctor_id")

	var consultations []models.Consultation

	// Siapkan query dengan Preload data User dan Dokter
	query := database.DB.Preload("User").Preload("Doctor")

	// Filter logika
	if userID != "" {
		query = query.Where("user_id = ?", userID)
	}
	if doctorID != "" {
		query = query.Where("doctor_id = ?", doctorID)
	}

	// Eksekusi query (Urutkan dari yang terbaru)
	if err := query.Order("created_at desc").Find(&consultations).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": consultations})
}

// GET /consultations/:id - Lihat detail satu konsultasi
func GetConsultationByID(c *gin.Context) {
	id := c.Param("id")
	var consultation models.Consultation

	// Preload User & Doctor agar detail lengkap
	if err := database.DB.Preload("User").Preload("Doctor").First(&consultation, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Data konsultasi tidak ditemukan"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": consultation})
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
		input.Status = "Scheduled" // atau "Pending"
	}

	if err := database.DB.Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat jadwal konsultasi"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Konsultasi berhasil dijadwalkan", "data": input})
}

// PUT /consultations/:id - Dokter menjawab/update status
func UpdateConsultation(c *gin.Context) {
	id := c.Param("id")
	var consultation models.Consultation

	// 1. Cari dulu datanya
	if err := database.DB.First(&consultation, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Data konsultasi tidak ditemukan"})
		return
	}

	// 2. Bind data update
	var input models.Consultation
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 3. Update field tertentu saja (Rekomendasi & Status)
	updateData := models.Consultation{
		Recommendation: input.Recommendation,
		Status:         input.Status,
	}

	if err := database.DB.Model(&consultation).Updates(updateData).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal memperbarui konsultasi"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Konsultasi diperbarui", "data": consultation})
}