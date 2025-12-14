package controllers

import (
	"net/http"

	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/database"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// GET /consultations
// Mengambil daftar konsultasi beserta history chat-nya
func GetConsultations(c *gin.Context) {
	// Ambil userID dari context (setelah login middleware)
	// Jika belum ada middleware, gunakan query param untuk testing sementara
	var userIDFromContext uint
	if v, exists := c.Get("userID"); exists {
		userIDFromContext = v.(uint)
	}

	// Filter opsional via Query Param (untuk admin/dokter filtering user tertentu)
	queryUserID := c.Query("user_id")
	doctorID := c.Query("doctor_id")

	var consultations []models.Consultation

	// 1. Siapkan Query
	// Penting: Preload "Messages" dengan urutan 'created_at asc' agar chat urut kronologis
	query := database.DB.
		Preload("User").
		Preload("Doctor").
		Preload("Messages", func(db *gorm.DB) *gorm.DB {
			return db.Order("created_at asc")
		})

	// 2. Terapkan Filter
	// Prioritaskan ID dari token login jika ada (untuk keamanan data pasien)
	if userIDFromContext != 0 {
		// Asumsi: Jika user login sebagai dokter, logika ini mungkin berbeda
		// Di sini kita asumsikan user biasa melihat datanya sendiri
		// Anda mungkin perlu logika tambahan cek role user
		// Contoh sederhana:
		// role, _ := c.Get("role")
		// if role == "user" {
		//    query = query.Where("user_id = ?", userIDFromContext)
		// }
		
		// Untuk sekarang, kita fallback ke query param atau logic sederhana
	}

	if queryUserID != "" {
		query = query.Where("user_id = ?", queryUserID)
	}
	if doctorID != "" {
		query = query.Where("doctor_id = ?", doctorID)
	}

	// 3. Eksekusi (Urutkan konsultasi terbaru di paling atas)
	if err := query.Order("created_at desc").Find(&consultations).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil data konsultasi"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": consultations})
}

// POST /consultations
// Pasien membuat jadwal konsultasi baru
func CreateConsultation(c *gin.Context) {
	var input struct {
		Topic    string `json:"topic" binding:"required"`
		DoctorID uint   `json:"doctor_id" binding:"required"`
		Date     string `json:"consultation_date" binding:"required"`
		Time     string `json:"consultation_time" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// --- LOGIKA MENGAMBIL USER ID DARI TOKEN (JWT) ---
	var userID uint = 1 // Default untuk testing
	if v, exists := c.Get("userID"); exists {
		userID = v.(uint)
	}

	consultation := models.Consultation{
		Topic:            input.Topic,
		DoctorID:         input.DoctorID,
		UserID:           userID,
		ConsultationDate: input.Date,
		ConsultationTime: input.Time,
		Status:           "Scheduled", // Status awal
	}

	if err := database.DB.Create(&consultation).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menjadwalkan konsultasi"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Konsultasi berhasil dijadwalkan",
		"data":    consultation,
	})
}

// POST /consultations/:id/reply
// Endpoint untuk mengirim pesan chat (Baik dari Dokter maupun Pasien)
func ReplyConsultation(c *gin.Context) {
	id := c.Param("id")

	var input struct {
		Message string `json:"message" binding:"required"`
		Sender  string `json:"sender" binding:"required"` // "doctor" atau "patient"
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 1. Cek Validitas Konsultasi
	var consultation models.Consultation
	if err := database.DB.First(&consultation, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Konsultasi tidak ditemukan"})
		return
	}

	// 2. Simpan Pesan ke Tabel Messages
	msg := models.Message{
		ConsultationID: consultation.ID,
		Text:           input.Message,
		SenderRole:     input.Sender,
		// CreatedAt akan otomatis diisi GORM saat insert
	}

	if err := database.DB.Create(&msg).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengirim pesan"})
		return
	}

	// 3. Update Status Konsultasi (Logika Bisnis Tambahan)
	// Jika dokter membalas dan status masih "Scheduled", ubah jadi "Active"
	if input.Sender == "doctor" && consultation.Status == "Scheduled" {
		consultation.Status = "Active"
		database.DB.Save(&consultation)
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Pesan terkirim",
		"data":    msg,
	})
}

// PUT /consultations/:id/status
// Endpoint khusus Dokter/Admin untuk update status (Selesai/Batal) atau Link Meeting
func UpdateConsultationStatus(c *gin.Context) {
	id := c.Param("id")

	var input struct {
		Status      string `json:"status"`
		MeetingLink string `json:"meeting_link"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var consultation models.Consultation
	if err := database.DB.First(&consultation, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Data tidak ditemukan"})
		return
	}

	// Update field hanya jika dikirim (tidak kosong)
	if input.Status != "" {
		consultation.Status = input.Status
	}
	if input.MeetingLink != "" {
		consultation.MeetingLink = input.MeetingLink
	}

	if err := database.DB.Save(&consultation).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal update status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Status konsultasi diperbarui",
		"data":    consultation,
	})
}

// GET /consultations/:id
func GetConsultationByID(c *gin.Context) {
    id := c.Param("id") // Mengambil ID dari URL, misal: /consultations/12
    var consultation models.Consultation

    // Query ke database mencari ID tersebut
    // Sekalian ambil data User, Doctor, dan Messages-nya
    if err := database.DB.
        Preload("User").
        Preload("Doctor").
        Preload("Messages", func(db *gorm.DB) *gorm.DB {
            return db.Order("created_at asc") // Urutkan pesan chat
        }).
        First(&consultation, id).Error; err != nil {
        
        c.JSON(http.StatusNotFound, gin.H{"error": "Konsultasi tidak ditemukan"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": consultation})
}