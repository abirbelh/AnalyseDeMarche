// models/Company.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profilRisqueSchema = new Schema({
    risqueAudit: { type: Number },
    risqueConseilAdministration: { type: Number },
    risqRemuneration: { type: Number },
    risqDroitsActionnaires: { type: Number },
    risqTotal: { type: Number }
});

const entrepriseSchema = new Schema({
    nom: { type: String},
    symbole: { type: String },
    industrie: { type: String},
    secteur: { type: String},
    nbrEmploye: { type: Number },
    profilRisque: profilRisqueSchema
});

module.exports = mongoose.model('entreprise', entrepriseSchema);
