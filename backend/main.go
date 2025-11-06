package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	router := mux.NewRouter()

	// Tambahkan route "/" untuk test
	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Server Go Berjalan 🚀 — koneksi sukses!")
	}).Methods("GET")

	// Route POST /users untuk API
	router.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Berhasil menerima request dari React 📨")
	}).Methods("POST")

	// Izinkan semua origin (supaya bisa diakses dari React)
	handler := cors.AllowAll().Handler(router)

	fmt.Println("✅ Server berjalan di http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
