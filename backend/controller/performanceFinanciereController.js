//../controller/performanceFinancierecontroller.js

const PerformanceFinanciere = require('../models/performanceFinanciereModel');

// Create a new performance financiere record
exports.createPerformanceFinanciere = async (req, res) => {
  try {
    const performanceFinanciere = new PerformanceFinanciere(req.body);
    await performanceFinanciere.save();
    res.status(201).send(performanceFinanciere);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all performance financiere records
exports.getPerformanceFinancieres = async (req, res) => {
  try {
    const performanceFinancieres = await PerformanceFinanciere.find();
    res.status(200).send(performanceFinancieres);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get performance financiere record by ID
exports.getPerformanceFinanciereById = async (req, res) => {
  try {
    const performanceFinanciere = await PerformanceFinanciere.findById(req.params.id);
    if (!performanceFinanciere) {
      return res.status(404).send({ message: 'Performance financiere not found' });
    }
    res.status(200).send(performanceFinanciere);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update performance financiere record by ID
exports.updatePerformanceFinanciere = async (req, res) => {
  try {
    const performanceFinanciere = await PerformanceFinanciere.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!performanceFinanciere) {
      return res.status(404).send({ message: 'Performance financiere not found' });
    }
    res.status(200).send(performanceFinanciere);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete performance financiere record by ID
exports.deletePerformanceFinanciere = async (req, res) => {
  try {
    const performanceFinanciere = await PerformanceFinanciere.findByIdAndDelete(req.params.id);
    if (!performanceFinanciere) {
      return res.status(404).send({ message: 'Performance financiere not found' });
    }
    res.status(200).send({ message: 'Performance financiere deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};
