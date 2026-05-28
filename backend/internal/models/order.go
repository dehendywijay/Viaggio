package models

import (
	"time"

	"gorm.io/gorm"
)

type Order struct {
	gorm.Model

	UserID uint `json:"user_id" gorm:"not null"`

	TotalHarga int    `json:"total_harga" gorm:"not null"`
	Status     string `json:"status" gorm:"default:'pending'"`

	User User `json:"user,omitempty" gorm:"foreignKey:UserID"`

	OrderItems []OrderItem `gorm:"foreignKey:OrderID"`
}

type OrderItem struct {
	gorm.Model

	OrderID  uint `json:"order_id" gorm:"not null"`
	WisataID uint `json:"wisata_id" gorm:"not null"`

	Qty   int `json:"qty" gorm:"not null"`
	Harga int `json:"harga" gorm:"not null"`
	Tanggal time.Time `json:"tanggal" gorm:"not null"`

	Order  Order  `json:"order,omitempty" gorm:"foreignKey:OrderID"`
	Wisata Wisata `json:"wisata,omitempty" gorm:"foreignKey:WisataID"`
}