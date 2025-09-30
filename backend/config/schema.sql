-- Skema database untuk aplikasi Full Stack Website - Login & CRUD Barang

-- Tabel users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel barang
CREATE TABLE IF NOT EXISTS barang (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  harga DECIMAL(10, 2) NOT NULL,
  deskripsi TEXT,
  stok INTEGER DEFAULT 0,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data untuk testing
INSERT INTO users (email, password, role) VALUES 
('admin@example.com', '$2b$10$8K1p/aWd6K4y2d9hKHfUleUaK6p9hKHfUleUaK6p9hKHfUleUaK6p9h', 'admin'), -- password yang di-hash
('user@example.com', '$2b$10$8K1p/aWd6K4y2d9hKHfUleUaK6p9hKHfUleUaK6p9hKHfUleUaK6p9h', 'user')
ON CONFLICT (email) DO NOTHING;

INSERT INTO barang (nama, harga, deskripsi, stok) VALUES 
('Laptop', 10000000, 'Laptop gaming terbaru', 10),
('Mouse', 150000, 'Mouse wireless', 50),
('Keyboard', 300000, 'Keyboard mekanik', 30)
ON CONFLICT (id) DO NOTHING;