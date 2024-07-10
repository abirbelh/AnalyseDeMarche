// node scripts/loadCompanies.js

const mongoose = require('mongoose');
const xlsx = require('xlsx');
const Entreprise = require('../models/entrepriseModel');

mongoose.connect('mongodb://127.0.0.1:27017/visionAnalytique', {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
});

const workbook = xlsx.readFile('C:/Users/abir0/Documents/VisionAnalytique/backend/Imports/Entreprise.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

const entreprisesData = xlsx.utils.sheet_to_json(worksheet);
console.log(`Number of rows read from Excel: ${entreprisesData.length}`);

function getValueOrNull(value) {
    return value === undefined || value === '' ? null : value;
}

async function saveEntreprise() {
    try {
        const savePromises = entreprisesData.map(async (company) => {
            try {
                const newCompany = new Entreprise({
                    nom: getValueOrNull(company.Name),
                    symbole: getValueOrNull(company.Symbol),
                    industrie: getValueOrNull(company.industry),
                    secteur: getValueOrNull(company.sector),
                    nbrEmploye: getValueOrNull(company.fullTimeEmployees),
                    profilRisque: {
                        risqueAudit: getValueOrNull(company.auditRisk),
                        risqueConseilAdministration: getValueOrNull(company.boardRisk),
                        risqRemuneration: getValueOrNull(company.compensationRisk),
                        risqDroitsActionnaires: getValueOrNull(company.shareHolderRightsRisk),
                        risqTotal: getValueOrNull(company.overallRisk)
                    }
                });
                await newCompany.save();
                console.log(`Saved company: ${company.Name}`);
            } catch (error) {
                console.error(`Error saving company: ${company.Name}`, error);
            }
        });

        await Promise.all(savePromises);
        console.log('All companies processed');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error in saveEntreprise function:', error);
        mongoose.connection.close();
    }
}

saveEntreprise();
