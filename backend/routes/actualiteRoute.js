// routes/actualiteRoutes.js

const express = require('express');
const router = express.Router();
const actualiteController = require('../controller/actualiteController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');


// POST /api/actualites - Create new actualite with file upload
router.post('/', upload.single('file'), authMiddleware, adminMiddleware, actualiteController.createActualite);

// GET /api/actualites - Retrieve all actualites
router.get('/',authMiddleware, adminMiddleware,  actualiteController.getActualites);

// GET /api/actualites - Retrieve actualite by id
router.get('/:id',authMiddleware, adminMiddleware,  actualiteController.getActualiteById);

// PUT /api/actualites/:id - Update an actualite by ID with optional file upload
router.put('/:id', upload.single('file'),authMiddleware, adminMiddleware,  actualiteController.updateActualite);

// DELETE /api/actualites/:id - Delete an actualite by ID
router.delete('/:id',authMiddleware, adminMiddleware,  actualiteController.deleteActualite);

module.exports = router;

