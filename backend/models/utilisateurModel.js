// models/utilisateur.js
const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
  nomUtilisateur: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  motDePasse: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'client'],
    required: false
  }
});

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

module.exports = Utilisateur;
