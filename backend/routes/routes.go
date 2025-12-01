package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/controllers"
)

// SetupRoutes menerima 'gin.Engine' dan mendaftarkan semua endpoint
func SetupRoutes(router *gin.Engine) {

	// --- 1. User Routes ---
	router.GET("/users", controllers.GetUsers)
	router.POST("/users", controllers.CreateUser)

	// --- 2. Event Routes ---
	router.GET("/events", controllers.GetEvents)
	router.GET("/events/:id", controllers.GetEventByID)
	router.POST("/events", controllers.CreateEvent)

	// --- 3. Stok Darah Routes ---
	router.GET("/stok-darah", controllers.GetStokDarah)
	router.POST("/stok-darah", controllers.UpdateStokDarah)

	// --- 4. Lokasi Routes ---
	router.GET("/lokasi", controllers.GetLokasi)
	router.POST("/lokasi", controllers.CreateLokasi)

	// --- 5. Donasi Routes ---
	router.GET("/donations", controllers.GetDonations)
	router.POST("/donations", controllers.CreateDonation)

	// --- 6. Konsultasi Routes ---
	router.GET("/consultations", controllers.GetConsultations)
	router.POST("/consultations", controllers.CreateConsultation)
	router.PUT("/consultations/:id", controllers.UpdateConsultation)
}