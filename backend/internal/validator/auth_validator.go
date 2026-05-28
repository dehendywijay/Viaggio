package validator

import (
	"errors"
	"regexp"
	"strings"
	"triptix/internal/dto"
)

func ValidateRegister(req *dto.RegisterRequest) error {

	namaRegex := regexp.MustCompile(`^[a-zA-Z\s]+$`)

	if !namaRegex.MatchString(req.Nama) {
		return errors.New("nama tidak boleh mengandung angka atau simbol")
	}

	if !strings.HasSuffix(req.Email, "@gmail.com") {
		return errors.New("email harus menggunakan @gmail.com")
	}

	if len(req.Password) < 6 {
		return errors.New("password harus lebih dari 6 karakter")
	}

	upperRegex := regexp.MustCompile(`[A-Z]`)
	if !upperRegex.MatchString(req.Password) {
		return errors.New("password harus memiliki minimal 1 huruf besar")
	}

	numberRegex := regexp.MustCompile(`[0-9]`)
	if !numberRegex.MatchString(req.Password) {
		return errors.New("password harus memiliki minimal 1 angka")
	}

	return nil
}