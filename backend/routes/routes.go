package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/controllers"
)

func SetupRoutes(router *gin.Engine) {
	
	// --- AUTHENTICATION ---
	router.POST("/users", controllers.CreateUser)           // Register Manual
	router.POST("/login", controllers.Login)                // Login Manual (Ini yang tadi 404)
	router.POST("/login/google", controllers.GoogleLogin)   // Login Google

	// --- DASHBOARD ADMIN ---
	router.GET("/dashboard/admin", controllers.DashboardAdmin)
	// Khusus Admin
    router.PUT("/users/:id/verify", controllers.VerifyDoctor)

	// --- FITUR PUBLIK (User & Dokter) ---
	
	// Lokasi Donor
	router.GET("/lokasi", controllers.GetLokasi)
	router.GET("/lokasi/:id", controllers.GetLokasiByID) // <-- PENTING
	router.POST("/lokasi", controllers.CreateLokasi)
	router.PUT("/lokasi/:id", controllers.UpdateLokasi)
	router.DELETE("/lokasi/:id", controllers.DeleteLokasi)

	// Stok Darah
	router.GET("/stok-darah", controllers.GetStokDarah)
	router.GET("/stok-darah/:id", controllers.GetStokDarahByID) // <-- Tambahkan ini
	router.POST("/stok-darah", controllers.UpdateStokDarah)
	
	// Events
	router.GET("/events", controllers.GetEvents)
	router.GET("/events/:id", controllers.GetEventByID)
	router.POST("/events", controllers.CreateEvent)
	router.PUT("/events/:id", controllers.UpdateEvent)    // Tambahan
	router.DELETE("/events/:id", controllers.DeleteEvent) // Tambahan
	
	// Donasi (User Profil)
	router.GET("/donations", controllers.GetDonations)
	router.GET("/donations/:id", controllers.GetDonationByID) // Tambahan
	router.POST("/donations", controllers.CreateDonation)
	router.PUT("/donations/:id", controllers.UpdateDonation)  // Tambahan

	// Konsultasi
	router.GET("/consultations", controllers.GetConsultations)
	router.GET("/consultations/:id", controllers.GetConsultationByID) // <-- Tambahkan ini
	router.POST("/consultations", controllers.CreateConsultation)
	router.PUT("/consultations/:id", controllers.UpdateConsultation)
	
		// --- TESTING (Opsional) ---
	router.GET("/users", controllers.GetUsers) // Cek data user

	router.POST("/forgot-password", controllers.ForgotPassword)
    router.POST("/reset-password", controllers.ResetPassword)
}