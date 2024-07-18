const express = require('express');
const router = express.Router();
const utilisateurController = require('../controller/utilisateurController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public routes
router.post('/signup', utilisateurController.signup);
router.post('/login', utilisateurController.login);

// Protected route for the user
router.get('/me', authMiddleware, utilisateurController.getCurrentUser);

// Admin routes
router.post('/createAdmin', authMiddleware, adminMiddleware, utilisateurController.addAdmin);
router.post('/addUser', authMiddleware, adminMiddleware, utilisateurController.addUser);
router.get('/', authMiddleware, adminMiddleware, utilisateurController.getAllUtilisateurs);
router.get('/:id', authMiddleware, adminMiddleware, utilisateurController.getUtilisateurById);
router.put('/:id', authMiddleware, adminMiddleware, utilisateurController.updateUtilisateur);
router.delete('/:id', authMiddleware, adminMiddleware, utilisateurController.deleteUtilisateur);

module.exports = router;
