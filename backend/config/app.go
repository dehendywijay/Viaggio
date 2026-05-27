package config

import (
	"triptix/internal/controllers"
	"triptix/internal/repository"
	"triptix/internal/services"

	"gorm.io/gorm"
)

type App struct {
	AuthController   *controllers.AuthControllers
	ReviewController *controllers.ReviewControllers
	WisataController *controllers.WisataControllers
}

func BootstrapApp(db *gorm.DB) *App {

	authRepo := repository.NewAuthRepository(db)
	authService := services.NewAuthService(authRepo)
	authController := controllers.NewAuthControllers(authService)


	reviewRepo := repository.NewReviewRepository(db)
	reviewService := services.NewReviewService(reviewRepo)
	reviewController := controllers.NewReviewControllers(reviewService)

	wisataRepo := repository.NewWisataRepository(db)
	wisataService := services.NewWisataService(wisataRepo)
	wisataController := controllers.NewWisataControllers(wisataService)

	return &App{
		AuthController:   authController,
		ReviewController: reviewController,
		WisataController: wisataController,
	}
}