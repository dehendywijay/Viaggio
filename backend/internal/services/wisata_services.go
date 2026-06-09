package services

import (
	"fmt"
	
	"triptix/internal/dto"
	"triptix/internal/models"
	"triptix/internal/repository"
	"triptix/pkg/storage"
	"triptix/pkg/utils"

)

type WisataService struct {
	r *repository.WisataRepository
}

func NewWisataService(r *repository.WisataRepository) *WisataService {
	return &WisataService{
		r: r,
	}
}

func (s *WisataService) CreateWisata(data *dto.CreateWisataRequest) error {

	wisata := models.Wisata{
		Nama:      data.Nama,
		Alamat:    data.Alamat,
		Harga:     data.Harga,
		Kategori:  data.Kategori,
		Jenis:     data.Jenis,
		Deskripsi: data.Deskripsi,
		Durasi:    data.Durasi,
	}

	result, err := s.r.CreateWisata(wisata)
	if err != nil {
		return fmt.Errorf("membuat wisata: %w", err)
	}

	for _, file := range data.Foto {
		fileBytes, objectPath, contentType, err := utils.ProcessImageUpload(file)
		if err != nil {
			return fmt.Errorf("process image: %w", err)
		}

		publicURL, err := storage.UploadToSupabase("wisata_image", objectPath, contentType, fileBytes)
		if err != nil {
			return fmt.Errorf("upload supabase: %w", err)
		}
		foto := models.Foto{
			WisataID: result,
			URL:      publicURL,
		}
		if err := s.r.CreateWisataFoto(foto); err != nil {
			return fmt.Errorf("create wisata foto: %w", err)
		}

	}

	return nil

}

func (s *WisataService) EditWisata(data *dto.UpdateWisataRequest, wisataID uint) error {

	wisata := models.Wisata{
		Nama:      data.Nama,
		Alamat:    data.Alamat,
		Harga:     data.Harga,
		Kategori:  data.Kategori,
		Jenis:     data.Jenis,
		Deskripsi: data.Deskripsi,
		Durasi:    data.Durasi,
	}
	err := s.r.EditWisata(wisataID,wisata,)

	if err != nil {
		return fmt.Errorf("update wisata: %w",err,)
	}
	
	if data.FotoEdit != nil {
		oldObjectPath, err := s.r.GetFotoWisata(wisataID,data.IDFotoChange,)
		if err != nil {
			return fmt.Errorf("get foto wisata: %w",err)
		}

		oldFoto := utils.ExtractObjectPath(oldObjectPath.URL,"wisata_image",)
		fileBytes,objectPath,contentType,err := utils.ProcessImageUpload(data.FotoEdit)

		if err != nil {
			return fmt.Errorf("process image update: %w",err,)
		}

		publicURL, err := storage.UpdateSupabaseFile(
			"wisata_image",
			oldFoto,
			objectPath,
			contentType,
			fileBytes,
		)

		if err != nil {
			return fmt.Errorf(
				"update supabase file: %w",
				err,
			)
		}

		foto := models.Foto{
			URL: publicURL,
		}

		err = s.r.UpdateWisataFoto(
			foto,
			data.IDFotoChange,
		)

		if err != nil {
			return fmt.Errorf(
				"update wisata foto: %w",
				err,
			)
		}
	}

	for _, file := range data.Foto {

		fileBytes,
			objectPath,
			contentType,
			err := utils.ProcessImageUpload(file)

		if err != nil {
			return fmt.Errorf(
				"process image: %w",
				err,
			)
		}

		publicURL, err := storage.UploadToSupabase(
			"wisata_image",
			objectPath,
			contentType,
			fileBytes,
		)

		if err != nil {
			return fmt.Errorf(
				"upload supabase: %w",
				err,
			)
		}

		foto := models.Foto{
			WisataID: wisataID,
			URL:      publicURL,
		}

		err = s.r.CreateWisataFoto(foto)
		if err != nil {
			return fmt.Errorf(
				"create wisata foto: %w",
				err,
			)
		}
	}

	return nil
}

func (s *WisataService) GetAllWisata() ([]dto.AllWisataResponse, error) {
	return s.r.GetAllWisata()
}

func (s *WisataService) GetWisataByID(id string) (models.Wisata, error) {
	return s.r.GetWisataByID(id)
}
