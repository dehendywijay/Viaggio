package controllers

import (
	"net/http"
	"strconv"
	"triptix/internal/dto"
	"triptix/internal/services"

	"github.com/gin-gonic/gin"
)

type OrderControllers struct {
	s *services.OrderService
}

func NewOrderControllers(s *services.OrderService) *OrderControllers {
	return &OrderControllers{
		s: s,
	}
} 

func (h *OrderControllers) CreateOrder(c *gin.Context) {
	var orderRequest dto.CreateOrderRequest
	if err := c.ShouldBindJSON(&orderRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   err.Error(),
		})
		return
	}

	err := h.s.CreateOrder(orderRequest)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Order Berhasil dibuat",
	})
}

func (h *OrderControllers) GetOrders(c *gin.Context) {
	id := c.Param("id")
	
	userId, err := strconv.Atoi(id)
	if err != nil {
		return
	}

	result, err := h.s.GetOrders(uint(userId))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Daftar order berhasil didapatkan",
		"data":    result,
	})
}