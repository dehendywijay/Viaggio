package main

import (
	"os"
	"triptix/config"
	"triptix/internal/middleware"
	"triptix/internal/models"
	"triptix/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	
	db, err := config.ConnectDB()
	if err != nil {
		panic(err)
	}
	db.AutoMigrate(&models.Wisata{}, &models.User{}, &models.Foto{}, &models.Review{},)
	app := config.BootstrapApp(db)
	routes.SetupRoutes(r, app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r.Run(":" + port)
}
