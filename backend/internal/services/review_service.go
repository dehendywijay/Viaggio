package services

import (
	"fmt"
	"triptix/internal/dto"
	"triptix/internal/models"
	"triptix/internal/repository"
)

type ReviewService struct {
	r *repository.ReviewRepository
}

func NewReviewService(r *repository.ReviewRepository) *ReviewService {
	return &ReviewService{
		r: r,
	}
}
 
func (s *ReviewService) CreateReview(
	req dto.CreateReviewRequest,
) (dto.ReviewResponse, error) {

	review := models.Review{
		UserID:   req.UserID,
		WisataID: req.WisataID,
		Rating:   req.Rating,
		Comment:  req.Comment,
	}

	err := s.r.CreateReview(review)
	if err != nil {
		return dto.ReviewResponse{},
			fmt.Errorf("create review: %w", err)
	}

	return dto.ReviewResponse{
		ID:       review.ID,
		UserID:   review.UserID,
		WisataID: review.WisataID,
		Rating:   review.Rating,
		Comment:  review.Comment,
	}, nil
}

func (s *ReviewService) GetReviewsByWisataID(
	wisataID uint,
) (dto.ReviewsByWisataResponse, error) {

	wisata, err := s.r.GetWisataByIDWisata(
		wisataID,
	)

	if err != nil {
		return dto.ReviewsByWisataResponse{},
			fmt.Errorf("get wisata by id: %w", err)
	}

	reviews, err := s.r.GetReviewsByWisataID(
		wisataID,
	)

	if err != nil {
		return dto.ReviewsByWisataResponse{},
			fmt.Errorf("get reviews by wisata: %w", err)
	}

	var reviewResponses []dto.ReviewItemResponse

	for _, r := range reviews {

		reviewResponses = append(
			reviewResponses,
			dto.ReviewItemResponse{
				ID:      r.ID,
				Rating:  r.Rating,
				Comment: r.Comment,
				User: dto.UserReviewResponse{
					ID:   r.User.ID,
					Nama: r.User.Nama,
				},
			},
		)
	}

	response := dto.ReviewsByWisataResponse{
		Wisata: dto.WisataReviewResponse{
			ID:   wisata.ID,
			Nama: wisata.Nama,
		},
		Reviews: reviewResponses,
	}

	return response, nil
}