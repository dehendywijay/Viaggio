package services

import (
	"context"
	"strconv"
	"time"
	"triptix/internal/dto"
	"triptix/internal/models"
	"triptix/internal/repository"
	"triptix/pkg/jwt"
	"triptix/pkg/utils"

	"errors"

	"github.com/redis/go-redis/v9"
)

type AuthService struct {
	r     *repository.AuthRepository
	Redis *redis.Client

}

func NewAuthService(r *repository.AuthRepository, redis *redis.Client) *AuthService {
	return &AuthService{
		r:     r,
		Redis: redis,
	}
}

func (s *AuthService) RegisterUser(user *dto.RegisterRequest) error {

	hashedPassword, err := utils.HashPassword(user.Password)
	if err != nil {
		return err
	}

	userValidate := models.User{
		Nama:     user.Nama,
		Email:    user.Email,
		Password: hashedPassword,
	}

	err = s.r.RegisterUser(&userValidate)
	if err != nil {
		return errors.New("Email sudah terdaftar")
	}
	return err

}

func (s *AuthService) LoginUser(user dto.LoginRequest) (dto.LoginRespone, error) {
	result, err := s.r.LoginUser(user.Email, user.Password)
	if err != nil {
		return dto.LoginRespone{}, err
	}

	refreshTokenValue, err := jwt.GenerateRefreshToken()
	if err != nil {
		return dto.LoginRespone{}, err
	}

	refreshTokenHash := utils.HashToken(refreshTokenValue)

	AccessToken, err := jwt.GenerateAccessToken(result.ID)
	if err != nil {
		return dto.LoginRespone{}, err
	}

	_, err = s.r.CreateRefreshToken(result.ID, refreshTokenHash)
	if err != nil {
		return dto.LoginRespone{}, err
	}

	userIDStr := strconv.Itoa(int(result.ID))

	// s.Redis.Del(
	// 	context.Background(),
	// 	userIDStr,
	// ).Err()

	s.Redis.Set(
		context.Background(),
		userIDStr,
		refreshTokenValue,
		7*24*time.Hour,
	).Err()

	data := dto.LoginRespone{
		ID:           result.ID,
		Email:        result.Email,
		RefreshToken: refreshTokenValue,
		AccesToken:   AccessToken,
	}

	return data, nil
}

// SERVICE BELUM SELESAI, MASIH PERLU DI COCOKAN DENGAN REFRESH YANG DI SIMPAN LOCAL STORAGE
func (s *AuthService) RefreshToken(id string) (string, error) {
	s.Redis.Get(
		context.Background(),
		id,
	).Result()

	ID, err := strconv.Atoi(id)
	if err != nil {
		return " ", err
	}

	accesToken, err := jwt.GenerateAccessToken(uint(ID))
	if err != nil {
		return " ", err
	}

	return accesToken, nil
}

func (s *AuthService) LogoutUser(id string) error {
	s.Redis.Del(
		context.Background(),
		id,
	).Err()

	return nil
}

func (s *AuthService) GetReviewsByUserEmail(
	email string,
) (dto.ReviewsByUserResponse, error) {

	user, err := s.r.GetUserByEmail(email)
	if err != nil {
		return dto.ReviewsByUserResponse{}, err
	}

	reviews, err := s.r.GetReviewsByUserID(user.ID)
	if err != nil {
		return dto.ReviewsByUserResponse{}, err
	}

	var reviewResponses []dto.ReviewsItemByUserResponse

	for _, review := range reviews {

		reviewResponses = append(
			reviewResponses,
			dto.ReviewsItemByUserResponse{
				ID:      review.ID,
				Rating:  review.Rating,
				Comment: review.Comment,
				Wisata: dto.WisataReviewResponse{
					ID:   review.Wisata.ID,
					Nama: review.Wisata.Nama,
				},
			},
		)
	}

	response := dto.ReviewsByUserResponse{
		User: dto.UserReviewResponse{
			ID:   user.ID,
			Nama: user.Nama,
		},
		Reviews: reviewResponses,
	}

	return response, nil
}
