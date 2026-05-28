package dto

import "time"

type CreateOrderRequest struct {
	UserID   uint      `json:"user_id" binding:"required"`
	WisataID uint      `json:"wisata_id" binding:"required"`
	Qty      int       `json:"qty" binding:"required"`
	Harga    int       `json:"harga" binding:"required"`
	Tanggal  time.Time `json:"tanggal" binding:"required"`

	Status string `json:"status" default:"pending"`
} 


