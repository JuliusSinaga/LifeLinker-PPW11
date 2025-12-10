package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	// Import module internal
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/database"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/models" // PENTING: Untuk Migrasi
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/routes"
)

func main() {
	// 1. Load Env
	if err := godotenv.Load(); err != nil {
		log.Println("Peringatan: Tidak dapat memuat file .env, menggunakan environment system jika ada.")
	}

	// 2. Connect Database
	database.ConnectDB()

	// 3. Auto Migration (Membuat Tabel Otomatis)
	// Pastikan semua model yang Anda buat didaftarkan di sini
	err := database.DB.AutoMigrate(
		&models.User{},
		&models.Lokasi{},
		&models.StokDarah{},
		&models.Event{},
		&models.DonationHistory{},
		&models.Consultation{},
	)
	if err != nil {
		log.Fatal("Gagal melakukan migrasi database:", err)
	}
	fmt.Println("✅ Migrasi Database Berhasil")

	// 4. Jalankan Seeder (Mengisi Data Awal)
	// Fungsi ini akan mengecek apakah tabel kosong, jika ya, akan diisi data dummy
	database.SeedAll(database.DB)

	// 5. Init Router
	router := gin.Default()

	// 6. Config CORS
	// Konfigurasi ini mengizinkan frontend (React) mengakses backend
	router.Use(cors.New(cors.Config{
		AllowAllOrigins:  true, // Saat development aman, saat production sebaiknya spesifik domain
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// 7. Setup Routes (Mendaftarkan semua endpoint controller)
	routes.SetupRoutes(router)

	// 8. Test Route Sederhana (Health Check)
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Server LifeLinker Berjalan 🚀",
			"status":  "active",
		})
	})

	// 9. Run Server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Println("✅ Server berjalan di http://localhost:" + port)
	
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Gagal menjalankan server:", err)
	}
}