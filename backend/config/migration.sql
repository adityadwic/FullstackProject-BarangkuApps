ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user'));

ALTER TABLE barang ADD COLUMN IF NOT EXISTS image_url VARCHAR(500);

UPDATE users SET role = 'admin' WHERE id = 1 AND role IS NULL;
UPDATE users SET role = 'user' WHERE role IS NULL;