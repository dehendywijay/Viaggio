package controllers

import (
	"net/http"
	"triptix/internal/dto"
	"triptix/internal/services"
	"triptix/internal/validator"

	"github.com/gin-gonic/gin"
)

type AuthControllers struct {
	s *services.AuthService
	Validator validator.CustomValidator
}

func NewAuthControllers(s *services.AuthService, validator validator.CustomValidator) *AuthControllers {
	return &AuthControllers{
		s: s,
		Validator: validator,
	}
}

func (h *AuthControllers) RegisterUser(c *gin.Context) {
	var user dto.RegisterRequest
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{
			"success": false,
			"error":   err.Error(),
		})
		return
	}

	err := h.Validator.Validate(&user)
	if err != nil {
		c.JSON(400, gin.H{
			"success": false,
			"error":   err.Error(),
		})
		return
	}

	err	= h.s.RegisterUser(&user)
	if err != nil {
		c.JSON(500, gin.H{
			"success": false,
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Akun Berhasil Dibuat",
		"data":    user,
	})
}

func (h *AuthControllers) LoginUser(c *gin.Context) {
	var req dto.LoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Data tidak ditemukan",
		})
		return
	}

	err := h.Validator.Validate(&req)
	if err != nil {
		c.JSON(400, gin.H{
			"success": false,
			"error":   err.Error(),
		})
		return
	}

	data, err := h.s.LoginUser(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Login gagal",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"data":    data,
	})
}

func (h *AuthControllers) RefreshToken(c *gin.Context) {
	id := c.PostForm("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "ID dibutuhkan",
		})
		return
	}

	accesToken, err := h.s.RefreshToken(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Refresh token valid",
		"data": gin.H{
			"access_token": accesToken,
		},
	})

}

func (h *AuthControllers) LogoutUser(c *gin.Context) {
	id := c.PostForm("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "ID dibutuhkan",
		})
		return
	}

	err := h.s.LogoutUser(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "logout gagal",
		})
		return
	}
	c.JSON(http.StatusNoContent, gin.H{
		"message": "logout berhasil",
	})
}

func (h *AuthControllers) GetUser(c *gin.Context) {
	email := c.Param("email")

	if email == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Email dibutuhkan",
		})
		return
	}

	user, err := h.s.GetReviewsByUserEmail(email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": user,
	})
}
