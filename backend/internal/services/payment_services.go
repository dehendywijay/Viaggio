package services

import (
	"fmt"
	"triptix/internal/repository"

	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
)

type PaymentService struct {
	r    *repository.PaymentRepository
	Snap *snap.Client
}

func NewPaymentService(r *repository.PaymentRepository, snap *snap.Client) *PaymentService {
	return &PaymentService{
		r: r,
	}
}

func (p *PaymentService) Payment(ID uint) (*snap.Response, error) {
	result, err := p.r.CekPayment(ID)
	if err != nil {
		return nil, err
	}

	if result.Status != "pending" {
		return nil, fmt.Errorf("status not pending")
	}

	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  fmt.Sprintf("ORDER-%d", result.ID),
			GrossAmt: int64(result.TotalHarga),
		},
	}
	token, err := p.Snap.CreateTransaction(req)

	return token, nil

}
