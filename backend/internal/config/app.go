package config

import (
	"triptix/internal/controllers"
	"triptix/internal/repository"
	"triptix/internal/services"
	"triptix/internal/validator"

	"gorm.io/gorm"
)

type App struct {
	AuthController   *controllers.AuthControllers
	ReviewController *controllers.ReviewControllers
	WisataController *controllers.WisataControllers
	OrderController *controllers.OrderControllers
}

func BootstrapApp(db *gorm.DB) *App {
	validator := validator.NewCustomValidator()

	authRepo := repository.NewAuthRepository(db)
	authService := services.NewAuthService(authRepo)
	authController := controllers.NewAuthControllers(authService, validator)


	reviewRepo := repository.NewReviewRepository(db)
	reviewService := services.NewReviewService(reviewRepo)
	reviewController := controllers.NewReviewControllers(reviewService)

	wisataRepo := repository.NewWisataRepository(db)
	wisataService := services.NewWisataService(wisataRepo)
	wisataController := controllers.NewWisataControllers(wisataService, validator)

	orderRepo := repository.NewOrderRepository(db)
	orderService := services.NewOrderService(orderRepo)
	orderController := controllers.NewOrderControllers(orderService)

	return &App{
		AuthController:   authController,
		ReviewController: reviewController,
		WisataController: wisataController,
		OrderController:  orderController,
	}
}