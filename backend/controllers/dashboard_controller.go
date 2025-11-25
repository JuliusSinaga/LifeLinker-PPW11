package controllers

import (
	"html/template"
	"net/http"
)

type DashboardData struct {
	Title               string
	UserCount           string
	DoctorCount         string
	DonorCount          string
	EventCount          string
	StockCount          string
	CompletedEventCount string
	BloodStock          []BloodType
	Notifications       []Notification
	Events              []Event
}

type BloodType struct {
	Type  string
	Count string
	Color string
}

type Notification struct {
	Title   string
	Message string
	Time    string
	Type    string
}

type Event struct {
	Title    string
	Location string
	Date     string
}

func DashboardAdmin(w http.ResponseWriter, r *http.Request) {
	// Sample data matching the UI design
	data := DashboardData{
		Title:               "Dashboard Administrasi",
		UserCount:           "20,847",
		DoctorCount:         "342",
		DonorCount:          "10,275",
		EventCount:          "47",
		StockCount:          "20,234",
		CompletedEventCount: "587",
		BloodStock: []BloodType{
			{Type: "Golongan A", Count: "312", Color: "red"},
			{Type: "Golongan B", Count: "628", Color: "green"},
			{Type: "Golongan AB", Count: "184", Color: "orange"},
			{Type: "Golongan O", Count: "1270", Color: "blue"},
		},
		Notifications: []Notification{
			{Title: "Request Akun Dokter", Message: "Dr. Amanda Sari Mengajukan Verifikasi", Time: "2 jam lalu", Type: "blue"},
			{Title: "Request Event Baru", Message: "Donor Darah Akbar - RSUP Porsea", Time: "4 jam lalu", Type: "yellow"},
			{Title: "Stok Darah Menipis", Message: "Golongan AB hanya tersisa 25 kantong", Time: "1 hari lalu", Type: "red"},
			{Title: "Darah Hampir Kadaluwarsa", Message: "5 kantong akan kadaluwarsa dalam 3 hari", Time: "1 hari lalu", Type: "pink"},
		},
		Events: []Event{
			{Title: "Donor Darah di RSUD Porsea", Location: "RSUD Porsea", Date: "12 Januari 2025"},
			{Title: "Sosialisasi Donor Darah", Location: "RS HKBP Balige", Date: "08 April 2025"},
			{Title: "Donor Darah IT Del", Location: "IT Del", Date: "24 Oktober 2025"},
		},
	}

	// Parse and execute template
	tmpl, err := template.ParseFiles("templates/dashboard.html")
	if err != nil {
		http.Error(w, "Error parsing template: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/html")
	err = tmpl.Execute(w, data)
	if err != nil {
		http.Error(w, "Error executing template: "+err.Error(), http.StatusInternalServerError)
		return
	}
}
