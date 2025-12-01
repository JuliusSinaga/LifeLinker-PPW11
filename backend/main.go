package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	// Import routes dan database
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/database"
	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/routes"
)

func main() {
	// 1. Load Env
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// 2. Connect Database
	database.ConnectDB()

	// 3. Init Router
	router := gin.Default()

	// 4. Config CORS
	router.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// 5. Setup Routes (PANGGIL FUNGSI DARI FOLDER ROUTES)
	// Ini menggantikan puluhan baris kode yang tadi ada di sini
	routes.SetupRoutes(router)

	// 6. Test Route Sederhana
	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "Server Go Berjalan 🚀")
	})

	// 7. Run Server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Println("✅ Server berjalan di http://localhost:" + port)
	router.Run(":" + port)
}