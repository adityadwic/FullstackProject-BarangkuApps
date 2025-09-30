const { Pool } = require('pg');
require('dotenv').config();

// Konfigurasi connection pooling untuk Supabase
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'db.ccbjbucgmpkavxlesfed.supabase.co',
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD || 'Admin_123',
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false
  },
  // Konfigurasi connection pooling
  max: 20, // ukuran maksimum pool
  idleTimeoutMillis: 30000, // waktu tunggu sebelum koneksi idle ditutup
  connectionTimeoutMillis: 10000, // waktu tunggu sebelum timeout (increased to 10s)
  acquireTimeoutMillis: 10000, // waktu tunggu untuk mendapatkan koneksi
  keepAlive: true,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};