package repository

import (
	"fmt"
	"time"
	"triptix/internal/models"
	"triptix/pkg/utils"

	"gorm.io/gorm"
)

type AuthRepository struct {
	GormDB *gorm.DB
}

func NewAuthRepository(db *gorm.DB) *AuthRepository {
	return &AuthRepository{
		GormDB: db,
	}
}

func (r *AuthRepository) RegisterUser(data *models.User) error {
	return r.GormDB.Create(&data).Error
}

func (r *AuthRepository) LoginUser(email string, password string) (models.User, error) {
	var user models.User
	err := r.GormDB.Select("id", "email", "password").Where("email = ?", email).First(&user).Error
	if err != nil {
		return user, err
	}

	if !utils.CheckPassword(user.Password, password) {
		return user, fmt.Errorf("invalid credentials")
	}

	return user, err
}

func (r *AuthRepository) GetUserByEmail(email string,) (*models.User, error) {

	var user models.User

	err := r.GormDB.
		Select("id", "nama").
		Where("email = ?", email).
		First(&user).Error

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *AuthRepository) GetReviewsByUserID(userID uint,) ([]models.Review, error) {

	var reviews []models.Review

	err := r.GormDB.
		Preload("Wisata", func(db *gorm.DB) *gorm.DB {
			return db.Select("id", "nama")
		}).
		Where("user_id = ?", userID).
		Find(&reviews).Error

	if err != nil {
		return nil, err
	}

	return reviews, nil
}

func (r *AuthRepository) CreateRefreshToken(id uint, hash string) (models.RefreshToken, error) {
	refreshToken := models.RefreshToken{
		UserID:    id,
		TokenHash: hash,
		ExpiresAt: time.Now().Add(7 * 24 * time.Hour),
	}
	err := r.GormDB.Create(&refreshToken).Error
	return refreshToken, err
}

func (r *AuthRepository) GetRefreshToken(hash string) (models.RefreshToken, error) {
	var refreshToken models.RefreshToken
	err := r.GormDB.Where("token_hash = ? AND revoked = false", hash).First(&refreshToken).Error
	return refreshToken, err
}

func (r *AuthRepository) RevokeRefreshToken(hash string) error {
	return r.GormDB.Model(&models.RefreshToken{}).Where("token_hash = ?", hash).Update("revoked", true).Error
}
