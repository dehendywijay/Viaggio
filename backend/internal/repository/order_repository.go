package repository

import (
	"triptix/internal/models"

	"gorm.io/gorm"
)

type OrderRepository struct {
	GormDB *gorm.DB
}

func NewOrderRepository(db *gorm.DB) *OrderRepository {
	return &OrderRepository{
		GormDB: db,
	}
}

func (r *OrderRepository) CreateOrder(order *models.Order) error {
	err := r.GormDB.Create(&order).Error
	if err != nil {
		return err
	}
	return nil
}