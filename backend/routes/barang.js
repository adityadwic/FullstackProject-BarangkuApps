const express = require('express');
const auth = require('../middleware/auth');
const { requireAdmin, getUserInfo } = require('../middleware/rbac');
const barangController = require('../controllers/barangController');

const router = express.Router();

// Rute yang dapat diakses semua user yang login (read-only untuk user biasa)
router.get('/', getUserInfo, barangController.getAll);
router.get('/:id', getUserInfo, barangController.getById);

// Rute yang hanya dapat diakses admin (CRUD operations)
router.post('/', requireAdmin, barangController.upload, barangController.create);
router.put('/:id', requireAdmin, barangController.upload, barangController.update);
router.delete('/:id', requireAdmin, barangController.delete);

module.exports = router;