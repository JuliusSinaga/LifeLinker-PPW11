package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt" // Import library untuk hashing

	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/database"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/models"
)

// Ambil semua data user
func GetUsers(c *gin.Context) {
	var users []models.User

	// Find akan mengambil semua data
	if err := database.DB.Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"users": users,
	})
}

// Tambah data user baru (Register)
func CreateUser(c *gin.Context) {
	var user models.User

	// Bind JSON ke struct User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// HASHING PASSWORD (LANGKAH WAJIB) 🔒
	// Mengubah "rahasia123" menjadi "$2a$10$X8..."
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengamankan password"})
		return
	}
	// Timpa password asli dengan password yang sudah di-hash
	user.Password = string(hashedPassword)

	// Simpan ke Database
	if err := database.DB.Create(&user).Error; err != nil {
		// Cek apakah error karena email duplikat (Postgres error handling sederhana)
		// Note: Gorm biasanya mengembalikan error detail, tapi kita kasih 500 dulu biar aman
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat user (mungkin email sudah terdaftar)"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "User berhasil ditambahkan",
		"user":    user,
	})
}