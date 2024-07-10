
const Entreprise = require('../models/entrepriseModel');
const { exec } = require('child_process');

//get all entreprise in the database 
exports.getEntreprises = async(req, res) =>{
    try {
        const entreprises = await Entreprise.find();
        res.status(200).json(entreprises);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//did not work and currently is not used 
exports.fetchAndUpdateCompanyData = (req, res) => {
    exec('node scripts/fetchAndUpdateCompanyData.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return res.status(500).send('Error fetching and updating company data.');
        }
        if (stderr) {
            console.error(`Script error: ${stderr}`);
            return res.status(500).send('Error fetching and updating company data.');
        }
        console.log(`Script output: ${stdout}`);
        res.send('Company data fetched and updated successfully.');
    });
};


//get entreprise from database by id
exports.getEntrepriseById = async(req, res) =>{
    try {
        const entreprise = await Entreprise.findById(req.params.id);
        if (!entreprise) {
            return res.status(404).json({ message: 'Entreprise not found!' });
          }
        res.status(200).json(entreprise);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
