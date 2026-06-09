package config

import (
	"os"

	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
)

func InitMidtrans() (*snap.Client,error) {
	var client snap.Client

	client.New(
		os.Getenv("MIDTRANS_SERVER_KEY"),
		midtrans.Sandbox,
	)

	return &client , nil
}