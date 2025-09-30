-- Migration untuk membuat tabel users dan barang di Supabase

-- Tabel users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel barang
CREATE TABLE IF NOT EXISTS barang (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  harga DECIMAL(10, 2) NOT NULL,
  deskripsi TEXT,
  stok INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index untuk kolom email di tabel users untuk performansi
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Sample data untuk testing
INSERT INTO users (email, password) VALUES 
('admin@example.com', '$2b$10$8K1p/aWd6K4y2d9hKHfUleUaK6p9hKHfUleUaK6p9hKHfUleUaK6p9h') -- password yang di-hash
ON CONFLICT (email) DO NOTHING;

INSERT INTO barang (nama, harga, deskripsi, stok) VALUES 
('Laptop', 10000000, 'Laptop gaming terbaru', 10),
('Mouse', 150000, 'Mouse wireless', 50),
('Keyboard', 300000, 'Keyboard mekanik', 30)
ON CONFLICT (id) DO NOTHING;