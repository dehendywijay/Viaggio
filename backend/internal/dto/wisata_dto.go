package dto

type AllWisataResponse struct {
	ID uint `json:"id"`
	Nama string `json:"nama"`
	Alamat string `json:"alamat"`
	Harga int `json:"harga"`
	Kategori string `json:"kategori"`
	Foto string `json:"foto"`
}

type CreateWisataRequest struct {
	Nama string `form:"nama" binding:"required"`
	Alamat string `form:"alamat" binding:"required"`
	Deskripsi string `form:"deskripsi" binding:"required"`
	Durasi int `form:"durasi" binding:"required"`
	Jenis string `form:"jenis" binding:"required"`
	Harga int `form:"harga" binding:"required"`
	Kategori string `form:"kategori" binding:"required"`
}