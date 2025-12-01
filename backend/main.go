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

	router.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Berhasil menerima request dari React 📨")
	}).Methods("POST")

	handler := cors.AllowAll().Handler(router)

	fmt.Println("Server Berjalan 🚀 di http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
