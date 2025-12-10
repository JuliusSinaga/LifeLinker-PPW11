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

// GET /stok-darah/:id - Lihat detail satu stok (DITAMBAHKAN)
func GetStokDarahByID(c *gin.Context) {
	id := c.Param("id")
	var stok models.StokDarah

	// Cari data berdasarkan ID
	if err := database.DB.Preload("Admin").First(&stok, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Data stok darah tidak ditemukan"})
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

	// Cek apakah data stok untuk Golongan & Rhesus ini sudah ada?
	var existingStok models.StokDarah
	if err := database.DB.Where("gol_darah = ? AND rhesus = ?", input.GolDarah, input.Rhesus).First(&existingStok).Error; err == nil {
		// KASUS UPDATE: Jika sudah ada, update jumlah & ketersediaannya
		existingStok.JumlahKantong = input.JumlahKantong
		existingStok.Ketersediaan = input.Ketersediaan
		existingStok.WaktuPembaruan = input.WaktuPembaruan
		existingStok.AdminID = input.AdminID // Update siapa yang mengubah

		if err := database.DB.Save(&existingStok).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengupdate stok darah"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Stok darah berhasil diperbarui", "data": existingStok})
	} else {
		// KASUS BARU: Jika belum ada, buat baru
		if err := database.DB.Create(&input).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat stok darah"})
			return
		}
		c.JSON(http.StatusCreated, gin.H{"message": "Stok darah baru berhasil ditambahkan", "data": input})
	}
}