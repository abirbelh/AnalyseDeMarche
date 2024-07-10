// controllers/actualiteController.js

const Actualite = require('../models/actualiteModel');

// Create new actualite with file upload using express-fileupload
exports.createActualite = async (req, res) => {
    try {
        console.log('Request body:', req.body); // Log body
        console.log('Request file:', req.file); // Log file

        const { title, content } = req.body;

        if (!req.file) {
            return res.status(400).send({ message: 'No files were uploaded.' });
        }

        const file = req.file;  // Access uploaded file from req.file

        const newActualite = new Actualite({
            title,
            content,
            file: {
                data: file.buffer,         // Store binary data of the file
                contentType: file.mimetype,  // Store MIME type of the file
                filename: file.originalname  // Store original filename
            }
        });

        await newActualite.save();
        res.status(201).json(newActualite);
    } catch (err) {
        console.error('Error in createActualite:', err);
        res.status(500).json({ message: err.message });
    }
};



// Get all actualites
exports.getActualites = async (req, res) => {
    try {
        // Find all actualites and include only specific fields of the file
        const actualites = await Actualite.find({}, {
            'file.data': 0, // Exclude the binary data of the file
            'file._id': 0  // Optionally exclude the file's _id
        }).sort({ createdAt: -1 });
        res.json(actualites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Get entreprise from database by id
exports.getActualiteById = async(req, res) =>{
    try {
        const actualites = await Actualite.findById(req.params.id, {
            'file.data': 0, // Exclude the binary data of the file
            'file._id': 0  // Optionally exclude the file's _id
        }).sort({ createdAt: -1 });
        if (!actualites) {
            return res.status(404).json({ message: 'Entreprise not found!' });
          }
        res.status(200).json(actualites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update an actualite by ID
exports.updateActualite = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        let updateFields = { title, content };

        if (req.file) {
            updateFields.file = {
                data: req.file.buffer, // Use buffer to store the binary data
                contentType: req.file.mimetype,
                filename: req.file.originalname
            };
        }

        const updatedActualite = await Actualite.findByIdAndUpdate(id, updateFields, { new: true });
        res.json(updatedActualite);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Delete an actualite by ID
exports.deleteActualite = async (req, res) => {
    try {
        const { id } = req.params;
        await Actualite.findByIdAndDelete(id);
        res.json({ message: 'Actualite deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
