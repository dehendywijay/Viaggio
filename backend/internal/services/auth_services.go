package services

import (
	"triptix/internal/dto"
	"triptix/internal/models"
	"triptix/internal/repository"

	"triptix/pkg/jwt"
	"triptix/pkg/utils"
)

type AuthService struct {
	r *repository.AuthRepository
}

func NewAuthService(r *repository.AuthRepository) *AuthService {
	return &AuthService{
		r: r,
	}
}

func (s *AuthService) RegisterUser(user *models.User) error {
	hashedPassword, err := utils.HashPassword(user.Password)
	if err != nil {
		return err
	}
	user.Password = hashedPassword

	err = s.r.RegisterUser(user)
	if err != nil {
		return err
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

	data := dto.LoginRespone{
		ID:           result.ID,
		Email:        result.Email,
		RefreshToken: refreshTokenValue,
		AccesToken:   AccessToken,
	}

	return data, nil
}

func (s *AuthService) RefreshToken(req dto.RefreshTokenRequest) (string, error) {
	refreshTokenHash := utils.HashToken(req.RefreshToken)
	valid, err := s.r.GetRefreshToken(refreshTokenHash)
	if err != nil {
		return " ", err
	}

	accesToken, err := jwt.GenerateAccessToken(valid.UserID)
	if err != nil {
		return " ", err
	}

	return accesToken, nil
}

func (s *AuthService) LogoutUser(req dto.RefreshTokenRequest) error {
	hashedToken := utils.HashToken(req.RefreshToken)
	err := s.r.RevokeRefreshToken(hashedToken)
	if err != nil {
		return err
	}

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
