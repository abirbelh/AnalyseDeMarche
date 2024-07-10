//../routes/performancesFinanciereRoute.js

const express = require('express');
const router = express.Router();
const performanceFinanciereController = require('../controller/performanceFinanciereController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Create a new performance financiere record
router.post('/', authMiddleware, adminMiddleware, performanceFinanciereController.createPerformanceFinanciere);

// Get all performance financiere records
router.get('/', performanceFinanciereController.getPerformanceFinancieres);

// Get performance financiere record by ID
router.get('/:id', performanceFinanciereController.getPerformanceFinanciereById);

// Update performance financiere record by ID
router.put('/:id', authMiddleware, adminMiddleware, performanceFinanciereController.updatePerformanceFinanciere);

// Delete performance financiere record by ID
router.delete('/:id', authMiddleware, adminMiddleware, performanceFinanciereController.deletePerformanceFinanciere);

module.exports = router;
