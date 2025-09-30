const Barang = require('../models/Barang');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Konfigurasi multer untuk image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'barang-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Hanya file gambar yang diizinkan'));
    }
  }
});

const barangController = {
  // Upload middleware
  upload: upload.single('image'),

  // Mendapatkan semua barang dengan search, filter, dan pagination
  getAll: async (req, res) => {
    try {
      const { 
        search = '', 
        minPrice = 0, 
        maxPrice = 999999999, 
        page = 1, 
        limit = 10 
      } = req.query;

      const result = await Barang.getAll(search, minPrice, maxPrice, page, limit);
      const countResult = await Barang.getCount(search, minPrice, maxPrice);
      
      const totalItems = parseInt(countResult.rows[0].count);
      const totalPages = Math.ceil(totalItems / limit);

      res.status(200).json({
        data: result.rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems,
          limit: parseInt(limit)
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Mendapatkan barang berdasarkan ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Barang.getById(id);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Barang tidak ditemukan' });
      }
      
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Membuat barang baru (hanya admin)
  create: async (req, res) => {
    try {
      const { nama, harga, deskripsi, stok } = req.body;

      // Validasi input
      if (!nama || !harga) {
        return res.status(400).json({ message: 'Nama dan harga wajib diisi' });
      }

      // Handle image upload
      let image_url = null;
      if (req.file) {
        image_url = `/uploads/${req.file.filename}`;
      }

      const result = await Barang.create(nama, parseFloat(harga), deskripsi, parseInt(stok) || 0, image_url);
      res.status(201).json({ message: 'Barang berhasil ditambahkan', barang: result.rows[0] });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Memperbarui barang (hanya admin)
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nama, harga, deskripsi, stok } = req.body;

      // Validasi input
      if (!nama || !harga) {
        return res.status(400).json({ message: 'Nama dan harga wajib diisi' });
      }

      // Handle image upload
      let image_url = null;
      if (req.file) {
        image_url = `/uploads/${req.file.filename}`;
      }

      const result = await Barang.update(id, nama, parseFloat(harga), deskripsi, parseInt(stok) || 0, image_url);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Barang tidak ditemukan' });
      }
      
      res.status(200).json({ message: 'Barang berhasil diperbarui', barang: result.rows[0] });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Menghapus barang (hanya admin)
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Barang.delete(id);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Barang tidak ditemukan' });
      }
      
      res.status(200).json({ message: 'Barang berhasil dihapus' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = barangController;