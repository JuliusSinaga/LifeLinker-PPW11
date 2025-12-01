package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/database"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/models"
)

// GET /donations - Lihat riwayat donor
func GetDonations(c *gin.Context) {
	var donations []models.DonationHistory

	// Preload User (Pendonor) dan Doctor (Pemeriksa)
	if err := database.DB.Preload("User").Preload("Doctor").Find(&donations).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": donations})
}

// POST /donations - Buat catatan donor baru
func CreateDonation(c *gin.Context) {
	var input models.DonationHistory
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mencatat donasi"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Riwayat donor berhasil disimpan", "data": input})
}