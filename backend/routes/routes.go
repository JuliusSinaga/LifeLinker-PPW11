package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/controllers"
)

func SetupRoutes(router *gin.Engine) {

	// User Routes
	router.GET("/users", controllers.GetUsers)
	router.POST("/users", controllers.CreateUser)
	// Route untuk login dengan Google
	router.POST("/auth/google", controllers.GoogleLogin)

	// Event Routes
	router.GET("/events", controllers.GetEvents)
	router.GET("/events/:id", controllers.GetEventByID)
	router.POST("/events", controllers.CreateEvent)

	// Stok Darah Routes
	router.GET("/stok-darah", controllers.GetStokDarah)
	router.POST("/stok-darah", controllers.UpdateStokDarah)

	// Lokasi Routes
	router.GET("/lokasi", controllers.GetLokasi)
	router.POST("/lokasi", controllers.CreateLokasi)

	// Donasi Routes
	router.GET("/donations", controllers.GetDonations)
	router.POST("/donations", controllers.CreateDonation)

	// Konsultasi Routes
	router.GET("/consultations", controllers.GetConsultations)
	router.POST("/consultations", controllers.CreateConsultation)
	router.PUT("/consultations/:id", controllers.UpdateConsultation)
}