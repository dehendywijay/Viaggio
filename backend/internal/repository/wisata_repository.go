package repository

import (
	"fmt"

	"triptix/internal/dto"
	"triptix/internal/models"

	"gorm.io/gorm"
)

type WisataRepository struct {
	GormDB *gorm.DB
}

func NewWisataRepository(db *gorm.DB) *WisataRepository {
	return &WisataRepository{
		GormDB: db,
	}
}

func (r *WisataRepository) CreateWisata(data models.Wisata) (uint, error) {
	var ID uint
	err := r.GormDB.Create(&data).Scan(&ID).Error
	if err != nil {
		return 0, fmt.Errorf("Gagal menambahkan Data %s", err)
	}
	return ID, nil
}

func (r *WisataRepository) GetAllWisata() ([]dto.AllWisataResponse, error) {
	var response []dto.AllWisataResponse

	err := r.GormDB.
		Table("wisata").
		Select(`
			wisata.id,
			wisata.nama,
			wisata.alamat,
			wisata.harga,
			wisata.kategori,
			(
				SELECT fotos.url
				FROM fotos
				WHERE fotos.wisata_id = wisata.id
				ORDER BY fotos.id ASC
				LIMIT 1
			) AS foto
		`).
		Scan(&response).Error

	if err != nil {
		return nil, fmt.Errorf("Gagal Mengambil data %s", err)
	}
	return response, nil
}

func (r *WisataRepository) GetWisataByID(id string) (models.Wisata, error) {
	var wisata models.Wisata
	err := r.GormDB.Preload("Fotos").First(&wisata, id).Error
	if err != nil {
		return models.Wisata{}, fmt.Errorf("get wisata: %w", fmt.Errorf("Gagal Mengambil Wisata"))
	}
	return wisata, err
}

func (r *WisataRepository) CreateWisataFoto(data models.Foto) error {
	err := r.GormDB.Create(&data).Error
	if err != nil {
		return fmt.Errorf("create foto Gagal: %w", err)
	}
	return nil
}

func (r *WisataRepository) UpdateWisataFoto(data models.Foto, id int) error {
	err := r.GormDB.Model(&models.Foto{}).Where("id = ?", id).Updates(data).Error
	if err != nil {
		return fmt.Errorf("update foto Gagal: %w", err)
	}
	return nil
}

func (r *WisataRepository) EditWisata(id uint, data models.Wisata) error {
	var wisata models.Wisata

	err := r.GormDB.Where("id = ?", id).First(&wisata).Error

	if err != nil {
		return fmt.Errorf("find wisata: %w", err)
	}

	err = r.GormDB.Model(&wisata).Updates(data).Error

	if err != nil {
		return fmt.Errorf("update wisata: %w", err)
	}

	return nil
}

func (r *WisataRepository) GetFotoWisata(id uint, idfoto int) (models.Foto, error) {
	var fotos models.Foto

	err := r.GormDB.Where("wisata_id = ?", id).Find(&fotos, idfoto).Error
	if err != nil {
		return models.Foto{}, fmt.Errorf("get foto error: %w", err)
	}
	return fotos, nil
}
