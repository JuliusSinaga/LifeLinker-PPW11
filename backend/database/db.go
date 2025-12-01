package database

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/JuliusSinaga/LifeLinker-PPW11/backend/models"
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

	// Auto Migrate tetap di sini agar rapi
	err = database.AutoMigrate(
		&models.User{},
		&models.Lokasi{},
		&models.Event{},
		&models.StokDarah{},
		&models.DonationHistory{},
		&models.Consultation{},
	)

	if err != nil {
		log.Fatal("❌ Gagal melakukan migrasi database: ", err)
	}

	fmt.Println("✅ Database connected & Migrated successfully!")
	DB = database
}