package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/database"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/models"
)

// GET /stok-darah - Lihat semua stok
func GetStokDarah(c *gin.Context) {
	var stok []models.StokDarah

	// Preload Admin agar tahu siapa yang terakhir update
	if err := database.DB.Preload("Admin").Find(&stok).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": stok})
}

// POST /stok-darah - Tambah/Update stok (Admin)
func UpdateStokDarah(c *gin.Context) {
	var input models.StokDarah
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Logic: Simpan data stok baru
	if err := database.DB.Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal update stok darah"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Stok darah diperbarui", "data": input})
}