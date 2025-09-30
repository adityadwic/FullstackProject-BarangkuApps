# 🚀 Barang Management System - Full Stack Web Application

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-13.5.11-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-blue?style=for-the-badge&logo=postgresql)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.2.7-38B2AC?style=for-the-badge&logo=tailwind-css)

**A modern, responsive inventory management system built with cutting-edge web technologies**

[🌟 Live Demo](#) | [📚 Documentation](#features) | [🚀 Quick Start](#quick-start) | [📊 GitHub Repository](https://github.com/adityadwic/FullstackProject-BarangkuApps)

</div>

---

## 📋 Overview

A comprehensive full-stack web application for inventory management featuring modern authentication, role-based access control, and intuitive CRUD operations. Built with industry-standard technologies and best practices.

### 🎯 Key Highlights
- 🔐 **Secure Authentication** - JWT-based auth with role management
- 📱 **Responsive Design** - Mobile-first PWA with glassmorphism UI
- 🖼️ **Image Upload** - Integrated file handling with preview
- 🔍 **Advanced Search** - Real-time filtering and pagination
- ⚡ **Performance Optimized** - Fast loading with modern React patterns
- 🛡️ **Security First** - Input validation, sanitization, and protection

---

## ✨ Features

### 🔐 Authentication & Authorization
- [x] User registration and login system
- [x] JWT token-based authentication
- [x] Role-based access control (Admin/User)
- [x] Password hashing with bcrypt
- [x] Protected routes and middleware

### 📦 Inventory Management
- [x] Create, Read, Update, Delete (CRUD) operations
- [x] Image upload and management
- [x] Real-time search and filtering
- [x] Pagination for large datasets
- [x] Category-based organization
- [x] Stock tracking and management

### 🎨 User Experience
- [x] Modern glassmorphism design
- [x] Responsive layout (mobile, tablet, desktop)
- [x] Progressive Web App (PWA) features
- [x] Loading states and error handling
- [x] Intuitive navigation and breadcrumbs
- [x] Dark/light theme ready

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 13 (App Router)
- **Library**: React 18 (Hooks, Context)
- **Styling**: TailwindCSS 3 + Custom Components
- **HTTP Client**: Axios
- **State Management**: React useState/useEffect
- **Routing**: Next.js Pages Router

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Supabase)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs
- **File Upload**: Multer
- **Validation**: Express Validator

### Database & Deployment
- **Database**: Supabase PostgreSQL
- **File Storage**: Local/Cloudinary ready
- **Deployment Ready**: Vercel + Railway/Render
- **Environment**: Development & Production configs

---

## 🏗️ Architecture

```
FullstackProject-BarangkuApps/
├── 🖥️ frontend/              # Next.js Client Application
│   ├── 📄 pages/             # Application routes & components
│   │   ├── dashboard.js      # Main inventory dashboard
│   │   ├── login.js          # Authentication page
│   │   ├── register.js       # User registration
│   │   ├── tambah-barang.js  # Add new item page
│   │   └── edit-barang/      # Edit item pages
│   ├── 🧩 components/        # Reusable UI components
│   │   ├── BarangCard.js     # Product display card
│   │   ├── BarangForm.js     # Product create/edit form
│   │   ├── DashboardLayout.js # Main layout wrapper
│   │   ├── Navbar.js         # Navigation component
│   │   ├── Sidebar.js        # Dashboard sidebar
│   │   └── SkeletonLoader.js # Loading components
│   ├── 🎨 styles/            # Global styles & utilities
│   ├── 📱 utils/             # Helper functions & API
│   └── 📁 src/               # Additional source files
│
├── ⚙️ backend/               # Express.js Server Application  
│   ├── 🎮 controllers/       # Business logic handlers
│   │   ├── authController.js # Authentication logic
│   │   └── barangController.js # Inventory operations
│   ├── 📊 models/            # Database models
│   ├── 🛣️ routes/            # API endpoint definitions
│   ├── 🔒 middleware/        # Authentication & validation
│   ├── ⚙️ config/            # Database & app configuration
│   ├── 📤 uploads/           # File upload directory
│   └── 🚀 server.js          # Application entry point
│
└── 📚 Documentation/         # Project documentation
    ├── API_DOCS.md          # API endpoint documentation
    ├── DEPLOYMENT.md        # Deployment instructions
    └── SUPABASE_SETUP.md    # Database setup guide
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL (or Supabase account)

### 1️⃣ Clone Repository
```bash
# Clone Repository
git clone https://github.com/adityadwic/FullstackProject-BarangkuApps.git
cd FullstackProject-BarangkuApps
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run development server
npm run dev
# Backend running at http://localhost:3001
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install

# Run development server  
npm run dev
# Frontend running at http://localhost:3000
```

### 4️⃣ Database Setup
```bash
# Import schema to your PostgreSQL database
psql -d your_database < backend/config/schema.sql

# Or use Supabase (recommended)
# Import backend/config/supabase_schema.sql via Supabase Dashboard
```

---

## 📖 API Documentation

### Authentication Endpoints
```bash
POST /api/auth/register    # User registration
POST /api/auth/login       # User authentication
```

### Inventory Endpoints
```bash
GET    /api/barang         # Get all items (with pagination/search)
POST   /api/barang         # Create new item (Admin only)
GET    /api/barang/:id     # Get specific item
PUT    /api/barang/:id     # Update item (Admin only)
DELETE /api/barang/:id     # Delete item (Admin only)
```

### Example Request/Response
```javascript
// GET /api/barang?page=1&limit=6&search=laptop
{
  "data": [
    {
      "id": 1,
      "nama": "Laptop Gaming",
      "deskripsi": "High-performance gaming laptop",
      "harga": 15000000,
      "kategori": "Electronics",
      "stok": 5,
      "image_url": "/uploads/laptop.jpg"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 15,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## 🎨 UI/UX Showcase

### Design Features
- **🌈 Glassmorphism**: Modern translucent design elements
- **📱 Mobile-First**: Responsive design for all devices  
- **🎯 Intuitive UX**: Clean navigation and user flows
- **⚡ Fast Loading**: Optimized components and lazy loading
- **♿ Accessibility**: ARIA labels and keyboard navigation

### Component Library
- Custom button system with hover effects
- Loading skeletons for better UX
- Toast notifications for user feedback
- Modal dialogs for confirmations
- Responsive data tables and cards

---

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# Authentication  
JWT_SECRET=your-super-secret-jwt-key

# File Upload
UPLOAD_PATH=./uploads

# Server
PORT=3001
NODE_ENV=development
```

**Frontend**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 🚀 Deployment

### Production Deployment (Free)
1. **Database**: Supabase (PostgreSQL)
2. **Backend**: Railway or Render
3. **Frontend**: Vercel
4. **Images**: Cloudinary

### Quick Deploy:
```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Deploy frontend to Vercel
# Connect GitHub repo at vercel.com

# 3. Deploy backend to Railway
# Connect GitHub repo at railway.app
```

See [DEPLOYMENT.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Admin vs User role permissions
- [ ] CRUD operations for inventory
- [ ] Image upload functionality
- [ ] Search and filtering
- [ ] Responsive design on mobile
- [ ] Error handling and validation

### Demo Accounts
```
Admin: admin@demo.com / demo123
User:  user@demo.com / demo123
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ‍💻 Author

**Aditya Dwi Cahyono**
- GitHub: [@adityadwic](https://github.com/adityadwic)
- Repository: [FullstackProject-BarangkuApps](https://github.com/adityadwic/FullstackProject-BarangkuApps)
- Email: adityadwicahyono@example.com

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Supabase](https://supabase.com/) for backend-as-a-service
- [TailwindCSS](https://tailwindcss.com/) for utility-first CSS
- [Vercel](https://vercel.com/) for seamless deployment

---

<div align="center">

**⭐ Star this repository if it helped you! ⭐**

Made with ❤️ and modern web technologies

</div>
```

## 🚀 Cara Menjalankan Aplikasi (SUDAH SIAP!)

Aplikasi sudah dikonfigurasi dan siap digunakan. Ikuti langkah berikut:

### 1. Start Backend Server

```bash
cd backend
npm install  # (jika belum)
npm start
```

✅ Backend akan berjalan di: **http://localhost:3001**

### 2. Start Frontend Server

Buka terminal baru:
```bash
cd frontend  
npm install  # (jika belum)
npm run dev
```

✅ Frontend akan berjalan di: **http://localhost:3000**

### 3. Akses Aplikasi

- **Homepage**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Register**: http://localhost:3000/register
- **Dashboard**: http://localhost:3000/dashboard (setelah login)

### 4. Test Account (Sudah Ada)

```
Email: test@example.com
Password: password123
```

## 🗄️ Database Configuration

Database sudah dikonfigurasi menggunakan **Supabase PostgreSQL**:

- **Host**: db.ccbjbucgmpkavxlesfed.supabase.co
- **Database**: postgres
- **User**: postgres
- **Port**: 5432
- **SSL**: Enabled

Skema database sudah dibuat dengan tabel:
- `users` - untuk authentication
- `barang` - untuk data barang
- Sample data sudah tersedia

2. Instal dependensi
```bash
npm install
```

3. Buat file `.env` dan konfigurasi variabel lingkungan
```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=barang_db
DB_PASSWORD=postgres
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

4. Jalankan server
```bash
npm start
# atau untuk mode development
npm run dev
```

Server akan berjalan di `http://localhost:5000`

### 4. Setup Frontend

1. Pindah ke direktori frontend
```bash
cd frontend
```

2. Instal dependensi
```bash
npm install
```

3. Buat file `.env.local` dan konfigurasi
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. Jalankan aplikasi development
```bash
npm run dev
```

Aplikasi frontend akan berjalan di `http://localhost:3000`

## Endpoint API

### Otentikasi
- `POST /api/auth/register` - Registrasi user baru
- `POST /api/auth/login` - Login user

### Barang (memerlukan otentikasi)
- `GET /api/barang` - Ambil semua barang
- `GET /api/barang/:id` - Ambil detail barang
- `POST /api/barang` - Tambah barang baru
- `PUT /api/barang/:id` - Edit barang
- `DELETE /api/barang/:id` - Hapus barang

## Cara Penggunaan

1. Buka browser dan akses `http://localhost:3000`
2. Klik "Register" untuk membuat akun baru
3. Setelah registrasi, klik "Login" untuk masuk
4. Setelah login, Anda akan diarahkan ke dashboard
5. Di dashboard, Anda bisa melihat, menambah, mengedit, atau menghapus barang

## Struktur Database

### Tabel users
| Field      | Type      | Note             |
| ---------- | --------- | ---------------- |
| id         | int (PK)  | Auto Increment   |
| email      | varchar   | Unique, required |
| password   | varchar   | Hashed           |
| created_at | timestamp | Default now      |

### Tabel barang
| Field      | Type      | Note           |
| ---------- | --------- | -------------- |
| id         | int (PK)  | Auto Increment |
| nama       | varchar   | Required       |
| harga      | decimal   | Required       |
| deskripsi  | text      | Optional       |
| stok       | int       | Default 0      |
| created_at | timestamp | Default now    |

## Testing

1. Registrasi akun baru di `/register`
2. Login dengan akun yang telah dibuat di `/login`
3. Tambahkan barang baru di `/tambah-barang`
4. Edit barang yang sudah ada di `/dashboard`
5. Hapus barang dari daftar di `/dashboard`

## Kontribusi

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/fitur-baru`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin feature/fitur-baru`)
5. Buat pull request

## Penulis

- Dibuat berdasarkan PRD yang diberikan

## Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.