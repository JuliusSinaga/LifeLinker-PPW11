package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/username/life-linker/controllers"
)

func main() {
	router := mux.NewRouter()

	// Existing API routes
	router.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Berhasil menerima request dari React 🎉")
	}).Methods("POST")

	// Dashboard Admin route
	router.HandleFunc("/admin/dashboard", controllers.DashboardAdmin).Methods("GET")
	router.HandleFunc("/dashboard", controllers.DashboardAdmin).Methods("GET")

	// Static files serving
	router.PathPrefix("/static/").Handler(http.StripPrefix("/static/",
		http.FileServer(http.Dir("./static/"))))

	handler := cors.AllowAll().Handler(router)

	fmt.Println("Server Berjalan 🚀 di http://localhost:8080")
	fmt.Println("Dashboard Admin: http://localhost:8080/dashboard")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
