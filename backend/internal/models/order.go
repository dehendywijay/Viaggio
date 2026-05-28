package models

import (
	"time"

	"gorm.io/gorm"
)

type Order struct {
	gorm.Model

	UserID uint `gorm:"not null"`

	TotalHarga int    `gorm:"not null"`
	Status     string `gorm:"default:'pending'"`

	User User `gorm:"foreignKey:UserID"`

	OrderItems []OrderItem `gorm:"foreignKey:OrderID"`
}

type OrderItem struct {
	gorm.Model

	OrderID  uint `gorm:"not null"`
	WisataID uint `gorm:"not null"`

	Qty     int       `gorm:"not null"`
	Harga   int       `gorm:"not null"`
	Tanggal time.Time `gorm:"not null"`

	Order  Order  `gorm:"foreignKey:OrderID"`
	Wisata Wisata `gorm:"foreignKey:WisataID"`
}
