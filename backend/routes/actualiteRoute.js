// routes/actualiteRoutes.js

const express = require('express');
const router = express.Router();
const actualiteController = require('../controller/actualiteController');
const Actualite = require('../models/actualiteModel');
const multer = require('multer'); 
const upload = multer({ storage: multer.memoryStorage() });
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');


// POST /api/actualites - Create new actualite with file upload
router.post('/', upload.single('file'), authMiddleware, adminMiddleware, actualiteController.createActualite);

// GET /api/actualites - Retrieve all actualites
router.get('/',  actualiteController.getActualites);

// GET /api/actualites - Retrieve actualite by id
router.get('/:id',authMiddleware, adminMiddleware,  actualiteController.getActualiteById);

// PUT /api/actualites/:id - Update an actualite by ID with optional file upload
router.put('/:id', upload.single('file'),authMiddleware, adminMiddleware,  actualiteController.updateActualite);

// DELETE /api/actualites/:id - Delete an actualite by ID
router.delete('/:id',authMiddleware, adminMiddleware,  actualiteController.deleteActualite);

// Route to download a file
router.get('/:id/download', async (req, res) => {
    try {
        const actualite = await Actualite.findById(req.params.id);

        if (!actualite || !actualite.file) {
            return res.status(404).send('File not found');
        }

        res.setHeader('Content-Type', actualite.file.contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${actualite.file.filename}"`);
        res.send(actualite.file.data);
    } catch (error) {
        console.error('Error downloading file:', error);
        res.status(500).send('Error downloading file');
    }
});

module.exports = router;

