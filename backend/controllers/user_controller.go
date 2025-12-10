package controllers

import (
	"encoding/json"
	"net/http"
	"fmt"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	// "google.golang.org/api/idtoken" // Tidak dipakai lagi untuk Access Token
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/database"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/models"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/utils"
)

// Struct Input
type GoogleLoginRequest struct {
	IDToken string `json:"id_token"` // Frontend mengirim Access Token di field ini
}

type LoginInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// ----------------------------------------------------
// FITUR 1: LOGIN DENGAN GOOGLE (Access Token Validation)
// ----------------------------------------------------
func GoogleLogin(c *gin.Context) {
	var req GoogleLoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format request salah"})
		return
	}

	// 1. Verifikasi Access Token ke Google UserInfo API
	// Karena frontend menggunakan useGoogleLogin (Access Token flow)
	resp, err := http.Get("https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + req.IDToken)
	if err != nil || resp.StatusCode != http.StatusOK {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token Google tidak valid atau kadaluwarsa"})
		return
	}
	defer resp.Body.Close()

	// 2. Decode Response dari Google
	var googleData struct {
		Email string `json:"email"`
		Name  string `json:"name"`
		// Picture string `json:"picture"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&googleData); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal memproses data Google"})
		return
	}

	// 3. Cek Database / Auto-Register
	var user models.User
	result := database.DB.Where("email = ?", googleData.Email).First(&user)

	if result.Error != nil {
		// User belum ada -> Buat Baru (Role default: user)
		user = models.User{
			Nama:     googleData.Name,
			Email:    googleData.Email,
			Password: "",     // Password kosong
			Role:     "user", // Default
		}
		if err := database.DB.Create(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal registrasi user baru"})
			return
		}
	}

	// 4. Kirim Response Sukses
	// Token di sini idealnya adalah JWT buatan backend Anda sendiri
	c.JSON(http.StatusOK, gin.H{
		"message": "Login Google berhasil",
		"token":   "DUMMY_JWT_TOKEN_12345", // Ganti dengan logic JWT nanti
		"user":    formatUserResponse(user),
	})
}

// ----------------------------------------------------
// FITUR 2: LOGIN MANUAL (Email & Password)
// ----------------------------------------------------
func Login(c *gin.Context) {
	var input LoginInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email dan Password wajib diisi"})
		return
	}

	var user models.User
	// 1. Cek Email
	if err := database.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email atau password salah"})
		return
	}

	// 2. Cek Password (Hash)
	// Jika user login google (password kosong) mencoba login manual, ini akan gagal (aman)
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email atau password salah"})
		return
	}

	// 3. Login Sukses
	c.JSON(http.StatusOK, gin.H{
		"message": "Login berhasil",
		"token":   "DUMMY_JWT_TOKEN_MANUAL_54321",
		"user":    formatUserResponse(user),
	})
}

// ----------------------------------------------------
// FITUR 3: REGISTER MANUAL (POST)
// ----------------------------------------------------
// POST /users (Register Manual)
func CreateUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Default Role jika kosong
	if user.Role == "" {
		user.Role = "user"
	}

	// Hash Password
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	user.Password = string(hashedPassword)

	// Simpan ke Database
	if err := database.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Email mungkin sudah terdaftar"})
		return
	}

	// --- KIRIM EMAIL NOTIFIKASI (GUNAKAN GOROUTINE) ---
	// Goroutine (go func) digunakan agar user tidak perlu menunggu email terkirim untuk dapat response sukses
	go func() {
		subject := "Selamat Datang di LifeLinker!"
		var body string

		if user.Role == "dokter" {
			// Template Email untuk Dokter
			subject = "Konfirmasi Pendaftaran Dokter - LifeLinker"
			body = fmt.Sprintf(`
				<html>
				<body>
					<h2>Halo Dr. %s,</h2>
					<p>Terima kasih telah mendaftar sebagai Dokter di <b>LifeLinker</b>.</p>
					<p>Status akun Anda saat ini: <b>Menunggu Verifikasi</b>.</p>
					<p>Tim Admin kami sedang memverifikasi Nomor STR (%s) dan data profesional Anda.</p>
					<p>Anda akan menerima email pemberitahuan selanjutnya jika akun Anda telah aktif.</p>
					<br>
					<p>Salam hangat,<br>Tim LifeLinker</p>
				</body>
				</html>
			`, user.Nama, user.NomorSTR)
		} else {
			// Template Email untuk User Biasa
			body = fmt.Sprintf(`
				<html>
				<body>
					<h2>Halo %s,</h2>
					<p>Selamat bergabung di komunitas <b>LifeLinker</b>!</p>
					<p>Akun Anda telah aktif. Sekarang Anda dapat mencari lokasi donor darah, melihat stok darah, dan mencatat riwayat kebaikan Anda.</p>
					<br>
					<p>Salam hangat,<br>Tim LifeLinker</p>
				</body>
				</html>
			`, user.Nama)
		}

		// Panggil Helper Utils
		utils.SendEmail(user.Email, subject, body)
	}()
	// --------------------------------------------------

	c.JSON(http.StatusCreated, gin.H{
		"message": "Pendaftaran berhasil",
		"user":    formatUserResponse(user),
	})
}

// ----------------------------------------------------
// FITUR 4: GET ALL USERS (Untuk testing)
// ----------------------------------------------------
func GetUsers(c *gin.Context) {
	var users []models.User
	database.DB.Find(&users)
	c.JSON(http.StatusOK, gin.H{"data": users})
}

// --- HELPER: Format Response User agar seragam ---
func formatUserResponse(u models.User) map[string]interface{} {
	return map[string]interface{}{
		"id":        u.ID,
		"name":      u.Nama,
		"email":     u.Email,
		"role":      u.Role,
		"phone":     u.NoHp,
		"city":      u.Kota,
		"photo_url": "", // Bisa diisi dari DB jika ada
	}
}