const db = require('../config/db');

// Model untuk Barang
const Barang = {
  // Mengambil semua barang dengan search, filter, dan pagination
  getAll: (search = '', minPrice = 0, maxPrice = 999999999, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    let query = `
      SELECT * FROM barang 
      WHERE nama ILIKE $1 
      AND harga >= $2 
      AND harga <= $3 
      ORDER BY created_at DESC 
      LIMIT $4 OFFSET $5
    `;
    return db.query(query, [`%${search}%`, minPrice, maxPrice, limit, offset]);
  },

  // Mengambil total count untuk pagination
  getCount: (search = '', minPrice = 0, maxPrice = 999999999) => {
    const query = `
      SELECT COUNT(*) FROM barang 
      WHERE nama ILIKE $1 
      AND harga >= $2 
      AND harga <= $3
    `;
    return db.query(query, [`%${search}%`, minPrice, maxPrice]);
  },

  // Mengambil barang berdasarkan ID
  getById: (id) => {
    const query = 'SELECT * FROM barang WHERE id = $1';
    return db.query(query, [id]);
  },

  // Membuat barang baru
  create: (nama, harga, deskripsi, stok, image_url = null) => {
    const query = 'INSERT INTO barang (nama, harga, deskripsi, stok, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    return db.query(query, [nama, harga, deskripsi, stok, image_url]);
  },

  // Memperbarui barang
  update: (id, nama, harga, deskripsi, stok, image_url = null) => {
    let query, params;
    if (image_url !== null) {
      query = 'UPDATE barang SET nama = $1, harga = $2, deskripsi = $3, stok = $4, image_url = $5 WHERE id = $6 RETURNING *';
      params = [nama, harga, deskripsi, stok, image_url, id];
    } else {
      query = 'UPDATE barang SET nama = $1, harga = $2, deskripsi = $3, stok = $4 WHERE id = $5 RETURNING *';
      params = [nama, harga, deskripsi, stok, id];
    }
    return db.query(query, params);
  },

  // Menghapus barang
  delete: (id) => {
    const query = 'DELETE FROM barang WHERE id = $1 RETURNING *';
    return db.query(query, [id]);
  }
};

module.exports = Barang;