package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/database"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/models"
)

// GET /lokasi - Ambil semua lokasi
func GetLokasi(c *gin.Context) {
	var lokasi []models.Lokasi
	if err := database.DB.Find(&lokasi).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": lokasi})
}

// POST /lokasi - Tambah lokasi baru
func CreateLokasi(c *gin.Context) {
	var input models.Lokasi
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menambah lokasi"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Lokasi berhasil ditambahkan", "data": input})
}