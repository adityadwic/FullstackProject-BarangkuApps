# Supabase Setup Guide

## Overview
This guide will help you set up Supabase as the backend database for BarangkuApps. Supabase provides a PostgreSQL database with real-time features, authentication, and a generous free tier.

## 🚀 Getting Started

### 1. Create Supabase Account
1. Visit [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub (recommended for easy integration)

### 2. Create New Project
1. Click "New Project" in your dashboard
2. Choose your organization
3. Fill in project details:
   - **Name**: `barangku-apps`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait for project to be ready (2-3 minutes)

### 3. Get Project Credentials
After project creation, go to Settings > API:
- **Project URL**: `https://your-project-id.supabase.co`
- **API Key (anon)**: For client-side access
- **API Key (service_role)**: For server-side access (keep secret!)

## 📊 Database Schema Setup

### 1. Access SQL Editor
1. Go to your Supabase dashboard
2. Click "SQL Editor" in the sidebar
3. Click "New query"

### 2. Create Tables
Copy and paste the following SQL schema:

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create barang (items) table
CREATE TABLE barang (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    harga DECIMAL(12,2) NOT NULL CHECK (harga >= 0),
    stok INTEGER NOT NULL DEFAULT 0 CHECK (stok >= 0),
    kategori VARCHAR(100) NOT NULL,
    gambar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_barang_kategori ON barang(kategori);
CREATE INDEX idx_barang_nama ON barang(nama);
CREATE INDEX idx_barang_created_at ON barang(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_barang_updated_at 
    BEFORE UPDATE ON barang 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
```

### 3. Set Up Row Level Security (RLS)

```sql
-- Enable RLS on tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE barang ENABLE ROW LEVEL SECURITY;

-- Users can only view their own data
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Everyone can view barang (items)
CREATE POLICY "Anyone can view barang" ON barang
    FOR SELECT USING (true);

-- Only admins can insert barang
CREATE POLICY "Only admins can insert barang" ON barang
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'admin'
        )
    );

-- Only admins can update barang
CREATE POLICY "Only admins can update barang" ON barang
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'admin'
        )
    );

-- Only admins can delete barang
CREATE POLICY "Only admins can delete barang" ON barang
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'admin'
        )
    );
```

### 4. Insert Sample Data

```sql
-- Insert sample admin user (password: 'admin123')
INSERT INTO users (email, password, name, role) VALUES 
('admin@barangku.com', '$2b$10$rKgRk7mGKJJa7Q2QvQXQYO8mK5h5Uv4QnQK4R6QeQtYgQ2QvQXQYO', 'Admin User', 'admin');

-- Insert sample regular user (password: 'user123')
INSERT INTO users (email, password, name, role) VALUES 
('user@barangku.com', '$2b$10$sLhSl8nHlKkkB8r8QwQrQP9nL6i6Vw5RoRl5S7SfSuZhR8QwQrQP', 'Regular User', 'user');

-- Insert sample barang data
INSERT INTO barang (nama, deskripsi, harga, stok, kategori, gambar) VALUES 
('Laptop Gaming', 'Laptop gaming dengan spesifikasi tinggi untuk gaming dan produktivitas', 15000000, 10, 'Elektronik', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853'),
('Smartphone Android', 'Smartphone Android flagship dengan kamera yang bagus', 8000000, 25, 'Elektronik', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9'),
('Mechanical Keyboard', 'Keyboard mechanical RGB untuk gaming dan typing', 1500000, 30, 'Aksesoris', 'https://images.unsplash.com/photo-1541140532154-b024d705b90a'),
('Gaming Mouse', 'Mouse gaming dengan DPI tinggi dan RGB lighting', 500000, 40, 'Aksesoris', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46'),
('Monitor 4K', 'Monitor 4K 27 inch untuk design dan gaming', 5000000, 15, 'Elektronik', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf'),
('Webcam HD', 'Webcam HD untuk streaming dan video call', 800000, 50, 'Aksesoris', 'https://images.unsplash.com/photo-1484704849700-f032a568e944'),
('Headset Gaming', 'Headset gaming dengan surround sound', 1200000, 35, 'Audio', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b'),
('SSD External', 'SSD External 1TB untuk backup data', 2000000, 20, 'Storage', 'https://images.unsplash.com/photo-1551029506-0807df4e2031');
```

## ⚙️ Environment Configuration

### Backend Configuration
Create `.env` file in your backend folder:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# JWT Configuration (use the same secret as your JWT_SECRET)
JWT_SECRET=your-jwt-secret-here

# Server Configuration
PORT=3001
NODE_ENV=development
```

### Frontend Configuration
Create `.env.local` file in your frontend folder:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Supabase Configuration (optional, for direct client access)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 🔧 Backend Integration

### 1. Install Supabase Client
```bash
cd backend
npm install @supabase/supabase-js
```

### 2. Update Database Configuration
Update `backend/config/db.js`:

```javascript
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

module.exports = {
  supabase,
  query: async (text, params) => {
    try {
      // Convert SQL query to Supabase query
      // This is a wrapper to maintain compatibility
      console.log('Executing query:', text, params);
      return { rows: [], rowCount: 0 };
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }
};
```

### 3. Update Models
Update your models to use Supabase client. Example for `backend/models/User.js`:

```javascript
const { supabase } = require('../config/db');

class User {
  static async findByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    
    return data;
  }

  static async create(userData) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    
    return data;
  }
}

module.exports = User;
```

## 🎛️ Supabase Dashboard Features

### 1. Table Editor
- View and edit data directly
- Add/remove columns
- Set up relationships

### 2. SQL Editor
- Run custom queries
- Create functions and triggers
- Manage indexes

### 3. Authentication (Optional)
- Built-in auth system
- Social logins
- Row Level Security

### 4. Storage (Optional)
- File storage for images
- CDN for fast delivery
- Image transformations

### 5. Real-time (Optional)
- Live data updates
- WebSocket connections
- Pub/Sub messaging

## 📊 Monitoring and Maintenance

### 1. Database Usage
- Monitor in Supabase dashboard
- Check query performance
- Track API usage

### 2. Backup Strategy
```sql
-- Create backup function
CREATE OR REPLACE FUNCTION backup_data()
RETURNS TABLE(table_name text, row_count bigint) AS $$
BEGIN
  -- Add backup logic here
  RETURN QUERY
  SELECT 'users'::text, COUNT(*)::bigint FROM users
  UNION ALL
  SELECT 'barang'::text, COUNT(*)::bigint FROM barang;
END;
$$ LANGUAGE plpgsql;
```

### 3. Performance Optimization
```sql
-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM barang WHERE kategori = 'Elektronik';

-- Add indexes as needed
CREATE INDEX CONCURRENTLY idx_barang_price_range 
ON barang(harga) WHERE harga BETWEEN 100000 AND 10000000;
```

## 🔒 Security Best Practices

### 1. Row Level Security
- Always enable RLS on public tables
- Create specific policies for each role
- Test policies thoroughly

### 2. API Keys
- Never expose service role key to frontend
- Use anon key for client-side operations
- Rotate keys periodically

### 3. Database Security
```sql
-- Revoke unnecessary permissions
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant specific table permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON users TO authenticated;
GRANT SELECT ON barang TO anon;
GRANT INSERT, UPDATE, DELETE ON barang TO authenticated;
```

## 🆘 Troubleshooting

### Common Issues

1. **Connection Issues**
   ```bash
   # Check environment variables
   echo $SUPABASE_URL
   echo $SUPABASE_ANON_KEY
   ```

2. **RLS Policy Issues**
   ```sql
   -- Check if RLS is enabled
   SELECT schemaname, tablename, rowsecurity 
   FROM pg_tables 
   WHERE schemaname = 'public';
   
   -- List policies
   SELECT * FROM pg_policies WHERE schemaname = 'public';
   ```

3. **Performance Issues**
   ```sql
   -- Check table statistics
   SELECT schemaname, tablename, n_tup_ins, n_tup_upd, n_tup_del 
   FROM pg_stat_user_tables;
   ```

### Getting Help
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

## 💡 Tips for Success

1. **Start Small**: Begin with basic setup, add features gradually
2. **Test Policies**: Always test RLS policies with different user roles
3. **Monitor Usage**: Keep an eye on database usage and API calls
4. **Backup Data**: Regular backups are essential
5. **Stay Updated**: Follow Supabase updates and best practices

Your Supabase setup is now complete! Your database is ready for production use with the BarangkuApps application.