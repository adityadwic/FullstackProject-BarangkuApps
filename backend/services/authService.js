const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const authService = {
  // Registrasi user baru
  register: async (email, password, role = 'user') => {
    try {
      // Cek apakah user sudah ada
      const existingUser = await User.findByEmail(email);
      if (existingUser.rows.length > 0) {
        throw new Error('Email sudah terdaftar');
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Simpan user baru
      const newUser = await User.create(email, hashedPassword, role);
      return newUser.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      // Cek apakah user ada
      const user = await User.findByEmail(email);
      if (user.rows.length === 0) {
        throw new Error('Email atau password salah');
      }

      // Verifikasi password
      const isMatch = await bcrypt.compare(password, user.rows[0].password);
      if (!isMatch) {
        throw new Error('Email atau password salah');
      }

      // Buat token JWT
      const token = jwt.sign(
        { id: user.rows[0].id },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: '1h' }
      );

      return {
        token,
        user: { id: user.rows[0].id, email: user.rows[0].email, role: user.rows[0].role }
      };
    } catch (error) {
      throw error;
    }
  }
};

module.exports = authService;