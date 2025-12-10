package database

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
    // Hapus import "github.com/JuliusSinaga/LifeLinker-PPW11/backend/models"
    // Karena kita tidak lagi melakukan migrasi di file ini.
)

var DB *gorm.DB

func ConnectDB() {
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")

	// Setup TimeZone Asia/Jakarta (WIB)
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Jakarta",
		host, user, password, dbname, port,
	)

	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("❌ Gagal konek ke PostgreSQL: ", err)
	}

	// --- PERUBAHAN: HAPUS BAGIAN AUTO MIGRATE DI SINI ---
	// Kita sudah memindahkannya ke main.go agar dijalankan sebelum seeder.
	
	fmt.Println("✅ Database connected successfully!")
	DB = database
}