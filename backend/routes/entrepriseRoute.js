//../routes/entrepriseRoute.js
const express = require('express');
const router = express.Router();
const entrepriseController = require('../controller/entrepriseController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

//get all entreprise from the database
router.get('/', entrepriseController.getEntreprises);
//router.post('/fetch-and-update', authMiddleware, adminMiddleware, entrepriseController.fetchAndUpdateCompanyData);
router.get('/:id',entrepriseController.getEntrepriseById);

module.exports = router;