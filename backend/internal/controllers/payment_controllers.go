package controllers

import (
	"net/http"
	"strconv"
	"triptix/internal/services"

	"github.com/gin-gonic/gin"
)

type PaymentControllers struct {
	s *services.PaymentService
}

func NewPaymentControllers(s *services.PaymentService) *PaymentControllers {
	return &PaymentControllers{
		s: s,
	}
}
func (h *PaymentControllers) Payment(c *gin.Context) {
	id := c.Param("id")

	idd, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}
	myUint := uint(idd)

	result, err := h.s.Payment(myUint)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Payment Request dibuat",
		"data":    result,
	})
}