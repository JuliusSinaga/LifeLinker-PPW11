package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"crypto/rand"
    "encoding/hex"
    "time"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/database"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/models"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/utils"
)

// Struct Input
type GoogleLoginRequest struct {
	IDToken string `json:"id_token"`
}

type LoginInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// ----------------------------------------------------
// FITUR 1: LOGIN DENGAN GOOGLE
// ----------------------------------------------------
func GoogleLogin(c *gin.Context) {
	var req GoogleLoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format request salah"})
		return
	}

	// 1. Verifikasi Access Token ke Google
	resp, err := http.Get("https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + req.IDToken)
	if err != nil || resp.StatusCode != http.StatusOK {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token Google tidak valid"})
		return
	}
	defer resp.Body.Close()

	// 2. Decode Response
	var googleData struct {
		Email string `json:"email"`
		Name  string `json:"name"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&googleData); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal memproses data Google"})
		return
	}

	// 3. Cek Database / Auto-Register
	var user models.User
	result := database.DB.Where("email = ?", googleData.Email).First(&user)

	if result.Error != nil {
		// User belum ada -> Buat Baru (Default Role: User)
		user = models.User{
			Nama:     googleData.Name,
			Email:    googleData.Email,
			Password: "",     
			Role:     "user", 
			Status:   "active", // User biasa via Google langsung aktif
		}
		if err := database.DB.Create(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal registrasi user baru"})
			return
		}
	}

	// 4. Response Sukses
	c.JSON(http.StatusOK, gin.H{
		"message": "Login Google berhasil",
		"token":   "DUMMY_JWT_TOKEN_12345", // Ganti dengan JWT asli nanti
		"user":    formatUserResponse(user),
	})
}

// ----------------------------------------------------
// FITUR 2: LOGIN MANUAL
// ----------------------------------------------------
func Login(c *gin.Context) {
	var input LoginInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email dan Password wajib diisi"})
		return
	}

	var user models.User
	// Cek Email
	if err := database.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email atau password salah"})
		return
	}

	// Cek Password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email atau password salah"})
		return
	}

	// Cek Status Akun (Penting untuk Dokter)
	if user.Role == "dokter" && user.Status == "pending" {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Akun Anda masih dalam proses verifikasi Admin. Mohon cek email Anda.",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Login berhasil",
		"token":   "DUMMY_JWT_TOKEN_MANUAL_54321",
		"user":    formatUserResponse(user),
	})
}

// ----------------------------------------------------
// FITUR 3: REGISTER MANUAL (POST /users)
// ----------------------------------------------------
func CreateUser(c *gin.Context) {
	var user models.User
	
	// ERROR PADA GAMBAR ANDA TERJADI DI SINI:
	// Jika Frontend kirim "weight": "55" (string), ShouldBindJSON akan gagal karena struct User minta int.
	// Solusinya: Pastikan frontend kirim angka (int).
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Default Role
	if user.Role == "" {
		user.Role = "user"
	}

	// Logic Status Akun
	if user.Role == "dokter" {
		user.Status = "pending" // Dokter harus diverifikasi
	} else {
		user.Status = "active"  // User biasa langsung aktif
	}

	// Hash Password
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	user.Password = string(hashedPassword)

	// Simpan Database
	if err := database.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Email mungkin sudah terdaftar"})
		return
	}

	// Kirim Email Notifikasi (Background Process)
	go func() {
		subject := "Selamat Datang di LifeLinker!"
		var body string

		if user.Role == "dokter" {
			subject = "Pendaftaran Diterima - Menunggu Verifikasi Admin"
			body = fmt.Sprintf(`
				<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
					<h2 style="color: #0284c7;">Halo Dr. %s,</h2>
					<p>Terima kasih telah mendaftar di <b>LifeLinker</b>.</p>
					<div style="background-color: #fef3c7; padding: 15px; border-left: 5px solid #d97706; margin: 20px 0;">
						<p style="margin: 0; font-weight: bold;">Status Akun: MENUNGGU VERIFIKASI (PENDING)</p>
					</div>
					<p>Tim Admin kami sedang memverifikasi Nomor STR: <b>%s</b>.</p>
					<p>Mohon menunggu 1x24 jam. Anda akan menerima email notifikasi saat akun Anda diaktifkan.</p>
				</div>
			`, user.Nama, user.NomorSTR)
		} else {
			subject = "Selamat Datang di LifeLinker"
			body = fmt.Sprintf(`
				<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
					<h2 style="color: #dc2626;">Halo %s,</h2>
					<p>Selamat bergabung menjadi pahlawan kemanusiaan di <b>LifeLinker</b>!</p>
					<p>Akun Anda telah aktif. Silakan login untuk mencari lokasi donor darah terdekat.</p>
				</div>
			`, user.Nama)
		}

		utils.SendEmail(user.Email, subject, body)
	}()

	c.JSON(http.StatusCreated, gin.H{
		"message": "Pendaftaran berhasil",
		"user":    formatUserResponse(user),
	})
}

// ----------------------------------------------------
// FITUR 4: VERIFIKASI DOKTER (ADMIN ONLY)
// ----------------------------------------------------
func VerifyDoctor(c *gin.Context) {
	id := c.Param("id")

	var user models.User
	if err := database.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User tidak ditemukan"})
		return
	}

	if user.Role != "dokter" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User bukan dokter"})
		return
	}

	// Update Status jadi Active
	user.Status = "active"
	if err := database.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal memverifikasi dokter"})
		return
	}

	// Kirim Email Sukses
	go func() {
		subject := "SELAMAT! Akun Dokter LifeLinker Anda Telah Aktif"
		body := fmt.Sprintf(`
			<div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
				<h2 style="color: #16a34a;">Verifikasi Berhasil</h2>
				<p>Halo <b>Dr. %s</b>,</p>
				<p>Selamat! Data profesional dan Nomor STR Anda telah berhasil diverifikasi oleh Admin.</p>
				<p>Status akun Anda sekarang: <b style="color: green;">AKTIF</b>.</p>
				<p>Silakan login untuk mulai mengelola stok darah dan event.</p>
				<br>
				<a href="http://localhost:3000/login-dokter" 
				   style="background-color: #dc2626; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
				   Login Sekarang
				</a>
			</div>
		`, user.Nama)

		utils.SendEmail(user.Email, subject, body)
	}()

	c.JSON(http.StatusOK, gin.H{
		"message": "Dokter berhasil diverifikasi",
		"data":    formatUserResponse(user),
	})
}

// ----------------------------------------------------
// FITUR 5: GET ALL USERS
// ----------------------------------------------------
func GetUsers(c *gin.Context) {
	var users []models.User
	
	// Ambil semua data user
	if err := database.DB.Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil data user"})
		return
	}

	// Format data agar JSON key-nya konsisten (id, name, email, dll)
	var formattedUsers []map[string]interface{}
	for _, user := range users {
		formattedUsers = append(formattedUsers, formatUserResponse(user))
	}

	c.JSON(http.StatusOK, gin.H{"data": formattedUsers})
}

// Di bagian paling bawah file user_controller.go
func formatUserResponse(u models.User) map[string]interface{} {
	return map[string]interface{}{
		"id":             u.ID,
		"name":           u.Nama,
		"email":          u.Email,
		"role":           u.Role,
		"status":         u.Status,
		"phone":          u.NoHp,
		"city":           u.Kota,
		// Tambahkan ini untuk Manajemen User:
		"blood_type":     u.GolDarah,
		"rhesus":         u.Rhesus,
		// Field dokter (opsional jika user biasa)
		"str_number":     u.NomorSTR,
		"specialization": u.Spesialisasi,
		"hospital":       u.Instansi,
	}
}

// --- FITUR: LUPA PASSWORD (Minta Link) ---
func ForgotPassword(c *gin.Context) {
    var input struct {
        Email string `json:"email" binding:"required"`
    }
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Email wajib diisi"})
        return
    }

    var user models.User
    if err := database.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
        // Demi keamanan, biasanya kita tetap bilang "Email terkirim jika terdaftar"
        // Tapi untuk development, kita beri tahu errornya
        c.JSON(http.StatusNotFound, gin.H{"error": "Email tidak ditemukan"})
        return
    }

    // 1. Generate Token Random
    bytes := make([]byte, 16)
    rand.Read(bytes)
    token := hex.EncodeToString(bytes)

    // 2. Simpan Token & Expiry (misal 15 menit) ke DB
    user.ResetToken = token
    user.ResetTokenExpiry = time.Now().Add(15 * time.Minute)
    database.DB.Save(&user)

    // 3. Kirim Email
    // Link mengarah ke Frontend Page Khusus (misal: /reset-password)
    resetLink := fmt.Sprintf("http://localhost:3000/reset-password?token=%s", token)
    
    subject := "Reset Password - LifeLinker"
    body := fmt.Sprintf(`
        <h3>Halo %s,</h3>
        <p>Anda meminta untuk mereset password akun LifeLinker Anda.</p>
        <p>Silakan klik link di bawah ini untuk membuat password baru:</p>
        <a href="%s" style="background-color: #dc2626; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>Link ini hanya berlaku selama 15 menit.</p>
        <p>Jika Anda tidak merasa meminta ini, abaikan saja email ini.</p>
    `, user.Nama, resetLink)

    go utils.SendEmail(user.Email, subject, body)

    c.JSON(http.StatusOK, gin.H{"message": "Link reset password telah dikirim ke email Anda"})
}

// --- FITUR: RESET PASSWORD (Eksekusi Ganti Password) ---
func ResetPassword(c *gin.Context) {
    var input struct {
        Token       string `json:"token" binding:"required"`
        NewPassword string `json:"new_password" binding:"required"`
    }
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Data tidak lengkap"})
        return
    }

    var user models.User
    // Cari user berdasarkan Token DAN pastikan Token belum kadaluarsa
    if err := database.DB.Where("reset_token = ? AND reset_token_expiry > ?", input.Token, time.Now()).First(&user).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Token tidak valid atau sudah kadaluwarsa"})
        return
    }

    // Hash Password Baru
    hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(input.NewPassword), bcrypt.DefaultCost)
    
    // Update Data User
    user.Password = string(hashedPassword)
    user.ResetToken = "" // Hapus token agar tidak bisa dipakai lagi
    // user.ResetTokenExpiry tidak perlu di-null-kan, cukup tokennya string kosong
    
    database.DB.Save(&user)

    c.JSON(http.StatusOK, gin.H{"message": "Password berhasil diubah. Silakan login kembali."})
}

// Endpoint: DELETE /users/:id
func DeleteUser(c *gin.Context) {
	id := c.Param("id")

	// Cek apakah user ada
	var user models.User
	if err := database.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User tidak ditemukan"})
		return
	}

	// Hapus User (Soft Delete karena menggunakan gorm.Model)
	if err := database.DB.Delete(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menghapus user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User berhasil dihapus"})
}