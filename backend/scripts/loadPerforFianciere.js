//node scripts/loadPerforFianciere.js

const mongoose = require('mongoose');
const xlsx = require('xlsx');
const Entreprise = require('../models/entrepriseModel');
const PerformanceFinanciere = require('../models/performanceFinanciereModel');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/visionAnalytique', { useNewUrlParser: true, useUnifiedTopology: true });

const loadPerformanceFinanciereData = async (filePath) => {
  try {
    // Read the Excel file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Process each row in the Excel file
    for (const row of jsonData) {
      const { symbole, margeOp12M, chiffreAffaire, beneficeNet, coutVentes, capitalisationBoursiere} = row;

      // Find the entreprise by symbole
      const entreprise = await Entreprise.findOne({ symbole });
      if (!entreprise) {
        console.log(`Entreprise with symbole ${symbole} not found.`);
        continue;
      }

      // Create a new PerformanceFinanciere document
      const performanceFinanciere = new PerformanceFinanciere({
        entrepriseId: entreprise._id,
        margeOp12M,
        chiffreAffaire,
        beneficeNet,
        coutVentes,
        capitalisationBoursiere
      });

      // Save the PerformanceFinanciere document to the database
      await performanceFinanciere.save();
      console.log(`PerformanceFinanciere for entreprise ${symbole} saved successfully.`);
    }
  } catch (error) {
    console.error('Error loading performance financiere data:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Specify the path to your Excel file
const filePath = 'C:/Users/abir0/Documents/VisionAnalytique/backend/Imports/perfomanceFinanciere.xlsx';
loadPerformanceFinanciereData(filePath);
