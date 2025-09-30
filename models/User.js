const db = require('../config/db');

// Model untuk Users
const User = {
  // Membuat user baru
  create: (email, hashedPassword, role = 'user') => {
    const query = 'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role';
    return db.query(query, [email, hashedPassword, role]);
  },

  // Mengambil user berdasarkan email
  findByEmail: (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    return db.query(query, [email]);
  },

  // Mengambil user berdasarkan ID
  findById: (id) => {
    const query = 'SELECT id, email, role FROM users WHERE id = $1';
    return db.query(query, [id]);
  }
};

module.exports = User;