package dto

type CreateReviewRequest struct {
	UserID   uint   `json:"user_id" validate:"required"`
	WisataID uint   `json:"wisata_id" validate:"required"`
	Rating   int    `json:"rating" validate:"required,min=1,max=5"`
	Comment  string `json:"comment" validate:"required"`
}

type ReviewResponse struct {
	ID       uint   `json:"id"`
	UserID   uint   `json:"user_id"`
	WisataID uint   `json:"wisata_id"`
	Rating   int    `json:"rating"`
	Comment  string `json:"comment"`
}

type UserReviewResponse struct {
	ID   uint   `json:"id"`
	Nama string `json:"nama"`
}

type WisataReviewResponse struct {
	ID   uint   `json:"id"`
	Nama string `json:"nama"`
}

type ReviewItemResponse struct {
	ID      uint               `json:"id"`
	Rating  int                `json:"rating"`
	Comment string             `json:"comment"`
	User    UserReviewResponse `json:"user"`
}

type ReviewsItemByUserResponse struct {
	ID      uint                 `json:"id"`
	Rating  int                  `json:"rating"`
	Comment string               `json:"comment"`
	Wisata  WisataReviewResponse `json:"wisata"`
}

type ReviewsByWisataResponse struct {
	Wisata  WisataReviewResponse `json:"wisata"`
	Reviews []ReviewItemResponse `json:"reviews"`
}

type ReviewsByUserResponse struct {
	User    UserReviewResponse          `json:"user"`
	Reviews []ReviewsItemByUserResponse `json:"reviews"`
}
