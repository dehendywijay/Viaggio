package dto

type  RegisterRequest struct {
	Nama     string `json:"nama"`
	Email    string `json:"email"`
	Password string `json:"password"`
}
type LoginRespone struct {
	ID    uint  `json:"id"`
	Email string `json:"email"`
	RefreshToken string `json:"refresh_token"`
	AccesToken string `json:"access_token"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type RefreshTokenRequest struct {
	RefreshToken string `json:"refresh_token"`
}