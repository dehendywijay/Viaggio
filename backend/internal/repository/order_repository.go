package repository

import (
	"triptix/internal/dto"
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

func (r *OrderRepository) GetOrders(userID uint) ([]*dto.GetOrderResponse, error) {
	var orderResponses []*dto.GetOrderResponse

	err := r.GormDB.Table("order_items").
		Select(`
			order_items.wisata_id,
			orders.user_id,
			order_items.qty,
			order_items.harga,
			orders.total_harga,
			order_items.tanggal,
			orders.status
		`).
		Joins("JOIN orders ON orders.id = order_items.order_id").
		Where("orders.user_id = ?", userID).
		Scan(&orderResponses).Error
		
	if err != nil {
		return nil, err
	}

	return orderResponses, nil
}
