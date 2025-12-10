package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/database"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/models"
)

// GET /donations
// Bisa ambil semua, atau filter by user: /donations?user_id=1
func GetDonations(c *gin.Context) {
	// 1. Ambil parameter user_id dari URL (jika ada)
	userID := c.Query("user_id")
	
	var donations []models.DonationHistory

	// 2. Siapkan query dasar dengan Preload
	query := database.DB.Preload("User").Preload("Doctor")

	// 3. Jika ada user_id, tambahkan filter WHERE
	if userID != "" {
		query = query.Where("user_id = ?", userID)
	}

	// 4. Eksekusi Query
	// Order by id desc agar yang terbaru muncul di atas
	if err := query.Order("donation_date desc").Find(&donations).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": donations})
}

// GET /donations/:id - Ambil detail satu donasi
func GetDonationByID(c *gin.Context) {
	id := c.Param("id")
	var donation models.DonationHistory

	if err := database.DB.Preload("User").Preload("Doctor").First(&donation, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Data donasi tidak ditemukan"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": donation})
}

// POST /donations - Buat catatan donor baru (Oleh Dokter)
func CreateDonation(c *gin.Context) {
	var input models.DonationHistory
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Set default status jika kosong
	if input.Status == "" {
		input.Status = "Pending"
	}

	if err := database.DB.Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mencatat donasi"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Riwayat donor berhasil disimpan", "data": input})
}

// PUT /donations/:id - Update Status/Data Donasi (Oleh Dokter/Admin)
func UpdateDonation(c *gin.Context) {
	id := c.Param("id")
	var donation models.DonationHistory

	// 1. Cari data lama
	if err := database.DB.First(&donation, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Data donasi tidak ditemukan"})
		return
	}

	// 2. Bind data baru
	var input models.DonationHistory
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 3. Update field yang diizinkan
	if err := database.DB.Model(&donation).Updates(input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal update donasi"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Data donasi berhasil diperbarui", "data": donation})
}