package controllers

import (
	"mime/multipart"
	"net/http"
	"strconv"
	"triptix/internal/models"
	"triptix/internal/services"

	"github.com/gin-gonic/gin"
)

type WisataControllers struct {
	s *services.WisataService
}

func NewWisataControllers(s *services.WisataService) *WisataControllers {
	return &WisataControllers{
		s: s,
	}
}

func (h *WisataControllers) CreateWisata(c *gin.Context) {
	nama := c.PostForm("nama")
	alamat := c.PostForm("alamat")
	deskripsi := c.PostForm("deskripsi")
	durasi := c.PostForm("durasi")
	jenis := c.PostForm("jenis")
	harga := c.PostForm("harga")
	kategori := c.PostForm("kategori")

	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "S"})
		return
	}

	files := form.File["fotos"]
	durasii, err := strconv.Atoi(durasi)
	if err != nil {
		return
	}
	hargaa, err := strconv.Atoi(harga)
	if err != nil {
		return
	}

	if nama == "" || alamat == "" || deskripsi == "" || durasi == "" || jenis == "" || harga == "" || kategori == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Semua field harus diisi"})
		return
	}
	wisata := models.Wisata{
		Nama:      nama,
		Alamat:    alamat,
		Deskripsi: deskripsi,
		Durasi:    durasii,
		Jenis:     jenis,
		Harga:     hargaa,
		Kategori:  kategori,
	}

	result, err := h.s.CreateWisata(wisata, files)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Data wisata berhasil dibuat",
		"data":    result,
	})

}

func (h *WisataControllers) EditWisata(c *gin.Context) {

	id := c.Param("id")

	idd, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "id tidak valid",
		})
		return
	}

	durasi, err := strconv.Atoi(c.PostForm("durasi"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "durasi harus angka",
		})
		return
	}

	harga, err := strconv.Atoi(c.PostForm("harga"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "harga harus angka",
		})
		return
	}

	wisata := models.Wisata{
		Nama:      c.PostForm("nama"),
		Alamat:    c.PostForm("alamat"),
		Deskripsi: c.PostForm("deskripsi"),
		Durasi:    durasi,
		Jenis:     c.PostForm("jenis"),
		Harga:     harga,
		Kategori:  c.PostForm("kategori"),
	}

	form, _ := c.MultipartForm()

	var files []*multipart.FileHeader

	if form != nil {
		files = form.File["fotos"]
	}

	fileEdit, _ := c.FormFile("fotoEdit")

	err = h.s.EditWisata(
		uint(idd),
		c.PostForm("id_foto"),
		wisata,
		files,
		fileEdit,
		c,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "wisata berhasil diupdate",
		"success": true,
	})
}

func (h *WisataControllers) GetAllWisata(c *gin.Context) {
	wisata, err := h.s.GetAllWisata()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Gagal mengambil data wisata",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": wisata,
	})
}

func (h *WisataControllers) GetWisataByID(c *gin.Context) {
	id := c.Param("id")
	wisata, err := h.s.GetWisataByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Data wisata tidak ditemukan",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": wisata,
	})
}
