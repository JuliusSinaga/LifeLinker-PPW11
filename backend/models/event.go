package models

import "time"

type Event struct {
    ID             uint      `gorm:"primaryKey" json:"id"`
    LokasiID       uint      `json:"lokasi_id"`
    OrganizerID    uint      `json:"organizer_id"`
    
    // PENTING: Sesuaikan tag `gorm:"column:..."` dengan nama kolom asli di pgAdmin kamu
    NamaEvent      string    `gorm:"column:nama_event" json:"title"` 
    DeskripsiEvent string    `gorm:"column:deskripsi_event" json:"description"`
    TanggalEvent   time.Time `gorm:"column:tanggal_event" json:"date"`
    GambarEvent    string    `gorm:"column:gambar_event" json:"image"`
    
    Status         string    `json:"status"`
    Kuota          int       `json:"quota"`
    
    // Relasi ke Participant (Error tadi ada di baris ini, sekarang harusnya sudah aman)
    Participants   []EventParticipant `gorm:"foreignKey:EventID" json:"participants,omitempty"`
    
    CreatedAt      time.Time `json:"created_at"`
    UpdatedAt      time.Time `json:"updated_at"`
}