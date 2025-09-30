const authService = require('../services/authService');

const authController = {
  // Registrasi user
  register: async (req, res) => {
    try {
      const { email, password, role } = req.body;

      // Validasi input
      if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password wajib diisi' });
      }

      if (password.length < 6) {
        return res.status(400).json({ message: 'Password minimal 6 karakter' });
      }

      // Registrasi user
      const user = await authService.register(email, password, role);
      res.status(201).json({ 
        message: 'Registrasi berhasil', 
        user: { id: user.id, email: user.email, role: user.role } 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validasi input
      if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password wajib diisi' });
      }

      // Login user
      const result = await authService.login(email, password);
      res.status(200).json({ 
        message: 'Login berhasil', 
        ...result 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = authController;