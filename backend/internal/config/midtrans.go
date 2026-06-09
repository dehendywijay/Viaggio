package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
)

var SnapClient snap.Client

func InitMidtrans() {
	err := godotenv.Load("../../.env")
	if err != nil {
		log.Println(".env tidak ditemukan")
	}

	dsn := os.Getenv("DATABASE_URL")
	SnapClient.New(
		dsn,
		midtrans.Sandbox,
	)
}