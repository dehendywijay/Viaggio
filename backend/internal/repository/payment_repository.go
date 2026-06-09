package repository

import (
	"fmt"
	"triptix/internal/models"

	"gorm.io/gorm"
)

type PaymentRepository struct {
	DB *gorm.DB
}

func NewPaymentRepository(db *gorm.DB) *PaymentRepository {
	return &PaymentRepository{
		DB: db,
	}
}

func (r *PaymentRepository) CekPayment(ID uint) (models.Order, error) {
	var payment models.Order
	err := r.DB.Select("status", "id", "total_harga" ).Where("id = ?", ID).First(&payment).Error
	if err != nil {
		return payment, fmt.Errorf("get payment: %w", err)
	}
	return payment, nil
}

