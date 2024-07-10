// node scripts/createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Utilisateur = require('../models/utilisateurModel'); // Adjust the path as needed

const createAdmin = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/visionAnalytique', { useNewUrlParser: true, useUnifiedTopology: true });
    const hashedPassword = await bcrypt.hash('adminpassword123', 10);
    const adminUser = new Utilisateur({
      nomUtilisateur: 'admin',
      email: 'admin@example.com',
      motDePasse: hashedPassword,
      role: 'admin'
    });
    await adminUser.save();
    console.log('Admin user created!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

createAdmin();
