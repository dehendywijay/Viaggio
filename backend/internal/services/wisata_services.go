package services

import (
	"fmt"

	"mime/multipart"
	"triptix/internal/models"
	"triptix/internal/repository"
	"triptix/pkg/storage"
	"triptix/pkg/utils"

	"github.com/gin-gonic/gin"
)
 
func CreateWisata(data models.Wisata, files[] *multipart.FileHeader) (models.Wisata, error) {
	result, err := repository.CreateWisata(data)
	if err != nil {
		return models.Wisata{},
			fmt.Errorf("membuat wisata: %w", err)
	}

	for _, file := range files {
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
		if err := repository.CreateWisataFoto(foto); err != nil {
			return models.Wisata{},
				fmt.Errorf("create wisata foto: %w", err)
		}

	}

	return result, nil

}

func EditWisata(
	wisataID uint,
	idFoto string,
	wisata models.Wisata,
	files []*multipart.FileHeader,
	fileEdit *multipart.FileHeader,
	c *gin.Context,
) error {

	_, err := repository.EditWisata(
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

		oldObjectPath, err := repository.GetFotoWisata(
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

		err = repository.UpdateWisataFoto(
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

		err = repository.CreateWisataFoto(foto)
		if err != nil {
			return fmt.Errorf(
				"create wisata foto: %w",
				err,
			)
		}
	}

	return nil
}

