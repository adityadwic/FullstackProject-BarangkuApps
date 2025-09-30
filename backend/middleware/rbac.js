// middleware/rbac.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware untuk memeriksa apakah user adalah admin
const requireAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Token tidak ditemukan' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    const userResult = await User.findById(decoded.id);
    
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'User tidak ditemukan' });
    }

    const user = userResult.rows[0];
    
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Akses ditolak. Hanya admin yang diizinkan.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error dalam middleware requireAdmin:', error);
    res.status(401).json({ message: 'Token tidak valid' });
  }
};

// Middleware untuk mendapatkan user info (tanpa require admin)
const getUserInfo = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    const userResult = await User.findById(decoded.id);
    
    if (userResult.rows.length === 0) {
      req.user = null;
      return next();
    }

    req.user = userResult.rows[0];
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

module.exports = { requireAdmin, getUserInfo };