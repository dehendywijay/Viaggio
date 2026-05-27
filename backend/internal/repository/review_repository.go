package repository

import (
	"fmt"
	"triptix/internal/models"

	"gorm.io/gorm"
)

type ReviewRepository struct {
	GormDB *gorm.DB
}

func NewReviewRepository(db *gorm.DB) *ReviewRepository {
	return &ReviewRepository{
		GormDB: db,
	}
}

func (r *ReviewRepository) CreateReview(
	data models.Review,
) error {

	return r.GormDB.Create(&data).Error
}

func (r *ReviewRepository) GetWisataByIDWisata(
	id uint,
) (models.Wisata, error) {

	var wisata models.Wisata

	err := r.GormDB.
		Select("id", "nama").
		First(&wisata, id).Error

	if err != nil {
		return models.Wisata{},
			fmt.Errorf("get wisata: %w", err)
	}

	return wisata, nil
}

func (r *ReviewRepository) GetReviewsByWisataID(
	wisataID uint,
) ([]models.Review, error) {

	var reviews []models.Review

	err := r.GormDB.
		Preload("User", func(db *gorm.DB) *gorm.DB {
			return db.Select("id", "nama")
		}).
		Where("wisata_id = ?", wisataID).
		Find(&reviews).Error

	if err != nil {
		return nil,
			fmt.Errorf("get reviews: %w", err)
	}

	return reviews, nil
}