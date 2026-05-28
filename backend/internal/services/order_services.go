package services

import (
	"triptix/internal/dto"
	"triptix/internal/models"
	"triptix/internal/repository"
)

type OrderService struct {
	r *repository.OrderRepository
}

func NewOrderService(r *repository.OrderRepository) *OrderService {
	return &OrderService{
		r: r,
	}
}
func (s *OrderService) CreateOrder(orderRequest dto.CreateOrderRequest)  error {
	order := models.Order{
		UserID:     orderRequest.UserID,
		TotalHarga: orderRequest.Harga * orderRequest.Qty,
		Status:     orderRequest.Status,
		OrderItems: []models.OrderItem{
			{
				WisataID: orderRequest.WisataID,
				Qty:      orderRequest.Qty,
				Harga:    orderRequest.Harga,
				Tanggal:  orderRequest.Tanggal,
			},
		},
	}
	err := s.r.CreateOrder(&order)
	if err != nil {
		return  err
	}
	return nil
}