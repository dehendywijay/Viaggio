package main

import (
	"os"
	"triptix/internal/config"
	"triptix/internal/middleware"
	"triptix/internal/models"
	"triptix/internal/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	
	db, err := config.ConnectDB()
	if err != nil {
		panic(err)
	}
	// redisClient, err := config.ConnectRedis()
	// if err != nil {
	// 	panic(err)
	// }
	db.AutoMigrate(&models.Wisata{}, &models.User{}, &models.Foto{}, &models.Review{}, &models.Order{}, &models.OrderItem{})
	app := config.BootstrapApp(db)
	routes.SetupRoutes(r, app)
	

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r.Run(":" + port)
}
