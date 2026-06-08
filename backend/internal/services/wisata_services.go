package services

import (
	"fmt"

	"mime/multipart"
	"triptix/internal/dto"
	"triptix/internal/models"
	"triptix/internal/repository"
	"triptix/pkg/storage"
	"triptix/pkg/utils"

	"github.com/gin-gonic/gin"
)
 
type WisataService struct {
	r *repository.WisataRepository
}

func NewWisataService(r *repository.WisataRepository) *WisataService {
	return &WisataService{
		r: r,
	}
}

	
func (s *WisataService) CreateWisata(data *dto.CreateWisataRequest) (models.Wisata, error) {

	wisata := models.Wisata{
		Nama:     data.Nama,
		Alamat:   data.Alamat,
		Harga:    data.Harga,
		Kategori: data.Kategori,
		Jenis:    data.Jenis,
		Deskripsi: data.Deskripsi,
		Durasi:   data.Durasi,
	}

	result, err := s.r.CreateWisata(wisata)
	if err != nil {
		return models.Wisata{},
			fmt.Errorf("membuat wisata: %w", err)
	}

	for _, file := range data.Foto {
		fileBytes, objectPath, contentType, err := utils.ProcessImageUpload(file)
		if err != nil {
			return models.Wisata{},
				fmt.Errorf("process image: %w", err)
		}

		publicURL, err := storage.UploadToSupabase("wisata_image", objectPath, contentType, fileBytes)
		if err != nil {
			return models.Wisata{},
				fmt.Errorf("upload supabase: %w", err)
		}
		foto := models.Foto{
			WisataID: result.ID,
			URL:      publicURL,
		}
		if err := s.r.CreateWisataFoto(foto); err != nil {
			return models.Wisata{},
				fmt.Errorf("create wisata foto: %w", err)
		}

	}

	return result, nil

}

func (s *WisataService) EditWisata(
	wisataID uint,
	idFoto string,
	wisata models.Wisata,
	files []*multipart.FileHeader,
	fileEdit *multipart.FileHeader,
	c *gin.Context,
) error {

	_, err := s.r.EditWisata(
		wisataID,
		wisata,
	)

	if err != nil {
		return fmt.Errorf(
			"update wisata: %w",
			err,
		)
	}
	if fileEdit != nil {

		oldObjectPath, err := s.r.GetFotoWisata(
			wisataID,
			idFoto,
		)

		if err != nil {
			return fmt.Errorf(
				"get foto wisata: %w",
				err,
			)
		}

		oldFoto := utils.ExtractObjectPath(
			oldObjectPath.URL,
			"wisata_image",
		)

		fileBytes,
			objectPath,
			contentType,
			err := utils.ProcessImageUploadUpdate(
			c,
			"fotoEdit",
		)

		if err != nil {
			return fmt.Errorf(
				"process image update: %w",
				err,
			)
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
			idFoto,
		)

		if err != nil {
			return fmt.Errorf(
				"update wisata foto: %w",
				err,
			)
		}
	}

	for _, file := range files {

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
