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

func (r *WisataRepository) CreateWisata(data models.Wisata) (models.Wisata, error) {
	err := r.GormDB.Create(&data).Error
	return data, err
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

	return response, err
}


func (r *WisataRepository) GetWisataByID(id string) (models.Wisata, error) {
	var wisata models.Wisata
	err := r.GormDB.Preload("Fotos").First(&wisata, id).Error
	return wisata, err
}

func (r *WisataRepository) CreateWisataFoto(
	data models.Foto,
) error {

	return r.GormDB.Create(&data).Error
}

func (r *WisataRepository) UpdateWisataFoto(
	data models.Foto,
	id string,
) error {

	return r.GormDB.
		Model(&models.Foto{}).
		Where("id = ?", id).
		Updates(data).Error
}

func (r *WisataRepository) EditWisata(
	id uint,
	data models.Wisata,
) (models.Wisata, error) {

	var wisata models.Wisata

	err := r.GormDB.
		Where("id = ?", id).
		First(&wisata).Error

	if err != nil {
		return models.Wisata{},
			fmt.Errorf("find wisata: %w", err)
	}

	err = r.GormDB.
		Model(&wisata).
		Updates(data).Error

	if err != nil {
		return models.Wisata{},
			fmt.Errorf("update wisata: %w", err)
	}

	return wisata, nil
}

func (r *WisataRepository) GetFotoWisata(id uint, idfoto string) (models.Foto, error){
	var fotos models.Foto

	err := r.GormDB.Where("wisata_id = ?", id).Find(&fotos, idfoto).Error
	return fotos, err
}


