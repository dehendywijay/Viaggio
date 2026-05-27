package routes

import (
	"triptix/config"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine, app *config.App) {

	user := r.Group("/api/user")
	{
		user.POST("/register", app.AuthController.RegisterUser)
		user.POST("/login", app.AuthController.LoginUser)
		user.GET("/:email", app.AuthController.GetUser)
		user.POST("/logout", app.AuthController.LogoutUser)
		user.POST("/refresh", app.AuthController.RefreshToken)
	}

	review := r.Group("/api/reviews")
	{
		review.POST("", app.ReviewController.CreateReview)
		review.GET("/wisata/:wisata_id", app.ReviewController.GetReviewsByWisata)
	}

	wisata := r.Group("/api/wisata")
	{
		wisata.POST("", app.WisataController.CreateWisata)
		wisata.GET("", app.WisataController.GetAllWisata)
		wisata.GET("/:id", app.WisataController.GetWisataByID)
		wisata.PUT("/:id", app.WisataController.EditWisata)
	}
}