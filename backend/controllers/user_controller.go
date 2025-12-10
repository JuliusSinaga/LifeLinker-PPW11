package controllers

import (
	"context"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/api/idtoken" // Library Google untuk verifikasi

	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/database"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/models"
)

// Struktur request khusus untuk login Google
type GoogleLoginRequest struct {
	IDToken string `json:"id_token"`
}

// ----------------------------------------------------
// FITUR 1: LOGIN DENGAN GOOGLE (Auto-Register)
// ----------------------------------------------------
func GoogleLogin(c *gin.Context) {
	var req GoogleLoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format request salah", "detail": err.Error()})
		return
	}

	// 1. Verifikasi Token ID ke Server Google
	// Pastikan GOOGLE_CLIENT_ID ada di file .env Anda
	clientID := os.Getenv("GOOGLE_CLIENT_ID")
	payload, err := idtoken.Validate(context.Background(), req.IDToken, clientID)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token Google tidak valid", "detail": err.Error()})
		return
	}

	// 2. Ambil data user dari payload Google
	email := payload.Claims["email"].(string)
	name := payload.Claims["name"].(string)
	// picture := payload.Claims["picture"].(string) // Opsional: Foto profil

	// 3. Cek Database: Apakah user sudah ada?
	var user models.User
	result := database.DB.Where("email = ?", email).First(&user)

	if result.Error != nil {
		// KASUS: User belum ada -> BUAT AKUN BARU (Auto-Register)
		user = models.User{
			Nama:     name,
			Email:    email,
			Password: "",     // Password kosong karena via Google
			Role:     "user", // Default role
			// NoHp kosong, nanti user diminta melengkapi di profil
		}

		if err := database.DB.Create(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mendaftarkan user baru"})
			return
		}
	}

	// 4. Login Berhasil -> Kirim Token & Data User
	// Catatan: "token" di bawah ini sebaiknya diganti dengan logic JWT asli Anda
	c.JSON(http.StatusOK, gin.H{
		"message": "Login Google berhasil",
		"token":   "CONTOH_TOKEN_JWT_DARI_BACKEND", 
		"user": gin.H{
			"id":       user.ID,
			"nama":     user.Nama,
			"email":    user.Email,
			"role":     user.Role,
			"no_hp":    user.NoHp,    // Sesuai struct models
			"gol_darah": user.GolDarah,
			// Mapping khusus agar frontend (user.phone) bisa membacanya jika perlu
			"phone":    user.NoHp, 
		},
	})
}

// ----------------------------------------------------
// FITUR 2: AMBIL DATA USER (GET)
// ----------------------------------------------------
func GetUsers(c *gin.Context) {
	var users []models.User

	if err := database.DB.Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"users": users,
	})
}

// ----------------------------------------------------
// FITUR 3: REGISTER MANUAL (POST)
// ----------------------------------------------------
func CreateUser(c *gin.Context) {
	var user models.User

	// Bind JSON
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Hashing Password (Wajib)
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengamankan password"})
		return
	}
	user.Password = string(hashedPassword)

	// Simpan ke Database
	if err := database.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat user (email mungkin sudah terdaftar)"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "User berhasil ditambahkan",
		"user":    user,
	})
}