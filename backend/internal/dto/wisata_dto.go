package dto

import "mime/multipart"

type AllWisataResponse struct {
	ID       uint   `json:"id"`
	Nama     string `json:"nama"`
	Alamat   string `json:"alamat"`
	Harga    int    `json:"harga"`
	Kategori string `json:"kategori"`
	Foto     string `json:"foto"`
}

type CreateWisataRequest struct {
	Nama      string                  `form:"nama" validate:"required"`
	Alamat    string                  `form:"alamat" validate:"required"`
	Deskripsi string                  `form:"deskripsi" validate:"required"`
	Durasi    int                     `form:"durasi" validate:"required"`
	Jenis     string                  `form:"jenis" validate:"required"`
	Harga     int                     `form:"harga" validate:"required"`
	Kategori  string                  `form:"kategori" validate:"required"`
	Foto      []*multipart.FileHeader `form:"fotos" validate:"required"`
}
