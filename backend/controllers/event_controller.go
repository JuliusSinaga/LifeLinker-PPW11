package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/database"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/models"
)

// GET /events - Ambil semua event
func GetEvents(c *gin.Context) {
	var events []models.Event

	// Preload("Lokasi") & Preload("Organizer") agar data relasinya ikut terambil
	if err := database.DB.Preload("Lokasi").Preload("Organizer").Find(&events).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": events})
}

// GET /events/:id - Ambil detail 1 event
func GetEventByID(c *gin.Context) {
	id := c.Param("id")
	var event models.Event

	if err := database.DB.Preload("Lokasi").Preload("Organizer").Preload("Participants").First(&event, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Event tidak ditemukan"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": event})
}

// POST /events - Tambah event baru (Admin)
func CreateEvent(c *gin.Context) {
	var input models.Event
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat event"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Event berhasil dibuat", "data": input})
}