// controllers/utilisateurController.js
const Utilisateur = require('../models/utilisateurModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');; 


// Signup
exports.signup = async (req, res) => {
  const { nomUtilisateur, email, motDePasse, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(motDePasse, 10);
    const utilisateur = new Utilisateur({
      nomUtilisateur,
      email,
      motDePasse: hashedPassword,
      role: 'client' // Default
    });
    await utilisateur.save();
    res.status(201).json({ message: 'Utilisateur created!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, motDePasse } = req.body;
  try {
    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur not found!' });
    }
    const isPasswordValid = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials!' });
    }
    const token = jwt.sign(
      { utilisateurId: utilisateur._id, role: utilisateur.role },
      'your_jwt_secret',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CRUD operations (only for admin)
exports.addAdmin = async(req, res) =>{
  try {
    const { nomUtilisateur, email, motDePasse } = req.body;
    const hashedPassword = await bcrypt.hash(motDePasse, 10);
    const admin = new Utilisateur({
      nomUtilisateur,
      email,
      motDePasse: hashedPassword,
      role: 'admin' // Default
    });
    await admin.save();
    res.status(201).json({ message: 'Admin created!', admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getAllUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find();
    res.status(200).json(utilisateurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUtilisateurById = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.params.id);
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur not found!' });
    }
    res.status(200).json(utilisateur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUtilisateur = async (req, res) => {
  try {
    const { nomUtilisateur, email, motDePasse } = req.body;
    if (motDePasse) {
      const hashedPassword = await bcrypt.hash(motDePasse, 10);
      req.body.motDePasse = hashedPassword;
    }
    const utilisateur = await Utilisateur.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur not found!' });
    }
    res.status(200).json(utilisateur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByIdAndDelete(req.params.id);
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur not found!' });
    }
    res.status(200).json({ message: 'Utilisateur deleted!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
