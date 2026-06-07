package dto

type  RegisterRequest struct {
	Nama     string `json:"nama" validate:"required,alpha"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=6"`
}
type LoginRespone struct {
	ID    uint  `json:"id"`
	Email string `json:"email"`
	RefreshToken string `json:"refresh_token"`
	AccesToken string `json:"access_token"`
}

type LoginRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=6"`
}

type RefreshTokenRequest struct {
	RefreshToken string `json:"refresh_token"`
}