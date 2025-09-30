const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const barangRoutes = require('./routes/barang');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rute
app.use('/api/auth', authRoutes);
app.use('/api/barang', barangRoutes);

// Rute untuk health check
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server berjalan dengan baik' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Rute tidak ditemukan' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server berjalan di port ${PORT} pada semua network interfaces`);
  console.log(`Local: http://localhost:${PORT}`);
  console.log(`Network: http://192.168.100.120:${PORT}`);
});