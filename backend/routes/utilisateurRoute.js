// routes/utilisateurRoutes.js
const express = require('express');
const router = express.Router();
const utilisateurController = require('../controller/utilisateurController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public routes
router.post('/signup', utilisateurController.signup);
router.post('/login', utilisateurController.login);
///router.post('/check-email', utilisateurController.checkEmail);

// Admin routes
router.post('/createAdmin', authMiddleware, adminMiddleware, utilisateurController.addAdmin);
router.get('/', authMiddleware, adminMiddleware, utilisateurController.getAllUtilisateurs);
router.get('/:id', authMiddleware, adminMiddleware, utilisateurController.getUtilisateurById);
router.put('/:id', authMiddleware, adminMiddleware, utilisateurController.updateUtilisateur);
router.delete('/:id', authMiddleware, adminMiddleware, utilisateurController.deleteUtilisateur);
router.get('/me', authMiddleware, utilisateurController.getCurrentUser);

module.exports = router;
